sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("assesment.controller.list", {
        onInit() {
            sap.ui.core.UIComponent.getRouterFor(this).getRoute("RouteList").attachPatternMatched(this._rajunav, this);
        },
        // _rajunav : function(oevent) {
        //     var matid = oevent.getParameter("arguments").indexlist;
        //     var getvendor = this.getView().getModel("material").oData.find(mat=>mat.materialId === matid).vendors;
        //     var vendorview = new sap.ui.model.json.JSONModel(getvendor);
        //     this.getView().byId("LID1").setModel(vendorview, "vendorview");
        // }

        _rajunav: function (oevent) {
            this.matid = oevent.getParameter("arguments").indexlist;
            var materials = this.getView().getModel("material").oData;
            var getvendor = [];

            for (var i = 0; i < materials.length; i++) {
                if (materials[i].materialId === this.matid) {
                    getvendor = materials[i].vendors;
                }
            }

            var vendorview = new sap.ui.model.json.JSONModel(getvendor);
            this.getView().byId("LID1").setModel(vendorview, "vendorview");
        },

        // filter
        Onpressfil: function (evt) {
            var filt = evt.getParameter("value");
            var ofilt = new sap.ui.model.Filter("vendorName", "Contains", filt);
            this.getView().byId("LID1").getBinding("items").filter(ofilt);
        },

        //sorting
        OnSortlist() {
            this._sortlist = !this._sortlist;
            var osort = new sap.ui.model.Sorter("vendorName", this._sortlist);
            this.getView().byId("LID1").getBinding("items").sort(osort);
        },

        // return to first page
        onNavPress() {
            this.getOwnerComponent().getRouter().navTo("RouteProduct");
        },

        // to add 
        OnCreatelist() {
            if (!this.add) {
                this.add = new sap.ui.xmlfragment("assesment.view.listcreate", this);
                this.getView().addDependent(this.add);
            }
            var listone = {
                "vendorId": " ",
                "vendorName": " "
            };
            var listtwo = new sap.ui.model.json.JSONModel(listone);
            this.getView().setModel(listtwo, "listtwo");
            this.add.open();

        },
        onSaveProduct() {
            // this.getView().getModel("material").oData.push(this.getView().getModel("listtwo").oData);
            // this.getView().getModel("material").oData.find(mat=> mat.materialId === (this.matid)).vendors.push(this.getView().getModel("listtwo").oData)
            // this.getView().getModel("material").updateBindings(true);
            // this.add.close();
            // Step 1: Get the model and path
            var oMaterialModel = this.getView().getModel("material");
            var aMaterials = oMaterialModel.getProperty("/");

           
            var materialObj = aMaterials.find(mat => mat.materialId === this.matid);

          
            if (materialObj) {
                var aVendors = materialObj.vendors || [];
                aVendors.push(this.getView().getModel("listtwo").getData());
                materialObj.vendors = aVendors;

               
                oMaterialModel.setProperty("/", aMaterials);

            
                oMaterialModel.updateBindings(true);
            }

            // Close dialog
            this.add.close();
        },
        onCancelProduct() {
            this.add.close();

        }
    });
});