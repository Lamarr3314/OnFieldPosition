// const mousePosText = document.getElementById("mouse-pos");
let mousePos = { x: undefined, y: undefined };
let field = document.getElementById("fullField");
let positionBox = document.getElementById("positions");
let robot = document.getElementById("mainRobot");
let robots = document.getElementById("robots");
let rotation = 0;
let fieldLength = 622;
let fieldHeight = 315;
let maxWidth = 0;
let maxHeight = 0;
let robotLength = 33;
let robotHeight = 27;
let listOfPoints = [];
let cX = null;
let cY = null;
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
  cX = Math.round(event.clientX - maxWidth / 2) - 9;
  cY = Math.round(event.clientY - maxHeight / 2) - 9;
  if (Math.abs(cX) < fieldLength / 2 && Math.abs(cY) < fieldHeight / 2) {
    mousePos = { x: cX, y: cY };
    moveRobot(cX, cY, rotation, robot);
  } else {
    mousePos = { x: null, y: null };
  }
  //   mousePosText.textContent = `(${mousePos.x}, ${mousePos.y})`;
});

robot.onclick = function () {
  console.log("clicked");
  addPoint(cX, cY, rotation);
  let newDiv = document.createElement("div");
  newDiv.innerHTML = "<p>3314</p>";
  robots.appendChild(newDiv);
  moveRobot(cX, cY, rotation, newDiv);
};
function addPoint(x, y, r) {
  listOfPoints.push({ x: x, y: y, r: r });
  let newDiv = document.createElement("div");
  newDiv.innerHTML =
    "<p> new Pose2d(new Translate2d(" +
    Math.floor(x / 39.37) +
    "," +
    Math.floor(y / 39.37) +
    "), new Rotation2d(" +
    Math.floor((Math.PI / 180) * r) +
    "))</p>";
  positionBox.appendChild(newDiv);
  console.log(listOfPoints);
  moveRobot(x, y, r, robot);
}
function playAnimation() {}
document.onkeydown = function (event) {
  switch (event.keyCode) {
    case 37:
      rotation -= 5;
      break;
    case 39:
      rotation += 5;
      break;
  }
  rotation %= 181;
  console.log(rotation);
  moveRobot(cX, cY, rotation, robot);
};
function moveRobot(x, y, r, element) {
  createMarginLeft(x, element);
  createMarginRight(y, element);
  createRotation(r, element);
}
function createMarginLeft(i, element) {
  element.style.marginLeft = i + fieldLength / 2 - robotLength / 2 + "px";
}
function createMarginRight(i, element) {
  element.style.marginTop =
    i +
    (maxHeight - fieldHeight) / 2 +
    fieldHeight / 2 -
    robotHeight / 2 +
    "px";
}
function createRotation(i, element) {
  element.style.transform = "rotate(" + i + "deg)";
}
//TODO: Find better way of rounding, math.floor doesn't work properly
//-Add in simulation, div element goes away once the point is reached, this may mean adding in a robotsMade counter
//convert points to how we use them, weird thing with x and y
