sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("assesment.controller.Product", {
        onInit() {
            // var Vendors = new sap.ui.model.json.JSONModel("model/mat.json");
            // this.getView().byId("LID").setModel(Vendors);
        },
        onfilter: function(evt){
            var ofilter = evt.getParameter("value");
            var gfilter = new sap.ui.model.Filter("material_name", "Contains", ofilter);
            this.getView().byId("id").getBinding("items").filter(gfilter);
           },
           onsort: function(evt){
            this.sort = !this.sort;
            var osort = new sap.ui.model.Sorter("material_name", this.sort);
            this.getView().byId("id").getBinding("items").sort(osort);
           },
           // live change filter
           ONfilter: function(evt){
            var ofilter = evt.getParameter("newValue");
            var gfilter = new sap.ui.model.Filter("vendor_name", "Contains", ofilter);
            this.getView().byId("LID").getBinding("items").filter(gfilter);
           },
           OnNavi (evt) {
                  var onav = sap.ui.core.UIComponent.getRouterFor(this);
                  onav.navTo("RouteList", {"indexlist": evt.getSource().getBindingContext("material").getProperty().materialId}

                  );

           }
    });
});