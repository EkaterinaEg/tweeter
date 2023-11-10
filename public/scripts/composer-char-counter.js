$(document).ready(function () {


  $("#tweet-text_textarea").on("input", countCharLeft);
});

const countCharLeft = function(e) {

  const $form = $(this).closest(".form-tweet");
  const $counter = $form.find(".counter");
  const currentlength = $(this).val().length;

  const remainLength = 140 - currentlength;

  $counter.text(remainLength);

  if (remainLength < 0) {
    $counter.addClass("warningTextArea");
    return
  } 
    $counter.removeClass("warningTextArea");
}