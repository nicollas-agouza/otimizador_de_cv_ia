// frontend/src/utils/validators.js
export const validators = {
    // Validador de email
    isValidEmail: (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
  
    // Validador de senha forte
    isStrongPassword: (password) => {
      const minLength = password.length >= 8;
      const hasUpperCase = /[A-Z]/.test(password);
      const hasLowerCase = /[a-z]/.test(password);
      const hasNumber = /\d/.test(password);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
      
      return {
        isValid: minLength && hasUpperCase && hasLowerCase && hasNumber,
        checks: {
          minLength,
          hasUpperCase,
          hasLowerCase,
          hasNumber,
          hasSpecialChar
        },
        score: [minLength, hasUpperCase, hasLowerCase, hasNumber, hasSpecialChar]
          .filter(Boolean).length
      };
    },
  
    // Validador de nome
    isValidName: (name) => {
      return name && name.trim().length >= 2 && /^[a-zA-ZÀ-ÿ\s]+$/.test(name);
    },
  
    // Validador de CPF (brasileiro)
    isValidCPF: (cpf) => {
      cpf = cpf.replace(/[^\d]+/g, '');
      
      if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        return false;
      }
      
      let sum = 0;
      for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf.charAt(i)) * (10 - i);
      }
      let remainder = (sum * 10) % 11;
      if (remainder === 10 || remainder === 11) remainder = 0;
      if (remainder !== parseInt(cpf.charAt(9))) return false;
      
      sum = 0;
      for (let i = 0; i < 10; i++) {
        sum += parseInt(cpf.charAt(i)) * (11 - i);
      }
      remainder = (sum * 10) % 11;
      if (remainder === 10 || remainder === 11) remainder = 0;
      if (remainder !== parseInt(cpf.charAt(10))) return false;
      
      return true;
    },
  
    // Validador de telefone brasileiro
    isValidPhone: (phone) => {
      const cleanPhone = phone.replace(/[^\d]+/g, '');
      return cleanPhone.length === 10 || cleanPhone.length === 11;
    },
  
    // Sanitizar string
    sanitizeString: (str) => {
      return str.trim().replace(/[<>]/g, '');
    },
  
    // Validador de URL
    isValidURL: (url) => {
      try {
        new URL(url);
        return true;
      } catch {
        return false;
      }
    }
  };