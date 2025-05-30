document.addEventListener('DOMContentLoaded', function() {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');
    const signUpForm = document.getElementById('signUpForm');
    const signInForm = document.getElementById('signInForm');

    signUpButton.addEventListener('click', () =>
        container.classList.add('right-panel-active'));

    signInButton.addEventListener('click', () =>
        container.classList.remove('right-panel-active'));

    // Пример обработчика формы регистрации
    signUpForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('signUpName').value.trim();
        const email = document.getElementById('signUpEmail').value.trim();
        const password = document.getElementById('signUpPassword').value.trim();

        if (!name || !email || !password) {
            alert('Пожалуйста, заполните все поля');
            return;
        }

        console.log('Регистрация: Имя:', name, 'Email:', email, 'Пароль:', password);

        // Получаем сохраненных пользователей из localStorage
        let users = JSON.parse(localStorage.getItem('users')) || [];

        // Проверяем, существует ли уже пользователь с таким email
        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            alert('Пользователь с таким email уже зарегистрирован');
            return;
        }

        // Добавляем нового пользователя в массив пользователей
        users.push({ name, email, password });
        localStorage.setItem('users', JSON.stringify(users));
        console.log('Пользователи сохранены:', users); // Отладочный лог

        // Автоматически авторизуем пользователя после регистрации
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUserEmail', email); // Сохраняем текущего пользователя
        window.location.href = 'index.html';
    });

    // Пример обработчика формы авторизации
    signInForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const email = document.getElementById('signInEmail').value.trim();
        const password = document.getElementById('signInPassword').value.trim();

        if (!email || !password) {
            alert('Пожалуйста, заполните все поля');
            return;
        }

        console.log('Вход: Email:', email, 'Пароль:', password);

        // Получаем сохраненных пользователей из localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        console.log('Сохранённые пользователи:', users); // Отладочный лог

        // Ищем пользователя с заданным email и паролем
        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('currentUserEmail', email); // Сохраняем текущего пользователя
            window.location.href = 'index.html';
        } else {
            alert('Неверный email или пароль');
        }
    });
});