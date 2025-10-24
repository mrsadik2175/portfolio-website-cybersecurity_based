/* script.js
   - menu toggle, theme toggle, typing effect, contact form handler
   - Keep customizing as needed.
*/

document.addEventListener('DOMContentLoaded', () => {
  // Year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Mobile menu
  const menuBtn = document.getElementById('menuBtn');
  const nav = document.getElementById('nav');
  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      nav.classList.toggle('open');
      menuBtn.classList.toggle('open');
      if (nav.classList.contains('open')) {
        nav.style.display = 'flex';
        nav.setAttribute('aria-expanded', 'true');
      } else {
        nav.style.display = '';
        nav.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Theme toggle
  const themeToggle = document.getElementById('themeToggle');
  const root = document.documentElement;
  const themeIcon = document.getElementById('themeIcon');

  // Load saved preference
  const savedTheme = localStorage.getItem('site-theme');
  if (savedTheme === 'light') {
    document.body.classList.remove('theme-dark');
    document.body.classList.add('theme-light');
    root.classList.add('light');
    setIcon('sun');
  } else {
    // default dark
    document.body.classList.remove('theme-light');
    document.body.classList.add('theme-dark');
    root.classList.remove('light');
    setIcon('moon');
  }

  themeToggle.addEventListener('click', () => {
    if (root.classList.contains('light')) {
      root.classList.remove('light');
      document.body.classList.remove('theme-light');
      document.body.classList.add('theme-dark');
      localStorage.setItem('site-theme', 'dark');
      setIcon('moon');
    } else {
      root.classList.add('light');
      document.body.classList.remove('theme-dark');
      document.body.classList.add('theme-light');
      localStorage.setItem('site-theme', 'light');
      setIcon('sun');
    }
  });

  function setIcon(mode) {
    if (!themeIcon) return;
    if (mode === 'sun') {
      themeIcon.innerHTML = '<path d="M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>';
    } else {
      themeIcon.innerHTML = '<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>';
    }
  }

  // Typing effect (lightweight)
  const typingEl = document.getElementById('typing');
  const phrases = [
    'I help companies fix security issues and build safer digital systems that inspire trust.',
    'Vulnerability Assessment • Penetration Testing • Secure Code Reviews'
  ];
  let pIndex = 0, cIndex = 0, forward = true;
  function typeLoop() {
    if (!typingEl) return;
    const str = phrases[pIndex];
    if (forward) {
      cIndex++;
      typingEl.textContent = str.slice(0, cIndex);
      if (cIndex === str.length) { forward = false; setTimeout(typeLoop, 1400); return; }
    } else {
      cIndex--;
      typingEl.textContent = str.slice(0, cIndex);
      if (cIndex === 0) { forward = true; pIndex = (pIndex + 1) % phrases.length; }
    }
    setTimeout(typeLoop, 40 + Math.random() * 40);
  }
  typeLoop();

  // Contact form (client-side only; replace with server or third-party)
  const form = document.getElementById('contactForm');
  const formMsg = document.getElementById('formMsg');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
      if (!name || !email || !message) {
        formMsg.textContent = 'Please fill all fields.';
        formMsg.style.color = '#ffb86b';
        return;
      }
      if (!/^\S+@\S+\.\S+$/.test(email)) {
        formMsg.textContent = 'Please enter a valid email.';
        formMsg.style.color = '#ffb86b';
        return;
      }

      // Demo behavior for static pages
      formMsg.textContent = 'Thanks — your message is ready. Hook this form to Formspree/Netlify/your email service to receive messages.';
      formMsg.style.color = '#8ef6ff';
      form.reset();
    });
  }
});