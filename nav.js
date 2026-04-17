/* ============================================================
   nav.js  —  Mobile hamburger nav for all Jambak pages
   Auto-injects button + overlay from existing .nav-links
   ============================================================ */
(function () {
  'use strict';

  /* ── 1. Wait for DOM ── */
  document.addEventListener('DOMContentLoaded', function () {
    var nav = document.querySelector('nav.nav');
    if (!nav) return;

    /* ── 2. Build hamburger button ── */
    var btn = document.createElement('button');
    btn.className = 'nav-hamburger';
    btn.setAttribute('aria-label', 'القائمة');
    btn.innerHTML =
      '<span class="hb-bar"></span>' +
      '<span class="hb-bar"></span>' +
      '<span class="hb-bar"></span>';
    nav.appendChild(btn);

    /* ── 3. Build overlay ── */
    var overlay = document.createElement('div');
    overlay.className = 'mobile-nav-overlay';

    /* header row */
    var header = document.createElement('div');
    header.className = 'mno-header';
    var logoImg = nav.querySelector('.nav-logo img');
    if (logoImg) {
      var logoClone = document.createElement('img');
      logoClone.src = logoImg.src;
      logoClone.alt = logoImg.alt;
      logoClone.style.cssText = 'height:40px;object-fit:contain;';
      header.appendChild(logoClone);
    }
    var closeBtn = document.createElement('button');
    closeBtn.className = 'mno-close';
    closeBtn.innerHTML = '&#10005;';
    closeBtn.setAttribute('aria-label', 'إغلاق');
    header.appendChild(closeBtn);
    overlay.appendChild(header);

    /* nav links */
    var linksUl = nav.querySelector('.nav-links');
    if (linksUl) {
      var mobileLinks = document.createElement('ul');
      mobileLinks.className = 'mno-links';

      /* flatten: regular <a>, dropdowns */
      Array.from(linksUl.children).forEach(function (li) {
        var ddToggle = li.querySelector('a.dd-toggle');
        var dropItems = li.querySelectorAll('.dropdown a');

        if (ddToggle && dropItems.length) {
          /* dropdown group */
          var group = document.createElement('li');
          group.className = 'mno-group';

          var groupLabel = document.createElement('span');
          groupLabel.className = 'mno-group-label';
          groupLabel.textContent = ddToggle.textContent.trim();
          group.appendChild(groupLabel);

          var subList = document.createElement('ul');
          subList.className = 'mno-sub';
          dropItems.forEach(function (a) {
            var sub = document.createElement('li');
            var link = document.createElement('a');
            link.href = a.href;
            link.textContent = a.textContent.trim();
            sub.appendChild(link);
            subList.appendChild(sub);
          });
          group.appendChild(subList);
          mobileLinks.appendChild(group);
        } else {
          var a = li.querySelector('a');
          if (a) {
            var item = document.createElement('li');
            var link2 = document.createElement('a');
            link2.href = a.href;
            link2.textContent = a.textContent.trim();
            if (a.classList.contains('active')) link2.className = 'active';
            item.appendChild(link2);
            mobileLinks.appendChild(item);
          }
        }
      });
      overlay.appendChild(mobileLinks);
    }

    /* action buttons */
    var actions = nav.querySelector('.nav-actions');
    if (actions) {
      var mobileActions = document.createElement('div');
      mobileActions.className = 'mno-actions';
      Array.from(actions.querySelectorAll('a')).forEach(function (a) {
        var clone = document.createElement('a');
        clone.href = a.href;
        clone.textContent = a.textContent.trim();
        clone.className = a.className;
        mobileActions.appendChild(clone);
      });
      overlay.appendChild(mobileActions);
    }

    /* backdrop */
    var backdrop = document.createElement('div');
    backdrop.className = 'mobile-nav-backdrop';

    document.body.appendChild(overlay);
    document.body.appendChild(backdrop);

    /* ── 4. Toggle logic ── */
    function openNav() {
      overlay.classList.add('open');
      backdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function closeNav() {
      overlay.classList.remove('open');
      backdrop.classList.remove('open');
      document.body.style.overflow = '';
    }

    btn.addEventListener('click', openNav);
    closeBtn.addEventListener('click', closeNav);
    backdrop.addEventListener('click', closeNav);
    overlay.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeNav);
    });

    /* close on resize to desktop */
    window.addEventListener('resize', function () {
      if (window.innerWidth > 768) closeNav();
    });
  });
})();
