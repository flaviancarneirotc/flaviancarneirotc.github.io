// Carrinho de compras
let carrinho = [];

// Função para mostrar a página PDV
function mostrarPDVPage() {
    document.getElementById('pdvPage').classList.remove('d-none');
    document.getElementById('estoquePage').classList.add('d-none');
    atualizarCarrinho();
}

// Função para adicionar produto ao carrinho
function adicionarAoCarrinho(produto) {
    const itemExistente = carrinho.find(item => item.codigo === produto.codigo);
    
    if (itemExistente) {
        itemExistente.quantidade += 1;
        itemExistente.total = itemExistente.quantidade * itemExistente.preco;
    } else {
        carrinho.push({
            codigo: produto.codigo,
            nome: produto.nome,
            quantidade: 1,
            preco: produto.preco,
            total: produto.preco
        });
    }
    
    atualizarCarrinho();
}

// Função para remover item do carrinho
function removerDoCarrinho(codigo) {
    carrinho = carrinho.filter(item => item.codigo !== codigo);
    atualizarCarrinho();
}

// Função para atualizar a exibição do carrinho
function atualizarCarrinho() {
    const tbody = document.getElementById('carrinhoItens');
    tbody.innerHTML = '';
    
    let totalVenda = 0;
    
    carrinho.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.codigo}</td>
            <td>${item.nome}</td>
            <td>${item.quantidade}</td>
            <td>R$ ${item.preco.toFixed(2)}</td>
            <td>R$ ${item.total.toFixed(2)}</td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="removerDoCarrinho('${item.codigo}')">
                    Remover
                </button>
            </td>
        `;
        tbody.appendChild(tr);
        totalVenda += item.total;
    });
    
    document.getElementById('totalVenda').textContent = `R$ ${totalVenda.toFixed(2)}`;
    atualizarValorConvertido(totalVenda);
}

// Função para finalizar venda
function finalizarVenda() {
    if (carrinho.length === 0) {
        alert('Adicione produtos ao carrinho antes de finalizar a venda!');
        return;
    }
    
    // Aqui você implementaria a lógica para salvar a venda no banco de dados
    alert('Venda finalizada com sucesso!');
    carrinho = [];
    atualizarCarrinho();
}

// Event Listeners
document.getElementById('produtoCodigo').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        const codigo = this.value;
        // Aqui você implementaria a busca do produto no banco de dados
        // Por enquanto, vamos simular com dados fixos
        const produto = {
            codigo: codigo,
            nome: 'Produto ' + codigo,
            preco: 10.00
        };
        adicionarAoCarrinho(produto);
        this.value = '';
    }
});

document.getElementById('finalizarVenda').addEventListener('click', finalizarVenda);

// Exportar funções necessárias
window.mostrarPDVPage = mostrarPDVPage;
window.removerDoCarrinho = removerDoCarrinho; 