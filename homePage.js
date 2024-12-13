"use strict";

// Лог-аут
const logoutButton = new LogoutButton();
logoutButton.action = function() {
    ApiConnector.logout(function(response) {
        if (response.success) {
            location.reload();
        } else {
            alert("Ошибка при выходе из аккаунта");
        }
    });
}

// Информация о пользователе
ApiConnector.current(function(response) {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    } else {
        alert("Ошибка при получении данных пользователя");
    }
});

// Курсы валют
const ratesBoard = new RatesBoard();

function updateRates() {
    ApiConnector.rates(function(response) {
        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        } else {
            alert("Ошибка при получении курсов валют");
        }
    });
}

updateRates();
setInterval(updateRates, 60000);

// Управление деньгами
const moneyManager = new MoneyManager();

// Пополнение баланса
moneyManager.addMoneyCallback = function(data) {
    ApiConnector.addMoney(data, function(response) {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            MessageBox.setMessage("Баланс успешно пополнен!");
        } else {
            MessageBox.setMessage("Ошибка при пополнении баланса");
        }
    });
}

// Конвертация валюты
moneyManager.conversionMoneyCallback = function(data) {
    ApiConnector.convertMoney(data, function(response) {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            MessageBox.setMessage("Конвертация прошла успешно!");
        } else {
            MessageBox.setMessage("Ошибка при конвертации валюты");
        }
    });
}

// Перевод средств
moneyManager.sendMoneyCallback = function(data) {
    ApiConnector.transferMoney(data, function(response) {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            MessageBox.setMessage("Перевод успешно завершён!");
        } else {
            MessageBox.setMessage("Ошибка при переводе средств");
        }
    });
}

// Работа с избранным
const favoritesWidget = new FavoritesWidget();

// Получение списка избранных
ApiConnector.getFavorites(function(response) {
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        favoritesWidget.updateUsersList(response.data);
    } else {
        alert("Ошибка при получении списка избранного");
    }
});

// Добавление пользователя в избранное
favoritesWidget.addUserCallback = function(data) {
    ApiConnector.addUserToFavorites(data, function(response) {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            favoritesWidget.updateUsersList(response.data);
            MessageBox.setMessage("Пользователь добавлен в избранное!");
        } else {
            MessageBox.setMessage("Ошибка при добавлении пользователя в избранное");
        }
    });
}

// Удаление пользователя из избранного
favoritesWidget.removeUserCallback = function(data) {
    ApiConnector.removeUserFromFavorites(data, function(response) {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            favoritesWidget.updateUsersList(response.data);
            MessageBox.setMessage("Пользователь удалён из избранного!");
        } else {
            MessageBox.setMessage("Ошибка при удалении пользователя из избранного");
        }
    });
}