'use strict';
const logoutButton = new LogoutButton();
const ratesBoard = new RatesBoard();
const favoritesWidget = new FavoritesWidget();
const moneyManager = new MoneyManager();

moneyManager.sendMoneyCallback = data =>
    ApiConnector.transferMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            favoritesWidget.setMessage(!response.success, `OK`);
        } else {
            favoritesWidget.setMessage(response.success, `Error`);
        }
    });

moneyManager.conversionMoneyCallback = data =>
    ApiConnector.convertMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            favoritesWidget.setMessage(!response.success, `OK`);
        } else {
            favoritesWidget.setMessage(response.success, `Error`);
        }
    });

moneyManager.addMoneyCallback = data =>
    ApiConnector.addMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            favoritesWidget.setMessage(!response.success, `OK`);
        } else {
            favoritesWidget.setMessage(response.success, `Error`);
        }
    });

favoritesWidget.removeUserCallback = data =>
    ApiConnector.removeUserFromFavorites(data, response => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(!response.success, `OK`);
        } else {
            favoritesWidget.setMessage(response.success, `Error`);
        }
    });

favoritesWidget.addUserCallback = data =>
    ApiConnector.addUserToFavorites(data, response => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(!response.success, `OK`);
        } else {
            favoritesWidget.setMessage(response.success, `Error`);
        }
    });

ApiConnector.getFavorites(response => {
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
        console.log(`OK`);
    } else {
        console.log(`Error`);
    }
});
logoutButton.action = function () {
    ApiConnector.logout(response => {
        if (response.success) {
            location.reload();
            console.log(`OK`);
        } else {
            console.log(`Error`);
        }
    })
};
let currentUser = function () {
    ApiConnector.current(response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            console.log(`OK`);
        } else {
            console.log(`Error`);
        }
    });
}
currentUser();

let rBoard = function () {
    ApiConnector.getStocks(response => {
        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
            console.log(`OK`);
        } else {
            console.log(`Error`);
        }
    });
}
rBoard();
setInterval(rBoard, 60000);
