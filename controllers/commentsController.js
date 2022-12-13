// ----------------------------Imports----------------------------
const { Comment, Reply } = require("../exports/models");
const crypto = require("crypto");
const { internalErrorRes } = require("../exports/helpers");

// ----------------------------Controllers----------------------------

// Adds a comment to the given post
exports.addComment = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const comment = req.body.postComment ? req.body.postComment : null;

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

    res.redirect("back");
  } catch (error) {
    console.log(`\n*****Error*****\n${error}\n`);
    internalErrorRes(res);
  }
};

// Adds a reply to the given comment
exports.addReply = async (req, res, next) => {
  try {
    const commentId = req.params.id;
    const reply = req.body.commentReply ? req.body.commentReply : null;

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

    res.redirect("back");
  } catch (error) {
    console.log(`\n*****Error*****\n${error}\n`);
    internalErrorRes(res);
  }
};
