const bcrypt = require("bcryptjs");
const createError = require("http-errors");
const User = require("../../modal/user.modal");
const { generateAccessToken } = require("../../service/genrateAccessToken");

const { accessTokenLife } = require("../../config/keys").jwt;

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      throw createError.BadRequest("Email is incorrect");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw createError.Unauthorized("Incorrect password. Please try again.");
    }
    const payload = {
      email: user.email,
      name: user.name,
      _id: user._id,
    };
    const accessToken = generateAccessToken(payload, accessTokenLife);

    res.status(200).json({
      success: true,
      accessToken,
      user: payload,
    });
  } catch (error) {
    console.log("error login: ", error);
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
};

module.exports = loginUser;
