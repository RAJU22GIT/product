sap.ui.define([
    "sap/ui/core/mvc/Controller"], 
    (Controller) => {
    "use strict";

    return Controller.extend("project3.controller.Desc", {
        onInit() {
            var DescList = new sap.ui.model.json.JSONModel("model/desc.json");
            this.getView().setModel(DescList);
        }
    });
});