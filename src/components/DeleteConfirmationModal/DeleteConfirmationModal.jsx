import "./DeleteConfirmationModal.css";
function DeleteConfirmationModal({ activeModal, onClose, onDelete }) {
  return (
    <div
      className={`modal ${activeModal === "delete-garment" && "modal_opened"}`}
    >
      <div className="delete-modal">
        <button
          onClick={onClose}
          type="button"
          className="delete-modal__btn-close"
        ></button>
        <p className="delete-modal__heading">
          Are you sure you want to delete this item? This action is
          irreversible.
        </p>
        <div className="delete-modal__button-box">
          <button
            type="submit"
            className="delete-modal__btn-delete"
            onClick={onDelete}
          >
            Yes, delete item
          </button>
          <button
            type="submit"
            className="delete-modal__btn-cancel"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
