
const formContainer = document.getElementById('form-container');
const userInput = document.getElementById('input');
const predictAgeBtn = document.getElementById('predictAge');
const predictGenderBtn = document.getElementById('predictGender');
const ageResult = document.getElementById('ageResult');
const genderResult = document.getElementById('genderResult');
const survey = document.getElementById('survey');
const loader = document.getElementById('loader');
const rightImg = document.getElementById('rightImg');
const wrongImg = document.getElementById('wrongImg');
const reloadPage = document.getElementById('reload');

survey.style.display= 'none';

let age = [];
let gender = [];

reloadPage.addEventListener('click', () => {
    location.reload();
});

complete();

function loading() {
    loader.hidden = false;
}

function complete() {
    loader.hidden = true;
}

function displayAge() {

    if (userInput.value === '') {

        checkIfInputIsEmpty();

    }else {
        ageResult.textContent = `You are ${age.age} years old`;
        showButtons();
    }

    userInput.value = '';

}

function displayGender() {

    if (userInput.value === '') { 

        checkIfInputIsEmpty();
    } else {

        genderResult.textContent = `You are a ${gender.gender} with a probability of ${gender.probability}`;
        showButtons();
    }

    userInput.value = '';
    
}

function checkIfInputIsEmpty() {
    const div = document.createElement('div');
    div.className = `alert alert-danger`;
    div.style.marginTop = '5%';
    div.appendChild(document.createTextNode('Please enter your first name'));

    const container = document.querySelector('.container');

    container.insertBefore(div, formContainer);

    setTimeout(() => document.querySelector('.alert').remove(), 3000);

}

function showButtons() {

    var rightBtn = document.createElement('button');
    rightBtn.className = 'btn btn-success survey-button-space';
    rightBtn.appendChild(document.createTextNode('Yes'));

    var wrongBtn = document.createElement('button');
    wrongBtn.className = 'btn btn-danger survey-button-space';
    wrongBtn.appendChild(document.createTextNode('No'));

    survey.style.display= 'block';

    formContainer.appendChild(rightBtn);
    formContainer.appendChild(wrongBtn);

    rightBtn.addEventListener('click', function(e) {
        e.preventDefault();
        rightImg.hidden = false;
        wrongImg.hidden = true;
        rightBtn.hidden = true;
        wrongBtn.hidden = true;
        survey.style.display= 'none';
        setTimeout(() => rightImg.remove(), 4000);
    });

    wrongBtn.addEventListener('click', function(e) {
        e.preventDefault();
        rightImg.hidden = true;
        wrongImg.hidden = false;
        rightBtn.hidden = true;
        wrongBtn.hidden = true;
        survey.style.display= 'none';
        setTimeout(() => wrongImg.remove(), 4000);

    });

}

async function PredictAge(e) {
    e.preventDefault();
    loading();
    const apiUrl = `https://api.agify.io?name=${userInput.value}&country_id=NG`
    try {
        const res = await fetch(apiUrl);
        age = await res.json();
        displayAge();
        complete();
    } catch (err) {
        console.log("Uh oh. Something went wrong" + err);
    }
}

async function PredictGender(e) {
    e.preventDefault();
    loading();
    const apiUrl = `https://api.genderize.io?name=${userInput.value}&country_id=NG`
    try {
        const res = await fetch(apiUrl);
        gender = await res.json();
        displayGender();
        complete();
    } catch (err) {
        console.log("Uh oh. Something went wrong" + err);
    }
}

predictAgeBtn.addEventListener('click', PredictAge);
predictGenderBtn.addEventListener('click', PredictGender);