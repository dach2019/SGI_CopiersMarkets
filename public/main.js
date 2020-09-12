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
    $.getJSON("/lookup/" + e.target.value, item => {
      $('#ItemName').val(item[0]['name']);
    }, err => {
      console.log(err);
    });
  }
});

function sendData() {

  if (document.getElementById('Form').checkValidity() == true) {
    $.post(
      $(location).attr("href"),
      $('#Form').serializeArray(),
      function (data, status) {
        if (status == 'success') {
          //aqui va un spiner
          if (data['status'] == 'success') {
            $.notify(
              data['message'],
              {
                className: 'success',
                globalPosition: 'top',
                autoHideDelay: 7000
              });
            $('#Form').trigger("reset");
            document.getElementById('Form').classList.remove('was-validated');
            if (data['redirect']!=''){
              location.replace(data['redirect']);
            }
            
          } else {
            $.notify(
                'Hubo un error: '+data['message'],
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

