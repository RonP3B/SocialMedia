// ----------------------------Imports----------------------------
const { Post, User, Comment, Reply } = require("../exports/models");
const { internalErrorRes } = require("../exports/helpers");
const crypto = require("crypto");
const fs = require("fs");

// ----------------------------Controllers----------------------------
exports.getHome = async (req, res, next) => {
  try {
    // Gets all the currently logged-in user's posts
    const postsObj = await Post.findAll({
      where: { userId: req.user.id },
      include: [
        User,
        { model: Comment, include: [User, { model: Reply, include: [User] }] },
      ],
      order: [["updatedAt", "DESC"]],
    });

    const posts = postsObj.map((post) => post.get({ plain: true }));

    res.render("posts", {
      header: true,
      modal: true,
      section: "Home",
      posts,
    });
  } catch (error) {
    console.log(`\n*****Error*****\n${error}\n`);
    internalErrorRes(res);
  }
};

// Adds a new post
exports.AddPost = async (req, res, next) => {
  try {
    const postText = req.body.postText ? req.body.postText : null;
    const imgFile = req.file;

    if (postText || imgFile) {
      await Post.create({
        id: crypto.randomUUID(),
        postText: postText ? postText : null,
        postImage: imgFile ? imgFile.filename : null,
        dataTime: new Date().toLocaleString(),
        userId: req.user.id,
      });

      req.flash("success", "Post added.");
    } else {
      req.flash("errors", "Form data missing.");
    }

    res.redirect("/home");
  } catch (error) {
    console.log(`\n*****Error*****\n${error}\n`);
    internalErrorRes(res);
  }
};

exports.deletePost = async (req, res, next) => {
  const id = req.body.id ? req.body.id : null;

  try {
    const post = await Post.findByPk(id);

    if (post) {
      const img = post.dataValues.postImage;

      // If the post has an image it gets deleted from the server
      if (img) fs.unlinkSync(`./public/assets/images/uploadedImages/${img}`);

      await post.destroy();

      req.flash("success", "Post deleted.");
    } else {
      req.flash("errors", "Form data missing.");
    }

    res.redirect("/home");
  } catch (error) {
    console.log(`\n*****Error*****\n${error}\n`);
    internalErrorRes(res);
  }
};

exports.getEditPost = async (req, res, next) => {
  const id = req.params.id;

  try {
    const post = await Post.findByPk(id);

    if (post) {
      const imgName = post.postImage
        ? post.postImage.substring(post.postImage.indexOf("_") + 1)
        : null;

      res.render("home/edit-post", {
        header: true,
        section: "Home",
        post: post.dataValues,
        imgName,
      });
    } else {
      res.redirect("/home");
    }
  } catch (error) {
    console.log(`\n*****Error*****\n${error}\n`);
    internalErrorRes(res);
  }
};

exports.editPost = async (req, res, next) => {
  const { id, postText } = req.body;
  const imgFile = req.file;

  try {
    if (!id) {
      req.flash("errors", "Form data missing.");
      return res.redirect("back");
    }

    const post = await Post.findByPk(id);

    /* 
        If the post has an image and it will change for a new one, 
        the current image gets deleted from the server
      */
    if (imgFile && imgFile.filename !== post.dataValues.postImage) {
      fs.unlinkSync(
        `./public/assets/images/uploadedImages/${post.dataValues.postImage}`
      );
    }

    await post.update({
      postText: postText ? postText : post.dataValues.postText,
      postImage: imgFile ? imgFile.filename : post.dataValues.postImage,
      dataTime: new Date().toLocaleString(),
    });

    req.flash("success", "Post edited.");
    res.redirect("/home");
  } catch (error) {
    console.log(`\n*****Error*****\n${error}\n`);
    internalErrorRes(res);
  }
};
