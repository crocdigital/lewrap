---
layout: ../layouts/TestLayout.astro
title: About Us
hero_title: Welcome
hero_subtitle: Subtitle here
hero_bg: bg-white
page_blocks:
  - _template: feature
    heading: Nobody makes a wrap like us
    text: >-
      <p>This is the first section below the hero. I should really upload 1:1
      ratio images as per my instructions below in the Image field
      aye!</p><p>Now, I'm in full <strong>editing mode</strong> (see what I did
      there with formatting bra). I'm adding this line of text to see how the
      paragraph styles out.</p><p>I also need to add a centered block as an
      option for Monica to add into her page builds.</p>
    image_path: /images/placement-hero.webp
    reverse: false
  - _template: feature
    heading: Second 2 Column Section - trying to fix live editing
    text: >-
      <p>This is the second section. Bro!!! Trying to add live editing
      :(</p><p>I'm now adding this new text, and will move this row above the
      first one. If that works it's time for a dart to celebrate
      :)</p><p>Update: It worked! Now don't forget to test changing text within
      this field to different headings and see how the app styles them bro.</p>
    image_path: /images/PLACEMENT-hero-taj.webp
    reverse: true
  - _template: feature
    heading: Adding new sq ratio image
    text: >-
      <p>Unfortunately, <strong>true real-time live editing</strong> (where text
      updates character-by-character as you type in a popup) isn't something
      CloudCannon's visual editor supports out of the box - at least not without
      Bookshop.</p><p>What you're currently getting is CloudCannon's standard
      visual editing behaviour:</p><ul><li><p>Click on an
      element</p></li><li><p>Edit in the popup/sidebar</p></li><li><p>Changes
      apply when you save/close the editor</p></li></ul>
    image_path: /images/placement-sqratio.webp
    reverse: false
---
