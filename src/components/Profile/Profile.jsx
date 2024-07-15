import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({
  handleCardClick,
  clothingItems,
  handleAddClick,
  handleLogout,
  handleProfileEditClick,
  handleCardLike,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar
          handleLogout={handleLogout}
          handleProfileEditClick={handleProfileEditClick}
        />
      </section>
      <section className="profile__clothes-section">
        <ClothesSection
          handleCardClick={handleCardClick}
          clothingItems={clothingItems}
          handleAddClick={handleAddClick}
          handleCardLike={handleCardLike}
        />
      </section>
    </div>
  );
}

export default Profile;
