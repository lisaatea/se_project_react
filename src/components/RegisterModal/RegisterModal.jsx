import { useEffect } from "react";
import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../hooks/useFormandValidation";

const RegisterModal = ({ isOpen, handleRegistration, onClose, onToggle }) => {
  const { values, handleChange, isValid, resetForm, errors } =
    useFormAndValidation({
      name: "",
      avatar: "",
      email: "",
      password: "",
    });

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      handleRegistration(values);
    }
  };

  return (
    <ModalWithForm
      title="Sign up"
      buttonText="Sign up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormValid={{ isValid }}
      isButtonDisabled={!isValid}
    >
      <label htmlFor="register-email" className="modal__label">
        Email*
        <span className="modal__error">{errors.email}</span>
        <input
          type="email"
          id="register-email"
          className="modal__input"
          name="email"
          value={values.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
      </label>
      <label htmlFor="register-password" className="modal__label">
        Password*
        <span className="modal__error">{errors.password}</span>
        <input
          type="password"
          id="register-password"
          className="modal__input"
          name="password"
          value={values.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
      </label>
      <label htmlFor="register-name" className="modal__label">
        Name*
        <span className="modal__error">{errors.name}</span>
        <input
          type="text"
          id="register-name"
          className="modal__input"
          name="name"
          value={values.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
      </label>
      <label htmlFor="register-avatar" className="modal__label">
        Avatar URL
        <span className="modal__error">{errors.avatar}</span>
        <input
          type="url"
          id="register-avatar"
          className="modal__input"
          name="avatar"
          value={values.avatar}
          onChange={handleChange}
          placeholder="Avatar URL"
        />
      </label>
      <button className="register-modal__toggle" onClick={onToggle}>
        {" "}
        or Log In
      </button>
    </ModalWithForm>
  );
};

export default RegisterModal;
