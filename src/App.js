import React, { useState } from "react";
import SingleColor from "./SingleColor";

import Values from "values.js";
import img from "./color-palette.png";
let initialList = new Values("#2698b4").all(10);
initialList.pop();
function App() {
  const [color, setColor] = useState("");
  const [error, setError] = useState(false);
  const [list, setList] = useState(initialList);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      let colors = new Values(color).all(10);
      colors.pop();
      setError(false);
      setList(colors);
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <header>
        <div className="logo-container">
          <img src={img} alt="logo" />
          <h3>
            <span>Colors </span> Generator
          </h3>
        </div>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <label htmlFor="color">Enter a color: </label>
            <div className="input">
              <input
                type="text"
                name="color"
                onChange={(e) => setColor(e.target.value)}
                value={color}
                placeholder="Usage: #2698b4,red"
                className={`${error ? "error" : null}`}
              />
              <button className="btn" type="submit">
                generate
              </button>
            </div>
          </form>
        </div>
      </header>
      <section className="colors-grid">
        {list.map((item, index) => {
          return <SingleColor key={index} {...item} index={index} hexColor={"#" + item.hex} />;
        })}
      </section>
      <section className="copyright">
        Created by{" "}
        <a href="https://thembdev.com">
          <img src={"https://mbdev-utils.s3.eu-west-3.amazonaws.com/mbdev_logo_sm.svg"} alt="mbdev" />
        </a>
      </section>
    </React.Fragment>
  );
}

export default App;
