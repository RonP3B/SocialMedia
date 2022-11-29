"use strict";

$(() => {
  //--------------------------------Protos------------------------------------
  String.prototype.isEmpty = function () {
    return this === null || this === undefined || this.trim().length === 0;
  };

  alert("We're alive!");
});
