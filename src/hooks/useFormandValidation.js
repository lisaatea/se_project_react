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
      const isValidUrl = /^(ftp|http|https):\/\/[^ "]+$/.test(value);
      if (!isValidUrl) {
        setErrors({ ...errors, avatar: "(Valid URL required)" });
      } else {
        setErrors({ ...errors, avatar: "" });
      }
    } else {
      setErrors({ ...errors, avatar: "" });
    }
  };

  const validatePassword = (value) => {
    if (value.trim() === "") {
      setErrors({ ...errors, password: "(Password is required)" });
    } else {
      setErrors({ ...errors, password: "" });
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
