# Portfolio — Ephraim Aseda Quarshie

A personal portfolio website built with HTML, CSS and JavaScript, plus a small PHP backend for email (PHPMailer). Live demo: https://portfolio-sigma-seven-ty56blwx9d.vercel.app

## Contents
- `index.html` — main site
- `style.css` — styles
- `script.js` — frontend JS
- `CV.docx` — downloadable CV (note: path must match the link in `index.html`)
- `send_email.php` — backend email handler (uses PHPMailer)
- `PHPMailer-7.0.1/` — PHPMailer library
- `VERCEL_PHP_SETUP.md`, `QUICK_START.md`, `PHPMailer_Setup_Guide.md` — guides and docs

## Problem noticed: Download CV not working
The "Download CV" button in `index.html` points to `assets/CV.docx` but the file is currently at the repository root (`CV.docx`). This causes a broken link or 404 when users try to download.

Fix options:
1. Move the file into `assets/`:
   - git mv CV.docx assets/CV.docx
   - git commit -m "Move CV to assets to fix download link"
2. Or update `index.html` to point to the correct path:
   - Change `<a href="assets/CV.docx" ...>` to `<a href="CV.docx" ...>` (or `./CV.docx`)

Choose whichever matches your preferred asset organization. If you're using Vercel or another host, ensure static files are served from the chosen location.

## Local development
1. Clone the repo:
   git clone https://github.com/EphraimQuarhie/Portfolio.git
2. Open `index.html` in a browser for a static preview.
3. If testing email locally, use a PHP server (PHP 8+ recommended):
   php -S localhost:8000
   Then open http://localhost:8000 in your browser.

## Email (send_email.php & PHPMailer)
- Do NOT commit SMTP usernames or passwords. Use environment variables or a server-side config file excluded by `.gitignore`.
- Configure PHPMailer in `send_email.php` to read credentials from environment variables (e.g., `getenv('SMTP_USER')`).
- Ensure `send_email.php`:
  - Validates and sanitizes input (name, email, message).
  - Uses TLS/SSL for SMTP (SMTPS or STARTTLS).
  - Implements rate limiting / spam protection (CAPTCHA recommended).
  - Returns safe error messages to users while logging details server-side.

See `PHPMailer_Setup_Guide.md` for more details.

## Deployment notes (Vercel)
- This project has `vercel.json`. Verify build & output settings in the Vercel dashboard.
- Ensure static files (like the CV) are included in the deployment output. If using a static framework that requires `public/`, move static assets accordingly.

## Security & privacy
- If the CV contains personal or sensitive data, confirm visibility settings for the deployed site and repository.
- Remove any credentials from the repo history if they were accidentally committed (consider using the GitHub secret scanning and rotate credentials).

## Suggested next steps
- Decide whether to move `CV.docx` into `assets/` or update the link in `index.html`.
- I can:
  - create and push a small commit to move the CV and update index.html, OR
  - open and review `send_email.php` in detail and propose precise secure changes.
  If you'd like me to push changes, reply and I will create the commit and PR (please confirm).

## License
Add your desired license here (e.g., MIT).
