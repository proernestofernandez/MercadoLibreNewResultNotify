
function searchQueries() {
    var token = localStorage.getItem('token');
    var nickname = localStorage.getItem('nickname');

    const http = new XMLHttpRequest();

    http.open('GET', '/queries/' + "?creator_nickaname=" + nickname)
    // http.open('GET', '/queries/?id=' + actId + '&dow=' + i + '&userId=' + userId)
    http.setRequestHeader('Authorization', 'Bearer ' + token)
    http.setRequestHeader('Accept', '*/*')
    http.setRequestHeader('Content-type', 'application/json')
    http.onreadystatechange = function () {
        if (http.readyState === XMLHttpRequest.DONE && http.status === 200) {
            var consultas = JSON.parse(http.responseText);
            console.log("🚀 ~ file: consultas.js ~ line 17 ~ actividades ~ consultas", consultas)
            console.log("2163546")
            var queryStr = "";
            if (consultas instanceof Array) {
                for (const consul of consultas) {
                    console.log("ACAAAS")
                    queryStr = " <div style='display: flex; width: 100%;border-bottom: solid;padding-top: 10px;'> " +
                        consul.nombre + "<br>";
                    console.log(consul.nombre)
                    for (const param in consul.parameters) {
                        queryStr += consul.parameters[param] + "<br>";
                    }
                    queryStr += decodeURI(consul.query) + "<br>" +
                        "</div>";

                    document.getElementById('divConsultas').innerHTML += queryStr;
                }
            }
        }
    }
    http.send();

}


function addQuery(idAct, dow) {
    var token = localStorage.getItem('token');
    var nickname = localStorage.getItem('userId');
    var dowToday = new Date().getDay();
    var dowReservar = 0;
    if (dow - dowToday >= 0) {
        dowReservar = dow - dowToday;
    } else {
        dowReservar = 7 + (dow - dowToday);
    }
    let params = "{\"usr\":\"" + userId + "\",\"at\":\"" + idAct + "\",\"day\":\"" + dowReservar + "\",\"description\":\"\"}";
    const http = new XMLHttpRequest()
    http.open('POST', 'https://api-agenda.nacionalclubsocial.uy/reservation/')
    http.setRequestHeader('Authorization', 'Bearer ' + token)
    http.setRequestHeader('Accept', '*/*')
    http.setRequestHeader('Content-type', 'application/json')
    http.setRequestHeader('Content-type', 'text/plain')
    http.send(params) // Make sure to stringify
    http.onload = function () {
        console.log("RESERVO");
        alert("Se ha procesado la reserva correctamente");
        buscarMisReservas();
    }
}

searchQueries()