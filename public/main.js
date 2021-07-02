// Foursquare API Info
const clientId = 'insert your own';
const clientSecret = 'insert your own';
const url = 'https://api.foursquare.com/v2/venues/explore?near='; //added ?near= to endpoint

// OpenWeather Info
const openWeatherKey = 'insert your own';
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4")];
const $weatherDiv = $("#weather1");
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// AJAX functions:
const getVenues = async () => {
  try{
  const city = $input.val()
  urlToFetch = `${url}${city}&limit=10&client_id=${clientId}&client_secret=${clientSecret}&v=20180101`
  const response = await fetch(urlToFetch)
  if (response.ok) {
    console.log('log 1', response)
    const jsonResponse = await response.json();
    console.log('log 2', jsonResponse)
    const venues = jsonResponse.response.groups[0].items.map(item => item.venue)
    console.log('log 3', venues)
    return venues
  }
  else {
    throw new Error('Request failed!');
  }
  } catch (error) {
    console.log(error)
  }
}

const getForecast = async () => {
  urlToFetch = `${weatherUrl}?&q=${$input.val()}&APPID=${openWeatherKey}`
  try {
    const response = await fetch(urlToFetch)
    if (response.ok) {
      const jsonResponse = await response.json();
      console.log('log4', jsonResponse);
      return jsonResponse
    }
    else {
      throw new Error('Request failed!');
    }

  } catch (error) {
    console.log(error)
  }
}

// Render functions
const renderVenues = (venues) => {
  $venueDivs.forEach(($venue, index) => {
    // Add your code here:
    const venue = venues[index]
    const venueIcon = venue.categories[0].icon
    console.log(venueIcon)
    const venueImgSrc = `${venueIcon.prefix}bg_64${venueIcon.suffix}`
    let venueContent = createVenueHTML(venue.name, venue.location, venueImgSrc);
    $venue.append(venueContent);
  });
  $destination.append(`<h2>${venues[0].location.city}</h2>`);
}

const renderForecast = (day) => {
  // Add your code here:
  let weatherContent = createWeatherHTML(day)
  $weatherDiv.append(weatherContent);
}

// Execute search function for button

const executeSearch = () => {
  $venueDivs.forEach(venue => venue.empty());
  $weatherDiv.empty();
  $destination.empty();
  $container.css("visibility", "visible");
  getVenues().then(venues => renderVenues(venues))
  getForecast().then(forecast => renderForecast(forecast))
  return false;
}

$submit.click(executeSearch)
