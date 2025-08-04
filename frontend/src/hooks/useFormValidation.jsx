export const useFormValidation = () => {
  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const isStrongPassword = (password) => {
    
    return (
      password.length >= 6 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[!@#$%^&*(),.?":{}|<>]/.test(password)
    );
  };
  

 const isValidName = (name) => {
  return /^[A-Za-z]{2,}( [A-Za-z]{2,})+$/.test(name.trim());
};

const validate = (formData, type) => {
  const errors = {};
  const { name, email, password } = formData;

  if (!email?.trim()) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(email)) {
    errors.email = 'Enter a valid email';
  }

  if (type === 'register') {
    if (!name?.trim()) {
      errors.name = 'Name is required';
    } else if (!isValidName(name)) {
      errors.name = 'Enter a full name';
    }

    if (!password) {
      errors.password = 'Password is required';
    } else if (!isStrongPassword(password)) {
      errors.password =
        'Password must include uppercase, lowercase, number, and special character';
    }
  }

  if (type === 'login') {
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
  }

  return errors;
};

  return { validate };
};