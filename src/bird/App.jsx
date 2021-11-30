import React from 'react';
import {useState, useContext} from 'react';
import LocationContext from './LocationContext.jsx';
import Regions from './Regions.jsx';
import Notable from './Notable.jsx';
import Recent from './Recent.jsx';

const App = () => {
  const [defaultLocation, setDefaultLocation] = useState("CA-PE-PR");

  function changeDefaultLocation(event) {
    event.preventDefault();
    setDefaultLocation(event.target.elements.defaultLocation.value.toUpperCase());
  }

  return(
    <div>
    <h3>Welcome to my bird app!</h3>
    <LocationContext.Provider value={{ defaultLocation: defaultLocation, setDefaultLocation: setDefaultLocation}}>

    <span>Default Location is {defaultLocation} </span>

    <form onSubmit={changeDefaultLocation}>
        <input
          name="defaultLocation"
          type="text"
          placeholder="eBird region ID eg. CA-PE-PR"
        
        />
        <button>Set a default Location</button>
      </form>

    <Notable defaultLocation={defaultLocation}/>
    <hr />
    <h2>Other Tools</h2>
    <details>
          <summary style={{fontStyle: "italic"}}>What is an eBird region?</summary>
          <div>
          <p>
        You can explore eBird data for an entire country, or for a smaller region like a state or province... sometimes, for a specific county or city.
      </p>
      <p>
        For example, you can search bird data in all of Canada (CA), in the entire province of Ontario (CA-ON), or just in the city of Toronto (CA-ON-TO). 
       </p> 
        <p>The United States, Canada, and Great Britain (GB) are examples of areas where bird data is recorded by top level location, region and sub-region. Many countries, however, do not break down their regions into sub-regions. For example, Sweden's top-level country location code is SE, and Stockholm's location code is SE-AB, and there are no smaller sub-regions classified by eBird.
      </p>

          </div>
        </details>
      <details>
        <summary>Find the code for your eBird region</summary>
        <div>
          <Regions />
        </div>
      </details>

      <details>
        <summary>See all birds recently observed in your area</summary>
        <div>
          <Recent defaultLocation={defaultLocation}/>
        </div> 
      </details> 

    </LocationContext.Provider>
  </div>
  )
};

export default App