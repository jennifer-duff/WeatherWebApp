'use strict'

// -------------------------------------- Carousel functionality --------------------------------------
let prevArrow = document.querySelector('#leftArrow');
let nextArrow = document.querySelector('#rightArrow');
let forecastBox = document.querySelector('#nowBox');
let carousel = document.querySelector('#carousel');

let forecastBoxStyle = window.getComputedStyle(forecastBox);
let forecastBoxWidth = 2 * parseFloat(forecastBoxStyle.marginRight) + parseFloat(forecastBoxStyle.width)

let forecastBoxHeight = parseFloat(forecastBoxStyle.height);

function scrollToNext(){
    carousel.scrollBy({
        left: forecastBoxWidth, top: 0, behavior: 'smooth'
    });
}

function scrollToPrev(){
    carousel.scrollBy({
        left: -forecastBoxWidth, top: 0, behavior: 'smooth'
    });
}

nextArrow.addEventListener('click', scrollToNext);
prevArrow.addEventListener('click', scrollToPrev);

carousel.style.width = forecastBoxWidth * 4 + 100;
carousel.style.height = forecastBoxHeight + 50;

// ------------------------ Get location ------------------------
let locationInput = document.querySelector('#locationInput');
let userLocation = 'No location entered';
let currTemp = document.querySelector('#currTemp');
let currCondition = document.querySelector('#currCondition');
let highTemp = document.querySelector('#highTemp');
let lowTemp = document.querySelector('#lowTemp');


// async function getLocationKey(location) {
//     let response = await axios.get(`https://dataservice.accuweather.com/locations/v1/cities/search?apikey=mZDDGnloK5jU8t1fbOA952AYshZ4mJYN&q=${location}`)
//     console.log(response.data[0].Key);
//     return response.data[0].Key;
// }


// function getCurrTemp(location){
//     fetch(`api.openweathermap.org/data/2.5/weather?q=${userLocation}&appid=c048f88116ccffee3cd998306cd22534`)
//     .then(function (response){
//         return response.json()
//     })
    // .then(function(data){
    //     console.log(data);
    // })
//}


async function getCurrTemp(location){
    await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Seattle&units=imperial&appid=c048f88116ccffee3cd998306cd22534`)
        .then(function (response) {
            let temp = Math.floor(response.data.main.temp);
            currTemp.innerHTML = temp;
        })
        .catch(function (error) {
            console.log(error);
        })
}

// async function getCurrCondition(location){
//     let key = await getLocationKey(location);
//     await axios.get(`https://dataservice.accuweather.com/currentconditions/v1/${key}?apikey=mZDDGnloK5jU8t1fbOA952AYshZ4mJYN`)
//         .then(function (response) {
//             let condition = response.data[0].WeatherText;
//             currCondition.innerText = condition;
//         })
//         .catch(function (error) {
//             console.log(error);
//         })
// }

// async function getHighTemp(location){
//     let key = await getLocationKey(location);
//     await axios.get(`https://dataservice.accuweather.com/forecasts/v1/daily/1day/${key}?apikey=mZDDGnloK5jU8t1fbOA952AYshZ4mJYN`)
//     .then(function (response) {
//         console.log(response);
//         let htemp = response.data.DailyForecasts[0].Temperature.Maximum.Value;
//         highTemp.innerText = htemp;
//     })
//     .catch(function (error) {
//         console.log(error);
//     })
// }

// async function getLowTemp(location){
//     let key = await getLocationKey(location);
//     await axios.get(`https://dataservice.accuweather.com/forecasts/v1/daily/1day/${key}?apikey=mZDDGnloK5jU8t1fbOA952AYshZ4mJYN`)
//     .then(function (response) {
//         console.log(response);
//         let ltemp = response.data.DailyForecasts[0].Temperature.Minimum.Value;
//         lowTemp.innerText = ltemp;
//     })
//     .catch(function (error) {
//         console.log(error);
//     })
// }


locationInput.addEventListener('change', function() {
    if (locationInput.value === null || locationInput.value === '')
    {
        userLocation = 'No location entered';
    }
    else
    {
        userLocation = locationInput.value;
        console.log(userLocation);
        getCurrTemp(userLocation);
        // getCurrCondition(userLocation);
        // getHighTemp(userLocation);
        // getLowTemp(userLocation);
    }
})



    

