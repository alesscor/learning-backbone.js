Organizer.Event=Backbone.Model.extend({
    defaults:{
        title:"",
        description:""
    },
    validation:{
        title:{
            required:true,
            msg:"Please enter a title"
        },
        description:{
            required:true
        }
    },
    localStorage:new Backbone.LocalStorage("events"),
    idAttribute:"position",
    getTitle:function(){
        return this.get("title");
    },
    getMeanTitle:function(){
        return "The stupid '"+this.get("title")+"'";
    }
});