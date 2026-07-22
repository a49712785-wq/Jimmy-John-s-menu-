(function(){
  "use strict";

  // Hide any image that fails to load (placeholder images not yet uploaded).
  // Delegated on window with capture:true since 'error' events on <img> don't bubble.
  window.addEventListener('error', function(e){
    if (e.target && e.target.tagName === 'IMG') {
      e.target.style.display = 'none';
    }
  }, true);

  // Mobile menu toggle
  var navToggle = document.getElementById('navToggle');
  var mobileMenu = document.getElementById('mobileMenu');
  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', function(){
      var isOpen = mobileMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    mobileMenu.querySelectorAll('a').forEach(function(link){
      link.addEventListener('click', function(){
        mobileMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach(function(item){
    var btn = item.querySelector('.faq-question');
    btn.addEventListener('click', function(){
      var isOpen = item.getAttribute('data-open') === 'true';
      item.setAttribute('data-open', isOpen ? 'false' : 'true');
      btn.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
    });
  });

  // Back to top
  var backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', function(){
      if (window.scrollY > 800) { backToTop.classList.add('show'); }
      else { backToTop.classList.remove('show'); }
    }, { passive: true });
    backToTop.addEventListener('click', function(){
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Menu search: filters item cards by name, highlights and scrolls to first match
  var searchInput = document.getElementById('menuSearch');
  var searchStatus = document.getElementById('searchStatus');
  var allCards = Array.prototype.slice.call(document.querySelectorAll('.item-card'));
  if (searchInput && allCards.length) {
    var searchTimer = null;
    searchInput.addEventListener('input', function(){
      clearTimeout(searchTimer);
      searchTimer = setTimeout(runSearch, 120);
    });
    function runSearch(){
      var query = searchInput.value.trim().toLowerCase();
      allCards.forEach(function(card){
        card.classList.remove('search-match');
      });
      if (!query) {
        allCards.forEach(function(card){ card.classList.remove('search-hidden'); });
        searchStatus.textContent = '';
        return;
      }
      var firstMatch = null;
      allCards.forEach(function(card){
        var nameEl = card.querySelector('h3');
        var name = nameEl ? nameEl.textContent.toLowerCase() : '';
        var isMatch = name.indexOf(query) !== -1;
        card.classList.toggle('search-hidden', !isMatch);
        if (isMatch && !firstMatch) { firstMatch = card; }
      });
      if (firstMatch) {
        firstMatch.classList.add('search-match');
        searchStatus.textContent = '';
        firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        searchStatus.textContent = 'No menu items found.';
      }
    }
  }

  // Active sticky navigation via IntersectionObserver
  var tocLinks = Array.prototype.slice.call(document.querySelectorAll('.toc-inner a[href^="#"]'));
  if (tocLinks.length && 'IntersectionObserver' in window) {
    var linkByTarget = {};
    var observedSections = [];
    tocLinks.forEach(function(link){
      var id = link.getAttribute('href').slice(1);
      var section = document.getElementById(id);
      if (section) {
        linkByTarget[id] = link;
        observedSections.push(section);
      }
    });
    var observer = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        var link = linkByTarget[entry.target.id];
        if (!link) { return; }
        if (entry.isIntersecting) {
          tocLinks.forEach(function(l){
            l.classList.remove('active');
            l.removeAttribute('aria-current');
          });
          link.classList.add('active');
          link.setAttribute('aria-current', 'true');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    observedSections.forEach(function(section){ observer.observe(section); });
  }

  // Filter chips: generic show/hide of any [data-filter-target] group by category
  var filterChips = Array.prototype.slice.call(document.querySelectorAll('.filter-chip'));
  var filterBar = document.querySelector('.filter-bar');
  if (filterChips.length && filterBar) {
    var filterTargetSelector = filterBar.getAttribute('data-filter-target') || '.deal-card';
    var filterItems = Array.prototype.slice.call(document.querySelectorAll(filterTargetSelector));
    filterChips.forEach(function(chip){
      chip.addEventListener('click', function(){
        filterChips.forEach(function(c){ c.setAttribute('aria-pressed', 'false'); });
        chip.setAttribute('aria-pressed', 'true');
        var value = chip.getAttribute('data-filter');
        filterItems.forEach(function(item){
          var categories = item.getAttribute('data-filter') || '';
          var matches = value === 'all' || categories.indexOf(value) !== -1;
          item.classList.toggle('is-hidden', !matches);
        });
      });
    });
  }

  // Deal code reveal + copy: first click reveals the code, second click copies it
  document.querySelectorAll('.deal-code-btn').forEach(function(btn){
    var code = btn.getAttribute('data-code') || '';
    var label = btn.querySelector('.deal-code-label');
    if (!code || !label) { return; }
    btn.addEventListener('click', function(){
      if (!btn.classList.contains('is-revealed')) {
        label.textContent = code;
        btn.classList.add('is-revealed');
        btn.setAttribute('aria-expanded', 'true');
        return;
      }
      copyText(code, function(success){
        label.textContent = success ? 'Copied!' : code;
        if (success) {
          setTimeout(function(){ label.textContent = code; }, 1500);
        }
      });
    });
  });

  function copyText(text, callback){
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function(){ callback(true); }).catch(function(){ callback(false); });
      return;
    }
    var textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'absolute';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    var success = false;
    try { success = document.execCommand('copy'); } catch (err) { success = false; }
    document.body.removeChild(textarea);
    callback(success);
  }
})();
