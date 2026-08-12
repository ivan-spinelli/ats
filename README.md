# Resume ATS Explorer

A static OpenUI5 English and Spanish resume keyword-matching demo. It runs entirely in the visitor's browser: resume text and job-posting text are never uploaded, stored, or sent to a server.

## What is included

- English and Spanish interface, including language-specific stop words
- OpenUI5 component, XML view, controller, and JSON view model
- Editable, hardcoded default resumes at `app/ats/model/defaultResume.js`
- Transparent, rule-based keyword matching with extracted email, phone, and word count
- No CAP service, database, backend, API key, package installation, or paid service

## Deploy to GitHub Pages

The included workflow at `.github/workflows/deploy-pages.yml` publishes `app/ats` whenever a commit is pushed to `main`.

1. Push this project to a GitHub repository whose default branch is `main`.
2. In the repository, open **Settings** → **Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Push a commit to `main` or run **Deploy GitHub Pages** from the **Actions** tab.

Your project site will be available at `https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/`.

## Configure the default resumes

Edit `app/ats/model/defaultResume.js`. These values are part of the public site source, so do not include private contact details.
