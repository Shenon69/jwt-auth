import Express from "express";
import authRouter from "./routes/authentication";
import "dotenv/config";
import mongoose from "mongoose";
import bodyParser from "body-parser";

const app = Express();
const PORT = 3000;

app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Server running on port: http://localhost:${PORT}`);
});

app.use("/auth", authRouter)

mongoose.connect(process.env.MONGODB_URL!).then(() => {
    console.log("Connected to MongoDB successfully")
}).catch((err) => {
    console.log(err)
})

export default app;