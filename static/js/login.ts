
<<<<<<< HEAD:static/js/login.ts
=======


>>>>>>> 0cc6825a018ee593b6967be440e2d550eba90e6b:static/js/login.js
async function loginRequest() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Create the request data
    let resData = {
        username: username,
        password: password
    };

    const data = await fetch("/login", {
        method: "POST",
        body: JSON.stringify(resData),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const result = await data.json();
    if (result?.username) {
        localStorage.setItem("user", JSON.stringify(result));
        window.location.replace("/");
    }
}

const formId = document.getElementById("form-id");
formId.addEventListener("submit", function (event) {
    event.preventDefault();
});