import { Counter } from "wasm-test";

export function run() {
  const canvas = document.getElementById("canvas");
  canvas.height = canvas.clientHeight;
  canvas.width = canvas.clientWidth;

  let measurements = [];
  let counting = false;
  let clicked = 0;
  let withRandProvided = true;
  let ctx = canvas.getContext("2d");

  const myCounter = Counter.new(canvas.width, canvas.height);

  document.addEventListener("mouseup", () => {
    counting = !counting;
    if (counting) {
      withRandProvided = clicked % 2 === 0;
      clicked = clicked + 1;
      requestAnimationFrame(tick);
    } else {
      const allTime = measurements.reduce((sum, time) => sum + time, 0);
      console.log(
        "average time spent in rust:",
        allTime / measurements.length,
        "\n-",
        measurements.length,
        "calls.",
        "\n- provided rands?",
        withRandProvided
      );
      measurements = [];
    }
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
      const start = window.performance.now();
      if (withRandProvided) {
        myCounter.count_with_provided_rands(Math.random(), Math.random(), Math.random(), Math.random(), Math.random());
      } else {
        myCounter.count();
      }
      const end = window.performance.now();
      measurements.push(end - start);
      requestAnimationFrame(tick);
    }
  }
}
