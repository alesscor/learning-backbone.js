Organizer.ShowEventView=Organizer.ItemView.extend({
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

Organizer.EventsLayout=Organizer.Layout.extend({
    template:"#events-layout-template",
    regions:{
        eventsList:"#event-list",
        newEvent:"#new-event"
    },
    ready:function(){
        // this is the callback to the inherited render
        var newEventView=new Organizer.NewEventView();
        var eventsListView=new Organizer.EventsListView({
            collection:this.collection
        });
        this.eventsList.append(eventsListView.render().el);
        this.newEvent.append(newEventView.render().el);

    },
    initialize:function(){
        this.render();
    }

});

Organizer.ShowEventLayout=Organizer.Layout.extend({
    initialize:function(){
        this.render();
    },
    template:"#show-event-layout-template",
    regions:{
        event:"#event"
    },
    ready:function(){
        var eventView=new Organizer.ShowEventView({
            model:this.model
        });
        this.event.append(eventView.render().el);
    }
});