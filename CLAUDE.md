# la-victoria Website

## Stack
- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- Resend (transactional emails)
- Vercel (hosting)

## Project Structure
src/app/          -- pages and layouts
src/app/api/      -- API routes
src/components/   -- reusable components
src/lib/          -- utilities, constants, types
public/           -- static assets (images, fonts, favicon)

## Design System
- Colors: defined in SITE.md
- Font: [primary font] + [secondary font if applicable]
- All pages must be mobile responsive (breakpoint: 768px)
- Use semantic HTML (nav, main, section, footer, article)
- Every image needs alt text
- Every page needs unique meta title and description

## Section Spacing Rule
Each section should define its own vertical padding. When two consecutive sections share the same visual background color, remove the top padding from the second section to prevent double-stacked gaps. When two consecutive sections have different background colors, both sections keep their full padding so the transition has proper breathing room. Use data attributes or class checks to determine whether backgrounds match. If any specific spot looks too tight or too loose, fix it with an explicit padding class on that individual section.

## Code Rules
- No "use client" unless the component needs interactivity (state, effects, event handlers)
- API keys only in /api/ routes or server components -- never in client code
- Use Next.js Image component for optimized images
- All forms need server-side validation
- No console.log in production code
- Keep components under 300 lines -- split if larger

## Git Rules
- NEVER push to GitHub or deploy to Vercel automatically after the initial setup
- NEVER run git push, vercel, or vercel --prod unless I explicitly ask
- All changes stay local until I test and push manually

## SEO Checklist (before launch)
- [ ] Unique meta title + description per page
- [ ] Open Graph + Twitter Card tags
- [ ] Schema markup (LocalBusiness + Service + BreadcrumbList)
- [ ] Dynamic sitemap (src/app/sitemap.ts)
- [ ] robots.ts with Allow: / and Sitemap reference
- [ ] robots meta: index: true, follow: true
- [ ] All images have alt text
- [ ] One h1 per page, proper heading hierarchy
- [ ] Canonical URLs set

## ADA Checklist (before launch)
- [ ] Semantic HTML (nav, main, section, footer)
- [ ] Skip navigation link
- [ ] All interactive elements keyboard accessible
- [ ] Focus states visible on all elements
- [ ] ARIA labels on icon buttons and links
- [ ] Color contrast WCAG AA (4.5:1 normal text)
- [ ] Form labels associated with inputs
- [ ] prefers-reduced-motion media query

## Performance Checklist (before launch)
- [ ] Images lazy loaded below fold
- [ ] Fonts preconnected and display=swap
- [ ] No unused imports
- [ ] Lighthouse mobile score 90+

## Security Checklist (before launch)
- [ ] No API keys in client code
- [ ] Server-side form validation
- [ ] Security headers in next.config.ts
- [ ] Custom 404 page
- [ ] Error boundary (error.tsx)
