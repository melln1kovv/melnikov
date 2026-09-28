document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-target]').forEach(btn => {
        btn.addEventListener('click', () => {
            const target = document.querySelector(btn.dataset.target);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});

(function () {
  function initCarousel(carousel) {
    const track = carousel.querySelector('.carousel__track');
    const slides = carousel.querySelectorAll('.carousel__slide');
    if (!track || slides.length === 0) return;

    let currentIndex = 0;
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    let startTranslate = 0;
    let maxTranslate = 0;

    function getSlideStep() {
      const rect = slides[0].getBoundingClientRect();
      const styles = window.getComputedStyle(track);
      const gap = parseFloat(styles.columnGap || styles.gap) || 0;
      return rect.width + gap;
    }

    function getMaxTranslate() {
      return Math.min(0, carousel.offsetWidth - track.scrollWidth);
    }

    function setTransform(x, withTransition) {
      track.style.transition = withTransition ? 'transform 0.35s ease' : 'none';
      track.style.transform = 'translateX(' + x + 'px)';
    }

    function getCurrentTranslate() {
      const style = window.getComputedStyle(track).transform;
      if (style === 'none') return 0;
      return new DOMMatrix(style).m41;
    }

    function goToIndex(index) {
      const step = getSlideStep();
      maxTranslate = getMaxTranslate();

      const maxIndex = slides.length - 1;
      currentIndex = Math.max(0, Math.min(index, maxIndex));

      let target = -currentIndex * step;
      if (target < maxTranslate) target = maxTranslate;

      setTransform(target, true);
    }

    function onDown(e) {
      isDragging = true;
      startX = e.type.indexOf('touch') === 0 ? e.touches[0].clientX : e.clientX;
      startTranslate = getCurrentTranslate();
      currentX = startTranslate;
      maxTranslate = getMaxTranslate();
      track.style.transition = 'none';
      if (e.cancelable) e.preventDefault();
    }

    function onMove(e) {
      if (!isDragging) return;
      const clientX = e.type.indexOf('touch') === 0 ? e.touches[0].clientX : e.clientX;
      let next = startTranslate + (clientX - startX);

      if (next > 0) next = next * 0.3;
      if (next < maxTranslate) next = maxTranslate + (next - maxTranslate) * 0.3;

      currentX = next;
      setTransform(currentX, false);
      if (e.cancelable) e.preventDefault();
    }

    function onUp() {
      if (!isDragging) return;
      isDragging = false;

      const step = getSlideStep();
      const delta = currentX - startTranslate;
      const threshold = step / 4;

      let targetIndex = Math.round(-currentX / step);
      if (delta < -threshold) targetIndex = Math.ceil(-currentX / step);
      else if (delta > threshold) targetIndex = Math.floor(-currentX / step);

      goToIndex(targetIndex);
    }

    carousel.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);

    carousel.addEventListener('touchstart', onDown, { passive: false });
    carousel.addEventListener('touchmove', onMove, { passive: false });
    carousel.addEventListener('touchend', onUp);
    carousel.addEventListener('touchcancel', onUp);

    carousel.addEventListener('dragstart', function (e) { e.preventDefault(); });

    window.addEventListener('resize', function () {
      goToIndex(currentIndex);
    });

    setTransform(0, false);
  }

  document.querySelectorAll('.carousel').forEach(initCarousel);
})();

document.getElementById('themeToggle').addEventListener('click', function() {
    const body = document.body;
    body.classList.toggle('dark-theme');

    const logos = document.querySelectorAll(
        '.header__logo, .footer__logo'
    );
    logos.forEach(function(logo) {

        if (body.classList.contains('dark-theme')) {
            logo.src = 'images/logo_dark.svg';
        } else {
            logo.src = 'images/logo.svg';
        }

    });

    const aboutIcon = document.querySelector('.about__icon');
    if (aboutIcon) {
        if (body.classList.contains('dark-theme')) {
            aboutIcon.src = 'images/aboutme_dark.svg';
        } else {
            aboutIcon.src = 'images/aboutme.svg';
        }

    }

    const themeIcon = document.querySelector('.header--changetheme');
    if (themeIcon) {
        if (body.classList.contains('dark-theme')) {
            themeIcon.src = 'images/changetheme_lighttheme.svg';
        } else {
            themeIcon.src = 'images/changetheme_darktheme.svg';
        }

    }

    const telegramLogo = document.querySelector('.telegramlogo');
    if (telegramLogo) {

        if (body.classList.contains('dark-theme')) {
            telegramLogo.src = 'images/telegramtemniy.svg';
        } else {
            telegramLogo.src = 'images/telegram.svg';
        }

    }

    const tiktokLogo = document.querySelector('.tiktoklogo');
    if (tiktokLogo) {

        if (body.classList.contains('dark-theme')) {
            tiktokLogo.src = 'images/tiktoktemniy.svg';
        } else {
            tiktokLogo.src = 'images/titkok.svg';
        }

    }

    const instagramLogo = document.querySelector('.instagramlogo');
    if (instagramLogo) {

        if (body.classList.contains('dark-theme')) {
            instagramLogo.src = 'images/instagramtemniy.svg';
        } else {
            instagramLogo.src = 'images/instagram.svg';
        }

    }
});