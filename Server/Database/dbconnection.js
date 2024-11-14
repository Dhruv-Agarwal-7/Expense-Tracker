import mongoose from "mongoose";

const dbConnection = () => {
    mongoose.connect(process.env.MONGO_URL, {
        dbName: "Expense_Tracker"
    }).then(()=>{
        console.log("Connected to Database");
    })
    .catch((err)=>{
      console.log(`Some error occured while connecting to database: ${err}`);  
    });
}

export default dbConnection;