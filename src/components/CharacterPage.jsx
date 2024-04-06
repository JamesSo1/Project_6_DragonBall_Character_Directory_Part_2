import "../App.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PowerLevelChart from "./PowerLevelChart";

function CharacterPage() {
  const { name } = useParams();
  const [data, setData] = useState(null);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          `https://dragonball-api.com/api/characters?name=${name}`
        );
        const json = await response.json();
        setData(json);
      } catch (err) {
        console.log("Error fetching data: ", err);
      }
    };

    getData();
  }, []);

  return (
    <>
      <h1>{name[0].toUpperCase() + name.slice(1).toLowerCase()}</h1>

      {data && (
        <PowerLevelChart basePowerLevel={data[0].ki.replace(/\./g, "")} />
      )}

      {/* The description is cut down to a single sentence */}
      <p>
        <b>Description:</b> {data && data[0].description.split(/[.!?]/)[0]}
      </p>
      <p>
        <b>Affiliation: </b> {data && data[0].affiliation}
      </p>
      <p>
        <b>Base Power Level: </b> {data && data[0].ki}
      </p>
      <p>
        <b>Max Power Level: </b> {data && data[0].maxKi}
      </p>
    </>
  );
}

export default CharacterPage;
