// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function iniciarSesion() {
    modal = document.getElementById('id01')

    let params = JSON.stringify({
        username: document.getElementById('nameInput').value,
        password: document.getElementById('passwordInput').value,
    });

    const http = new XMLHttpRequest()
    http.open('POST', 'api/auth/login')
    // http.setRequestHeader('Authorization', 'Bearer 288abceb-0a1a-4095-9f79-89d57d4c0ba9')
    http.setRequestHeader('Accept', '*/*')
    http.setRequestHeader('Content-type', 'application/json')
    http.send(params) // Make sure to stringify
    http.onload = function () {
        if (http.status === 200) {
            let token = JSON.parse(http.responseText).token;
            let nickname = JSON.parse(http.responseText).nickname;
            let email = JSON.parse(http.responseText).email;
            let firstname = JSON.parse(http.responseText).firstName;
            let lastName = JSON.parse(http.responseText).lastName;

            localStorage.setItem('token', token);
            localStorage.setItem('nickname', nickname);
            localStorage.setItem('email', email);
            localStorage.setItem('name', firstname);
            localStorage.setItem('lastName', lastName);
            document.getElementById('validCredential').style.display = "None";
            modal.style.display = "none";
            procesarInicioSesion();
            // buscarCategorias();
            // buscarMisReservas()
        } else {
            document.getElementById('validCredential').style.display = "Block";
            document.getElementById('validCredentialLastname').style.display = "None";
        }

    }
}

function logOut() {
    var token = localStorage.getItem('token');
    var email = localStorage.getItem('email');

    let params = JSON.stringify({
        email: email,
    });

    const http = new XMLHttpRequest()
    http.open('POST', 'api/auth/logout')
    http.setRequestHeader('Authorization', 'Bearer ' + token)
    http.setRequestHeader('Accept', '*/*')
    http.setRequestHeader('Content-type', 'application/json')
    http.send(params) // Make sure to stringify
    http.onload = function () {
        console.log("DEBERIA DESLOGUEAR")
        if (http.status === 200) {
            console.log("DIO 2020")
            localStorage.removeItem('token');
            localStorage.removeItem('nickname');
            localStorage.removeItem('email');
            localStorage.removeItem('name');
            localStorage.removeItem('lastName');
            procesarInicioSesion();
        } else {
            console.log("No pudo desloguear")
        }

    }
}

function procesarInicioSesion() {
    var nickname = localStorage.getItem('nickname');
    if (nickname && nickname != 'undefined') {
        if (document.getElementById('msgNombreLogueado')) {
            document.getElementById('msgNombreLogueado').innerHTML = nickname;
            document.getElementById('msgNombreLogueado').style.display = "Block";
        }
        if (document.getElementById('botonLogin')) {
            document.getElementById('botonLogin').style.display = "None";
        }
        if (document.getElementById('botonLogout')) {
            document.getElementById('botonLogout').style.display = "Flex";
        }
    } else {
        if (document.getElementById('msgNombreLogueado')) {
            document.getElementById('msgNombreLogueado').style.display = "None";
        }
        if (document.getElementById('botonLogin')) {
            document.getElementById('botonLogin').style.display = "Block";
        }
        if (document.getElementById('botonLogout')) {
            document.getElementById('botonLogout').style.display = "None";
        }

    }
    window.locationf = "/index.html";
}

procesarInicioSesion();