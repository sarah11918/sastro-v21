import React from "react";
import { useState } from "react";
import NearestBirdList from "./NearestBirdList.jsx";

export default function Nearest() {
  const [nearestBirds, setNearestBirds] = useState([]);
  const [message, setMessage] = useState("");
  const [species, setSpecies] = useState("");
  const [speciesName, setSpeciesName] = useState("");
  const [isBirds, setIsBirds] = useState("results pending")

//LOGIC WORKS!! NEED TO REFINE MESSAGES RENDERED ETC.

  function getResults(event) {
    event.preventDefault();
    setSpecies("");
    setMessage("");
    setNearestBirds([]);
    setIsBirds("pending")
    setSpecies(event.target.elements.speciesInput.value.toLowerCase());
    getBird(event.target.elements.speciesInput.value.toLowerCase());
    getSightings(event.target.elements.speciesInput.value.toLowerCase());
  }

  async function getBird(species){
    
    const myHeaders = new Headers();
    myHeaders.append("X-eBirdApiToken",  `${process.env.EBIRD_API_KEY}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

  const response = await fetch(`https://api.ebird.org/v2/ref/taxonomy/ebird?fmt=json&species=${species}`, requestOptions)

  const data = await response.json();
    setSpeciesName(data[0].comName)
  }

  async function getSightings(species) {
    const lat = "46.4"
    const lng = "-63.79"
    
    const nearestUrl = `https://api.ebird.org/v2/data/nearest/geo/recent/${species}?lat=${lat}&lng=${lng}&back=14&dist=20&includeProvisional=true`
    
    const myHeaders = new Headers();
    myHeaders.append("X-eBirdApiToken",  `${process.env.EBIRD_API_KEY}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };
    
    const response = await fetch(
      nearestUrl,
      requestOptions
    );

    const data = await response.json();
    
    if (data.length>0){
      setNearestBirds(data);
      setIsBirds("Oh yeah, we got birds.")
    } else {
      setIsBirds(`Nope, no one saw any of those birds.`);
    }

    if (!response.ok){
  
      setMessage("Not a valid species code")
      setIsBirds("there are no birds by that name")
    }

  }
  
  return (
    <>
      <h3>Nearest recent sightings - {speciesName}</h3>
  
      <h5 className="birdtab">Current location set: Summerside (not customizable yet)</h5>
      {message && <p>{message}</p>}
      {/* {!isBirds && <p>is no birds</p>} */}
      <p>Is birds? - {isBirds}</p>

    <form onSubmit={getResults}>
    <input
          name="speciesInput"
          type="text"
          placeholder="species code e.g. blujay"
          style={{ textTransform: "lowercase" }}
        />
      <button> See nearest birds of your species reported in Summerside recently!</button>
     </form> 

      <NearestBirdList birdList={nearestBirds} speciesName={speciesName}/>
    </>
  );
}
