# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added
- New hover animations system:
  - Created dedicated `hover-animations.css` for centralized animation management
  - Added safe hover effects for cards, images, buttons, icons, and links
  - Implemented dark mode compatible animations with proper shadow adjustments
  - Added mobile optimizations and reduced motion support
  - Applied animations to all four main pages:
    - Home page: Service cards, project cards, CTA buttons
    - About page: Education items, approach cards, skill bars
    - Projects page: Project cards, gallery items, filter buttons
    - Contact page: Form elements, social links, FAQ items
  - Verified dark mode compatibility across all pages
  - Added proper fallbacks for browsers with reduced motion preferences

### Fixed
- Safari dark mode background issues:
  - Fixed dark box appearing behind text in `.design-process` section
  - Added Safari-specific fixes using `@supports (-webkit-touch-callout: none)`
  - Fixed background rendering for paragraph elements in dark mode
  - Fixed mobile navigation background issues
  - Fixed backdrop-filter handling for mobile menu
  - Added specific fixes for extra small screens (≤480px)
  - Added comprehensive dark mode fixes for design process section
  - Fixed text color inheritance in dark mode
  - Added proper background handling for all viewport sizes
- Social icon consistency:
  - Normalized social icon styles across all pages in light mode
  - Removed pink background color from Home and About page icons
  - Ensured consistent hover effects and transitions
  - Maintained dark mode compatibility
  - Added subtle transform animation on hover
  - Tested across Safari and Chrome (mobile and desktop)

### Changed
- Updated dark theme color variables for better contrast and readability
- Improved mobile navigation styling in dark mode
- Enhanced responsive design handling for dark mode
- Optimized text rendering in dark mode across all screen sizes

## [Future]
- Add new features
- Improve performance
- Enhance accessibility
- Add more interactive elements

## 2024-03-19

### Fixed
- Safari dark mode background issues
  - Added comprehensive Safari-specific fixes using `@supports (-webkit-touch-callout: none)`
  - Fixed background rendering on paragraph elements
  - Fixed mobile navigation background issues
  - Added proper backdrop-filter handling for mobile menu
  - Added extra small screen (<480px) fixes for process steps and timeline
  - Modified in: `css/style.css`
  - Theories investigated:
    1. WebKit dark mode inheritance of default background colors
    2. CSS variable resolution in dark mode
    3. Background color stacking context issues
    4. Mobile-specific backdrop-filter rendering
    5. Extra small screen grid layout background inheritance

### Changed
- Updated dark theme color variables for better contrast and consistency
  - Adjusted text and background colors for improved readability
  - Modified in: `css/style.css`

## Future Entries
- [ ] Add new features
- [ ] Fix bugs
- [ ] Update dependencies
- [ ] Improve performance
- [ ] Enhance accessibility 