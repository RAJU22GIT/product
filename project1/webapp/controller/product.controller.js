sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/model/json/     onSearchProducts: function(evt){
var Prdsearch = evt.getParameter("newValue");
var filters = new sap.ui.model.Filter("ProductName","Contains",Prdsearch);
this.getView().byId("Prdid").getBinding("items").filter(filters);
        }JSONModel'
], function (Controller) {
    "use strict";

    return Controller.extend("project1.controller.product", {
        onInit() {
            var productsModel = new sap.ui.model.json.JSONModel("model/products.json");
            this.getView().setModel(productsModel, "products");

            var productsList = new sap.ui.model.json.JSONModel("model/list.json");
            this.getView().setModel(productsList, "productsList");   
        },
   ,
        changenew : function(evt){
            var Prdsearch = evt.getParameter("value");
            var filters = new sap.ui.model.Filter("ProductName","Contains",Prdsearch);
            this.getView().byId("Prdid").getBinding("items").filter(filters);     
        }
    });
});