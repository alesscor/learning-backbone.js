Organizer.ShowEventView=Organizer.ItemView.extend({
    initialize:function(){
        this.render();
        $("#show-event").html(this.el);
    },
    template:"#show-event-template"
});
Organizer.NewEventView=Organizer.ItemView.extend({
    tagName:"form",
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
    },
    template:"#event-form-template"
});

Organizer.EventView=Organizer.ItemView.extend({
    tagName:"li",
    className:"list-group-item",
    events:{
        "click a.btn-danger":"removeEvent"
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
    template:"#event-template"
});

Organizer.EventsListView=Organizer.ListView.extend({
    tagName:"ul",
    className:"list-group",
    ItemView:Organizer.EventView
});

Organizer.EventsLayoutView=Backbone.View.extend({
    render:function(){
        var template=Handlebars.compile($("#index-template").html());
        this.$el.html(template);

        var newEventView=new Organizer.NewEventView();
        var eventsListView=new Organizer.EventsListView({
            collection:this.collection
        });

        var events=this.$("#event-list");
        var new_event=this.$("#new-event");
        events.append(eventsListView.render().el);
        new_event.append(newEventView.render().el);

        return this;
    },
    initialize:function(){
        this.render();
    }

});