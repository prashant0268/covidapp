import React, { useState, useEffect } from "react";
import {
  TwitterTimelineEmbed,
  TwitterShareButton,
  TwitterFollowButton,
  TwitterHashtagButton,
  TwitterMentionButton,
  TwitterTweetEmbed,
  TwitterMomentShare,
  TwitterDMButton,
  TwitterVideoEmbed,
  TwitterOnAirButton
} from "react-twitter-embed";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

import "./PolicyItem.scss";
import { Collapse } from "@material-ui/core";
function PolicyItem({ policy }) {
  const { title, state, country, tweetId, effectiveFrom } = policy;
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="policy-item-container">
      <div className="flex-h" onClick={() => setExpanded(!expanded)}>
        <div className="flex-1">{title}</div>
        <div>{expanded === true ? <ExpandLessIcon /> : <ExpandMoreIcon />}</div>
      </div>

      {tweetId !== "null" && (
        <Collapse in={expanded}>
          <TwitterTweetEmbed tweetId={tweetId} />
        </Collapse>
      )}
      {/* {expanded === true && (
        <div>
          {tweetId !== "null" && <TwitterTweetEmbed tweetId={tweetId} />}
        </div>
      )} */}
    </div>
  );
}

export default PolicyItem;
