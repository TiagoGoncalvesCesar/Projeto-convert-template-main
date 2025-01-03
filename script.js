// Cotação do dia.
const USD = 6.18;
const EUR = 6.44;
const GBP = 7.73;
const BTC = 601.986;
// Obtendo os elementos do formulário.
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const currency = document.getElementById("currency");
const footer = document.querySelector("main footer");
const description = document.getElementById("description");
const result = document.getElementById("result");

// Manipulando o input amount para receber somente números.
amount.addEventListener("input", () => {
  const hasCharactersRegex = /\D+/g;
  amount.value = amount.value.replace(hasCharactersRegex, "");
});

// Capturando o evento de submit (enviar) do formulário.
form.onsubmit = (event) => {
  event.preventDefault();

  switch (currency.value) {
    case "USD":
      convertCurrency(amount.value, USD, "US$");
      break;
    case "EUR":
      convertCurrency(amount.value, EUR, "€");
      break;
    case "GBP":
      convertCurrency(amount.value, GBP, "£");
      break;
    case "BTC":
      convertCurrency(amount.value, BTC, "₿");
      break;
  }
};

//Função para converter a moeda.
function convertCurrency(amount, price, symbol) {
  try {
    // Exibindo a cotação da moeda selecionada.
    description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`;

    // Calcula o total.
    let total = amount * price;

    // Verifica se resultado não é um número.
    if (isNaN(total)) {
      return alert("Por favor, digite o valor corretamente para converter.");
    }

    // Formata o valor total.
    total = formatCurrencyBRL(total).replace("R$", "");

    // Calcula exibindo o resultado total.
    result.textContent = `Total: R$${total}`;

    // Aplica a classe que exibe o footer para mostrar o resultado.
    footer.classList.add("show-result");
  } catch (error) {
    // Remove a classe do footer removendo ele da tela.
    footer.classList.remove("show-result");

    console.log(error);
    alert("Não possível converter. Tente novamente mais tarde.");
  }
}

//Formatação para Real Brasileiro.
function formatCurrencyBRL(value) {
  // Converte pra número para utilizar o toLocaleString para formatar no padrão BRL. R$(00,00)
  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
