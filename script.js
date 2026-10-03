"use strict";

/*
  VIRUS SIMULATOR
  ----------------
  This is a harmless visual simulation.

  It does NOT:
  - access files
  - modify files
  - install software
  - collect personal information
  - damage the device
  - create persistence
*/

const progressBar = document.getElementById("progressBar");
const scanPercent = document.getElementById("scanPercent");
const scanStatus = document.getElementById("scanStatus");
const filesScanned = document.getElementById("filesScanned");

const threatCount = document.getElementById("threatCount");
const riskLevel = document.getElementById("riskLevel");
const statusText = document.getElementById("statusText");

const terminal = document.getElementById("terminal");

const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");

const alertBox = document.getElementById("alertBox");
const alertMessage = document.getElementById("alertMessage");
const closeAlert = document.getElementById("closeAlert");

let progress = 0;
let running = false;
let timer = null;

const totalFiles = 8742;

const messages = [
  "Initializing visual security engine...",
  "Loading simulated threat database...",
  "Checking system environment...",
  "Scanning simulated directories...",
  "Analyzing suspicious patterns...",
  "Checking network activity...",
  "Analyzing process signatures...",
  "Scanning memory simulation...",
  "Checking browser environment...",
  "Comparing threat signatures...",
  "Generating simulated report...",
  "Finalizing visual scan..."
];

const fakeThreats = [
  "SUSPICIOUS_PATTERN.DEMO",
  "FAKE_PAYLOAD.SIM",
  "UNKNOWN_SIGNATURE.TEST",
  "SIMULATED_TROJAN.DEMO",
  "VISUAL_THREAT.TEST",
  "FAKE_RANSOMWARE.SIM"
];

function addTerminalLine(message) {
  const line = document.createElement("div");

  line.className = "terminal-line";

  line.innerHTML = `
    <span class="prompt">root@simulator:~$</span>
    ${escapeHTML(message)}
  `;

  terminal.appendChild(line);

  /*
    Keep terminal lightweight.
    Only the latest 18 lines remain visible.
  */
  while (terminal.children.length > 18) {
    terminal.removeChild(terminal.firstChild);
  }

  terminal.scrollTop = terminal.scrollHeight;
}

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function showAlert(message) {
  alertMessage.textContent = message;
  alertBox.classList.add("show");

  setTimeout(() => {
    alertBox.classList.remove("show");
  }, 3500);
}

function updateInterface() {
  progressBar.style.width = `${progress}%`;

  scanPercent.textContent = `${progress}%`;

  const scanned = Math.floor(
    totalFiles * (progress / 100)
  );

  filesScanned.textContent =
    `${scanned.toLocaleString()} / ${totalFiles.toLocaleString()}`;

  if (progress < 20) {
    scanStatus.textContent = "Initializing scan...";
    riskLevel.textContent = "LOW";
  } else if (progress < 50) {
    scanStatus.textContent = "Analyzing simulated data...";
    riskLevel.textContent = "MEDIUM";
  } else if (progress < 80) {
    scanStatus.textContent = "Suspicious activity detected...";
    riskLevel.textContent = "HIGH";
  } else if (progress < 100) {
    scanStatus.textContent = "Final threat analysis...";
    riskLevel.textContent = "CRITICAL";
  } else {
    scanStatus.textContent = "Simulation complete";
    riskLevel.textContent = "DEMO";
  }
}

function startSimulation() {
  if (running) {
    return;
  }

  running = true;

  statusText.textContent = "ACTIVE";

  addTerminalLine("Starting harmless visual simulation...");

  let messageIndex = 0;

  timer = setInterval(() => {

    progress += Math.floor(Math.random() * 4) + 1;

    if (progress > 100) {
      progress = 100;
    }

    updateInterface();

    /*
      Add simulated terminal messages.
    */
    if (Math.random() > 0.45 && messageIndex < messages.length) {
      addTerminalLine(messages[messageIndex]);
      messageIndex++;
    }

    /*
      Generate harmless fake threat numbers.
      These are only visual values.
    */
    if (progress > 25 && progress < 90) {
      const fakeCount = Math.floor(progress / 15);

      threatCount.textContent = fakeCount;
    }

    /*
      Occasionally display a visual alert.
    */
    if (
      progress > 30 &&
      progress < 90 &&
      Math.random() > 0.85
    ) {
      const threat =
        fakeThreats[
          Math.floor(Math.random() * fakeThreats.length)
        ];

      showAlert(
        `Simulated threat detected: ${threat}`
      );

      addTerminalLine(
        `WARNING: ${threat}`
      );
    }

    if (progress >= 100) {
      finishSimulation();
    }

  }, 180);
}

function finishSimulation() {
  clearInterval(timer);

  timer = null;
  running = false;

  progress = 100;

  updateInterface();

  statusText.textContent = "COMPLETE";

  threatCount.textContent =
    Math.floor(Math.random() * 8) + 3;

  addTerminalLine(
    "Visual simulation scan completed."
  );

  addTerminalLine(
    "No real system changes were performed."
  );

  addTerminalLine(
    "RESULT: HARMLESS DEMONSTRATION"
  );

  showAlert(
    "Simulation finished. No real virus was detected or installed."
  );
}

function stopSimulation() {
  clearInterval(timer);

  timer = null;
  running = false;

  statusText.textContent = "STOPPED";

  addTerminalLine(
    "Simulation manually stopped by user."
  );
}

function resetSimulation() {
  clearInterval(timer);

  timer = null;
  running = false;

  progress = 0;

  progressBar.style.width = "0%";
  scanPercent.textContent = "0%";

  scanStatus.textContent =
    "Initializing scan...";

  filesScanned.textContent =
    `0 / ${totalFiles.toLocaleString()}`;

  threatCount.textContent = "0";

  riskLevel.textContent = "LOW";

  statusText.textContent = "READY";

  terminal.innerHTML = `
    <div class="terminal-line">
      <span class="prompt">root@simulator:~$</span>
      Simulation reset.
    </div>
  `;

  alertBox.classList.remove("show");
}

startBtn.addEventListener(
  "click",
  startSimulation
);

stopBtn.addEventListener(
  "click",
  stopSimulation
);

resetBtn.addEventListener(
  "click",
  resetSimulation
);

closeAlert.addEventListener(
  "click",
  () => {
    alertBox.classList.remove("show");
  }
);

/*
  Initial interface state.
*/
updateInterface();
