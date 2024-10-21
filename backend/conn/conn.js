const mongoose = require("mongoose");
const conn = async()=>{
    try {
        const response = await mongoose.connect(`${process.env.MONGO_URI}`);
        if(response){

        }
        console.log("connected to DB");
    }catch(err){
        console.log(err);
    }
};
conn();
//qMc37kBOCduetY9j
//103.101.212.122/32

