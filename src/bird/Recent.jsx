import React from "react";
import { useState } from "react";
import RecentBirdList from "./RecentBirdList.jsx";

export default function Recent() {
  const [recentBirds, setRecentBirds] = useState([]);
  const [location, setLocation] = useState("");

  async function getSightings(event) {
    event.preventDefault();
    setLocation(event.target.elements.location.value.toUpperCase())
    const queryLocation = event.target.elements.location.value.toUpperCase()
    const recentUrl = `https://api.ebird.org/v2/data/obs/${queryLocation}/recent?back=14`
    const myHeaders = new Headers();
    myHeaders.append("X-eBirdApiToken", `${process.env.EBIRD_API_KEY}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };
    const response = await fetch(
      recentUrl,
      requestOptions
    );
    const data = await response.json();
    setRecentBirds(data);
  }

  return (
    <>
      <h3>Get a list of recently-observed birds in your area!</h3>
      <h5 className="birdtab">Current location set: {location} </h5>

      <form onSubmit={getSightings}>
        <input name="location" type="text" placeholder="eBird region ID eg. CA-PE" style={{textTransform: "uppercase"}}/>
        <button> See the birds!</button>
      </form>
      <RecentBirdList birdList={recentBirds} />
    </>
  );
}