"use strict";

import {
  isFormEmpty,
  validateSignUp,
  addImageForm,
  validatePost,
  validateComment,
  showConfirmModal,
  validateNewEvent,
} from "./exports/exports.js";

$(() => {
  //--------------------------------Protos------------------------------------
  String.prototype.isEmpty = function () {
    return this === null || this === undefined || this.trim().length === 0;
  };

  Inputmask("+1 (9{3}) 9{3}-9{4}", { greedy: false }).mask("input[type=tel]");

  $("#btn-submit").click(() => isFormEmpty("#form-default"));

  $("#btn-signUp").click(() => isFormEmpty("#form-signup", validateSignUp));

  $("#btn-post").click(() => isFormEmpty("#form-post", validatePost));

  $("#btn-date").click(() => isFormEmpty("#form-date", validateNewEvent));

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
      "Are you sure you want to delete this post?"
    );
  });

  $(".btn-deleteFriend").click(function () {
    showConfirmModal(
      $(this),
      ".form-delete",
      "Are you sure you want to delete this friend?"
    );
  });

  $(".btn-deleteInvitation").click(function () {
    showConfirmModal(
      $(this),
      ".form-delete",
      "Are you sure you want to delete this invitation?"
    );
  });

  $(".btn-deleteEvent").click(function () {
    showConfirmModal(
      $(this),
      ".form-delete",
      "Are you sure you want to delete this event?"
    );
  });
});
