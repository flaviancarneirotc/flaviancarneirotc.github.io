// Taxas de câmbio (exemplo - em produção, use uma API de câmbio)
const taxasCambio = {
    USD: 4.95,  // 1 USD = 4.95 BRL
    EUR: 5.35,  // 1 EUR = 5.35 BRL
    GBP: 6.25,  // 1 GBP = 6.25 BRL
    JPY: 0.033, // 1 JPY = 0.033 BRL
    CNY: 0.68   // 1 CNY = 0.68 BRL
};

// Função para converter valor de BRL para outra moeda
function converterMoeda(valorBRL, moedaDestino) {
    const taxa = taxasCambio[moedaDestino];
    if (!taxa) return null;
    
    return valorBRL / taxa;
}

// Função para formatar valor monetário
function formatarMoeda(valor, moeda) {
    const formatos = {
        USD: 'US$',
        EUR: '€',
        GBP: '£',
        JPY: '¥',
        CNY: '¥'
    };
    
    const simbolo = formatos[moeda] || moeda;
    return `${simbolo} ${valor.toFixed(2)}`;
}

// Função para atualizar o valor convertido
function atualizarValorConvertido(valorBRL) {
    const moedaDestino = document.getElementById('moedaDestino').value;
    const valorConvertido = converterMoeda(valorBRL, moedaDestino);
    
    if (valorConvertido !== null) {
        document.getElementById('totalConvertido').textContent = 
            `Total Convertido: ${formatarMoeda(valorConvertido, moedaDestino)}`;
    }
}

// Event Listener para mudança de moeda
document.getElementById('moedaDestino').addEventListener('change', function() {
    const totalVenda = parseFloat(document.getElementById('totalVenda').textContent.replace('R$ ', ''));
    atualizarValorConvertido(totalVenda);
}); 