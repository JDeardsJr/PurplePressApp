'use strict';

const apiKey = 'e5c6e69222df499d91b50804ec7f256d';

const searchUrl = 'https://api.cognitive.microsoft.com/bing/v7.0/news/search';

/*function generateAboutHtml() {
  const aboutString = $(`
    <h2>PurplePress returns news articles based on media source bias!</h2>
    <div class="placeholder">
      <p>Here will be a screenshot of a results page example.</p>
    </div>`);
  return aboutString;
}*/

function renderAboutHowFooter() {
  //$('.js-about').html(generateAboutHtml());
  $('.js-about').removeClass('hidden');
  $('.js-how').removeClass('hidden');
  $('.js-footer').removeClass('hidden');
}

/*function sourcesHtml(sourcesArticle) {
  let sourcesArticleImage = '';
  if (sourcesArticle.image) {
    sourcesArticleImage = sourcesArticle.image.thumbnail.contentUrl;
  } else if (sourcesArticle.provider[0].image) {
    sourcesArticleImage = sourcesArticle.provider[0].image.thumbnail.contentUrl;
  }
  $('#sources-results-list').append(
    `<li>
      <img src="${sourcesArticleImage}" class="results-img" alt="Article Image">
      <div>
        <h3><a href="${sourcesArticle.url}">${sourcesArticle.name}</a></h3>
        <p>By ${sourcesArticle.provider[0].name}</p>
        <p>${sourcesArticle.description}</p>
      </div>
    </li>`
  );
  console.log('`sourcesHtml` ran')
}*/

function purpleHtml(purpleArticle) {
  let purpleArticleImage = '';
  if (purpleArticle.image) {
    purpleArticleImage = purpleArticle.image.thumbnail.contentUrl;
  } else if (purpleArticle.provider[0].image) {
    purpleArticleImage = purpleArticle.provider[0].image.thumbnail.contentUrl;
  }
  $('#purple-results-list').append(
    `<li>
      <img src="${purpleArticleImage}" class="results-img" alt="Article Image">
      <div>
        <h3><a href="${purpleArticle.url}">${purpleArticle.name}</a></h3>
        <p>By ${purpleArticle.provider[0].name}</p>
        <p>${purpleArticle.description}</p>
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
      <img src="${blueArticleImage}" class="results-img" alt="Article Image">
      <div>
        <h3><a href="${blueArticle.url}">${blueArticle.name}</a></h3>
        <p>By ${blueArticle.provider[0].name}</p>
        <p>${blueArticle.description}</p>
      </div>
    </li>`
  );
  console.log('`blueHtml` ran');
}

function redHtml(redArticle) {
  //let articleImage = redArticle.provider[0].image.thumbnail.contentUrl;
  let redArticleImage = '';
  if (redArticle.image) {
    redArticleImage = redArticle.image.thumbnail.contentUrl;
  } else if (redArticle.provider[0].image) {
    redArticleImage = redArticle.provider[0].image.thumbnail.contentUrl;
  } 
  $('#red-results-list').append(
    `<li>
      <img src="${redArticleImage}" class="results-img" alt="Article Image">
      <div>
        <h3><a href="${redArticle.url}">${redArticle.name}</a></h3>
        <p>${redArticle.provider[0].name}</p>
        <p>${redArticle.description}</p>
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
  /*$('#sources-results-list').empty();*/
  $('#purple-results-list').empty();
  $('#red-results-list').empty();
  $('#blue-results-list').empty();
}

/*function getColorUrl(array) {
  const colorsFetch = array.map(x => 
    const params = {
      q: x,
      count: 100,
      sortBy: 'relevance'
    };
    const queryString = formatQueryParams(params)
    const url = searchUrl + '?' + queryString;

    console.log(url);

    const options = {
      headers: new Headers({
        //"X-RapidAPI-Host": 'bing-news-search1.p.rapidapi.com',
        "Ocp-Apim-Subscription-Key": apiKey})
    };
    [url, options])
  return colorsFetch;
}

/*function getRedUrl(redSearchTerm) {
  const params = {
    q: redSearchTerm,
    count: 100,
    sortBy: 'relevance'
  };
  const queryString = formatQueryParams(params)
  const redUrl = searchUrl + '?' + queryString;

  console.log(redUrl);

  const options = {
    headers: new Headers({
      "Ocp-Apim-Subscription-Key": apiKey})
  };
  const redFetch = [redUrl, options];
  return redFetch
}*/

function getColorNews(searchTerm) {
  const purpleSearchTerm = `${searchTerm} (site:reuters.com OR site:apnews.com OR site:bloomberg.com OR site:ABCNews.go.com OR site:npr.org OR site:wsj.com OR site:chicagotribune.com OR site:cbsnews.com OR site:usatoday.com)`;
  const redSearchTerm = `${searchTerm} (site:foxnews.com OR site:washingtontimes.com OR site:nationalreview.com OR site:spectator.org OR site:townhall.com OR site:conservativereview.com)`;
  const blueSearchTerm = `${searchTerm} (site:cnn.com OR site:msnbc.com OR site:thedailybeast.com OR site:vanityfair.com OR site:counterpunch.org OR site:washingtonmonthly.com)`;
  getNews(purpleSearchTerm);
  getNews(redSearchTerm);
  getNews(blueSearchTerm);
  /*const colorSearchTerms = [purpleSearchTerm, redSearchTerm, blueSearchTerm]
  getColorUrl(colorSearchTerms);*/
  //getNews(searchTerm);
}

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  console.log(responseJson);
  /*$('#purple-results-list').empty();
  $('#red-results-list').empty();
  $('#blue-results-list').empty();*/
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
    } /*else {
      const sourcesArticle = responseJson.value[i];
      sourcesHtml(sourcesArticle);
    }*/
  }
  //display the results section  
  $('.results').removeClass('hidden');
  window.location.href = '#container';
  console.log('`displayResults` ran');
};

function getNews(query) {
  const params = {
    q: query,
    count: 100,
    sortBy: 'relevance'
  };
  const queryString = formatQueryParams(params)
  const url = searchUrl + '?' + queryString;

  console.log(url);

  const options = {
    headers: new Headers({
      //"X-RapidAPI-Host": 'bing-news-search1.p.rapidapi.com',
      "Ocp-Apim-Subscription-Key": apiKey})
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

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-topic').val();
    emptyAbout();
    emptyResults();
    getColorNews(searchTerm);
  });
}

function watchAbout() {
  $('.js-about-button').on('click', function(event) {
    renderAboutHowFooter();
  });
}

function handlePurplePress() {
  watchForm();
  watchAbout();
}

$(handlePurplePress);

