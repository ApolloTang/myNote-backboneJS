
::::::::::::::::::
Data driven events
::::::::::::::::::

    var m = new (Backbone.Model.extend({defaults:{a:'a'}})) 
    var v = new (Backbone.View.extend({ 
       model: m  
       , initialize: function () { this.listenTo( this.model, 'change', this.doSomthing);  }
       , doSomthing: function () { console.log('doSomthing') }
    }));

    m.set('a','new a');  // doSomthing
    
:::::::::::::::::   
DOM driven events 
::::::::::::::::: 


var v = new (Backbone.View.extend({
   el: 'body'
   , events : {"click button" : "clickCallback"}   
   , clickCallback: function () { console.log('button clicked') }
}));


::::::::::::::::::::   
Custom event on view
::::::::::::::::::::

var v = new (Backbone.View.extend({ 
    render: function() { this.trigger('render'); }
  }));
var DoThisOnRender = function() { console.log( 'some view has been rendered'); }; 
v.on('render', DoThisOnRender ); 

v.render(); // some view has been rendered 


:::::::::::::::::::   
Router driven Event 
:::::::::::::::::::

var router = new (Backbone.Router.extend({
	routes: {
		"page/:id": "page"          
		, "main": "main"        
		, "*actions": "catchMiss"  
	}
}));

var handlePage = function() {console.log('handlePage fired')}
var handleMain = function() {console.log('handleMain fired')}
var handleRoute = function( router, route, params) {
	console.log('handleRoute fired')
    console.log('in handleRoute, router =', router);
	console.log('in handleRoute, route =', route);
	console.log('in handleRoute, params =', params);	
} 

router.on( 'route:page', handlePage );
router.on( 'route:main', handleMain );
router.on( 'route', handleRoute );

Backbone.history.start();

