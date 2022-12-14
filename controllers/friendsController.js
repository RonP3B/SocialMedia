// ----------------------------Imports----------------------------
const { Op } = require("sequelize");

const {
  User,
  FriendRequest,
  Post,
  Comment,
  Reply,
} = require("../exports/models");

const {
  internalErrorRes,
  isValidFriendRequest,
} = require("../exports/helpers");

// ----------------------------Controllers----------------------------
exports.getFriends = async (req, res, next) => {
  try {
    /*
      Gets the friendships where the currently logged-in user's id is in the field
      fromUserId or toUserId, it also includes the user model for both fields  
    */
    const friendsRes = await FriendRequest.findAll({
      where: {
        [Op.or]: [{ fromUserId: req.user.id }, { toUserId: req.user.id }],
        status: "accepted",
      },

      include: [
        { model: User, as: "fromUser" },
        { model: User, as: "toUser" },
      ],
    });

    let friends = null;
    let friendsPosts = null;

    // If currently logged-in user has friends
    if (friendsRes.length > 0) {
      // Gets all the users from 'friendsRes' discarding the currently logged-in user
      friends = friendsRes.map((res) =>
        res.dataValues.toUserId === req.user.id
          ? res.dataValues.fromUser.dataValues
          : res.dataValues.toUser.dataValues
      );

      // Gets all the posts of the users in 'friends'
      const friendsPostsObj = await Post.findAll({
        where: {
          userId: { [Op.or]: friends.map((friend) => friend.id) },
        },

        include: [
          User,
          {
            model: Comment,
            include: [User, { model: Reply, include: [User] }],
          },
        ],

        order: [["updatedAt", "DESC"]],
      });

      friendsPosts = friendsPostsObj.map((post) => post.get({ plain: true }));
    }

    res.render("posts", {
      header: true,
      section: "Friends",
      friends: true,
      friendsList: friends,
      modal: true,
      posts: friendsPosts,
    });
  } catch (error) {
    console.log(`\n*****Error*****\n${error}\n`);
    internalErrorRes(res);
  }
};

exports.getAddFriend = (req, res, next) => {
  res.render("friends/friend-request", { header: true, section: "Friends" });
};

// Sends friendship request
exports.postAddFriend = async (req, res, next) => {
  const username = req.body.username ? req.body.username : null;

  try {
    // Gets the activated user account by username
    const user = await User.findOne({
      where: { [Op.and]: [{ username: username }, { isActive: 1 }] },
    });

    // Ends the try-catch if it's not a valid friend request
    if (!(await isValidFriendRequest(user, req, res))) {
      return res.redirect("/friends/add-friend");
    }

    await FriendRequest.create({
      fromUserId: req.user.id,
      toUserId: user.id,
    });

    req.flash("success", "The friendship request has been sent");
    res.redirect("/friends");
  } catch (error) {
    console.log(`\n*****Error*****\n${error}\n`);
    internalErrorRes(res);
  }
};

// Deletes friendship
exports.postDeleteFriend = async (req, res, next) => {
  const id = req.body.id ? req.body.id : null;

  try {
    await FriendRequest.destroy({
      where: {
        [Op.or]: [
          { toUserId: id, fromUserId: req.user.id },
          { toUserId: req.user.id, fromUserId: id },
        ],
        status: "accepted",
      },
    });

    req.flash("success", "Friend deleted.");
    res.redirect("/friends");
  } catch (error) {
    console.log(`\n*****Error*****\n${error}\n`);
    internalErrorRes(res);
  }
};
