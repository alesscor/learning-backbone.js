Organizer.ItemView=Backbone.View.extend({
    render:function(){
        var template=Handlebars.compile($(this.template).html());
        var data={};
        if(this.model){
            data=_.isFunction(this.model.toJSON) ? this.model.toJSON():this.model;
        }
        this.$el.html(template(data));
        return this;
    }
});

Organizer.ListView=Backbone.View.extend({
    initialize:function(){
        console.log("view was created",Organizer.formatDate(new Date($.now()), '%H:%m:%s'));
        this.collection.on("reset",this.render,this);
        this.collection.on("add",this.render,this);
        this.collection.on("remove",this.render,this);
    },
    render:function(){
        var elements=[]; // to optimize before #sendItToTheDOM
        var self=this;
        this.collection.each(function(element){
            var itemView=new self.ItemView({model:element});
            elements.push(itemView.render().el);
        });
        this.$el.html(elements);
        return this;
    }
});