# Sweet photograph credits

MOOSE releases are named after Indian sweets, and each release entry on the news
page uses a photograph of its sweet as the card background. The photographs are
plain crops — the MOOSE logo, the version wording and the credit line are an
HTML layer drawn over them by `src/components/NewsCardMedia.astro`, so nothing
is baked into these files.

Every photograph comes from Wikimedia Commons under a licence permitting reuse
and adaptation for any purpose, including commercially.

| File | Sweet | Photograph | Photographer | Licence |
|---|---|---|---|---|
| `jhangri-v4.1.1.jpg` | Jhangri (Amriti / Imarti) | [Amriti — Dum Dum, Kolkata, 2012-04-22 2205](https://commons.wikimedia.org/wiki/File:Amriti_-_Dum_Dum_-_Kolkata_2012-04-22_2205.JPG) | Biswarup Ganguly | [CC BY 3.0](https://creativecommons.org/licenses/by/3.0) |
| `jhangri-v4.1.4.jpg` | Jhangri (Amriti / Imarti) | [Ghee Fried Amriti — Kolkata, 2015-02-06 5756](https://commons.wikimedia.org/wiki/File:Ghee_Fried_Amriti_-_Kolkata_2015-02-06_5756.JPG) | Biswarup Ganguly | [CC BY 3.0](https://creativecommons.org/licenses/by/3.0) |
| `kalakand.jpg` | Kalakand | [Kalakand Sandesh — Salt Lake City, Kolkata, 2023-08-13 3303](https://commons.wikimedia.org/wiki/File:Kalakand_Sandesh_-_The_Indismart_Hotel_-_Salt_Lake_City_-_Kolkata_2023-08-13_3303.jpg) | Biswarup Ganguly | [CC BY 3.0](https://creativecommons.org/licenses/by/3.0) |
| `lavang-latika.jpg` | Lavang Latika (Labanga Latika) | [Labanga Latika — Dum Dum, Kolkata, 2012-04-22 2092 2217](https://commons.wikimedia.org/wiki/File:Labanga_Latika_-_Dum_Dum_-_Kolkata_2012-04-22_2092_2217.JPG) | Biswarup Ganguly | [CC BY 3.0](https://creativecommons.org/licenses/by/3.0) |

## Licence obligations

CC BY 3.0 is attribution-only: it permits adaptation and commercial use, and
imposes **no** share-alike requirement on the pages that use the photographs.
The obligation is to credit the photographer, name the licence, and indicate
modification (these are cropped).

Each entry carries that credit in its own frontmatter, as `credit` and
`creditUrl`, which the card renders over the picture and the entry page prints
beneath the hero. **An entry whose `image` is one of these photographs must keep
its `credit` field** — dropping it removes the attribution the licence requires.

Share-alike (CC BY-SA) photographs were deliberately avoided, since adapting
them would have required licensing the result under CC BY-SA too.

## Adding a card for a new release

Crop the sweet photo to 1200×600 (2:1, the news card ratio) and drop it in here,
then point the entry's `image:` at it and fill in `overlay:` and `credit:`:

```yaml
image: "/assets/news/photos/<sweet>.jpg"
overlay:
  kicker: "Release"
  heading: "v4.4.0"
  subheading: "<Sweet name>"
credit: "Photo: <photographer> / Wikimedia Commons · CC BY 3.0"
creditUrl: "https://commons.wikimedia.org/wiki/File:<file>"
```

Entries with no photograph (announcements, webinars) can omit `image` and still
use `overlay:` — the card falls back to the brand gradient. Set `overlay.logo:
false` to suppress the logo on a card.
