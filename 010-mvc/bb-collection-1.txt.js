::::::::::::::::::::::::::::::::::::::
Associate a Collection to a Model Demo
::::::::::::::::::::::::::::::::::::::

    var Model1 = Backbone.Model.extend({
                    defaults:{a:'default'},
                    modelMethod: function() { alert('hello'); }
                 }); // set default value of attr a
    var C = Backbone.Collection.extend({model: Model1})           // associate this collection with Model1
    var col1 = new C( [ {}, {a:'a2'}, {a:'a3'} ] );               // instantiate a collection, pass in models attributes

    // output content of above collection:
    _.each(col1.models, function(element, index, list) {
        console.log(JSON.stringify(element.toJSON()));            // loop returns: {"a":"default"}, {"a":"a2"}, {"a":"a3"}
    });
    for (var i=0; i<col1.length; i++) { console.log(col1.at(i).get('a')); }  // default,  a2, a3

    // [!] we have *Never* did create any instance of model but all model in collection is
    // extended with modelMethod()

    console.log( typeof col1.at(0).modelMethod);   // function



Note:
    collections of models is store in the array col1.models.
    although you can access the model item via col1.models[index],
    it is better to use at() or get().

Method:
    Collection.at(i)       //returns model instance of index i ( begin w 0 )
    Collection.indexOf(m1) // returns the index of model instance m1
    Collection.length      // returns the length col1.models
    Collection.get()       // return the model by client id, custom id.
    Collection.add()       // add a new model to the end of a collection.
                           //    - will trigger add event
                           //    - a unique model is append to col1.models array
    Collection.remove()    // take custom-id, client-id, or model instance
                           //    - model is only remove from collection, it is not distroy

** use get(cid) instead of at(index)
When using Collection.get(), Backbone return the model by
searching the internal col1._byId object.
Searching in col1._byId is faster, so use get() instead of at().
Internally, the col1._byId object hold the key-value pairs
where the key is client-id or user-defined-id of model
instance, and the value of that key is mapped directly
to the model instaance.

example of getting model from a collection by client id  or custom id

      var M = Backbone.Model.extend();
      var m1 = new M;
      var m2 = new M;
      m1.id = 'gdasf'  // set custom id
      m2.id = 'jleij'  // set custom id

      var C = Backbone.Collection.extend();
      var col1 = new C([ m1, m2 ]);

      col1.get('c1')     // return m1 my cid
      col1.get('gdasf')  // return m1 as well.

      console.log(Object.keys(col1._byId));  // ["c1", "gdasf", "c2", "jleij"]
      col1.add(new M);                       // append a new model to the collection
      console.log(Object.keys(col1._byId));  // ["c1", "gdasf", "c2", "jleij", "c3"]

It is possible to access other instant of model that share the same collection via
m1.collection object.  However this will result in ambiguous scenario when
the a model instance is shared between more than one collection instance:

      var M = Backbone.Model.extend();
      var m1 = new M;
      var m2 = new M;
      var m3 = new M;
      var COL1 = Backbone.Collection.extend();

      var col1 = new COL1([m1, m2]); // m1 is share between col1 and col2
      var col2 = new COL1([m1, m3]);

      console.log(Object.keys(m1.collection._byId)); // ["c1", "c2" ] <--- expected c1, c2, c3
      console.log(Object.keys(m2.collection._byId)); // ["c1", "c2" ]
      console.log(Object.keys(m3.collection._byId)); // ["c1", "c3" ]

::::::::::::::::::::::::::::::::::
Demo on andding and removing cycle
::::::::::::::::::::::::::::::::::

      // create a 10 instance of model M
            var M = Backbone.Model.extend();
            var models = [];
            for (var i=0; i<10; i++) {models.push(new M({a:'a'+i.toString()}))};
      // add the created 10 instance of model to collection
            var COL1 = Backbone.Collection.extend();
            var col1 = new COL1(models);
            console.log(_.map(col1.models, function(elm){ return elm.cid; }));
            console.log(_.map(col1.models, function(elm){ return elm.get('a');}));
      // add another model instance at posision 7
            col1.add({a:'NEW'},{at:6});
            console.log(_.map(col1.models, function(elm){ return elm.cid; }))
            console.log(_.map(col1.models, function(elm){ return elm.get('a');}));
      // remove model just created by passing model instance to removed()
            col1.remove(col1.get('c11'));
            console.log(_.map(col1.models, function(elm){ return elm.cid; }))
            console.log(_.map(col1.models, function(elm){ return elm.get('a');}));
      // remove all and adding new instance from blank slate
            col1.reset({a:'start_from_scratch'},{at:6});
            console.log(_.map(col1.models, function(elm){ return elm.cid; }))
            console.log(_.map(col1.models, function(elm){ return elm.get('a');}));

      //["c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "c10"]
      //["a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9"]
      //["c1", "c2", "c3", "c4", "c5", "c6", "c11", "c7", "c8", "c9", "c10"]
      //["a0", "a1", "a2", "a3", "a4", "a5", "NEW", "a6", "a7", "a8", "a9"]
      //["c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "c10"]
      //["a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9"]
      //["c12"]
      //["start_from_scratch"]


