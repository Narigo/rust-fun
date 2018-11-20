import { Counter } from "wasm-test";

run();

function run() {
  const canvas = document.getElementById("canvas");
  canvas.height = canvas.clientHeight;
  canvas.width = canvas.clientWidth;

  let counting = false;
  let ctx = canvas.getContext("2d");

  const myCounter = Counter.new(canvas.width, canvas.height, 5);

  document.addEventListener("mouseup", () => {
    counting = !counting;
    requestAnimationFrame(tick);
  });

  function tick() {
    const { angle_min, angle_max, circle, x, y, radius } = myCounter;
    ctx.strokeStyle = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
    ctx.beginPath();
    if (circle) {
      ctx.arc(x, y, radius, angle_min, angle_max);
    } else {
      ctx.moveTo(x - radius, y - radius);
      ctx.lineTo(x + radius, y - radius);
      ctx.lineTo(x + radius, y + radius);
      ctx.lineTo(x - radius, y + radius);
      ctx.lineTo(x - radius, y - radius);
    }
    ctx.stroke();

    if (counting) {
      myCounter.count();
      requestAnimationFrame(tick);
    } else {
      console.log({ myCounter });
    }
  }
}
