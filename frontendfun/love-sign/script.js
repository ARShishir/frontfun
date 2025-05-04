let k = 5;
const canvas = document.getElementById('graph');
const ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;
const scaleX = 100;
const scaleY = 100;
const originX = width / 2;
const originY = height / 2 + 50;
const clickSound = document.getElementById('clickSound');

function toCanvasX(x) {
  return originX + x * scaleX;
}

function toCanvasY(y) {
  return originY - y * scaleY;
}

function drawAxes() {
  ctx.strokeStyle = '#888';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, originY);
  ctx.lineTo(width, originY);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(originX, 0);
  ctx.lineTo(originX, height);
  ctx.stroke();
}

function drawGraph() {
  ctx.clearRect(0, 0, width, height);
  drawAxes();

  ctx.beginPath();
  ctx.strokeStyle = getComputedStyle(document.body).getPropertyValue('--accent') || '#1dd1a1';
  ctx.lineWidth = 2;

  let firstPoint = true;
  for (let px = -3; px <= 3; px += 0.01) {
    const x = px;
    const sqrtPart = 3 - x * x;
    if (sqrtPart < 0) continue;

    const y = Math.pow(Math.abs(x), 2 / 3) + 0.9 * Math.sin(k * x) * Math.sqrt(sqrtPart);
    const cx = toCanvasX(x);
    const cy = toCanvasY(y);

    if (firstPoint) {
      ctx.moveTo(cx, cy);
      firstPoint = false;
    } else {
      ctx.lineTo(cx, cy);
    }
  }
  ctx.stroke();
}

function changeK(delta) {
  if (clickSound) {
    clickSound.currentTime = 0; // Restart the audio from beginning
    clickSound.play();
  }

  k = Math.round((k + delta) * 100) / 100;
  document.getElementById('kDisplay').textContent = k.toFixed(0);
  drawGraph();
}

drawGraph();

// Theme toggle
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
  themeToggle.addEventListener('change', () => {
    document.body.classList.toggle('light-theme');
    drawGraph();
  });
}

// Editable Name Feature
const nameLabel = document.getElementById('nameLabel');
const nameInput = document.getElementById('nameInput');
const editIcon = document.getElementById('editIcon');
const saveIcon = document.getElementById('saveIcon');

function enterEditMode() {
  nameInput.value = nameLabel.textContent;
  nameLabel.style.display = 'none';
  nameInput.style.display = 'inline-block';
  editIcon.style.display = 'none';
  saveIcon.classList.add('visible');
  nameInput.focus();
}

function exitEditMode() {
  const newName = nameInput.value.trim();
  if (newName !== '') {
    nameLabel.textContent = newName;
  }
  nameLabel.style.display = 'inline-block';
  nameInput.style.display = 'none';
  saveIcon.classList.remove('visible');
}

editIcon.addEventListener('click', enterEditMode);
nameLabel.addEventListener('click', enterEditMode);
saveIcon.addEventListener('click', exitEditMode);
nameInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') exitEditMode();
});
nameInput.addEventListener('blur', () => {
  if (nameInput.style.display === 'inline-block') exitEditMode();
});