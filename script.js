const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let drawing = false;
let mode = 'pen';

// Initialize black background
ctx.fillStyle = '#000';
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

  ctx.strokeStyle = mode === 'pen' ? '#fff' : '#000';
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
