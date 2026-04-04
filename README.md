# Xotic PC RMA Tracker + Google Sheets + Email Starter

This package includes:

- `index.html` for GitHub Pages
- `.github/workflows/deploy-pages.yml` for Pages deployment
- `google-apps-script/Code.gs`
- `google-apps-script/appsscript.json`

## What it does
- Sends an email when a new RMA is created
- Sends an email when the status changes
- Logs both events into Google Sheets

## Setup

### 1. Create a Google Sheet
Create a sheet named `RMAs`.

Recommended headers for row 1:
- Timestamp
- Event Type
- Order Number
- RMA Number
- Customer Name
- Device Type
- Brand / Model
- Serial Number
- Status
- Reported Issues
- Possible Issues
- Warranty Text
- Warranty JSON

### 2. Create the Apps Script web app
Open Apps Script and paste in:
- `google-apps-script/Code.gs`
- `google-apps-script/appsscript.json`

Then update these values in `Code.gs`:
- `SHEET_ID`
- `SHARED_SECRET`
- `EMAIL_TO`

Deploy it as a **Web app**:
- Execute as: **Me**
- Who has access: **Anyone**

Copy the web app URL.

### 3. Update the GitHub Pages app
In `index.html`, replace:
- `PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE`
- `PASTE_YOUR_SHARED_SECRET_HERE`

### 4. Publish to GitHub Pages
Upload the files to your repo and set **Settings > Pages > Source** to **GitHub Actions**.

## Notes
- Email send is triggered from the browser event through Apps Script
- Status-change emails fire only when the status value actually changes
- The shared secret should match in both `index.html` and `Code.gs`
