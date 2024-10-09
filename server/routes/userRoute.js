// const express = require("express");
// const Router = express.Router ()
// const dbConnection = require("../db/dbConfig")
// // const userController = require('../controllers/userController');
// const bcrypt = require('bcrypt')
// const {StatusCodes} = require('http-status-codes')

// //register route
// Router.post ('/register', register);

// // //login route
// // Router.post ('/login', login);

// // //logout route
// // Router.get ('/logout', logout);

// //controller
// async function register (req, res) {
//  const{username, firstname, lastname, email, password} = req.body;
//  if (!email || !password || !firstname || !lastname || !username ) {
//     return res.status(400).json({message: 'please provide all fields are required'})
    
// }
// try {
//     const [user] = await dbConnection.query("select username, userid from users where username = ? or email = ?  ", [username, email])
//     res.json({user: user});
//     if (user.length > 0) {
//         return res.status(StatusCodes.BAD_REQUEST).json({message: 'email already registered'})
//     }
//     if (password.length < 8) {
//         return res.status(StatusCodes.BAD_REQUEST).json({message: 'password must be at least 8 characters'})

//         // encrypt the password
//         const salt = await bcrypt.genSalt(10)

//         const hashedPassword = await bcrypt.hash(password,salt)

//     await dbConnection.query("INSERT INTO users (username, firstname, lastname, email, password) VALUES (?, ?, ?, ?, ?)", [username, firstname, lastname, email, hashedPassword]);
//     return res.status(StatusCodes.CREATED).json({message: 'user created '})

// }catch (error) {
//     console.log(error.message)
//     return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "something went wrong, try again later"})
//    }
// }

// // function login (req, res) {
// //     res.send('login')
    
// // }   

// // function logout (req, res) {
// //     res.send('check use')
// // }
// module.exports = Router,
// module.exports = {register, login, checkuser}

const express = require("express");
const router = express.Router();
const dbConnection = require("../db/dbConfig");
const bcrypt = require('bcrypt');
const { StatusCodes } = require('http-status-codes');

// Register route
router.post('/register', register);

// Controller
async function register(req, res) {
  const { username, firstname, lastname, email, password } = req.body;
  // console.log(req.body)
  // Ensure all fields are provided
  if (!email || !password || !firstname || !lastname || !username) {
    console.log("here")
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if the user already exists
    const [user] = await dbConnection.query(
      "SELECT username, userid FROM users WHERE username = ? OR email = ?",
      [username, email]
    );

    if (user && user.length > 0) {
      console.log("here2")

      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Email or username already registered' });
    }

    // Check if the password length is valid
    if (password.length < 8) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Password must be at least 7 characters' });
    }

    // Encrypt the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert new user into the database
    await dbConnection.query(
      "INSERT INTO users (username, firstname, lastname, email, password) VALUES (?, ?, ?, ?, ?)",
      [username, firstname, lastname, email, hashedPassword]
    );

    return res.status(StatusCodes.CREATED).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Something went wrong, please try again later" });
  }
}

// Export the router and controller functions
module.exports = router;
// module.exports = { register }; // Combine exports
