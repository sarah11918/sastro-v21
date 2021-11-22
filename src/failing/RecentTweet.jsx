import * as React from "react";
//import { Timeline } from "react-twitter-widgets";

const RecentTweet = ({ user }) => (
  <>
    <p>My user prop is {user}</p>
    <div className="tweet">
    <Timeline
      dataSource={{
        sourceType: "profile",
        screenName: user
      }}
      options={{
        width: "300",
        tweetLimit: "1",
        dnt: "true",
      }}
    />
    </div>
  </>
);

export default RecentTweet;