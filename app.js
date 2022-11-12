window.currenciesBackup = [];

function filterCurrencies(searchValue) {
    var res = [];
    for(var currency of currenciesBackup){
        var currencyName = currency.txt.toLowerCase();
        var currencyCode = currency.cc.toLowerCase();
        if (currencyName.indexOf(searchValue) >= 0 || currencyCode.indexOf(searchValue) >= 0){
            res.push(currency);    
        }
    }
    renderCurrencies(res);
}

function renderCurrencies(currencies) {
    var htmlStr = '';
    if(!currencies.length) {
        htmlStr = `<tr>
            <td colspan="3" class="text-center">No such currency found</td>
        </tr>`;
        document.getElementById('currencies').innerHTML = htmlStr;  
        return;  
    }
    

    for(var currency of currencies) {
        htmlStr += `<tr>
            <td class="text-center font-weight-bold">${currency.txt}</td>
            <td class="text-center text-danger">${currency.rate}</td>
            <td class="text-center font-weight-bold">${currency.cc}</td>
        </tr>`;
    }   
    document.getElementById('currencies').innerHTML = htmlStr;
    
    var trs = document.getElementsByTagName("tr") 
        for(var item = 0; item < trs.length; item++) {
        var tr = trs[item];
        tr.onmouseenter = function(e) {
        e.currentTarget.classList.add("bg-success");
        }

        tr.onmouseleave = function(e) {
        e.currentTarget.classList.remove("bg-success")
        }
    }
}

fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=20221110&json').then(res => res.json()).then(function(data) {
    window.currenciesBackup = data
    renderCurrencies(data);
});

var search = document.getElementById("search");
console.log(search);

search.onkeyup = function(e) {
    var searchValue = e.currentTarget.value;
    filterCurrencies(searchValue.trim().toLowerCase());
}
