sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("project3.controller.Prdview", {
        onInit() {
            var productsModel = new sap.ui.model.json.JSONModel("model/prd.json");
            this.getView().setModel(productsModel, "products");
        },

        change: function (evt) {

            //single field search 
            // var tablesrch = evt.getParameter("newValue");
            // var filters = new sap.ui.model.Filter("ProductName","Contains",tablesrch);
            // this.getView().byId("Prdid").getBinding("items").filter(filters);

            // multi filed search
            var multiSearch = evt.getParameter("newValue");
            var arrSearch = [];

            var nameSearch = new sap.ui.model.Filter("ProductName", "Contains", multiSearch);
            var descSearch = new sap.ui.model.Filter("ProductDescription", "Contains", multiSearch);
            var locSearch = new sap.ui.model.Filter("Location", "Contains", multiSearch);

            //false = OR , true = AND

            var combinedSearch = new sap.ui.model.Filter([nameSearch, descSearch, locSearch], false);

            arrSearch.push(combinedSearch);

            this.getView().byId("Prdid").getBinding("items").filter(arrSearch);
        },

        // TO SORT THE FIELDS 
        onSortPress: function (evt) {
            this._sortDescending = !this._sortDescending;
            var oSorter = new sap.ui.model.Sorter("ProductName", this._sortDescending);
            this.getView().byId("Prdid").getBinding("items").sort(oSorter);
        },

        // TO NAVIGATE to list
        onNavPress() {
            var oListRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oListRouter.navTo("RouteListview");
        },

        // To NAVIGATE to DESC
        onNavDesc() {
            var oDescRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oDescRouter.navTo("RouteDescview");
        },

        // To ADD THE NEW FIELDS
        onAddProductPress: function(){
            if(!this.addproduct){
            this.addproduct = new sap.ui.xmlfragment("project3.view.addproduct",this);
            this.getView().addDependent(this.addproduct);
            }
            var newProductObj = {
                "ProductId":this.getView().getModel("products").oData.Prouducts.length + 1,
                "ProductName": "",
                "ProductDescription": "",
                "Location": "",
                "CostCenter": "",
                "Status":"Inactive"
            };
            var productObj = new sap.ui.model.json.JSONModel(newProductObj);
            this.getView().setModel(productObj,"productObj");
            this.addproduct.open();
        },
        onSaveProduct:function(){
            this.getView().getModel("products").oData.Prouducts.push(this.getView().getModel("productObj").oData);
            this.getView().getModel("products").updateBindings(true);
            this.addproduct.close();
        },
        onCancelProduct:function(){
            this.addproduct.close();
        },

        onRowPress: function (oEvent) {

            var oSelectedItem = oEvent.getSource();
            var oCtx = oSelectedItem.getBindingContext("products"); // Your model name
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);


            var sProductName = oCtx.getProperty("ProductName");

            oRouter.navTo("RouteListview", {
                ProductName: sProductName
            });

        }


    });
});