
function buscarLogs() {

    const http = new XMLHttpRequest()
    http.open('GET', '/audit/')
    http.setRequestHeader('Accept', '*/*')
    http.setRequestHeader('Content-type', 'application/json')
    http.send()
    http.onload = function () {
        let listaLogs = JSON.parse(http.responseText);
        // Do whatever with response
        let listaP = "";
        for (const log of listaLogs) {
            listaP += "<p> " + log.type + "  -  Fecha:" + log.dateTime + "</p>"
        }
        setTimeout(() => {
            let doc = document.getElementById('sysEjecuciones');
            doc.innerHTML = listaP;
        }, 50)

    }
}


buscarLogs()