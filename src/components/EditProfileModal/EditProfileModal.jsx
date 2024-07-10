import { useState } from "react";
import "./EditProfileModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const EditProfileModal = ({ isOpen, onEditProfile, onClose }) => {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleEditName = (e) => {
    const value = e.target.value;
    setName(value);
  };

  const handleEditAvatar = (e) => {
    const value = e.target.value;
    setAvatar(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditProfile({ name, avatar });
  };

  return (
    <ModalWithForm
      title="Change profile data"
      buttonText="Save changes"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      className="modal__submit-edit-profile"
    >
      <label htmlFor="name" className="modal__label">
        Name*
        <span></span>
        <input
          type="text"
          className="modal__input"
          name="name"
          value={name}
          onChange={handleEditName}
          placeholder="Name"
          required
        />
      </label>
      <label htmlFor="avatar" className="modal__label">
        Avatar URL*
        <span></span>
        <input
          type="url"
          className="modal__input"
          name="avatar"
          value={avatar}
          onChange={handleEditAvatar}
          placeholder="Avatar URL"
          required
        />
      </label>
    </ModalWithForm>
  );
};

export default EditProfileModal;
