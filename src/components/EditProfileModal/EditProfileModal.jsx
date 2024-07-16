import { useEffect, useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./EditProfileModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../hooks/useFormandValidation";

const EditProfileModal = ({ isOpen, onEditProfile, onClose }) => {
  const { values, handleChange, isValid, errors, setValues } =
    useFormAndValidation({
      name: "",
      avatar: "",
    });

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    if (isOpen) {
      setValues({
        name: currentUser.name,
        avatar: currentUser.avatar,
      });
    }
  }, [isOpen, currentUser, setValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      onEditProfile({ name: values.name, avatar: values.avatar });
    }
  };

  return (
    <ModalWithForm
      title="Change profile data"
      buttonText="Save changes"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormValid={isValid}
      isButtonDisabled={!isValid}
      className="modal__submit-edit-profile"
    >
      <label htmlFor="edit-profile-name" className="modal__label">
        Name*
        <span className="modal__error">{errors.name}</span>
        <input
          type="text"
          id="edit-profile-name"
          className="modal__input"
          name="name"
          value={values.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
      </label>
      <label htmlFor="edit-profile-avatar" className="modal__label">
        Avatar URL
        <span className="modal__error">{errors.avatar}</span>
        <input
          type="url"
          id="edit-profile-avatar"
          className="modal__input"
          name="avatar"
          value={values.avatar}
          onChange={handleChange}
          placeholder="Avatar URL"
        />
      </label>
    </ModalWithForm>
  );
};

export default EditProfileModal;
