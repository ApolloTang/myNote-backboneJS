  Precedence in initilizing a model

      var M = Backbone.Model.extend({
            defaults:{
                date: 'set in default'
            }
            , initialize: function() {
               this.set({'date':'set in initialize'});
            }
        });
        var m1 = new M({date: 'set during instantiation'});

    Initialized() has the final say.
    Attributes set in initialize() overide that set during instantiation.
    And attributes set in instantiation overide that set in defaults.


Methods to work with model attributes are get(), set(), unset(),and clear().

    Read:
            get(), return 'undefined' if not found

    Create/Update:

            set(), create one if does not exist.
                   return true if validation passed, otherwise, false.

    Delete:

            unset()

    Delete All:

            clear()
