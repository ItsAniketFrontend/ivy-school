/* ============================================================
   IVY SMART BUDS SCHOOL — Main JavaScript
   Handles: Mobile nav toggle, gallery filters, form toasts,
            active nav link highlighting
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ─── 1. MARK ACTIVE NAV LINK ─── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && href === currentPage) {
      link.classList.add('active');
    }
  });

  /* ─── 2. MOBILE NAV TOGGLE ─── */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuOverlay = document.getElementById('menuOverlay');

  function openMenu() {
    hamburger.classList.add('open');
    mobileMenu.classList.add('open');
    menuOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    menuOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      if (mobileMenu.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  if (menuOverlay) {
    menuOverlay.addEventListener('click', closeMenu);
  }

  // Close menu when a mobile nav link is clicked
  document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  /* ─── 3. GALLERY FILTER BUTTONS ─── */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (filterBtns.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const filter = this.dataset.filter || 'all';
        galleryItems.forEach(item => {
          if (filter === 'all' || item.dataset.category === filter) {
            item.style.display = '';
            setTimeout(() => { item.style.opacity = '1'; item.style.transform = 'scale(1)'; }, 10);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.9)';
            setTimeout(() => { item.style.display = 'none'; }, 300);
          }
        });

        // Reapply wide class only on visible items for first/fifth
        reapplyWide();
      });
    });
  }

  function reapplyWide() {
    const visible = Array.from(galleryItems).filter(i => i.style.display !== 'none');
    galleryItems.forEach(i => i.classList.remove('wide'));
    if (visible[0]) visible[0].classList.add('wide');
    if (visible[4]) visible[4].classList.add('wide');
  }
  reapplyWide();

  /* ─── 4. TOAST NOTIFICATION ─── */
  window.showToast = function (message) {
    let toast = document.getElementById('toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast';
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
  };

  /* ─── 5. FORM SUBMIT HANDLERS ─── */
  const admissionForm = document.getElementById('admissionForm');
  if (admissionForm) {
    admissionForm.addEventListener('submit', function (e) {
      e.preventDefault();
      showToast('🎉 Application submitted! We\'ll contact you within 2 business days.');
      admissionForm.reset();
    });
  }

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      showToast('✅ Message sent! Our team will reply within 24 hours.');
      contactForm.reset();
    });
  }

  /* ─── 6. SMOOTH SCROLL TO TOP ON PAGE LOAD ─── */
  window.scrollTo({ top: 0, behavior: 'smooth' });

});
