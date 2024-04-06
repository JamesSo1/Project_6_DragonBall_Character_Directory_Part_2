import { useState, useEffect } from "react";
import "../App.css";
import Header from "./Header";
import Card from "./Card";
import List from "./List";
function Home() {
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [averageKi, setAverageKi] = useState(null);
  const [lowestKi, setLowestKi] = useState(null);
  const [highestKi, setHighestKi] = useState(null);
  const [nameString, setNameString] = useState("");
  const [minPowerLevel, setMinPowerLevel] = useState("");
  const [raceString, setRaceString] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          "https://dragonball-api.com/api/characters?limit=24"
        );
        const json = await response.json();
        setData(json.items);
      } catch (err) {
        console.log("Error fetching data: ", err);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    if (data) {
      let currAverageKi = 0;
      let currLowestKi = Number.MAX_SAFE_INTEGER;
      let currHighestKi = Number.MIN_SAFE_INTEGER;

      for (let i = 0; i < data.length; i++) {
        let ki = parseInt(data[i].ki.replace(/\./g, ""));

        currAverageKi += ki;

        if (ki < currLowestKi) {
          currLowestKi = ki;
        }

        if (ki > currHighestKi) {
          currHighestKi = ki;
        }
      }

      currAverageKi = Math.floor(currAverageKi / data.length);

      setAverageKi(currAverageKi);
      setLowestKi(currLowestKi);
      setHighestKi(currHighestKi);
    }
  }, [data]);

  const filterData = (event) => {
    event.preventDefault();
    let result = data;

    if (nameString != "") {
      result = data.filter(
        (character) => character.name.toLowerCase() == nameString.toLowerCase()
      );
    }
    if (minPowerLevel != "" && !isNaN(parseInt(minPowerLevel))) {
      result = result.filter(
        (character) =>
          parseInt(character.ki.replace(/\./g, "")) >= parseInt(minPowerLevel)
      );
    }
    if (raceString != "") {
      result = result.filter(
        (character) => character.race.toLowerCase() == raceString.toLowerCase()
      );
    }

    setFilteredData(result);
  };

  return (
    <div>
      <Header />

      {lowestKi >= 0 && (
        <Card dataType="Lowest Base Power Level" data={lowestKi} />
      )}

      {highestKi >= 0 && (
        <Card dataType="Highest Base Power Level" data={highestKi} />
      )}

      {averageKi >= 0 && (
        <Card dataType="Average Base Power Level" data={averageKi} />
      )}

      <form>
        <input
          type="text"
          placeholder="Enter Name..."
          onChange={(event) => {
            setNameString(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Enter Min Power Level..."
          onChange={(event) => {
            setMinPowerLevel(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Enter Race..."
          onChange={(event) => {
            setRaceString(event.target.value);
          }}
        />
        <button className="search-btn" onClick={filterData}>
          Search
        </button>
      </form>

      {data &&
        (filteredData ? (
          <List characterArr={filteredData} />
        ) : (
          <List characterArr={data} />
        ))}
    </div>
  );
}

export default Home;
