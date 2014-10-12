//::::  COMMENTS ::::::


(function ($) { $(function(){
console.log("d- - - - Begin jQuery wrapper - - - - - -");


    Album = Backbone.Model.extend({});

    AlbumView = Backbone.View.extend({
        defaults     : {title: "no title"}
        , initialize  : function () { 
            this.templateString = $('#album-template').html();      console.log("this.templateStrign: ", this.templateString);
            this.templateFunction = _.template( this.templateString );
            }
        , el          : "#container"
        , render: function () {
            var dataObj = this.model.toJSON();                      console.log("dataObj: ", dataObj);
            var htmlString = this.templateFunction( dataObj );      console.log("htmlString: ", htmlString);
            $(this.el).html(htmlString);
            //this.$el.html(htmlString);
            return this;
        }
    });


    album = new Album({ title: 'Abbey Road', artist: 'The Beatles', tracks: [{ title: 'Track A'}] });
    albumView = new AlbumView({ model: album });
    
    var DOM_obj = albumView.render().el;
    console.log("DOM_obj: ", DOM_obj);
    console.log("typeof DOM_obj: ", typeof DOM_obj);
    
    var my_HTMLsting = $(DOM_obj).html();
    console.log("my_HTMLsting: ", my_HTMLsting);
    $('#container').append( my_HTMLsting );
    
    
console.log(window);
console.log("d- - - - END jQuery wrapper - - - - - -");
}); })(jQuery);




console.log("- - - - END OF main.js - - - - - -");