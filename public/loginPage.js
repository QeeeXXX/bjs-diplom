// Создаем новый экземпляр класса UserForm
const userForm = new UserForm();

// Определяем функцию для обработки авторизации
userForm.loginFormCallback = function(data) {
    // Выполняем запрос к серверу для авторизации
    ApiConnector.login(data, function(response) {
        if (response.success) {
            console.log('Успешная авторизация:', response);
            // Обновляем страницу после успешной авторизации
            location.reload();
        } else {
            const errorElement = document.getElementById("login-error-message");
            errorElement.textContent = response.error.message || 'Неизвестная ошибка авторизации';
        }
    });
};

// Определяем функцию для обработки регистрации
userForm.registerFormCallback = function(data) {
    // Выполняем запрос к серверу для регистрации
    ApiConnector.register(data, function(response) {
        if (response.success) {
            console.log('Успешная регистрация:', response);
            // Обновляем страницу после успешной регистрации
            location.reload();
        } else {
            const errorElement = document.getElementById("register-error-message");
            errorElement.textContent = response.error.message || 'Неизвестная ошибка регистрации';
        }
    });
};
