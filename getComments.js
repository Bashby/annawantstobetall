// import fs from "fs";
const fs = require("fs");

async function getComments(url) {
  // need to add this to the end of url so that we can get usable img urls
  url = `${url}.json?raw_json=1`;
  const subreddit = url.split("r/")[1].split("/")[0];
  const upvoteMin = 3;
  // const response = await fetch(url, {
  //   method: "GET",
  // });

  const response = await fetch(url, {
    method: "GET",
  });

  const responseData = await response.json();
  const postText = responseData[0].data.children[0].data.selftext;
  // get comments that have more than 2 upvotes
  const comments = responseData[1].data.children
    .map((d) => d.data)
    .filter((d) => d.ups >= upvoteMin);
  const data = [];
  data.push({ text: postText, url: "" });
  // get links and text for each comment and reply
  for (let i = 0; i < comments.length; i++) {
    // see if there are replies
    const comment = { text: "", url: "" };

    comment.text = comments[i].body;
    if (comments[i].media_metadata) {
      // if theres a pic attached
      const key = Object.keys(comments[i].media_metadata)[0];
      comment.url = comments[i].media_metadata[key].s.u;
      console.log("downloading pic", subreddit, comment.url, i);
      downloadPic(`${subreddit}-${i}`, comment.url);
    }

    // see if there are any replies and get all text
    if (comments[i].replies) {
      comment.text =
        comment.text + " " + comments[i].replies.data.children[0].data.body;

      // chained comments
      if (comments[i].replies.data.children[0].data.replies) {
        comment.text =
          comment.text +
          " " +
          comments[i].replies.data.children[0].data.replies.data.children
            .map((d) => d.data.body)
            .join(" ");
      }
    }

    // download pic from url - all these values are use once i think? -- ie if you use once,

    async function downloadPic(path, imgUrl) {
      const response = await fetch(imgUrl);
      const blob = await response.blob();
      const arrayBuffer = await blob.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      fs.writeFileSync(`${path}.jpg`, buffer);
    }

    //save data to csv
    data.push(comment);
  }
  // save data
  fs.writeFile(`${subreddit}.json`, JSON.stringify(data), "utf8", (err) => {
    if (err) {
      console.error("Error writing to file", err);
    } else {
      console.log("Data written to file");
    }
  });

  // console.log(data);
}

// ideally get name of biz and type of biz, then later feed into foursquare or some mapping api and map them with a tag???
// getComments(
//   "https://www.reddit.com/r/bayarea/comments/1qqixqa/drop_the_names_of_businesses_supporting_the/",
// );
getComments(
  "https://www.reddit.com/r/SaltLakeCity/comments/1qqok1s/if_you_must_shop_tomorrow_130/",
);

// can get addresses from IG handle profiles
// https://lataco.com/list-jan-30-national-shutdown

// https://www.reddit.com/r/LosAngeles/comments/1qrgqgk/la_businesses_that_closed_in_solidarity_with/
