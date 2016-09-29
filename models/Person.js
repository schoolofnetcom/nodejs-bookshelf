var bookshelf = require('./bookshelf');
// var Address   = require('./Address');
var Joi       = require('joi');
var Promise   = require('bluebird');

var Person = bookshelf.Model.extend({
    tableName: 'person',
    schema   : {
        name: String,
        age : Number
    },
    initialize: function() {
        this.on('saving', this.validateToSave);
    },

    validateToSave: function() {
        console.log('saving...');
    }
    // adddres: function() {
    //     return this.belongsTo(Address); // -- One to N
    //     // return this.belongsToMany(Address); -- N to N
    //     // retun this.belongsTo(Address); -- One to One

    //     return this.morphOne(Address, 'addrs'); // -- polymorphic
    // }
}, {
    validateIfNameExists: Promise.method(function(name) {
        return new this({
            name: name
        })
        .fetch()
        .tap(function(result) {
            console.log('Result validte ->', result);
        });
    })
});

module.exports = Person;
