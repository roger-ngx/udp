const https = require("https");

export default async (req, res) => {
    try{
        const {text} = req.body;

        const response = await fetch(encodeURI(`https://183.96.253.147:6061/proxy/aibot/services/classification/news/finbert_v2?text=${text}}`), {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'API_KEY': 'ef43293877e13729966a340ac58d299b',
          },
          agent: new https.Agent({
            rejectUnauthorized: false
          }),
          mode: 'cors',
          // data: JSON.stringify(data)
        });

        const resData = await response.json();

        res.end(JSON.stringify(resData));

    }catch(ex){
        console.log(ex);
    }
};