const { User } = require("../model/User");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { sanitizeUser, accountCreationtemplate } = require("../utils");
const { sendMail } = require("../emailSetup/NodeMailer");

const sessionTime = 1296000000; // 15 days
exports.createUser = async (req, res) => {
  try {
    // Create a new user instance from the request body
    const salt = crypto.randomBytes(16);
    const SECRET_KEY = process.env.PASS_SECRET_KEY;
    const user = await User.findOne({ email: req.body.email }).exec();
    if (user) {
      throw new Error("User already exists"); // Throw an error if the user exists
    } else {
      crypto.pbkdf2(
        req.body.password,
        salt,
        310000,
        32,
        "sha256",
        async function (err, hashedPassword) {
          const newUser = new User({
            ...req.body,
            password: hashedPassword,
            salt,
          });

          // Save the user to the database and return the response
          const response = await newUser.save();
          sendMail({
            to: req.body.email,
            subject: "Account Created",
            text: "Wellcome to my commerce",
            html:accountCreationtemplate
          });
          req.login(sanitizeUser(response), (err) => {
            if (err) {
              res.status(400).json(err);
            } else {
              const token = jwt.sign(sanitizeUser(newUser), SECRET_KEY);
              res.cookie("jwt", token, {
                expires: new Date(Date.now() + sessionTime),
                httpOnly: true,
                sameSite: "None",
                secure: true,
              });
              // Respond with a 201 status code (Created) and the saved user
              res.status(201).json({ id: response.id, role: response.role });
            }
          });
        }
      );
    }
  } catch (error) {
    // Handle the "User already exists" error here
    if (error.message === "User already exists") {
      res.status(400).json({ message: "User already exists Please Signin" });
    } else {
      // Respond with a 400 status code (Bad Request) and the error message
      res.status(400).json(error.message);
    }
  }
};

exports.loginUser = async (req, res) => {
  res.cookie("jwt", req.user.token, {
    expires: new Date(Date.now() + sessionTime),
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
  res.json(req.user.token);
};

exports.checkUser = async (req, res) => {
  res.json(req.user);
};

exports.logoutUser = (req, res) => {
  res.cookie("connect.sid", null, {
    expires: new Date(1),
    httpOnly: true,
    path: "/",
    sameSite: "none",
    secure: true,
  });
  res
    .cookie("jwt", "", {
      // expires: new Date(Date.now()),
      expires: new Date(1),
      httpOnly: true,
      path: "/",
      sameSite: "none",
      secure: true, // set to true if your using https
    })
    .sendStatus(200);
};

exports.resetPasswordRequest = async (req, res) => {
  const email = req.body.email;

  const user = await User.findOne({ email: email });

  if (user) {
    const token = jwt.sign({ id: user.id }, process.env.PASS_SECRET_KEY, {
      expiresIn: "1h",
    });
    user.resetPasswordToken = token;
    await user.save();
    const resetPageLink = `${process.env.CORS_ORIGIN}/reset-password?token=${token}&email=${email}`;
    const subject = "Reset Password For My-Commerce";
    const text = "Reset Password";
    const html = `<p>Click <a href=${resetPageLink}>here</a> to reset password</p>`;
    if (email) {
      sendMail({ to: email, subject, text, html }).then((info) => {
        res.status(200).json(info);
      });
    } else {
      res.status(400).json({ message: "Email is required" });
    }
  } else {
    res.status(400);
  }
};
exports.resetPassword = async (req, res) => {
  const { token, email, password } = req.body;
  const user = await User.findOne({ email: email, resetPasswordToken: token });
  if (user) {
    crypto.pbkdf2(
      password,
      user.salt,
      310000,
      32,
      "sha256",
      async function (err, hashedPassword) {
        user.password = hashedPassword;
        user.resetPasswordToken = "";
        await user.save();
        res.status(200).json({ message: "Password reset successfully" });
      }
    );
  } else {
    res.status(400);
  }
};
