import fsqDevelopers from "@api/fsq-developers";
import * as dotenv from "dotenv";
dotenv.config();

fsqDevelopers.auth(process.env.OAUTH_KEY as string);
fsqDevelopers
  .getUserCheckins({ v: "20231010", limit: "100", offset: "0" })
  .then(({ data }) => {
    console.log(data);
    console.log("\n\nOk, here is the first checkin:");
    console.log(data.response.checkins);
  })
  .catch((err) => console.error(err));
