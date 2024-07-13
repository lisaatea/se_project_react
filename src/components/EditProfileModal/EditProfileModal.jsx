import "./EditProfileModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../hooks/useFormandValidation";

const EditProfileModal = ({ isOpen, onEditProfile, onClose }) => {
  const { values, handleChange, isValid, resetForm, errors } =
    useFormAndValidation({
      name: "",
      email: "",
      avatar: "",
      password: "",
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      onEditProfile({ name: values.name, avatar: values.avatar });
      resetForm();
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
      <label htmlFor="name" className="modal__label">
        Name*
        <span className="modal__error">{errors.name}</span>
        <input
          type="text"
          className="modal__input"
          name="name"
          value={values.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
      </label>
      <label htmlFor="avatar" className="modal__label">
        Avatar URL
        <span className="modal__error">{errors.avatar}</span>
        <input
          type="url"
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
