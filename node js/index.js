const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
require('dotenv').config();
const { default: mongoose } = require("mongoose");
const itemRoutes = require('./routes/routes');
const PORT = process.env.PORT || 5001;

mongoose.connect("mongodb://127.0.0.1:27017/Data").then(() => {
    console.log("Database connected ....!");
});

app.use('/api', itemRoutes);

app.listen(PORT, () => {
    console.log(`Server start successfully ${PORT}`);
});