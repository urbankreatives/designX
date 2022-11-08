const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

var centerSchema = new mongoose.Schema({
   

    name:{type:String}
   

});

// Custom validation for email


module.exports = mongoose.model('Center', centerSchema);