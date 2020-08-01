'use strict';

const unsplashAccessKey = 'x4OFHJL9iYcRYRKo6HjH4Mm6yQOrlqVgYUtVQLVvTfk';

const unsplashUrl = 'https://api.unsplash.com/search/photos';

const rapidApiHost = 'bing-news-search1.p.rapidapi.com';

const rapidApiKey = 'f88b845398mshc367aa15144d97bp1ca15bjsnf2f58f0d9762';

const searchUrl = 'https://bing-news-search1.p.rapidapi.com/news/search';

const defaultImage = 'images/defaultBackgroundA.jpg';

const defaultArticleImage = 'images/defaultArticleImage.png';

// sets alternating placeholder
const searchEx = [ 'Enter Topic', '~ OR ~', 'Click "Go!"', 'for Top Stories!' ];
  setInterval(function() {
    $('#js-search-topic').attr('placeholder', searchEx[searchEx.push(searchEx.shift())-1]);
  }, 2000);

  // generates error html for errors caused by faulty fetch call
function errorHtml(err) {
  $('.js-error-container').html(
      `<section class="error-container">
        <h2 id="js-error-message" class="error-message logo-styling">Oops!</h2> 
        <p>The system has encountered an error.</p>  
        <p class="p-margin p-color">Please check your network connection <span class="press-styling">and/or</span> try again later.</p>
      </section>`
  );
  console.log('error message ran');
  window.location.href = '#js-form';
}

// generates error html for bad search results and passes in search term to google search link
function searchErrorHtml(searchTerm) {
  $('.js-error-container').html(
      `<section class="error-container">
        <h2 id="js-error-message" class="error-message logo-styling">Oops!</h2> 
        <p>Your search cannot be completed as currently entered.  Please check spelling and re-phrase if possible.  Try again!</p>
        <h3 class="p-margin logo-styling">Still No Luck?</h3>  
        <a class="google-link" href="https://www.google.com/search?q=${searchTerm}" target="_blank">BROWSE GOOGLE'S SEARCH RESULTS</a>
      </section>`
  );
  console.log('error message ran');
  window.location.href = '#js-form';
}

// determines which article image to display and generates article html
function articleHtml(article, color) {
  let articleImage = '';
  if (article.image) {
    articleImage = article.image.thumbnail.contentUrl;
  } else if (article.provider[0].image) {
    articleImage = article.provider[0].image.thumbnail.contentUrl;
  } else {
    articleImage = defaultArticleImage;
  }
  $(`#${color}-results-list`).append(
    `<li>
      <div class="image-title-container">
        <img src="${articleImage}" class="results-img" alt="Article Image">
        <h3 class="article-name"><a class="${color} article-name" href="${article.url}" target="_blank">${article.name}</a></h3>
      </div>
      <div>
        <p class="${color}-article-source">${article.provider[0].name}</p>
        <p class="article-description">${article.description}</p>
      </div>
    </li>`
  );
console.log('`articleHtml` ran');
}

// resets specific scroller div when toggled open in mobile mode
// calls handleResultsJump function
function resetSingleScroller(elementClass, elementId) {
  if (!elementClass.hasClass('hidden')) {
    const divId = elementClass.attr('id');
    const myDiv = document.getElementById(`${divId}`);
    myDiv.scrollTop = 0;
  }
  handleResultsJump(elementClass, elementId);
}

// resets all open scrollers divs to top
function resetAllScrollers() {
  const myRedDiv = document.getElementById('red-scroller');
  const myBlueDiv = document.getElementById('blue-scroller');
  const myPurpleDiv = document.getElementById('purple-scroller');
  myRedDiv.scrollTop = 0;
  myBlueDiv.scrollTop = 0;
  myPurpleDiv.scrollTop = 0;
}

// clears previous error message html
function emptyErrorMessage() {
  $('.js-error-container').empty();
}

// hides about button and container on submit click
function handleAbout() {
  $('.js-about-button').addClass('hidden');
  $('.js-about-container').addClass('hidden');
}

// displays previous search button 
function handlePrevious() {
  $('.js-previous-button').removeClass('hidden');
}

// displays, and screen jumps to, results container
function handleResultsContainer() {
  $('.container').removeClass('hidden');
  window.location.href = '#container';
  $(document).ready(function(){
    if ($(window).width() < 700) {
      $('.articles-scroller').addClass('hidden');
      console.log('articles collapsed');
    }
  });
  console.log('`handleResultsContainer` ran');
}

// determines if a results element is being displayed and, if so, jumps to element
function handleResultsJump(elementClass, elementId) {
  if (!elementClass.hasClass('hidden')) {
    window.location.href = `#${elementId}`;
  };
}

// empties previous results
function emptyResults() {
  $('#purple-results-list').empty();
  $('#red-results-list').empty();
  $('#blue-results-list').empty();
}

// displays about container and footer
function renderAboutFooter() {
  $('.js-about-container').removeClass('hidden');
  $('.js-footer').removeClass('hidden');
}

// jumps to about container 
function handleScreenJump() {
  if (!$('#about-container').hasClass('hidden')) {
    window.location.href = '#about-container';
  };
}

// ensures .fa-search has blink class, un-rotates .press-border and displays footer and buttons
function handleFooterButtons() {
  $('.fa-search').addClass('blink');
  $('.press-border').removeClass('rotated');
  $('.js-footer-button').removeClass('hidden');
  $('.js-footer').removeClass('hidden');
}

// hides .js-about-button and toggles hidden attribute on .js-about-container
// toggles blink and rotated classes on .press-border and .fa-search buttons
function handleFooterToggle() {
  $('.js-about-button').addClass('hidden');
  $('.js-about-container').toggleClass('hidden');
  $('.press-border').toggleClass('rotated', 'blink');
  $('.fa-search').toggleClass('blink');
}

// determines if there is a search term to pass to the image api
// if not, it renders the default image
function handleImageQuery(searchTerm) {
  if (searchTerm === '') {
    $('.results').css('background-image', 'linear-gradient(black, black), url(' + defaultImage + ')');
  } else {
    getImage(searchTerm);
  }
}

// assigns color seartch term variables applies specific site parameters to each
// assigns queries array and passes it, along with the initial search term, to getNews function
function getColorNews(searchTerm) {
  const purpleSearchTerm = `${searchTerm} (site:reuters.com OR site:apnews.com OR site:bloomberg.com OR site:ABCNews.go.com OR site:npr.org OR site:wsj.com OR site:chicagotribune.com OR site:cbsnews.com OR site:usatoday.com)`;
  const redSearchTerm = `${searchTerm} (site:foxnews.com OR site:washingtontimes.com OR site:nationalreview.com OR site:spectator.org OR site:townhall.com OR site:conservativereview.com)`;
  const blueSearchTerm = `${searchTerm} (site:cnn.com OR site:msnbc.com OR site:thedailybeast.com OR site:vanityfair.com OR site:counterpunch.org OR site:washingtonmonthly.com)`;
  const queries = [redSearchTerm, blueSearchTerm, purpleSearchTerm]
  getNews(queries, searchTerm);
}

// maps over parameters and returns them
function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

// determines if unsplash API responseJson returned an image result and, if not, displays default image.  Otherwise, it displays returned image.
function displayImageResults(responseJson) {
  console.log(responseJson);
    if (responseJson.total === 0) {
      $('.results').css('background-image', 'linear-gradient(black, black), url(' + defaultImage + ')');
    } 
    const imageUrl = responseJson.results[0].urls.regular;
    $('.results').css('background-image', 'linear-gradient(black, black), url(' + imageUrl + ')');
}

// empties any previous article results
// loops through newResponseJson and sends each item to corresponding color html function
// ensures results container and previous search button are displayed
function displayResults(newResponseJson) {
  console.log(newResponseJson);

  emptyResults();
  for (let i = 0; i < newResponseJson.length; i++) {
    if (newResponseJson[i] === newResponseJson[0]) {
      for (let i = 0; i < newResponseJson[0].value.length; i++) {
        const redArticle = newResponseJson[0].value[i];
        let color = 'red';
        articleHtml(redArticle, color);
      }
    } else if (newResponseJson[i] === newResponseJson[1]) {
      for(let i = 0; i < newResponseJson[1].value.length; i++) {
        const blueArticle = newResponseJson[1].value[i];
        let color = 'blue';
        articleHtml(blueArticle, color); 
      }
    } else if (newResponseJson[i] === newResponseJson[2]) {
      for (let i = 0; i < newResponseJson[2].value.length; i++) {
        const purpleArticle = newResponseJson[2].value[i];
        let color = 'purple';
        articleHtml(purpleArticle, color);
      }
    }
  }
  resetAllScrollers();
  handleResultsContainer();
  handlePrevious();
  console.log('`displayResults` ran');
};

// determines if newResponseJson returned results for all three categories and, if so, runs displayResults function
// if not, it runs errorHtml
function handleNewResponse(newResponseJson, searchTerm) {
  if (newResponseJson.length === 3) {
    displayResults(newResponseJson);
  } else {
    searchErrorHtml(searchTerm);
  }
}

// loops through responseJson from article search and pushes any items with a length other than 0 to newResponseJson
// runs handleNewResponse function
function createNewResponse(responseJson, searchTerm) {

  let newResponseJson = [];
  for (let i = 0; i < responseJson.length; i++) {
    if (responseJson[i].value.length !== 0) {
      newResponseJson.push(responseJson[i]);
    } 
  }
  handleNewResponse(newResponseJson, searchTerm);
}

// loops through queries and applies params to each, then pushes urls to requests variable
// makes promise.all fetch call to news api and handles response
function getNews(queries, searchTerm) {
  const options = {
    headers: new Headers({
      'x-rapidapi-host': rapidApiHost,
      'x-rapidapi-key': rapidApiKey,
      'x-bingapis-sdk': 'true'})
  };

  let requests = [];
  for (let i = 0; i < queries.length; i++) {
    const params = {
      q: queries[i],
      count: 5,
      sortBy: 'relevance'
    };
    const queryString = formatQueryParams(params)
    const url = searchUrl + '?' + queryString;

    console.log(url);

 
    requests.push(fetch(url, options));
  }

  Promise.all(requests)
    .then(responses => Promise.all(responses.map(r => r.json())))

    .then(responseJson => createNewResponse(responseJson, searchTerm))

    .catch(err => {
      errorHtml(err);
      console.log(err);
    });
  
}

// assigns params to query and passes url into fetch call.  Handles response
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
      return response.json();
    })
    .then(responseJson => displayImageResults(responseJson))
    .catch(err => {
      console.log(err);
    });
}

// handles submit button click
function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-topic').val();
    emptyErrorMessage();
    getColorNews(searchTerm);
    handleImageQuery(searchTerm)
    handleAbout();
    handleFooterButtons();
  });
}

// handles about button click
function watchAbout() {
  $('.js-about-button').on('click', function(event) {
    renderAboutFooter();
    handleScreenJump();
  });
}

// handles article toggle button click and runs resetSingleScroller function
function watchCategoryToggle() {
  $('.toggle-button').on('click', function(event) {
    let articleScroller = $(this).closest('section').find('.articles-scroller');
    let articleElement = $(this).closest('section').attr('id');

    articleScroller.toggleClass('hidden');

    resetSingleScroller(articleScroller, articleElement);
  });
}

// handles footer toggle click
function watchFooterToggle() {
  $('.js-footer-button').on('click', function(event) {
    handleFooterToggle();
    handleScreenJump();
  });
}

function handlePurplePress() {
  watchForm();
  watchAbout();
  watchCategoryToggle();
  watchFooterToggle();
}

$(handlePurplePress);

