    
    
    $.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
      options.url = 'http://backbonejs-beginner.herokuapp.com' + options.url;
    });

    var C = Backbone.Collection.extend({url: "/users" });
    var c1 = new C;
    c1.fetch({success: function() {
        console.log( JSON.stringify(c1.get('c1').toJSON()) ); //{"id":"htq3l1q46ifvp65uqsya","firstname":"Thomas","lastname":"Davis","age":12} 
    }});
    
    var m1
    setTimeout( function() {
        m1= c1.get('c1');
        m1.set('firstname','apollo '+(new Date));
        m1.save(); 
    }, 500);

        // save() is called on a model that was fetched 
        // from the server, it constructs a URL by
        // appending the model’s id to the collection’s 
        // URL and sends an HTTP PUT to the server.
        
        // If the model is a new instance that was 
        // created in the browser (it doesn’t have an id),
        // then an HTTP POST is sent to the collection’s URL.
        
type bellow in console to get around asychronous exec:


    // Collections.create() create a new model, add it to the 
    // collection, and send it to the server in a single method call
    // via HTTP POST
    
    c1.create( {'firstname': 'new ' + (new Date)}); 
    c1.fetch()
    

    