sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/model/json/JSONModel'
], (Controller) => {
    "use strict";

    return Controller.extend("project2.controller.View1", {
        onInit() {
            var productsList = new sap.ui.model.json.JSONModel("model/lists.json");
            this.getView().setModel(productsList, "productsList");  
        },
        onSearchList: function(evt){
            var Lstsearch = evt.getParameter("newValue");
            var filters = new sap.ui.model.Filter("ProductName","Contains",Lstsearch);
            this.getView().byId("LID").getBinding("items").filter(filters);
                    }
    });
});