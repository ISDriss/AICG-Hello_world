//#region  canvas setup and drawing
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let drawing = false;
let mode = 'pen';

// Initialize white background
ctx.fillStyle = '#fff';
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.lineWidth = 15;
ctx.lineCap = 'round';

canvas.addEventListener('mousedown', e => {
  drawing = true;
  draw(e);
});

canvas.addEventListener('mouseup', () => {
  drawing = false;
  ctx.beginPath();
});

canvas.addEventListener('mousemove', draw);

function draw(e) {
  if (!drawing) return;
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  ctx.strokeStyle = mode === 'pen' ? '#000' : '#fff';
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x, y);
}

document.getElementById('clearBtn').addEventListener('click', () => {
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  displayPredictions(new Array(10).fill(0));
});

document.getElementById('penBtn').addEventListener('click', () => (mode = 'pen'));
document.getElementById('eraserBtn').addEventListener('click', () => (mode = 'eraser'));

//#endregion

//#region  model selection

const modelSelect = document.getElementById('modelSelect');
const statusText = document.getElementById('status');
let modelSession = null;

// Dictionary: display name → model path
let net = null;
const models = {
  "NN1": "./nn1/nn1.js",
  "MLP": "./mnist_mlp/mnist_mlp.js",
  "ConvNet": "./mnist_convnet/mnist_convnet.js"
};

// Function to populate dropdown
function populateModelSelect(models) {
  modelSelect.length = 1;
  for (const [name, path] of Object.entries(models)) {
    const option = document.createElement('option');
    option.text = name;
    option.value = path;
    modelSelect.appendChild(option);
  }
}
// Initial population
populateModelSelect(models);

// Function to load selected model
async function loadSelectedModel(event) {
  const modelPath = event.target.value;
  const modelName = modelPath.split("/").pop().split(".")[0];
  const netModule = await import(modelPath);
  const device = await navigator.gpu.requestAdapter().then(a => a.requestDevice());
  net = await netModule.default.load(device, `./${modelName}/${modelName}.webgpu.safetensors`);
  console.log("✅ Model ready:", modelName);
}
document.getElementById("modelSelect").addEventListener("change", loadSelectedModel);

//#endregion

//#region  image processing and prediction

function preprocess_image(canvas) {
  // Create an offscreen 28x28 canvas
  const smallCanvas = document.createElement("canvas");
  smallCanvas.width = 28;
  smallCanvas.height = 28;
  const smallCtx = smallCanvas.getContext("2d");

  // Draw the original canvas scaled down to 28x28
  smallCtx.drawImage(canvas, 0, 0, 28, 28);

  // Get image data (RGBA)
  const imgData = smallCtx.getImageData(0, 0, 28, 28);
  const data = imgData.data;
  const gray = new Float32Array(28 * 28);

  // Convert to grayscale and normalize (0–1)
  for (let i = 0, j = 0; i < data.length; i += 4, j++) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const avg = (r + g + b) / 3;
    gray[j] = 1 - avg / 255;
  }

  // Return grayscale data for inference
  return gray;
}

async function runInference() {
  if (!net) return alert("Please load a model first!");

  const input = preprocess_image(canvas);
  const inputTensor = new Float32Array(784);
  inputTensor.set(input);

  const result = await net(inputTensor);
  const logits = Array.from(new Float32Array(result[0]));
  const probs = softmax(logits);
  console.log("Probability outputs:", probs);
  return probs;
}

function softmax(arr) {
  const max = Math.max(...arr);
  const exp = arr.map(x => Math.exp(x - max));
  const sum = exp.reduce((a, b) => a + b, 0);
  return exp.map(x => x / sum);
}

// run inference on mouse up
canvas.addEventListener('mouseup', async () => {
  drawing = false;
  ctx.beginPath();
  const probs = await runInference();
  displayPredictions(probs);
});

//#endregion

//#region display predictions

const predGrid = document.querySelector('.predictions-grid');

// Create 10 bars once
for (let i = 0; i < 10; i++) {
  const col = document.createElement('div');
  col.className = 'pred-col';
  col.innerHTML = `
    <div class="bar" id="bar${i}" style="height:0%"></div>
    <div class="label" id="label${i}">${i}</div>
  `;
  predGrid.appendChild(col);
}

function displayPredictions(probs) {
  probs.forEach((p, i) => {
    const bar = document.getElementById(`bar${i}`);
    const label = document.getElementById(`label${i}`);
    console.log(bar, label);
    bar.style.height = `${p * 100}%`;
    bar.style.backgroundColor = p === Math.max(...probs) ? '#ff0077' : '#03009b';
  });
}

//#endregion