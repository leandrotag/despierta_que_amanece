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
} // $(document).ready( function() { 
//     $("#emailLnk").click( function() { 


if (validaForm()) {
  //     $.post("send.html",$("#formdata").serialize(),function(res){
  //                         $("#formulario").fadeOut("slow");   
  //                         if(res == 1){
  //                             $("#enviado").delay(500).fadeIn("slow");      
  //                         } else {
  //                             $("#noenviado").delay(500).fadeIn("slow");  
  //                         }
  //                     });
  //                 }
  //             });    
  //         });
  $('#formdata').submit(function (ev) {
    $.ajax({
      type: $('POST').attr('method'),
      url: $('#formdata').attr('action'),
      data: $('#nombreApellido,#mail,#telefono').serialize(),
      //success: function (data) { alert('Datos enviados !!!'); 
      success: function success(data, textStatus, xhr) {
        console.log("data");
        console.log("textStatus");
        console.log("xhr");
      },
      error: function error(xhr, textStatus, _error) {
        console.log("xhr");
        console.log("textStatus");
        console.log("error");
      }
    }); //});

    ev.preventDefault();
  });
} // function enviar (){
//     let nombreApellido = document.querySelector('#nombreApellido').textContent;
//     let mail = document.querySelector('#mail').textContent;
//     let telefono = document.querySelector('#telefono').textContent;
//     let mensaje = document.querySelector('#mensaje').textContent
//     $.ajax({
//         url:'c',
//         type:'POST',
//         data: {nombreApellido,mail,telefono,mensaje},
//         success:function(data,textStatus, xhr){
//             console.log("data");
//             console.log("textStatus");
//             console.log("xhr");
//         },
//         error: function(xhr,textStatus, error){
//             console.log("xhr");
//             console.log("textStatus");
//             console.log("error");}
//     })
// //     return false;
//  }