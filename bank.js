
//Since the API you sent me is currently down, (I hope it gets fixed soon) the code that has to do with making the api work is commented out so that we do 
//not run into errors and so that what is working will continue to work.

//I think if the API starts working again, we will be able to uncomment the commented code and it should work.
//Of course I cannot be confidant because I have not been able to test it for that very reason, however as I said I think it fits.


//Get values from html------------------------------------------------------------------------------------
const newUserInput=document.getElementById('sign-up');
const signInBtn=document.getElementById('sign-in');
const inputPage=document.getElementById('signed-in');
const mainPage=document.getElementById('signed-out');
const msgBox=document.getElementById('msgbox');
const main=document.getElementById('background');
const info=document.getElementById('info');
const editAccount=document.getElementById('makeChanges');

//changing values-------------------------------------------------------------------------------------
let passwordInpt = document.getElementById("password");
let usernameInpt = document.getElementById("username");
let bankAccount=document.getElementById('invest/withdraw');
let currencyType=document.getElementById('typeOfCurrency');
//utility variables
let signedIn=false;
let selected;

//user accounts
let accounts=[
    {
        username: 'fred',
        password: 'digeriedoo',
        investment:0
    },
    {
        username: 'john',
        password: 'gildstern',
        investment:0
    }
];

//new user accounts
class signUp{
    constructor(username, password, investment){
        this.username=username;
        this.password=password;
        this.investment=investment;
    }
}


//APIs----------------------------------------------------------------------------------------------
// function fetchAPI(amount, currency) {
//     //return array of existing currencies
//     findAvailableCurrency()
//     //check to see if currency exists.
//     for(i=0; i<=availableCurrency; i++){
//         if(availableCurrency[i].id===currency){
//             const axios = require("axios");



//             const options = {
//             method: 'GET',
//             url: 'https://currencyconverter.p.rapidapi.com/',
//             params: {from_amount: amount, from: currency, to: 'USD'},
//             headers: {
//                 'X-RapidAPI-Host': 'currencyconverter.p.rapidapi.com',
//                 'X-RapidAPI-Key': 'd5e0ac49e9msh284be9efeb67f6fp1fa6f6jsn8791da12d2df'
//             }
//             };
        
//             axios.request(options).then(function (response) {
//                 console.log(response.data);
//                 return convertedAmount=response.data;
//             }).catch(function (error) {
//                 console.error(error);
//             });
//         }
//     }
// }

// function findAvailableCurrency(){
//     const axios = require("axios");

//     const options = {
//     method: 'GET',
//     url: 'https://currencyconverter.p.rapidapi.com/availablecurrencies',
//     headers: {
//         'X-RapidAPI-Host': 'currencyconverter.p.rapidapi.com',
//         'X-RapidAPI-Key': 'd5e0ac49e9msh284be9efeb67f6fp1fa6f6jsn8791da12d2df'
//     }
//     };

//     axios.request(options).then(function (response) {
//         console.log(response.data);
//         const availableCurrency=response.data;
//         return availableCurrency;
//     }).catch(function (error) {
//         console.error(error);
//     });
// }




//main---------------------------------------------------------------------------------------------

//if you are signed in switch the page
function switchPage(signedIn){
    if(signedIn){
        main.classList='signed-in-main-background'
        inputPage.hidden=false;
        mainPage.hidden=true;
    }else{
        console.log('evaluate false.')
        mainPage.hidden=false;
        inputPage.hidden=true;
    }
}

//get new accounts added to local storage.
function newAccount(e){
    e.preventDefault();
    if(accounts){
        for(i=0; i<=accounts.length; i++) {
            if(passwordInpt.value!==accounts[i].password && usernameInpt.value!==accounts[i].username){
                //create new account and pass the information into local storage
                accounts.push(new signUp(usernameInpt.value, passwordInpt.value, investment=0));
                addToLocalStorage(accounts);
                //retrieve data.
                UpdateData()
                switchPage(signedIn=true);
                console.log(`new account has been created: ${accounts}`);
                return accounts, selected=accounts.length-1;
            }
        }
    }else{
        accounts=[];
        accounts.push(new signUp(usernameInpt.value, passwordInpt.value, investment=0));
        addToLocalStorage(accounts);
        //retrieve data.
        UpdateData()
        console.log(`new account has been created: ${accounts}`);
        switchPage(signedIn=true);
        return accounts;
    }
}

//sign in function
function signIn(e) {
    e.preventDefault();
    UpdateData()
    if(!accounts){
        alert('Create a new Account');
        return;
    }
    for(i=0; i<=accounts.length; i++){
        if(passwordInpt.value===accounts[i].password && usernameInpt.value===accounts[i].username){
            console.log("signed in");
            let storedValue=i;
            return switchPage(signedIn=true), selected=storedValue;
        }
    }
}

//adjust the amount of money in the account.
function manipulateAccount(e) {
    e.preventDefault();

    let evaluate1=isNaN(accounts[selected].investment);
    let evaluate2=isNaN(currencyType.value);
    if(!evaluate1 && evaluate2 && currencyType.value && bankAccount.value){
        let amount=accounts[selected].investment;
        let currency=currencyType.value;
        let utility=+bankAccount.value;
        accounts[selected].investment+=utility;
        info.textContent=`your account: $${accounts[selected].investment}`;
        console.log(`investment has experienced a change  ${accounts[selected].username} investment: ${accounts[selected].investment}`)
        info.classList='info2';
        addToLocalStorage(accounts);

        //This works strictly only when the API is there to verify available languages.

        //findAvailableCurrency();
        // availableCurrency.forEach((i=0) => {
        //     if(currencyType.value===availableCurrency[i]){
        //         fetchAPI(amount, currency);
        //         let utility=+/*convertedAmount*/ bankAccount.value;
        //         accounts[1].investment+=utility;
        //         info.textContent=`your account: $${accounts[1].investment}`;
        //         info.classList='info2';
        //         addToLocalStorage(accounts);
        //     }else{
        //         alert('please use a valid currency type' availableCurrency)
        //     }
        //     i++;
        // });
    }else{
        alert('enter a valid number or currency type.');
    }
}

function addToLocalStorage(accounts) {
    localStorage.setItem("accounts", JSON.stringify(accounts));
}

function UpdateData() {
    let retrievedData=localStorage.getItem("accounts");
    return accounts=JSON.parse(retrievedData);
}

//event listeners
editAccount.addEventListener('click', manipulateAccount);
 newUserInput.addEventListener('click', newAccount);
 signInBtn.addEventListener('click', signIn);

//on load
switchPage();
UpdateData();