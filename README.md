# Night of the Meteor - Art Demo Page

A sleek one-page scrolling website showcasing pixel art and animations for the Night of the Meteor game (a Maniac Mansion fan remake).

## Features

- Modern, sleek React UI
- Smooth scrolling sections
- Placeholder areas for:
  - Characters
  - Villains
  - Locations
  - Animations
  - Music
- Responsive design
- Dark theme with vibrant accents

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

The site will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Adding Your Assets

Replace the placeholder areas with your actual images:

1. **Hero Image**: Add to `src/components/Hero.jsx` - Replace the placeholder div
2. **Character Sprites**: Add to `src/components/Characters.jsx`
3. **Villain Sprites**: Add to `src/components/Villains.jsx`
4. **Location Backgrounds**: Add to `src/components/Locations.jsx`
5. **Animation GIFs**: Add to `src/components/Animations.jsx`
6. **Music Assets**: Add to `src/components/Music.jsx`

All placeholder divs are clearly marked and easy to replace with `<img>` tags or your preferred image components.

## Translations

This project uses [Weblate](https://weblate.org/) for collaborative translation management and crowd-sourced review. Translations are stored in JSON files located in `src/i18n/locales/`.

### Contributing Translations

We welcome help improving translations! You can contribute translations and review existing ones through our Weblate project:

- **Weblate Project**: [Link will be added after setup]
- **Supported Languages**: English (en), French (fr), Italian (it), German (de), Spanish (es), Swedish (sv), Finnish (fi), Norwegian (no)
- **Source Language**: English

### How It Works

1. **Sign up**: Create a free account on [weblate.org](https://weblate.org/) (you can use your GitHub account)
2. **Join the project**: Navigate to our Weblate project and request access
3. **Review & Translate**: 
   - Review existing translations and suggest improvements
   - Vote on translation suggestions from other contributors
   - Add new translations for missing strings
4. **Automatic Sync**: Approved translations are automatically synced back to this GitHub repository

### Translation File Structure

Translation files follow the i18next JSON format with nested keys:
- Source file: `src/i18n/locales/en.json`
- Translation files: `src/i18n/locales/{locale}.json` (e.g., `fr.json`, `de.json`)

All translations should maintain the same JSON structure as the English source file.

### Manual Translation Updates

If you need to update translations manually (without Weblate):
1. Edit the appropriate JSON file in `src/i18n/locales/`
2. Ensure the JSON structure matches the source (`en.json`)
3. Test your changes by running `npm run dev`
4. Submit a pull request with your changes


