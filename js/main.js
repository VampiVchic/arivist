// клик мимо — закрываем все дропдауны
document.addEventListener('click', e => {
  if (!e.target.closest('[data-dropdown]')) {
    dropdowns.forEach(box => {
      box.classList.remove('is-open');
      box.querySelector(':scope > button').setAttribute('aria-expanded', 'false');
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