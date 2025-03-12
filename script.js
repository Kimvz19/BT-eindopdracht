console.log("hi");

let achternaamInput = document.querySelector('input[name="achtern"]');

achternaamInput.addEventListener('input', function() {
    if (achternaamInput.value.length > 0) {
        achternaamInput.value = achternaamInput.value.charAt(0).toUpperCase() + achternaamInput.value.slice(1);
    }
});
 


//opslaan form

console.log("Script gestart");

// Verkrijg alle input-elementen van het formulier
const inputs = document.getElementsByTagName("input");
const form = document.querySelector("form");
let savedData = {}; // Object om formuliergegevens op te slaan

// EventListener voor wanneer de DOM volledig geladen is
document.addEventListener("DOMContentLoaded", () => {
    if (window.localStorage) {
        console.log("localStorage is beschikbaar.");

        // Controleer of form en data-form-topic aanwezig zijn
        if (!form || !form.dataset.formTopic) {
            console.log("Formulier of data-form-topic niet gevonden.");
            return;
        }

        // Verkrijg de form-topic uit data-attribute
        let formTopic = form.dataset.formTopic;
        console.log(`Form-topic: ${formTopic}`);

        // Verkrijg opgeslagen gegevens uit localStorage
        let getFormTopic = localStorage.getItem(formTopic);
        console.log("Opgeslagen gegevens:", getFormTopic);

        if (getFormTopic) {
            savedData = JSON.parse(getFormTopic); // Zet de opgeslagen gegevens om naar object
            fillFormFields(savedData); // Vul de formulier velden in met de opgeslagen gegevens
        }
    } else {
        console.log("localStorage is niet beschikbaar.");
    }
});

// Functie om formulier velden in te vullen
function fillFormFields(data) {
    if (!data) 
    return; 
    //als de data niet beschikbaar is

    for (const key in data) {
        const value = data[key];
        const field = document.querySelector(`[name=${key}]`);
        if (field) {
            console.log(`Vullen veld: ${key} met waarde: ${value}`);
            switch (field.type) {
                case "radio":
                    const radioButton = document.querySelector(`input[name='${key}'][value='${value}']`);
                    if (radioButton) radioButton.checked = true;
                    break;
                case "checkbox":
                    field.checked = value === "on";
                    break;
                case "file":
                    break;
                default:
                    field.value = value;
            }
        } else {
            console.log(`Veld ${key} niet gevonden in het formulier.`);
        }
    }
}

// Functie om formuliergegevens op te slaan in localStorage
function saveFormDataToLocalStorage(e) {
    const formData = new FormData(form);
    formData.forEach((value, key) => {
        console.log(`Opslaan: ${key} met waarde: ${value}`);  // Log de gegevens
        savedData[key] = value;  // Sla de data op in het object
    });

    // Controleer de inhoud van savedData
    console.log("Gegevens opgeslagen in savedData:", savedData);

    // Sla de gegevens op in localStorage
    const formTopic = form.dataset.formTopic;
    if (formTopic) {
        window.localStorage.setItem(formTopic, JSON.stringify(savedData));
        console.log("Gegevens opgeslagen in localStorage.");
    } else {
        console.log("Geen form-topic gevonden om op te slaan.");
    }
}

// Voeg eventlisteners toe voor het opslaan van gegevens
Array.prototype.forEach.call(inputs, function(input) {
    input.addEventListener("blur", function(e) {
        console.log(`Blur event op: ${input.name}`);
        saveFormDataToLocalStorage(e);
    });
});

// Voeg een eventlistener toe voor het versturen van het formulier
if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();  // Voorkom standaard formulier versturen
        console.log("Formulier verzonden, opslaan van gegevens...");
        saveFormDataToLocalStorage(e);
    });
}
