let mongoose  = require("mongoose");
const expenditureDetails = new mongoose.Schema({
   productName: String,
   price: {type:Number},
   quantity: {type: Number},
   totalPrice: {type: Number},
   password: {type:String, required: true}
});

module.exports = mongoose.model("expenditureDetails",expenditure);
// new Blog ({ path: "mypic.jpg"})