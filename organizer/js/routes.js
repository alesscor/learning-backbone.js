Organizer.Router=Backbone.Router.extend({
    routes:{
        "test":"greet",
        "":"index"
    },
    greet:function(){
        console.log("Greetings!!!",Organizer.formatDate(new Date($.now()), '%H:%m:%s'));
    }
});