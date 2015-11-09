(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['event-removal-template'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<!--\n<div id=\"myModal\" class=\"modal\" role=\"dialog\">\n -->\n\n  <div class=\"modal-dialog\">\n\n    <!-- Modal content-->\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\n        <h4 class=\"modal-title\">Modal Header</h4>\n      </div>\n      <div class=\"modal-body\">\n        <p>Are you sure you want to delete «"
    + container.escapeExpression(((helper = (helper = helpers.meantitle || (depth0 != null ? depth0.meantitle : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"meantitle","hash":{},"data":data}) : helper)))
    + "»?</p>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Not sure</button>\n\n        <button id=\"remove-event\" type=\"button\" class=\"btn btn-danger\">Pretty sure!!!</button>\n      </div>\n    </div>\n\n  </div>\n<!--\n</div>\n -->\n\n";
},"useData":true});
})();