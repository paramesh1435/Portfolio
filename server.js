require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")

const app = express()
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))

mongoose.set('strictQuery', false);

const Schema = mongoose.Schema({
    feedback : String
})

const Feedback = mongoose.model("Feedback", Schema);

const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
    }
    catch(error) {
        console.log(error);
        process.exit(1);
    }
};

app.get('/', function(req, res){
    res.render('portfolio');
})

app.post('/', function(req, res){

    const feedBack = new Feedback({
        feedback : req.body.feedback
    })

    Feedback.create(feedBack)
    .then((result)=>{
        res.redirect('/');
    })
    .catch((error)=> {
        console.log(error);
    })
    .finally(()=> {
        mongoose.disconnect();
    })
    
})

connectDB().then(()=> {
    app.listen(process.env.PORT, function(){
        console.log("Listening to ports...")
    })
})