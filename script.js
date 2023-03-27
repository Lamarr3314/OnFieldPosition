// const mousePosText = document.getElementById("mouse-pos");
let mousePos = { x: undefined, y: undefined };
let field = document.getElementById("fullField");
let fieldLength = 622;
let fieldHeight = 315;
let maxWidth = 0;
let maxHeight = 0;
let listOfPoints = [];
for (let i = 0; i < 200000; i++) {
  if (window.matchMedia("(min-width: " + i + "px)").matches) {
    maxWidth = i;
  }
}
for (let i = 0; i < 20000; i++) {
  if (window.matchMedia("(min-height: " + i + "px)").matches) {
    maxHeight = i;
  }
}
window.onload = function () {
  if (maxWidth > 1200) {
    maxWidth = 622;
    maxHeight = 500;
  }
  setTimeout(function () {
    field.style.width = fieldLength + "px";
    field.style.height = fieldHeight + "px";
    field.style.marginTop = (maxHeight - fieldHeight) / 2 + "px";
    field.style.marginLeft = (maxWidth - fieldLength) / 2 + "px";
  }, 1100);
};

window.addEventListener("mousemove", (event) => {
  let cX = Math.round(event.clientX - maxWidth / 2) - 9;
  let cY = Math.round(event.clientY - maxHeight / 2) - 9;
  if (Math.abs(cX) < fieldLength && Math.abs(cY) < fieldHeight) {
    mousePos = { x: cX, y: cY };
  } else {
    mousePos = { x: 0, y: 0 };
  }
  //   mousePosText.textContent = `(${mousePos.x}, ${mousePos.y})`;
  console.log(mousePos);
});
