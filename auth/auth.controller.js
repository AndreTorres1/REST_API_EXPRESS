const dotenv = require('dotenv');
const jwt = require("jsonwebtoken");
require('crypto').randomBytes(64).toString('hex')
dotenv.config();

process.env.TOKEN_SECRET;




