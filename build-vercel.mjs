import { copyFileSync, cpSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";

const root = import.meta.url;
const output = new URL("./dist/", root);
const config = JSON.parse(process.env.VERCEL_OBSERVABILITY_CLIENT_CONFIG || "{}");
const analyticsPath = config.analytics?.scriptSrc || "/_vercel/insights/script.js";

if (!/^\/[\w/-]+\/script\.js$/.test(analyticsPath)) {
  throw new Error("Expected a same-origin Vercel Web Analytics script path.");
}

const analytics = `  <script>
    window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
  </script>
  <script defer src="${analyticsPath}"></script>
`;

mkdirSync(output, { recursive: true });
for (const file of ["index.html", "modules.html"]) {
  const html = readFileSync(new URL(file, root), "utf8");
  writeFileSync(new URL(file, output), html.replace("</head>", analytics + "</head>"));
}
for (const file of ["style.css", "script.js", "modules.js"]) {
  copyFileSync(new URL(file, root), new URL(file, output));
}
cpSync(new URL("assets/", root), new URL("assets/", output), { recursive: true });
