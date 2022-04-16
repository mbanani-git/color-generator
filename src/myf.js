export default function convertRgb(rgb) {
  let a = rgb.map((item) => {
    let hex = parseInt(item, 10).toString(16);
    if (hex.length < 2) {
      hex = "0" + hex;
    }
    return hex;
  });
  a.unshift("#");
  a = a.join("");
  return a;
}
