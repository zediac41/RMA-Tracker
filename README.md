# Xotic PC RMA Tracker — Supabase Drop-in

This package is ready to upload to your GitHub repo.

## What you need to edit first
Open `index.html` and replace:

- `PASTE_YOUR_PROJECT_URL_HERE`
- `PASTE_YOUR_PUBLISHABLE_KEY_HERE`

with your real Supabase values.

## This package expects these columns on `public.rmas`
- id
- created_at
- updated_at
- order_number
- rma_number
- customer_name
- device_type
- brand_model
- serial_number
- windows_edition
- status
- reported_issues
- possible_issues
- in_manufacturer_warranty
- adp
- parts_labor
- shipping
- checklist_json
- notes_json
- completed_at

## If you have not added the extra JSON/date columns yet
Run this in Supabase SQL Editor:

```sql
alter table public.rmas
add column if not exists checklist_json jsonb not null default '[]'::jsonb,
add column if not exists notes_json jsonb not null default '[]'::jsonb,
add column if not exists completed_at timestamptz null;
```

## GitHub Pages
1. Upload the files to your repo
2. In GitHub, go to Settings > Pages
3. Set Source to GitHub Actions
4. Push to main
