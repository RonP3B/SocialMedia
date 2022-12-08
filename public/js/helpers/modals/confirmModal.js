export const showConfirmModal = function (button, formClass, msg) {
  const form = button.siblings(formClass);

  const confirmModal = `<div class="modal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Confirmation</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <p>${msg}</p>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary btn-cancel"
              data-bs-dismiss="modal"
            >Cancel</button>
            <button
              type="button"
              id="btn-modal"
              class="btn btn-primary"
            >Accept</button>
          </div>
        </div>
      </div>
    </div>`;

  $(".modal-container").html(confirmModal);
  $("#btn-modal").click(() => form.submit());
  $(".modal").modal("show");
};
