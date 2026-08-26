document.addEventListener('DOMContentLoaded', () => {

  // Typewriter for hero role
  const roleEl = document.getElementById('hero-role');
  if (roleEl) {
    const accentText = 'Computational µBiologist';
    const suffix = ' · PhD @ CPCB';
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

  document.querySelectorAll('.reveal, .tl-item').forEach(el => observer.observe(el));

  // Block highlight: accent border when block is in the center of the viewport
  const blockObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      entry.target.classList.toggle('in-view', entry.isIntersecting);
    });
  }, { rootMargin: '-18% 0px -18% 0px', threshold: 0 });

  document.querySelectorAll('.block').forEach(el => blockObserver.observe(el));

  // Cat carousel — Ken Burns + filmstrip indicators + click to advance
  const KB = ['kb1', 'kb2', 'kb3', 'kb4'];

  document.querySelectorAll('.cat-photos').forEach(gallery => {
    const imgs = Array.from(gallery.querySelectorAll('img'));
    if (imgs.length < 2) return;
    let cur = 0;

    // Build filmstrip bar indicators
    const film = document.createElement('div');
    film.className = 'cat-film';
    imgs.forEach((_, i) => {
      const bar = document.createElement('span');
      if (i === 0) bar.className = 'active';
      film.appendChild(bar);
    });
    gallery.after(film);
    const bars = Array.from(film.querySelectorAll('span'));

    function startKB(img, idx) {
      img.style.animation = 'none';
      void img.offsetWidth; // force reflow so animation restarts
      img.style.animation = `${KB[idx % KB.length]} 5s ease-in-out forwards`;
    }

    function goTo(n) {
      imgs[cur].classList.remove('active');
      imgs[cur].style.animation = '';
      bars[cur].classList.remove('active');
      cur = n;
      startKB(imgs[cur], cur);
      imgs[cur].classList.add('active');
      bars[cur].classList.add('active');
    }

    startKB(imgs[0], 0);

    let timer = setInterval(() => goTo((cur + 1) % imgs.length), 4500);

    gallery.addEventListener('click', () => {
      clearInterval(timer);
      goTo((cur + 1) % imgs.length);
      timer = setInterval(() => goTo((cur + 1) % imgs.length), 4500);
    });

    bars.forEach((bar, i) => {
      bar.addEventListener('click', e => {
        e.stopPropagation();
        if (i === cur) return;
        clearInterval(timer);
        goTo(i);
        timer = setInterval(() => goTo((cur + 1) % imgs.length), 4500);
      });
    });
  });

});
