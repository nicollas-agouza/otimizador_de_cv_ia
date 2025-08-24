# 🚀 Desafio Técnico - Otimizador de Currículos com IA

Este é o setup inicial do **frontend React** para o desafio técnico "Otimizador de Currículos com IA". 
A estrutura está preparada para que sua equipe implemente as funcionalidades gradualmente, trabalhando tanto no frontend quanto no backend.

## 🎯 Objetivo do Desafio

Construir uma **aplicação web full-stack completa** para otimização de currículos usando inteligência artificial, incluindo:

### Frontend (React)
- Sistema de upload de arquivos PDF
- Dashboard com métricas e visualizações
- Sistema de autenticação
- Histórico de versões

### Backend (FastAPI + Python)
- API REST completa com FastAPI
- Sistema de autenticação JWT
- Processamento de PDFs com PyMuPDF
- Análise de IA com Google Gemini e spaCy
- Banco de dados SQLite com SQLAlchemy

## 🏗️ Arquitetura do Projeto

```
otimizador_de_cv_ia/
├── frontend/                 # Frontend React (este diretório)
│   ├── src/
│   │   ├── components/      # Componentes reutilizáveis
│   │   ├── pages/           # Páginas da aplicação
│   │   ├── App.jsx          # Componente principal
│   │   ├── main.jsx         # Ponto de entrada
│   │   └── index.css        # Estilos globais
│   ├── package.json         # Dependências Node.js
│   └── README.md            # Este arquivo
└── backend/                  # Backend FastAPI (Python)
    ├── app/                  # Código da aplicação
    ├── main.py              # Ponto de entrada
    ├── pyproject.toml       # Dependências Python
    └── README.md            # Documentação do backend
```

## 🛠️ Setup Inicial

### Pré-requisitos
- **Node.js 18+** - [Download aqui](https://nodejs.org/)
- **Python 3.11.5+** - [Download aqui](https://www.python.org/)
- **npm ou yarn** - Gerenciador de pacotes
- **Git** - Controle de versão

### 🚀 Primeiros Passos

1. **Clone o repositório**
   ```bash
   git clone https://github.com/miguelamaral254/otimizador_de_cv_ia.git
   cd otimizador_de_cv_ia
   ```

2. **Setup do Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   A aplicação estará disponível em `http://localhost:3000`

3. **Setup do Backend**
   ```bash
   cd ../backend
   # Criar ambiente virtual Python
   python -m venv .venv
   
   # Ativar ambiente virtual (Windows)
   .\.venv\Scripts\activate
   
   # Ativar ambiente virtual (Linux/macOS)
   source .venv/bin/activate
   
   # Instalar dependências
   pip install -r requirements.txt
   
   # Executar servidor
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```
   A API estará disponível em `http://localhost:8000`

## 📁 Estrutura do Frontend

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Header.jsx      # Cabeçalho da aplicação
│   └── Footer.jsx      # Rodapé da aplicação
├── pages/               # Páginas da aplicação
│   ├── Home.jsx        # Página inicial
│   ├── About.jsx       # Sobre o projeto
│   └── Contact.jsx     # Página de contato
├── App.jsx              # Componente principal
├── main.jsx            # Ponto de entrada
└── index.css           # Estilos globais
```

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Gera build de produção
npm run preview      # Visualiza build de produção
npm run lint         # Executa linter

# Alternativas com yarn
yarn dev
yarn build
yarn preview
yarn lint
```

## 🎨 Tecnologias Configuradas

### Frontend
- **React 18.2.0** - Biblioteca principal
- **React Router DOM 6.20.1** - Roteamento
- **Tailwind CSS 3.3.6** - Framework CSS
- **Vite 5.0.0** - Build tool
- **ESLint** - Linting de código

### Backend (FastAPI)
- **Python 3.11.5** - Linguagem principal
- **FastAPI** - Framework web moderno
- **SQLAlchemy 2.0+** - ORM assíncrono
- **PyMuPDF** - Processamento de PDFs
- **spaCy** - Processamento de linguagem natural
- **Google Gemini** - API de IA
- **JWT** - Autenticação segura

## 📋 Tarefas do Desafio

### Fase 1: Setup e Estrutura Básica ✅
- [x] Setup do projeto React (Frontend)
- [x] Setup do projeto FastAPI (Backend)
- [x] Configuração do Tailwind CSS
- [x] Roteamento básico
- [x] Componentes Header e Footer

### Fase 2: Funcionalidades Core
- [ ] **Sistema de Upload (Frontend + Backend)**
  - Componente de drag & drop para PDFs
  - API para receber arquivos
  - Validação de arquivos
  - Armazenamento no backend
  
- [ ] **Sistema de Autenticação (Full-stack)**
  - Páginas de Login/Register (Frontend)
  - API de autenticação JWT (Backend)
  - Proteção de rotas
  - Gerenciamento de estado
  
- [ ] **Dashboard Principal (Frontend)**
  - Cards de estatísticas
  - Lista de currículos
  - Navegação entre seções

### Fase 3: Integração com IA
- [ ] **Análise de Currículos (Backend)**
  - Extração de texto de PDFs
  - Processamento com spaCy
  - Integração com Google Gemini
  - Geração de métricas
  
- [ ] **Visualizações (Frontend)**
  - Gráficos de progresso
  - Métricas de qualidade
  - Histórico de versões

### Fase 4: Funcionalidades Avançadas
- [ ] **Sistema de Notificações**
- [ ] **Exportação de Relatórios**
- [ ] **Filtros e Busca**
- [ ] **Responsividade Mobile**

## 🚀 Comandos Úteis para Desenvolvimento

### Git Workflow
```bash
# Criar nova branch para feature
git checkout -b feat/nome-da-feature

# Ver status das mudanças
git status

# Adicionar mudanças
git add .

# Fazer commit
git commit -m "feat: implementa sistema de upload"

# Enviar para repositório remoto
git push origin feat/nome-da-feature
```

### Frontend (React)
```bash
# Instalar nova dependência
npm install nome-do-pacote
npm install -D nome-do-pacote-dev

# Remover dependência
npm uninstall nome-do-pacote

# Ver dependências desatualizadas
npm outdated

# Atualizar dependências
npm update
```

### Backend (Python)
```bash
# Ativar ambiente virtual
source .venv/bin/activate  # Linux/macOS
.\.venv\Scripts\activate   # Windows

# Instalar dependência
pip install nome-do-pacote

# Gerar requirements.txt
pip freeze > requirements.txt

# Executar servidor
uvicorn main:app --reload --port 8000
```

### Debugging
```bash
# Frontend - DevTools do navegador
F12 ou Ctrl+Shift+I

# Frontend - Console do navegador
console.log('Debug info')

# Backend - Logs do servidor
print("Debug info")  # Python
logging.info("Debug info")  # Logging estruturado
```

## 📚 Recursos de Aprendizado

### Frontend
- [React](https://react.dev/) - Documentação oficial
- [React Router](https://reactrouter.com/) - Roteamento
- [Tailwind CSS](https://tailwindcss.com/docs) - Framework CSS
- [Vite](https://vitejs.dev/) - Build tool

### Backend
- [FastAPI](https://fastapi.tiangolo.com/) - Framework web
- [SQLAlchemy](https://docs.sqlalchemy.org/) - ORM
- [PyMuPDF](https://pymupdf.readthedocs.io/) - Processamento de PDFs
- [spaCy](https://spacy.io/) - Processamento de linguagem natural
- [Google Gemini](https://ai.google.dev/) - API de IA

### APIs de IA
- [OpenAI API](https://platform.openai.com/docs)
- [Google Gemini](https://ai.google.dev/)
- [Hugging Face](https://huggingface.co/)

## 🔍 Dicas de Desenvolvimento

### Estrutura de Componentes (Frontend)
```jsx
// Componente funcional básico
function MeuComponente({ prop1, prop2 }) {
  const [estado, setEstado] = useState(initialValue)
  
  const handleClick = () => {
    // Lógica do componente
  }
  
  return (
    <div className="container">
      <h1>{prop1}</h1>
      <button onClick={handleClick}>{prop2}</button>
    </div>
  )
}
```

### Estrutura de API (Backend)
```python
# Endpoint básico
@app.post("/cv/upload")
async def upload_cv(file: UploadFile):
    # Validação do arquivo
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Apenas PDFs são aceitos")
    
    # Processamento do arquivo
    content = await file.read()
    # ... lógica de processamento
    
    return {"message": "CV enviado com sucesso"}
```

### Estilização com Tailwind
```jsx
// Classes utilitárias
<div className="
  bg-white 
  rounded-lg 
  shadow-md 
  p-6 
  hover:shadow-lg 
  transition-shadow
">
  Conteúdo do card
</div>
```

## 🐛 Solução de Problemas

### Frontend
```bash
# Erro: "Module not found"
rm -rf node_modules package-lock.json
npm install

# Erro: "Port already in use"
npx kill-port 3000

# Erro: "Tailwind classes not working"
npx tailwindcss init
```

### Backend
```bash
# Erro: "Module not found"
pip install -r requirements.txt

# Erro: "Port already in use"
npx kill-port 8000

# Erro: "Environment not activated"
source .venv/bin/activate  # Linux/macOS
.\.venv\Scripts\activate   # Windows
```

## 📝 Padrões de Código

### Nomenclatura
- **Componentes**: PascalCase (`MeuComponente.jsx`)
- **Arquivos**: camelCase (`meuArquivo.js`)
- **Pastas**: kebab-case (`minha-pasta/`)
- **Python**: snake_case (`minha_funcao`)

### Estrutura de Commits
```bash
feat: nova funcionalidade
fix: correção de bug
docs: documentação
style: formatação
refactor: refatoração
test: testes
chore: tarefas de manutenção
```

## 🎉 Entrega Final

### Checklist de Entrega
- [ ] Frontend funcional com todas as funcionalidades
- [ ] Backend com API completa e funcional
- [ ] Integração frontend-backend funcionando
- [ ] Sistema de IA implementado e funcionando
- [ ] Código limpo e bem documentado
- [ ] Responsividade mobile
- [ ] Testes básicos
- [ ] README atualizado
- [ ] Deploy funcionando

### Como Entregar
1. Faça commit de todas as mudanças
2. Crie um Pull Request para a branch main
3. Inclua screenshots da aplicação funcionando
4. Documente as decisões técnicas tomadas
5. Inclua instruções de setup e execução

## 🤝 Suporte

- **Issues**: [GitHub Issues](https://github.com/miguelamaral254/otimizador_de_cv_ia/issues)
- **Discussions**: [GitHub Discussions](https://github.com/miguelamaral254/otimizador_de_cv_ia/discussions)
- **Wiki**: [Documentação do Projeto](https://github.com/miguelamaral254/otimizador_de_cv_ia/wiki)

## 🔗 Links Úteis

- **Repositório Principal**: https://github.com/miguelamaral254/otimizador_de_cv_ia
- **Backend README**: [../backend/README.md](../backend/README.md)
- **Documentação FastAPI**: https://fastapi.tiangolo.com/
- **Documentação React**: https://react.dev/

---

**Boa sorte no desafio! 🚀**

*Lembre-se: O objetivo é aprender e crescer como desenvolvedor full-stack. 
Não tenha medo de experimentar e errar!*

ADICÃO

Sistema de Autenticação - Otimizador de CV IA
🚀 Instalação e Configuração
Pré-requisitos

Node.js 18+
npm ou yarn
Backend FastAPI rodando

1. Instalar dependências
bashcd frontend
npm install
# ou
yarn install
2. Configurar variáveis de ambiente
Crie um arquivo .env na raiz do frontend:
envREACT_APP_API_URL=http://localhost:8000
REACT_APP_ENVIRONMENT=development
3. Configurar Tailwind CSS
Crie o arquivo tailwind.config.js:
javascript/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8'
        }
      }
    },
  },
  plugins: [],
}
Crie o arquivo postcss.config.js:
javascriptexport default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
4. CSS Global (src/index.css)
css@tailwind base;
@tailwind components;
@tailwind utilities;

/* Customizações globais */
@layer base {
  html {
    scroll-behavior: smooth;
  }
  
  body {
    font-family: 'Inter', system-ui, sans-serif;
  }
}

@layer components {
  .btn-primary {
    @apply bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors;
  }
}
5. Executar o projeto
bashnpm run dev
# ou
yarn dev
📁 Estrutura de Arquivos
frontend/src/
├── components/
│   ├── auth/
│   │   ├── LoginForm.jsx
│   │   ├── RegisterForm.jsx
│   │   ├── ForgotPasswordForm.jsx
│   │   ├── AuthLayout.jsx
│   │   └── index.js
│   └── common/
│       ├── Input.jsx
│       ├── Button.jsx
│       ├── ProtectedRoute.jsx
│       ├── PublicRoute.jsx
│       ├── ErrorBoundary.jsx
│       └── index.js
├── context/
│   └── AuthContext.jsx
├── hooks/
│   ├── useForm.js
│   ├── useValidation.js
│   └── index.js
├── pages/
│   └── auth/
│       ├── LoginPage.jsx
│       ├── RegisterPage.jsx
│       ├── ForgotPasswordPage.jsx
│       └── index.js
├── utils/
│   ├── api.js
│   ├── validators.js
│   ├── auth.js
│   ├── storage.js
│   ├── format.js
│   └── index.js
├── App.jsx
├── main.jsx
└── index.css
🔧 Funcionalidades Implementadas
✅ Componentes de Autenticação

 LoginForm: Formulário de login com validação
 RegisterForm: Cadastro com indicador de força da senha
 ForgotPasswordForm: Recuperação de senha com timer
 AuthLayout: Layout responsivo para páginas de auth

✅ Componentes Reutilizáveis

 Input: Campo de entrada com validação e ícones
 Button: Botão com variants e estados de loading
 ProtectedRoute: Proteção de rotas autenticadas
 PublicRoute: Ro
