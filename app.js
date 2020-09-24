const canvas = document.querySelector("#jsCanvas");

let painting = false;

const ctx = canvas.getContext("2d");
ctx.strokeStyle = "#2f3640";
ctx.fillStyle = "#2f3640";
ctx.lineWidth = 2.5;

const colors = document.getElementsByClassName("jsColor");

Array.from(colors).forEach((color) =>
  color.addEventListener("click", onChangeColor)
);

function onChangeColor(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

const range = document.querySelector("input");

range.addEventListener("input", onHandleBrushSize);

function onHandleBrushSize(event) {
  ctx.lineWidth = event.target.value;
}

const fill = document.querySelector(".controls__btns--fill");
const paint = document.querySelector(".controls__btns--paint");
const save = document.querySelector(".controls__btns--save");

fill.addEventListener("click", fillMode);
paint.addEventListener("click", paintMode);
save.addEventListener("click", saveMode);

function fillMode() {
  ctx.fillRect(0, 0, 700, 700);
}

function paintMode() {
  canvas.addEventListener("mousemove", onMouseMove);
}

function saveMode() {
  const image = canvas.toDataURL("image/jpeg");
  const link = document.createElement("a");
  link.href = image;
  link.download = "9/23";
  link.click();
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function onPreventRightClick(event) {
  event.preventDefault();
}

function stopPainting() {
  painting = false;
}
function startPainting() {
  painting = true;
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("contextmenu", onPreventRightClick);
}
