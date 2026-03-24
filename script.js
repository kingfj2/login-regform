function showMessage(text, success = true) {
    const msg = document.getElementById('message');
    msg.textContent = text;
    msg.className = 'message ' + (success ? 'success' : 'error');
}

if (document.getElementById('loginForm')) {
    const loginForm = document.getElementById('loginForm');
    const pwInput = document.getElementById('password');
    const togglePass = document.getElementById('togglePassword');

    togglePass.addEventListener('click', function () {
        const active = pwInput.type === 'password';
        pwInput.type = active ? 'text' : 'password';
        togglePass.textContent = active ? '🙈' : '👁️';
        togglePass.setAttribute('aria-label', active ? 'Hide password' : 'Show password');
    });

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const remember = document.getElementById('remember').checked;

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            if (remember) {
                localStorage.setItem('rememberedUser', email);
            } else {
                localStorage.removeItem('rememberedUser');
            }
            showMessage('Login successful! Redirecting...', true);
            setTimeout(() => window.location.href = 'registration.html', 900);
        } else {
            showMessage('Invalid email or password.', false);
        }
    });

    const remembered = localStorage.getItem('rememberedUser');
    if (remembered) {
        document.getElementById('email').value = remembered;
        document.getElementById('remember').checked = true;
    }
} else if (document.getElementById('registrationForm')) {
    const regForm = document.getElementById('registrationForm');
    const pwInput = document.getElementById('password');
    const togglePin = document.getElementById('togglePin');

    togglePin.addEventListener('click', function (e) {
        e.preventDefault();
        const active = pwInput.type === 'password';
        pwInput.type = active ? 'text' : 'password';
        togglePin.textContent = active ? '🙈' : '👁';
    });

    regForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const country = document.getElementById('country').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const password = document.getElementById('password').value;
        const terms = document.getElementById('terms').checked;

        if (!name || !email || !country || !phone || !password) {
            showMessage('All fields are required.', false);
            return;
        }

        if (!terms) {
            showMessage('Please agree to Terms and Conditions.', false);
            return;
        }

        const user = { name, email, country, phone, password };
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const exists = users.some(u => u.email === email);

        if (exists) {
            showMessage('Email already registered.', false);
            return;
        }

        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        showMessage('Account created successfully! Redirecting...', true);
        setTimeout(() => window.location.href = 'index.html', 1200);
    });
}