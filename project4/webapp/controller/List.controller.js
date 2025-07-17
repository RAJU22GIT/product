sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("project4.controller.list", {
        onInit() {
            var listModel = new sap.ui.model.json.JSONModel("model/list.json");
            this.getView().setModel(listModel);
            if (!this.addproduct) {
                this.addproduct = new sap.ui.xmlfragment("project4.view.addlist", this);
                this.getView().addDependent(this.addproduct);
            }
        },

        // to nav to product page 
        onNavList() {
            var oroutelist = sap.ui.core.UIComponent.getRouterFor(this);
            oroutelist.navTo("RouteProduct");
        },

        // filter
        onSearch: function (event) {
            var search = event.getParameter("newValue");
            var oFilter = new sap.ui.model.Filter({
                filters: [
                    new sap.ui.model.Filter("ProductName", "Contains", search),
                    new sap.ui.model.Filter("ProductDescription", "Contains", search)
                ]
            });
            this.getView().byId("Listid").getBinding("items").filter(oFilter);
        },

        // to create
        Create: function () {
            this.mode = "ADD";
            var newProductObj = {
                "ProductName": "",
                "ProductDescription": "",
                "ProductUrl": ""
            };
            var productObj = new sap.ui.model.json.JSONModel(newProductObj);
            this.getView().setModel(productObj, "productObj");
            this.addproduct.open();
        },

        // to save our created fields

        onSaveProduct: function () {
            if (this.mode == "ADD") {
                this.getView().getModel().oData.Products.push(this.getView().getModel("productObj").oData);
                sap.m.MessageToast.show("New Product is added");
            }
            else {
                sap.m.MessageToast.show("Product is Updated");
            }
            this.getView().getModel().updateBindings(true);
            this.addproduct.close();
        },

        // to cancel 
        onCancelProduct: function () {
            this.addproduct.close();
        },

        // to edit 
        onEdit: function () {
            this.mode = "EDIT";
            if (!this.getView().byId("Listid").getSelectedItem()) {
                sap.m.MessageToast.show("Please select an item to edit!");
                return;

            }
            var editProductObj = this.getView().byId("Listid").getSelectedItem().getBindingContext().getObject();
            var productObj = new sap.ui.model.json.JSONModel(editProductObj);
            this.getView().setModel(productObj, "productObj");
            this.addproduct.open();

        },

        // to sort
        onSelSort: function () {
            if (!this.selSort) {
                this.selSort = new sap.ui.xmlfragment("project4.view.sortlist", this);
                this.getView().addDependent(this.selSort);
            }

            this.selSort.open();
        },
        onCancel: function () {
            this.selSort.close();
        },
        onConfirm: function () {
            var selAsc = sap.ui.getCore().byId("asc1").getSelected();
            var selDesc = sap.ui.getCore().byId("desc1").getSelected();

            if (selAsc) {
                var ascSorter = new sap.ui.model.Sorter("ProductName", false);
                this.getView().byId("Listid").getBinding("items").sort(ascSorter);
            } else if (selDesc) {
                var descSorter = new sap.ui.model.Sorter("ProductName", true);
                this.getView().byId("Listid").getBinding("items").sort(descSorter);
            }
            this.selSort.close();
        },

        onDelete() {

            if (!this.getView().byId("Listid").getSelectedItem()) {
                sap.m.MessageToast.show("Please select an item to Delete!");
                return;

            }
            if (!this.deleteDialog) {
                this.deleteDialog = sap.ui.xmlfragment("project4.view.deletelist", this);
                this.getView().addDependent(this.deleteDialog);
            }
            this.deleteDialog.open();

        },

        onDeleteConfirm: function () {
            var oList = this.getView().byId("Listid");
            var oSelectedItem = oList.getSelectedItem();

                var odelete = oSelectedItem.getBindingContext().getPath().split("/")[2];
                this.getView().getModel().oData.Products.splice(odelete,1);
                this.getView().getModel().updateBindings(true);
            

            this.deleteDialog.close();
        },

        onDeleteCancel: function () {

            this.deleteDialog.close();

        }
    });
});