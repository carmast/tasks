

// /**
//  * @openapi
//  * components:
//  *  schemas:
//  *     UserInput:
//  *       type:object
//  *         required:
//  *            - username
//  *            - password
//  *          properties:
//  *            username:
//  *              type: string
//  *               default: test
//  *             password: 
//  *               type: string
//  *               default: test
//  */
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