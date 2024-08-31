import mongoose from "mongoose"



export const connectDB =(uri)=>{
    mongoose.connect(uri,{dbName:"chatapp"}).
    then((data)=>{
        console.log(`Mongodb connected with server: ${data.connection.host}`)
    })
    .catch((err)=>{
        throw err
});
};