Organizer.ShowEventView=Organizer.ItemView.extend({
    template:"#show-event-template"
});
Organizer.NewEventView=Organizer.ItemView.extend({
    initialize:function(){
        Backbone.Validation.bind(this);
    },
    bindings:{
        "[name=title]":{
            observe:"title",
            setOptions:{
                validate:true
            }
        },
        "[name=description]":{
            observe:"description",
            setOptions:{
                validate:true
            }
        }
    },
    model: new Organizer.Event(),
    tagName:"form",
    events:{
        "submit":"createEvent"
    },
    createEvent:function(e){
        var self=this;
        e.preventDefault();
        var title=this.$("#event_title").val();
        var description=this.$("#event_description").val();
        this.model.set({
            title:title,
            description:description,
            position:Organizer.events.nextPosition()
        });
        if(this.model.isValid(true)){
            // saves both the model and the collection
            Organizer.events.create(this.model.toJSON(),{
                success:function(){
                    self.el.reset();
                },
                error:function(){

                }
            }
            );
        }
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

    }
});

Organizer.ShowEventLayout=Organizer.Layout.extend({
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