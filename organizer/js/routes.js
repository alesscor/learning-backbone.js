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
        Organizer.events=new Organizer.Events();
        new Organizer.NewEventView();
        new Organizer.EventsListView({
            collection:Organizer.events
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
        Organizer.events=new Organizer.Events();
        Organizer.events.fetch();
        new Organizer.ShowEventView({model:Organizer.events.localStorage.find({id:id})});
        // console.log(id);
    }

});