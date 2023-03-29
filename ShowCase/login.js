var APIConnectionString = "https://localhost:7227/";

//Login user
const formRegister = document.querySelector(".login-container__form");
const email = document.querySelector(".login__email");
const password = document.querySelector(".login__password");

if(formRegister != null) {

    formRegister.addEventListener("submit", async (event) => {
        // Then we prevent the form from being sent by canceling the event
        event.preventDefault();

        let response = await fetch(`${APIConnectionString}LoginUser`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: email.value,
                password: password.value,
            })
        });

        let data = await response.json();
        document.cookie = `SessionToken=${data.sessionId}`;
        window.location.href = "http://localhost:63342/ShowCase/index.html";
    });
}