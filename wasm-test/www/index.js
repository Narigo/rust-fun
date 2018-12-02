import { Counter } from "wasm-test";

export function run() {
  const canvas = document.getElementById("canvas");
  canvas.height = canvas.clientHeight;
  canvas.width = canvas.clientWidth;

  let allTimes = [];
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
      endCounting();
    }
  });

  function endCounting() {
    counting = false;
    summarize();
    const allTime = allTimes.reduce((sum, time) => sum + time, 0);
    console.log(
      "average time spent in rust:",
      allTime / allTimes.length,
      "\n-",
      allTimes.length,
      "calls.",
      "\n- provided rands?",
      withRandProvided
    );
    allTimes = [];
  }

  function summarize() {
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
    allTimes = [...allTimes, ...measurements];
    measurements = [];
  }

  function getRandom() {
    return withRandProvided ? Math.random() : undefined;
  }

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
      myCounter.count(getRandom(), getRandom(), getRandom(), getRandom(), getRandom());
      const end = window.performance.now();
      measurements.push(end - start);
      if (measurements.length >= 300) {
        summarize();
      }
      requestAnimationFrame(tick);
    }
  }
}
