// ============================================================
// Validaciones FRONT-END — Crear / Editar productos
// ============================================================

(function () {
  const form = document.getElementById('productForm');
  if (!form) return;

  const fields = {
    name: {
      el: () => document.getElementById('name'),
      validate(v) {
        if (!v.trim()) return 'El nombre es obligatorio';
        if (v.trim().length < 5) return 'El nombre debe tener al menos 5 caracteres';
        return '';
      }
    },
    description: {
      el: () => document.getElementById('description'),
      validate(v) {
        if (!v.trim()) return 'La descripción es obligatoria';
        if (v.trim().length < 20) return 'La descripción debe tener al menos 20 caracteres';
        return '';
      }
    },
    image: {
      el: () => document.getElementById('image'),
      validate(v, el) {
        if (!el.files || !el.files.length) return ''; // opcional en edición
        const file = el.files[0];
        const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
        if (!allowed.includes(file.type)) return 'La imagen debe ser JPG, JPEG, PNG o GIF';
        return '';
      }
    },
    category_id: {
      el: () => document.getElementById('category_id'),
      validate(v) {
        if (!v) return 'Debés seleccionar una categoría';
        return '';
      }
    },
    price: {
      el: () => document.getElementById('price'),
      validate(v) {
        if (!v && v !== 0) return 'El precio es obligatorio';
        if (Number(v) < 0) return 'El precio debe ser un número positivo';
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