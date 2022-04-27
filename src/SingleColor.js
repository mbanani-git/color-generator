import React, { useState, useEffect } from "react";
//import rgbToHex from "./utils";

const SingleColor = ({ rgb, weight, type, index, hexColor, m }) => {
  const [hexrgb, setHexrgb] = useState("#");
  const [alert, setAlert] = useState(false);
  const background = rgb.join(",");
  //const a = rgbToHex(...rgb);

  const convertRgb = (rgb) => {
    let a = rgb.map((item) => {
      let hex = parseInt(item, 10).toString(16);
      if (hex.length < 2) {
        hex = "0" + hex;
      }
      return hex;
    });
    a.unshift("#");
    a = a.join("");
    setHexrgb(a);
  };
  useEffect(() => {
    convertRgb(rgb);
  }, [rgb]);
  useEffect(() => {
    let timeout = setTimeout(() => {
      setAlert(false);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [alert]);
  const copyClipboard = (params) => {
    if (navigator.clipboard && window.isSecureContext) {
      // navigator clipboard api method'
      return navigator.clipboard.writeText(hexColor);
    } else {
      // text area method
      let textArea = document.createElement("textarea");
      textArea.value = hexColor;
      // make the textarea out of viewport
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      return new Promise((res, rej) => {
        // here the magic happens
        document.execCommand("copy") ? res() : rej();
        textArea.remove();
      });
    }
  };
  return (
    <React.Fragment>
      <div
        className={`color ${index > 10 && "color-light"}`}
        style={{ backgroundColor: `rgb(${background})` }}
        onClick={() => {
          setAlert(true);
          copyClipboard();
        }}
      >
        <p className="percent-value">{weight}%</p>
        <p className="color-value">{hexrgb}</p>
        {/* <p className="color-value">{a}</p>
        <p className="color-value">{hexColor}</p> */}
        {alert && <p className="alert">copied to the clipboard</p>}
      </div>
    </React.Fragment>
  );
};

export default SingleColor;
