/*global QUnit*/

sap.ui.define([
	"northwindproject/controller/listproduct1.controller"
], function (Controller) {
	"use strict";

	QUnit.module("listproduct1 Controller");

	QUnit.test("I should test the listproduct1 controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
