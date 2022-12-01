const express = require("express");
const app = express();
const mongoose = require("mongoose");
const taskRouter = require("./routers/taskRouter");
const routeNotFound = require("./middleware/404");
const errorHandler = require("./middleware/errorHandler");
const cors = require ("cors")

require("dotenv").config();

const PORT = process.env.PORT || 3000;

//MiddleWare
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(taskRouter);
app.use(routeNotFound);
app.use(errorHandler)

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server listening on ${PORT} and DB connected`);
    });
  })
  .catch((err) => console.log(err));

//schema
//title unique
//description - string, required
//completed - boolean, default - false
