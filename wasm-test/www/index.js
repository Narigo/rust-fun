import { Counter } from "wasm-test";

run();

function run() {
  const canvas = document.getElementById("canvas");
  canvas.height = canvas.clientHeight;
  canvas.width = canvas.clientWidth;

  let counting = false;
  let ctx = canvas.getContext("2d");

  const myCounter = Counter.new(canvas.width, canvas.height);

  document.addEventListener("mouseup", () => {
    counting = !counting;
    requestAnimationFrame(tick);
  });

  function tick() {
    const { x, y, radius } = myCounter;
    ctx.strokeStyle = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 360);
    ctx.stroke();

    if (counting) {
      myCounter.count();
      requestAnimationFrame(tick);
    } else {
      console.log({ myCounter });
    }
  }
}
