"use strict";

const sources = {
  nerves: ["OpenStax · Nerfs crâniens", "https://openstax.org/books/anatomy-and-physiology-2e/pages/16-chapter-review"],
  filtration: ["OpenStax · Filtration glomérulaire", "https://openstax.org/books/anatomy-and-physiology-2e/pages/25-5-physiology-of-urine-formation"],
  adh: ["OpenStax · Régulation rénale", "https://openstax.org/books/anatomy-and-physiology-2e/pages/25-8-endocrine-regulation-of-kidney-function"],
  krebs: ["OpenStax · Cycle de Krebs", "https://openstax.org/books/concepts-biology/pages/4-3-citric-acid-cycle-and-oxidative-phosphorylation"],
  dyspnea: ["Clinical Methods · Dyspnée et orthopnée", "https://www.ncbi.nlm.nih.gov/books/NBK213/"],
  bls: ["American Heart Association · Adult BLS", "https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/adult-basic-life-support"],
  smallpox: ["OMS · Histoire de la variole", "https://www.who.int/emergencies/situations/smallpox/"]
};

const modules = [
  {
    name: "Anatomie 3", mark: "A3", color: "#d4b1ff",
    intro: "J’ai effacé les légendes de mon schéma. On voit ce que tu as retenu, Imane ?",
    win: "Schéma complété. Tu peux garder mon dernier surligneur.",
    questions: [
      {
        line: "Sur mon schéma, je pars de la rétine. Name that nerve.",
        prompt: "Quel nerf transmet les signaux visuels de la rétine ?",
        choices: ["Le nerf facial (VII)", "Le nerf optique (II)", "Le nerf trijumeau (V)"],
        correct: 1, fact: "Le nerf optique (II) transmet les signaux visuels de la rétine vers le cerveau.", source: sources.nerves
      },
      {
        line: "Deux fonctions pour un seul nerf. C’est mon genre de raccourci.",
        prompt: "Quel nerf transmet les informations liées à l’audition et à l’équilibre ?",
        choices: ["Le nerf hypoglosse (XII)", "Le nerf olfactif (I)", "Le nerf vestibulocochléaire (VIII)"],
        correct: 2, fact: "La branche cochléaire du VIII sert à l’audition, et sa branche vestibulaire à l’équilibre.", source: sources.nerves
      }
    ]
  },
  {
    name: "Physiologie II", mark: "H₂O", color: "#9edbdc",
    intro: "Welcome to the nephron. Ici, même une goutte d’eau doit passer un entretien.",
    win: "Entretien réussi. Je te laisse passer, avec ta bouteille d’eau.",
    questions: [
      {
        line: "Première étape du trajet. Montre-moi où le filtrat apparaît.",
        prompt: "Où le filtrat glomérulaire est-il recueilli ?",
        choices: ["Dans la capsule de Bowman", "Dans le tube collecteur", "Dans l’uretère"],
        correct: 0, fact: "Le plasma est filtré à travers la barrière glomérulaire. Le filtrat se recueille dans l’espace de Bowman.", source: sources.filtration
      },
      {
        line: "Il fait chaud, j’économise mon eau. Which hormone helps?",
        prompt: "Quelle hormone augmente la réabsorption d’eau dans les tubes collecteurs ?",
        choices: ["L’insuline", "L’adrénaline", "L’ADH (vasopressine)"],
        correct: 2, fact: "L’ADH favorise l’insertion d’aquaporines dans les cellules des tubes collecteurs, ce qui facilite la réabsorption d’eau.", source: sources.adh
      }
    ]
  },
  {
    name: "Biochimie clinique", mark: "ATP", color: "#ffbe9e",
    intro: "J’ai apporté le cycle de Krebs. Oui, tout le cycle. No shortcuts.",
    win: "Tour terminé. La mitochondrie t’accorde une pause snack.",
    questions: [
      {
        line: "Mon labo a trois portes. Une seule mène au cycle.",
        prompt: "Dans quel compartiment se déroule principalement le cycle de Krebs ?",
        choices: ["Le noyau", "La matrice mitochondriale", "Le cytosol"],
        correct: 1, fact: "La matrice mitochondriale est le principal lieu du cycle de Krebs.", source: sources.krebs
      },
      {
        line: "Next up, le bilan. Combien de NADH pour un tour ?",
        prompt: "Combien de NADH sont produits par acétyl-CoA dans le cycle de Krebs ?",
        choices: ["3 NADH", "1 NADH", "6 NADH"],
        correct: 0, fact: "Un tour du cycle produit trois NADH. Le bilan de deux tours est de six NADH.", source: sources.krebs
      }
    ]
  },
  {
    name: "Sémiologie médicale", mark: "Sx", color: "#f3aacd",
    intro: "Bienvenue au cabinet. Mon patient a des mots très simples. À toi de trouver les bons termes.",
    win: "Observation bien rédigée. Tu as écouté avant de sortir le stétho.",
    questions: [
      {
        line: "Mon patient dit « J’ai du mal à respirer ».",
        prompt: "Quel terme décrit cette sensation subjective ?",
        choices: ["Une tachypnée", "Une bradypnée", "Une dyspnée"],
        correct: 2, fact: "La dyspnée est une sensation de gêne respiratoire. La tachypnée désigne une fréquence respiratoire élevée.", source: sources.dyspnea
      },
      {
        line: "Il ajoute « Ça empire quand je m’allonge, et ça va mieux assis. »",
        prompt: "Quel terme décrit cette gêne respiratoire liée à la position allongée ?",
        choices: ["Une orthopnée", "Une apnée", "Une dyspnée d’effort"],
        correct: 0, fact: "L’orthopnée est une dyspnée qui apparaît ou s’aggrave en position allongée et s’améliore en se redressant.", source: sources.dyspnea
      }
    ]
  },
  {
    name: "Secourisme et fonctions vitales", mark: "+", color: "#fac886",
    intro: "Mannequin prêt, métronome prêt. Imane, on passe à la simulation adulte.",
    win: "Simulation validée. Même mon métronome est impressionné.",
    questions: [
      {
        line: "Le métronome attend son tempo. Pick the right beat.",
        prompt: "En RCP adulte, quel rythme de compressions recommande l’AHA ?",
        choices: ["60 à 80 par minute", "100 à 120 par minute", "140 à 160 par minute"],
        correct: 1, fact: "Les recommandations AHA 2025 indiquent 100 à 120 compressions thoraciques par minute pour l’adulte en arrêt cardiaque.", source: sources.bls
      },
      {
        line: "Une compression, puis une autre. Que se passe-t-il entre les deux ?",
        prompt: "Quel relâchement thoracique est recherché entre deux compressions ?",
        choices: ["Un relâchement partiel", "Une pression maintenue", "Un relâchement complet"],
        correct: 2, fact: "L’AHA recommande de laisser le thorax revenir complètement entre les compressions, sans s’appuyer dessus.", source: sources.bls
      }
    ]
  },
  {
    name: "Histoire de la médecine", mark: "H", color: "#d3c1a9",
    intro: "Le dernier boss tient dans un livre. Un très gros livre. Shall we time travel?",
    win: "Victory! Six modules vaincus. Tu peux enfin fermer tes fiches, Imane.",
    questions: [
      {
        line: "Je t’emmène en 1796. Un médecin teste une nouvelle façon de prévenir la variole.",
        prompt: "Qui a réalisé cette expérience de vaccination ?",
        choices: ["Edward Jenner", "Louis Pasteur", "Alexander Fleming"],
        correct: 0, fact: "En 1796, Edward Jenner a utilisé la vaccine pour tester une protection contre la variole.", source: sources.smallpox
      },
      {
        line: "Fast-forward. La campagne mondiale de vaccination arrive à son terme.",
        prompt: "En quelle année l’OMS a-t-elle déclaré la variole éradiquée ?",
        choices: ["1967", "1977", "1980"],
        correct: 2, fact: "L’OMS a déclaré la variole éradiquée en 1980. Le dernier cas naturel connu remontait à 1977.", source: sources.smallpox
      }
    ]
  }
];

const get = (id) => document.getElementById(id);
const board = document.querySelector(".battle-board");
const speech = get("speech-text");
const questionText = get("speech-question");
const source = get("fact-source");
const answers = get("answer-list");
const answerButtons = [...answers.querySelectorAll("button")];
const next = get("battle-next");
let moduleIndex = 0;
let questionIndex = 0;
let lives = 2;
let correctAnswers = 0;
let phase = "intro";

function render() {
  const module = modules[moduleIndex];
  const question = module.questions[questionIndex];
  const cleared = correctAnswers === module.questions.length;
  const lastModule = moduleIndex === modules.length - 1;
  const choosing = phase === "question";
  const showingFact = phase === "correct" || phase === "wrong";
  board.dataset.phase = phase;
  board.style.setProperty("--boss-color", module.color);
  get("speaker").textContent = module.name;
  get("boss-name").textContent = module.name;
  get("boss-mark").textContent = module.mark;
  get("boss-score").textContent = correctAnswers + "/2 réponses justes";
  get("battle-progress").textContent = (moduleIndex + Number(cleared)) + "/" + modules.length + " modules vaincus";
  get("battle-energy").textContent = lives + "/2 vies";
  questionText.hidden = !choosing;
  answers.hidden = !choosing;
  next.hidden = choosing;
  source.hidden = !showingFact;

  if (choosing) {
    speech.setAttribute("aria-describedby", "speech-question");
    speech.textContent = question.line;
    questionText.textContent = question.prompt;
    for (const [index, button] of answerButtons.entries()) {
      button.querySelector("strong").textContent = question.choices[index];
    }
  } else if (showingFact) {
    speech.removeAttribute("aria-describedby");
    speech.textContent = (phase === "correct" ? "Bien joué ! " : "Raté, une vie en moins. ") + question.fact;
    source.textContent = question.source[0] + " ↗";
    source.href = question.source[1];
    if (lives === 0) next.textContent = "Retenter le duel";
    else if (phase === "wrong") next.textContent = "Réessayer la question";
    else next.textContent = cleared ? "Voir la réaction" : "Question suivante";
  } else if (phase === "victory") {
    speech.textContent = module.win;
    next.textContent = lastModule ? "Rejouer depuis le début" : "Module suivant";
  } else {
    speech.textContent = module.intro;
    next.textContent = "Ready, boss.";
  }
}

next.addEventListener("click", () => {
  if (phase === "victory") {
    moduleIndex = (moduleIndex + 1) % modules.length;
    resetDuel();
  } else if (lives === 0) {
    resetDuel();
  } else if (phase === "correct" && correctAnswers === modules[moduleIndex].questions.length) {
    phase = "victory";
  } else {
    if (phase === "correct") questionIndex += 1;
    phase = "question";
  }
  render();
  speech.focus();
});

function resetDuel() {
  questionIndex = 0;
  lives = 2;
  correctAnswers = 0;
  phase = "intro";
}

for (const button of answerButtons) {
  button.addEventListener("click", () => {
    if (phase !== "question") return;
    const question = modules[moduleIndex].questions[questionIndex];
    if (Number(button.dataset.choice) === question.correct) {
      correctAnswers += 1;
      phase = "correct";
    } else {
      lives -= 1;
      phase = "wrong";
    }
    render();
    speech.focus();
  });
}

render();
