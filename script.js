// const mousePosText = document.getElementById("mouse-pos");
let mousePos = { x: undefined, y: undefined };
let field = document.getElementById("fullField");
let positionBox = document.getElementById("positions");
let bumperLength = 10.5;
let robot = document.getElementById("mainRobot");
let robots = document.getElementById("robots");
let play = document.getElementById("playSim");
let positionText = document.getElementById("position");
let changeColor = document.getElementById("redAlliance");
let bumper = document.getElementById("bumper");
let changeUnit = document.getElementById("isMeters");
let customSub = document.getElementById("customSub");
let customX = document.getElementById("customX");
let customY = document.getElementById("customY");
let customR = document.getElementById("customR");
let customValues = [customX, customY, customR];
let metersConversion = 1;
let rotation = 0;
let color = "blue";
let time = 0;
let xMPS = 1;
let yMPS = 1;
let rRPS = 1;
let fieldLength = 622;
let fieldHeight = 315;
let maxWidth = 0;
let maxHeight = 0;
let robotLength = 39;
let robotHeight = 33;
let listOfPoints = [];
let finishedTranslation = true;
let lastFinishedTranslation = false;
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
  setTimeout(function () {
    field.style.width = fieldLength + "px";
    field.style.height = fieldHeight + "px";
    field.style.marginTop = (maxHeight - fieldHeight) / 2 + "px";
    field.style.marginLeft = (maxWidth - fieldLength) / 2 + "px";
    robot.style.width = robotLength + "px";
    robot.style.height = robotHeight + "px";
    robot.style.textAlign = "center";
  }, 1100);
};
customSub.onclick = function () {
  let x = null;
  let y = null;
  let r = null;
  if (isValidPoint(customX.value)) {
    x = Number(customX.value) * metersConversion;
    console.log("x: " + x);
    if (isValidPoint(customY.value)) {
      y = -(Number(customY.value) * metersConversion);
      console.log("y: " + y);
      if (isValidPoint(customR.value)) {
        r = Number(customR.value);
        console.log("r: " + r);
      }
    }
  }
  if (x !== null && y !== null && r !== null) {
    addPoint(x, y, r);
    let newDiv = document.createElement("div");
    newDiv.innerHTML = "<p>3314</p>";
    robots.appendChild(newDiv);
    moveRobot(x, y, r, newDiv);
    customX.value = "";
    customY.value = "";
    customR.value = "";
  }
  if (x == null) {
    alert("Please select a valid X point");
    customX.value = "";
  }
  if (y == null) {
    alert("Please select a valid Y point");
    customY.value = "";
  }
  if (r == null) {
    alert("Please select a valid rotation");
    customR.value = "";
  }
};
window.addEventListener("mousemove", (event) => {
  cX = Math.round(event.clientX - maxWidth / 2) - 9;
  cY = Math.round(event.clientY - maxHeight / 2);
  if (Math.abs(cX) < fieldLength && Math.abs(cY) < fieldHeight / 2) {
    if (cX > 225 + robotLength / 2) {
      cX = 229 + robotLength / 2;
    }
    if (cX < -(225 + robotLength / 2)) {
      cX = -(229 + robotLength / 2);
    }
    if (cY > 136) {
      cY = 140;
    }
    if (cY < -136) {
      cY = -140;
    }
    // if(cY<112&& cY<-14){// charging station collision
    //   if(cX<228 &&cX>116){

    //   }
    // }
    // if (cX < 232) {
    //   if (cX>232&&cX > 116) {
    //     cX = 228;
    //   }
    //   else{
    //     cX=116;
    //   }
    // }
    positionText.innerHTML =
      "(X: " +
      Math.round(100 * (cX / metersConversion)) / 100 +
      ", Y: " +
      -(Math.round(100 * (cY / metersConversion)) / 100) +
      ", R: " +
      rotation +
      ")";
    mousePos = { x: cX, y: cY };
    moveRobot(cX, cY, rotation, robot);
  } else {
    mousePos = { x: null, y: null };
  }
  //   mousePosText.textContent = `(${mousePos.x}, ${mousePos.y})`;
});

robot.onclick = function () {
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
    Math.round(100 * (x / metersConversion)) / 100 +
    "," +
    -(Math.round(100 * (y / metersConversion)) / 100) +
    "), new Rotation2d(" +
    r +
    "))</p>";
  positionBox.appendChild(newDiv);
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
  moveRobot(cX, cY, rotation, robot);
};
function moveRobot(x, y, r, element) {
  createMarginLeft(x, element);
  createMarginTop(y, element);
  createRotation(r, element);
}
function createMarginLeft(i, element) {
  element.style.marginLeft = i + maxWidth / 2 + -robotLength / 2 + "px";
}
function createMarginTop(i, element) {
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
function simulate(i) {
  let x = listOfPoints[i].x;
  let y = listOfPoints[i].y;
  let r = listOfPoints[i].r;
  let newDiv = document.createElement("div");
  newDiv.innerHTML = "<p>3314</p>";
  robots.appendChild(newDiv);
  newDiv.style.backgroundColor = color;
  newDiv.style.color = "white";
  newDiv.style.border = "1px solid " + color;
  newDiv.id = "testBot";
  newDiv.className = i;
  moveRobot(x, y, r, newDiv);
  setTimeout(function () {
    let directionX = -(listOfPoints[i].x - listOfPoints[i + 1].x);
    let directionY = -(listOfPoints[i].y - listOfPoints[i + 1].y);
    let directionR = -(listOfPoints[i].r - listOfPoints[i + 1].r);
    let Xtime = (Math.abs(directionX) / 40) * xMPS;
    let Ytime = (Math.abs(directionY) / 40) * yMPS;
    let Rtime = ((Math.abs(directionR) * Math.PI) / 180) * rRPS;
    console.log("Rtime: " + Rtime);
    console.log("Xtime: " + Xtime);
    console.log("Ytime: " + Ytime);
    time = largest(largest(Xtime, Ytime), Rtime);
    console.log("TIME: ", time);
    newDiv.style.transition = "all " + time + "s";
    newDiv.style.transform =
      "translate(" +
      directionX +
      "px," +
      directionY +
      "px) rotate(" +
      directionR +
      "deg)";
    newDiv.addEventListener("transitionend", (event) => {
      newDiv.remove();
      if (i < listOfPoints.length - 2) {
        simulate(i + 1);
      }
    });
  }, 10);
}
//-Add in simulation, div element goes away once the point is reached, this may mean adding in a robotsMade counter
//convert points to how we use them, weird thing with x and y
//TODO: add interactions on the field, we can't go through the wall or a peg
playSim.onclick = function () {
  simulate(0);
};
function largest(one, two) {
  if (one > two) {
    return one;
  }
  return two;
}
changeColor.addEventListener("change", (e) => {
  if (e.target.checked === true) {
    color = "red";
  }
  if (e.target.checked === false) {
    color = "blue";
  }
});

changeUnit.addEventListener("change", (e) => {
  if (e.target.checked === true) {
    metersConversion = 39.37;
  }
  if (e.target.checked === false) {
    metersConversion = 1;
  }
});
