/**
 * Responsive Design Utilities
 *
 * Centralized responsive sizing and spacing utilities to prevent
 * Apple App Store rejection due to layout issues on different devices.
 *
 * This is the main export file that imports from specialized modules.
 */

// Device detection
export {
  getScreenDimensions,
  isSmallPhone,
  isTablet,
  isLandscape,
  getDeviceType,
  DeviceType,
} from './deviceDetection';

// Responsive sizing
export {
  getResponsiveLogoSize,
  getResponsiveInputHeight,
  getResponsiveIconContainerSize,
  getResponsiveMaxWidth,
  getResponsiveFontSize,
  getResponsiveGridColumns,
} from './responsiveSizing';

// Responsive layout
export {
  getResponsiveHorizontalPadding,
  getResponsiveBottomPosition,
  getResponsiveFABPosition,
  getResponsiveModalMaxHeight,
  getResponsiveMinModalHeight,
} from './responsiveLayout';

// Platform constants
export {
  IOS_HIG,
  ANDROID_MATERIAL,
  PLATFORM_CONSTANTS,
  isValidTouchTarget,
  getMinTouchTarget,
} from './platformConstants';

// Configuration
export {
  DEVICE_BREAKPOINTS,
  RESPONSIVE_PERCENTAGES,
  SIZE_CONSTRAINTS,
  LAYOUT_CONSTANTS,
  HEIGHT_THRESHOLDS,
  GRID_CONFIG,
  VALIDATION_CONSTRAINTS,
} from './config';

// Internal imports for getSpacingMultiplier
import { getScreenDimensions } from './deviceDetection';
import { DEVICE_BREAKPOINTS, LAYOUT_CONSTANTS } from './config';

// Validation utilities
export {
  ResponsiveValidationError,
  validateNumber,
  validateFontSize,
  validateScreenDimensions,
  validateSafeAreaInsets,
  validateGridColumns,
  clamp,
  safePercentage,
} from './validation';

/**
 * Responsive spacing multiplier
 * Returns a multiplier for spacing based on device size
 * 
 * @returns Spacing multiplier (0.9-1.2)
 */
export const getSpacingMultiplier = (): number => {
  try {
    const { width } = getScreenDimensions();

    if (width <= DEVICE_BREAKPOINTS.SMALL_PHONE) {
      return LAYOUT_CONSTANTS.SPACING_MULTIPLIER_SMALL;
    } else if (width >= DEVICE_BREAKPOINTS.TABLET) {
      return LAYOUT_CONSTANTS.SPACING_MULTIPLIER_TABLET;
    }

    return LAYOUT_CONSTANTS.SPACING_MULTIPLIER_STANDARD;
  } catch (error) {
    if (__DEV__) {
      console.warn('[getSpacingMultiplier] Error calculating spacing multiplier, using fallback');
    }
    return LAYOUT_CONSTANTS.SPACING_MULTIPLIER_STANDARD;
  }
};

/**
 * Get universal keyboard behavior
 * Returns 'padding' which works across all platforms (iOS, Android, Web)
 * 
 * @returns Keyboard behavior string
 */
export const getKeyboardBehavior = (): 'padding' | 'height' | 'position' | undefined => {
  return 'padding';
};