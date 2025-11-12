/**
 * Responsive Design Utilities
 *
 * Centralized responsive sizing and spacing utilities to prevent
 * Apple App Store rejection due to layout issues on different devices.
 *
 * Supports:
 * - iPhone 13 mini (5.4" - smallest)
 * - iPhone 13/14/15 (6.1" - standard)
 * - iPhone 14 Pro Max (6.7" - largest phone)
 * - iPad Air (10.9" - tablet)
 */

import { Dimensions } from 'react-native';

// Device breakpoints
const BREAKPOINTS = {
  SMALL_PHONE: 375,    // iPhone 13 mini and smaller
  MEDIUM_PHONE: 414,   // iPhone 13/14/15
  LARGE_PHONE: 428,    // iPhone 14 Pro Max
  SMALL_TABLET: 768,   // iPad mini
  TABLET: 1024,        // iPad Air
} as const;

// Safe minimum sizes (Apple HIG recommendations)
const MIN_TOUCH_TARGET = 44;
const MIN_TEXT_SIZE = 11;
const MIN_ICON_SIZE = 22;

// Spacing scale (matches design token scales)
// Used for centralized responsive calculations - components should NEVER calculate spacing
const SPACING_SCALE = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
} as const;

/**
 * Get current screen dimensions
 */
export const getScreenDimensions = () => {
  const { width, height } = Dimensions.get('window');
  return { width, height };
};

/**
 * Check if current device is a small phone (iPhone 13 mini, SE)
 */
export const isSmallPhone = (): boolean => {
  const { width } = getScreenDimensions();
  return width <= BREAKPOINTS.SMALL_PHONE;
};

/**
 * Check if current device is a tablet (iPad)
 */
export const isTablet = (): boolean => {
  const { width } = getScreenDimensions();
  return width >= BREAKPOINTS.SMALL_TABLET;
};

/**
 * Responsive logo/icon size
 * Small devices: 100-120px
 * Medium devices: 120-160px
 * Tablets: 160-200px
 */
export const getResponsiveLogoSize = (baseSize: number = 140): number => {
  const { width } = getScreenDimensions();

  if (width <= BREAKPOINTS.SMALL_PHONE) {
    // iPhone 13 mini: 28% of width, max 120px
    return Math.min(Math.max(width * 0.28, 100), 120);
  } else if (width >= BREAKPOINTS.TABLET) {
    // iPad: 15% of width, max 200px
    return Math.min(Math.max(width * 0.15, 140), 200);
  }

  // Standard phones: use base size
  return baseSize;
};

/**
 * Responsive multiline input height
 * Prevents keyboard overlap on small devices
 *
 * Small devices: 100-120px
 * Medium devices: 120-150px
 * Tablets: 150-200px
 */
export const getResponsiveInputHeight = (baseHeight: number = 200): number => {
  const { height } = getScreenDimensions();

  if (height <= 667) {
    // iPhone SE, iPhone 8: 15% of height, max 120px
    return Math.min(height * 0.15, 120);
  } else if (height <= 844) {
    // iPhone 13 mini, iPhone 13: 18% of height, max 150px
    return Math.min(height * 0.18, 150);
  }

  // Larger devices: use base height capped at 200px
  return Math.min(baseHeight, 200);
};

/**
 * Responsive horizontal padding
 * Accounts for safe area on notched devices and iPad
 */
export const getResponsiveHorizontalPadding = (
  basePadding: number = 16,
  insets: { left: number; right: number } = { left: 0, right: 0 }
): number => {
  const { width } = getScreenDimensions();

  // iPad: larger padding
  if (width >= BREAKPOINTS.TABLET) {
    return Math.max(basePadding * 1.5, insets.left + 16, insets.right + 16);
  }

  // Phones: account for safe area
  return Math.max(basePadding, insets.left + 8, insets.right + 8);
};

/**
 * Responsive bottom positioning
 * Accounts for home indicator and safe area
 */
export const getResponsiveBottomPosition = (
  basePosition: number = 32,
  insets: { bottom: number } = { bottom: 0 }
): number => {
  return Math.max(basePosition, insets.bottom + 16);
};

/**
 * Responsive FAB (Floating Action Button) position
 * CRITICAL: Ensures FAB appears above tab bar (70-90px tall) and safe areas
 *
 * Tab bar heights:
 * - iOS: ~80-90px (including safe area)
 * - Android: ~70px
 *
 * FAB positioning:
 * - Tablets: 100px from bottom (generous spacing)
 * - Phones: 90px from bottom (above tab bar)
 * - Safe area aware (home indicator clearance)
 */
export const getResponsiveFABPosition = (
  insets: { bottom: number; right: number } = { bottom: 0, right: 0 }
): { bottom: number; right: number } => {
  const { width } = getScreenDimensions();

  // Tab bar offset: FAB must be above tab bar
  const TAB_BAR_OFFSET = 90; // Tab bar height + spacing

  // iPad: larger margins, higher position
  if (width >= BREAKPOINTS.TABLET) {
    return {
      bottom: Math.max(100, insets.bottom + TAB_BAR_OFFSET),
      right: Math.max(24, insets.right + 16),
    };
  }

  // Phones: standard position above tab bar, respect safe area
  return {
    bottom: Math.max(TAB_BAR_OFFSET, insets.bottom + TAB_BAR_OFFSET),
    right: Math.max(20, insets.right + 8),
  };
};

/**
 * Responsive modal max height
 * Prevents modals from taking too much space on tablets
 * or too little on small devices
 */
export const getResponsiveModalMaxHeight = (): string => {
  const { height } = getScreenDimensions();

  if (height <= 667) {
    // Small devices: 75% of height
    return '75%';
  } else if (height >= 1024) {
    // Tablets: 60% of height
    return '60%';
  }

  // Standard: 70%
  return '70%';
};

/**
 * Responsive modal min height
 * Ensures modals are always usable and not too small
 * Complements getResponsiveModalMaxHeight for complete modal sizing
 */
export const getResponsiveMinModalHeight = (): number => {
  const { height } = getScreenDimensions();

  if (height <= 667) {
    // iPhone SE, 8: 40% of height, min 250px
    return Math.max(height * 0.4, 250);
  } else if (height >= 1024) {
    // iPad: 35% of height, min 350px, max 500px (capped for usability)
    return Math.min(Math.max(height * 0.35, 350), 500);
  }

  // Standard: 45% of height, min 300px
  return Math.max(height * 0.45, 300);
};

/**
 * Responsive icon container size
 * Used in onboarding, cards, etc.
 */
export const getResponsiveIconContainerSize = (baseSize: number = 140): number => {
  const { width } = getScreenDimensions();

  if (width <= BREAKPOINTS.SMALL_PHONE) {
    // Small phones: 30% of width, capped at 120px
    return Math.min(width * 0.30, 120);
  } else if (width >= BREAKPOINTS.TABLET) {
    // Tablets: 20% of width, capped at 180px
    return Math.min(width * 0.20, 180);
  }

  return baseSize;
};

/**
 * Responsive grid columns
 * Returns number of columns for grid layouts
 */
export const getResponsiveGridColumns = (
  mobileColumns: number = 2,
  tabletColumns: number = 4
): number => {
  const { width } = getScreenDimensions();
  return width >= BREAKPOINTS.TABLET ? tabletColumns : mobileColumns;
};

/**
 * Responsive max width for content
 * Prevents text from stretching too wide on tablets
 */
export const getResponsiveMaxWidth = (baseWidth: number = 400): number => {
  const { width } = getScreenDimensions();

  if (width <= BREAKPOINTS.SMALL_PHONE) {
    // Small phones: 90% of width
    return width * 0.9;
  } else if (width >= BREAKPOINTS.TABLET) {
    // Tablets: 60% of width, max 600px
    return Math.min(width * 0.6, 600);
  }

  // Standard phones: use base width
  return Math.min(width * 0.85, baseWidth);
};

/**
 * Responsive font size
 * Scales text for different devices while respecting minimum sizes
 */
export const getResponsiveFontSize = (baseFontSize: number): number => {
  const { width } = getScreenDimensions();

  if (width <= BREAKPOINTS.SMALL_PHONE) {
    // Small phones: slightly smaller text
    return Math.max(baseFontSize * 0.9, MIN_TEXT_SIZE);
  } else if (width >= BREAKPOINTS.TABLET) {
    // Tablets: slightly larger text
    return baseFontSize * 1.1;
  }

  return baseFontSize;
};

/**
 * Check if device is in landscape mode
 */
export const isLandscape = (): boolean => {
  const { width, height } = getScreenDimensions();
  return width > height;
};

/**
 * Get universal keyboard behavior
 * Returns 'padding' which works across all platforms (iOS, Android, Web)
 */
export const getKeyboardBehavior = (): 'padding' | 'height' | 'position' | undefined => {
  return 'padding';
};

/**
 * Device type enum for conditional rendering
 */
export enum DeviceType {
  SMALL_PHONE = 'SMALL_PHONE',
  MEDIUM_PHONE = 'MEDIUM_PHONE',
  LARGE_PHONE = 'LARGE_PHONE',
  TABLET = 'TABLET',
}

/**
 * Get current device type
 */
export const getDeviceType = (): DeviceType => {
  const { width } = getScreenDimensions();

  if (width <= BREAKPOINTS.SMALL_PHONE) {
    return DeviceType.SMALL_PHONE;
  } else if (width <= BREAKPOINTS.MEDIUM_PHONE) {
    return DeviceType.MEDIUM_PHONE;
  } else if (width <= BREAKPOINTS.LARGE_PHONE) {
    return DeviceType.LARGE_PHONE;
  }

  return DeviceType.TABLET;
};

/**
 * Apple HIG compliant touch target size
 */
export const getMinTouchTargetSize = (): number => MIN_TOUCH_TARGET;

/**
 * Responsive spacing multiplier
 * Returns a multiplier for spacing based on device size
 */
export const getSpacingMultiplier = (): number => {
  const { width } = getScreenDimensions();

  if (width <= BREAKPOINTS.SMALL_PHONE) {
    return 0.9; // Slightly tighter spacing on small devices
  } else if (width >= BREAKPOINTS.TABLET) {
    return 1.2; // More generous spacing on tablets
  }

  return 1.0; // Standard spacing
};

// =============================================================================
// ONBOARDING SPACING - CENTRALIZED CALCULATIONS
// =============================================================================
// ⚠️ CRITICAL: ALL onboarding spacing calculations MUST be here.
// Components should NEVER calculate spacing - they consume pre-calculated values
// from useResponsive() hook.
//
// This prevents Apple rejection due to layout issues on different devices.
// Pattern: Small phones get tighter spacing, tablets get generous spacing.
// =============================================================================

/**
 * Onboarding icon container top margin
 * Small phones: 24px (lg), Others: 40px (xxl)
 */
export const getOnboardingIconMarginTop = (): number => {
  return isSmallPhone() ? SPACING_SCALE.lg : SPACING_SCALE.xxl;
};

/**
 * Onboarding icon container bottom margin
 * Tablets: 60px (xxl * 1.5 for extra breathing room), Others: 40px (xxl)
 */
export const getOnboardingIconMarginBottom = (): number => {
  return isTablet() ? SPACING_SCALE.xxl * 1.5 : SPACING_SCALE.xxl;
};

/**
 * Onboarding title bottom margin
 * Tablets: 24px (lg), Others: 16px (md)
 */
export const getOnboardingTitleMarginBottom = (): number => {
  return isTablet() ? SPACING_SCALE.lg : SPACING_SCALE.md;
};

/**
 * Onboarding text horizontal padding (title and description)
 * Small phones: 8px (sm for tighter fit), Others: 16px (md)
 */
export const getOnboardingTextPadding = (): number => {
  return isSmallPhone() ? SPACING_SCALE.sm : SPACING_SCALE.md;
};

/**
 * Onboarding description top margin
 * Small phones: 4px (xs), Others: 8px (sm)
 */
export const getOnboardingDescriptionMarginTop = (): number => {
  return isSmallPhone() ? SPACING_SCALE.xs : SPACING_SCALE.sm;
};

/**
 * Onboarding icon size (for icon inside container)
 * Calculated as ~55% of icon container size for proper visual balance
 * Small phones: ~66px (55% of 120px), Standard: ~77px (55% of 140px), Tablets: ~99px (55% of 180px)
 */
export const getOnboardingIconSize = (): number => {
  const containerSize = getResponsiveIconContainerSize();
  // Icon should be 55% of container for optimal visual balance
  return Math.round(containerSize * 0.55);
};

// =============================================================================
// FORM COMPONENT SPACING - CENTRALIZED CALCULATIONS
// =============================================================================
// ⚠️ CRITICAL: ALL form-related spacing/sizing calculations MUST be here.
// Components (FormContainer, AtomicInput, AtomicTextArea) should NEVER
// calculate dimensions - they consume pre-calculated values from useResponsive().
//
// Pattern: Universal values that work across iOS, Android, Web.
// No platform-specific code - write universal patterns only.
// =============================================================================

/**
 * Keyboard vertical offset for KeyboardAvoidingView
 * Accounts for header/navigation bar height
 * Universal value that works across all platforms
 */
export const getKeyboardVerticalOffset = (): number => {
  // 90px accounts for:
  // - Navigation header: ~56-60px (standard across platforms)
  // - Safe area top: ~30-44px (notch on iPhone)
  // Total: ~90px ensures keyboard doesn't cover inputs
  return 90;
};

/**
 * Form container bottom padding
 * Prevents overlap with bottom tab navigation and ensures submit buttons are accessible
 *
 * Formula: safeAreaBottom + tabBarHeight + extraSpace
 * - Tab bar height: ~56px (iOS/Android standard)
 * - Extra space: ~24px (breathing room for submit button)
 * - Safe area: Variable (home indicator on iPhone)
 * - Minimum: 100px (ensures buttons always accessible)
 */
export const getFormBottomPadding = (safeAreaBottom: number): number => {
  const TAB_BAR_HEIGHT = 56;
  const EXTRA_SPACE = 24;
  const calculatedPadding = safeAreaBottom + TAB_BAR_HEIGHT + EXTRA_SPACE;

  // Ensure minimum 100px for accessibility
  return Math.max(calculatedPadding, 100);
};

/**
 * Input field icon size
 * Used for leading/trailing icons and password toggle
 * Apple HIG: Minimum 22px for touch targets
 */
export const getInputIconSize = (): number => {
  const { width } = getScreenDimensions();

  if (width <= BREAKPOINTS.SMALL_PHONE) {
    // Small phones: 18px (slightly smaller for space)
    return 18;
  } else if (width >= BREAKPOINTS.TABLET) {
    // Tablets: 24px (larger for readability)
    return 24;
  }

  // Standard: 20px (matches Material Design)
  return 20;
};

/**
 * Form content container width
 * Forms need more generous width than regular content to prevent cramped layouts
 *
 * Strategy:
 * - Phones: undefined (no max width restriction, fills available space)
 * - Tablets: Max 700px (readable but not restrictive)
 *
 * Different from getResponsiveMaxWidth which is for text content (max 400px)
 *
 * @returns number for tablets (700px max), undefined for phones (no restriction)
 */
export const getFormContentWidth = (): number | undefined => {
  const { width } = getScreenDimensions();

  if (width >= BREAKPOINTS.TABLET) {
    // Tablets: 70% of width, max 700px (generous for forms)
    return Math.min(width * 0.7, 700);
  }

  // Phones: No max width restriction (undefined allows full width)
  return undefined;
};

/**
 * Form element spacing (vertical)
 * Vertical spacing between form elements (inputs, buttons, etc.)
 * Used with Children.map() wrapper pattern for universal compatibility
 * Replaces CSS gap property (old RN version compatibility)
 *
 * Universal pattern - works on iOS, Android, Web
 */
export const getFormElementSpacing = (): number => {
  const { width } = getScreenDimensions();

  if (width <= BREAKPOINTS.SMALL_PHONE) {
    // Small phones: 16px (adequate for space efficiency)
    return 16;
  } else if (width >= BREAKPOINTS.TABLET) {
    // Tablets: 24px (generous spacing for larger screens)
    return 24;
  }

  // Standard: 20px (comfortable vertical rhythm)
  return 20;
};
