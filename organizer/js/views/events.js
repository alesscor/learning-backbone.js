Organizer.ShowEventView=Backbone.View.extend({
    initialize:function(){
        this.render();
    },
    render:function(){
        var template=Handlebars.compile($("#show-event-template").html());
        this.$el.html(template(this.model));
        $("#show-event").html(this.el);
        return this;
    }
});
Organizer.NewEventView=Backbone.View.extend({
    tagName:"form",
    initialize:function(){
        this.render();
    },
    render:function(){
        var template=Handlebars.compile($("#event-form-template").html());
        this.$el.html(template());
        $("#new-event").html(this.el);
        return this;
    },
    events:{
        "submit":"createEvent"
    },
    createEvent:function(e){
        var self=this;
        e.preventDefault();
        // var title=this.$el.find("#event_title").val();
        // this is a shortcut ----|
        //                        v provided by Backbone.js
        var title=this.$("#event_title").val();
        var description=this.$("#event_description").val();
        // builds the instance
        var model=new Organizer.Event();
        // console.log("model.isValid() result:",model.isValid()); // to call from other place
        model.save({
            title:title,
            description:description,
            position:Organizer.events.nextPosition()
        },
        {
            success:function(){
                Organizer.events.add(model);
                self.el.reset();
                self.$(".has-error").removeClass("has-error");
            },
            error:function(){

            }
        }
        );
    }
});
Organizer.EventsListView=Backbone.View.extend({
    initialize:function(){
        console.log("view was created",Organizer.formatDate(new Date($.now()), '%H:%m:%s'));
        this.listenTo(this.collection,"reset",this.render);
        this.listenTo(this.collection,"add",this.render);
        this.listenTo(this.collection,"remove",this.render);
        // this.stopListening(this.collection);
    },
    /*
     * Internal representation includes
     *          el: the element's object (generated)
     *          tagName: the element's nature (setting)
     */
    render:function(){
        var events_elements=[]; // to optimize before #sendItToTheDOM
        this.collection.each(function(event){
            var eventView=new Organizer.EventView({model:event});
            events_elements.push(eventView.render().el);
        });
        this.$el.html(events_elements);
        $("#event-list").append(this.el); // :#sendItToTheDOM
        return this;
    },
    tagName:"ul",
    className:"list-group"
    /*
        it reconizes also: tagName and className
    */
});

Organizer.EventView=Backbone.View.extend({
    render:function(){

        var template=Handlebars.compile($("#event-template").html());
        this.$el.html(template(this.model.toJSON()));
        return this;
    },
    tagName:"li",
    className:"list-group-item",
    events:{
        "click a.btn-danger":"removeEvent",
        "click .show":"showEvent"
    },
    removeEvent:function(e){
        var self=this;
        e.preventDefault();
        $("#theRemoveModal").modal({
        });
        var template=Handlebars.compile($("#event-removal-template").html());
        $("#theRemoveModal").html(template({meantitle:this.model.getMeanTitle()}));
        $("#theRemoveModal #remove-event").on("click",function(e){
            self.model.destroy();
            $("#theRemoveModal").modal("hide");
        });
    },
    showEvent:function(e){
        e.preventDefault();
        var position=$(e.currentTarget).data("position");
        Organizer.router.navigate("events/"+position,{trigger:true});
    }

});