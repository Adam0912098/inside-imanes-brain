"use strict";

(() => {
  const collector = "https://imane-brain-visit-log.darkalbum1.chatgpt.site/visit";
  if (location.origin !== "https://hajjiadam.me") return;

  const storageKey = "imane-visit-preference-v1";
  const preferenceAge = 30 * 24 * 60 * 60 * 1000;
  const page = document.body.dataset.visitPage;
  let currentPreference = readPreference();
  let visitId = crypto.randomUUID();
  let reportedConsent;

  const panel = document.createElement("section");
  panel.className = "visit-preference";
  panel.lang = "fr";
  panel.setAttribute("aria-labelledby", "visit-preference-title");
  panel.innerHTML = `
    <h2 id="visit-preference-title">Statistiques de visite</h2>
    <p>Ce site note l’heure et la page visitée. Autoriser aussi le type d’appareil, le navigateur et un identifiant aléatoire de ce navigateur ?</p>
    <div class="visit-options">
      <button type="button" class="button outline" data-consent="no">Refuser</button>
      <button type="button" class="button primary" data-consent="yes">Autoriser</button>
    </div>
  `;
  document.body.append(panel);

  const settings = document.querySelector("[data-visit-settings]");
  settings.hidden = false;
  settings.addEventListener("click", () => {
    panel.hidden = !panel.hidden;
    settings.setAttribute("aria-expanded", String(!panel.hidden));
    if (!panel.hidden) panel.querySelector('[data-consent="no"]').focus();
  });

  for (const button of panel.querySelectorAll("[data-consent]")) {
    button.addEventListener("click", () => {
      const allowed = button.dataset.consent === "yes";
      currentPreference = {
        allowed,
        visitorId: allowed ? currentPreference?.visitorId || crypto.randomUUID() : null,
        expires: Date.now() + preferenceAge
      };
      try {
        localStorage.setItem(storageKey, JSON.stringify(currentPreference));
      } catch {
        // Browsing and the current choice still work when storage is blocked.
      }
      panel.hidden = true;
      settings.setAttribute("aria-expanded", "false");
      settings.focus({ preventScroll: true });
      logVisit();
    });
  }

  window.addEventListener("storage", (event) => {
    if (event.key !== storageKey && event.key !== null) return;
    currentPreference = readPreference();
    if (currentPreference) {
      panel.hidden = true;
      settings.setAttribute("aria-expanded", "false");
    }
  });
  panel.hidden = Boolean(currentPreference);
  panel.id = "visit-preference";
  settings.setAttribute("aria-controls", panel.id);
  settings.setAttribute("aria-expanded", String(!panel.hidden));
  logVisit();
  window.addEventListener("pageshow", (event) => {
    if (!event.persisted) return;
    currentPreference = readPreference();
    visitId = crypto.randomUUID();
    reportedConsent = undefined;
    logVisit();
  });

  function readPreference() {
    try {
      const value = JSON.parse(localStorage.getItem(storageKey));
      if (!value || value.expires <= Date.now() || typeof value.allowed !== "boolean") return null;
      return value;
    } catch {
      return null;
    }
  }

  function logVisit() {
    const consent = Boolean(currentPreference?.allowed && currentPreference.visitorId);
    if (reportedConsent === consent || (reportedConsent === true && !consent)) return;
    reportedConsent = consent;
    const visit = { visitId, page, consent };
    if (consent) {
      const ua = navigator.userAgent;
      visit.visitorId = currentPreference.visitorId;
      visit.device = deviceType(ua);
      visit.browser = browserType(ua);
    }
    fetch(collector, {
      method: "POST",
      mode: "cors",
      credentials: "omit",
      referrerPolicy: "no-referrer",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify(visit)
    }).catch(() => { /* The site remains usable if the collector is unreachable. */ });
  }

  function deviceType(ua) {
    if (/iPhone|iPod/i.test(ua)) return "iPhone";
    if (/iPad/i.test(ua) || (/Macintosh/i.test(ua) && navigator.maxTouchPoints > 1)) return "iPad";
    if (/Android/i.test(ua)) return /Mobile/i.test(ua) ? "Android phone" : "Android tablet";
    if (/CrOS/i.test(ua)) return "Chromebook";
    if (/Windows/i.test(ua)) return "Windows PC";
    if (/Macintosh/i.test(ua)) return "Mac";
    if (/Linux/i.test(ua)) return "Linux PC";
    return "Other";
  }

  function browserType(ua) {
    if (/Edg(?:e|A|iOS)?\//i.test(ua)) return "Edge";
    if (/SamsungBrowser\//i.test(ua)) return "Samsung Internet";
    if (/(?:OPR|OPiOS|Opera)\//i.test(ua)) return "Opera";
    if (/(?:Firefox|FxiOS)\//i.test(ua)) return "Firefox";
    if (/(?:Chrome|CriOS)\//i.test(ua)) return "Chrome";
    if (/Safari\//i.test(ua)) return "Safari";
    return "Other";
  }
})();
