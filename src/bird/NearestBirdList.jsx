import React from "react";

export default function NearestBirdList(props) {
  let listOfRecentBirds = [];

  for (let i = 0; i < props.birdList.length; i++) {
    if (!listOfRecentBirds.includes(props.birdList[i].locName)) {
      listOfRecentBirds.push(props.birdList[i].locName);
    }
  }

  let listOfRecentBirdsSorted = listOfRecentBirds.sort()
  let birdDivs = listOfRecentBirdsSorted.map((bird) => (
    <li key={bird} className="birdItem">
      {bird}
    </li>
  ));

  return (
    <>
      <h3>{props.speciesName} observations in the last 14 days...</h3>
      <ul style={{ listStyleType: "none", paddingLeft: "0" }}>{birdDivs}</ul>
    </>
  );
}
