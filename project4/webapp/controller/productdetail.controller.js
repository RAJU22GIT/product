sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("project4.controller.productdetail", {
        onInit() {
            var productsModel = new sap.ui.model.json.JSONModel("model/product.json");
          this.getView().setModel(productsModel);
          sap.ui.core.UIComponent.getRouterFor(this).getRoute("productdetailview").attachPatternMatched(this._objPatternMatched,this);
         
        },

        // _objPatternMatched:function(oEvent){
        //   var passedProductIndex = oEvent.getParameter("arguments").productIndex;          
        //   var productDetailModel = new sap.ui.model.json.JSONModel(this.getView().getModel().oData.Prouducts[passedProductIndex]);
        //   this.getView().setModel(productDetailModel,"productDetailModel");
         
        // },

        _objPatternMatched:function(oEvent){
            var that = this;
            var passedProductIndex = oEvent.getParameter("arguments").productIndex;
            if(!this.initialLoad) {
              this.initialLoad =true;
              window.setTimeout(function(){
                var productDetailModel = new sap.ui.model.json.JSONModel(that.getView().getModel().oData.Prouducts[passedProductIndex]);
                that.getView().setModel(productDetailModel,"productDetailModel");
              },500);
            }else{
              var productDetailModel = new sap.ui.model.json.JSONModel(that.getView().getModel().oData.Prouducts[passedProductIndex]);
                that.getView().setModel(productDetailModel,"productDetailModel");
            }
        },

        onNavigationBack () {

            this.getOwnerComponent().getRouter().navTo("RouteProduct");
        }
    });
});