const express = require("express");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const cors = require("cors");
require("dotenv").config();

//ROUTES
const productRouter = require("./routes/Product");
const categoriesRouter = require("./routes/Category");
const brandsRouter = require("./routes/Brand");
const userRouter = require("./routes/User");
const authRouter = require("./routes/Auth");
const cartRouter = require("./routes/Cart");
const orderRouter = require("./routes/Order");
// const paymentRouter = require('./routes/Payment');

const { initializrPassport } = require("./passportConfig");
const { initalizrNodeMailer } = require("./emailSetup/NodeMailer");
const { connectMongoDb } = require("./connection");
const { isAuth } = require("./utils");
const nodemailer = require("nodemailer");
const server = express();

server.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", process.env.CORS_ORIGIN); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE"); // Specify the allowed HTTP methods
  next();
});

const corsOptions = {
  exposedHeaders: ["X-Total-Count"],
  // methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  origin: process.env.CORS_ORIGIN, // Replace with the actual domain of your frontend
  credentials: true,
};
server.use(cors(corsOptions));
const sessionOptions = {
  secret: "keyboard cat",
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
};
server.use(express.json());
server.use(cookieParser());

server.use(session(sessionOptions));
server.use(passport.initialize());
server.use(passport.session());
server.use(passport.authenticate("session"));

server.use("/api/products", productRouter.router);
server.use("/api/categories", categoriesRouter.router);
server.use("/api/brands", brandsRouter.router);
server.use("/api/users", isAuth(), userRouter.router);
server.use("/api/auth", authRouter.router);
server.use("/api/cart", isAuth(), cartRouter.router);
server.use("/api/order", isAuth(), orderRouter.router);
// server.use('/api/create-payment-intent', paymentRouter.router)

initializrPassport(passport);

connectMongoDb();

// server.post("/mail", async (req, res) => );

server.get("/", (req, res) => {
  res.send("Hello World");
});
server.listen(process.env.PORT, () => {
  console.log("Server is running...");
});
