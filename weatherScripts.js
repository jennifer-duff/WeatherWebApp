"use strict";

// ------------------------- Carousel functionality ----------------------------
let prevArrow = document.querySelector("#leftArrow");
let nextArrow = document.querySelector("#rightArrow");
let forecastBox = document.querySelector("#nowBox");
let carousel = document.querySelector("#carousel");

let forecastBoxStyle = window.getComputedStyle(forecastBox);
let forecastBoxWidth =
    2 * parseFloat(forecastBoxStyle.marginRight) +
    parseFloat(forecastBoxStyle.width);
let forecastBoxHeight = parseFloat(forecastBoxStyle.height);

window.addEventListener("resize", function () {
    forecastBoxStyle = window.getComputedStyle(forecastBox);
    forecastBoxWidth =
        2 * parseFloat(forecastBoxStyle.marginRight) +
        parseFloat(forecastBoxStyle.width);
    forecastBoxHeight = parseFloat(forecastBoxStyle.height);
});

let clickCounter = 0;

function scrollToNext() {
    carousel.scrollBy({
        left: forecastBoxWidth,
        top: 0,
        behavior: "smooth",
    });
    clickCounter++;
}

function scrollToPrev() {
    carousel.scrollBy({
        left: -forecastBoxWidth,
        top: 0,
        behavior: "smooth",
    });
    clickCounter--;
}

nextArrow.addEventListener("click", scrollToNext);
prevArrow.addEventListener("click", scrollToPrev);

carousel.style.width = forecastBoxWidth * 4 + 100;
carousel.style.height = forecastBoxHeight + 50;

// ------------------------- Carousel circle buttons --------------------------
let dotNavs = document.querySelectorAll(".dotNav");
let firstDot = document.querySelector("#firstDot");
let secondDot = document.querySelector("#secondDot");
let thirdDot = document.querySelector("#thirdDot");
let fourthDot = document.querySelector("#fourthDot");

firstDot.classList.add("dotNavActive");

//Dynamically set activeDot
function setActiveDot() {
    if (clickCounter < 4) {
        firstDot.classList.add("dotNavActive");
        secondDot.classList.remove("dotNavActive");
        thirdDot.classList.remove("dotNavActive");
        fourthDot.classList.remove("dotNavActive");
    } else if (clickCounter >= 4 && clickCounter < 8) {
        firstDot.classList.remove("dotNavActive");
        secondDot.classList.add("dotNavActive");
        thirdDot.classList.remove("dotNavActive");
        fourthDot.classList.remove("dotNavActive");
    } else if (clickCounter >= 8 && clickCounter < 12) {
        firstDot.classList.remove("dotNavActive");
        secondDot.classList.remove("dotNavActive");
        thirdDot.classList.add("dotNavActive");
        fourthDot.classList.remove("dotNavActive");
    } else if (clickCounter <= 12) {
        firstDot.classList.remove("dotNavActive");
        secondDot.classList.remove("dotNavActive");
        thirdDot.classList.remove("dotNavActive");
        fourthDot.classList.add("dotNavActive");
    }
}

nextArrow.addEventListener("click", setActiveDot);
prevArrow.addEventListener("click", setActiveDot);

//Allow for clicking of dots to navigate
function findActiveDot() {
    for (let i = 0; i <= dotNavs.length; i++) {
        if (dotNavs[i].classList.contains("dotNavActive")) {
            return i + 1;
        }
    }
}

function scrollForwardByThree() {
    carousel.scrollBy({
        left: 3 * forecastBoxWidth,
        top: 0,
        behavior: "smooth",
    });
    clickCounter = clickCounter + 3;
}

function scrollForwardBySix() {
    carousel.scrollBy({
        left: 6 * forecastBoxWidth,
        top: 0,
        behavior: "smooth",
    });
    clickCounter = clickCounter + 6;
}

function scrollForwardByNine() {
    carousel.scrollBy({
        left: 9 * forecastBoxWidth,
        top: 0,
        behavior: "smooth",
    });
    clickCounter = clickCounter + 9;
}

function scrollBackByThree() {
    carousel.scrollBy({
        left: -(3 * forecastBoxWidth),
        top: 0,
        behavior: "smooth",
    });
    clickCounter = clickCounter - 3;
}

function scrollBackBySix() {
    carousel.scrollBy({
        left: -(6 * forecastBoxWidth),
        top: 0,
        behavior: "smooth",
    });
    clickCounter = clickCounter - 6;
}

function scrollBackByNine() {
    carousel.scrollBy({
        left: -(9 * forecastBoxWidth),
        top: 0,
        behavior: "smooth",
    });
    clickCounter = clickCounter - 9;
}

function scroll() {
    let activeDotNum = findActiveDot();
    let activeDotElement = dotNavs[activeDotNum - 1];
    let nextDotID = this.id;
    let nextDotElement = document.querySelector(`#${nextDotID}`);
    let nextDotNum = 0;

    //convert goToDot to an int
    if (nextDotID === "firstDot") {
        nextDotNum = 1;
    } else if (nextDotID === "secondDot") {
        nextDotNum = 2;
    } else if (nextDotID === "thirdDot") {
        nextDotNum = 3;
    } else if (nextDotID === "fourthDot") {
        nextDotNum = 4;
    }

    if (nextDotNum - activeDotNum === 1) {
        scrollForwardByThree();
        activeDotElement.classList.toggle("dotNavActive");
        nextDotElement.classList.add("dotNavActive");
    } else if (nextDotNum - activeDotNum === 2) {
        scrollForwardBySix();
        activeDotElement.classList.toggle("dotNavActive");
        nextDotElement.classList.add("dotNavActive");
    } else if (nextDotNum - activeDotNum === 3) {
        scrollForwardByNine();
        activeDotElement.classList.toggle("dotNavActive");
        nextDotElement.classList.add("dotNavActive");
    } else if (nextDotNum - activeDotNum === -1) {
        scrollBackByThree();
        activeDotElement.classList.toggle("dotNavActive");
        nextDotElement.classList.add("dotNavActive");
    } else if (nextDotNum - activeDotNum === -2) {
        scrollBackBySix();
        activeDotElement.classList.toggle("dotNavActive");
        nextDotElement.classList.add("dotNavActive");
    } else if (nextDotNum - activeDotNum === -3) {
        scrollBackByNine();
        activeDotElement.classList.toggle("dotNavActive");
        nextDotElement.classList.add("dotNavActive");
    }
}

for (let i = 0; i < dotNavs.length; i++) {
    dotNavs[i].addEventListener("click", scroll);
}

// ----------------------------------------------------------------------

carousel.addEventListener("scroll", function () {
    let carouselScrollPos = carousel.scrollLeft;

    let carouselViewPane = forecastBoxWidth * 3 - 10;

    if (carouselScrollPos < carouselViewPane) {
        firstDot.classList.add("dotNavActive");
        secondDot.classList.remove("dotNavActive");
        thirdDot.classList.remove("dotNavActive");
        fourthDot.classList.remove("dotNavActive");
    } else if (
        carouselScrollPos >= carouselViewPane &&
        carouselScrollPos < carouselViewPane * 2
    ) {
        firstDot.classList.remove("dotNavActive");
        secondDot.classList.add("dotNavActive");
        thirdDot.classList.remove("dotNavActive");
        fourthDot.classList.remove("dotNavActive");
    } else if (
        carouselScrollPos >= carouselViewPane * 2 &&
        carouselScrollPos < carouselViewPane * 3
    ) {
        firstDot.classList.remove("dotNavActive");
        secondDot.classList.remove("dotNavActive");
        thirdDot.classList.add("dotNavActive");
        fourthDot.classList.remove("dotNavActive");
    } else if (
        carouselScrollPos >= carouselViewPane * 3 &&
        carouselScrollPos < carouselViewPane * 4
    ) {
        firstDot.classList.remove("dotNavActive");
        secondDot.classList.remove("dotNavActive");
        thirdDot.classList.remove("dotNavActive");
        fourthDot.classList.add("dotNavActive");
    }
});

//------------------------- Handle Navigation ------------------------------

let backToTop = document.querySelectorAll("#backToTop")[0];
let sections = document.querySelectorAll("section");

let hourlyOffset = sections[1].offsetTop;
let dailyOffset = sections[2].offsetTop;

let navLinks = [];
let desktopNav = document.querySelector("nav").childNodes;
let hamburgerNavBox = document.querySelector("#hamburgerNav").childNodes;

navLinks.push(desktopNav[1]);
navLinks.push(desktopNav[3]);
navLinks.push(desktopNav[5]);

navLinks.push(hamburgerNavBox[1]);
navLinks.push(hamburgerNavBox[3]);
navLinks.push(hamburgerNavBox[5]);

window.addEventListener("resize", function () {
    hourlyOffset = sections[1].offsetTop;
    dailyOffset = sections[2].offsetTop - 100;
});

//starting position
navLinks[0].childNodes[1].style.opacity = 1;
navLinks[1].childNodes[1].style.opacity = 0;
navLinks[2].childNodes[1].style.opacity = 0;
navLinks[3].childNodes[1].style.opacity = 1;
navLinks[4].childNodes[1].style.opacity = 0;
navLinks[5].childNodes[1].style.opacity = 0;

window.addEventListener("scroll", function () {
    let currScrollPos = window.scrollY;

    if (currScrollPos < hourlyOffset) {
        navLinks[0].childNodes[1].style.opacity = 1;
        navLinks[1].childNodes[1].style.opacity = 0;
        navLinks[2].childNodes[1].style.opacity = 0;
        navLinks[3].childNodes[1].style.opacity = 1;
        navLinks[4].childNodes[1].style.opacity = 0;
        navLinks[5].childNodes[1].style.opacity = 0;
    } else if (currScrollPos >= hourlyOffset && currScrollPos < dailyOffset) {
        navLinks[0].childNodes[1].style.opacity = 0;
        navLinks[1].childNodes[1].style.opacity = 1;
        navLinks[2].childNodes[1].style.opacity = 0;
        navLinks[3].childNodes[1].style.opacity = 0;
        navLinks[4].childNodes[1].style.opacity = 1;
        navLinks[5].childNodes[1].style.opacity = 0;
    } else if (currScrollPos >= dailyOffset) {
        navLinks[0].childNodes[1].style.opacity = 0;
        navLinks[1].childNodes[1].style.opacity = 0;
        navLinks[2].childNodes[1].style.opacity = 1;
        navLinks[3].childNodes[1].style.opacity = 0;
        navLinks[4].childNodes[1].style.opacity = 0;
        navLinks[5].childNodes[1].style.opacity = 1;
    }
});

//clicks on BackToTop button
backToTop.addEventListener("click", function (event) {
    navLinks[0].childNodes[1].style.backgroundColor = "rgb(97, 176, 182)";

    for (let i = 1; i < navLinks.length; i++) {
        navLinks[i].childNodes[1].style.backgroundColor = "rgb(255, 251, 246)";
    }
});

//hamburger menu
let menuIcon = document.querySelector("#menuIcon");
let hamburgerNav = document.querySelector("#hamburgerNav");
let hamburgerNavLinks = hamburgerNav.childNodes;

function showHamburgerMenu() {
    hamburgerNav.style.display = "inline-block";
}

function hideHamburgerMenu() {
    hamburgerNav.style.display = "none";
}

hamburgerNav.addEventListener("mouseleave", function () {
    hideHamburgerMenu();
});

document.body.addEventListener("click", function (event) {
    if (event.target === menuIcon) {
        showHamburgerMenu();
    } else if (
        event.target === hamburgerNav ||
        event.target === hamburgerNav.childNodes
    ) {
        showHamburgerMenu();
    } else {
        hideHamburgerMenu();
    }
});

// for (let i = 0; i < hamburgerNavLinks.length; i++){
//     hamburgerNavLinks[i].addEventListener('click', function(){
//         hideHamburgerMenu();
//     })
// }

function setBorderColor(isDaylight, element) {
    if (isDaylight) {
        element.style.borderColor = "black";
    } else {
        element.style.borderColor = nightLineColor;
    }
}

function setFontColor(isDaylight, element) {
    if (isDaylight) {
        element.style.color = "black";
    } else {
        element.style.color = nightLineColor;
    }
}

//--------------- Set background image + color based on weather ----------------
//Get objects
let header = document.querySelector("header");
let inputBox = document.querySelector("#locationInput");
let currWeatherSection = document.querySelector("#currWeatherSection");
let weatherIconDiv = document.querySelector("#weatherIconDiv");
// let currTemp = document.querySelector('#currTemp');
let weatherBoxes = document.querySelectorAll(".weatherBox");
let iconBoxes = document.querySelectorAll(".iconBox");
let hourlyTemp = document.querySelectorAll(".hourlyTemp");

//get weather colors + icons
let sunColor = "#FFE194";
let sunImg = "url('Assets/sun.svg')";

let mostlySunnyColor = "#FFEFC9";
let mostlySunnyImg = "url('Assets/mostlySunny.svg')";

let mostlyCloudyColor = "#fff9eb";
let mostlyCloudyImg = "url('Assets/mostlyCloudy.svg')";

let partSunWithRainColor = "#F9F3E8";
let partSunWithRainImg = "url('Assets/partlySunnyWithRain.svg')";

let nightColor = "#363F61";
let nightLineColor = "#DBD9D5";
let dayLineColor = "#000000";

let clearNightImg = "url('Assets/moon.svg')";
let mostlyClearNightImg = "url('Assets/mostlyClearMoon.svg')";
let mostlyCloudyNightImg = "url('Assets/cloudyMoon.svg')";
let cloudyNightImg = "url('Assets/nightCloud.svg')";

let cloudColor = "#E6EEF2";
let cloudImg = "url('Assets/cloud.svg')";

let rainColor = "#AECFE6";
let rainImg = "url('Assets/raincloud.svg')";
let nightRainImg = "url('Assets/nightRain.svg')";

let snowColor = "#FAFAFA";
let snowImg = "url('Assets/snow.svg')";
let nightSnowImg = "url('Assets/nightSnow.svg')";

let hailImg = "url('Assets/hail.svg')";
let nightHailImg = "url('Assets/nightHail.svg')";

let sleetImg = "url('Assets/sleet.svg')";
let nightSleetImg = "url('Assets/nightSleet.svg')";

let windColor = "#FFFEFA";
let windImg = "url('Assets/wind.svg')";
let nightWindImg = "url('Assets/nightWind.svg')";

let hazeColor = "#E3DDD5";
let hazeImg = "url('Assets/haze.svg')";
let nightHazeImg = "url('Assets/nightimeHaze.svg')";

let stormColor = "#B8B8B8";
let stormImg = "url('Assets/stormCloud.svg')";
let nightStormImg = "url('Assets/nightStorm.svg')";

function setBackgroundColor(weather, isDaylight, element) {
    if (isDaylight === false) {
        element.style.backgroundColor = nightColor;
        element.style.color = nightLineColor;
    } else if (isDaylight === true) {
        element.style.color = "black";
        switch (weather.toLowerCase()) {
            case "sunny":
                element.style.backgroundColor = sunColor;
                break;

            case "showers":
            case "mostly cloudy w/ showers":
            case "light rain":
            case "rain":
                element.style.backgroundColor = rainColor;
                break;

            case "cloudy":
            case "dreary (overcast)":
                element.style.backgroundColor = cloudColor;
                break;

            case "mostly sunny":
            case "partly sunny":
                element.style.backgroundColor = mostlySunnyColor;
                break;

            case "intermittent clouds":
            case "mostly cloudy":
                element.style.backgroundColor = mostlyCloudyColor;
                break;

            case "flurries":
            case "partly sunny w/ flurries":
            case "mostly cloudy w/ clurries":
            case "mostly cloudy w/ snow":
            case "snow":
            case "ice":
            case "freezing rain":
            case "sleet":
            case "rain and snow":
                element.style.backgroundColor = snowColor;
                break;

            case "windy":
                element.style.backgroundColor = windColor;
                break;

            case "hazy sunshine":
            case "fog":
                element.style.backgroundColor = hazeColor;
                break;

            case "t-storms":
            case "mostly cloudy w/ t-storms":
            case "partly sunny w/ t-storms":
                element.style.backgroundColor = stormColor;
                break;

            case "partly sunny w/ showers":
                element.style.backgroundColor = partSunWithRainColor;
                break;
        }
    }
}

function setWholeBackground(weather, isDaylight, element) {
    setBackgroundColor(weather, isDaylight, element);
    switch (weather.toLowerCase()) {
        case "showers":
        case "mostly cloudy w/ showers":
        case "partly cloudy w/ showers":
        case "light rain":
        case "rain":
            if (isDaylight === true) {
                element.style.backgroundImage = rainImg;
            } else if (isDaylight === false) {
                element.style.backgroundImage = nightRainImg;
            }

            if (element === weatherIconDiv) {
                currTemp.style.top = "9.5vh";
                currTemp.style.left = "1.7vw";
            }
            break;

        case "sunny":
            element.style.backgroundImage = sunImg;
            break;

        //night
        case "clear":
            element.style.backgroundImage = clearNightImg;
            break;

        case "mostly sunny":
        case "partly sunny":
            element.style.backgroundImage = mostlySunnyImg;
            break;

        //night
        case "mostly clear":
        case "partly cloudy":
            element.style.backgroundImage = mostlyClearNightImg;
            break;

        case "intermittent clouds":
        case "mostly cloudy":
            if (isDaylight === true) {
                element.style.backgroundImage = mostlyCloudyImg;
            } else if (isDaylight === false) {
                element.style.backgroundImage = mostlyCloudyNightImg;
            }
            break;

        case "cloudy":
        case "dreary (overcast)":
            if (isDaylight === true) {
                element.style.backgroundImage = cloudImg;
            } else if (isDaylight === false) {
                element.style.backgroundImage = cloudyNightImg;
            }

            if (element.parentElement.parentElement === carousel) {
                element.childNodes[1].style.top = "3px";
            }
            break;

        case "flurries":
        case "partly sunny w/ flurries":
        case "mostly cloudy w/ flurries":
        case "mostly cloudy w/ snow":
        case "snow":
            if (isDaylight === true) {
                element.style.backgroundImage = snowImg;
            } else if (isDaylight === false) {
                element.style.backgroundImage = nightSnowImg;
            }
            break;

        case "ice":
        case "freezing rain":
            if (isDaylight === true) {
                element.style.backgroundImage = hailImg;
            } else if (isDaylight === false) {
                element.style.backgroundImage = nightHailImg;
            }
            break;

        case "sleet":
        case "rain and snow":
            if (isDaylight === true) {
                element.style.backgroundImage = sleetImg;
            } else if (isDaylight === false) {
                element.style.backgroundImage = nightSleetImg;
            }
            break;

        case "windy":
            if (isDaylight === true) {
                element.style.backgroundImage = windImg;
            } else if (isDaylight === false) {
                element.style.backgroundImage = nightWindImg;
            }
            break;

        case "hazy sunshine":
        case "hazy moonlight":
        case "fog":
            if (isDaylight === true) {
                element.style.backgroundImage = hazeImg;
            } else if (isDaylight === false) {
                element.style.backgroundImage = nightHazeImg;
            }
            break;

        case "t-Storms":
        case "mostly cloudy w/ t-storms":
        case "partly sunny w/ t-storms":
            if (isDaylight === true) {
                element.style.backgroundImage = stormImg;
            } else if (isDaylight === false) {
                element.style.backgroundImage = nightStormImg;
            }
            break;

        case "partly sunny w/ showers":
            element.style.backgroundImage = partSunWithRainImg;
            break;
    }
}

function setConditionLabel(condition, linkingWord, element) {
    condition = condition.toLowerCase();
    element.innerText = condition;
    switch (condition) {
        case "intermittent clouds":
        case "hazy sunshine":
        case "fog":
        case "showers":
        case "t-storms":
        case "rain":
        case "light rain":
        case "flurries":
        case "snow":
        case "ice":
        case "sleet":
        case "freezing rain":
        case "rain and snow":
        case "hazy moonlight":
            linkingWord.innerText = "with";
            break;
        default:
            linkingWord.innerText = "and";
    }
}

//------------------- Get location + Current Conditions ------------------------
let locationInputElement = document.querySelector("#locationInput");
let locationInputContainer = document.querySelector("#inputContainer");
let strUserLocation = "userLocation";
let currTemp = document.querySelector("#currTemp");
let currWeather = document.querySelector("#currWeather");
let currLinkingWord = document.querySelector("#linkingWord");
let highTemp = document.querySelector("#highTemp");
let lowTemp = document.querySelector("#lowTemp");
let key = "";
let navText = [];

for (let navlink of navLinks) {
    navText.push(navlink.childNodes[3]);
}

async function getLocationKeyStr(location) {
    let response = await axios
        .get(
            `https://dataservice.accuweather.com/locations/v1/cities/search?apikey=mZDDGnloK5jU8t1fbOA952AYshZ4mJYN&q=${location}`
        )
        .then(function (response) {
            key = response.data[0].Key;
            return response.data[0].Key;
        })
        .catch(function (error) {
            console.log(error);
        });
}

async function getCurrCondition(key) {
    await axios
        .get(
            `https://dataservice.accuweather.com/currentconditions/v1/${key}?apikey=mZDDGnloK5jU8t1fbOA952AYshZ4mJYN`
        )
        .then(function (response) {
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
            for (let navlink of navText) {
                setFontColor(currIsDaytime, navlink);
            }
            setFontColor(condition, currIsDaytime, inputBox);
            setBorderColor(currIsDaytime, locationInputContainer);
        })
        .catch(function (error) {
            console.log(error);
        });
}

async function getHighLowTemps(key) {
    await axios
        .get(
            `https://dataservice.accuweather.com/forecasts/v1/daily/1day/${key}?apikey=mZDDGnloK5jU8t1fbOA952AYshZ4mJYN`
        )
        .then(function (response) {
            let htemp =
                response.data.DailyForecasts[0].Temperature.Maximum.Value;
            highTemp.innerText = htemp;

            let ltemp =
                response.data.DailyForecasts[0].Temperature.Minimum.Value;
            lowTemp.innerText = ltemp;
        })
        .catch(function (error) {
            console.log(error);
        });
}

//------------------------- Get Hourly Forecast Conditions ------------------------------
let forecastTemps = document.querySelectorAll(".forecastTemp");
let timeLabels = document.querySelectorAll(".timeLabel");
let hourlyTempDiv = document.querySelectorAll(".hourlyTemp");
let hourlyRainChanceDiv = document.querySelectorAll(".hourlyRainChanceDiv");
let hourlyRainChanceLabel = document.querySelectorAll(".hourlyRainChanceLabel");
let hourlyUmbrella = document.querySelectorAll(".hourlyUmbrella");

async function getHourlyTemps(key) {
    await axios
        .get(
            `https://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${key}?apikey=mZDDGnloK5jU8t1fbOA952AYshZ4mJYN&details=true`
        )
        .then(function (response) {
            let hourlyData = response.data;
            for (let i = 0; i < forecastTemps.length; i++) {
                //set times
                let time = hourlyData[i].DateTime;
                time = time.substr(time.indexOf("T") + 1, 5);
                timeLabels[i].innerHTML = time;

                //set temps
                forecastTemps[i].innerText = hourlyData[i].Temperature.Value;

                //set %rain
                hourlyRainChanceLabel[i].innerText =
                    hourlyData[i].RainProbability;

                //check if it's day vs night
                let isDaylight = hourlyData[i].IsDaylight;

                //set background image + color
                let condition = hourlyData[i].IconPhrase;
                setBackgroundColor(condition, isDaylight, weatherBoxes[i]);
                setWholeBackground(condition, isDaylight, iconBoxes[i]);

                if (isDaylight === true) {
                    hourlyUmbrella[i].src = "Assets/umbrellaHourly.svg";
                    hourlyTempDiv[i].style.borderColor = "black";
                    hourlyRainChanceDiv[i].style.borderColor = "black";
                }

                if (isDaylight === false) {
                    hourlyUmbrella[i].src = "Assets/umbrellaHourlyNight.svg";
                    hourlyTempDiv[i].style.borderColor = nightLineColor;
                    hourlyRainChanceDiv[i].style.borderColor = nightLineColor;
                }
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}

//------------------------- Get 5-Day Forecast ------------------------------
let dayTiles = document.querySelectorAll(".dayTile");
let dates = document.querySelectorAll(".date");
let dailyAvgTemps = document.querySelectorAll(".fiveDayTemp");
let dailyHeaderConditions = document.querySelectorAll(".fiveDayWeather");
let dailyLinkingWord = document.querySelectorAll(".fiveDayLinkingWord");
let dailyConditionBoxes = document.querySelectorAll(".conditionBox");
let dailyHighTemps = document.querySelectorAll(".highTempLabel");
let dailyLowTemps = document.querySelectorAll(".lowTempLabel");
let dailyChanceRain = document.querySelectorAll(".chanceRain");

function getDate() {
    let datesArray = [];
    let currDateTime = new Date();
    let localDateTime = currDateTime.toLocaleString();
    datesArray.push(localDateTime);

    // pushes full dateTime of next 5 days into datesArray[]
    for (let i = 0; i < 5; i++) {
        let tomorrow = new Date(datesArray[i]);
        tomorrow.setDate(tomorrow.getDate() + 1);
        let localTomorrow = tomorrow.toLocaleString();
        datesArray.push(localTomorrow);
    }

    // shortens dateTimes into simple dates, in the format XX/X
    for (let i = 0; i <= 5; i++) {
        datesArray[i] = datesArray[i].toString();
        datesArray[i] = datesArray[i].substring(
            0,
            datesArray[i].indexOf("/", 3)
        );
    }

    return datesArray;
}

async function getDailyForecasts(key) {
    await axios
        .get(
            `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?apikey=mZDDGnloK5jU8t1fbOA952AYshZ4mJYN&details=true`
        )
        .then(function (response) {
            for (let i = 0; i < dailyHighTemps.length; i++) {
                let forecastDates = getDate();
                dates[i].innerText = forecastDates[i];

                let maxTemp =
                    response.data.DailyForecasts[i].Temperature.Maximum.Value;
                let minTemp =
                    response.data.DailyForecasts[i].Temperature.Minimum.Value;
                dailyHighTemps[i].innerText = maxTemp;
                dailyLowTemps[i].innerText = minTemp;

                let avgTemp = Math.floor((maxTemp + minTemp) / 2);
                dailyAvgTemps[i].innerText = avgTemp;

                dailyChanceRain[i].innerText =
                    response.data.DailyForecasts[i].Day.RainProbability;

                let condition = response.data.DailyForecasts[i].Day.IconPhrase;
                setConditionLabel(
                    condition,
                    dailyLinkingWord[i],
                    dailyHeaderConditions[i]
                );
                setWholeBackground(condition, true, dailyConditionBoxes[i]);
                setBackgroundColor(condition, true, dayTiles[i]);
            }
        });
}

//------------------------- Set All Conditions ------------------------------

//set info
function setInfo(key) {
    getCurrCondition(key);
    getHighLowTemps(key);
    getHourlyTemps(key);
    getDailyForecasts(key);
}

// lookup weather @ user's current position via coordinates
async function getLocationKeyCoord(lat, long) {
    let response = await axios
        .get(
            `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=mZDDGnloK5jU8t1fbOA952AYshZ4mJYN&q=${lat}%2C%20${long}`
        )
        .then(function (response) {
            key = response.data.Key;

            // locationInputElement.value = response.data.ParentCity.LocalizedName;
            locationInputElement.value = response.data.LocalizedName;

            setInfo(key);
        })
        .catch(function (error) {
            console.log(error);
        });
}

// get user's current position on load, to show current conditions
window.addEventListener("load", (event) => {
    navigator.geolocation.getCurrentPosition((position) => {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        getLocationKeyCoord(latitude, longitude);
    });
});

// allow user to specify location to lookup conditions
locationInputElement.addEventListener("change", async function () {
    if (
        locationInputElement.value === null ||
        locationInputElement.value === ""
    ) {
        strUserLocation = "No location entered";
    } else {
        strUserLocation = locationInputElement.value;
        await getLocationKeyStr(strUserLocation);
        setInfo(key);
    }
});
