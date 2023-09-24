const User = require("../../modal/user.modal");
const bcrypt = require("bcryptjs");

const createUser = async (req, res, next) => {
  try {
    const {
      email,
      userName,
      password,
   
    } = req.body;

    const userExistingEmail = await User.findOne({
      email,
    });

    if (userExistingEmail) {
      throw new Error(`${email} is already exist. Please login.`);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      email,
      userName,
      password: hashedPassword,
    });

    await user.save();

    res.status(200).json({
      message: " User created successfully",
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = createUser;
