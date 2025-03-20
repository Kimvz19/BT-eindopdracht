// check - de console werkt! 💗
console.log("hi");
////////////////////////////////////////////////////

//variabel aanmaken
let achternaamInput = document.querySelector('input[name="achtern"]');

//function waarbij 1ste letter is hoofdletter ⭐️
achternaamInput.addEventListener('input', () => {
    achternaamInput.value = achternaamInput.value.charAt(0).toUpperCase() + achternaamInput.value.slice(1);
});

////////////////////////////////////////////////////

// Validatie svg veranderen
// bron voor code : https://chatgpt.com/share/67dbd282-13e4-8000-b9e5-3a59843031d3
// 50% geschreven door chat, 50% door mij
function veranderSVG(event) {
    // functie stopt als geen tekst is 
    if (event.target.type !== 'text') return;

    // checkt of de status icon er al is, anders wordt die toegevoegd
    let statusIcon = event.target.nextElementSibling;
    if (!statusIcon || statusIcon.tagName.toLowerCase() !== 'span') {
        statusIcon = document.createElement('span');
        event.target.parentNode.appendChild(statusIcon);
    }

    //de validatie die wordt toegevoegd als neiuwe statusicon
    // check voor user-valid en kruisje voor user-invalid
    statusIcon.textContent = event.target.validity.valid ? '✓' : '✘';
    statusIcon.style.color = event.target.validity.valid ? '#009a42' : '#db0029';
}

//variabele die alle inputs aanspreekt 
let invoervelden = document.querySelectorAll('input');
invoervelden.forEach(input => input.addEventListener('input', veranderSVG));

////////////////////////////////////////////////////

// radio buttons - display none & block
// checkt of de radio  button name & value is geselecteerd of niet 
// zo ja, wordt fieldset op display:block gezet, anders blijft het op display:none

// Radio button met value ja 
document.querySelector('input[name="partner"][value="ja"]').addEventListener('change', ({ target }) => {
    if (!target.checked) return;

    // laat rest van 1b zien
    document.querySelector('form > fieldset:nth-of-type(3)').style.display = 'none';  
    let fieldsetJa = document.querySelector('form > fieldset:nth-of-type(2) > fieldset:nth-of-type(4)');
    fieldsetJa.style.display = 'block';  
    fieldsetJa.scrollIntoView({ behavior: 'smooth' });
});

// Radio button met value nee 
document.querySelector('input[name="partner"][value="nee"]').addEventListener('change', ({ target }) => {
    if (!target.checked) return;

    // laat vraag 1c zien 
    document.querySelector('form > fieldset:nth-of-type(2) > fieldset:nth-of-type(4)').style.display = 'none';  
    const fieldset1c = document.querySelector('form > fieldset:nth-of-type(3)');
    fieldset1c.style.display = 'block';  
    fieldset1c.scrollIntoView({ behavior: 'smooth' });
});

// laat vraag 1D zien , 1e vraag 1c
document.querySelectorAll('input[name="kinderen"]').forEach(input => 
    input.addEventListener('change', ({ target }) => {
        document.querySelector('form > fieldset:nth-of-type(4)').style.display = 
            target.value === "nee" ? 'block' : 'none';
    })
);

// laat vraag 1D zien , 2e vraag 1c
document.querySelectorAll('input[name="kind-overleden"]').forEach(input => 
    input.addEventListener('change', ({ target }) => {
        document.querySelector('form > fieldset:nth-of-type(4)').style.display = 
            target.value === "nee" ? 'block' : 'none';
    })
);

// zorgt ervoor dat als de pagina wordt re-load dat ze gesloten zijn.
document.addEventListener('DOMContentLoaded', () => {
    ['form > fieldset:nth-of-type(3)', 'form > fieldset:nth-of-type(2) > fieldset:nth-of-type(4)', 'form > fieldset:nth-of-type(4)']
        .forEach(selector => document.querySelector(selector).style.display = 'none');
});




////////////////////////////////////////////////////

// Form local storage werkende maken!
//Bron voor local storage : Chris Donker ⭐️

function saveFormData() {
    console.log('test')
    // haalt alle inputs uit de form 
    const inputs = document.querySelectorAll('form fieldset label input');

    // maak object aan om formulierdata in op te slaan
    const formData = {};

    // loop door elk input type en sla waarde op 
    inputs.forEach(input => {
        // sla alleen checked radio's op 
        if (input.type === 'radio') {
            if (input.checked) {
                formData[input.name] = input.id;
            }
        } else {
            // Voor tekst inputs, sla de waarde op
            formData[input.name] = input.value;
            console.log(formData);

        }
    });

    // sla de form data op in local storage, string van json
    localStorage.setItem('formData', JSON.stringify(formData));
}

// Functie om de form data uit de local storage te halen
function loadFormData() {
    // haal de opgeslagen data uit de local storage
    const savedData = localStorage.getItem('formData');

    // geen data? stop de functie
    if (!savedData) return;

    // opgeslagen data pakken en in een nieuwe variabel zetten 
    const formData = JSON.parse(savedData);

    // haal de inputs uit het document
    const inputs = document.querySelectorAll('form fieldset label input');

    // ga elk input langs en vul in met de formdata
    inputs.forEach(input => {
        if (input.type === 'radio') {
            // vink aan als de naam overeenkomt uit formdata
            if (formData[input.name] === input.id) {
                input.checked = true;
            }
        } else if (input.name in formData) {
            // voor tekst, zet de opgeslagen data erin
            input.value = formData[input.name];
        }
    });
}

// event listeners toevoegen aan form inputs
function setupFormPersistence() {
    // haal alle inputs op 
    const inputs = document.querySelectorAll('form fieldset label input');

    // voeg een event listener voor wijzing aan elk input
    inputs.forEach(input => {
        input.addEventListener('input', saveFormData);
        
        if (input.type === 'radio') {
            input.addEventListener('change', saveFormData);
        }
    });

    // Laad de opgeslagen formulierdata op wanneer de pagina geladen is
    loadFormData();
}

//when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', setupFormPersistence);