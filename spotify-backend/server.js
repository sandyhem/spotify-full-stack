const express = require("express")
const cors = require('cors')
require('dotenv').config()
const connectCloudinary = require('./src/config/cloudinary')
const connectDB = require('./src/config/mongodb')
const songRouter = require('./src/routes/songRoute')
const albumRouter = require('./src/routes/albumRoute')

// app config
const app = express()
const port = process.env.PORT || 4000
connectCloudinary()
connectDB()

// middlewares
app.use(express.json())
app.use(cors())

// Initializing Routers
app.use("/api/song", songRouter )
app.use("/api/album", albumRouter )

app.get("/", (req, res) => res.send("API Working"))

const server = app.listen(port, () => console.log(`Server started on ${port}`))

module.exports = { app, server };
