sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";
    return Controller.extend("project6.controller.List", {
        onInit() {
            // var listmodel = new sap.ui.model.json.JSONMoedel("model/list.json");
            // this.getView().setModel(listmodel);

            sap.ui.core.UIComponent.getRouterFor(this).getRoute("ListView").attachPatternMatched(this._objPatternMatched, this);
        },
        _objPatternMatched: function (oEvent) {
            var passedProductIndex = oEvent.getParameter("arguments").productIndex;
            var correctRecord = [this.getView().getModel("MATERIALS").getProperty("/vendors")[passedProductIndex]];
                var productDetailModel = new sap.ui.model.json.JSONModel({vendors: correctRecord});
                this.getView().byId("LID1").setModel(productDetailModel, "VendorValue");
            }
        });
    }
);