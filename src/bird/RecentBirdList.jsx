import React from "react";

export default function RecentBirdList(props) {
  let listOfRecentBirds = [];

  for (let i = 0; i < props.birdList.length; i++) {
    if (!listOfRecentBirds.includes(props.birdList[i].comName)) {
      listOfRecentBirds.push(props.birdList[i].comName);
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
      <h3>Reported in the last 14 days...</h3>
      <ul style={{ listStyleType: "none", paddingLeft: "0" }}>{birdDivs}</ul>
    </>
  );
}
