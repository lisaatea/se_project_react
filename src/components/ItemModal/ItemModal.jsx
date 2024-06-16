import "./ItemModal.css";

function ItemModal({ activeModal, onClose, card, handleDeleteClick }) {
  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="item-modal">
        <button
          onClick={onClose}
          type="button"
          className="item-modal__btn-close"
        ></button>
        <img
          src={card.imageUrl}
          alt={card.name}
          className="item-modal__image"
        />
        <div className="item-modal__footer">
          <div>
            <h2 className="item-modal__caption">{card.name}</h2>
            <p className="item-modal__weather">Weather: {card.weather}</p>
          </div>
          <button
            type="button"
            className="item-modal__btn-delete"
            onClick={() => handleDeleteClick(card._id)}
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
