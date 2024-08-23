const express = require('express');
const request = require('request');
const cors = require('cors');
const axios = require('axios');

const app = express();
const dotenv = require('dotenv')
dotenv.config()
console.log(process.env.INCH_API_KEY)
app.use(express.json());
app.use(cors());
let config = {
    headers: {'Authorization': `Bearer ${process.env.INCH_API_KEY}`},
    params: {
        "src": "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        "dst": "0x111111111117dc0aa78b770fa6a738034120c302",
        "amount": "1000000000000",
        "includeTokensInfo": "true",
        "includeGas": "true"
    },
  }
app.get(`/test`, async(req, res) => {
    //console.log(Id)
   await axios
    .get(
      `https://api.1inch.dev/swap/v5.2/1/quote`,config
 ).then((response)=>{
        // console.log("worked");
        // console.log(response.data.streamKey)
        //console.log(response.data)
        const data = response.data;
        //const res2 = JSON.parse(response.data)
        res.json(data)
       
    }).catch( error => {
        console.error(`Could not get products: ${error}`);
        res.json(error)
    });
});

app.post('/getexchangerate', async(req,res)=>{
    // console.log(req.body)
    const exchangeconfig = {
        headers: {
            "Authorization": `Bearer ${process.env.INCH_API_KEY}`
          },
                params: {
            "src": req.body.src,
            "dst": req.body.dst,
            "amount": "100000000000000",
            "includeTokensInfo": "true",
            "includeGas": "true",

          }
    }
    await axios.get(`https://api.1inch.dev/swap/v5.2/${req.body.chain}/quote`, exchangeconfig).then((response)=>{
        const data = response.data
        res.json(data)
    }).catch(error=>{
        console.error(`Could not get products: ${error}`)
        res.json(error)
    })
})

app.post('/getcalldata', async(req, res)=>{
    const swapconfig = {
        headers: {
            "Authorization": `Bearer ${process.env.INCH_API_KEY}`
          },
                params: {
            "src": req.body.src,
            "dst": req.body.dst,
            "amount": req.body.amount,
            "from": req.body.from,
            "slippage": "1",
            "disableEstimate": "true"
          }
    }
    await axios.get(`https://api.1inch.dev/swap/v5.2/${req.body.chain}/swap`, swapconfig).then((response)=>{
        const data = response.data
        res.json(data)
    }).catch(error=>{
        console.error(`Could not get products: ${error}`)
        res.json(error)
    })
})


app.get('/gettokenlist', async(req,res)=>{
    await axios
        .get(
            `https://api.1inch.dev/swap/v5.2/1/tokens`, config
        ).then((response)=>{
            const data = response.data;
            res.json(data)
        }).catch(error=>{
            console.error(`Could not get products: ${error}`)
            res.json(error)
        });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
//app.listen(8080);