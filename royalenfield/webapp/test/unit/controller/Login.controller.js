/*global QUnit*/

sap.ui.define([
	"com/royalenfield/login/royalenfield/controller/Login.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Login Controller");

	QUnit.test("I should test the Login controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
