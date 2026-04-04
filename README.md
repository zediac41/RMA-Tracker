# Xotic PC RMA Tracker — Supabase + Email Drop-in

Before uploading, open `index.html` and replace:
- `PASTE_YOUR_PROJECT_URL_HERE`
- `PASTE_YOUR_PUBLISHABLE_KEY_HERE`

This package expects:
- your `rmas` table already works with the app
- your Supabase Edge Function is named `send-rma-email`
- your extra columns (`checklist_json`, `notes_json`, `completed_at`) already exist
