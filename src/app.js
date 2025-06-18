const express = require("express");
require("dotenv").config();
const { authRoutes, publicRoutes } = require("./routes/index.routes")
const app = express();
const cors = require("cors");

const port = process.env.PORT || 5000;

// body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const whiteList = ["http://localhost:5000", "http://localhost:4000"]
app.use(cors())

app.use("/auth", authRoutes);

app.use("/api/v1", publicRoutes);




app.listen(port, () => {
    console.log(`server run on port: ${port}`)
})
