const User = require("../../modal/user.modal");
const { ObjectId } = require("mongoose").Types;

const updateUser = async (req, res, next) => {
  try {
    const userID = req.params;

    const userExistingEmail = await User.findOne({
      _id: ObjectId(userID),
    });

    if (!userExistingEmail) {
      throw new Error(`user not found.`);
    }

    if (userExistingEmail?.memberShip?.buyCount>=3) {
      res.status(200).json({
        message: " Upgrade membership plan",
        success: false,
      });
      throw new Error(`Upgrade membership plan.`);
    }

    const user = await User.findOneAndUpdate(
      { _id: ObjectId(userID) },
      {
          $inc: { "memberShip.buyCount": 1 },
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      message: " User upated successfully",
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateUser;
