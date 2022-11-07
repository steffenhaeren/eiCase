import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

let url;
let lat;
let lon;


/*
* Henter koordinatene fra bruker og fetcher værdataen,
* Legger dataen inn i dataFound
* Kjører show()
*/
function find(){

    lat = get("lat").value
    lon = get("lon").value

    url = 'https://api.met.no/weatherapi/locationforecast/2.0/compact.json?lat=' + lat + '&lon=' + lon

      fetch(url)
    .then((response) => response.json())
    .then((data) => {
      show(data.properties.timeseries)
    })
  }


/*
* Henter air_temerature fra dataen og viser det i div-elementene
*/
function show(data){
    console.log(data)
    for (let index = 0; index < 4; index++) {
      console.log(data[index].data.instant.details.air_temperature)
      get('t' + index).innerHTML = 
        '<b>Hour ' + index + '</b><br/>' + 
        'temp: ' + data[index].data.instant.details.air_temperature + '°C <br/> ' + 
        'wind: ' + data[index].data.instant.details.wind_speed + 'mps <br/> ' + 
        'humidity: ' + data[index].data.instant.details.relative_humidity + '°C <br/><br/> '
    }

  }

/*
* Kun en hjelpefunksjon
*/
function get(n){
  return document.getElementById(n);
}


function App() {
  return (
      <div className="App">
        <h4>Weather Forecaster</h4>
          <input type="number" required id="lat" placeholder="latitude ..." />
          <br />
          <input type="number" required id="lon" placeholder="longitude ..." />
          <br />
          <button onClick={find}><FontAwesomeIcon icon={faSearch} /></button>
          <br /><br />
        <div id="t0"></div>
        <div id="t1"></div>
        <div id="t2"></div>
        <div id="t3"></div>
      </div>
  );
}

export default App;
