/*==================================================================
  [ Validate ]*/
var input = $('.validate-input .input100');

$('.validate-form').on('submit', function () {
    var check = true;

    for (var i = 0; i < input.length; i++) {
        if (validate(input[i]) == false) {
            showValidate(input[i]);
            check = false;
        }
    }
    if (check) {
        sendContact()
    }
    return false;
});


$('.validate-form .input100').each(function () {
    $(this).focus(function () {
        hideValidate(this);
    });
});

function validate(input) {
    if ($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
        if ($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
            return false;
        }
    }
    else {
        if ($(input).val().trim() == '') {
            return false;
        }
    }
}

function showValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).addClass('alert-validate');
}

function hideValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).removeClass('alert-validate');
}

function sendContact() {
    const name = document.getElementById('nameField').value
    const lastName = document.getElementById('lastNameField').value
    const proyName = document.getElementById('proyNameField').value
    const email = document.getElementById('emailField').value
    const msg = document.getElementById('msgField').value

    let params = "{\"name\":\"" + name + "\", " +
        "\"lastName\":\"" + lastName + "\", " +
        "\"proyName\":\"" + proyName + "\", " +
        "\"email\":\"" + email + "\", " +
        "\"msg\":\"" + msg + "\"}";
    const http = new XMLHttpRequest()
    http.open('POST', 'api/web/contacto')
    http.setRequestHeader('Accept', '*/*')
    http.setRequestHeader('Content-type', 'application/json')
    http.send(params) // Make sure to stringify
    http.onload = function () {
        document.getElementById('id02').style.display = 'block'
        setTimeout(function () {
            console.log("Listo tras 3 segundo.");
            document.getElementById('id02').style.display = 'none'
        }, 3000);
        document.getElementById('nameField').value = "";
        document.getElementById('lastNameField').value = "";
        document.getElementById('proyNameField').value = "";
        document.getElementById('emailField').value = "";
        document.getElementById('msgField').value = "";
    }
}
