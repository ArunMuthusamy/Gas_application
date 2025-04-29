const express = require("express");
const connection = require("./config/db");
const dotenv = require("dotenv").config();
const cors = require("cors");
const { UserRouter } = require("./Routing/user.router");
const { ProviderRouter } = require("./Routing/provider.router");
const { BookingRouter } = require("./Routing/booking.router");

const PORT = process.env.PORT || 3000;

const server = express();
server.use(cors());
server.use(express.json());
server.use("/",UserRouter);
server.use("/",ProviderRouter);
server.use("/",BookingRouter)

server.listen(PORT, async () => {
  try {
    await connection;
    console.log("Server is successfully connected to the database");
    console.log(`Server is running at port http://localhost/${PORT}`);
  } catch (error) {
    console.log("Server is not able to connect with database");
  }
});
