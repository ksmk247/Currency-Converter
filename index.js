function convertCurrency(){
    const amount = document.getElementById("amount").value;
    const fromCurrency = document.getElementById("fromCurrency").value;
    const toCurrency = document.getElementById("toCurrency").value;
    const resultField = document.getElementById("result").value;

    fetch(`https://v6.exchangeratesapi.io/latest?base=${fromCurrency}`)
    .then(response => response.json())
    .then((data) => {
        let rate = data.rates[toCurrency];
        const convertedAmount = (amount * exchangeRate).toFixed(2);
        resultField.textContent = `${amount} ${fromCurrency} = ${convertedAmount}`
        })
        .catch(error =>{
            resultField.textContent = "Error fetching exchange rates.";
        });
}