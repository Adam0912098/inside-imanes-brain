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

## View site visits

In Sites, open **Inside Imane’s Brain — Visit Log**, then **Settings → Database → DB → site_visits**. Sort by `visited_at` to see the most recent entries. Timestamps are in UTC. The database viewer requires the Site owner’s account.

- Each page load has its own `visit_id`, a random ID used to avoid double-counting the submission. The page is either `home` or `modules`.
- With **Autoriser**, `visitor_id` can link visits from the same browser for up to 30 days. The browser ID is cleared locally when the visitor opts out or clears browser storage. The optional `device` and `browser` fields contain categories such as iPhone and Safari.
- Without **Autoriser**, the visit contains only its one-time ID, page, and time. The table contains no visitor names, exact hardware identifiers, IP addresses, or raw browser strings.

Visitors can change their choice under **Préférences de visite**. Choosing **Refuser** stops future device and browser details. The log covers pages that can reach the collector with JavaScript enabled.
