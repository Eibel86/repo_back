const express = require("express");
require("dotenv").config();
const { authRoutes, publicRoutes } = require("./routes/index.routes")
const app = express();

const port = process.env.PORT || 5000;

// body parser
app.use(express.urlencoded());
app.use(express.json());


//coors
const frontUrl = process.env.FRONT_URL || "http://localhost:4000";
const whiteList = [frontUrl];
app.use(cors({
    origin: whiteList
}))


app.use("/auth", authRoutes);

app.use("/api/v1", publicRoutes);




app.listen(port, () => {
    console.log(`server run on port: ${port}`)
})
