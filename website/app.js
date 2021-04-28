// Personal API Key for OpenWeatherMap API
const apiKey = '&appid=ededebae0b3abcd3f1394abbea507c47';
const baseURL= 'https://api.openweathermap.org/data/2.5/weather?zip=';

//Get date value and make it readable 
let d = new Date()
let date = `${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()}`
// Event listener to add function to existing HTML DOM element

let zip = document.getElementById('zip');
let feelings = document.getElementById('feelings');


//Add event listener to button
document.querySelector('#create').addEventListener("click", performAction);

/* Function called by event listener */
function performAction(){
    getWeather(baseURL, zip, apiKey)
    .then(function(newData){
        postData('/create', {
            temp: newData.main.temp,
            feelings: feelings.value,
            date: date
        })
    })
    .then(getData('/all'))
    .then(updateUI());
};


/* Function to GET Web API Data*/
const getWeather = async (baseURL, zip, apiKey) => {
    const response = await fetch(`${baseURL}${zip.value}${apiKey}`);
    const weatherData = await response.json();
    console.log(weatherData);
    return weatherData;
};


/* Function to POST data */
const postData = async (url = '', data = {}) => {
    console.log(data);
    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data), 
  });

  try {
    const newData = await response.json();
    console.log(newData);
  } catch(error) {
  console.log("error", error)
  }
};


/* Function to GET Project Data */
const getData = async (url='') => {
    const request = await fetch(url);
    try {
        let allData = await request.json()
        console.log(allData)
        return allData;
    }
    catch(error) {
        console.log("error",error);
    }
};

const newDate = document.getElementById('date');
const newTemp = document.getElementById('temp');
const newContent = document.getElementById('content');

const updateUI = async () => {
    const request = await fetch('/all');
    const allData = await request.json();
    try{
      newDate.innerHTML = `${allData.newEntry[allData.newEntry.length-1].date}`;
      newTemp.innerHTML = `${allData.newEntry[allData.newEntry.length-1].temp}`;
      newContent.innerHTML = `${allData.newEntry[allData.newEntry.length-1].feelings}`;
  
    } catch(error){
      console.log("error", error);
    }
  };