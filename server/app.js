// server.js or app.js
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes")
const departmentRoutes = require("./routes/departmentRoutes");
const resultRoutes = require("./routes/resultRoutes")
const eventRoutes = require("./routes/eventRoutes")
const positionCount = require("./routes/positionCount")
const currentItemRoutes = require('./routes/currentItemRoutes');
const cors = require('cors');
const dotenv = require("dotenv");
dotenv.config();
const { v2: cloudinary } = require("cloudinary");


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
app.use(cors());
app.use(express.json());


// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Could not connect to MongoDB:", error));


app.get("/",(req, res)=>{
  res.send("ssmp-sports-api")
});
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/results", resultRoutes);
app.use('/api/current-item', currentItemRoutes);
app.use("/api/positions-count", positionCount);

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));