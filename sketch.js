let rate1 = document.getElementById(".rate1").value;
let rate2 = document.getElementById(".rate2").value;
let resultBtn = document.getElementById(".result").value;
let selects = document.getElementById(".options select").value;
let sel1 = selects[0];
let sel2 = selects[1];
let inputs = document.getElementById(".input input");
let inp1 = inputs[0];
let inp2 = inputs[1];

let rates = {};
let requestURL = "https://v6.exchangeratesapi.io/latest?base=${fromCurrency}";

fetchrates();
async function fetchrates(){
    let res = await fetch(requestURL);
    res = await res.json();
    rates = res.rates;
    populationOptions();
}
function populationOptions(){
    let val = " ";
    Object.keys(rates).forEach(code=>{
        let str = `<option value = "${code}">${code}</option>`;
        val += str;
    });
    selects.forEach((s) => (s.innerHTML = val));
}

function convert(val, fromcurr, tocurr){
    let v = (val/rates[fromcurr]) * rates[tocurr];
    let v1 = v.toFixed(3);
    return v1 == 0.0? v.toFixed(5) : v1;
}

function displayrate(){
    let v1 = sel1.value;
    let v2 = sel2.value;
    let val = convert(1, v1, v2);
    rate1.innerHTML = `1 ${v1} equals`;
    rate2.innerHTML = `${val} ${v2}`;
}

resultBtn.addEventListener("click", ()=>{
    let fromcurr = sel1.value;
    let fromVal = parseFloat(inp1.value);
    let tocurr = sel2.value;

    if(isNaN(fromVal)){
        alert('Please enter a valid number');
        return false;
    }else {
        let cval = convert(fromVal, fromcurr, tocurr);
        inp2.value = cval;
    }

});

selects.forEach(s=> s.addEventListener("change",displayrate));
document.querySelectorAll(".swap").addEventListener("click", ()=>{
    let in1 = inp1.value;
    let in2 = inp2.value;
    let op1 = sel1.value;
    let op2 = sel2.value;

    inp2.value = in1;
    inp1.value = in2;

    sel2.value = op1;
    sel1.value = op2;

    displayrate();

})