"use strict";

import { isFormEmpty, validateSignUp } from "./exports/exports.js";

$(() => {
  //--------------------------------Protos------------------------------------
  String.prototype.isEmpty = function () {
    return this === null || this === undefined || this.trim().length === 0;
  };

  Inputmask("+1 (9{3}) 9{3}-9{4}", { greedy: false }).mask("input[type=tel]");
  $("#btn-signUp").click(() => isFormEmpty("form-signup", validateSignUp));
  $("#btn-reset").click(() => isFormEmpty("form-reset"));
  $("#btn-login").click(() => isFormEmpty("form-login"));
});
