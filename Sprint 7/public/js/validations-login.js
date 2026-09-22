// ============================================================
// Validaciones FRONT-END — Login de usuarios
// ============================================================

(function () {
  const form = document.getElementById('loginForm');
  if (!form) return;

  const fields = {
    email: {
      el: () => document.getElementById('email'),
      validate(v) {
        if (!v.trim()) return 'El email es obligatorio';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())) return 'Debés ingresar un email válido';
        return '';
      }
    },
    password: {
      el: () => document.getElementById('password'),
      validate(v) {
        if (!v) return 'La contraseña es obligatoria';
        return '';
      }
    }
  };

  /* ---- helpers ---- */
  function showError(input, msg) {
    input.classList.add('error');
    input.classList.remove('valid');
    let next = input.nextElementSibling;
    if (next && next.classList.contains('error-message')) {
      next.textContent = msg;
      next.classList.add('visible');
    } else {
      const p = document.createElement('p');
      p.className = 'error-message visible';
      p.textContent = msg;
      input.parentNode.insertBefore(p, input.nextSibling);
    }
  }

  function clearError(input) {
    input.classList.remove('error');
    let next = input.nextElementSibling;
    if (next && next.classList.contains('error-message')) {
      next.textContent = '';
      next.classList.remove('visible');
    }
  }

  function markValid(input) {
    input.classList.remove('error');
    input.classList.add('valid');
    let next = input.nextElementSibling;
    if (next && next.classList.contains('error-message')) {
      next.textContent = '';
      next.classList.remove('visible');
    }
  }

  /* ---- eventos por campo ---- */
  Object.keys(fields).forEach(key => {
    const conf = fields[key];
    const input = conf.el();
    if (!input) return;

    ['input', 'blur'].forEach(evt => {
      input.addEventListener(evt, () => {
        const msg = conf.validate(input.value);
        if (msg) showError(input, msg);
        else markValid(input);
      });
    });
  });

  /* ---- submit ---- */
  form.addEventListener('submit', e => {
    let hasErrors = false;
    Object.keys(fields).forEach(key => {
      const conf = fields[key];
      const input = conf.el();
      if (!input) return;
      const msg = conf.validate(input.value);
      if (msg) {
        showError(input, msg);
        hasErrors = true;
      } else {
        markValid(input);
      }
    });
    if (hasErrors) e.preventDefault();
  });
})();