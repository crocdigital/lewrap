# LeWrap - Working Notes

Marketing website for LeWrap (lewrap.com). Astro 5, deployed to Vercel via the
`@astrojs/vercel` adapter. Content is edited by the client through CloudCannon
CMS, which runs in **Headless Mode** (CloudCannon is CMS only, Vercel does the
building and hosting). Headless Mode is required because the site uses API
routes for the enquiry forms.

## Content structure

Content collections live in `src/content/`, defined in `src/content/config.ts`:

- `faq`
- `food`
- `landing-pages`
- `locations`
- `newsroom` (includes `_defaults.md`, the CloudCannon template for new posts)
- `popups`

Newsroom posts render through `src/pages/newsroom/[...slug].astro`.

API routes for the forms are in `src/pages/api/`: `contact.ts`,
`franchise-enquiry.ts` and `work-with-us.ts`. These are the reason the site runs
with an adapter rather than as a pure static build, and the reason CloudCannon
must stay in Headless Mode.

## Commands

```bash
npm run dev       # dev server
npm run build     # production build (output: dist/)
npm run preview   # preview production build
```

## Branches and workflow

- `staging` is the working branch. `main` is production.
- The client publishes newsroom articles through CloudCannon, and those commits
  land **directly on `main`**. This means `main` will regularly be ahead of
  `staging` without you having done anything.

Because of that, bring `main` down into `staging` **twice**: once before you
start work, and again immediately before raising the PR.

```bash
git checkout main && git pull && git checkout staging && git merge main && git push
```

Then raise the PR from `staging` into `main`.

Doing the second merge right before the PR keeps it a clean fast forward. Skip
it and you will be reconciling the client's articles against your changes inside
the PR, which is avoidable hassle.

## Gotchas

### .gitignore line merging

`.astro/` and `dist/` are both ignored and untracked. If either ever reappears
in the changes panel, open `.gitignore` and check the lines have not been glued
together.

This happened in August 2026: appending with `echo "dist/" >> .gitignore` when
the file had no trailing newline produced `.astro/dist/` on a single line, which
silently killed both rules. Both folders then got tracked, and every `npm run dev`
dirtied the working tree and blocked branch checkouts.

To verify a rule is actually matching:

```bash
git check-ignore -v .astro/settings.json
```

No output means the rule is not matching.

To untrack a folder that got committed before the ignore rule existed (the ignore
file only applies to files git is not already tracking):

```bash
git rm -r --cached <folder>
```

The folder stays on disk. Git just stops watching it.

### Newsroom "layout" field

The newsroom Markdown files still carry a `layout:` field in their frontmatter.
Astro 5 dropped support for this in content collections, so on every `npm run dev`
you get a block of messages like:

```
[ERROR] [glob-loader] The Markdown "layout" field is not supported in content
collections in Astro 5. Ignoring layout for "garlic-goodness.md".
```

**This is non-fatal despite the ERROR label.** Astro ignores the field and the
site renders correctly. Deliberately left as is.

If it is ever worth fixing: strip `layout:` from the frontmatter of the affected
files and apply the layout in `src/pages/newsroom/[...slug].astro` instead.

Two other places would need checking at the same time, otherwise new posts will
keep being created with the field:

- `src/content/newsroom/_defaults.md`, which is the CloudCannon defaults file
  used as the starting frontmatter for every new article
- the newsroom schema in `cloudcannon.config.yml`

### Deprecated Vercel import

The dev server warns that `@astrojs/vercel/serverless` is deprecated and should
be imported from `@astrojs/vercel` instead. Cosmetic for now, but worth changing
in `astro.config.mjs` at some point before the old path is removed.

### Instagram feed token

The Instagram feed token expires around late August / early September 2026. It
was issued around end of June 2026 and is a 60 day long lived token. The Meta app
is named "LeWrap Website Feed 2026".

The token is currently hardcoded client side in `InstagramBanner.astro`, which
means it is publicly readable in the JS bundle. Worth moving server side when
there is time.

## CMS rule

When adding or changing an editable field, always update `cloudcannon.config.yml`
in the same change so the client can still edit it in the CMS.
