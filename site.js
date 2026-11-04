// Shared by every page.

// Header menu (<details class="menu">). It opens and closes natively; this closes it on Escape
// (returning focus to the toggle), on a click outside it, after a link is chosen, and when the
// window widens past 1080px, where the inline links come back.
(() => {
  const menu = document.querySelector('.menu');
  if (!menu) return;
  const toggle = menu.querySelector('summary');
  const close = () => { menu.open = false; };

  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape' || !menu.open) return;
    const hadFocus = menu.contains(document.activeElement);
    close();
    if (hadFocus) toggle.focus();
  });
  document.addEventListener('click', e => {
    if (menu.open && !menu.contains(e.target)) close();
  });
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', close));
  matchMedia('(min-width: 1081px)').addEventListener('change', e => {
    if (e.matches) close();
  });
})();
