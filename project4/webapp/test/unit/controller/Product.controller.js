/*global QUnit*/

sap.ui.define([
	"project4/controller/Product.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Product Controller");

	QUnit.test("I should test the Product controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
