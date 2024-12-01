document.addEventListener("DOMContentLoaded", () => {
    const produtos = {
        "cafe-organico": { nome: "Café Orgânico", preco: 29.90 },
        "cafe-unico": { nome: "Café de Origem Única", preco: 34.90 },
        "assinatura": { nome: "Assinatura de Café", preco: 99.90 },
        "barista": { nome: "Curso de Barista", preco: 199.90 }
    };

    const tabela = document.getElementById("dashboard-data");
    const ctx = document.getElementById("clique-chart").getContext("2d");
    const toggleButton = document.getElementById("toggle-chart");
    const previsaoFaturamento = document.getElementById("previsao-faturamento");

    if (!tabela || !ctx || !toggleButton || !previsaoFaturamento) {
        console.error("Tabela, contexto do gráfico ou botão não encontrados.");
        return;
    }

    const dados = [];
    const labels = [];
    let totalCompras = 0;
    let totalFaturamento = 0; // Para calcular o faturamento total

    // Preenchendo a tabela e coletando dados para o gráfico
    Object.keys(produtos).forEach(produto => {
        const compras = parseInt(localStorage.getItem(produto), 10) || 0;
        totalCompras += compras;

        labels.push(produtos[produto].nome);
        dados.push(compras);

        const faturamentoProduto = compras * produtos[produto].preco;
        totalFaturamento += faturamentoProduto;

        const linha = document.createElement("tr");
        linha.innerHTML = `
            <td>${produtos[produto].nome}</td>
            <td>${compras}</td> <!-- Total de Compras -->
            <td>R$ ${produtos[produto].preco.toFixed(2)}</td> <!-- Exibe o valor unitário -->
            <td>R$ ${faturamentoProduto.toFixed(2)}</td> <!-- Faturamento -->
        `;
        tabela.appendChild(linha);
    });

    // Atualiza a previsão de faturamento total
    previsaoFaturamento.textContent = `Previsão de Faturamento: R$ ${totalFaturamento.toFixed(2)}`;

    // Função para criar um gráfico
    let chartType = "pie";
    let chartInstance = createChart(chartType, labels, dados, totalCompras);

    toggleButton.addEventListener("click", () => {
        // Alterna o tipo de gráfico
        chartType = chartType === "pie" ? "bar" : "pie";

        // Atualiza o texto do botão
        toggleButton.textContent =
            chartType === "pie" ? "Alterar para Gráfico de Barras" : "Alterar para Gráfico de Pizza";

        // Destroi o gráfico atual e cria um novo
        chartInstance.destroy();
        chartInstance = createChart(chartType, labels, dados, totalCompras);
    });

    // Função para criar um gráfico de acordo com o tipo
    function createChart(type, labels, data, total) {
        return new Chart(ctx, {
            type: type,
            data: {
                labels: labels,
                datasets: [{
                    label: "Total de Compras", // Alterado para "Compras"
                    data: data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true, // Mostra a legenda para ambos os gráficos
                        position: "top"
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                const value = context.raw;
                                const percentage = ((value / total) * 100).toFixed(2);
                                return `${context.label}: ${value} compras (${percentage}%)`; // Alterado para "Compras"
                            }
                        }
                    }
                },
                scales: type === "bar" ? {
                    x: {
                        title: {
                            display: true,
                            text: "Produtos"
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: "Total de Compras" // Alterado para "Compras"
                        },
                        beginAtZero: true
                    }
                } : {}
            }
        });
    }
});
