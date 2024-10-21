const express = require("express");
const app = express();
require("dotenv").config();
require("./conn/conn");
const cors = require("cors");
const TaskAPI = require("./routes/task");
const UserAPI = require("./routes/user");
app.use(cors());
app.use(express.json());
// app.use("/", (req, res)=>{
//     res.send("Hello from backend side");
// });
app.use("/api/v1",UserAPI);
app.use("/api/v2",TaskAPI);
const PORT = 1000;
app.listen(PORT, ()=>console.log("server started..."));