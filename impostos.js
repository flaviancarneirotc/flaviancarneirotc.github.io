// Configuração padrão de impostos
let impostos = {
    icms: 18,
    pis: 1.65,
    cofins: 7.6,
    iss: 5
};

// Função para calcular impostos
function calcularImpostos(valor) {
    const icms = valor * (impostos.icms / 100);
    const pis = valor * (impostos.pis / 100);
    const cofins = valor * (impostos.cofins / 100);
    const iss = valor * (impostos.iss / 100);
    
    return {
        icms,
        pis,
        cofins,
        iss,
        total: icms + pis + cofins + iss
    };
}

// Função para formatar valor monetário
function formatarMoeda(valor) {
    return `R$ ${valor.toFixed(2)}`;
}

// Função para atualizar estatísticas
function atualizarEstatisticas() {
    // Aqui você implementaria a lógica para buscar dados reais
    document.getElementById('totalVendas').textContent = formatarMoeda(0);
    document.getElementById('totalImpostos').textContent = formatarMoeda(0);
    document.getElementById('produtosBaixa').textContent = '0';
    document.getElementById('usuariosAtivos').textContent = usuarios.length;
}

// Função para salvar configurações de impostos
function salvarImpostos(event) {
    event.preventDefault();
    
    impostos = {
        icms: parseFloat(document.getElementById('icms').value),
        pis: parseFloat(document.getElementById('pis').value),
        cofins: parseFloat(document.getElementById('cofins').value),
        iss: parseFloat(document.getElementById('iss').value)
    };
    
    alert('Impostos atualizados com sucesso!');
}

// Função para gerar relatório de vendas
function gerarRelatorioVendas() {
    const dataInicio = document.getElementById('dataInicio').value;
    const dataFim = document.getElementById('dataFim').value;
    
    if (!dataInicio || !dataFim) {
        alert('Selecione o período para gerar o relatório!');
        return;
    }
    
    // Aqui você implementaria a lógica para gerar o relatório
    alert('Relatório de vendas gerado com sucesso!');
}

// Função para gerar relatório de impostos
function gerarRelatorioImpostos() {
    const dataInicio = document.getElementById('dataInicio').value;
    const dataFim = document.getElementById('dataFim').value;
    
    if (!dataInicio || !dataFim) {
        alert('Selecione o período para gerar o relatório!');
        return;
    }
    
    // Aqui você implementaria a lógica para gerar o relatório
    alert('Relatório de impostos gerado com sucesso!');
}

// Função para gerar relatório de estoque
function gerarRelatorioEstoque() {
    // Aqui você implementaria a lógica para gerar o relatório
    alert('Relatório de estoque gerado com sucesso!');
}

// Event Listeners
document.getElementById('impostosForm').addEventListener('submit', salvarImpostos);

// Exportar funções necessárias
window.calcularImpostos = calcularImpostos;
window.gerarRelatorioVendas = gerarRelatorioVendas;
window.gerarRelatorioImpostos = gerarRelatorioImpostos;
window.gerarRelatorioEstoque = gerarRelatorioEstoque; 