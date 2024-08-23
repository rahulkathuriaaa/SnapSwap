import { Landing } from "./pages/Landing";
import { Navbar } from "./components/Navbar";
import { MutualFunds } from "./pages/MutualFunds";
import { Swap } from "./pages/Swap";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Finalswap } from "./components/Finalswap";
import { TokenSwap } from "./components/TokenSwap";
import { Congrats } from "./pages/Congrats";
import { response } from "./data/response";
import Compare from "./components/Compare";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const allCoins = Object.keys(response);

  const [largeCap, setLargeCap] = useState([]);

  const [midCap, setMidCap] = useState([]);

  const [smallCap, setSmallCap] = useState([]);

  // const [allTokens, setAllTokens] = useState([]);

  const [poolerData, setPoolerData] = useState({});

  const [responseData, setResponseData] = useState([]);
  // const [first, setfirst] = useState(second)

  const fetchData = async () => {
    try {
      const response1 = await axios.get(
        "https://gateway.lighthouse.storage/ipns/k51qzi5uqu5dht9a7tdv9q004vwph1x79fydqypd47dd8vzvy2zd8x51c406lf"
      );
      const response2 = await axios.get(
        "https://gateway.lighthouse.storage/ipns/k51qzi5uqu5dm1uuht9e59h4qrvqs9pjx8a3cf1sz7x7j0vyyolywu8v3abls8"
      );

      let flag1 = response1.data;

      let flag2 = response2.data;
      // console.log("response", flag1);
      // console.log("pooler", flag2);

      const response = await axios
        .get(`https://gateway.lighthouse.storage/ipfs/${flag1}`)
        .then((data) => data.data);

      const pooler = await axios
        .get(`https://gateway.lighthouse.storage/ipfs/${flag2}`)
        .then((data) => data.data);
      setSmallCap([]);
      setMidCap([]);
      setLargeCap([]);
      // console.log("response", response);
      // console.log("pooler", pooler);
      const data = Object.keys(response);
      data.map((coin) => {
        // console.log(response[coin].risk);
        if (response[coin].risk == "low") {
          // console.log({ [coin]: response[coin] });
          setLargeCap([...largeCap, { [coin]: response[coin] }]);
        } else if (response[coin].risk == "mid") {
          setMidCap([...midCap, { [coin]: response[coin] }]);
        } else {
          setSmallCap([...smallCap, { [coin]: response[coin] }]);
        }
      });
      setPoolerData(pooler);
      setResponseData(response);
    } catch (error) {}
  };

  useEffect(async () => {
    await fetchData();
  }, []);

  // console.log("all tokens", allTokens);

  return (
    <>
      <div className="min-h-[100vh] w-screen bg-gradient-to-r from-[#103C3D] to-[#141A28]">
        <Navbar />

        <Routes>
          <Route exact path="/" element={<Landing />}></Route>
          <Route
            exact
            path="/invest"
            element={
              <MutualFunds
                largeCap={largeCap}
                midCap={midCap}
                smallCap={smallCap}
                poolerData={poolerData}
                responseData={responseData}
              />
            }
          ></Route>
          <Route
            exact
            path="/token"
            element={
              <Swap poolerData={poolerData} responseData={responseData} />
            }
          ></Route>
          <Route exact path="/congrats" element={<Congrats />}></Route>

          <Route exact path="/invest/:fund" element={<TokenSwap />}></Route>

          <Route
            exact
            path="/coins/:coin"
            element={
              <TokenSwap poolerData={poolerData} responseData={responseData} />
            }
          ></Route>

          <Route exact path="/:swap" element={<Finalswap />}></Route>
          <Route
            exact
            path="/compare"
            element={
              <Compare poolerData={poolerData} responseData={responseData} />
            }
          ></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
