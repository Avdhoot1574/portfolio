# Design Guidelines for Avdhoot Nakod's Portfolio Website

## Design Approach
**Reference-Based**: Drawing inspiration from premium agency/creative developer portfolios with modern, scroll-driven experiences. Think Awwwards-style portfolios with smooth animations and sophisticated dark themes.

## Core Design Principles
- **Premium Dark Aesthetic**: Modern, sophisticated dark theme with vibrant accent colors
- **Scroll-Driven Experience**: Smooth, buttery scrolling with GSAP + ScrollTrigger animations
- **Clean & Professional**: Balance creativity with readability and accessibility
- **Lightweight Performance**: Sophisticated but fast-loading

## Color Palette
Dark modern base with vibrant accents:
- **Primary Accents**: Cyan/Teal, Purple, Orange (used strategically for CTAs, highlights, skill chips)
- **Background**: Dark gradient or solid dark tones
- **Text**: High-contrast whites/light grays for readability
- **Cards/Panels**: Subtle glass-morphism or elevated dark panels with soft borders

## Typography
**Font Family**: Poppins or Inter (via Google Fonts CDN)
- **Hero Name**: Bold, 4xl-6xl, commanding presence
- **Hero Role**: Medium weight, 2xl-3xl
- **Section Headings**: Bold, 3xl-4xl
- **Body Text**: Regular, lg, high readability (line-height 1.6-1.8)
- **Skill Chips**: Medium, sm-base
- **Taglines/Quotes**: Light or medium italic, xl-2xl

## Layout System
**Spacing Scale**: Tailwind units 4, 6, 8, 12, 16, 20, 24, 32
- **Section Padding**: py-20 to py-32 (desktop), py-12 to py-16 (mobile)
- **Container**: max-w-7xl for most sections, max-w-6xl for content-heavy areas
- **Grid Gaps**: gap-6 to gap-8 for cards, gap-4 for chips

## Section-by-Section Design

### 1. Hero Section (Full Viewport)
**Layout**: Split layout - Left: Content, Right: Mini profile card
- Animated headline entrance (slide/fade up)
- Role and tagline with spacing hierarchy
- Hero summary paragraph (max-w-2xl)
- Two prominent CTA buttons (gradient or outlined styles)
- Quick stats/badges displayed horizontally below CTAs
- Right panel: Glass-morphic card with photo placeholder, name, location, availability status, social icons (LinkedIn, GitHub, Kaggle)
- Floating background elements (animated blobs/gradients with subtle parallax)

### 2. About Section
**Layout**: Single column, centered, max-w-4xl
- Section heading with underline accent or decorative element
- 2-3 refined paragraphs with generous line-spacing
- Fade-in on scroll reveal animation

### 3. Skills Section
**Layout**: Multi-column grid (grid-cols-1 md:grid-cols-2 lg:grid-cols-4)
- Grouped skill cards/panels by category
- Each category: Bold heading + chip-style tags in flex wrap
- Chips: Rounded, with accent border/background, hover lift effect
- Staggered fade-in animation on scroll

### 4. Projects Section
**Layout**: Card grid (grid-cols-1 lg:grid-cols-2) or pinned scroll experience
- **OpsFlow AI Card**: Prominent, elevated card with:
  - Project title and tagline
  - Detailed description in bullets + paragraph
  - Tech stack chips at bottom
  - "Demo Coming Soon" badge/button
- **Placeholder Card**: Lighter styling, "More Projects Coming Soon" with icon
- Each card: Image placeholder area (gradient or abstract visual), hover scale/glow effect
- Consider pinned scroll animation where cards animate in/out

### 5. Experience Section
**Layout**: Timeline-style or single prominent card
- "Fresher/Self-Driven Learning" badge with positive framing
- Clean list of accomplishments/learning focus
- Icon or visual element indicating growth/learning journey

### 6. Education & Certifications
**Layout**: Two-column grid or stacked cards
- **Education**: Degree, university, duration, CGPA in structured card
- **Certifications**: Individual cards with certification name, issuer, year, skills learned
- Use institutional colors/logos if possible (IBM blue, Kaggle teal)

### 7. Contact Section
**Layout**: Two-column - Left: Form, Right: Contact info & social links
- Form: Name, Email, Message inputs with dark styling, focus states with accent glow
- Contact details in elegant list format
- Large social icons with hover effects
- Inviting CTA text above form
- Background: Subtle gradient or decorative element

## Navigation
**Sticky navbar** with:
- Logo/Name on left
- Section links on right (About, Skills, Projects, Experience, Contact)
- Active section highlighting (accent color underline/background)
- Smooth scroll to section on click
- Glass-morphic or dark translucent background

## Animation Strategy (GSAP + ScrollTrigger)
1. **Smooth Scrolling**: Lenis implementation for buttery scroll
2. **Section Reveals**: Fade-in + translateY on scroll into viewport
3. **Hero Animations**: Staggered entrance on page load
4. **Parallax**: Background shapes move slower than foreground
5. **Skill Chips**: Staggered fade-in cascade effect
6. **Project Cards**: Optional pinned scroll with card transitions
7. **Navbar**: Highlight active section based on scroll position
8. **Performance**: Respect mobile performance, disable heavy animations on small screens

## Responsive Breakpoints
- **Mobile**: Stack all columns, reduce font sizes, simplify animations
- **Tablet (md)**: 2-column layouts where appropriate
- **Desktop (lg+)**: Full multi-column grids, all animations active

## Images
**Hero Section**: Abstract data visualization or tech-themed gradient background (NOT a photo - keep it professional/minimal)
**Profile Card**: Placeholder for professional headshot
**Project Cards**: Abstract ML/data visualization graphics or placeholder gradients
**No large hero photography** - maintain modern, tech-focused aesthetic

## Accessibility
- Semantic HTML (proper heading hierarchy h1→h6)
- Alt text placeholders for all images
- High contrast text (WCAG AA minimum)
- Focus states on all interactive elements
- Aria labels where needed

## SEO & Meta Tags
- Title: "Avdhoot Nakod | Data Scientist & ML Engineer"
- Meta description highlighting skills and availability
- Open Graph tags for LinkedIn preview (og:title, og:description, og:image placeholder)