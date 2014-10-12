::::: Eg, a simple view: 
 
   var V = Backbone.View.extend({
        el: 'body'
        , render: function() {
            $(this.el).html('hello');
        }      
    });
    var v1 = new V
    v1.render();
    
    
::::: Eg. inserting into container and removing it.

    // create a box for item to insert
        var Box = Backbone.View.extend({ 
                el: '<div id="box"></div>'
                , initialize: function() { $('body').append(this.el) }        
            });
        var box = new Box;
    
    // create an item to be insert into the box above.
        var Item = Backbone.View.extend({
              el: $('<span id="item">AAA</span>')
            , render: function() { box.$el.html(this.el)}
        })
        var item = new Item();

    /*    console 
        $('#box')[0]       // <div id=​"box">​</div>​

        item.render()
        $('#box')[0]       // <div id=​"box">​<span id=​"item">​AAA​</span>​</div>​

        item.remove()
        $('#box')[0]       // <div id=​"box">​</div>​

        item.el            // <span id=​"item">​AAA​</span>​
        item.setElement('<a>BBB</a>');
        item.el            // <a>​BBB​</a>​

        $('#box')[0]       // <div id=​"box">​</div>​
        item.render()
        $('#box')[0]       //<div id=​"box">​<a>​BBB​</a>​</div>​
    */
    

 
::::: Eg. associate a model to a view

		var M = Backbone.Model.extend();
        var m1 = new M({a: 'a'})
        var Item_V = Backbone.View.extend({
              el: 'body'
            , render: function() { 
                var htmlToShow = this.model.get('a');
                this.$el.html(htmlToShow)
            }
        });
        var item_V = new Item_V({ model: m1});   // <-- * associate view with model at instantiation *
                                                 //     * now model attributes are accessible in 
												 //     * this.model.get(attributeName)		
        item_V.render();
        $('body')[0]    //<body>a</body>
        
        
::::: Eg. assocaite a collection to a view
        
      // create a 10 instance of model M  
            var M = Backbone.Model.extend();
            var models = [];
            for (var i=0; i<10; i++) {models.push(new M({a:'a'+i.toString()}))};
      // add the created 10 instance of model to collection
            var COL1 = Backbone.Collection.extend();
            var col1 = new COL1(models);
            console.log(_.map(col1.models, function(elm){ return elm.cid; }));
            console.log(_.map(col1.models, function(elm){ return elm.get('a');}));
      // define the view constructor 
           var V = Backbone.View.extend({
                el: 'body'
                , render: function() { 
                    var htmlToDisplay = '';
                    var iterator = function(model) { htmlToDisplay += '<li><span>'+ model.cid + ':</span>&nbsp;<span>'+ model.get('a') +'</span></li>'; }
                    _.each( this.collection.models, iterator);
                    htmlToDisplay = '<ul>'+ htmlToDisplay +'</ul>'
                    this.$el.html(htmlToDisplay);
                    return this;
                 } // end render   
            });
      // instantiate a view
            var v = new V({ collection: col1}); 
		//      * associate this view with collection instance col1  *
		//      * now model items are accessible via: 
		//      *            this.collection.get(cid)	
												
      // render
            v.render();
            
            
            
        
        


    
    