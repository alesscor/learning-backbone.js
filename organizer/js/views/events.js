Organizer.NewEventView=Backbone.View.extend({
    tagName:"form",
    initialize:function(){
        this.render();
    },
    render:function(){
        var template=Handlebars.compile($("#event-form-template").html());
        this.$el.html(template());
        $("#new-event").html(this.el);
        return this;
    },
    events:{
        "submit":"createEvent"
    },
    createEvent:function(e){
        var self=this;
        e.preventDefault();
        // var title=this.$el.find("#event_title").val();
        // this is a shortcut ----|
        //                        v provided by Backbone.js
        var title=this.$("#event_title").val();
        // builds the instance
        var model=new Organizer.Event();
        model.save({
            title:title
        },
        {
            success:function(){
                Organizer.events.add(model);
                self.el.reset();
            },
            error:function(){

            }
        }
        );
    }
});
Organizer.EventsListView=Backbone.View.extend({
    initialize:function(){
        console.log("view was created");
        this.listenTo(this.collection,"reset",this.render);
        this.listenTo(this.collection,"add",this.render);
        this.listenTo(this.collection,"remove",this.render);
        // this.stopListening(this.collection);
    },
    /*
     * Internal representation includes
     *          el: the element's object (generated)
     *          tagName: the element's nature (setting)
     */
    render:function(){
        var events_elements=[]; // to optimize before #sendItToTheDOM
        this.collection.each(function(event){
            var eventView=new Organizer.EventView({model:event});
            events_elements.push(eventView.render().el);
        });
        this.$el.html(events_elements);
        $("#event-list").append(this.el); // :#sendItToTheDOM
        return this;
    },
    tagName:"ul",
    className:"list-group"
    /*
        it reconizes also: tagName and className
    */
});

Organizer.EventView=Backbone.View.extend({
    render:function(){

        var template=Handlebars.compile($("#event-template").html());
        this.$el.html(template(this.model.toJSON()));
        return this;
    },
    tagName:"li",
    className:"list-group-item",
    events:{
        "click a":"removeEvent"
    },
    removeEvent:function(e){
        var self=this;
        e.preventDefault();
        $("#theRemoveModal").modal({
        });
        var template=Handlebars.compile($("#event-removal-template").html());
        $("#theRemoveModal").html(template({meantitle:this.model.getMeanTitle()}));
        $("#theRemoveModal #remove-event").on("click",function(e){
            self.model.destroy();
            $("#theRemoveModal").modal("hide");
        });

        // $("#myModal .modal-body").html("Are you sure you want to delete '"+this.model.getMeanTitle()+"'?");
        /*
            if(confirm("Are you sure you want to delete '"+this.model.getMeanTitle()+"'")){
                this.model.destroy();
            }
        */
    }
});