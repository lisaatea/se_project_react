import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../hooks/useFormandValidation";

const LoginModal = ({ isOpen, handleLogin, onClose, onToggle }) => {
  const { values, handleChange, isValid, resetForm, errors } =
    useFormAndValidation({
      email: "",
      password: "",
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      handleLogin(values);
      resetForm();
    }
  };

  return (
    <ModalWithForm
      title="Log in"
      buttonText="Log in"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormValid={isValid}
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
      <button className="login-modal__toggle" onClick={onToggle}>
        {" "}
        or Sign Up
      </button>
    </ModalWithForm>
  );
};

export default LoginModal;
