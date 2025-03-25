// Simulação de banco de dados de usuários
const usuarios = [
    {
        email: 'admin@admin.com',
        senha: 'admin123',
        nome: 'Administrador',
        permissoes: {
            pdv: true,
            estoque: true,
            admin: true
        }
    }
];

// Função para verificar se o usuário está logado
function verificarLogin() {
    const token = localStorage.getItem('token');
    if (token) {
        mostrarMainPage();
        verificarPermissoes();
        atualizarInfoUsuario();
    } else {
        mostrarLoginPage();
    }
}

// Função para mostrar a página principal
function mostrarMainPage() {
    document.getElementById('loginPage').classList.add('d-none');
    document.getElementById('mainPage').classList.remove('d-none');
    mostrarPDVPage(); // Mostra a página PDV por padrão
}

// Função para mostrar a página de login
function mostrarLoginPage() {
    document.getElementById('loginPage').classList.remove('d-none');
    document.getElementById('mainPage').classList.add('d-none');
}

// Função para fazer login
function fazerLogin(email, senha) {
    const usuario = usuarios.find(u => u.email === email && u.senha === senha);
    if (usuario) {
        localStorage.setItem('token', 'token-simulado');
        localStorage.setItem('usuario', email);
        mostrarMainPage();
        verificarPermissoes();
        atualizarInfoUsuario();
        return true;
    }
    return false;
}

// Função para atualizar informações do usuário na barra de navegação
function atualizarInfoUsuario() {
    const email = localStorage.getItem('usuario');
    const usuario = usuarios.find(u => u.email === email);
    if (usuario) {
        document.getElementById('usuarioInfo').textContent = usuario.email;
    }
}

// Função para fazer logout
function fazerLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    mostrarLoginPage();
}

// Event Listeners
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('username').value;
    const senha = document.getElementById('password').value;

    if (fazerLogin(email, senha)) {
        alert('Login realizado com sucesso!');
    } else {
        alert('E-mail ou senha inválidos!');
    }
});

document.getElementById('logoutBtn').addEventListener('click', function(e) {
    e.preventDefault();
    fazerLogout();
});

// Verificar login ao carregar a página
verificarLogin(); 