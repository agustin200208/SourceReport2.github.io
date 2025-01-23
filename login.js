const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginButton = document.querySelector(".btn");

// *** CONFIGURACIÓn DE LA API ***
const ipPublicaServidor = '52.14.85.215';
const puertoServidor = 8080;
const urlBase = `http://${ipPublicaServidor}:${puertoServidor}`;
const urlLogin = `${urlBase}/login`;

loginButton.addEventListener("click", async (event) => {
    event.preventDefault();

    const enteredUsername = emailInput.value.trim();
    const enteredPassword = passwordInput.value.trim();

    try {
        const response = await fetch(urlLogin, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: enteredUsername,
                password: enteredPassword
            })
        });

        if (!response.ok) {
          try {
            const errorData = await response.json();//Intenta parsear la respuesta JSON del error
            throw new Error(`${response.status} ${response.statusText}: ${errorData.message || 'Error en la solicitud'}`);
          } catch (parseError) {
            throw new Error(`${response.status} ${response.statusText}: Error al parsear la respuesta del servidor`);
          }
        }

        const data = await response.json();

        sessionStorage.setItem("loggedIn", "true");
        if (data.token) {
            sessionStorage.setItem("token", data.token);
        }
        window.location.href = "filter.html";

    } catch (error) {
        alert("Error al intentar iniciar sesión: " + error.message);
        console.error("Error en la solicitud de login:", error);
    }
});
