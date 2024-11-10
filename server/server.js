require("dotenv").config();
const express = require('express');
const app = express()
const authRouter = require("./router/auth-router");
const connectDB = require("./utils/database")
const PORT = 4000;
const cors = require("cors")


const corsOptions = {
    origin: "http://localhost:5173",
    method: "GET, POST, PUT, PATCH, DELETE, HEAD",
    credentials: true,
}
app.use(cors(corsOptions))

app.use(express.json())
app.use("/api/auth", authRouter)

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Running on PORT ${PORT}`)
    })
})