// frontend/src/pages/auth/RegisterPage.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/auth/AuthLayout';
import RegisterForm from '../../components/auth/RegisterForm';
import { useAuth } from '../../context/AuthContext';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    document.title = 'Criar Conta - Otimizador de CV IA';
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <AuthLayout
      title="Criar sua conta"
      subtitle="Comece a otimizar seus currículos com IA"
    >
      <RegisterForm />
    </AuthLayout>
  );
};

export default RegisterPage;