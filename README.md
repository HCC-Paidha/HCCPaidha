# Harvest Community Church, Paidha – website

A simple static website (plain HTML, one CSS file, a tiny bit of JavaScript). No frameworks, no build step, no external resources.

## Files

| File | What it is |
|------|------------|
| `index.html` | Home: welcome, scripture, service times, how to find us |
| `events.html` | Events: upcoming events and weekly gatherings |
| `gallery.html` | Church Pictures: photo grid |
| `give.html` | Give: MTN Mobile Money and Airtel Money details |
| `contact.html` | Contact: phone, WhatsApp, email, address |
| `css/style.css` | All colours, fonts and layout |
| `js/nav.js` | Mobile menu button and "Copy number" buttons |
| `images/` | Put church photos here |

## Editing text

Open the page's `.html` file in any text editor (or click the pencil icon on GitHub), find the text between the tags and change it, then save/commit. For example, service times are in `index.html` and `events.html` inside `<ul class="times">`.

The header (menu) and footer are repeated at the top and bottom of every page. If you change the address, menu or footer, change it in all five files.

To add an event, copy the `<article class="card event">…</article>` block in `events.html` and edit it.

Colours are set at the top of `css/style.css` (`--bg`, `--card`, `--text`, `--gold`, `--green`).

## Adding photos

1. Upload the photo into the `images/` folder (e.g. `images/sunday-service.jpg`). Keep files small: about 1200px wide, under 500 KB if possible.
2. In `gallery.html`, inside `<div class="gallery">`, add a block like:

   ```html
   <figure class="photo">
     <img src="images/sunday-service.jpg" alt="Short description of the photo" loading="lazy">
     <figcaption>Sunday Service</figcaption>
   </figure>
   ```

3. Set `src` to your file name, `alt` to a short description, and the caption text.
4. Remove one "Photo coming soon" placeholder block for each real photo.

## Publishing with GitHub Pages

The site is published from the `main` branch, root folder (`/`):
Repository **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main`, folder `/ (root)`**.

Every commit to `main` republishes the site automatically within a minute or two. Note: GitHub Pages on a **private** repository requires a paid GitHub plan (Pro/Team/Enterprise); on the free plan the repository must be public for Pages to work.
