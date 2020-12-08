$(document).ready(function () {
  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })
  
  $.notify.addStyle('success', {
    html: "<div><div class='alert alert-success' role='alert'><div class='title' data-notify-text='message'/></div></div></div>",
    classes: {
      base: {
        "width": "100%"
      }
    }
  });
  $.notify.addStyle('error', {
    html: "<div><div class='alert alert-danger' role='alert'><div class='title' data-notify-text='message'/></div></div></div>",
    classes: {
      base: {
        "width": "100%"
      }
    }
  });
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

$(document).ready(function () {
  $('.closer').click(function(){
    $.getJSON($(location).attr("href").replace('search','close/') + $(this).attr('id'), 
    function(data,status){
      if (status == 'success') {
        if (data['status'] == 'success') {
          $.notify({
            message: data['message']
          },
            {
              style: 'success',
              globalPosition: 'bottom',
              autoHideDelay: 3000
            });
          setTimeout(() => {
            if (data['redirect'] != '') {
              location.replace(data['redirect']);
            }
          }, 2000);
        } else {
          
          $.notify({
            message: 'Hubo un error: ' + data['message']
          },
            {
              style: 'error',
              globalPosition: 'bottom',
              autoHideDelay: 4000
            });
        }
      } else {
        $.notify({
          message: 'Hubo un error: ' + data
        },
          {
            style: 'error',
            globalPosition: 'bottom',
            autoHideDelay: 4000
          });
      }
    }
    , err => {
      console.log(err);
    });
  })
});

function sendData() {

  if (document.getElementById('Form').checkValidity() == true) {
    $.post(
      $(location).attr("href"),
      $('#Form').serializeArray(),
      function (data, status) {
        if (status == 'success') {
          if (data['status'] == 'success') {
            $.notify({
              message: data['message']
            },
              {
                style: 'success',
                globalPosition: 'bottom',
                autoHideDelay: 3000
              });
            setTimeout(() => {
              $('#Form').trigger("reset");
              document.getElementById('Form').classList.remove('was-validated');
              if (data['redirect'] != '') {
                location.replace(data['redirect']);
              }
            }, 2000);
          } else {
            $.notify({
              message: 'Hubo un error: ' + data['message']
            },
              {
                style: 'error',
                globalPosition: 'bottom',
                autoHideDelay: 4000
              });
          }
        } else {
          $.notify({
            message: 'Hubo un error: ' + data
          },
            {
              style: 'error',
              globalPosition: 'bottom',
              autoHideDelay: 4000
            });
        }
      }
    )

  }
}

