# Kavya Sharma: Portfolio

Personal portfolio built with Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS v4. Every page is statically generated; there is no database.

## Structure

| Path | What it is |
| --- | --- |
| `lib/data.ts` | **All site content**: profile, experience, projects, skills, education, certifications. Edit this to update the site. |
| `app/page.tsx` | Home: hero, featured work, experience, skills, GitHub activity, contact |
| `app/about/page.tsx` | About: bio, career summary, education, certifications, leadership |
| `app/projects/` | Project listing and per-project case study pages |
| `app/api/contact/route.ts` | Contact form endpoint (emails via Resend) |
| `public/Kavya_Sharma_Resume.pdf` | Resume served by every "Download CV" button |
| `public/projects/` | Project cover images |

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build
```

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | Yes, for the contact form | API key from [resend.com](https://resend.com). Without it the form shows a "please email me directly" message instead of sending. |
| `CONTACT_TO_EMAIL` | No | Inbox that receives messages. Defaults to `profile.email` in `lib/data.ts`. |
| `CONTACT_FROM_EMAIL` | No | Sender address. Defaults to `onboarding@resend.dev`, which can only deliver to the email that owns the Resend account; set this after verifying your own domain in Resend. |
| `NEXT_PUBLIC_SITE_URL` | No | Canonical URL for Open Graph previews. On Vercel the production URL is detected automatically. |

## Updating content

- **Resume:** replace `public/Kavya_Sharma_Resume.pdf` (keep the file name) and update `lib/data.ts` to match.
- **New project:** add an entry to `projects` in `lib/data.ts` and a 16:9 cover image (1600×900) in `public/projects/`. Set `featured: true` to show it on the home page, and `type: 'Freelance'` for client work.
