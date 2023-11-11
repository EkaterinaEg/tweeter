

const createTweetElement = function (tweetsObj) {
    
    const $article = $("<article>");
    $article.addClass("tweet");
  
    // header
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
  
    // main
    const $main = $("<main>");
    const $pMain = $("<p>");
    $pMain.addClass("tweet__text");
    $pMain.text(`${tweetsObj.content.text}`);
  
    // footer
    const $footer = $("<footer>");
    $footer.addClass("tweet__footer");
    const $divFooter = $("<div>");
    $divFooter.addClass("footer__date");
    
    // Time ago script to propper time display 
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

  // render new tweet
  const renderTweets = function (tweets) {
    const $container = $(".tweets__wrapper").empty();
    $.each(tweets, function (index, tweet) {
      const newTweet = createTweetElement(tweet);
      $container.prepend(newTweet);
    });
  };

//load new tweets on page
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

// hander to add new tweet (validation of input and post new tweet of page above old ones)
  const handleSubmit = (event) => {
    event.preventDefault();

    // validation of form
    const textArea = $(".tweet-content__textarea");
    const errorLength = $(".error-message_length");
    const errorEmpty = $(".error-message_empty");
  
    if (textArea.val().length === 0) {
      errorEmpty.slideDown("slow");
      errorLength.hide();
    } else if (textArea.val().length > 140) {
      errorLength.slideDown("slow");
      errorEmpty.hide();
    } else {
      errorLength.hide();
      errorEmpty.hide();
    }

    const formData = $(event.currentTarget).serialize();

      $.ajax({
        method: "POST",
        data: formData,
        url: "/tweets",
      })
        .then(() => {
          loadTweets();
          textArea.val("");
          textArea.trigger('input')//update length of counter after new tweet post
      })
        .catch((err) => console.log(err));
    }

    // open form for new tweet by clicking button in nav
  const navButtonHandler = function() {
    $(".nav__button").on("click", function () {
      $(".new-tweet").slideToggle("slow");
    });
  }

  $(document).ready(function () {

    //upload tweets on page
  loadTweets();

  // post new tweets
  $(".form-tweet").on("submit", handleSubmit);

  // handler for nav button
  navButtonHandler();
})


