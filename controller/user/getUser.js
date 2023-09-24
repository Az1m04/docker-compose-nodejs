const User = require("../../modal/user.modal");
const { ObjectId } = require("mongoose").Types;

const getUser = async (req, res, next) => {
  try {
    const id=req.params
    const userExistingEmail = await User.find({_id:ObjectId(id)});
    res.status(200).json({
      message: " User created successfully",
      success: true,
      user: userExistingEmail,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getUser;
