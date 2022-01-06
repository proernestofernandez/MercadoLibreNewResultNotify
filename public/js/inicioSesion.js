
// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function iniciarSesion() {
    let params = JSON.stringify({
        user: document.getElementById('nameInput').value,
        password: document.getElementById('passwordInput').value,
    });

    const http = new XMLHttpRequest()
    http.open('POST', '/users/contacto')
    // http.setRequestHeader('Authorization', 'Bearer 288abceb-0a1a-4095-9f79-89d57d4c0ba9')
    http.setRequestHeader('Accept', '*/*')
    http.setRequestHeader('Content-type', 'application/json')
    http.setRequestHeader('Content-type', 'text/plain')
    http.send(JSON.stringify(params)) // Make sure to stringify
    http.send(params) // Make sure to stringify
}

function procesarInicioSesion() {
    var userName = localStorage.getItem('userName');
    if (userName && userName != 'undefined') {
        document.getElementById('msgNombreLogueado').innerHTML = userName;
        document.getElementById('msgNombreLogueado').style.display = "Block";
        document.getElementById('botonLogin').style.display = "None";
        document.getElementById('actTitulo').style.display = "Block";
    }
}

procesarInicioSesion();
