const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Improved email validation regex
    return emailRegex.test(email);
  };

const validateUsername = (username) => {
    const minLength = 5; // Enforce minimum 

    return username.length >= minLength;
}

const validatePassword = (password) => {
    const minLength = 8; // Enforce minimum 
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    // eslint-disable-next-line no-useless-escape
    const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password);
    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSymbol
    );
  };
export { validateEmail, validatePassword, validateUsername }