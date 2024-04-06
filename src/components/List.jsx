import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
function List({ characterArr }) {
  function getColorForRace(race) {
    switch (race) {
      case "Human":
        return "#ADD8E6";
      case "Android":
        return "red";
      case "Namekian":
        return "green";
      case "Saiyan":
        return "orange";
      case "Frieza Race":
        return "purple";
    }
  }

  return (
    <>
      <table className="list">
        <thead>
          <tr>
            <th>Name</th>
            <th>Base Power Level</th>
            <th>Race</th>
          </tr>
        </thead>
        <tbody>
          {characterArr.map((character) => (
            <tr key={character.id}>
              <td>
                <Link to={`/${character.name}`}>{character.name}</Link>
              </td>
              <td>{character.ki}</td>
              <td style={{ color: getColorForRace(character.race) }}>
                {character.race}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default List;
