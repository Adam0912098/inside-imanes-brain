"use strict";

const select = (selector) => document.querySelector(selector);

const report = select(".report");
const reportObserver = new IntersectionObserver(([entry], observer) => {
  if (!entry.isIntersecting) return;
  report.classList.add("in-view");
  observer.disconnect();
}, { threshold: 0.35 });
reportObserver.observe(report);

const zones = {
  sleep: {
    name: "Sleep",
    share: 80,
    icon: "moon",
    tint: "var(--lavender)",
    summary: "The headquarters. The main office. The entire management team.",
    description: "Siestes d’urgence, recherche sur les couvertures et protocole « five more minutes ».",
    fact: "Alarm clocks have officially filed complaints."
  },
  medicine: {
    name: "Médecine",
    share: 15,
    icon: "medical",
    tint: "var(--pink)",
    summary: "A brilliant little department powered by notes, determination, and occasional panic.",
    description: "Étudie le corps humain pendant qu’Imane rêve de son oreiller.",
    fact: "Sleep Zone keeps requesting a study break."
  },
  food: {
    name: "Food",
    share: 4,
    icon: "food",
    tint: "var(--peach)",
    summary: "Small department. Extremely persuasive.",
    description: "Une envie de snack apparaît toujours au pire moment des révisions.",
    fact: "Can interrupt any lecture with “Wait, what are we eating?”"
  }
};

const dialogOpeners = new WeakMap();

function openDialog(dialog, opener) {
  dialogOpeners.set(dialog, opener);
  dialog.showModal();
}

for (const dialog of document.querySelectorAll("dialog")) {
  dialog.addEventListener("close", () => {
    if (!dialog.open) dialogOpeners.get(dialog)?.focus({ preventScroll: true });
  });
  for (const button of dialog.querySelectorAll("[data-close]")) {
    button.addEventListener("click", () => dialog.close());
  }
}

const zoneDialog = select("#zone-dialog");
const medicineModules = select("#medicine-modules");

for (const button of document.querySelectorAll("[data-zone]")) {
  button.setAttribute("aria-haspopup", "dialog");
  button.addEventListener("click", () => {
    const zone = zones[button.dataset.zone];
    select("#zone-title").textContent = zone.name;
    select("#zone-share").textContent = zone.share + " % de l’attention d’Imane";
    select("#zone-share").lang = "fr";
    select("#zone-summary").textContent = zone.summary;
    select("#zone-description").textContent = zone.description;
    select("#zone-description").lang = "fr";
    select("#zone-fact").textContent = "Fun fact: " + zone.fact;
    select("#zone-icon").setAttribute("href", "#" + zone.icon);
    zoneDialog.style.setProperty("--zone-tint", zone.tint);
    medicineModules.hidden = button.dataset.zone !== "medicine";
    openDialog(zoneDialog, button);
  });
}

const moon = select(".moon-button");
const moonHint = select("#moon-hint");
let moonTaps = 0;

moon.addEventListener("click", () => {
  moonTaps += 1;
  if (moonTaps < 3) {
    moonHint.textContent = moonTaps === 1 ? "Encore deux taps." : "Encore un tap.";
    select("#moon-status").textContent = moonHint.textContent;
    return;
  }
  moonTaps = 0;
  const enabled = document.body.classList.toggle("ultra-sleep");
  moon.setAttribute("aria-pressed", String(enabled));
  moonHint.textContent = enabled ? "Mode Ultra Sleep activé." : "Trois taps sur la lune…";
  select("#moon-status").textContent = enabled ? moonHint.textContent : "Mode Ultra Sleep désactivé.";
});

const scanDialog = select("#scan-dialog");
const scanProgress = select("#scan-progress");
const scanStatus = select("#scan-status");
const scanAgain = select("#scan-again");
const scanSteps = [
  "Locating neurons…",
  "Test de compatibilité avec l’oreiller…",
  "Consulting the snack department…"
];
const scanResults = [
  "Scan complete. One brain. Several dreams. Zero alarm-clock negotiations.",
  "Medical knowledge detected. Pillow attachment: stronger.",
  "Imane’s brain has entered airplane mode. Please try after a nap.",
  "Circuit neuronal le plus actif : bureau → lit.",
  "Remarkable talent detected: thinking about sleep while studying sleep.",
  "Le département des snacks demande à être payé en biscuits.",
  "A full medical vocabulary was found under three layers of blanket.",
  "Scan confirms Imane can identify every bone in the body and the cold side of any pillow.",
  "One neuron was about to volunteer for an early lecture. The others put it back to bed."
];
let scanFrame = 0;
let scanTimer = 0;
let previousResult = -1;

function stopScan() {
  clearTimeout(scanTimer);
  cancelAnimationFrame(scanFrame);
  scanTimer = 0;
  scanDialog.classList.remove("scanning");
}

function finishScan() {
  stopScan();
  if (!scanDialog.open) return;
  scanProgress.value = 100;
  const choices = scanResults.length - Number(previousResult >= 0);
  let result = Math.floor(Math.random() * choices);
  if (previousResult >= 0 && result >= previousResult) result += 1;
  previousResult = result;
  scanStatus.textContent = scanResults[result];
  scanAgain.hidden = false;
}

function runScan() {
  if (scanTimer) return;
  scanDialog.classList.add("scanning");
  scanDialog.querySelector(".close-button").focus();
  scanAgain.hidden = true;
  scanProgress.value = 0;
  scanStatus.textContent = scanSteps[0];

  const start = performance.now();
  const duration = 2650;
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let step = 0;

  function advance(now) {
    const fraction = Math.max(0, Math.min((now - start) / duration, 1));
    const nextStep = Math.min(Math.floor(fraction * scanSteps.length), scanSteps.length - 1);
    if (!reducedMotion || step !== nextStep) {
      scanProgress.value = (reducedMotion ? nextStep / scanSteps.length : fraction) * 100;
    }
    if (step !== nextStep) scanStatus.textContent = scanSteps[nextStep];
    step = nextStep;
    scanFrame = requestAnimationFrame(advance);
  }

  scanTimer = setTimeout(finishScan, duration);
  scanFrame = requestAnimationFrame(advance);
}

const scanButton = select("#run-scan");
scanButton.addEventListener("click", () => {
  if (scanDialog.open) return;
  stopScan();
  openDialog(scanDialog, scanButton);
  runScan();
});
scanAgain.addEventListener("click", runScan);
scanDialog.addEventListener("close", () => {
  if (!scanDialog.open) stopScan();
});

const game = select(".game");
const gameButton = select("#game-action");
const gameStatus = select(".game-status");
const attemptMarks = [...game.querySelectorAll(".attempts span")];
const attempts = [
  "0/3 · Imane dort. Chut…",
  "1/3 · « Encore cinq minutes, je suis en plein rêve. »",
  "2/3 · « Ma couverture et moi sommes en réunion. »",
  "3/3 · Impossible de réveiller Imane. Elle dort toujours."
];
let attempt = 0;

gameButton.addEventListener("click", () => {
  attempt = (attempt + 1) % attempts.length;
  const finished = attempt === attempts.length - 1;
  game.classList.toggle("game-finished", finished);
  gameStatus.textContent = attempts[attempt];
  gameButton.textContent = finished ? "Rejouer" : "Réveiller Imane";
  attemptMarks.forEach((mark, index) => mark.classList.toggle("used", index < attempt));
});

const pillow = select(".pillow-button");
let pillowTimer;

function unlockPillow() {
  select("#pillow-secret").hidden = false;
  pillow.setAttribute("aria-expanded", "true");
  select("#pillow-hint").textContent = "L’oreiller a rendu son rapport.";
}

pillow.addEventListener("click", unlockPillow);
pillow.addEventListener("pointerdown", (event) => {
  if (event.isPrimary && event.button === 0) pillowTimer = setTimeout(unlockPillow, 550);
});
for (const event of ["pointerup", "pointercancel", "pointerleave"]) {
  pillow.addEventListener(event, () => clearTimeout(pillowTimer));
}
pillow.addEventListener("contextmenu", (event) => event.preventDefault());
