'use strict';

const unsplashAccessKey = 'x4OFHJL9iYcRYRKo6HjH4Mm6yQOrlqVgYUtVQLVvTfk';

const unsplashUrl = 'https://api.unsplash.com/search/photos';

//const apiKey = 'e5c6e69222df499d91b50804ec7f256d';

//const searchUrl = 'https://api.cognitive.microsoft.com/bing/v7.0/news/search';

const searchUrl = 'https://bing-news-search1.p.rapidapi.com/news/search'

const searchEx = [ 'Enter Topic', '~ OR ~', 'Click "Go!" for Top Stories!' ];
  setInterval(function() {
    $("#js-search-topic").attr("placeholder", searchEx[searchEx.push(searchEx.shift())-1]);
  }, 2000);

/*$(document).ready(function(){
  if($(window).width >= 700) {
    $('#blue-scroller').removeClass('hidden');
  }
});*/

function renderAboutHowFooter() {
  $('.js-about').removeClass('hidden');
  $('.js-how').removeClass('hidden');
  $('.js-footer').removeClass('hidden');
}

function purpleHtml(purpleArticle) {
  let purpleArticleImage = '';
  if (purpleArticle.image) {
    purpleArticleImage = purpleArticle.image.thumbnail.contentUrl;
  } else if (purpleArticle.provider[0].image) {
    purpleArticleImage = purpleArticle.provider[0].image.thumbnail.contentUrl;
  }
  $('#purple-results-list').append(
    `<li>
      <div class="image-title-container">
        <img src="${purpleArticleImage}" class="results-img" alt="Article Image">
        <h3><a href="${purpleArticle.url}" target="_blank" class="purple article-name">${purpleArticle.name}</a></h3>
      </div>
      <div>
        <p class="purple-article-source">By ${purpleArticle.provider[0].name}</p>
        <p class="article-description">${purpleArticle.description}</p>
      </div>
    </li>`
  );
  console.log('`purpleHtml` ran')
}

function blueHtml(blueArticle) {
  let blueArticleImage = '';
  if (blueArticle.image) {
    blueArticleImage = blueArticle.image.thumbnail.contentUrl;
  } else if (blueArticle.provider[0].image) {
    blueArticleImage = blueArticle.provider[0].image.thumbnail.contentUrl;
  }
  $('#blue-results-list').append(
    `<li>
      <div class="image-title-container">
        <img src="${blueArticleImage}" class="results-img" alt="Article Image">
        <h3><a href="${blueArticle.url}" target="_blank" class="blue article-name">${blueArticle.name}</a></h3>
      </div>
      <div>
        <p class="blue-article-source">By ${blueArticle.provider[0].name}</p>
        <p class="article-description">${blueArticle.description}</p>
      </div>
    </li>`
  );
  console.log('`blueHtml` ran');
}

function redHtml(redArticle) {
  let redArticleImage = '';
  if (redArticle.image) {
    redArticleImage = redArticle.image.thumbnail.contentUrl;
  } else if (redArticle.provider[0].image) {
    redArticleImage = redArticle.provider[0].image.thumbnail.contentUrl;
  } 
  $('#red-results-list').append(
    `<li>
      <div class="image-title-container">
        <img src="${redArticleImage}" class="results-img" alt="Article Image">
        <h3 class="article-name"><a class="red article-name" href="${redArticle.url}" target="_blank">${redArticle.name}</a></h3>
      </div>
      <div>
        <p class="article-source">${redArticle.provider[0].name}</p>
        <p class="article-description">${redArticle.description}</p>
      </div>
    </li>`
  );  
  console.log('`redHtml` ran');
}

function emptyAbout() {
  $('.js-about-button').addClass('hidden');
  $('.js-about').addClass('hidden');
}

function emptyResults() {
  $('#purple-results-list').empty();
  $('#red-results-list').empty();
  $('#blue-results-list').empty();
}

function emptyErrorMessage() {
  $('.error-message').empty();
}

function getColorNews(searchTerm) {
  const purpleSearchTerm = `${searchTerm} (site:reuters.com OR site:apnews.com OR site:bloomberg.com OR site:ABCNews.go.com OR site:npr.org OR site:wsj.com OR site:chicagotribune.com OR site:cbsnews.com OR site:usatoday.com)`;
  const redSearchTerm = `${searchTerm} (site:foxnews.com OR site:washingtontimes.com OR site:nationalreview.com OR site:spectator.org OR site:townhall.com OR site:conservativereview.com)`;
  const blueSearchTerm = `${searchTerm} (site:cnn.com OR site:msnbc.com OR site:thedailybeast.com OR site:vanityfair.com OR site:counterpunch.org OR site:washingtonmonthly.com)`;
  getNews(purpleSearchTerm);
  getNews(redSearchTerm);
  getNews(blueSearchTerm);
}

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayImageResults(responseJson) {
  console.log(responseJson);
  const imageUrl = responseJson.results[0].urls.regular;
  $('.container').css('background-image', 'linear-gradient(black, black), url(' + imageUrl + ')');
}

function displayResults(responseJson) {
  console.log(responseJson);

  for (let i = 0; i < responseJson.value.length; i++) {
    if (responseJson.value[i].provider[0].name === 'Associated Press' || responseJson.value[i].provider[0].name === 'ABC on MSN.com' || responseJson.value[i].provider[0].name === 'ABC' || responseJson.value[i].provider[0].name === 'ABCNews' || responseJson.value[i].provider[0].name === 'NPR' || responseJson.value[i].provider[0].name === 'Reuters' || responseJson.value[i].provider[0].name === 'Wall Street Journal' || responseJson.value[i].provider[0].name === 'Bloomberg' || responseJson.value[i].provider[0].name === 'Chicago Tribune' || responseJson.value[i].provider[0].name === 'CBS News' || responseJson.value[i].provider[0].name === 'USA Today') {
      const purpleArticle = responseJson.value[i];
      purpleHtml(purpleArticle);
    } else if (responseJson.value[i].provider[0].name === 'CNN' || responseJson.value[i].provider[0].name === 'CNN on MSN.com' || responseJson.value[i].provider[0].name === 'cnn.com' || responseJson.value[i].provider[0].name === 'MSNBC' || responseJson.value[i].provider[0].name === 'CounterPunch' || responseJson.value[i].provider[0].name === 'Vanity Fair' || responseJson.value[i].provider[0].name === 'The Daily Beast'|| responseJson.value[i].provider[0].name === 'Washington Monthly') {
      const blueArticle = responseJson.value[i];
      blueHtml(blueArticle);
    } else if (responseJson.value[i].provider[0].name === 'Fox News' ||  responseJson.value[i].provider[0].name === 'National Review' || responseJson.value[i].provider[0].name === 'Washington Times' || responseJson.value[i].provider[0].name === 'The American Spectator' ||  responseJson.value[i].provider[0].name === 'Townhall' || responseJson.value[i].provider[0].name === 'Conservative Review') {
      const redArticle = responseJson.value[i];
      redHtml(redArticle);
    } 
  }
  //if (responseJson.value.length !== 0) {
  $('.container').removeClass('hidden')
  window.location.href = '#container';
  //}
  console.log('`displayResults` ran');
};

function getNews(query) {
  const params = {
    q: query,
    count: 3,
    sortBy: 'relevance'
  };
  const queryString = formatQueryParams(params)
  const url = searchUrl + '?' + queryString;

  console.log(url);

  const options = {
    headers: new Headers({
      "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
      "x-rapidapi-key": "83e4845796msh90430094bea1322p1c0a2bjsn3008c6d1999f",
      "x-bingapis-sdk": "true"})
  };

  fetch(url, options)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function getImage(query) {
  const params = {
    client_id: unsplashAccessKey,
    query: query,
    order_by: 'relevant'
  };
  const queryString = formatQueryParams(params)
  const url = unsplashUrl + '?' + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayImageResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
      //$('.error-container').html(`<p id="js-error-message" class="error-message">Something went wrong: your search cannot be completed as currently entered.  Please check spelling and try again!</p>`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-topic').val();
    emptyAbout();
    emptyResults();
    emptyErrorMessage();
    getColorNews(searchTerm);
    getImage(searchTerm);
  });
}

function watchAbout() {
  $('.js-about-button').on('click', function(event) {
    renderAboutHowFooter();
  });
}

function watchRedToggle() {
  $('.js-red-button').on('click', function(event) {
    $('#red-scroller').toggle('.hidden');
  });
}

function watchBlueToggle() {
  $('.js-blue-button').on('click', function(event) {
    $('#blue-scroller').toggle('.hidden');
  });
}

function watchPurpleToggle() {
  $('.js-purple-button').on('click', function(event) {
    $('#purple-scroller').toggle('.hidden');
  });
}

function handlePurplePress() {
  watchForm();
  watchAbout();
  watchRedToggle();
  watchBlueToggle();
  watchPurpleToggle();
}

$(handlePurplePress);

