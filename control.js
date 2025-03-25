// Verificar permissões do usuário
function verificarPermissoes() {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (!usuario || !usuario.permissoes.includes('admin')) {
        window.location.href = 'index.html';
        return;
    }
}

// Inicializar gráficos
function inicializarGraficos() {
    // Gráfico de Vendas por Período
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

    // Gráfico de Produtos Mais Vendidos
    const ctxProdutos = document.getElementById('produtosChart').getContext('2d');
    new Chart(ctxProdutos, {
        type: 'bar',
        data: {
            labels: ['Produto 1', 'Produto 2', 'Produto 3', 'Produto 4', 'Produto 5'],
            datasets: [{
                label: 'Quantidade Vendida',
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
    // Aqui você implementará a lógica para buscar dados reais do seu backend
    const estatisticas = {
        vendasHoje: 0,
        vendasMes: 0,
        ticketMedio: 0,
        totalVendas: 0
    };

    // Atualizar cards com as estatísticas
    document.querySelector('.card-title:contains("Vendas Hoje")').nextElementSibling.textContent = 
        `R$ ${estatisticas.vendasHoje.toFixed(2)}`;
    document.querySelector('.card-title:contains("Vendas do Mês")').nextElementSibling.textContent = 
        `R$ ${estatisticas.vendasMes.toFixed(2)}`;
    document.querySelector('.card-title:contains("Ticket Médio")').nextElementSibling.textContent = 
        `R$ ${estatisticas.ticketMedio.toFixed(2)}`;
    document.querySelector('.card-title:contains("Total de Vendas")').nextElementSibling.textContent = 
        estatisticas.totalVendas;
}

// Navegar entre seções
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

    // Aqui você implementará a lógica para mostrar/esconder as seções
    console.log(`Navegando para seção: ${secao}`);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    verificarPermissoes();
    inicializarGraficos();
    atualizarEstatisticas();

    // Adicionar listeners para navegação
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const secao = e.target.closest('.nav-link').dataset.section;
            navegarParaSecao(secao);
        });
    });

    // Listener para o botão de logout
    document.getElementById('logoutBtn').addEventListener('click', () => {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        window.location.href = 'index.html';
    });
}); 