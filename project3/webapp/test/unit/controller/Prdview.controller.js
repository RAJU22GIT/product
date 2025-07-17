/*global QUnit*/

sap.ui.define([
	"project3/controller/Prdview.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Prdview Controller");

	QUnit.test("I should test the Prdview controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
