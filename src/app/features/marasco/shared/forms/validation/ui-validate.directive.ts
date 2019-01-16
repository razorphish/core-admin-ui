import { Directive, Input, ElementRef, OnInit } from "@angular/core";

@Directive({
  selector: "[saUiValidate]"
})
export class UiValidateDirective implements OnInit {
  @Input() saUiValidate: any;

  constructor(private el: ElementRef) {
    //AM Moved the promise to OnInit because
    //it was not firing on navigate
  }

  ngOnInit(){
    Promise.all([
      import("jquery-validation/dist/jquery.validate.js"),
      import("jquery-validation/dist/additional-methods.js")
    ])
    .then(() => {
      this.attach();
    });
  }

  attach() {
    const $form = $(this.el.nativeElement);
    const validateCommonOptions = {
      rules: {},
      messages: {},
      errorElement: "em",
      errorClass: "invalid",
      highlight: (element, errorClass, validClass) => {
        $(element)
          .addClass(errorClass)
          .removeClass(validClass);
        $(element)
          .parent()
          .addClass("state-error")
          .removeClass("state-success");
      },
      unhighlight: (element, errorClass, validClass) => {
        $(element)
          .removeClass(errorClass)
          .addClass(validClass);
        $(element)
          .parent()
          .removeClass("state-error")
          .addClass("state-success");
      },

      errorPlacement: (error, element) => {
        if (element.parent(".input").length) {
          error.insertAfter(element.parent());
        } else {
          error.insertAfter(element.parent());
        }
      }
    };

    $form
      .find("[data-smart-validate-input], [smart-validate-input]")
      .each(function() {
        var $input = $(this),
          fieldName = $input.attr("name");

        validateCommonOptions.rules[fieldName] = {};

        if ($input.data("required") != undefined) {
          validateCommonOptions.rules[fieldName].required = true;
        }
        if ($input.data("email") != undefined) {
          validateCommonOptions.rules[fieldName].email = true;
        }

        if ($input.data("maxlength") != undefined) {
          validateCommonOptions.rules[fieldName].maxlength = $input.data(
            "maxlength"
          );
        }

        if ($input.data("minlength") != undefined) {
          validateCommonOptions.rules[fieldName].minlength = $input.data(
            "minlength"
          );
        }

        //AM Added equal to because it was missing from rules
        if ($input.data("equalto") != undefined) {
          validateCommonOptions.rules[fieldName].equalTo = $input.data(
            "equalto"
          );
        }

        if ($input.data("message")) {
          validateCommonOptions.messages[fieldName] = $input.data("message");
        } else {
          Object.keys($input.data()).forEach(key => {
            if (key.search(/message/) == 0) {
              if (!validateCommonOptions.messages[fieldName])
                validateCommonOptions.messages[fieldName] = {};

              var messageKey = key.toLowerCase().replace(/^message/, "");
              validateCommonOptions.messages[fieldName][
                messageKey
              ] = $input.data(key);
            }
          });
        }
      });

    $form.validate($.extend(validateCommonOptions, this.saUiValidate));
  }
}
