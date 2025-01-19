import fsqDevelopers from "@api/fsq-developers";

fsqDevelopers.auth("QTZD2NMLPUH4V44WBE5XINC0EFUDVN2RWAA4WCMP21KL2J0N");
fsqDevelopers
  .getUserCheckins({ v: "20231010", limit: "100", offset: "0" })
  .then(({ data }) => console.log(data))
  .catch((err) => console.error(err));
