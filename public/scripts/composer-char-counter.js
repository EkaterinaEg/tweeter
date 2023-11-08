$(document).ready(function () {
  const tweetLength = $(".counter").text();

  $("#tweet-text_textarea").on("keyup", function (e) {
    // e.preventDefault();
    const form = $(this).closest(".form-tweet");
    const counter = form.find(".counter");
    const currentlength = $(this).val().length;
    const remainLength = tweetLength - currentlength;

    $(counter).text(remainLength);

    if (remainLength < 0) {
      $(counter).addClass("warningTextArea");
    } else {
      $(counter).removeClass("warningTextArea");
    }
  });
});
