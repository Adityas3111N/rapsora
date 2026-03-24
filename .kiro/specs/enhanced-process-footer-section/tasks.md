# Implementation Plan: Enhanced Process Footer Section

## Overview

This plan implements a unified EnhancedProcessFooter component that merges the "How we work" process section with the footer section. The implementation uses TypeScript, React, Next.js, Framer Motion for animations, and Tailwind CSS for styling. The component will be built incrementally with sub-components extracted for maintainability, followed by integration and comprehensive testing.

## Tasks

- [ ] 1. Set up component structure and TypeScript interfaces
  - Create `src/components/layout/enhanced-process-footer.tsx` file
  - Define all TypeScript interfaces (ProcessStep, SocialLink, NavigationLink, NavigationColumn, AnimationConfig, ViewportConfig)
  - Create constant arrays (STEPS, socialLinks, navigationColumns)
  - Set up animation configuration constants (STEP_CARD_ANIMATION, HEADER_ANIMATION, URGENCY_BADGE_ANIMATION, VIEWPORT_CONFIG)
  - _Requirements: 9.1, 9.2, 9.3, 9.4_

- [ ] 2. Implement core sub-components
  - [ ] 2.1 Create StepCard component
    - Implement StepCard with props interface (step, index)
    - Add Framer Motion scroll-triggered animation with staggered delay
    - Implement hover effects with background color transitions
    - Add icon, number, title, and description rendering
    - _Requirements: 2.1, 2.3, 2.6, 7.1, 7.2, 7.3, 7.4_

  - [ ]* 2.2 Write property test for StepCard animation delay
    - **Property 4: Animation Delay Staggering**
    - **Validates: Requirements 7.4**

  - [ ] 2.3 Create SocialPill component
    - Implement vertical social media links container
    - Add inverse corner SVG elements for cutout design
    - Implement brand-specific hover color transitions
    - Add responsive visibility (hidden on mobile < 768px)
    - Position absolutely at top-left with proper styling
    - _Requirements: 1.4, 5.2, 5.3, 6.3, 10.4_

  - [ ] 2.4 Create ScrollToTopTab component
    - Implement tab button with inverse corner SVGs
    - Add click handler for smooth scroll to top
    - Position absolutely at top-right
    - Add playful copy text
    - _Requirements: 1.5, 5.1_

  - [ ]* 2.5 Write unit test for scroll-to-top behavior
    - **Property 6: Scroll-to-Top Behavior**
    - **Validates: Requirements 5.1**

- [ ] 3. Implement CTA and review components
  - [ ] 3.1 Create CTABlock component
    - Implement heading "Do you like what you see?" with responsive font sizes
    - Import and integrate GooeyCTA button from shared components
    - Add proper spacing and layout
    - _Requirements: 4.1, 10.1, 10.2_

  - [ ] 3.2 Create ReviewBadge component
    - Implement Google branding with logo
    - Add 5-star rating display
    - Show review count (69 reviews)
    - Add proper styling and spacing
    - _Requirements: 4.2_

  - [ ] 3.3 Create UrgencyBadge component
    - Implement animated ping effect on green dot
    - Display "Currently accepting X new projects for Q2 2025" text
    - Add Framer Motion animation with delay
    - _Requirements: 2.7, 7.1, 7.2, 10.7_

- [ ] 4. Implement navigation and contact components
  - [ ] 4.1 Create NavigationGrid component
    - Implement 3-column layout (Learn, Explore, Get in touch)
    - Add responsive stacking for mobile viewports
    - Render navigation links from navigationColumns constant
    - Implement animated underline hover effects using CSS
    - _Requirements: 4.3, 4.4, 5.4, 5.7, 6.5_

  - [ ]* 4.2 Write property test for complete data rendering
    - **Property 1: Complete Data Rendering**
    - **Validates: Requirements 2.1, 4.4**

  - [ ] 4.3 Create ContactBlock component
    - Implement phone number with Phone icon and tel: link
    - Implement email address with Mail icon and mailto: link
    - Implement physical address with MapPin icon and semantic address element
    - Add What3Words location with custom icon
    - _Requirements: 4.5, 5.5, 5.6, 8.6_

  - [ ]* 4.4 Write property test for link navigation integrity
    - **Property 2: Link Navigation Integrity**
    - **Validates: Requirements 5.2, 5.4**

- [ ] 5. Implement main EnhancedProcessFooter component
  - [ ] 5.1 Create main component structure
    - Set up footer element with aria-label and semantic HTML
    - Implement dark background with rounded top corners
    - Add responsive padding and spacing
    - Position SocialPill and ScrollToTopTab absolutely
    - _Requirements: 1.1, 1.2, 1.3, 8.1, 8.6_

  - [ ] 5.2 Implement ProcessHeader section
    - Add "How we work" heading with decorative bullet
    - Implement Framer Motion scroll-triggered animation
    - Add proper heading hierarchy (h2)
    - _Requirements: 3.1, 8.3_

  - [ ] 5.3 Implement ProcessStepsGrid section
    - Create responsive grid layout (1/2/4 columns)
    - Render all 4 StepCard components with STEPS data
    - Add border separators between cards
    - Implement scroll-triggered animations
    - _Requirements: 2.1, 2.2, 2.5, 3.2, 6.1, 6.2_

  - [ ] 5.4 Integrate CTA and review section
    - Add CTABlock component
    - Add ReviewBadge component
    - Add UrgencyBadge component
    - Implement proper spacing and visual hierarchy
    - _Requirements: 3.3, 4.1, 4.2_

  - [ ] 5.5 Implement MassiveTypography separator
    - Add "Crafting since 2024" text with clamp() font sizing
    - Apply mix-blend-plus-lighter effect
    - Add border bottom separator
    - _Requirements: 3.4, 6.6, 10.6_

  - [ ] 5.6 Integrate navigation and contact sections
    - Add NavigationGrid component
    - Add ContactBlock component
    - Implement proper spacing and layout
    - _Requirements: 4.3, 4.4, 4.5_

  - [ ] 5.7 Implement SubFooter section
    - Add "RapSora." logo
    - Add dynamic copyright year calculation
    - Add company registration number
    - Add privacy policy and legal links
    - _Requirements: 4.6, 4.7, 9.6_

  - [ ]* 5.8 Write property test for dynamic copyright year
    - **Property 5: Dynamic Copyright Year**
    - **Validates: Requirements 9.6**

- [ ] 6. Checkpoint - Ensure component renders correctly
  - Verify all sub-components render without errors
  - Check responsive layout at mobile, tablet, and desktop breakpoints
  - Ensure all animations trigger correctly
  - Ask the user if questions arise

- [ ] 7. Implement accessibility features
  - [ ] 7.1 Add ARIA labels and semantic HTML
    - Add aria-label to footer element
    - Add aria-label to all icon-only buttons
    - Ensure proper heading hierarchy (h2, h3)
    - Use semantic elements (footer, nav, address)
    - _Requirements: 8.1, 8.2, 8.3, 8.6_

  - [ ] 7.2 Implement keyboard accessibility
    - Ensure all interactive elements are keyboard accessible
    - Add proper tabIndex attributes
    - Test keyboard navigation flow
    - _Requirements: 8.4_

  - [ ] 7.3 Add prefers-reduced-motion support
    - Detect prefers-reduced-motion media query
    - Disable animations when user prefers reduced motion
    - Provide static fallback rendering
    - _Requirements: 7.7, 8.7_

  - [ ]* 7.4 Write property test for interactive element accessibility
    - **Property 3: Interactive Element Accessibility**
    - **Validates: Requirements 8.2, 8.4**

- [ ] 8. Implement responsive design refinements
  - [ ] 8.1 Add mobile-specific adjustments
    - Hide SocialPill on viewports < 768px
    - Adjust padding and spacing for mobile
    - Ensure touch-friendly tap targets (44x44px minimum)
    - _Requirements: 6.3, 6.4, 6.7_

  - [ ] 8.2 Add tablet-specific adjustments
    - Adjust grid to 2 columns for process steps
    - Optimize spacing for tablet viewports
    - _Requirements: 6.1_

  - [ ] 8.3 Add desktop-specific adjustments
    - Ensure 4-column grid for process steps
    - Optimize spacing and layout for large screens
    - _Requirements: 6.1_

  - [ ]* 8.4 Write unit tests for responsive behavior
    - Test grid classes at different breakpoints
    - Test SocialPill visibility
    - Test padding adjustments

- [ ] 9. Performance optimization
  - [ ] 9.1 Optimize animations for 60fps
    - Use transform and opacity for GPU acceleration
    - Avoid layout shifts during animations
    - Test animation performance with Chrome DevTools
    - _Requirements: 7.6, 7.7_

  - [ ] 9.2 Add error handling
    - Provide default empty arrays with TypeScript type guards
    - Use optional chaining for nested properties
    - Add fallback content for missing data
    - Handle Framer Motion initialization failures
    - _Requirements: 9.1, 9.2, 9.3_

  - [ ]* 9.3 Write unit tests for error handling
    - Test rendering with empty data arrays
    - Test rendering with missing siteConfig data
    - Test animation fallbacks

- [ ] 10. Integration with app/page.tsx
  - [ ] 10.1 Update app/page.tsx to use EnhancedProcessFooter
    - Import EnhancedProcessFooter component
    - Replace existing Process_Section and Footer_Section components
    - Verify proper positioning in page layout
    - _Requirements: 1.1_

  - [ ] 10.2 Remove deprecated components
    - Delete `src/components/sections/process-section.tsx`
    - Delete `src/components/sections/footer.tsx`
    - Remove unused imports from app/page.tsx
    - _Requirements: 1.1_

  - [ ]* 10.3 Write integration tests
    - Test EnhancedProcessFooter in full page context
    - Test scroll behavior with actual viewport
    - Test responsive breakpoints with viewport resizing

- [ ] 11. Final checkpoint - Comprehensive testing
  - Run all unit tests and property-based tests
  - Test on mobile, tablet, and desktop devices
  - Verify accessibility with keyboard navigation and screen readers
  - Check animation performance and smoothness
  - Ensure all interactive elements work correctly
  - Ask the user if questions arise

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Property-based tests validate universal correctness properties from the design document
- Unit tests validate specific examples, edge cases, and integration points
- The component uses TypeScript for type safety and maintainability
- Framer Motion is used for scroll-triggered animations
- CSS transitions are used for hover effects
- All animations use GPU-accelerated properties (transform, opacity)
- The component follows a composition pattern with extracted sub-components
- Responsive design uses mobile-first approach with Tailwind breakpoints
