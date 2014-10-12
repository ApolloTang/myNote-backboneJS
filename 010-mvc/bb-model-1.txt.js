:::::::::::::
:: Basic Idea of Model 

The data in a model instance m1 is represented as an internal hash. 

The hash represents the state of this model instance, and it is stored in 
object property m1.attributes:

	var M = Backbone.Model.extend();
	var m1 = new M({ a:"a", b: "b" });
	m1.attributes                          // { a:"a", b: "b" }
	JSON.stringify(m1);                    // "{"a":"a","b":"b"}"

You should not update model's data directly in attributes. 

Use get() method to return the value of a key in the hash:

	m1.get('a');   // "a"
	
If you need a copy of data hash from a model instance, you 
use toJSON() method to clone it:

	m1.toJSON()                            // { a:"a", b: "b" }
	_.isEqual(m1.toJSON(), m1.attributes)  // true
	(m1.toJSON() === m1.attributes)        // false because it is a copy

Pre-instentiate default model data can be provide to the Constructor:

	var setting = {defaults:{ a:"a", b: "b" }}
	var M = Backbone.Model.extend(setting);
	var m1 = new M();       // <--- no parameter is given during instantiation
	JSON.stringify(m1);     // "{"a":"a","b":"b"}"
	
Default data is overriden during instantiation via passing it to the constructor:

	var setting = {defaults:{ a:"a", b: "b" }}
	var M = Backbone.Model.extend(setting);
	var m1 = new M();
	var newData = {a:"a_new"};
	var m2 = new M(newData);
	m1.toJSON();                  // { a:"a", b: "b" }
    m2.toJSON();                  // { a:"a_new", b: "b" }

Instance of model data can be updated with set() method.

	var setting = {defaults:{ a:"a", b: "b" }}
	var M = Backbone.Model.extend(setting);
	var m1 = new M(); // { a:"a", b: "b" }
	m1.toJSON();                 // { a:"a", b: "b" }
	m1.set({ a:"a_new", b: "b_new" });
	m1.toJSON();                // { a:"a_new", b: "b_new" }
	
Note, while get() read one value at a time, set() can 
update multiple values b/c it accept an object as the arguments.

If you change the state of a model object change  via set(), event bound to the
model's attribute will fired:

	var modelSetting = {
			defaults:{ a:"a", b: "b" }
			, initialize:   function() {
					this.on('change', this.modelHasChanged );
					this.on('change:a', this.aHasChanged );
				}
			, modelHasChanged: function() {console.log('model state has changed');} 
			, aHasChanged: function() { console.log('attribute a has changed');}
		}	
		// end modelSetting
		
	var M = Backbone.Model.extend(modelSetting);
	var m1 = new M;
	
    m1.set({'b':'new'});  // model state has changed
	m1.set({'a':'new'});  // attribute a has changed; model state has changed
	
Passing {'silence':'true'} will silence the event with the associated 
attribute, but will not supress the overall changed in model state:

	m1.set({'a':'new1','silence':'true'});  //model state has changed

Note above, only modelHasChanged() is trigged but not aHasChanged()


	
	


