import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./ItemCard.css";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const handleCardClick = () => {
    onCardClick(item);
  };

  const isLiked = item.likes.some((like) => like === currentUser._id);

  const likeButtonClass = `card__like-button ${
    isLiked ? "card__like-button_liked" : ""
  }`;

  const handleLike = () => {
    onCardLike(item);
  };

  return (
    <li className="card">
      <div className="card__header">
        <h2 className="card__title">{item.name}</h2>
        {currentUser._id && (
          <button onClick={handleLike} className={likeButtonClass}></button>
        )}
      </div>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
