'use strict'

// -------------------------------------- Carousel functionality --------------------------------------
let prevArrow = document.querySelector('#leftArrow');
let nextArrow = document.querySelector('#rightArrow');
let forecastBox = document.querySelector('#nowBox');
let carousel = document.querySelector('#carousel');

let forecastBoxStyle = window.getComputedStyle(forecastBox);
let forecastBoxWidth = 2 * parseFloat(forecastBoxStyle.marginRight) + parseFloat(forecastBoxStyle.width)
let forecastBoxHeight = parseFloat(forecastBoxStyle.height);

let clickCounter = 0;

function scrollToNext(){
    carousel.scrollBy({
        left: forecastBoxWidth, top: 0, behavior: 'smooth'
    });
    clickCounter ++;
}

function scrollToPrev(){
    carousel.scrollBy({
        left: -forecastBoxWidth, top: 0, behavior: 'smooth'
    });
    clickCounter --;
}

nextArrow.addEventListener('click', scrollToNext);
prevArrow.addEventListener('click', scrollToPrev);

carousel.style.width = forecastBoxWidth * 4 + 100;
carousel.style.height = forecastBoxHeight + 50;

// -------------------------------- Carousel circle buttons -------------------------------
let dotNavs = document.querySelectorAll('.dotNav');
let firstDot = document.querySelector('#firstDot');
let secondDot = document.querySelector('#secondDot');
let thirdDot = document.querySelector('#thirdDot');

firstDot.classList.add('dotNavActive');

//Dynamically set activeDot
function setActiveDot(){
    if (clickCounter < 4)
    {
        firstDot.classList.add('dotNavActive');
        secondDot.classList.remove('dotNavActive');
        thirdDot.classList.remove('dotNavActive');
    }
    else if (clickCounter >= 4 && clickCounter < 8)
    {
        firstDot.classList.remove('dotNavActive');
        secondDot.classList.add('dotNavActive');
        thirdDot.classList.remove('dotNavActive');
    }
    else if (clickCounter >= 8)
    {
        firstDot.classList.remove('dotNavActive');
        secondDot.classList.remove('dotNavActive');
        thirdDot.classList.add('dotNavActive');
    }
}

nextArrow.addEventListener('click', setActiveDot);
prevArrow.addEventListener('click', setActiveDot);


//Allow for clicking of dots to navigate
function findActiveDot(){
    for (let i = 0; i <= dotNavs.length; i++)
    {
        if (dotNavs[i].classList.contains('dotNavActive'))
        {
            return (i + 1);
        }
    }
}

function scrollForwardByFour(){
    carousel.scrollBy({
        left: (4 * forecastBoxWidth), top: 0, behavior: 'smooth'
    });
    clickCounter = clickCounter + 4;
}

function scrollForwardByEight(){
    carousel.scrollBy({
        left: (8 * forecastBoxWidth), top: 0, behavior: 'smooth'
    });
    clickCounter = clickCounter + 8;
}

function scrollBackByFour(){
    carousel.scrollBy({
        left: -(4 * forecastBoxWidth), top: 0, behavior: 'smooth'
    });
    clickCounter = clickCounter - 4;
}

function scrollBackByEight(){
    carousel.scrollBy({
        left: -(8 * forecastBoxWidth), top: 0, behavior: 'smooth'
    });
    clickCounter = clickCounter - 8;
}

function scroll(){
    let activeDotNum = findActiveDot();
    // console.log(`activeDotNum: ${activeDotNum}`);
    let activeDotElement = dotNavs[activeDotNum - 1];
    let nextDotID = this.id;
    let nextDotElement = document.querySelector(`#${nextDotID}`);
    let nextDotNum = 0;

    //convert goToDot to an int
    if (nextDotID === 'firstDot')
    {
        nextDotNum = 1;
    }
    else if (nextDotID === 'secondDot')
    {
        nextDotNum = 2;
    }
    else if (nextDotID === 'thirdDot')
    {
        nextDotNum = 3;
    }
    // console.log(`nextDot: ${nextDotNum}`);

    if ((nextDotNum - activeDotNum) === 1 )
    {
        // console.log('scrolling forward')
        scrollForwardByFour();
        activeDotElement.classList.toggle('dotNavActive');
        nextDotElement.classList.add('dotNavActive');
    }
    else if ((nextDotNum - activeDotNum) === 2 )
    {
        // console.log('scrolling forward twice!')
        scrollForwardByEight();
        activeDotElement.classList.toggle('dotNavActive');
        nextDotElement.classList.add('dotNavActive');
    
    }
    else if ((nextDotNum - activeDotNum) === -1)
    {
        // console.log('scrolling backwards')
        scrollBackByFour();
        activeDotElement.classList.toggle('dotNavActive');
        nextDotElement.classList.add('dotNavActive');
    }
    else if ((nextDotNum - activeDotNum) === -2 )
    {
        // console.log('scrolling backs twice!')
        scrollBackByEight();
        activeDotElement.classList.toggle('dotNavActive');
        nextDotElement.classList.add('dotNavActive');
    }
}

for (let i = 0; i < dotNavs.length; i++){
    dotNavs[i].addEventListener('click', scroll);
}

//------------------------- Get location + Current Conditions ------------------------------
let locationInputElement = document.querySelector('#locationInput');
let strUserLocation = 'userLocation';
let currTemp = document.querySelector('#currTemp');
let currCondition = document.querySelector('#currCondition');
let highTemp = document.querySelector('#highTemp');
let lowTemp = document.querySelector('#lowTemp');


async function getLocationKey(location) {
    let response = await axios.get(`https://dataservice.accuweather.com/locations/v1/cities/search?apikey=mZDDGnloK5jU8t1fbOA952AYshZ4mJYN&q=${location}`)
    // console.log(`location key: ${response.data[0].Key}`);
    return response.data[0].Key;
}

async function getCurrTemp(key){
    // let key = await getLocationKey(key);
    await axios.get(`https://dataservice.accuweather.com/currentconditions/v1/${key}?apikey=mZDDGnloK5jU8t1fbOA952AYshZ4mJYN`)
        .then(function (response) {
            let temp = response.data[0].Temperature.Imperial.Value;
            currTemp.innerText = temp;
        })
        .catch(function (error) {
            console.log(error);
        })
}

async function getCurrCondition(key){
    // let key = await getLocationKey(key);
    await axios.get(`https://dataservice.accuweather.com/currentconditions/v1/${key}?apikey=mZDDGnloK5jU8t1fbOA952AYshZ4mJYN`)
        .then(function (response) {
            let condition = response.data[0].WeatherText;
            currCondition.innerText = condition;
        })
        .catch(function (error) {
            console.log(error);
        })
}

async function getHighTemp(key){
    // let key = await getLocationKey(key);
    await axios.get(`https://dataservice.accuweather.com/forecasts/v1/daily/1day/${key}?apikey=mZDDGnloK5jU8t1fbOA952AYshZ4mJYN`)
    .then(function (response) {
        let htemp = response.data.DailyForecasts[0].Temperature.Maximum.Value;
        highTemp.innerText = htemp;
    })
    .catch(function (error) {
        console.log(error);
    })
}

async function getLowTemp(key){
    // let key = await getLocationKey(key);
    await axios.get(`https://dataservice.accuweather.com/forecasts/v1/daily/1day/${key}?apikey=mZDDGnloK5jU8t1fbOA952AYshZ4mJYN`)
    .then(function (response) {
        let ltemp = response.data.DailyForecasts[0].Temperature.Minimum.Value;
        lowTemp.innerText = ltemp;
    })
    .catch(function (error) {
        console.log(error);
    })
}


//------------------------- Get Hourly Forecast Conditions ------------------------------
let forecastTemps = document.querySelectorAll('.forecastTemp');
let timeLabels = document.querySelectorAll('.timeLabel');

async function getHourlyTemps(key){
    await axios.get(`https://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${key}?apikey=mZDDGnloK5jU8t1fbOA952AYshZ4mJYN`)
    .then(function (response) {
        let hourlyData = response.data
        console.log(hourlyData);
        console.log(hourlyData[0].DateTime);
        
        for(let i = 0; i < forecastTemps.length; i++)
        {
            //set times
            let time = hourlyData[i].DateTime;
            time = time.substr(time.indexOf('T') + 1,5);
            timeLabels[i].innerHTML = time;

            //set temps
            forecastTemps[i].innerText = hourlyData[i].Temperature.Value

            //set background image + color
        }
    })
    .catch(function (error) {
        console.log(error);
    })
    
}



//------------------------- Set All Conditions ------------------------------
locationInputElement.addEventListener('change', async function() {
    if (locationInputElement.value === null || locationInputElement.value === '')
    {
        strUserLocation = 'No location entered';
    }
    else
    {
        strUserLocation = locationInputElement.value;
        console.log(strUserLocation);
        let key = await getLocationKey(strUserLocation);
        getCurrTemp(key);
        getCurrCondition(key);
        getHighTemp(key);
        getLowTemp(key);
        getHourlyTemps(key);
    }
})





    

