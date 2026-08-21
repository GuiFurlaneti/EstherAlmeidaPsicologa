document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const toggleIcon = toggle.querySelector('i');
  const mobileNav = document.getElementById('mobile-nav');
  const header = document.getElementById('site-header');

  const setMenu = (isOpen) => {
    mobileNav.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggleIcon.className = isOpen ? 'bi bi-x-lg' : 'bi bi-list';
    mobileNav.style.maxHeight = isOpen ? mobileNav.scrollHeight + 'px' : '';
    document.body.classList.toggle('nav-open', isOpen);
  };

  toggle.addEventListener('click', () => {
    setMenu(!mobileNav.classList.contains('open'));
  });

  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setMenu(false));
  });

  window.addEventListener('resize', () => {
    if (mobileNav.classList.contains('open')) {
      mobileNav.style.maxHeight = mobileNav.scrollHeight + 'px';
    }
  });

  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 8);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealTargets = document.querySelectorAll('[data-reveal]');
  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealTargets.forEach(el => el.classList.add('in-view'));
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    revealTargets.forEach(el => observer.observe(el));
  }
});
