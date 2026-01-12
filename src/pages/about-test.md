---
layout: ../layouts/TestLayout.astro
title: About Our Test
page_blocks:
  - _template: hero
    title: Welcome to the About Page
    subtitle: Built with Astro, editable in CloudCannon.
    bg_color: bg-black  # <--- CHANGED (Use a class, not hex)
  - _template: feature
    heading: Our Vision
    text: Smooth sailing and no refactoring later.
    image_path: /images/home/home-slider-01.webp # <--- CHANGED (Removed /public)
    reverse: true
  - _template: feature
    heading: Our Mission
    text: To test this integration before building the whole site.
    image_path: /images/home/home-slider-01.webp # <--- CHANGED (Removed /public)
    reverse: false
  - _template: feature
    heading: New Feature
    text: Description text
    image_path: /images/home/home-slider-01.webp # <--- CHANGED (Removed /public)
    reverse: false
---