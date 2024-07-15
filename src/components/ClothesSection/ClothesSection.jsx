import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({
  handleCardClick,
  clothingItems,
  handleAddClick,
  handleCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);
  const filteredClothingItems = clothingItems.filter(
    (item) => item.owner._id === currentUser._id
  );
  return (
    <div className="clothes-section">
      <div className="clothes-section__heading">
        <p className="clothes-section__title">Your items</p>
        <button
          type="button"
          className="clothes-section__add-btn"
          onClick={handleAddClick}
        >
          + Add new
        </button>
      </div>
      <ul className="clothes-section__items">
        {filteredClothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
