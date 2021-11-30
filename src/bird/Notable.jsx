import React from "react";
import { useState } from "react";
import NotableBirdList from "./NotableBirdList.jsx";

export default function Notable(props) {
  const [notableBirds, setNotableBirds] = useState([]);
  const [location, setLocation] = useState("");

  function changeLocationToDefaultLocation() {
    setLocation(props.defaultLocation);
    getLocationSightings(props.defaultLocation);
  }

  function changeLocationToToronto() {
    setLocation("CA-ON-TO");
    getLocationSightings("CA-ON-TO");
  }

  function changeLocationToPEI() {
    setNotableBirds([]);
    setLocation("CA-PE");
    getLocationSightings("CA-PE");
  }

  function changeLocationToStockholm() {
    setNotableBirds([]);
    setLocation("SE-AB");
    getLocationSightings("SE-AB");
  }

  function changeLocationToReykjavik() {
    setNotableBirds([]);
    setLocation("IS-1");
    getLocationSightings("IS-1");
  }

  function changeLocationToMunich() {
    setNotableBirds([]);
    setLocation("DE-BY");
    getLocationSightings("DE-BY");
  }

  function changeLocationToVienna() {
    setNotableBirds([]);
    setLocation("AT-9");
    getLocationSightings("AT-9");
  }

  function changeLocationToPrague() {
    setNotableBirds([]);
    setLocation("CA-PL");
    getLocationSightings("CZ-PL");
  }

  function changeLocationToBratislava() {
    setNotableBirds([]);
    setLocation("SK-BL");
    getLocationSightings("SK-BL");
  }

  function changeLocationToRiga() {
    setNotableBirds([]);
    setLocation("LV-RIX");
    getLocationSightings("LV-RIX");
  }

  function changeLocationToVilnius() {
    setNotableBirds([]);
    setLocation("LT-VL");
    getLocationSightings("LT-VL");
  }

  async function getLocationSightings(myLocation) {
    setNotableBirds([]);
    const myHeaders = new Headers();
    myHeaders.append("X-eBirdApiToken", `${process.env.EBIRD_API_KEY}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    const response = await fetch(
      `https://api.ebird.org/v2/data/obs/${myLocation}/recent/notable?detail=full&back=30`,
      requestOptions
    );
    const data = await response.json();
    setNotableBirds(data);
  }

  function changeLocation(event) {
    event.preventDefault();
    setNotableBirds([]);
    setLocation(event.target.elements.location.value.toUpperCase());
    getLocationSightings(event.target.elements.location.value.toUpperCase());
  }
  return (
    <>
      <h3>See recent reports of Rare or Unusual birds!</h3>
      <h5 className="birdtab">Showing birds reported in: {location}</h5>
      <div stlye={{ display: "flex" }}>
        <p>Quick select:</p>
        <button
        style = {{backgroundColor: "yellow"}}
          className="location-change quickLocation"
          onClick={changeLocationToDefaultLocation}
        >
          <span style={{fontWeight: "bold"}}>Use my Default Location</span>
        </button>
        <button
          className="location-change quickLocation"
          onClick={changeLocationToToronto}
        >
          Toronto
        </button>
        <button
          className="location-change quickLocation"
          onClick={changeLocationToPEI}
        >
          PEI
        </button>
        <button
          className="location-change quickLocation"
          onClick={changeLocationToStockholm}
        >
          Stockholm
        </button>
        <button
          className="location-change quickLocation"
          onClick={changeLocationToReykjavik}
        >
          Reykjavik
        </button>
        <button
          className="location-change quickLocation"
          onClick={changeLocationToVienna}
        >
          Vienna
        </button>
        <button
          className="location-change quickLocation"
          onClick={changeLocationToMunich}
        >
          Munich
        </button>
        <button
          className="location-change quickLocation"
          onClick={changeLocationToPrague}
        >
          Prague
        </button>
        <button
          className="location-change quickLocation"
          onClick={changeLocationToBratislava}
        >
          Bratislava
        </button>
        <button
          className="location-change quickLocation"
          onClick={changeLocationToRiga}
        >
          Riga
        </button>
        <button
          className="location-change quickLocation"
          onClick={changeLocationToVilnius}
        >
          Vilnius
        </button>
      </div>
      <p>... or enter manually</p>
      <form onSubmit={changeLocation}>
        <input
          name="location"
          type="text"
          placeholder="eBird region ID eg. CA-PE-PR"
        
        />
        <button>Submit Location</button>
      </form>
      <div className="image-container">
      <img src="https://lh3.googleusercontent.com/pw/AM-JKLXBCCGGYuLTL_j0cc_iOTzfwB6DGwY3unGiZy39RXWI-rn1kHMAYAPfzE2IoQaD-2yhzLrYyPCb8tbS_i9lsSjfheOJMU8Wj5Ev6RjVt3IZLol1tzNHaSLObFx2vOUW6zDAMhTXPyroEtASiAUynEr6UA=w566-h92-no?.jpg" />
      </div>
      <NotableBirdList birdList={notableBirds} />
  
      
    </>
  );
}
