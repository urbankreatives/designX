const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

var growerSchema = new mongoose.Schema({
   

    growerNumber:{type:String},
    name:{type:String},
    surname:{type:String},
    amount:{type:Number},
    lotNumber:{type:String},
    mobile:{type:String},
    barcodeNumber:{type:String},
    capturer:{type:String},
    center:{type:String},
    totalIncome:{type:Number},
    finalIncome:{type:Number},
    remAmount:{type:Number},
    date: {type: Date, default:Date.now},
    date2:{type:String}

});

// Custom validation for email


module.exports = mongoose.model('Grower2', growerSchema);