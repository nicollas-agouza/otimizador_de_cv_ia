import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useForm } from '../../hooks/useForm';
import { useValidation } from '../../hooks/useValidation';
import Input from '../common/Input';
import Button from '../common/Button';

const ForgotPasswordForm = () => {
  const { forgotPassword, isLoading, error, clearError } = useAuth();
  const { required, email } = useValidation();
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const validationRules = {
    email: [required('Email é obrigatório'), email()]
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    isValid
  } = useForm(
    { email: '' },
    validationRules
  );

  // Limpar erro quando houver mudanças no formulário
  useEffect(() => {
    if (error) {
      clearError();
    }
  }, [values, clearError]);

  // Timer para reenvio
  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const onSubmit = async (formData) => {
    const result = await forgotPassword(formData.email);
    
    if (result.success) {
      setIsEmailSent(true);
      setResendTimer(60); // 60 segundos para reenvio
    }
  };

  const handleResend = async () => {
    if (resendTimer > 0) return;
    
    const result = await forgotPassword(values.email);
    if (result.success) {
      setResendTimer(60);
    }
  };

  const EmailIcon = () => (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
    </svg>
  );

  const CheckIcon = () => (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  if (isEmailSent) {
    return (
      <div className="space-y-6">
        {/* Ícone de Sucesso */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-green-100 text-green-600 mb-4">
            <CheckIcon />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Email enviado!
          </h3>
          <p className="text-sm text-gray-600">
            Enviamos as instruções para redefinir sua senha para{' '}
            <span className="font-medium text-gray-900">{values.email}</span>
          </p>
        </div>

        {/* Instruções */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <svg className="h-5 w-5 text-blue-400 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div className="text-sm text-blue-700">
              <p className="font-medium mb-1">Próximos passos:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Verifique sua caixa de entrada</li>
                <li>Clique no link de redefinição no email</li>
                <li>Defina uma nova senha</li>
                <li>Caso não encontre o email, verifique a pasta de spam</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Botão Reenviar */}
        <div className="text-center space-y-4">
          <p className="text-sm text-gray-600">
            Não recebeu o email?
          </p>
          
          <Button
            onClick={handleResend}
            variant="outline"
            disabled={resendTimer > 0 || isLoading}
            loading={isLoading}
          >
            {resendTimer > 0 
              ? `Reenviar em ${resendTimer}s` 
              : 'Reenviar email'
            }
          </Button>

          {/* Tentar outro email */}
          <button
            onClick={() => {
              setIsEmailSent(false);
              setResendTimer(0);
              resetForm();
            }}
            className="block w-full text-sm text-indigo-600 hover:text-indigo-500"
          >
            Tentar com outro email
          </button>
        </div>

        {/* Voltar ao Login */}
        <div className="text-center pt-4 border-t border-gray-200">
          <Link
            to="/login"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
          >
            <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Voltar para o login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleSubmit(onSubmit);
    }} className="space-y-6">
      
      {/* Descrição */}
      <div className="text-center mb-8">
        <p className="text-sm text-gray-600">
          Digite seu email e enviaremos as instruções para redefinir sua senha.
        </p>
      </div>

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

      {/* Botão Submit */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        loading={isLoading}
        disabled={!isValid || isLoading}
      >
        {isLoading ? 'Enviando...' : 'Enviar instruções'}
      </Button>

      {/* Links */}
      <div className="space-y-3">
        <div className="text-center">
          <Link
            to="/login"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
          >
            <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Voltar para o login
          </Link>
        </div>

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
      </div>
    </form>
  );
};

export default ForgotPasswordForm;