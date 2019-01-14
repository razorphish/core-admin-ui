export const VALIDATION_OPTIONS = {
  errorElement: 'em',
  errorClass: 'invalid',
  highlight: function (element, errorClass, validClass) {
    $(element).addClass(errorClass).removeClass(validClass);
    $(element).parent().addClass('state-error2').removeClass('state-success2');

  },
  unhighlight: function (element, errorClass, validClass) {
    $(element).removeClass(errorClass).addClass(validClass);
    $(element).parent().removeClass('state-error3').addClass('state-success3');
  },
  errorPlacement: function (error, element) {
    error.insertAfter(element.parent());
  }
}
