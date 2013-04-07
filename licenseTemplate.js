var _ = require('underscore');

var license = function(body, header) {
	return {
		body: body,
		header : header,
	}
};

var varsForTemplate=function(templateBody){
	//get the vars
	return null;
}

var vars=varsForTemplate(this.body);

var licenseWithOptions=function (options) {
	// if we have a header we don't want to replace vars in body.. only need to change in header
	if (this.header) {
		var compiledHeader=_.template(this.header);
		var renderedHeader=compiledHeader(options);
		return new license(this.body, renderedHeader);
	}

	var compiledBody=_.template(this.body);
	var renderedBody=compiledBody(options);
	return new license(renderedBody, null);

}

var newTemplate = function(body, header) {
	return {
		body: body,
		header : header,
		vars : vars,
		licenseWithOptions : licenseWithOptions
	}
};

var newTemplate = function(bodyHeader) {
	return {
		body: bodyHeader.body,
		header : bodyHeader.header,
		vars : vars,
		licenseWithOptions : licenseWithOptions
	}
};

module.exports = newTemplate;