import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../hooks/useFormandValidation";

const RegisterModal = ({ isOpen, handleRegistration, onClose }) => {
  const { values, handleChange, isValid, resetForm, errors } =
    useFormAndValidation({
      name: "",
      avatar: "",
      email: "",
      password: "",
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      handleRegistration(values);
      resetForm();
    }
  };

  return (
    <ModalWithForm
      title="Sign up"
      buttonText="Next"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormValid={{ isValid }}
      isButtonDisabled={!isValid}
    >
      <label htmlFor="email" className="modal__label">
        Email*
        <span className="modal__error">{errors.email}</span>
        <input
          type="email"
          className="modal__input"
          name="email"
          value={values.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
      </label>
      <label htmlFor="password" className="modal__label">
        Password*
        <span className="modal__error">{errors.password}</span>
        <input
          type="password"
          className="modal__input"
          name="password"
          value={values.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
      </label>
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

export default RegisterModal;
