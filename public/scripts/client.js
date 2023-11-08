// const createTweetElementbad = function (tweetsObj) {
//   let days = Math.floor(
//     (Date.now() - `${tweetsObj["created_at"]}`) / (1000 * 60 * 60 * 24)
//   );
//   return `<article class="tweet">
//   <header class="tweet__header">
//     <div class="tweet__pic">
//       <img src=${tweetsObj.user.avatars}>
//       <p class="pic__name">${tweetsObj.user.name}</p>
//     </div>
//     <p class="tweet__user-handle">${tweetsObj.user.handle}</p>
//   </header>
//   <main>
//     <p class="tweet__text">${tweetsObj.content.text}</p>
//   </main>
//   <footer class="tweet__footer">
//     <div class="footer__date">${
//       days > 1 ? days + " days" : days + " day"
//     } ago </div>
//     <div class="footer__action">
//       <i class="action__icon fa-solid fa-flag"></i>
//       <i class="action__icon fa-solid fa-retweet"></i>
//       <i class="action__icon fa-solid fa-heart"></i>
//     </div>
//   </footer>
// </article>`;
// };
$(document).ready(function () {
  const createTweetElement = function (tweetsObj) {
    // let days = Math.floor(
    //   (Date.now() - `${tweetsObj["created_at"]}`) / (1000 * 60 * 60 * 24)
    // );

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

    $(".container").append($article);
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
      $(".container").append(newTweet);
    });
  };

  const checkTweetText = function (form, error) {
    $(form).on("input", function () {
      if (!$(form) || $(form).val().length > 140) {
        $(form).slideDown("slow");
      } else {
        error.hide();
      }
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // validation of form
    const textArea = $(".tweet-text__textarea");
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
    }

    const formData = $(event.currentTarget).serialize();
    // $(".tweet-text_textarea").on("input", function () {
    //   $emptyError.hide();
    // });

    // const $button = $(".summary-group__button");
    // $button.on("click", function () {
    $.ajax({
      method: "POST",
      data: formData,
      url: "/tweets",
    })
      .done((response) => {
        // Handle a successful response here (e.g., display the new tweet).
      })
      .fail((error) => {
        // Handle AJAX request errors here.
        console.error(error);
      });
    // .then((newTweet) => {
    //   console.log(newTweet);
    // $.get("http://localhost:8080/tweets").then((tweets) => {
    //   const tweet = createTweetElement(newTweet, tweets);
    // });
    // $(".container").prepend(tweet);

    // renderTweets(newdata);
    // })
    // .catch((err) => console.log(err));
  };

  $(".form-tweet").on("submit", handleSubmit);

  const loadTweets = function () {
    $.ajax({
      method: "GET",
      url: "/tweets",
    })
      .then((res) => {
        renderTweets(res);
      })
      .catch((err) => console.log(err));
  };
  loadTweets();
});
