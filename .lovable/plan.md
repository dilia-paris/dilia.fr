

# Dilia Universe — Bilingual Website

A modern minimal, black and white website showcasing the Dilia culinary universe: three venues united by Italian cuisine, wine, and conviviality.

---

## Design Direction

**Style**: Modern minimalist with clean sans-serif typography, generous whitespace, subtle hover animations, and high contrast black/white palette. Refined but approachable.

**Layout**: Alternating left/right aligned content blocks throughout, creating visual rhythm and elegance.

---

## Core Structure

### Announcement Banner
- Dismissible banner at the top of the site for promotions (Valentine's Day, special events, etc.)
- Configurable via JSON file (`/src/content/banner.json`)
- **Date-limited**: Automatically shows/hides based on start and end dates
- Supports both languages with manual enable/disable toggle
- Elegant minimal styling matching the site aesthetic

### Banner Configuration
```json
{
  "enabled": true,
  "startDate": "2025-02-01",
  "endDate": "2025-02-14",
  "fr": "Saint-Valentin — Réservez votre soirée romantique chez Dilia",
  "en": "Valentine's Day — Book your romantic evening at Dilia",
  "link": "/dilia#reservation",
  "dismissible": true
}
```
- `enabled`: Master toggle to turn banner on/off
- `startDate`: When the banner starts appearing (optional, defaults to immediate)
- `endDate`: When the banner stops appearing (optional, no expiry if omitted)
- Banner only displays when current date is within the range AND enabled is true

### Header/Navigation
- Clean top navigation with: **Dilia | Dilietta | La Cave | Distribution | Reservation**
- **Reservation** links directly to the booking section within the Dilia page (`/dilia#reservation`)
- Language dropdown (FR/EN) showing current language
- Mobile hamburger menu for responsive design

### Home Page
Four full-width sections alternating alignment:
1. **Left block**: Dilia restaurant CTA with evocative tagline + image placeholder
2. **Right block**: Dilietta épicerie CTA 
3. **Left block**: La Cave wine bar CTA
4. **Right block**: Distribution B2B CTA

---

## Section Pages

Each page follows the same pattern: hero + alternating content blocks for subsections.

### Dilia (Restaurant)
- The Chef — Michele Farnesi's story and philosophy
- Menu — Seasonal dishes and signatures
- Wines — Curated wine selection
- **Reservation** — TheFork iframe embed (linked from main navigation)
- Contact — Address, hours, map

### Dilietta (Épicerie/Traiteur)
- Story — The 2024 opening, daily Italian cuisine concept
- Menu — Antipasti, fresh pasta, lunch formula, signatures
- Products — Italian groceries from selected producers
- Fournisseurs — Producer partnerships
- Catering — Corporate events, weddings, private occasions
- Contact — Address, hours

### La Cave (Wine Bar)
- Story — The enoteca concept, natural wines philosophy
- Wine Selection — Italian & French, biodynamic, rare bottles
- Events — Tastings, special evenings
- Photos — Gallery placeholder
- Contact — Address, hours

### Distribution (B2B)
- Story — Wine import and distribution mission
- Who We Are — Team and expertise
- Tasting — Professional tastings for clients
- Prices — How to request pricing/partnership
- Contact — B2B contact form

---

## Footer
- Legal mentions (Mentions légales)
- Site map with all subsections organized by venue
- Contact essentials

---

## Content Architecture

All text content stored in JSON files for easy editing:

```
/src/content/
├── banner.json          # Announcement banner config with date limits
├── fr/
│   ├── common.json      # Navigation, footer, buttons
│   ├── home.json        # Home page content
│   ├── dilia.json       # Restaurant content
│   ├── dilietta.json    # Épicerie content
│   ├── lacave.json      # Wine bar content
│   └── distribution.json # B2B content
└── en/
    ├── common.json
    ├── home.json
    ├── dilia.json
    ├── dilietta.json
    ├── lacave.json
    └── distribution.json
```

---

## Technical Features
- **Bilingual**: French/English with language dropdown, JSON-based content
- **Responsive**: Mobile-first design, adapting layouts for all screens
- **Static site**: No backend needed, content in JSON files
- **Smooth scrolling**: Between sections within pages
- **Time-limited banner**: Configurable date range for automatic display control
- **Elegant placeholders**: Minimal image frames ready for real photos

