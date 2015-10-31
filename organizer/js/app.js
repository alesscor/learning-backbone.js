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
        Organizer.router=new Organizer.Router();
        Backbone.history.start();
        // Organizer.events.reset([{title:"test1"},{title:"test2"},{title:"test3"}]);
    },
formatDate:function(date, fmt) {
    function pad(value) {
        return (value.toString().length < 2) ? '0' + value : value;
    }
    return fmt.replace(/%([a-zA-Z])/g, function (_, fmtCode) {
        switch (fmtCode) {
        case 'Y':
            return date.getUTCFullYear();
        case 'M':
            return pad(date.getUTCMonth() + 1);
        case 'd':
            return pad(date.getUTCDate());
        case 'H':
            return pad(date.getUTCHours());
        case 'm':
            return pad(date.getUTCMinutes());
        case 's':
            return pad(date.getUTCSeconds());
        default:
            throw new Error('Unsupported format code: ' + fmtCode);
        }
    });
}
};

$(document).ready(function(){
    Organizer.initialize();
});