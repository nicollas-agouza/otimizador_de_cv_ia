import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useForm } from '../../hooks/useForm';
import { useValidation } from '../../hooks/useValidation';
import Input from '../common/Input';
import Button from '../common/Button';

const PasswordStrengthIndicator = ({ password }) => {
  const getStrength = (pwd) => {
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/[a-z]/.test(pwd)) strength++;
    if (/\d/.test(pwd)) strength++;
    if (/[^A-Za-z0-9]/.test(pwd)) strength++;
    return strength;
  };

  const strength = getStrength(password);
  const strengthLabels = ['Muito fraca', 'Fraca', 'Regular', 'Boa', 'Muito forte'];
  const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];

  if (!password) return null;

  return (
    <div className="mt-2">
      <div className="flex items-center space-x-2">
        <div className="flex-1 bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${strengthColors[strength - 1] || 'bg-gray-300'}`}
            style={{ width: `${(strength / 5) * 100}%` }}
          />
        </div>
        <span className="text-xs text-gray-600">
          {strengthLabels[strength - 1] || 'Muito fraca'}
        </span>
      </div>
    </div>
  );
};

const RegisterForm = () => {
  const navigate = useNavigate();
  const { register, isLoading, error, clearError, isAuthenticated } = useAuth();
  const { required, email, minLength, passwordStrength, confirmPassword, mustBeTrue } = useValidation();
  const [showTerms, setShowTerms] = useState(false);

  const validationRules = {
    name: [required('Nome é obrigatório'), minLength(2, 'Nome deve ter pelo menos 2 caracteres')],
    email: [required('Email é obrigatório'), email()],
    password: [required('Senha é obrigatória'), passwordStrength()],
    confirmPassword: [required('Confirmação de senha é obrigatória'), confirmPassword()],
    acceptTerms: [mustBeTrue('Você deve aceitar os termos de uso')]
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldError,
    isValid
  } = useForm(
    { 
      name: '', 
      email: '', 
      password: '', 
      confirmPassword: '',
      acceptTerms: false
    },
    validationRules
  );

  // Redirecionar se já estiver autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  // Limpar erro geral quando houver mudanças no formulário
  useEffect(() => {
    if (error) {
      clearError();
    }
  }, [values, clearError]);

  const onSubmit = async (formData) => {
    const { confirmPassword, acceptTerms, ...userData } = formData;
    
    const result = await register(userData);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      // Tratar erros específicos
      if (result.error.includes('email')) {
        setFieldError('email', result.error);
      }
    }
  };

  const UserIcon = () => (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );

  const EmailIcon = () => (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
    </svg>
  );

  const LockIcon = () => (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  );

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleSubmit(onSubmit);
    }} className="space-y-6">
      
      {/* Erro geral */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <svg className="h-5 w-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      )}

      {/* Campo Nome */}
      <Input
        label="Nome completo"
        type="text"
        name="name"
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.name}
        touched={touched.name}
        placeholder="Seu nome completo"
        required
        icon={<UserIcon />}
        autoComplete="name"
      />

      {/* Campo Email */}
      <Input
        label="Email"
        type="email"
        name="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.email}
        touched={touched.email}
        placeholder="seu@email.com"
        required
        icon={<EmailIcon />}
        autoComplete="email"
      />

      {/* Campo Senha */}
      <div>
        <Input
          label="Senha"
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.password}
          touched={touched.password}
          placeholder="Digite sua senha"
          required
          icon={<LockIcon />}
          showPasswordToggle
          autoComplete="new-password"
        />
        <PasswordStrengthIndicator password={values.password} />
      </div>

      {/* Campo Confirmar Senha */}
      <Input
        label="Confirmar senha"
        type="password"
        name="confirmPassword"
        value={values.confirmPassword}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.confirmPassword}
        touched={touched.confirmPassword}
        placeholder="Confirme sua senha"
        required
        icon={<LockIcon />}
        showPasswordToggle
        autoComplete="new-password"
      />

      {/* Checkbox Termos de Uso */}
      <div className="space-y-2">
        <div className="flex items-start">
          <input
            id="acceptTerms"
            name="acceptTerms"
            type="checkbox"
            checked={values.acceptTerms}
            onChange={handleChange}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mt-1"
          />
          <label htmlFor="acceptTerms" className="ml-3 block text-sm text-gray-900">
            Eu aceito os{' '}
            <button
              type="button"
              onClick={() => setShowTerms(true)}
              className="text-indigo-600 hover:text-indigo-500 font-medium"
            >
              termos de uso
            </button>
            {' '}e{' '}
            <Link
              to="/privacy"
              className="text-indigo-600 hover:text-indigo-500 font-medium"
            >
              política de privacidade
            </Link>
          </label>
        </div>
        {touched.acceptTerms && errors.acceptTerms && (
          <p className="text-sm text-red-600 flex items-center ml-7">
            <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.acceptTerms}
          </p>
        )}
      </div>

      {/* Botão Submit */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        loading={isLoading}
        disabled={!isValid || isLoading}
      >
        {isLoading ? 'Criando conta...' : 'Criar conta'}
      </Button>

      {/* Link para Login */}
      <div className="text-center">
        <p className="text-sm text-gray-600">
          Já tem uma conta?{' '}
          <Link
            to="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Fazer login
          </Link>
        </p>
      </div>

      {/* Modal Termos de Uso */}
      {showTerms && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Termos de Uso</h3>
              <button
                onClick={() => setShowTerms(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="text-sm text-gray-700 space-y-3">
              <p>Ao usar nosso serviço, você concorda com os seguintes termos:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Você deve fornecer informações precisas e verdadeiras</li>
                <li>Você é responsável pela segurança da sua conta</li>
                <li>Nosso serviço destina-se ao uso profissional ético</li>
                <li>Reservamos o direito de modificar estes termos</li>
              </ul>
            </div>
            <div className="mt-4 flex justify-end">
              <Button onClick={() => setShowTerms(false)}>
                Fechar
              </Button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
};

export default RegisterForm;