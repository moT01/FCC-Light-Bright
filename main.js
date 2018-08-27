/*GLOBAL VARIABLES*/
const rows = 15,
  columns = 15,
  root = document.getElementById('root'),
  resetAll = document.getElementById('resetAll'),
  colors = ['rgb(255, 100, 100)', 'rgb(100, 255, 100)', 'rgb(100, 100, 255)', 'rgb(255, 255, 255)'];

let colorIndex = -1,
  mouseIsDown = false,
  clickCount = 0,
  lastAdded;


//add all the lights to the DOM
for(let i=0; i<rows; i++) {
  const row = document.createElement('div');
  row.className = 'row';
  root.appendChild(row);

  for(let j=0; j<columns; j++) {
    const light = document.createElement('div');
    light.className = 'light';
    row.appendChild(light);
  }
}


//add listeners to each light
const lights = document.getElementsByClassName('light');

for(let i=0; i<lights.length; i++) {
  lights[i].addEventListener('mousedown', () => {
    const lightIndex = colors.indexOf(window.getComputedStyle(lights[i]).getPropertyValue("background-color"));
    lightIndex < colors.length-1 ? colorIndex = lightIndex+1 : colorIndex = 0;
    lights[i].style.backgroundColor = colors[colorIndex];
    lastAdded = lights[i];
    mouseIsDown = true;
    clickCount++;
    setTimeout(() => {
      clickCount = 0;
    }, 200)

    if(clickCount >= 2) {
      lights[i].style.backgroundColor = 'rgb(0, 0, 0)';
      lastAdded = lights[i];
    }
  });

  lights[i].addEventListener('mouseover', () => {
    if(mouseIsDown) {
      lights[i].style.backgroundColor = colors[colorIndex];
      lastAdded = lights[i];
    }
  });
}

document.addEventListener('mouseup', () => {
  mouseIsDown = false;
});

resetAll.addEventListener('click', () => {
  for(let i=0; i<lights.length; i++) {
    lights[i].style.backgroundColor = 'rgb(0, 0, 0)';
  }
  currentColorIndex = -1;
});

undo.addEventListener('click' ,() => {
  lastAdded.style.backgroundColor = 'rgb(0, 0, 0)';
});
