
function actividades(actId) {
    var token = localStorage.getItem('token');
    var userId = localStorage.getItem('userId');

    var i = 0;
    var length = 6;
    const http = new XMLHttpRequest();
    (function loop(i, length) {
        if (i >= length) {
            return;
        }

        http.open('GET', 'https://api-agenda.nacionalclubsocial.uy/activitytime/?id=' + actId + '&dow=' + i + '&userId=' + userId)
        http.setRequestHeader('Authorization', 'Bearer ' + token)
        http.setRequestHeader('Accept', '*/*')
        http.setRequestHeader('Content-type', 'application/json')
        http.onreadystatechange = function () {
            if (http.readyState === XMLHttpRequest.DONE && http.status === 200) {
                var actividades = JSON.parse(http.responseText).description;
                for (const act of actividades) {
                    divPanel = document.getElementById('panel' + actId).innerHTML +=
                        " <div style='display: flex; width: 100%;border-bottom: solid;padding-top: 10px;'> " +
                        " <div  style='width: 70%'> " +
                        "<p>Dia " + act.dayoftheweek + "  -  " + act.name + "  Inicio:" + act.starttime + "  Fin:" + act.endtime + "</p>" +
                        "</div>" +
                        " <div  style='width: 30%; text-align: right'> " +
                        "<button style='width: fit-content;margin:0px;padding:5px' onclick='reservarActividad(" + act.id + "," + act.dayoftheweek + ")'>Reservar</button>" +
                        "</div>" +
                        "</div>";
                }

                loop(i + 1, length);
            }
        }
        http.send();
    })(0, length);

}


function reservarActividad(idAct, dow) {
    var token = localStorage.getItem('token');
    var userId = localStorage.getItem('userId');
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