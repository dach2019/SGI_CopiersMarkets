$(document).ready(function () {
  $('#sidebarCollapse').on('click', function () {
    $('#sidebar').toggleClass('active');
    $(this).toggleClass('active');
  });
});

(function () {
  'use strict';
  window.addEventListener('load', function () {
    var forms = document.getElementsByClassName('needs-validation');
    var validation = Array.prototype.filter.call(forms, function (form) {
      form.addEventListener('submit', function (event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();


$(document).ready(function () {
  $('#ItemCode').change(updatedValue);
  function updatedValue(e) {
    $.getJSON("http://localhost:3000/lookup/" + e.target.value, item => {
      $('#ItemName').val(item[0]['name']);
    }, err => {
      console.log(err);
    });
  }
});

function sendData() {

  if (document.getElementById('Form').checkValidity() == true) {
    $.post(
      '/items/add',
      $('#Form').serializeArray(),
      function (data, status) {
        if (status == 'success') {
          //aqui va un spiner
          if (data == 'registrado') {
            $.notify(
              'Se registro correctamente',
              {
                className: 'success',
                globalPosition: 'top',
                autoHideDelay: 7000
              });
            $('#Form').trigger("reset");
            document.getElementById('Form').classList.remove('was-validated');
            
          } else {
            $.notify(
              'Hubo un error: ' + data,
              {
                className: 'error',
                globalPosition: 'top',
                autoHideDelay: 7000
              });
          }

        } else {
          alert('no me respondió');
        }
      }
    )

  }
}

