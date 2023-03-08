let myLoader = document.getElementById("loader");
let circleLogo = document.getElementById("circle-logo");

document.addEventListener("DOMContentLoaded", () => {
    myLoader.style.display = "none";
});

//Send Mail
let mailInput = document.getElementById("emailInput");
let nameInput = document.getElementById("nameInput");
let messageArea = document.getElementById("messsageInput");
let buttonSend = document.getElementById("btn-send");
let subject = "Atalay Sezen İletişim";
let formGroup = document.getElementById("form-contact");
let thanksDiv = document.getElementById("thanks-div");
let hideText = document.getElementById("form-done");
let errorMessage = document.getElementById("error-message");
let errorMail = document.getElementById("error-mail");

function validateName() {
    if (nameInput.value.length < 3) {
        errorMessage.classList.remove("none");
        nameInput.classList.add("red-border");
        nameInput.focus();
    } else {
        errorMessage.classList.add("none");
        nameInput.classList.add("green-border");
        return true;
    }
}

function checkEmail() {
    let filter =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!filter.test(mailInput.value)) {
        errorMail.textContent = "Lütfen Geçerli Bir E-Posta Adresi Giriniz";
        mailInput.classList.add("red-border");
        errorMail.classList.remove("none");
        mailInput.focus;
        return false;
    } else {
        mailInput.classList.add("green-border");
        errorMail.classList.add("none");
        return true;
    }
}

buttonSend.addEventListener("click", (e) => {
    e.preventDefault();
    checkEmail();
    validateName();
    let subject = "Atalay Sezen İletişim";
    if (validateName() == true && checkEmail() == true) {
        fetch("https://atalaysezen.dev/mail1/mail", {
            method: "POST",
            body: JSON.stringify({
                nameSurname: nameInput.value,
                subject: subject,
                sender: mailInput.value,
                message: messageArea.value,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        }).then((response) => {
            if (response.status == 200) {
                buttonSend.innerHTML = "Thank You!";
                setTimeout(() => {
                    formGroup.style.display = "none";
                    hideText.classList.add("none");
                    thanksDiv.classList.remove("none");
                }, 500);
            } else {
                buttonSend.innerHTML = "Bir Hata Oluştu Lütfen Tekrar Dene";
            }
        }),
            (err) => console.log(err);
    }
});

//Check Internet Connection
let connectionWarn = document.getElementById("connectionWarn");
window.addEventListener('online', () => connectionWarn.style.display = "none");
window.addEventListener('offline', () => connectionWarn.style.display = "block");


console.log("%c Nothing Here :)", "background: #f25f4c; color: white; ");
