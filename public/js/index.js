"use strict";

import {
  isFormEmpty,
  validateSignUp,
  addImageForm,
  validatePost,
  validateComment,
  showConfirmModal,
} from "./exports/exports.js";

$(() => {
  //--------------------------------Protos------------------------------------
  String.prototype.isEmpty = function () {
    return this === null || this === undefined || this.trim().length === 0;
  };

  Inputmask("+1 (9{3}) 9{3}-9{4}", { greedy: false }).mask("input[type=tel]");

  $("#btn-signUp").click(() => isFormEmpty("#form-signup", validateSignUp));

  $("#btn-reset").click(() => isFormEmpty("#form-reset"));

  $("#btn-login").click(() => isFormEmpty("#form-login"));

  $("#btn-post").click(() => isFormEmpty("#form-post", validatePost));

  $("#add-image").change((e) => addImageForm(e));

  $(".btn-comment").click(function () {
    validateComment($(this), ".form-comment");
  });

  $(".btn-reply").click(function () {
    validateComment($(this), ".form-reply");
  });

  $(".btn-deletePost").click(function () {
    showConfirmModal(
      $(this),
      ".form-delete",
      "Are you sure you want to delete this post"
    );
  });
});
