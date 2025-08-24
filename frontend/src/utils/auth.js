// frontend/src/utils/auth.js
export const authHelpers = {
    // Verificar se o token está expirado
    isTokenExpired: (token) => {
      if (!token) return true;
      
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Date.now() / 1000;
        return payload.exp < currentTime;
      } catch {
        return true;
      }
    },
  
    // Obter dados do usuário do token
    getUserFromToken: (token) => {
      if (!token) return null;
      
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return {
          id: payload.sub,
          email: payload.email,
          name: payload.name,
          exp: payload.exp
        };
      } catch {
        return null;
      }
    },
  
    // Limpar dados de autenticação
    clearAuthData: () => {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    },
  
    // Salvar dados de autenticação
    saveAuthData: (token, user, refreshToken = null) => {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken);
      }
    },
  
    // Obter dados salvos
    getSavedAuthData: () => {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      const refreshToken = localStorage.getItem('refreshToken');
      
      return {
        token,
        user: user ? JSON.parse(user) : null,
        refreshToken
      };
    },
  
    // Gerar senha aleatória
    generateRandomPassword: (length = 12) => {
      const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
      let password = '';
      
      // Garantir pelo menos um de cada tipo
      password += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 26)];
      password += 'abcdefghijklmnopqrstuvwxyz'[Math.floor(Math.random() * 26)];
      password += '0123456789'[Math.floor(Math.random() * 10)];
      password += '!@#$%^&*'[Math.floor(Math.random() * 8)];
      
      // Preencher o resto
      for (let i = 4; i < length; i++) {
        password += charset[Math.floor(Math.random() * charset.length)];
      }
      
      // Embaralhar
      return password.split('').sort(() => Math.random() - 0.5).join('');
    },
  
    // Verificar força da senha
    getPasswordStrength: (password) => {
      const result = validators.isStrongPassword(password);
      const strengthLevels = ['Muito fraca', 'Fraca', 'Regular', 'Boa', 'Muito forte'];
      
      return {
        ...result,
        level: strengthLevels[result.score - 1] || 'Muito fraca',
        color: ['red', 'orange', 'yellow', 'blue', 'green'][result.score - 1] || 'red'
      };
    }
  };