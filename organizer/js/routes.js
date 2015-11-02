Organizer.Router=Backbone.Router.extend({
    routes:{
        "test":"greet",
        "":"index",
        "events/:id":"showEvent"
    },
    greet:function(){
        console.log("Greetings!!!",Organizer.formatDate(new Date($.now()), '%H:%m:%s'));
    },
    index:function(){
        var eventsLayout=new Organizer.EventsLayout({
            collection:Organizer.events
        });
        Organizer.appLayout.render(eventsLayout);
        Organizer.events.fetch({
            success:function(){
            },
            error:function(){
                error.log("error at fetching");
                console.error("error at programming");
            }
        });

    },
    showEvent:function(id){
        Organizer.events.fetch();
        var showLayout=new Organizer.ShowEventLayout({
            model:Organizer.events.localStorage.find({id:id})
        });
        Organizer.appLayout.render(showLayout);
        console.log(id);
    }

});