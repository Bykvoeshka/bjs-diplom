'use strict';
const userForm1 = new UserForm();

userForm1.loginFormCallback = data => ApiConnector.login(data, response => {
    if (response.success) {
        location.reload();
        console.log(`OK`);
    } else {
        userForm1.setLoginErrorMessage(response.data);
    }
});

userForm1.registerFormCallback = data => ApiConnector.register(data, response => {
    if (response.success) {
        location.reload();
        console.log(`OK`);
    } else {
        userForm1.setRegisterErrorMessage(response.data);
    }
});
