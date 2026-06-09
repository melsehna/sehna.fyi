document.addEventListener('DOMContentLoaded', () => {

  // Typewriter for hero role
  const roleEl = document.getElementById('hero-role');
  if (roleEl) {
    const accentText = 'Computational µBiologist';
    const suffix = ' · Resident @ Google X · PhD @ CPCB';
    const full = accentText + suffix;
    let i = 0;

    setTimeout(() => {
      const timer = setInterval(() => {
        i++;
        const typed = full.slice(0, i);
        if (i <= accentText.length) {
          roleEl.innerHTML = `<span class="accent">${typed}</span>`;
        } else {
          roleEl.innerHTML = `<span class="accent">${accentText}</span>${typed.slice(accentText.length)}`;
        }
        if (i >= full.length) clearInterval(timer);
      }, 38);
    }, 280);
  }

  // Scroll reveal
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Block highlight: accent border when block is in the center of the viewport
  const blockObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      entry.target.classList.toggle('in-view', entry.isIntersecting);
    });
  }, { rootMargin: '-18% 0px -18% 0px', threshold: 0 });

  document.querySelectorAll('.block').forEach(el => blockObserver.observe(el));

  // Cat carousel
  document.querySelectorAll('.cat-photos').forEach(gallery => {
    const imgs = Array.from(gallery.querySelectorAll('img'));
    if (imgs.length < 2) return;
    let current = 0;

    setInterval(() => {
      imgs[current].classList.remove('active');
      current = (current + 1) % imgs.length;
      imgs[current].classList.add('active');
    }, 2600);
  });

});
