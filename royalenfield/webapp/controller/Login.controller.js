sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("com.royalenfield.login.royalenfield.controller.Login", {
        onInit() {
        },
        onLoginPress: function () {
            var username = this.byId("username").getValue();
            var password = this.byId("password").getValue();
      
            if (username === "admin" && password === "admin123") {
              sap.m.MessageToast.show("Login Successful");
              // Navigate to next view if needed
            } else {
              sap.m.MessageToast.show("Invalid credentials. Try again.");
            }
          },
      
          onShowPassword: function (oEvent) {
            var isSelected = oEvent.getParameter("selected");
            var passwordInput = this.byId("password");
            passwordInput.setType(isSelected ? "Text" : "Password");
          },
      
          onForgotPassword: function () {
            sap.m.MessageBox.information("Password reset is not implemented.");
          }
      
    });
});