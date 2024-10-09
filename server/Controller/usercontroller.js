//db connection
const dbConnection = require("../db/dbConfig");

const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

// login user
async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please enter all required fields" });
  }
  try {
    const [user] = await dbConnection.query(
      "Select username,user_id,password from users where  email=? ",
      [email]
    );
    if (user.length == 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "invalid credential" });
    }

    //compare password
    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) {
      return res
        .Status(StatusCodes.BAD_REQUEST)
        .json({ message: "invalid credential " });
    }

    const username = user[0].username;
    const userid = user[0].userid;

    const token = jwt.sign({ username, userid }, "secret", { expiresIn: "1d" });
    return res
      .status(StatusCodes.OK)
      .json({ message: "user login successfully", token });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ Message: "Something went wrong,try again later!" });
  }
}
//  check user
async function checkUser(req, res) {
  const username = req.user.username;
  const userid = req.user.user_id;
  res.status(StatusCodes.OK).json({ message: "valid user", username, userid });
}

module.exports = { login, checkUser };
