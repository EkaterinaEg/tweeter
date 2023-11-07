// const initialTweets = require("../../server/data-files/initial-tweets.json");

const data = [
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac",
    },
    content: {
      text: "If I have seen further it is by standing on the shoulders of giants",
    },
    created_at: 1699187432686,
  },
  {
    user: {
      name: "Descartes",
      avatars: "https://i.imgur.com/nlhLi3I.png",
      handle: "@rd",
    },
    content: {
      text: "Je pense , donc je suis",
    },
    created_at: 1699273832686,
  },
];

const createTweetElement = function (tweetsObj) {
  let days = Math.floor(
    (Date.now() - `${tweetsObj["created_at"]}`) / (1000 * 60 * 60 * 24)
  );
  return `<article class="tweet">
  <header class="tweet__header">
    <div class="tweet__pic">
      <img src=${tweetsObj.user.avatars}>
      <p class="pic__name">${tweetsObj.user.name}</p>
    </div>
    <p class="tweet__user-handle">${tweetsObj.user.handle}</p>
  </header>
  <main>
    <p class="tweet__text">${tweetsObj.content.text}</p>
  </main>
  <footer class="tweet__footer">
    <div class="footer__date">${
      days > 1 ? days + " days" : days + " day"
    } ago </div>
    <div class="footer__action">
      <i class="action__icon fa-solid fa-flag"></i>
      <i class="action__icon fa-solid fa-retweet"></i>
      <i class="action__icon fa-solid fa-heart"></i>
    </div>
  </footer>
</article>`;
};

const renderTweets = function (tweets) {
  // loops through tweets
  $.each(tweets, function (index, tweet) {
    const newTweet = createTweetElement(tweet);
    $(".container").append(newTweet);
  });
};

$(document).ready(function () {
  // Document ready ensures that the DOM is fully loaded before doing manipulation on it
  // Any DOM manipulation should be here

  // Loop through the pets array

  renderTweets(data);
});
