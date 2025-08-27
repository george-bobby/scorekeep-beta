// Validation utilities for consistent form validation across the app

export const validateName = (name: string): string | null => {
  if (!name || name.trim().length === 0) {
    return "Name is required";
  }
  if (name.length < 20 || name.length > 60) {
    return "Name must be between 20-60 characters";
  }
  return null;
};

export const validateEmail = (email: string): string | null => {
  if (!email || email.trim().length === 0) {
    return "Email is required";
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Please enter a valid email address";
  }
  return null;
};

export const validateAddress = (address: string): string | null => {
  if (!address || address.trim().length === 0) {
    return "Address is required";
  }
  if (address.length > 400) {
    return "Address must be less than 400 characters";
  }
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password || password.trim().length === 0) {
    return "Password is required";
  }
  if (password.length < 8 || password.length > 16) {
    return "Password must be between 8-16 characters";
  }
  const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])/;
  if (!passwordRegex.test(password)) {
    return "Password must contain at least 1 uppercase letter and 1 special character";
  }
  return null;
};

export const validateRating = (rating: number): string | null => {
  if (rating < 1 || rating > 5) {
    return "Rating must be between 1 and 5";
  }
  return null;
};

export const validateStoreName = (name: string): string | null => {
  if (!name || name.trim().length === 0) {
    return "Store name is required";
  }
  if (name.length > 100) {
    return "Store name must be less than 100 characters";
  }
  return null;
};

export const validateRole = (role: string): string | null => {
  const validRoles = ['admin', 'user', 'store_owner'];
  if (!validRoles.includes(role)) {
    return "Invalid role selected";
  }
  return null;
};

// Utility function to validate all fields and return first error
export const validateForm = (validations: Array<() => string | null>): string | null => {
  for (const validation of validations) {
    const error = validation();
    if (error) return error;
  }
  return null;
};
