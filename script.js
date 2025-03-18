const currenciesUrl = 'https://currency-converter-pro1.p.rapidapi.com/currencies';
const currenciesOptions = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': '1ac826fb06msh529a35fa6cee1eep165f24jsna483c91d476a',
        'x-rapidapi-host': 'currency-converter-pro1.p.rapidapi.com'
    }
};

let select1 = document.querySelector('.currency1');
let select2 = document.querySelector('.currency2');
let result = document.querySelector('.result');


fetch(currenciesUrl, currenciesOptions)
    .then(response => response.json())
    .then(data => {
        for (let key in data.result) {
            let newOption1 = document.createElement('option');
            let newOption2 = document.createElement('option');

            newOption1.textContent = key;
            newOption1.value = key;
            select1.appendChild(newOption1);

            newOption2.textContent = key;
            newOption2.value = key;
            select2.appendChild(newOption2);
        }
    })
    .catch(error => console.error('Error loading currencies:', error));

function showResult() {
    let input = document.querySelector('input');
    let amount = input.value.trim();

    if (!amount || isNaN(amount)) {
        result.textContent = 'Enter a valid amount!';
        return;
    }

    let fromCurrency = select1.value;
    let toCurrency = select2.value;

    if (!fromCurrency || !toCurrency) {
        result.textContent = 'Select both currencies!';
        return;
    }

    const url = `https://currency-converter-pro1.p.rapidapi.com/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '1ac826fb06msh529a35fa6cee1eep165f24jsna483c91d476a',
            'x-rapidapi-host': 'currency-converter-pro1.p.rapidapi.com'
        }
    };

    fetch(url, options)
        .then(response => response.json())
        .then(data => {
            if (data.result) {
                result.textContent = `Converted Amount: ${Math.round(data.result)} ${toCurrency}`;
            } else {
                result.textContent = 'Conversion failed!';
            }
        })
        .catch(error => {
            console.error('Error fetching conversion:', error);
            result.textContent = 'Error converting currency!';
        });
}
