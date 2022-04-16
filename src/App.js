import React, { useState } from "react";
import SingleColor from "./SingleColor";

import Values from "values.js";

function App() {
  const [color, setColor] = useState("");
  const [error, setError] = useState(false);
  const [list, setList] = useState(new Values("#2698b4").all(10));

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      let colors = new Values(color).all(10);
      setError(false);
      setList(colors);
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <section className="container">
        <h3>Color Generator</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="color">Enter a color: </label>
          <input
            type="text"
            name="color"
            onChange={(e) => setColor(e.target.value)}
            value={color}
            placeholder="for example: #2698b4 or red"
            className={`${error ? "error" : null}`}
          />
          <button className="btn" type="submit">
            generate
          </button>
        </form>
      </section>
      <section className="colors">
        {list.map((item, index) => {
          return (
            <SingleColor
              key={index}
              {...item}
              index={index}
              hexColor={"#" + item.hex}
            />
          );
        })}
      </section>
    </React.Fragment>
  );
}

export default App;
