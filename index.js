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

function purpleHtml(purpleArticle) {
  let articleImage = purpleArticle.provider[0].image.thumbnail.contentUrl;
  if (purpleArticle.image) {
    articleImage = purpleArticle.image.thumbnail.contentUrl;
  } 
  $('#purple-results-list').append(
    `<li>
      <img src="${articleImage}" class="results-img" alt="Article Image">
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
  let articleImage = blueArticle.provider[0].image.thumbnail.contentUrl;
  if (blueArticle.image) {
    articleImage = blueArticle.image.thumbnail.contentUrl;
  } 
  $('#blue-results-list').append(
    `<li>
      <img src="${articleImage}" class="results-img" alt="Article Image">
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
  let articleImage = redArticle.provider[0].image.thumbnail.contentUrl;
  if (redArticle.image) {
    articleImage = redArticle.image.thumbnail.contentUrl;
  } 
  $('#red-results-list').append(
    `<li>
      <img src="${articleImage}" class="results-img" alt="Article Image">
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
  $('#purple-results-list').empty();
  $('#red-results-list').empty();
  $('#blue-results-list').empty();
}

function getColorNews(searchTerm) {
  const purpleSearchTerm = `${searchTerm} (site:bbc.co.uk OR site:apnews.com OR site:ABCNews.go.com OR site:npr.org OR site:wsj.com)`;
  const redSearchTerm = `${searchTerm} (site:foxnews.com OR site:washingtontimes.com)`;
  const blueSearchTerm = `${searchTerm} (site:cnn.com OR site:msnbc.com OR site:occupydemocrats.com)`;
  getNews(purpleSearchTerm);
  getNews(redSearchTerm);
  getNews(blueSearchTerm);
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
    if (responseJson.value[i].provider[0].name === 'Associated Press' || responseJson.value[i].provider[0].name === 'ABC on MSN.com' || responseJson.value[i].provider[0].name === 'ABC' || responseJson.value[i].provider[0].name === 'NPR' || responseJson.value[i].provider[0].name === 'BBC') {
      const purpleArticle = responseJson.value[i];
      purpleHtml(purpleArticle);
    } else if (responseJson.value[i].provider[0].name === 'CNN' || responseJson.value[i].provider[0].name === 'CNN on MSN.com' || responseJson.value[i].provider[0].name === 'cnn.com' || responseJson.value[i].provider[0].name === 'MSNBC' || responseJson.value[i].provider[0].name === 'Washington Post' || responseJson.value[i].provider[0].name === 'Politico' || responseJson.value[i].provider[0].name === 'occupy democrats') {
      const blueArticle = responseJson.value[i];
      blueHtml(blueArticle);
    } else if (responseJson.value[i].provider[0].name === 'Fox News' ||  responseJson.value[i].provider[0].name === 'National Review' || responseJson.value[i].provider[0].name === 'Washington Times') {
      const redArticle = responseJson.value[i];
      redHtml(redArticle);
    }
  }
  //display the results section  
  $('.results').removeClass('hidden');
  console.log('`displayResults` ran');
};

function getNews(query) {
  const params = {
    q: query,
    count: 10,
    sortBy: 'relevance'
  };
  const queryString = formatQueryParams(params)
  const url = searchUrl + '?' + queryString;

  console.log(url);

  const options = {
    headers: new Headers({
      "X-RapidAPI-Host": 'bing-news-search1.p.rapidapi.com',
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
    //const maxResults = $('#js-max-results').val();
    /*getPurpleNews(searchTerm/*, maxResults*//*);
    /*getRedNews(searchTerm);
    getBlueNews(searchTerm);*/
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
  //watchAbout();
}

$(handlePurplePress);

/*'use strict';

const apiKey = 'e5c6e69222df499d91b50804ec7f256d';

const searchUrl = 'https://api.cognitive.microsoft.com/bing/v7.0/news/search';

function purpleHtml(purpleVar) {
  $('#purple-results-list').append(
    `<li><h3><a href="${purpleVar.url}">${purpleVar.name}</a></h3>
    <p>${purpleVar.description}</p>
    <p>By ${purpleVar.provider[0].name}</p>
    </li>`
  );
}

function blueHtml(blueArticle) {
  $('#blue-results-list').append(
    `<li><h3><a href="${blueArticle.url}">${blueArticle.name}</a></h3>
    <p>${blueArticle.description}</p>
    <p>By ${blueArticle.provider[0].name}</p>
    </li>`
  );
}

function redHtml(redArticle) {
  $('#red-results-list').append(
    `<li><h3><a href="${redArticle.url}">${redArticle.name}</a></h3>
    <p>${redArticle.description}</p>
    <p>By ${redArticle.provider[0].name}</p>
    </li>`
  );
}

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  console.log(responseJson);
  $('#purple-results-list').empty();
  $('#red-results-list').empty();
  $('#blue-results-list').empty();
  for (let i = 0; i < responseJson.value.length; i++) {
    if (responseJson.value[i].provider[0].name === 'Associated Press' || responseJson.value[i].provider[0].name === 'ABC on MSN.com' || responseJson.value[i].provider[0].name === 'ABC' || responseJson.value[i].provider[0].name === 'Reuters' || responseJson.value[i].provider[0].name === 'USA Today') {
      const purpleVar = responseJson.value[i];
      purpleHtml(purpleVar);
    } else if (responseJson.value[i].provider[0].name === 'CNN' || responseJson.value[i].provider[0].name === 'CNN on MSN.com' || responseJson.value[i].provider[0].name === 'cnn.com' || responseJson.value[i].provider[0].name === 'MSNBC' || responseJson.value[i].provider[0].name === 'Washington Post' || responseJson.value[i].provider[0].name === 'Politico') {
      const blueArticle = responseJson.value[i];
      blueHtml(blueArticle);
    } else if (responseJson.value[i].provider[0].name === 'Fox News' ||  responseJson.value[i].provider[0].name === 'National Review' || responseJson.value[i].provider[0].name === 'Washington Times') {
      const redArticle = responseJson.value[i];
      redHtml(redArticle);
    }
  }
  //display the results section  
  $('.results').removeClass('hidden');
};

function getNews(searchTerm) {
  const params = {
    q: `${searchTerm} (site:bbc.co.uk OR site:cnn.com OR site:apnews.com OR site:foxnews.com OR site:abc.com)`,
    count: 100,
    sortBy: 'Date'
  };
  const queryString = formatQueryParams(params)
  const url = searchUrl + '?' + queryString;

  console.log(url);

  const options = {
    headers: new Headers({
      "X-RapidAPI-Host": 'bing-news-search1.p.rapidapi.com',
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
    //const maxResults = $('#js-max-results').val();
    getNews(searchTerm/*, maxResults*//*);
  });
}

$(watchForm);*/