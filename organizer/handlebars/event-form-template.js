(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['event-form-template'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "    <div class=\"form-group\">\n        <label class=\"control-label\" for=\"event_title\">Title</label>\n        <input type=\"text\" id=\"event_title\" class=\"form-control\" name=\"title\">\n    </div>\n    <div class=\"form-group\">\n        <label class=\"control-label\" for=\"event_description\">Description</label>\n        <textarea id=\"event_description\" class=\"form-control\" name=\"description\"></textarea>\n    </div>\n    <input type=\"submit\" class=\"btn btn-primary\" value=\"Add an event\">\n\n";
},"useData":true});
})();