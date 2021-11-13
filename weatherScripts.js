'use strict'

// ---------------------------- Carousel functionality ----------------------------
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


//----------------------- Set background image + color based on weather----------------------------
//Get objects
let header = document.querySelector('header');
let inputBox = document.querySelector('#locationInput');
let currWeatherSection = document.querySelector('#currWeatherSection');
let weatherIconDiv = document.querySelector('#weatherIconDiv');
let currTempBox = document.querySelector('#currTempBox');
let weatherBoxes = document.querySelectorAll('.weatherBox');
let hourlyTemp = document.querySelectorAll('.hourlyTemp')

//get weather colors + icons
let sunColor = '#FFE194';
let sunImg = "url('Assets/sun.svg')";

let mostlySunnyColor = '#FFEFC9';
let mostlySunnyImg = "url('Assets/mostlySunny.svg')";

let mostlyCloudyColor = '#FCF3DE';
let mostlyCloudyImg = "url('Assets/mostlyCloudy.svg')";

let nightColor = '#363F61';
let nightLineColor = '#DBD9D5'

let clearNightImg = "url('Assets/moon.svg')";
let mostlyClearNightImg = "url('Assets/mostlyClearmoon.svg')";
let mostlyCloudyNightImg = "url('Assets/cloudyMoon.svg')";
let cloudyNightImg = "url('Assets/nightCloud.svg')";

let cloudColor = '#E6EEF2';
let cloudImg = "url('Assets/cloud.svg')";

let rainColor = '#AECFE6';
let rainImg = "url('Assets/raincloud.svg')";
let nightRainImg = "url('Assets/nightRain.svg')";

let snowColor = '#FAFAFA';
let snowImg = "url('Assets/snow.svg')";
let nightSnowImg = "url('Assets/nightSnow.svg')";

let hailImg = "url('Assets/hail.svg')";
let nightHailImg = "url('Assets/nightHail.svg')";

let sleetImg = "url('Assets/sleet.svg')";
let nightSleetImg = "url('Assets/nightSleet.svg')";

let windColor = '#FFFEFA';
let windImg = "url('Assets/wind.svg')";
let nightWindImg = "url('Assets/nightWind.svg')";

let hazeColor = '#E3DDD5';
let hazeImg = "url('Assets/haze.svg')";
let nightHazeImg =  "url('Assets/nightimeHaze.svg')";

let stormColor = '#B8B8B8';
let stormImg = "url('Assets/stormCloud.svg')";
let nightStormImg = "url('Assets/nightStorm.svg')";


function setBackgroundColor(weather, isDaylight, element){
    if (isDaylight === false)
    {
        element.style.backgroundColor = nightColor;
        element.style.color = nightLineColor;

    }
    else if (isDaylight === true)
    {
        element.style.color = 'black';
        switch(weather){
            case 'Sunny':
                element.style.backgroundColor = sunColor;
                break;

            case 'Showers':
            case 'Mostly Cloudy w/ Showers':
            case 'Rain':
                element.style.backgroundColor = rainColor;
                break;

            case 'Cloudy':
            case 'Dreary (Overcast)':
                    element.style.backgroundColor = cloudColor;                
                break;
            
            case 'Mostly Sunny':
            case 'Partly Sunny':
                element.style.backgroundColor = mostlySunnyColor;
                break;

            case 'Intermittent Clouds':
            case 'Mostly Cloudy':
                element.style.backgroundColor = mostlyCloudyColor;
                break;
            
            case 'Flurries':
            case 'Partly Sunny w/ Flurries':
            case 'Mostly Cloudy w/ Flurries':
            case 'Mostly Cloudy w/ Snow':
            case 'Snow':
            case 'Ice':
            case 'Freezing Rain':
            case 'Sleet':
            case 'Rain and Snow':
                element.style.backgroundColor = snowColor;
                break;

            case 'Windy':
                element.style.backgroundColor = windColor;
                break;
            
            case 'Hazy Sunshine':
            case 'Fog':
                element.style.backgroundColor = hazeColor;
                break;
            
            case 'T-Storms':
            case 'Mostly Cloudy w/ T-Storms':
            case 'Partly Sunny w/ T-Storms':
                element.style.backgroundColor = stormColor;
                break;
        }
    }
}

function setWholeBackground(weather, isDaylight, element){
    setBackgroundColor(weather, isDaylight, element);
    switch(weather){
        case 'Showers':
        case 'Mostly Cloudy w/ Showers':
        case 'Partly Cloudy w/ Showers':
        case 'Rain':
            if (isDaylight === true)
            {
                element.style.backgroundImage = rainImg;
            }
            else if (isDaylight === false)
            {
                element.style.backgroundImage = nightRainImg;
            }

            if(element === weatherIconDiv){
                currTempBox.style.top = '9.5vh';
                currTempBox.style.left = '1.7vw';
            }
            break;

        case 'Sunny':
            element.style.backgroundImage = sunImg;
            if(element === weatherIconDiv){
                currTempBox.style.top = '6.5%';
                currTempBox.style.left = '1.25%';
            }
            break;

        //night
        case 'Clear':
            element.style.backgroundImage = clearNightImg;
            if(element === weatherIconDiv){
                currTempBox.style.marginTop = '0%';
                currTempBox.style.marginLeft = '250px';
            }
            break;
        
        case 'Mostly Sunny':
        case 'Partly Sunny':
            element.style.backgroundImage = mostlySunnyImg;
            if(element === weatherIconDiv){
                currTempBox.style.top = '76px';
                currTempBox.style.left = '-33px';
            }
            break;
        
        //night
        case 'Mostly Clear':
        case 'Partly Cloudy':
            element.style.backgroundImage = mostlyClearNightImg;
            if(element === weatherIconDiv){
                currTempBox.style.top = '95px';
                currTempBox.style.left = '55px';
            }
            break;
        
        case 'Intermittent Clouds':
        case 'Mostly cloudy':
            if (isDaylight === true)
            {
                element.style.backgroundImage = mostlyCloudyImg;
                if(element === weatherIconDiv){
                    currTempBox.style.top = '140px';
                    currTempBox.style.left = '85px';
                }
            }
            else if (isDaylight === false)
            {
                element.style.backgroundImage = mostlyCloudyNightImg;
                if(element === weatherIconDiv){
                    currTempBox.style.top = '95px';
                    currTempBox.style.left = '55px';
                }
            }
            break;
                
        case 'Cloudy':
        case 'Dreary (Overcast)':
            if (isDaylight === true)
            {
                element.style.backgroundImage = cloudImg;
            }
            else if (isDaylight === false)
            {
                element.style.backgroundImage = cloudyNightImg;
                
            }

            if(element === weatherIconDiv)
            {
                currTempBox.style.top = '75px';
                currTempBox.style.left = '25px';
            }
            else if (element.parentElement.parentElement === carousel)
            {
                element.childNodes[1].style.top = '3px';
            }
            break

        case 'Flurries':
        case 'Partly Sunny w/ Flurries':
        case 'Mostly Cloudy w/ Flurries':
        case 'Mostly Cloudy w/ Snow':
        case 'Snow':
            if (isDaylight === true)
            {
                element.style.backgroundImage = snowImg;  
            }
            else if (isDaylight === false)
            {
                element.style.backgroundImage = nightSnowImg;
            }

            if(element === weatherIconDiv){
                currTempBox.style.marginTop = '-10.5%';
                currTempBox.style.marginLeft = '40px';
            }
            break;
        
        case 'Ice':
        case 'Freezing Rain':
            if (isDaylight === true)
            {
                element.style.backgroundImage = hailImg;
                
            }
            else if (isDaylight === false)
            {
                element.style.backgroundImage = nightHailImg;
            }
            if(element === weatherIconDiv){
                currTempBox.style.marginTop = '-10.5%';
                currTempBox.style.marginLeft = '40px';
            }
            break;

        case 'Sleet':
        case 'Rain and Snow':
            if (isDaylight === true)
            {
                element.style.backgroundImage = sleetImg;
                
            }
            else if (isDaylight === false)
            {
                element.style.backgroundImage = nightSleetImg;
            }
            if(element === weatherIconDiv){
                currTempBox.style.marginTop = '-10.5%';
                currTempBox.style.marginLeft = '40px';
            }
            break;
        
        case 'Windy':
            if (isDaylight === true)
            {
                element.style.backgroundImage = windImg;
                
            }
            else if (isDaylight === false)
            {
                element.style.backgroundImage = nightWindImg;
            }
            if(element === weatherIconDiv){
                currTempBox.style.top = '70px';
                currTempBox.style.left = '20px';
            }
            break;

        case 'Hazy Sunshine':
        case 'Hazy Moonlight':
        case 'Fog':
            if (isDaylight === true)
            {
                element.style.backgroundImage = hazeImg;
            }
            else if (isDaylight === false)
            {
                element.style.backgroundImage = nightHazeImg;
            }            
            if(element === weatherIconDiv){
                currTempBox.style.top = '55px';
                currTempBox.style.left = '20px';
            }
            break;
        
            case 'T-Storms':
            case 'Mostly Cloudy w/ T-Storms':
            case 'Partly Sunny w/ T-Storms':
                if (isDaylight === true)
                {
                    element.style.backgroundImage = stormImg;                    
                }
                else if (isDaylight === false)
                {
                    element.style.backgroundImage = nightStormImg;
                }
                if(element === weatherIconDiv){
                    currTempBox.style.top = '-5px';
                    currTempBox.style.left = '20px';
                }
                break;
    }
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
            // console.log(response);
            let currIsDaytime = response.data[0].IsDayTime;
            let condition = response.data[0].WeatherText;
            currCondition.innerText = condition;
            setWholeBackground(condition, currIsDaytime, weatherIconDiv);
            setBackgroundColor(condition, currIsDaytime, currWeatherSection);
            // setBackgroundColor(condition, currIsDaytime, header);
            // setBackgroundColor(condition, currIsDaytime, inputBox);
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
        // console.log(hourlyData);
        // console.log(hourlyData[0].DateTime);
        
        for(let i = 0; i < forecastTemps.length; i++)
        {
            //set times
            let time = hourlyData[i].DateTime;
            time = time.substr(time.indexOf('T') + 1,5);
            timeLabels[i].innerHTML = time;

            //set temps
            forecastTemps[i].innerText = hourlyData[i].Temperature.Value

            //check if it's day vs night
            let isDaylight = hourlyData[i].IsDaylight;
            // console.log(isDaylight);

            //set background image + color
            let condition = hourlyData[i].IconPhrase;
            setWholeBackground(condition, isDaylight, weatherBoxes[i]);
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


//------------------------- Handle Nav Clicks ------------------------------
let navLinks = document.querySelectorAll('.navBox');
// console.log(navLinks);

for (let i = 0; i < navLinks.length; i++){
    navLinks[i].addEventListener('click', function(event){
        // console.log(`target: ${event.target}`);
        // console.log(event.target);
       
        for (let i = 0; i < navLinks.length; i++)
        {
            // console.log(navLinks[i].childNodes[3]);
            if (navLinks[i].childNodes[3] === event.target)
            {
                console.log(event.target.parentElement.childNodes[1]);
                event.target.parentElement.childNodes[1].style.backgroundColor = 'rgb(97, 176, 182)'
            }
            else
            {
                navLinks[i].childNodes[1].style.backgroundColor = 'rgb(255, 251, 246)'; 
            }
        }
    })
}