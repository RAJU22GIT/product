sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("project4.controller.Product", {
        onInit() {
            var productsModel = new sap.ui.model.json.JSONModel("model/product.json");
            this.getView().setModel(productsModel);
            if (!this.addproduct) {
                this.addproduct = new sap.ui.xmlfragment("project4.view.addproduct", this);
                this.getView().addDependent(this.addproduct);
            }
        },
       // Navigate  to details 
        ondetails: function(evt) {
            var odetailRouter = sap.ui.core.UIComponent.getRouterFor(this);
            odetailRouter.navTo("productdetailview",{
                "productIndex" : evt.getSource().getBindingContext().getPath().split("/")[2]
            })
         
        },

         //  NAVIGATE to list
         onNavPress : function () {
			this.getOwnerComponent().getRouter().navTo("RouteListview");
		},
        
    // filter

        change: function (evt) {

            var searchString = evt.getParameter("newValue");
            var oFilter = new sap.ui.model.Filter({
                filters: [
                    new sap.ui.model.Filter("ProductName", "Contains", searchString),
                    new sap.ui.model.Filter("Location", "Contains", searchString)
                ]
            });
            this.getView().byId("Prdid").getBinding("items").filter(oFilter);

            // multi filed search
            // var multiSearch = evt.getParameter("newValue");
            // var arrSearch = [];

            // var nameSearch = new sap.ui.model.Filter("ProductName", "Contains", multiSearch);
            // var descSearch = new sap.ui.model.Filter("ProductDescription", "Contains", multiSearch);
            // var locSearch = new sap.ui.model.Filter("Location", "Contains", multiSearch);

            // //false = OR , true = AND

            // var combinedSearch = new sap.ui.model.Filter([nameSearch, descSearch, locSearch], false);

            // arrSearch.push(combinedSearch);

            // this.getView().byId("Prdid").getBinding("items").filter(arrSearch);
        },

        // TO SORT THE FIELDS (Both ASC AND DSC)

        onSortPress: function (evt) {
            this._sortDescending = !this._sortDescending;
            var oSorter = new sap.ui.model.Sorter("ProductName", this._sortDescending);
            this.getView().byId("Prdid").getBinding("items").sort(oSorter);
        },

        // to sort by ASC

        onAscPress: function (evt) {
            var oSorter = new sap.ui.model.Sorter("ProductName", false);
            this.getView().byId("Prdid").getBinding("items").sort(oSorter);
        },

        // to sort by DSC

        onDscPress: function (evt) {
            var oSorter = new sap.ui.model.Sorter("ProductName", true);
            this.getView().byId("Prdid").getBinding("items").sort(oSorter);
        },

        // to add thge new fields

        onAddProductPress: function () {
            this.mode = "ADD";
            var newProductObj = {
                "ProductId": this.getView().getModel().oData.Prouducts.length + 1,
                "ProductName": "",
                "ProductDescription": "",
                "Location": "",
                "CostCenter": "",
                "Status": "Inactive"
            };
            var productObj = new sap.ui.model.json.JSONModel(newProductObj);
            this.getView().setModel(productObj, "productObj");
            this.addproduct.open();
        },
        onSaveProduct: function () {
            if (this.mode == "ADD") {
                this.getView().getModel().oData.Prouducts.push(this.getView().getModel("productObj").oData);
                sap.m.MessageToast.show("New Product is added");
            }
            else {
                sap.m.MessageToast.show("Product is Updated");
            }
            this.getView().getModel().updateBindings(true);
            this.addproduct.close();
        },
        onCancelProduct: function () {
            this.addproduct.close();
        },

        // to edit

        onEditProductPress: function () {
            this.mode = "EDIT";
            if (!this.getView().byId("Prdid").getSelectedItem()) {
                sap.m.MessageToast.show("Please select an item to edit!");
                return;

            }
            var editProductObj = this.getView().byId("Prdid").getSelectedItem().getBindingContext().getObject();
            var productObj = new sap.ui.model.json.JSONModel(editProductObj);
            this.getView().setModel(productObj, "productObj");
            this.addproduct.open();
        },
        // TO DELETE
        onDeleteProductPress: function (evt) {
            var selectedTableRow = evt.getSource().getBindingContext().getPath().split("/")[2];
            this.getView().getModel().oData.Prouducts.splice(selectedTableRow, 1);
            this.getView().getModel().updateBindings(true);
        },

        // radio button

        onSelSort: function () {
            if (!this.selSort) {
                this.selSort = new sap.ui.xmlfragment("project4.view.sort", this);
                this.getView().addDependent(this.selSort);
            }

            this.selSort.open();
        },
        onCancel: function () {
            this.selSort.close();
        },
        onConfirm: function () {
            var selAsc = sap.ui.getCore().byId("asc").getSelected();
            var selDesc = sap.ui.getCore().byId("desc").getSelected();

            if (selAsc) {
                var ascSorter = new sap.ui.model.Sorter("ProductName", false);
                this.getView().byId("Prdid").getBinding("items").sort(ascSorter);
            } else if (selDesc) {
                var descSorter = new sap.ui.model.Sorter("ProductName", true);
                this.getView().byId("Prdid").getBinding("items").sort(descSorter);
            }
            this.selSort.close();
        }
    });
});
