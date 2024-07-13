import "./SideBar.css";

function SideBar({ currentUser, handleLogout, handleProfileEditClick }) {
  const renderAvatar = () => {
    if (currentUser.avatar) {
      return (
        <img
          src={currentUser.avatar}
          alt="avatar"
          className="sidebar__avatar"
        />
      );
    } else {
      const initial = currentUser.name.trim().charAt(0).toUpperCase();
      return <div className="sidebar__avatar-placeholder">{initial}</div>;
    }
  };

  return (
    <>
      <div className="sidebar__user-container ">
        {renderAvatar()}
        <p className="sidebar__username">{currentUser.name}</p>
      </div>
      <div className="sidebar__button-container">
        <button
          onClick={handleProfileEditClick}
          type="button"
          className="sidebar__button"
        >
          Change profile data
        </button>
        <button
          onClick={handleLogout}
          type="button"
          className="sidebar__button"
        >
          Log out
        </button>
      </div>
    </>
  );
}

export default SideBar;
