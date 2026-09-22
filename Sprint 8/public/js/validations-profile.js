// ============================================================
// Validaciones FRONT-END — Editar perfil
// ============================================================

(function () {
  const form = document.getElementById('profileForm');
  if (!form) return;

  const fields = {
    firstName: {
      el: () => document.getElementById('firstName'),
      validate(v) {
        if (!v.trim()) return 'El nombre es obligatorio';
        if (v.trim().length < 2) return 'El nombre debe tener al menos 2 caracteres';
        return '';
      }
    },
    lastName: {
      el: () => document.getElementById('lastName'),
      validate(v) {
        if (!v.trim()) return 'El apellido es obligatorio';
        if (v.trim().length < 2) return 'El apellido debe tener al menos 2 caracteres';
        return '';
      }
    },
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
        if (!v) return ''; // opcional en edición
        if (v.length < 8) return 'La contraseña debe tener al menos 8 caracteres';
        if (!/[A-Z]/.test(v)) return 'La contraseña debe tener al menos una letra mayúscula';
        if (!/[a-z]/.test(v)) return 'La contraseña debe tener al menos una letra minúscula';
        if (!/[0-9]/.test(v)) return 'La contraseña debe tener al menos un número';
        if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(v)) return 'La contraseña debe tener al menos un carácter especial';
        return '';
      }
    },
    image: {
      el: () => document.getElementById('image'),
      validate(v, el) {
        if (!el.files || !el.files.length) return ''; // opcional
        const file = el.files[0];
        const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
        if (!allowed.includes(file.type)) return 'La imagen debe ser JPG, JPEG, PNG o GIF';
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

    const events = key === 'image' ? ['change'] : ['input', 'blur'];
    events.forEach(evt => {
      input.addEventListener(evt, () => {
        const val = key === 'image' ? '' : input.value;
        const msg = conf.validate(val, input);
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
      const val = key === 'image' ? '' : input.value;
      const msg = conf.validate(val, input);
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