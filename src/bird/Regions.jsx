import React from "react";
import { useState } from "react";

export default function Regions() {
  const [location, setLocation] = useState("");
  const [subLocation, setSubLocation] = useState("");
  const [regions, setRegions] = useState([]);
  const [subRegions, setSubRegions] = useState([]);

  async function getCountryList(event) {
    event.preventDefault();
    setSubLocation("");
    setSubRegions([]);
    setLocation(event.target.elements.country.value.toUpperCase());
    const queryLocation = event.target.elements.country.value.toUpperCase();
    const regionUrl = `https://api.ebird.org/v2/ref/region/list/subnational1/${queryLocation}.json`;
    const myHeaders = new Headers();
    myHeaders.append("X-eBirdApiToken", `${process.env.EBIRD_API_KEY}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    const response = await fetch(regionUrl, requestOptions);
    const data = await response.json();
    console.log(data);
    setRegions(data);
  }

  async function getSubLocations() {
    const queryLocation = subLocation;
    const locationURL = `https://api.ebird.org/v2/ref/region/list/subnational2/${queryLocation}.json`;
    const myHeaders = new Headers();
    myHeaders.append("X-eBirdApiToken", `${process.env.EBIRD_API_KEY}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    const response = await fetch(locationURL, requestOptions);
    const data = await response.json();

    setSubRegions(data);
  }

  async function subDivideLocations(region){
    const locationURL = `https://api.ebird.org/v2/ref/region/list/subnational2/${region}.json`;
    const myHeaders = new Headers();
    myHeaders.append("X-eBirdApiToken", `${process.env.EBIRD_API_KEY}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    const response = await fetch(locationURL, requestOptions);
    const data = await response.json();

    setSubRegions(data);
  
  }

  function RegionsList(props) {
    let regionDivs = props.regionData.map((region) => (
      <li key={region.code} className="regionItem">
        <span>
          <button class="region-button" id={region.code}
    
            onClick={() => {
              setSubLocation(region.code);
              subDivideLocations(region.code);
              
            }}
          >
            {region.code}{" "} {region.name}
          </button>
        </span>
      </li>
    ));
    return (
      <>
        {location && <><p  id="regions-return" style={{marginTop: "0.1em", marginBottom: "0.1em", paddingLeft: "0.1em"}}>Regions in {location}</p>
        <p style={{marginTop: "0", fontSize:"0.5em", paddingLeft: "0.1em"}}>(click for sub regions)</p></>}
        
        <ul style={{display: "flex", flexWrap:"wrap", listStyleType: "none", paddingLeft: "0.1em", marginTop: "0", paddingBottom: "0"}}>{regionDivs}</ul>
      </>
    );
  }

  function SubRegionsList(props) {
    if(!location){
      return (
        <p></p>
      )
   
    
    } else if(props.subRegionData.length > 0){
      let subRegionDivs = props.subRegionData.map((region) => (
        <li key={region.code} className="regionItem">
          <span style={{fontSize: "0.75em"}}>
            {region.code} : {region.name}
          </span>
        </li>
      ));
      return (
        <div className="regions">
          <h3>Available sub-regions</h3>
          <ul style={{listStyleType: "none", paddingLeft: "0.1em"}}>{subRegionDivs}</ul>
        </div>
      );
    } else if(subLocation && !props.subRegionData.length){
      return(
        <p>No sub locations for this region</p>
      )
    //}

  
    } else {
      return(
        <p></p>
      )
    }
  }

  return (
    <>
      <div>
        {/* <details>
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
        </details> */}
      </div>
     
      <h5 style={{marginBottom: "0"}}>Find a location code!</h5>
      <p style={{marginTop: "0"}}>
        Start by entering a 2-letter country code.  
        <span style={{fontStyle: "italic"}}>{''} (Use "GB" for locations in Great Britain.)</span>
      </p>

      <form onSubmit={getCountryList}>
        <input
          name="country"
          type="text"
          placeholder="eg. SE, AU, GB for Great Britain"

          style={{textTransform: "uppercase"}}
        />
        <button>Submit country code</button>
      </form>

      <div id="country-codes"
        style={{
          marginBottom: "0.6em",
          marginTop: "0.6em",
          backgroundColor: "lightgray",
          height: "auto",
          overflowX: "hidden",
          overflowY: "auto",
          textAlign: "justify"
        }}
      >
        <RegionsList regionData={regions} />
      </div>

      <SubRegionsList subRegionData={subRegions} />
      <p className="more-info">
        <a href="https://ebird.org/canada/region/world/regions?yr=all&m=&hsStats_sortBy=cl&hsStats_o=desc">
          You can also explore eBird.org to find your region ID
        </a>
      </p>
    </>
  );
}
