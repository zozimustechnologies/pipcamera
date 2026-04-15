// PiP Camera - Camera page script

let stream = null;

async function startCamera() {
  // If camera is already running, stop it
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
    stream = null;
    const video = document.getElementById('video');
    video.srcObject = null;
    video.style.display = 'none';
    document.getElementById('pipBtn').disabled = true;
    document.getElementById('startBtn').textContent = 'Start Camera';
    updateStatus('Camera stopped', '');
    return;
  }

  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    updateStatus('Error: Camera API not supported', 'error');
    return;
  }

  try {
    updateStatus('Requesting camera permission...', '');

    // Try with preferred constraints first, fall back to basic if device is busy
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 640 }, height: { ideal: 480 } },
        audio: false
      });
    } catch (e) {
      // Fallback: simplest possible request
      stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    }

    const video = document.getElementById('video');
    video.srcObject = stream;
    video.style.display = 'block';
    document.getElementById('pipBtn').disabled = false;
    document.getElementById('startBtn').textContent = 'Stop Camera';
    updateStatus('Camera started. Click Enter PiP to continue.', 'success');
  } catch (error) {
    updateStatus('Error: ' + error.name + ' - ' + error.message, 'error');
  }
}

document.getElementById('startBtn').addEventListener('click', startCamera);

// Auto-start camera when page loads
startCamera();

document.getElementById('pipBtn').addEventListener('click', async () => {
  const video = document.getElementById('video');
  try {
    if (video !== document.pictureInPictureElement) {
      await video.requestPictureInPicture();
      updateStatus('Entered Picture-in-Picture mode', 'success');
      document.getElementById('pipBtn').textContent = 'Exit PiP';
    } else {
      await document.exitPictureInPicture();
      updateStatus('Exited Picture-in-Picture mode', '');
      document.getElementById('pipBtn').textContent = 'Enter PiP';
    }
  } catch (error) {
    updateStatus('Error: ' + error.name + ' - ' + error.message, 'error');
  }
});

// Handle PiP exit
document.addEventListener('leavepictureinpicture', () => {
  updateStatus('Exited Picture-in-Picture mode', '');
  document.getElementById('pipBtn').textContent = 'Enter PiP';
});

function updateStatus(message, type) {
  const statusEl = document.getElementById('status');
  const statusContainer = document.querySelector('.status');
  statusEl.textContent = message;
  statusContainer.className = 'status ' + type;
}
