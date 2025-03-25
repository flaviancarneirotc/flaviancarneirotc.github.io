// Função para navegar entre as páginas
function navegarParaPagina(pagina) {
    // Verificar permissões
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    
    if (pagina === 'estoque' && !usuario.permissoes.includes('estoque')) {
        alert('Você não tem permissão para acessar o Controle de Estoque!');
        return;
    }
    
    if (pagina === 'pdv' && !usuario.permissoes.includes('pdv')) {
        alert('Você não tem permissão para acessar o PDV!');
        return;
    }
    
    if (pagina === 'control' && !usuario.permissoes.includes('admin')) {
        alert('Você não tem permissão para acessar o Controle!');
        return;
    }

    // Se a página for 'control' ou 'admin', redirecionar para o arquivo HTML correspondente
    if (pagina === 'control' || pagina === 'admin') {
        window.location.href = `${pagina}.html`;
        return;
    }

    // Para páginas internas (pdv e estoque), manipular a visibilidade
    const pdvPage = document.getElementById('pdvPage');
    const estoquePage = document.getElementById('estoquePage');
    const adminPage = document.getElementById('adminPage');

    if (pdvPage) pdvPage.classList.add('d-none');
    if (estoquePage) estoquePage.classList.add('d-none');
    if (adminPage) adminPage.classList.add('d-none');

    // Mostrar a página selecionada
    if (pagina === 'pdv' && pdvPage) {
        pdvPage.classList.remove('d-none');
    } else if (pagina === 'estoque' && estoquePage) {
        estoquePage.classList.remove('d-none');
    } else if (pagina === 'admin' && adminPage) {
        adminPage.classList.remove('d-none');
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Navegação
    document.querySelectorAll('.nav-link[data-page]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pagina = e.target.closest('.nav-link').dataset.page;
            navegarParaPagina(pagina);
        });
    });
}); 