var _ = require('underscore'); //use for string interpolation out of laziness
var template = require('./licenseTemplate.js');

var templates = require('./templates.json');
//http://underscorejs.org/#template // a la mustache
_.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g
};

var licenseTypes = Object.keys(templates);

var createLicense = function(licenseType, options, callback) {
    var templateInput = templates[licenseType];
    if (!templateInput) {
        throw new Error('license not found: ' + licenseTypes.join(', ') + ' available');
    }
    var licenseTemplate = new template(templateInput);
    var license = licenseTemplate.licenseWithOptions(options);
    callback(null, license);
}

var licenseVars = function(licenseType, callback) {
    var licenseTemplate = new template(templateInput);
    return licenseTemplate.vars;
}

exports.createLicense = createLicense;
exports.licenseTypes = licenseTypes;
exports.createLicense = createLicense;
