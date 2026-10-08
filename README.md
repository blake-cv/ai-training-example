# From idea to live link

An eight-chapter interactive presentation for a 10–15 minute beginner introduction to AI-generated websites, Git, GitHub, and GitHub Pages.

- **Presentation:** https://blake-cv.github.io/ai-training-example/
- **Source:** https://github.com/blake-cv/ai-training-example
- **Stack:** HTML, CSS, and vanilla JavaScript. No dependencies or build step.

## Run locally

From the repository root:

```bash
python3 -m http.server 3000
```

Open http://localhost:3000. Refresh after editing. The Google Fonts stylesheet requires internet access; system fonts provide an offline fallback.

## Present it

Use Next/Back, the left/right arrow keys, or the chapter selector. Arrow keys keep their normal behavior inside form controls. Links to the real repository and website open new tabs. Each chapter has a shareable fragment, such as `#commits`.

All editable examples are **simulations**. They stay in memory, reset on reload, and never call GitHub or a deployment API. The reset controls reset all three demos. Selecting or saving a snapshot resets the branch and publishing examples so they start from that snapshot. Merging adds a simulated version and resets publishing. The deck stays readable without JavaScript, but its controls require JavaScript.

### A 12-minute speaking outline

| Chapter | Time | Speaking cue / action |
| --- | --- | --- |
| The possibility | 1 min | “This is a website, and it’s also our presentation. By the end you’ll know how to share one of your own.” |
| Start with an idea | 2 min | Open the AI prompt. Explore the three file buttons. Explain content, presentation, and behavior. Emphasize checking AI output. |
| Meet Git & GitHub | 1.5 min | Git records versions; GitHub connects your project to others. Explain a repository and what pushing does. Browser uploads also create commits. |
| Save a version | 2 min | Change the headline to “A home for our next idea.” Save it, change it again, and save again. Select an earlier snapshot. Explain that later versions still exist. |
| Try a different direction | 1 min | Create the example branch, review the pull request, and merge. Point to the unchanged main version before merging. |
| Give it an address | 2 min | Advance each publishing step. Explain that the simulation runs on clicks, while real publishing takes time. GitHub Pages serves static files. |
| See it for real | 1 min | Open the actual repository, point out the three core files and commit history, then open the live site. |
| Your turn | 1.5 min | Offer the prompt and five-step checklist. Suggest one useful, small first project. |

The timings are rehearsal guidance, not an automatic timer. Test the real links before presenting. Once loaded, the local demos do not require a network connection.

## Starter AI prompt

> Create a fictional “Cohort launchpad” website for sharing learning resources and project ideas. Give me three complete files: index.html, styles.css, and script.js. Use plain HTML, CSS, and JavaScript with relative file paths. Make it responsive, readable, and accessible, with semantic HTML, keyboard-friendly controls, visible focus states, and support for reduced motion. Use placeholder content only. Do not add libraries, external fonts, a backend, accounts, analytics, secrets, or a build step. Explain how to preview the files locally and publish them with GitHub Pages.

Replace the fictional idea with something you want to make. Read the generated content and test the result before sharing it.

## Publish your first site through GitHub’s website

1. Create a **public repository** and select **Add README** to initialize its main branch.
2. Select **Add file → Upload files**. Upload `index.html`, `styles.css`, and `script.js` directly into the repository root. Add a short commit message and commit the files.
3. Open **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, select **main** and **/(root)**, then **Save**.
4. Wait for the Pages deployment to finish. Publishing can take up to 10 minutes. The Actions tab shows progress or errors.
5. Use **Visit site** under Pages and share the address. A project site normally uses `https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/`.

This presentation includes `.nojekyll` to serve the static files without Jekyll processing. Assets use relative paths so they work under the repository URL prefix. Future commits pushed to main trigger another deployment.

Public repositories and Pages sites are viewable by anyone. Keep private material, credentials, and API keys out of the files. This demo has no backend or form handling.

Official guides: [Create a Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site), [configure the publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site), and [GitHub Hello World](https://docs.github.com/en/get-started/start-your-journey/hello-world).

## Files and verification

- `index.html`: chapter content, forms, copyable prompts, real links, and accessible controls.
- `styles.css`: presentation layout and design tokens; mobile breakpoint at 860px.
- `script.js`: URL-fragment navigation, in-memory demos, file selector, and clipboard fallback.
- `favicon.svg` and `.nojekyll`: local icon and static hosting configuration.

After changes, walk through all chapters and demos in a browser. Check keyboard navigation, deep links and browser history, refresh, reduced motion, and copy fallback. At 375px width, verify no horizontal overflow or inaccessible controls. Disable JavaScript to verify all eight chapters remain readable. Check the console and network for errors, then repeat navigation and asset checks on the deployed site.
