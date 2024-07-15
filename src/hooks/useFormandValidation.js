import { useState } from "react";

export function useFormAndValidation(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    switch (name) {
      case "name":
        validateName(value);
        break;
      case "email":
        validateEmail(value);
        break;
      case "avatar":
        validateAvatar(value);
        break;
      case "password":
        validatePassword(value);
        break;
      case "imageUrl":
        validateImageUrl(value);
        break;
      default:
        break;
    }
    setIsValid(e.target.closest("form").checkValidity());
  };

  const validateName = (value) => {
    if (value.trim() === "") {
      setErrors({ ...errors, name: "(Name is required)" });
    } else {
      setErrors({ ...errors, name: "" });
    }
  };

  const validateEmail = (value) => {
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    if (!isValidEmail) {
      setErrors({ ...errors, email: "(This is not a valid email address)" });
    } else {
      setErrors({ ...errors, email: "" });
    }
  };

  const validateAvatar = (value) => {
    if (value.trim() !== "") {
      setErrors({ ...errors, avatar: "" });
    } else {
      const isValidUrl = /^(ftp|http|https):\/\/[^ "]+$/.test(value);
      setErrors({
        ...errors,
        avatar: isValidUrl ? "" : "(Valid URL required)",
      });
    }
  };

  const validatePassword = (value) => {
    if (value.trim() === "") {
      setErrors({ ...errors, password: "(Password is required)" });
    } else {
      setErrors({ ...errors, password: "" });
    }
  };

  const validateImageUrl = (value) => {
    if (value.trim() === "") {
      setErrors({ ...errors, imageUrl: "(Valid URL required" });
    } else {
      const isValidUrl = /^(ftp|http|https):\/\/[^ "]+$/.test(value);
      setErrors({
        ...errors,
        imageUrl: isValidUrl ? "" : "(Valid URL required)",
      });
    }
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setIsValid(false);
  };

  return {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
  };
}
