// Estrutura de usuários (em produção, use um banco de dados)
let usuarios = [
    {
        id: 1,
        nome: 'Administrador',
        email: 'admin@admin.com',
        telefone: '(11) 99999-9999',
        senha: 'admin123',
        permissoes: {
            pdv: true,
            estoque: true,
            admin: true
        }
    }
];

// Função para mostrar a página de administração
function mostrarAdminPage() {
    document.getElementById('pdvPage').classList.add('d-none');
    document.getElementById('estoquePage').classList.add('d-none');
    document.getElementById('adminPage').classList.remove('d-none');
    atualizarListaUsuarios();
}

// Função para verificar permissões do usuário atual
function verificarPermissoes() {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (!usuario || !usuario.permissoes.admin) {
        window.location.href = 'index.html';
        return false;
    }
    return true;
}

// Função para adicionar novo usuário
function adicionarUsuario(event) {
    event.preventDefault();
    
    const novoUsuario = {
        id: usuarios.length + 1,
        nome: document.getElementById('nomeUsuario').value,
        email: document.getElementById('emailUsuario').value,
        telefone: document.getElementById('telefoneUsuario').value,
        senha: document.getElementById('senhaUsuario').value,
        permissoes: {
            pdv: document.getElementById('permissaoPDV').checked,
            estoque: document.getElementById('permissaoEstoque').checked,
            admin: document.getElementById('permissaoAdmin').checked
        }
    };
    
    // Verificar se email já existe
    if (usuarios.some(u => u.email === novoUsuario.email)) {
        alert('Este e-mail já está cadastrado!');
        return;
    }
    
    usuarios.push(novoUsuario);
    atualizarListaUsuarios();
    event.target.reset();
    alert('Usuário cadastrado com sucesso!');
}

// Função para atualizar lista de usuários
function atualizarListaUsuarios() {
    const tbody = document.getElementById('listaUsuarios');
    tbody.innerHTML = '';
    
    usuarios.forEach(usuario => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${usuario.nome}</td>
            <td>${usuario.email}</td>
            <td>${usuario.telefone}</td>
            <td>
                ${usuario.permissoes.pdv ? '<span class="badge bg-success">PDV</span>' : ''}
                ${usuario.permissoes.estoque ? '<span class="badge bg-info">Estoque</span>' : ''}
                ${usuario.permissoes.admin ? '<span class="badge bg-danger">Admin</span>' : ''}
            </td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editarUsuario(${usuario.id})">
                    Editar
                </button>
                <button class="btn btn-danger btn-sm" onclick="excluirUsuario(${usuario.id})">
                    Excluir
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Função para editar usuário
function editarUsuario(id) {
    const usuario = usuarios.find(u => u.id === id);
    if (!usuario) return;
    
    const novoNome = prompt('Novo nome:', usuario.nome);
    if (!novoNome) return;
    
    const novoEmail = prompt('Novo e-mail:', usuario.email);
    if (!novoEmail) return;
    
    const novoTelefone = prompt('Novo telefone:', usuario.telefone);
    if (!novoTelefone) return;
    
    usuario.nome = novoNome;
    usuario.email = novoEmail;
    usuario.telefone = novoTelefone;
    
    atualizarListaUsuarios();
}

// Função para excluir usuário
function excluirUsuario(id) {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
        usuarios = usuarios.filter(u => u.id !== id);
        atualizarListaUsuarios();
    }
}

// Event Listeners
document.getElementById('novoUsuarioForm').addEventListener('submit', adicionarUsuario);

// Inicializar gráficos
function inicializarGraficos() {
    // Gráfico de Vendas
    const ctxVendas = document.getElementById('vendasChart').getContext('2d');
    new Chart(ctxVendas, {
        type: 'line',
        data: {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
            datasets: [{
                label: 'Vendas',
                data: [0, 0, 0, 0, 0, 0],
                borderColor: '#ff6b00',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            }
        }
    });

    // Gráfico de Produtos
    const ctxProdutos = document.getElementById('produtosChart').getContext('2d');
    new Chart(ctxProdutos, {
        type: 'bar',
        data: {
            labels: ['Produto 1', 'Produto 2', 'Produto 3', 'Produto 4', 'Produto 5'],
            datasets: [{
                label: 'Vendas',
                data: [0, 0, 0, 0, 0],
                backgroundColor: '#ff6b00'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            }
        }
    });
}

// Atualizar estatísticas
function atualizarEstatisticas() {
    // Aqui você implementaria a lógica para buscar dados reais
    const estatisticas = {
        totalVendas: 0,
        produtosBaixa: 0,
        usuariosAtivos: 0,
        impostosArrecadados: 0
    };

    // Atualizar cards
    document.querySelector('.card-title:contains("Total de Vendas")').nextElementSibling.textContent = 
        `R$ ${estatisticas.totalVendas.toFixed(2)}`;
    document.querySelector('.card-title:contains("Produtos em Baixa")').nextElementSibling.textContent = 
        estatisticas.produtosBaixa;
    document.querySelector('.card-title:contains("Usuários Ativos")').nextElementSibling.textContent = 
        estatisticas.usuariosAtivos;
    document.querySelector('.card-title:contains("Impostos Arrecadados")').nextElementSibling.textContent = 
        `R$ ${estatisticas.impostosArrecadados.toFixed(2)}`;
}

// Navegação entre seções
function navegarParaSecao(secao) {
    // Remover classe active de todos os links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });

    // Adicionar classe active ao link clicado
    const linkAtivo = document.querySelector(`[data-section="${secao}"]`);
    if (linkAtivo) {
        linkAtivo.classList.add('active');
    }

    // Aqui você implementaria a lógica para mostrar o conteúdo da seção
    console.log(`Navegando para seção: ${secao}`);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    if (!verificarPermissoes()) return;

    inicializarGraficos();
    atualizarEstatisticas();

    // Navegação
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const secao = e.target.closest('.nav-link').dataset.section;
            navegarParaSecao(secao);
        });
    });

    // Logout
    document.getElementById('logoutBtn').addEventListener('click', () => {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        window.location.href = 'index.html';
    });
});

// Exportar funções necessárias
window.verificarPermissoes = verificarPermissoes;
window.atualizarEstatisticas = atualizarEstatisticas; 