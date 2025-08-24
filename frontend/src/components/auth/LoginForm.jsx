import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useForm } from '../../hooks/useForm';
import { useValidation } from '../../hooks/useValidation';
import Input from '../common/Input';
import Button from '../common/Button';

const LoginForm = () => {
  const navigate = useNavigate();
  const { login, isLoading, error, clearError, isAuthenticated } = useAuth();
  const { required, email } = useValidation();

  const validationRules = {
    email: [required('Email é obrigatório'), email()],
    password: [required('Senha é obrigatória')]
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
    { email: '', password: '' },
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
    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      // Se o erro for específico do campo, aplicar ao campo correspondente
      if (result.error.includes('email')) {
        setFieldError('email', result.error);
      } else if (result.error.includes('senha')) {
        setFieldError('password', result.error);
      }
      // Erro geral é tratado pelo context
    }
  };

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
        autoComplete="current-password"
      />

      {/* Link Esqueci minha senha */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
            Lembrar de mim
          </label>
        </div>

        <Link
          to="/forgot-password"
          className="text-sm text-indigo-600 hover:text-indigo-500 font-medium"
        >
          Esqueci minha senha
        </Link>
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
        {isLoading ? 'Entrando...' : 'Entrar'}
      </Button>

      {/* Link para Registro */}
      <div className="text-center">
        <p className="text-sm text-gray-600">
          Não tem uma conta?{' '}
          <Link
            to="/register"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Criar conta gratuita
          </Link>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;