---
layout: ../layouts/TestLayout.astro
title: About Us

# 1. FIXED HERO DATA (This is new!)
hero_title: The New Fixed Hero
hero_subtitle: This text is now controlled by the sidebar inputs
hero_bg: bg-blue-50

# 2. PAGE BLOCKS (Only "2 Column" features go here now)
page_blocks:
  - _template: feature
    heading: First 2 Column Section
    text: <p>This is the first section below the hero.</p>
    image_path: /images/test-image.jpg
    reverse: false
  - _template: feature
    heading: Second 2 Column Section
    text: <p>This is the second section.</p>
    image_path: /images/test-image.jpg
    reverse: true
---