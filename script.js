//#region  canvas setup and drawing logic
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
});

document.getElementById('penBtn').addEventListener('click', () => (mode = 'pen'));
document.getElementById('eraserBtn').addEventListener('click', () => (mode = 'eraser'));

//#endregion

//#region  model selection logic
import * as ort from "https://cdn.jsdelivr.net/npm/onnxruntime-web/dist/ort.min.js";

const modelSelect = document.getElementById('modelSelect');
const statusText = document.getElementById('status');
let modelSession = null;

// Dictionary: display name → model path
const models = {
  "Model NN1": "single_mnist_model_nn1.onnx",
};

// Function to populate dropdown
function populateModelSelect(modelDict) {
  // Clear all existing options except the first
  modelSelect.length = 1;

  // Loop through keys of the dictionary
  for (const [displayName, path] of Object.entries(modelDict)) {
    const option = document.createElement('option');
    option.text = displayName;
    option.value = path;
    modelSelect.appendChild(option);
  }
}
// Initial population
populateModelSelect(models);

// Function to load selected model
async function loadSelectedModel(event) {
  const modelName = event.target.value;
  console.log("Loading:", modelName);

  // Access global ort (no import needed)
  const session = await window.ort.InferenceSession.create(modelName);
  console.log("✅ Model loaded:", session);
}

document.getElementById("modelSelect").addEventListener("change", loadSelectedModel);


//#endregion


//#region  image processing and prediction logic

function process_and_predict() {
  img = preprocess_image()
  prediction()
}

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
    gray[j] = 1 - avg / 255; // invert (white digit on black)
  }

  // Optionally save the 28x28 image
  // const link = document.createElement("a");
  // link.download = "canvas_28x28.png";
  // link.href = smallCanvas.toDataURL("image/png");
  // link.click();

  // Return grayscale data for inference
  return gray;
}

function prediction(ImageData) {
  // Placeholder for model prediction logic
  console.log("Predicting with processed image data:", ImageData);
}

//#endregion