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
        Organizer.events=new Organizer.EventsCollection();
        new Organizer.EventsLayout({
            collection:Organizer.events,
            el:"#index"
        });
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
        Organizer.events=new Organizer.EventsCollection();
        Organizer.events.fetch();
        new Organizer.ShowEventLayout({
            model:Organizer.events.localStorage.find({id:id}),
            el:"#show"
        });
        console.log(id);
    }

});