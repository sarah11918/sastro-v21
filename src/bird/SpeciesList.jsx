import React from "react";

export default function SpeciesList(props) {
  let birdDivs = props.birdList.map((bird) => (
    <li key={bird} className="birdItem">{bird}</li>
  ));

  return (
    <>
      <h3>
        Here are all the species codes for your eBird region or Personal
        Checklist location...
      </h3>
      <p>
        <em>(To do: convert these to common names?)</em>
      </p>
      <ul>{birdDivs}</ul>
    </>
  );
}
