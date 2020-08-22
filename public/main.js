$(document).ready(function() {
  $('#sidebarCollapse').on('click', function () {
    $('#sidebar').toggleClass('active');
    $(this).toggleClass('active');
  });
});

(function() {
  'use strict';
  window.addEventListener('load', function() {
    var options = document.getElementsByClassName('sb-options');
    var validation = Array.prototype.filter.call(options, function(option) {
      option.addEventListener('click', function(event) {
        $("#navBarTitle").html(option.text);
        $("#mainContent").load('cards/'+option.id+'.html');
      }, false);
    });
  }, false);
})();

(function() {
  'use strict';
  window.addEventListener('load', function() {
    var forms = document.getElementsByClassName('needs-validation');
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();

