Organizer.ItemView=Backbone.View.extend({
    render:function(){
        var data={};
        if(this.model){
            data=_.isFunction(this.model.toJSON) ? this.model.toJSON():this.model;
        }
        this.$el.html(Handlebars.templates[this.template](data));
        if(!_.isUndefined(this.bindings)){
            this.stickit();
        }
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

Organizer.Layout=Backbone.View.extend({
    render:function(argument){
        var self=this;
        this.$el.html(Handlebars.templates[this.template]());
        _.each(this.regions,function(selector,name){
            self[name]=self.$(selector);
        });
        if(this.ready){
            this.ready();
        }
        return this;
    }
});

Organizer.BaseAppLayout=Backbone.View.extend({
    render:function(view){
        this.$el.empty();
        view.render();
        this.$el.append(view.el);
    }
});