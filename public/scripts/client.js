$(document).ready(function () {
  const createTweetElement = function (tweetsObj) {
    const $article = $("<article>");
    $article.addClass("tweet");

    const $header = $("<header>");
    $header.addClass("tweet__header");
    const $div = $("<div>");
    $div.addClass("tweet__pic");
    const $image = $("<img>");
    $image.attr("src", tweetsObj.user.avatars);
    const $p = $("<p>");
    $p.addClass("pic__name");
    $p.text(`${tweetsObj.user.name}`);
    const $pUser = $("<p>");
    $pUser.addClass("tweet__user-handle");
    $pUser.text(`${tweetsObj.user.handle}`);

    const $main = $("<main>");
    const $pMain = $("<p>");
    $pMain.addClass("tweet__text");
    $pMain.text(`${tweetsObj.content.text}`);

    const $footer = $("<footer>");
    $footer.addClass("tweet__footer");
    const $divFooter = $("<div>");
    $divFooter.addClass("footer__date");
    // ____________________________________________________________________Time ago
    const formattedTime = timeago.format(tweetsObj["created_at"]);
    $divFooter.text(`${formattedTime}`);
    // ________________________________________________________________________________
    const $divIcons = $("<div>");
    $divIcons.addClass("footer__action");
    const $icon1 = $("<i>");
    $icon1.addClass("action__icon fa-solid fa-flag");
    const $icon2 = $("<i>");
    $icon2.addClass("action__icon fa-solid fa-retweet");
    const $icon3 = $("<i>");
    $icon3.addClass("action__icon fa-solid fa-heart");

    $article.append($header);
    $article.append($main);
    $article.append($footer);

    $header.append($div);
    $header.append($pUser);
    $div.append($image);
    $div.append($p);

    $main.append($pMain);

    $footer.append($divFooter);
    $footer.append($divIcons);
    $divIcons.append($icon1);
    $divIcons.append($icon2);
    $divIcons.append($icon3);

    return $article;
  };

  const renderTweets = function (tweets) {
    $.each(tweets, function (index, tweet) {
      const newTweet = createTweetElement(tweet);
      $(".tweets__wrapper").prepend(newTweet);
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // validation of form
    const textArea = $(".tweet-content__textarea");
    const error_length = $(".error-message_length");
    const error_empty = $(".error-message_empty");

    if (textArea.val().length === 0) {
      error_empty.slideDown("slow");
      error_length.hide();
    } else if (textArea.val().length > 140) {
      error_length.slideDown("slow");
      error_empty.hide();
    } else {
      error_length.hide();
      error_empty.hide();

      const formData = $(event.currentTarget).serialize();

      $.ajax({
        method: "POST",
        data: formData,
        url: "/tweets",
      })
        .then(() => {
          loadTweets();
        })
        .catch((err) => console.log(err));
    }
  };

  $(".form-tweet").on("submit", handleSubmit);

  const loadTweets = function () {
    $.ajax({
      method: "GET",
      url: "/tweets",
    })
      .then((res) => {
        $(".tweets__wrapper").text("");
        renderTweets(res);
        $(".tweet-content__textarea").val("");
      })
      .catch((err) => console.log(err));
  };

  loadTweets();

  // STRETCH
  $(".nav__button").on("click", function () {
    $(".new-tweet").slideToggle("slow");
  });
});
