// frontend/src/pages/auth/ForgotPasswordPage.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/auth/AuthLayout';
import ForgotPasswordForm from '../../components/auth/ForgotPasswordForm';
import { useAuth } from '../../context/AuthContext';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    document.title = 'Recuperar Senha - Otimizador de CV IA';
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <AuthLayout
      title="Esqueceu sua senha?"
      subtitle="Não se preocupe, vamos ajudá-lo a recuperar"
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
};

export default ForgotPasswordPage;