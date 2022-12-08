const { Post, User, Comment, Reply } = require("../exports/models");
const crypto = require("crypto");
const fs = require("fs");
const { internalErrorRes } = require("../exports/helpers");

exports.getHome = async (req, res, next) => {
  try {
    const postsObj = await Post.findAll({
      where: { userId: req.user.id },
      /* include: [
        User,
        { model: Comment, include: [User, { model: Reply, include: [User] }] },
      ],*/
      include: { all: true, nested: true },
      order: [["updatedAt", "DESC"]],
    });

    const posts = JSON.parse(JSON.stringify(postsObj));

    res.render("home/home", {
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

exports.AddPost = async (req, res, next) => {
  try {
    const postText = req.body.postText;
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

exports.addComment = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const comment = req.body.postComment;

    if (comment) {
      await Comment.create({
        id: crypto.randomUUID(),
        text: comment,
        postId,
        userId: req.user.id,
      });

      req.flash("success", "Comment added.");
    } else {
      req.flash("errors", "Form data missing.");
    }

    res.redirect("/home");
  } catch (error) {
    console.log(`\n*****Error*****\n${error}\n`);
    internalErrorRes(res);
  }
};

exports.addReply = async (req, res, next) => {
  try {
    const commentId = req.params.id;
    const reply = req.body.commentReply;

    if (reply) {
      await Reply.create({
        id: crypto.randomUUID(),
        text: reply,
        commentId,
        userId: req.user.id,
      });

      req.flash("success", "Reply added.");
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
  const id = req.body.id;

  try {
    const post = await Post.findByPk(id);

    if (post) {
      const img = post.dataValues.postImage;

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
      res.render("home/edit-post", {
        header: true,
        section: "Home",
        post: post.dataValues,
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
    const post = await Post.findByPk(id);

    if (post && (postText || imgFile)) {
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
    } else {
      req.flash("errors", "Form data missing.");
    }

    res.redirect("/home");
  } catch (error) {
    console.log(`\n*****Error*****\n${error}\n`);
    internalErrorRes(res);
  }
};
