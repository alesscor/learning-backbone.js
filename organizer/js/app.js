/*
    Variable for the global scope, no var declaration
*/
Organizer={
    initialize:function(){
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
        // Organizer.events.reset([{title:"test1"},{title:"test2"},{title:"test3"}]);
    }
};

$(document).ready(function(){
    Organizer.initialize();
});