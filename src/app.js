const express = require("express");
require("dotenv").config();
const { authRoutes, publicRoutes } = require("./routes/index.routes")


const app = express();

const port = process.env.PORT || 5000;

// body parser
app.use(express.urlencoded());
app.use(express.json());


app.use("/auth", authRoutes);

app.use("/api/v1", publicRoutes);

app.listen(port, () => {
    console.log(`server run on port: ${port}`)
})