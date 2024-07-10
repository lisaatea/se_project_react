import "./SideBar.css";

import avatar from "../../assets/avatar.svg";

function SideBar({ userData, handleLogout, handleProfileEditClick }) {
  return (
    <>
      <div className="sidebar__user-container ">
        <img src={userData.avatar} alt="avatar" className="sidebar__avatar" />
        <p className="sidebar__username">{userData.name}</p>
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
