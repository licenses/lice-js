var _ = require("underscore"); //use for string interpolation out of laziness
var Template = require("./licenseTemplate.js");

var templates = require('./templates.json');
//http://underscorejs.org/#template // a la mustache
_.templateSettings = {
	interpolate : /\{\{(.+?)\}\}/g
};

var licenseTypes = function() {
	return Object.keys(templates)
}

var createLicense = function(licenseType, options, callback){
	var templateInput = templates[licenseType];
	var licenseTemplate = new Template(templateInput);
	var license = licenseTemplate.licenseWithOptions(options);
	callback(null, license);
}

var licenseVars = function(licenseType, callback){
	var licenseTemplate = new Template(templateInput);
	return licenseTemplate.vars;
}

exports.createLicense = createLicense;
exports.licenseTypes = licenseTypes;
exports.createLicense = createLicense;
