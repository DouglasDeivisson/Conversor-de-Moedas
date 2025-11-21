

const convertButton = document.querySelector(".Converter")
const currencySelect1 = document.querySelector(".selectValues1")
const currencySelect2 = document.querySelector(".selectValues2")
const valor = document.querySelector(".valores") // valor 1 
const alternar = document.querySelector("#alternar") // botao de alternar

alternar.addEventListener("click", inverterSelecionados)

function inverterSelecionados(idOrigem, idDestino) {

    const valorTemp = currencySelect1.value;
    currencySelect1.value = currencySelect2.value;
    currencySelect2.value = valorTemp;
    changeCurrency1()
    changeCurrency()
}

let taxas = {};

async function buscarTaxas(base = "USD") {
    try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${base}`);
        const dados = await response.json();

        taxas = dados.rates;


        try {
            const responseBTC = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
            );
            const dadosBTC = await responseBTC.json();
            const taxaBTCemUSD = dadosBTC.bitcoin.usd;
            taxas.BTC = 1 / taxaBTCemUSD;

            console.log("✅ Taxa BTC adicionada (via CoinGecko):", taxas.BTC);
        }
        catch (errorBTC) {
            console.warn("Erro ao buscar taxa BTC:", errorBTC);

        }

        console.log("✅ Taxas atualizadas com base em:", base, taxas);
    }
    catch (erroBTC) {

        console.error("❌ Erro ao buscar taxas:", erro);
    }
}

buscarTaxas("USD")




convertButton.addEventListener("click", converterValue)


function converterValue() {

    const valueinputRaw = document.querySelector(".inputValues").value;
    const valueinput = parseFloat(valueinputRaw.trim());

    const currencyValueToConvert = document.querySelector(".valores-to-convert");

    const valorConvertido = document.querySelector(".Converted");

    if (isNaN(valueinput)) {
        valorConvertido.innerHTML = "Digite um valor válido";
        return;
    }

    const from = currencySelect1.value.toUpperCase();
    const to = currencySelect2.value.toUpperCase();

    if (!taxas || typeof taxas !== "object" || !taxas[from] || !taxas[to]) {
        valorConvertido.innerHTML = "Carregando taxas...";

        return;
    }

    const valorConvertidoTotal = (valueinput / taxas[from]) * taxas[to];

    const formatos = {
        BRL: "pt-BR",
        USD: "en-US",
        EUR: "de-DE",
        GBP: "en-GB",
        JPY: "ja-JP",
        BTC: "en-US"
    };

    const formatadorOrigem = new Intl.NumberFormat(formatos[from] || "en-US", {
        style: "currency",
        currency: from
    });

    const formatadorDestino = new Intl.NumberFormat(formatos[to] || "en-US", {
        style: "currency",
        currency: to
    });

    currencyValueToConvert.innerHTML = formatadorOrigem.format(valueinput);
    valorConvertido.innerHTML = formatadorDestino.format(valorConvertidoTotal);
}

currencySelect2.addEventListener("change", changeCurrency)

function changeCurrency() {


    const currencyName2 = document.querySelector("#currency-name2")
    const currencyImg2 = document.querySelector("#currency-img2")

    if (currencySelect2.value == "USD") {
        currencyName2.innerHTML = "Dólar Americano";
        currencyImg2.src = "./assets/dollar.png";
    }

    if (currencySelect2.value == "EUR") {
        currencyName2.innerHTML = "Euro";
        currencyImg2.src = "./assets/euro.png";
    }

    if (currencySelect2.value == "GBP") {
        currencyName2.innerHTML = "Libra";
        currencyImg2.src = "./assets/libra.png";
    }

    if (currencySelect2.value == "JPY") {
        currencyName2.innerHTML = "Iene";
        currencyImg2.src = "./assets/iene.png";
    }

    if (currencySelect2.value == "BRL") {
        currencyName2.innerHTML = "Real Brasileiro";
        currencyImg2.src = "./assets/real.png";
    }
    if (currencySelect2.value == "BTC") {
        currencyName2.innerHTML = "Bitcoin";
        currencyImg2.src = "./assets/bitcoin.png";
    }

    console.log("Currency changed to:", currencySelect2.value);
    converterValue()
}

currencySelect1.addEventListener("change", changeCurrency1)

function changeCurrency1() {

    const currencyName1 = document.querySelector("#currency-name1")
    const currencyImg1 = document.querySelector("#currency-img1")
    const currencyValueToConvert = document.querySelector(".valores-to-convert");


    console.log("Origem selecionada", currencySelect1.value)

    if (currencySelect1.value == "USD") {
        currencyName1.innerHTML = "Dólar Americano";
        currencyImg1.src = "./assets/dollar.png";
        currencyValueToConvert.innerHTML = "$ 0.00";
    }

    if (currencySelect1.value == "BRL") {
        currencyName1.innerHTML = "Real Brasileiro";
        currencyImg1.src = "./assets/real.png";
        currencyValueToConvert.innerHTML = "R$ 0.00";
    }

    if (currencySelect1.value == "EUR") {
        currencyName1.innerHTML = "Euro";
        currencyImg1.src = "./assets/euro.png";
        currencyValueToConvert.innerHTML = "€ 0,00";
    }

    if (currencySelect1.value == "GBP") {
        currencyName1.innerHTML = "Libra";
        currencyImg1.src = "./assets/libra.png";
        currencyValueToConvert.innerHTML = "£ 0.00";
    }

    if (currencySelect1.value == "JPY") {
        currencyName1.innerHTML = "Iene";
        currencyImg1.src = "./assets/iene.png";
        currencyValueToConvert.innerHTML = "¥ 0";
    }

    if (currencySelect1.value == "BTC") {
        currencyName1.innerHTML = "Bitcoin";
        currencyImg1.src = "./assets/bitcoin.png";
        currencyValueToConvert.innerHTML = "₿ 0.00000000";
    }
    converterValue()
}