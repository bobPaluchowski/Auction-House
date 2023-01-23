import app from "./app";
import env from "./util/validateEnv";
import mongoose from "mongoose";


const port = env.PORT || 5001;

// Connect to MongoDB, connect returns a promise
mongoose.connect(env.MONGO_CONNECTION_STRING)
.then(() => {
  console.log("Connected to MongoDB, Mongoose connected successfully");
  
  app.listen(port, () => {
    console.log("Server is running on port: " + port);
  });
})
.catch(console.error);
