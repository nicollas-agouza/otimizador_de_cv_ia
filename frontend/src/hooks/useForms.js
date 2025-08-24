import { useState, useCallback } from 'react';

export const useForm = (initialValues, validationRules = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = useCallback((name, value) => {
    const rules = validationRules[name];
    if (!rules) return '';

    for (const rule of rules) {
      const error = rule(value, values);
      if (error) return error;
    }
    return '';
  }, [validationRules, values]);

  const validateForm = useCallback(() => {
    const newErrors = {};
    let isValid = true;

    Object.keys(validationRules).forEach(field => {
      const error = validateField(field, values[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [validateField, validationRules, values]);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setValues(prev => ({
      ...prev,
      [name]: newValue
    }));

    // Validar campo em tempo real se já foi tocado
    if (touched[name]) {
      const error = validateField(name, newValue);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  }, [touched, validateField]);

  const handleBlur = useCallback((e) => {
    const { name, value } = e.target;
    
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  }, [validateField]);

  const handleSubmit = useCallback(async (onSubmit) => {
    setIsSubmitting(true);
    
    // Marcar todos os campos como tocados
    const allTouched = Object.keys(values).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);

    if (validateForm()) {
      try {
        await onSubmit(values);
      } catch (error) {
        console.error('Erro no submit:', error);
      }
    }
    
    setIsSubmitting(false);
  }, [values, validateForm]);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  const setFieldValue = useCallback((name, value) => {
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const setFieldError = useCallback((name, error) => {
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  }, []);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setFieldValue,
    setFieldError,
    isValid: Object.keys(errors).length === 0
  };
};

// frontend/src/hooks/useValidation.js
export const useValidation = () => {
  const required = (message = 'Este campo é obrigatório') => {
    return (value) => {
      if (!value || (typeof value === 'string' && value.trim() === '')) {
        return message;
      }
      return '';
    };
  };

  const email = (message = 'Email inválido') => {
    return (value) => {
      if (!value) return '';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value) ? '' : message;
    };
  };

  const minLength = (min, message) => {
    return (value) => {
      if (!value) return '';
      return value.length >= min ? '' : message || `Mínimo ${min} caracteres`;
    };
  };

  const maxLength = (max, message) => {
    return (value) => {
      if (!value) return '';
      return value.length <= max ? '' : message || `Máximo ${max} caracteres`;
    };
  };

  const pattern = (regex, message) => {
    return (value) => {
      if (!value) return '';
      return regex.test(value) ? '' : message;
    };
  };

  const passwordStrength = (message = 'Senha deve conter pelo menos 8 caracteres, 1 maiúscula e 1 número') => {
    return (value) => {
      if (!value) return '';
      const hasMinLength = value.length >= 8;
      const hasUpperCase = /[A-Z]/.test(value);
      const hasNumber = /\d/.test(value);
      
      return hasMinLength && hasUpperCase && hasNumber ? '' : message;
    };
  };

  const confirmPassword = (passwordField = 'password', message = 'Senhas não conferem') => {
    return (value, allValues) => {
      if (!value) return '';
      return value === allValues[passwordField] ? '' : message;
    };
  };

  const mustBeTrue = (message = 'Este campo deve ser aceito') => {
    return (value) => {
      return value === true ? '' : message;
    };
  };

  return {
    required,
    email,
    minLength,
    maxLength,
    pattern,
    passwordStrength,
    confirmPassword,
    mustBeTrue
  };
};