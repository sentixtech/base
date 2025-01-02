$(document).ready(function () {
  //copy
  $("[data-copy]").on("click", function (event) {
    event.preventDefault();
    var url = $(this).data("copy");
    var $tempTextArea = $("<textarea>");
    $("body").append($tempTextArea);
    $tempTextArea.val(url).select();
    try {
      document.execCommand("copy");
      alertshow(false, "Copy Successfully");
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
    $tempTextArea.remove();
  });
  //slug
  $("[data-slug-make]").on("input", function () {
    let nameInput = $(this).val();
    let slug = nameInput
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[\/?]+/g, "");

    $("[data-slug]").val(slug);
  });
  //dyanmic Content
  $(".dynamic-btn").on("click", function () {
    const content = $(this).data("content");
    const targetSelector = $(this).data("target");
    const target = $(targetSelector);
    const editorSelector = $(this).data("editor");
    if (target.length) {
      target.append(content);
      if (editorSelector) {
        initializeSummernote(editorSelector);
      }
    } else {
      console.error("Target element not found:", targetSelector);
    }
  });
  //dyanmic Content Remove
  $(document).on("click", ".remove-btn", function () {
    $(this).closest(".dynamic-content").remove();
  });

  $("[data-password-show]").hide();
  // Show toggle icon when input field has a value
  $("input[type='password']").on("input", function () {
    var inputId = $(this).attr("id");
    var toggleIcon = $("[data-password-show='" + inputId + "']");
    if ($(this).val() !== "") {
      toggleIcon.show();
    } else {
      toggleIcon.hide();
    }
  });
  // Toggle password visibility
  $("[data-password-show]").on("click", function () {
    var inputId = $(this).data("password-show");
    var input = $("#" + inputId);
    var icon = $(this).find("i");

    if (input.attr("type") === "password") {
      input.attr("type", "text");
      icon.removeClass("fa-eye").addClass("fa-eye-slash");
    } else {
      input.attr("type", "password");
      icon.removeClass("fa-eye-slash").addClass("fa-eye");
    }
  });
  $("#password,[data-password]").on("keyup keydown", function () {
    let password = $(this).val();
    let message = $(this).siblings(".error_message");
    if (password.length < 8) {
      message.html("Password must be at least 8 characters long");
    } else {
      message.html("");
    }
  });
  $("[data-confirmpassword],[data-password]").on("keyup", function () {
    let conpassword = $("[data-confirmpassword]").val();
    let password = $("[data-password]").val();
    let message = $("[data-confirmpassword]").siblings(".error_message");
    if (password !== conpassword) {
      message.html("Password  not match");
    } else {
      message.html("");
    }
  });
  $("#phone,[data-phone]").keyup(function () {
    var phoneNumber = $(this).val();
    var messageElement = $(this).siblings(".error_message");
    if (/^\d{10}$/.test(phoneNumber)) {
      messageElement.html("");
    } else {
      messageElement.html("Phone number must contain 10 digits only");
    }
  });
  $("[data-scn]").keyup(function () {
    var inputText = $(this).val();
    var messageElement = $(this).siblings(".error_message");
    var alphanumericPattern = /^[a-zA-Z0-9\s]*$/;
    if (alphanumericPattern.test(inputText)) {
      messageElement.html("");
      $(this).removeClass("is-invalid");
    } else {
      messageElement.html("Special characters are not allowed");
      $(this).addClass("is-invalid");
    }
  });
  $("[data-int]").keyup(function () {
    var inputText = $(this).val();
    var messageElement = $(this).siblings(".error_message");
    var integerPattern = /^[0-9]*$/;
    if (integerPattern.test(inputText)) {
      messageElement.html("");
      $(this).removeClass("is-invalid"); // Remove is-invalid class on valid input
    } else {
      messageElement.html("Only integers are allowed");
      $(this).addClass("is-invalid"); // Add is-invalid class on invalid input
    }
  });
  $('input[data-type="int"]').on("keypress", function (e) {
    let charCode = e.which ? e.which : e.keyCode;
    let charStr = String.fromCharCode(charCode);

    // Allow digits (0-9)
    if ((charCode >= 48 && charCode <= 57) || charStr === ".") {
      // Allow only one dot
      if (charStr === "." && $(this).val().includes(".")) {
        e.preventDefault();
      }
    } else {
      e.preventDefault();
    }
  });
  $('input[data-type="char"]').on("keypress", function (e) {
    let charCode = e.which ? e.which : e.keyCode;

    // Allow alphabetic characters (a-z and A-Z)
    if ((charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122)) {
      e.preventDefault();
    }
  });
});
function requiredInput(ids) {
  ids.split(",").forEach(function (id) {
    $(id.trim()).prop("required", true);
    $(id.trim()).closest("div").find("label").addClass("required-label");
  });
}

function unRequiredInput(ids) {
  ids.split(",").forEach(function (id) {
    $(id.trim()).prop("required", false);
    $(id.trim()).closest("div").find("label").removeClass("required-label");
  });
}
