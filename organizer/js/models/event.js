Organizer.Event=Backbone.Model.extend({
    initialize:function(){
        this.on("invalid",function(model,error){
            // console.error(error);
            $("#"+_.keys(error)[0]).parent().addClass("has-error");
        });
    },
    defaults:{
        title:"",
        description:""
    },
    validate:function(attrs,options){
        console.log("to review the value:",attrs.title)
        if(_.isEmpty(attrs.title)){
            return {"event_title":"Title has to be present!!!"};
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