//Crea una agenda de contactos
//Node.js was used to achieve interaction with the console.
//Then you should copy the exercise, save it with a .js extension, and run it in a terminal using the command node plus the name of the file.

const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

let contacts = [];

function showMenu() {
    console.log("--- List of Contacts ---");
    console.log("1. Insert Contact");
    console.log("2. Buscar Contact");
    console.log("3. Update Contact");
    console.log("4. Delate Contact");
    console.log("5. Exit");
    rl.question("Chose and Option: ", (option) => {
        switch (option) {
            case '1':
                insertContact();
                break;
            case '2':
                searchContact();
                break;
            case '3':
                updateContact();
                break;
            case '4':
                delateContact();
                break;
            case '5':
                console.log("living the program...");
                rl.close();
                break;
            default:
                console.log("No Valid Option. Try again.");
                showMenu();
        }
    });
}


function askQuestion(query) {
    return new Promise(resolve => {
        rl.question(query, resolve);
    });
}

async function insertContact() {
    try {
        const name = await askQuestion("Type the contact name: ");

        const telefone = await askQuestion("Type the telephone number (11 digits): ");
        if (!/^\d{11}$/.test(telefone)) {
            console.log("Invalid telephone number. Must be a numeric value and have 11 digits.");
            return showMenu();
        }

        const email = await askQuestion("Type the email of the contact: ");
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            console.log("Invalid email. Must be a valid email address.");
            return showMenu();
        }

        contacts.push({ name, telefone, email });
        console.log(`Contact ${name} added.`);

    } catch (error) {
        console.error("An error occurred:", error.message);
    } finally {
        showMenu();
    }
}

function searchContact() {
    rl.question("Ingrese el name del contact a search: ", (name) => {
        const contact = contacts.find(c => c.name.toLowerCase() === name.toLowerCase());
        if (contact) {
            console.log(`Contact found: ${contact.name}, Telefone: ${contact.telefone}, Email: ${contact.email}`);
        } else {
            console.log("Contact not found.");
        }
        showMenu();
    });
}

async function updateContact() {
    try {
        const name = await askQuestion("Type the name of the contact to update: ");
        const contact = contacts.find(c => c.name.toLowerCase() === name.toLowerCase());

        if (contact) {
            const telefone = await askQuestion("Type the new number of telephone (11 digits): ");
            if (/^\d{11}$/.test(telefone)) {
                contact.telefone = telefone;
                console.log(`Contact ${name} updated with new number.`);
            } else {
                console.log("Invalid telephone number. Must be a numeric value and have 11 digits.");
            }

            const email = await askQuestion("Type the email of the contact: ");
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (emailRegex.test(email)) {
                contact.email = email;
                console.log(`Contact ${name} updated with new email.`);
            } else {
                console.log("Invalid email. Must be a valid email address.");
            }
        } else {
            console.log("Contact not found.");
        }
    } catch (error) {
        console.error("An error occurred:", error.message);
    } finally {
        showMenu();
    }
}


function delateContact() {
    rl.question("Type the name of the contact to delate: ", (name) => {
        const index = contacts.findIndex(c => c.name.toLowerCase() === name.toLowerCase());
        if (index !== -1) {
            contacts.splice(index, 1);
            console.log(`Contact ${nombre} delated.`);
        } else {
            console.log("Contact not found.");
        }
        showMenu();
    });
}

showMenu();


/*  /^(?=.{1,254}$)(?=.{1,64}@)([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+)(?<!\.)(?<!\.\.)@[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/i  */

//Regular Expression Breakdown

//  (?=.{1,254}$): Ensures that the total length of the email does not exceed 254 characters.

//  (?=.{1,64}@): Ensures that the local part (before the @) does not exceed 64 characters.

//  (?<!\.) and (?<!\.\.): Ensures that the local part does not end with a period and does not contain consecutive periods.

//  [a-zA-Z0-9]: Allows uppercase letters in the local part and in the domain.

//  (?:\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+: Ensures that the domain has at least one period and that each part of the domain follows the length rules.

