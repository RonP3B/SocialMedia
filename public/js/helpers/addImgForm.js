export const addImageForm = function (e) {
  const ObjFileReader = new FileReader();
  ObjFileReader.readAsDataURL(e.target.files[0]);

  ObjFileReader.addEventListener("load", () =>
    $("#image-added").attr("src", ObjFileReader.result)
  );

  $("#image-name").val(e.target.files[0].name);
};
