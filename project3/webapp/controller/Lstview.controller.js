sap.ui.define([
    "sap/ui/core/mvc/Controller"], 
    (Controller) => {
    "use strict";

    return Controller.extend("project3.controller.Lstview", {
        onInit() {
            var productsList = new sap.ui.model.json.JSONModel("model/lst.json");
            this.getView().setModel(productsList, "productsList");
        },

        onchange: function (evt) {
            var search = evt.getParameter("value");
            var filters = new sap.ui.model.Filter("ProductName", "Contains", search);
            this.getView().byId("lid").getBinding("items").filter(filters);
        },

        onNavTable() {
            var oHistory = sap.ui.core.routing.History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                // Go to previous browser history page
                window.history.go(-1);
            }
            else {
                var oListRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oListRouter.navTo("RoutePrdview");
            }

        }
    });
});