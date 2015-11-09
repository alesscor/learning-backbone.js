# Learning Backbone.js

This experiment is to learn Backbone.js and other related technologies:

- Using a Content Delivery Network http://cdnjs.com to get libraries.
- Using some Underscore.js functions.
- Using bootstrap-tour to provide a tour in an external index page.
- Using bootstrap modals to warn about events going to be deleted instead of  `alert()` in the interface.
- Using extensions and inheritance from Backbone Models, Views and * (i.e. Collections and Routers).
- Remember to reference the `this` instance that you really mean. It's been done in some code with variable `self`.
- Added function to format date called `formatDate`, taken from http://stackoverflow.com/a/2315478/3802741.
- Added plugin Backbone.Validation, by extending Backbone.Validation.callbacks at `/organizer/js/validation.js`.
- The validation interface is enhanced with data bindings provided by StickIt, which are attached to data entry events to start giving feedback to the user. This library is available at cdnjs.com.
- Steps taken to optimize the templates with precompiling Handlebars.js, all to be done based on directory `/organizer`:

    - Remove the reference to `handlebars` library from `index.html`.
    - Include a reference to `handlebars.runtime` library in `index.html`.
    - Use `node.js`, `npm` and `handlebars` (v0.12.1, 2.5.1 and 4.0.4 respectively, all previously installed with handlebars installed in the local directory).
    - Make a directory named handlebars and make a text file with the name of each template, the suffix ".handlebars" and the content of its template (wrapped by `<script>`elements): show-event-layout-template, events-layout-template, event-template, event-form-template, show-event-template, event-removal-template.
    - Precompile each `.handlebars` file with handlebars. For example `node_modules/handlebars/bin/handlebars handlebars/show-event-layout-template.handlebars -f handlebars/show-event-layout-template.js`.
    - Delete the templates inside the `index.html` file, there is a backup called `index.old.html`, it will be interesting compare the performance between optimized and not optimized versions and this file helps.
    - Include each handlebars-generated .js file into `index.html`, for example `<script src="handlebars/show-event-layout-template.js"></script>`.
    - Replace the variable template and calls to template function with `Handlebars.templates[this.template]` function. It happens twice in `base.js` file and once in `/views/events.js` file.
    - Remove the hash the views' templates property in `views/events.js` file.



