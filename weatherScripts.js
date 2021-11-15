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
// let currTemp = document.querySelector('#currTemp');
let weatherBoxes = document.querySelectorAll('.weatherBox');
let hourlyTemp = document.querySelectorAll('.hourlyTemp')

//get weather colors + icons
let sunColor = '#FFE194';
let sunImg = "url('Assets/sun.svg')";

let mostlySunnyColor = '#FFEFC9';
let mostlySunnyImg = "url('Assets/mostlySunny.svg')";

let mostlyCloudyColor = '#FCF3DE';
let mostlyCloudyImg = "url('Assets/mostlyCloudy.svg')";

let partSunWithRainColor = '#F9F3E8';
let partSunWithRainImg = "url('Assets/partlySunnyWithRain.svg')";

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
        switch(weather.toLowerCase()){
            case 'sunny':
                element.style.backgroundColor = sunColor;
                break;
            
            case 'showers':
            case 'mostly cloudy w/ showers':
            case 'rain':
                element.style.backgroundColor = rainColor;
                break;

            case 'cloudy':
            case 'dreary (overcast)':
                    element.style.backgroundColor = cloudColor;                
                break;
            
            case 'mostly sunny':
            case 'partly sunny':
                element.style.backgroundColor = mostlySunnyColor;
                break;

            case 'intermittent clouds':
            case 'mostly cloudy':
                element.style.backgroundColor = mostlyCloudyColor;
                break;
            
            case 'flurries':
            case 'partly sunny w/ flurries':
            case 'mostly cloudy w/ clurries':
            case 'mostly cloudy w/ snow':
            case 'snow':
            case 'ice':
            case 'freezing rain':
            case 'sleet':
            case 'rain and snow':
                element.style.backgroundColor = snowColor;
                break;

            case 'windy':
                element.style.backgroundColor = windColor;
                break;
            
            case 'hazy sunshine':
            case 'fog':
                element.style.backgroundColor = hazeColor;
                break;
            
            case 't-storms':
            case 'mostly cloudy w/ t-storms':
            case 'partly sunny w/ t-storms':
                element.style.backgroundColor = stormColor;
                break;

            case 'partly sunny w/ showers':
                element.style.backgroundColor = partSunWithRainColor;
                break;
        }
    }
}

function setWholeBackground(weather, isDaylight, element){
    setBackgroundColor(weather, isDaylight, element);
    switch(weather.toLowerCase()){
        case 'showers':
        case 'mostly cloudy w/ showers':
        case 'partly cloudy w/ showers':
        case 'rain':
            if (isDaylight === true)
            {
                element.style.backgroundImage = rainImg;
            }
            else if (isDaylight === false)
            {
                element.style.backgroundImage = nightRainImg;
            }

            if(element === weatherIconDiv){
                currTemp.style.top = '9.5vh';
                currTemp.style.left = '1.7vw';
            }
            break;
    
        case 'sunny':
            element.style.backgroundImage = sunImg;
            break;

        //night
        case 'clear':
            element.style.backgroundImage = clearNightImg;
            break;
        
        case 'mostly sunny':
        case 'partly sunny':
            element.style.backgroundImage = mostlySunnyImg;
            break;
        
        //night
        case 'mostly clear':
        case 'partly cloudy':
            element.style.backgroundImage = mostlyClearNightImg;
            break;
        
        case 'intermittent clouds':
        case 'mostly cloudy':
            if (isDaylight === true)
            {
                element.style.backgroundImage = mostlyCloudyImg;
            }
            else if (isDaylight === false)
            {
                element.style.backgroundImage = mostlyCloudyNightImg;
            }
            break;
                
        case 'cloudy':
        case 'dreary (overcast)':
            if (isDaylight === true)
            {
                element.style.backgroundImage = cloudImg;
            }
            else if (isDaylight === false)
            {
                element.style.backgroundImage = cloudyNightImg;
                
            }

            if (element.parentElement.parentElement === carousel)
            {
                element.childNodes[1].style.top = '3px';
            }
            break;

        

        case 'flurries':
        case 'partly sunny w/ flurries':
        case 'mostly cloudy w/ flurries':
        case 'mostly cloudy w/ snow':
        case 'snow':
            if (isDaylight === true)
            {
                element.style.backgroundImage = snowImg;  
            }
            else if (isDaylight === false)
            {
                element.style.backgroundImage = nightSnowImg;
            }
            break;
        
        case 'ice':
        case 'freezing rain':
            if (isDaylight === true)
            {
                element.style.backgroundImage = hailImg;
                
            }
            else if (isDaylight === false)
            {
                element.style.backgroundImage = nightHailImg;
            }
            break;

        case 'sleet':
        case 'rain and snow':
            if (isDaylight === true)
            {
                element.style.backgroundImage = sleetImg;
                
            }
            else if (isDaylight === false)
            {
                element.style.backgroundImage = nightSleetImg;
            }
            break;
        
        case 'windy':
            if (isDaylight === true)
            {
                element.style.backgroundImage = windImg;
                
            }
            else if (isDaylight === false)
            {
                element.style.backgroundImage = nightWindImg;
            }
            break;

        case 'hazy sunshine':
        case 'hazy moonlight':
        case 'fog':
            if (isDaylight === true)
            {
                element.style.backgroundImage = hazeImg;
            }
            else if (isDaylight === false)
            {
                element.style.backgroundImage = nightHazeImg;
            }            
            break;
        
            case 't-Storms':
            case 'mostly cloudy w/ t-storms':
            case 'partly sunny w/ t-storms':
                if (isDaylight === true)
                {
                    element.style.backgroundImage = stormImg;                    
                }
                else if (isDaylight === false)
                {
                    element.style.backgroundImage = nightStormImg;
                }
                break;

            case 'partly sunny w/ showers':
                element.style.backgroundImage = partSunWithRainImg;
                break;
    }
}

function setConditionLabel(condition, linkingWord, element){
    // let currIsDaytime = response.data[0].IsDayTime;
    // let condition = response.data[0].WeatherText;
    // console.log(condition);
    element.innerText = condition.toLowerCase();
    switch (condition)
    {
        case 'Intermittent Clouds':
        case 'Hazy Sunshine':
        case 'Fog':
        case 'Showers':
        case 'T-Storms':
        case 'Rain':
        case 'Flurries':
        case 'Snow':
        case 'Ice':
        case 'Sleet':
        case 'Freezing Rain':
        case 'Rain and Snow':
        case 'Intermittent Clouds':
        case 'Hazy Moonlight':
            linkingWord.innerText = 'with';
            break;
        default:
            linkingWord.innerText = 'and';
    }
}

//------------------------- Get location + Current Conditions ------------------------------
let locationInputElement = document.querySelector('#locationInput');
let strUserLocation = 'userLocation';
let currTemp = document.querySelector('#currTemp');
let currWeather = document.querySelector('#currWeather');
let currLinkingWord = document.querySelector('#linkingWord');
let highTemp = document.querySelector('#highTemp');
let lowTemp = document.querySelector('#lowTemp');
let key = ''



async function getLocationKey(location) {
    let response = await axios.get(`https://dataservice.accuweather.com/locations/v1/cities/search?apikey=mZDDGnloK5jU8t1fbOA952AYshZ4mJYN&q=${location}`)
        .then(function (response){
            // console.log(`location key: ${response.data[0].Key}`);
            key = response.data[0].Key;
            return response.data[0].Key;
        })
        .catch(function (error){
            console.log(error);
        })
}


//TODO: Combine getCurrTemp() and getCurrCondition() to reduce num API calls
// async function getCurrTemp(key){
//     // let key = await getLocationKey(key);
//     await axios.get(`https://dataservice.accuweather.com/currentconditions/v1/${key}?apikey=mZDDGnloK5jU8t1fbOA952AYshZ4mJYN`)
//         .then(function (response) {
//             let temp = response.data[0].Temperature.Imperial.Value;
//             currTemp.innerText = temp;
//         })
//         .catch(function (error) {
//             console.log(error);
//         })
// }

async function getCurrCondition(key){
    // let key = await getLocationKey(key);
    await axios.get(`https://dataservice.accuweather.com/currentconditions/v1/${key}?apikey=mZDDGnloK5jU8t1fbOA952AYshZ4mJYN`)
        .then(function (response) {
            // console.log(response);

            //set current temp label
            let temp = response.data[0].Temperature.Imperial.Value;
            currTemp.innerText = temp;

            //set current condition label
            let currIsDaytime = response.data[0].IsDayTime;
            let condition = response.data[0].WeatherText;
            let element = currWeather;
            let linkingWord = currLinkingWord;
            setConditionLabel(condition, linkingWord, element);
            setWholeBackground(condition, currIsDaytime, weatherIconDiv);
            setBackgroundColor(condition, currIsDaytime, currWeatherSection);
        })
        .catch(function (error) {
            console.log(error);
        })
}

//TODO: Combine getHighTemp and getLowTemp to reduce num API calls
async function getHighLowTemps(key){
    // let key = await getLocationKey(key);
    await axios.get(`https://dataservice.accuweather.com/forecasts/v1/daily/1day/${key}?apikey=mZDDGnloK5jU8t1fbOA952AYshZ4mJYN`)
    .then(function (response) {
        let htemp = response.data.DailyForecasts[0].Temperature.Maximum.Value;
        highTemp.innerText = htemp;

        let ltemp = response.data.DailyForecasts[0].Temperature.Minimum.Value;
        lowTemp.innerText = ltemp;
    })
    .catch(function (error) {
        console.log(error);
    })
}

// async function getLowTemp(key){
//     // let key = await getLocationKey(key);
//     await axios.get(`https://dataservice.accuweather.com/forecasts/v1/daily/1day/${key}?apikey=mZDDGnloK5jU8t1fbOA952AYshZ4mJYN`)
//     .then(function (response) {
//         let ltemp = response.data.DailyForecasts[0].Temperature.Minimum.Value;
//         lowTemp.innerText = ltemp;
//     })
//     .catch(function (error) {
//         console.log(error);
//     })
// }


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

//------------------------- Get 5-Day Forecast ------------------------------
let dayTiles = document.querySelectorAll('.dayTile');
let dates = document.querySelectorAll('.date')
let dailyAvgTemps = document.querySelectorAll('.fiveDayTemp');
let dailyHeaderConditions = document.querySelectorAll('.fiveDayWeather');
let dailyLinkingWord = document.querySelectorAll('.fiveDayLinkingWord');
let dailyConditionBoxes = document.querySelectorAll('.conditionBox');
let dailyHighTemps = document.querySelectorAll('.highTempLabel');
let dailyLowTemps = document.querySelectorAll('.lowTempLabel')
let dailyChanceRain = document.querySelectorAll('.chanceRain');

function getDate(){
    let datesArray = [];
    let currDateTime = new Date();
    let localDateTime = currDateTime.toLocaleString();
    datesArray.push(localDateTime);
    // console.log(datesArray[0]);


    for (let i = 0 ; i < 5; i++)
    {
        let tomorrow = new Date(datesArray[i]);
        tomorrow.setDate(tomorrow.getDate() + 1);
        let localTomorrow = tomorrow.toLocaleString();
        // console.log(localTomorrow);
        datesArray.push(localTomorrow);
    }
    
    for (let i = 0 ; i <= 5; i++)
    {
        datesArray[i] = datesArray[i].toString();
        datesArray[i] = datesArray[i].substring(0, 5);
    }

    // console.log(datesArray);
    return datesArray;
}

async function getDailyForecasts(key){
    await axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?apikey=mZDDGnloK5jU8t1fbOA952AYshZ4mJYN&details=true`)
    .then(function(response){
        // console.log(response);
        for (let i = 0; i < dailyHighTemps.length; i++)
        {   
            let forecastDates = getDate();
            dates[i].innerText = forecastDates[i];

            let maxTemp = response.data.DailyForecasts[i].Temperature.Maximum.Value;
            let minTemp = response.data.DailyForecasts[i].Temperature.Minimum.Value;
            dailyHighTemps[i].innerText = maxTemp;
            dailyLowTemps[i].innerText = minTemp;

            let avgTemp = Math.floor((maxTemp + minTemp) / 2);
            dailyAvgTemps[i].innerText = avgTemp;

            dailyChanceRain[i].innerText =response.data.DailyForecasts[i].Day.RainProbability;
            
            let condition = response.data.DailyForecasts[i].Day.IconPhrase;
            setConditionLabel(condition, dailyLinkingWord[i], dailyHeaderConditions[i]);
            setWholeBackground(condition, true, dailyConditionBoxes[i]);
            setBackgroundColor(condition, true, dayTiles[i]);
        }

    })
}

//------------------------- Handle Navigation ------------------------------
let navLinks = document.querySelectorAll('.navBox');
let backToTop = document.querySelectorAll('#backToTop')[0];
let sections = document.querySelectorAll('section');

//click on navbar links
// for (let i = 0; i < navLinks.length; i++){
//     navLinks[i].addEventListener('click', function(event){
//         // console.log(`target: ${event.target}`);
//         // console.log(event.target);
       
//         for (let i = 0; i < navLinks.length; i++)
//         {
//             // console.log(navLinks[i].childNodes[3]);
//             if (navLinks[i].childNodes[3] === event.target)
//             {
//                 // console.log(event.target.parentElement.childNodes[1]);
//                 event.target.parentElement.childNodes[1].style.backgroundColor = 'rgb(97, 176, 182)';
//             }
//             else
//             {
//                 navLinks[i].childNodes[1].style.backgroundColor = 'rgb(255, 251, 246)'; 
//             }
//         }
//     })
// }

//scrolling to new section
let firstSectionHeight = sections[0].offsetHeight;
let secondSectionHeight = sections[1].offsetHeight;
let thirdSectionHeight = sections[2].offsetHeight;
// console.log(`firstSectionHeight: ${firstSectionHeight}`);
// console.log(`secondSectionHeight: ${secondSectionHeight}`);
// console.log(`thirdSectionHeight: ${thirdSectionHeight}`);
// console.log(secondSectionHeight + firstSectionHeight - 200);

window.addEventListener('scroll', function(){
    let scrollDistance = window.scrollY;
    // console.log(`scrollDistance: ${scrollDistance}`);
    if (scrollDistance < (secondSectionHeight - 100))
    {
        navLinks[0].childNodes[1].style.backgroundColor = 'rgb(97, 176, 182)'; 
        navLinks[1].childNodes[1].style.backgroundColor = 'rgb(255, 251, 246)';
        navLinks[2].childNodes[1].style.backgroundColor = 'rgb(255, 251, 246)';
        
        navLinks[3].childNodes[1].style.backgroundColor = 'rgb(97, 176, 182)'; 
        navLinks[4].childNodes[1].style.backgroundColor = 'rgb(255, 251, 246)';
        navLinks[5].childNodes[1].style.backgroundColor = 'rgb(255, 251, 246)';
    }
    else if(scrollDistance >= (secondSectionHeight - 100) && scrollDistance < (secondSectionHeight + firstSectionHeight - 300) )
    {
        navLinks[0].childNodes[1].style.backgroundColor = 'rgb(255, 251, 246)'; 
        navLinks[1].childNodes[1].style.backgroundColor = 'rgb(97, 176, 182)';
        navLinks[2].childNodes[1].style.backgroundColor = 'rgb(255, 251, 246)';

        navLinks[3].childNodes[1].style.backgroundColor = 'rgb(255, 251, 246)'; 
        navLinks[4].childNodes[1].style.backgroundColor = 'rgb(97, 176, 182)';
        navLinks[5].childNodes[1].style.backgroundColor = 'rgb(255, 251, 246)';
    }
    else
    {
        navLinks[0].childNodes[1].style.backgroundColor = 'rgb(255, 251, 246)'; 
        navLinks[1].childNodes[1].style.backgroundColor = 'rgb(255, 251, 246)';
        navLinks[2].childNodes[1].style.backgroundColor = 'rgb(97, 176, 182)';

        navLinks[3].childNodes[1].style.backgroundColor = 'rgb(255, 251, 246)'; 
        navLinks[4].childNodes[1].style.backgroundColor = 'rgb(255, 251, 246)';
        navLinks[5].childNodes[1].style.backgroundColor = 'rgb(97, 176, 182)';
    }
})


//clicks on BackToTop button
backToTop.addEventListener('click', function(event){

    navLinks[0].childNodes[1].style.backgroundColor = 'rgb(97, 176, 182)'

    for (let i = 1; i < navLinks.length; i++)
    {
        navLinks[i].childNodes[1].style.backgroundColor = 'rgb(255, 251, 246)'; 
    }
})


//hamburger menu
let menuIcon = document.querySelector('#menuIcon');
let hamburgerNav = document.querySelector('#hamburgerNav');
let hamburgerNavLinks = hamburgerNav.childNodes;
// console.log(hamburgerNavLinks);

function showHamburgerMenu(){
    hamburgerNav.style.display = 'inline-block';
}

function hideHamburgerMenu(){
    hamburgerNav.style.display = 'none';
}

menuIcon.addEventListener('click', function(){
    showHamburgerMenu();
})


hamburgerNav.addEventListener('mouseleave', function(){
    hideHamburgerMenu();
})

for (let i = 0; i < hamburgerNavLinks.length; i++){
    hamburgerNavLinks[i].addEventListener('click', function(){
        hideHamburgerMenu();
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
        await getLocationKey(strUserLocation);
        // getCurrTemp(key);
        getCurrCondition(key);
        getHighLowTemps(key);
        // getLowTemp(key);
        getHourlyTemps(key);
        getDailyForecasts(key);
    }
})

