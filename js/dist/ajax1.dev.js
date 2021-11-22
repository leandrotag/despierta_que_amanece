"use strict";

function validaForm() {
  if ($("#nombreApellido").val() == "") {
    alert("El campo Nombre y Apellido no puede estar vacío.");
    $("#nombreApellido").focus();
    return false;
  }

  if ($("#mail").val() == "") {
    alert("El campo Mail no puede estar vacío.");
    $("#mail").focus();
    return false;
  }

  if ($("#telefono").val() == "") {
    alert("El campo telefono no puede estar vacío.");
    $("#telefono").focus();
    return false;
  }

  return true;
}

if (validaForm()) {
  var enviarAjax = function enviarAjax() {
    $.ajax({
      type: 'POST',
      url: 'proccess.php',
      data: $('#formdata').serialize(),
      success: function success(respuesta) {
        if (respuesta == 'ok') {
          alert('enviado');
        } else {
          alert('error');
        }
      }
    });
  };
}