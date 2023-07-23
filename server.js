let express = require("express"); // express modules, importing express object
let app = express(); // creating object of this express class
let bodyParser = require("body-parser");
const cors = require("cors");
app.use(cors());

let mongoose = require("mongoose");

let { AdminPassword } = require('./const');
let Expenditure = require('./const');
app.use(bodyParser.json()); // middleware attached to all routes for app instance
mongoose.connect("mongodb+srv://Gautama:Gaunik%401234@cluster1.txuuzz9.mongodb.net/udgamwebsite?retryWrites=true&w=majority");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error: "));
db.once("open", function () {
    console.log("Database Connected successfully");
})

app.post('/submit',async(req,res)=>{
    try{
        if(req.body.password === AdminPassword){
            await Expenditure.create(req.body);
            res.status(200).json({
                message:"saved successfully",
                success:true,
            })
    }else{
        res.status(401).json({
            success:false,
            message:"not authenticated",
        })
    }
}
    catch(e){
        res.status(500).json({
            success:false,
            message: 'Internal server error'
        })
    }
})
app.get('/',async(req,res)=>{
    try{
        let data = await Expenditure.find();
        res.status(200).json({
            message:"fetched data successfully",
            success:true,
            data: data,
        })
    }catch(e){
        res.status(500).json({
            message:"Internal server error ",
            success: false,
        })
    }
})

app.listen(8080,function(req,res) {

    console.log("Listening on port " + 8080);
})
