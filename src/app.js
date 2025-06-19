const express = require("express");

require("dotenv").config();
const { authRoutes, publicRoutes } = require("./routes/index.routes")
const app = express();
const cors = require("cors");

const port = process.env.PORT || 5000;

// body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const frontUrl = process.env.FRONT_URL || "http://localhost:4000"
const whiteList = [frontUrl]
app.use(cors())
app.use((req, res, next) => {
    const allowedSources = whiteList.join(" ");
    res.setHeader(
        "Content-Security-Policy",
        `default-src 'self'; img-src 'self' ${allowedSources} data:; script-src 'self' ${allowedSources}; style-src 'self' 'unsafe-inline' ${allowedSources};`
    );
    next();
});
app.use("/uploads", express.static("uploads"));




app.use("/auth", authRoutes);

app.use("/api/v1", publicRoutes);




app.listen(port, () => {
    console.log(`server run on port: ${port}`)
})
