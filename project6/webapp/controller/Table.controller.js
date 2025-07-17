sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("project6.controller.Table", {
        onInit() {
            // var inputdata = new sap.ui.model.json.JSONModel("model/table.json");
            // this.getView().setModel(inputdata);
        },
        
        // filter
        onfilter: function(evt){
         var ofilter = evt.getParameter("value");
         var gfilter = new sap.ui.model.Filter("material_name", "Contains", ofilter);
         this.getView().byId("TID").getBinding("items").filter(gfilter);
        },

        //sorting
        onsort: function(evt){
            this.sort = !this.sort;
            var osort = new sap.ui.model.Sorter("material_name", this.sort);
            this.getView().byId("TID").getBinding("items").sort(osort);
           },

        // to naviagte 

        navigate (evt){
            var onav = new sap.ui.core.UIComponent.getRouterFor(this);
            onav.navTo("ListView",{
                "productIndex" : evt.getSource().getBindingContext("MATERIALS").getPath().split("/")[2]
            });

        }
    });
});