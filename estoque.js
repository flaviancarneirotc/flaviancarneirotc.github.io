// Estrutura de produtos (em produção, use um banco de dados)
let produtos = [];

// Função para calcular preço de venda
function calcularPrecoVenda() {
    const precoCusto = parseFloat(document.getElementById('precoCusto').value) || 0;
    const porcentagemLucro = parseFloat(document.getElementById('porcentagemLucro').value) || 0;
    const precoVenda = precoCusto * (1 + (porcentagemLucro / 100));
    document.getElementById('precoVenda').value = precoVenda.toFixed(2);
}

// Função para salvar produto
function salvarProduto() {
    const produto = {
        id: Date.now(), // ID único baseado no timestamp
        codigoBarras: document.getElementById('codigoBarras').value,
        nome: document.getElementById('nomeProduto').value,
        marca: document.getElementById('marcaProduto').value,
        modelo: document.getElementById('modeloProduto').value,
        composicao: document.getElementById('composicaoProduto').value,
        precoCusto: parseFloat(document.getElementById('precoCusto').value),
        porcentagemLucro: parseFloat(document.getElementById('porcentagemLucro').value),
        precoVenda: parseFloat(document.getElementById('precoVenda').value),
        quantidade: parseInt(document.getElementById('quantidadeEstoque').value),
        quantidadeMinima: parseInt(document.getElementById('quantidadeMinima').value)
    };

    // Verificar se já existe produto com mesmo código de barras
    if (produtos.some(p => p.codigoBarras === produto.codigoBarras)) {
        alert('Já existe um produto com este código de barras!');
        return;
    }

    produtos.push(produto);
    atualizarListaProdutos();
    bootstrap.Modal.getInstance(document.getElementById('produtoModal')).hide();
    document.getElementById('produtoForm').reset();
    alert('Produto cadastrado com sucesso!');
}

// Função para atualizar lista de produtos
function atualizarListaProdutos() {
    const tbody = document.getElementById('estoqueItens');
    tbody.innerHTML = '';
    
    produtos.forEach(produto => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${produto.codigoBarras}</td>
            <td>${produto.nome}</td>
            <td>${produto.marca}</td>
            <td>${produto.modelo}</td>
            <td>
                <span class="${produto.quantidade <= produto.quantidadeMinima ? 'text-danger' : ''}">
                    ${produto.quantidade}
                </span>
            </td>
            <td>R$ ${produto.precoCusto.toFixed(2)}</td>
            <td>${produto.porcentagemLucro}%</td>
            <td>R$ ${produto.precoVenda.toFixed(2)}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editarProduto(${produto.id})">
                    <i class="bi bi-pencil"></i>
                </button>
                <button class="btn btn-danger btn-sm" onclick="excluirProduto(${produto.id})">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Função para editar produto
function editarProduto(id) {
    const produto = produtos.find(p => p.id === id);
    if (!produto) return;

    // Preencher formulário com dados do produto
    document.getElementById('codigoBarras').value = produto.codigoBarras;
    document.getElementById('nomeProduto').value = produto.nome;
    document.getElementById('marcaProduto').value = produto.marca;
    document.getElementById('modeloProduto').value = produto.modelo;
    document.getElementById('composicaoProduto').value = produto.composicao;
    document.getElementById('precoCusto').value = produto.precoCusto;
    document.getElementById('porcentagemLucro').value = produto.porcentagemLucro;
    document.getElementById('quantidadeEstoque').value = produto.quantidade;
    document.getElementById('quantidadeMinima').value = produto.quantidadeMinima;
    calcularPrecoVenda();

    // Abrir modal
    const modal = new bootstrap.Modal(document.getElementById('produtoModal'));
    modal.show();

    // Remover produto antigo
    produtos = produtos.filter(p => p.id !== id);
}

// Função para excluir produto
function excluirProduto(id) {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
        produtos = produtos.filter(p => p.id !== id);
        atualizarListaProdutos();
    }
}

// Função para buscar produto
function buscarProduto() {
    const termo = document.getElementById('buscaProduto').value.toLowerCase();
    const produtosFiltrados = produtos.filter(p => 
        p.codigoBarras.toLowerCase().includes(termo) ||
        p.nome.toLowerCase().includes(termo) ||
        p.marca.toLowerCase().includes(termo) ||
        p.modelo.toLowerCase().includes(termo)
    );
    
    const tbody = document.getElementById('estoqueItens');
    tbody.innerHTML = '';
    
    produtosFiltrados.forEach(produto => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${produto.codigoBarras}</td>
            <td>${produto.nome}</td>
            <td>${produto.marca}</td>
            <td>${produto.modelo}</td>
            <td>
                <span class="${produto.quantidade <= produto.quantidadeMinima ? 'text-danger' : ''}">
                    ${produto.quantidade}
                </span>
            </td>
            <td>R$ ${produto.precoCusto.toFixed(2)}</td>
            <td>${produto.porcentagemLucro}%</td>
            <td>R$ ${produto.precoVenda.toFixed(2)}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editarProduto(${produto.id})">
                    <i class="bi bi-pencil"></i>
                </button>
                <button class="btn btn-danger btn-sm" onclick="excluirProduto(${produto.id})">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Função para exportar estoque
function exportarEstoque() {
    const csv = [
        ['Código', 'Nome', 'Marca', 'Modelo', 'Composição', 'Preço Custo', 'Lucro (%)', 'Preço Venda', 'Quantidade', 'Quantidade Mínima'],
        ...produtos.map(p => [
            p.codigoBarras,
            p.nome,
            p.marca,
            p.modelo,
            p.composicao,
            p.precoCusto,
            p.porcentagemLucro,
            p.precoVenda,
            p.quantidade,
            p.quantidadeMinima
        ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'estoque.csv';
    a.click();
    window.URL.revokeObjectURL(url);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Calcular preço de venda quando preço de custo ou porcentagem de lucro mudar
    document.getElementById('precoCusto').addEventListener('input', calcularPrecoVenda);
    document.getElementById('porcentagemLucro').addEventListener('input', calcularPrecoVenda);

    // Atualizar lista de produtos
    atualizarListaProdutos();
}); 