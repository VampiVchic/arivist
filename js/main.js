// Клик мимо — закрываем все дропдауны
document.addEventListener('click', e => {
  if (!e.target.closest('[data-dropdown]')) {
    document.querySelectorAll('[data-dropdown].is-open').forEach(box => {
      box.classList.remove('is-open');
      const btn = box.querySelector(':scope > button');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    });
  }
});

// ===== БУРГЕР-МЕНЮ =====
const menu = document.getElementById('site-menu');
const burger = document.querySelector('.header__burger');
const setMenu = open => {
  menu.hidden = !open;
  burger.setAttribute('aria-expanded', open);
};
burger.addEventListener('click', () => setMenu(true));
menu.querySelector('.menu__close').addEventListener('click', () => setMenu(false));
menu.addEventListener('click', e => { if (e.target === menu) setMenu(false); });

// ===== МОДАЛКА ЗАЯВКИ =====
const modal = document.getElementById('modal-request');
const form = modal.querySelector('.modal__form');
const submit = modal.querySelector('.modal__submit');

document.querySelectorAll('[data-modal-open]').forEach(btn =>
  btn.addEventListener('click', () => modal.hidden = false));
modal.querySelector('.modal__close').addEventListener('click', () => modal.hidden = true);
modal.addEventListener('click', e => { if (e.target === modal) modal.hidden = true; });

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { modal.hidden = true; setMenu(false); }
});

// кнопка оживает, когда всё обязательное валидно
const validate = () => { submit.disabled = !form.checkValidity(); };
form.addEventListener('input', validate);
form.addEventListener('change', validate);
form.addEventListener('submit', e => {
  e.preventDefault();   // на этапе 2 здесь реальная отправка
  modal.hidden = true;
  form.reset();
  submit.disabled = true;
});

// ===== АККОРДЕОН НОВОСТЕЙ =====
document.querySelectorAll('.news-item__head').forEach(btn =>
  btn.addEventListener('click', () => btn.closest('.news-item').classList.toggle('is-open')));

// ===== ПЕРЕКЛЮЧЕНИЕ ТЕМЫ =====
document.querySelector('.theme-toggle').addEventListener('click', () => {
  const root = document.documentElement;
  root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
});

// ===== ЛАМПОЧКА: появляется со второго экрана =====
(() => {
  const toggle = document.querySelector('.theme-toggle');
  const heroSec = document.querySelector('.hero');
  if (!toggle || !heroSec) return;
  const onScroll = () =>
    toggle.classList.toggle('is-visible', scrollY > heroSec.offsetHeight - innerHeight / 2);
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// ===== ЗАЛИПШЕЕ МЕНЮ: скролл-спай + появление со второго экрана =====
const sideNav = document.querySelector('.side-nav');
const navLinks = [...sideNav.querySelectorAll('a')];
const spySections = navLinks
  .map(a => document.querySelector(a.getAttribute('href')))
  .filter(Boolean);
const firstSec = document.getElementById('special');

const onScrollSpy = () => {
  const mid = innerHeight / 2;
  let current = null;
  spySections.forEach(sec => {
    const r = sec.getBoundingClientRect();
    if (r.top <= mid && r.bottom > mid) current = sec;
  });
  navLinks.forEach(a =>
    a.classList.toggle('is-active', !!current && a.getAttribute('href') === '#' + current.id));
  sideNav.classList.toggle('on-dark', !!current && current.id === 'orgs');
  sideNav.classList.toggle('is-hidden', firstSec.getBoundingClientRect().top > mid);
};
document.addEventListener('scroll', onScrollSpy, { passive: true });
onScrollSpy();

// ===== КЕЙСЫ: залипание и смена фреймов по скроллу =====
const casesPin = document.querySelector('.cases__pin');
const casesStage = document.querySelector('.cases__stage');
if (casesPin && casesStage) {
  const onCases = () => {
    const r = casesPin.getBoundingClientRect();
    const total = r.height - innerHeight;
    const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
    casesStage.classList.toggle('is-text', p > 0.5);
  };
  document.addEventListener('scroll', onCases, { passive: true });
  onCases();
}

// ===== ТУРЦИЯ: кадр раздвигается вверх и вниз по скроллу =====
const mediaPin = document.querySelector('.media__pin');
const mediaImg = document.querySelector('.media__img');
const START_H = 10;   /* было 35 — чем меньше, тем больше «из ниоткуда» */
if (mediaPin && mediaImg) {
  const START_H = 35;   // % высоты экрана — стартовая полоса (как картинка 2)
  const onMedia = () => {
    const r = mediaPin.getBoundingClientRect();
    const total = r.height - innerHeight;
    const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
    mediaImg.style.height = (START_H + (100 - START_H) * p) + '%';
  };
  document.addEventListener('scroll', onMedia, { passive: true });
  onMedia();
}