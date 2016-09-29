var bookshelf = require('./bookshelf');
var Person    = require('./Person');
var Joi       = require('joi');


var Address = bookshelf.Model.extend({
    tableName: 'address',
    schema: {
        number: Number,
        street: String
    },
    // people: function() {
    //     return this.hasMany(Person); // -- One to N
    //     // return this.belongsToMany(Person); -- N to N
    //     // return this.hasOne(Person); -- One to One


    //     return this.morphMany(Person, 'addrs'); // -- polymorphic
    // }
});

// var Ex = bookshelf.Model.extend({
//     tableName: 'ex',
//     addrs: function() {
//         //  return this.morphTo('addrs', Person, Address); -- polymorphic
//     }
// });

module.exports = Address;