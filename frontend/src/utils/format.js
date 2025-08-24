// frontend/src/utils/format.js
export const formatters = {
    // Formatar CPF
    formatCPF: (cpf) => {
      const numbers = cpf.replace(/[^\d]/g, '');
      return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    },
  
    // Formatar telefone
    formatPhone: (phone) => {
      const numbers = phone.replace(/[^\d]/g, '');
      if (numbers.length === 10) {
        return numbers.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
      } else if (numbers.length === 11) {
        return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
      }
      return phone;
    },
  
    // Formatar data
    formatDate: (date, locale = 'pt-BR') => {
      return new Date(date).toLocaleDateString(locale);
    },
  
    // Formatar tamanho de arquivo
    formatFileSize: (bytes) => {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    },
  
    // Capitalizar primeira letra
    capitalize: (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    },
  
    // Truncar texto
    truncate: (str, length = 100) => {
      return str.length > length ? str.substring(0, length) + '...' : str;
    }
  };