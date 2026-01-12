---
layout: ../layouts/TestLayout.astro
title: About Our Test
page_blocks:
  - _template: hero
    title: Welcome to the About Page
    subtitle: Built with Astro, editable in CloudCannon.
    bg_color: bg-black
  - _template: feature
    heading: Our Vision
    text: Smooth sailing and no refactoring later.
    image_path: /images/home/home-slider-01.webp
    reverse: true
  - _template: feature
    heading: Our Mission
    text: To test this integration before building the whole site.
    image_path: /images/home/home-slider-01.webp
    reverse: false
  - _template: feature
    heading: New Feature
    text: Description text
    image_path: /images/home/home-slider-01.webp
    reverse: true
  - _template: feature
    heading: Adding new Feature (with new image)
    text: This better work aye brah! Plus we need to turn text into a WYSIWG filed
    image_path: /images/PLACEMENT-hero-taj.webp
    reverse: false
  - _template: feature
    heading: Trying a new image (to see path image uploads to)
    text: This better work aye broseph!
    image_path: /images/placement-hero.webp
    reverse: true
---
