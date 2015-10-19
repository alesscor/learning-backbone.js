Organizer.Event=Backbone.Model.extend({
    defaults:{
        title:""
    },
    localStorage:new Backbone.LocalStorage("events"),
    getTitle:function(){
        return this.get("title");
    },
    getMeanTitle:function(){
        return "The stupid '"+this.get("title")+"'";
    }
});