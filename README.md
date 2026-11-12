# Inside Imane’s Brain

A fictional brain report for Imane, a medical student with an impressive commitment to naps.

## Open it

Double-click `index.html` to open it in a current browser. Use **Entrer dans l’arène** to open the game on `modules.html`. Keep both HTML files, `style.css`, `script.js`, `modules.js`, and the `assets` folder together. The site and game run offline without installation or a server.

## Make it yours

- Edit the opening, FMPC modules, lab report, or SVG illustrations in `index.html`. Edit the modules’ game dialogue, choices, and sources in `modules.js`. The sculpted hero brain lives in `assets/brain-model.webp`.
- Edit the brain-zone details, scan results, or game dialogue in `script.js`. If you change the zone percentages, update the HTML labels and the `.distribution` columns in CSS as well.
- Change the palette and typography using the custom properties at the top of `style.css`.

## Share it

For offline sharing, zip the two HTML files, stylesheet, two scripts, and `assets` folder together. Imane can extract them into one folder and open `index.html` in a desktop browser.

For a phone-friendly link, put the same files and `assets` folder at the root of a GitHub repository. Under **Settings → Pages**, choose **Deploy from a branch**, then select the branch with the files and **/(root)**. Once the site is live, send Imane its Pages URL. [GitHub Pages instructions](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

## Vercel hosting and analytics

Import the GitHub repository in Vercel with the **Other** framework preset. The build in `vercel.json` publishes the two pages and their assets. Turn on **Analytics** in the Vercel project and redeploy. Use that same **Analytics** tab to view visitor counts, page views, and device and browser breakdowns. [Vercel Web Analytics setup](https://vercel.com/docs/analytics/quickstart)
