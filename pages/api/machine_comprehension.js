const https = require("https");

export default async (req, res) => {
    const {data, question} = req.query;
    console.log(req.query);

    const response = await fetch(encodeURI(`https://183.96.253.147:6061/api/v1/mrc/response_long_text?bertId=FinBERT_v2&Context=${data}&question=${question}`), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        agent: new https.Agent({
          rejectUnauthorized: false
        }),
        mode: 'cors',
        // data: JSON.stringify(data)
      });

      const resData = await response.json();

      res.end(JSON.stringify(resData));
};