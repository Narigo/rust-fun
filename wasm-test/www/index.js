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
    const wasmTime = allTimes.reduce((sum, time) => sum + time.wasmTime, 0);
    const jsTime = allTimes.reduce((sum, time) => sum + time.jsTime, 0);
    console.log(
      "average time spent in wasm:",
      wasmTime / allTimes.length,
      "\naverage time spent in js:",
      jsTime / allTimes.length,
      "\n-",
      allTimes.length,
      "calls.",
      "\n- provided rands?",
      withRandProvided
    );
    allTimes = [];
  }

  function summarize() {
    const wasmTime = measurements.reduce((sum, time) => sum + time.wasmTime, 0);
    const jsTime = measurements.reduce((sum, time) => sum + time.jsTime, 0);
    console.log(
      "average time spent in wasm:",
      wasmTime / measurements.length,
      "\naverage time spent in js:",
      jsTime / measurements.length,
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
    const startJs = window.performance.now();
    const { angle_min, angle_max, circle, x, y, radius } = myCounter;
    ctx.strokeStyle = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
    ctx.beginPath();
    if (circle) {
      ctx.arc(x, y, radius, angle_min, angle_max);
    } else {
      ctx.moveTo(x, y);
      ctx.lineTo(x + Math.cos(angle_max) * radius, y + Math.sin(angle_max) * radius);
      ctx.moveTo(x, y);
      ctx.lineTo(x + (Math.cos(angle_min) * radius) / 2, y + (Math.sin(angle_min) * radius) / 2);
    }
    ctx.stroke();
    const endJs = window.performance.now();

    if (counting) {
      const start = window.performance.now();
      const [a, b, c, d, e] = [getRandom(), getRandom(), getRandom(), getRandom(), getRandom()];
      myCounter.count(a, b, c, d, e);
      const end = window.performance.now();
      measurements.push({ jsTime: endJs - startJs, wasmTime: end - start });
      if (measurements.length >= 300) {
        summarize();
      }
      requestAnimationFrame(tick);
    }
  }
}
