/**
 * Responsive Sizing Utilities
 *
 * Responsive sizing utilities for UI components.
 * Ensures proper scaling across different device sizes.
 */

import { getScreenDimensions } from './deviceDetection';
import { 
  DEVICE_BREAKPOINTS, 
  RESPONSIVE_PERCENTAGES, 
  SIZE_CONSTRAINTS,
  HEIGHT_THRESHOLDS,
  GRID_CONFIG
} from './config';
import { 
  validateNumber, 
  validateFontSize, 
  safePercentage, 
  clamp
} from './validation';

/**
 * Responsive logo/icon size
 * Small devices: 100-120px
 * Medium devices: 120-160px
 * Tablets: 160-200px
 * 
 * @param baseSize - Base logo size (default: 140)
 * @returns Responsive logo size
 * @throws ResponsiveValidationError if baseSize is invalid
 */
export const getResponsiveLogoSize = (baseSize: number = 140): number => {
  try {
    const validatedBaseSize = validateNumber(baseSize, 'baseSize', 50, 500);
    const { width } = getScreenDimensions();

    if (width <= DEVICE_BREAKPOINTS.SMALL_PHONE) {
      // iPhone 13 mini: 28% of width, min 100px, max 120px
      const calculatedSize = safePercentage(width, RESPONSIVE_PERCENTAGES.LOGO_SMALL_PHONE_MAX);
      return clamp(calculatedSize, SIZE_CONSTRAINTS.LOGO_MIN_SMALL, SIZE_CONSTRAINTS.LOGO_MAX_SMALL);
    } else if (width >= DEVICE_BREAKPOINTS.TABLET) {
      // iPad: 15% of width, min 140px, max 200px
      const calculatedSize = safePercentage(width, RESPONSIVE_PERCENTAGES.LOGO_TABLET_MAX);
      return clamp(calculatedSize, SIZE_CONSTRAINTS.LOGO_MIN_TABLET, SIZE_CONSTRAINTS.LOGO_MAX_TABLET);
    }

    // Standard phones: use validated base size
    return validatedBaseSize;
  } catch (error) {
    if (__DEV__) {
      console.warn('[getResponsiveLogoSize] Error calculating logo size, using fallback');
    }
    return 140; // Safe fallback
  }
};

/**
 * Responsive multiline input height
 * Prevents keyboard overlap on small devices
 *
 * Small devices: 100-120px
 * Medium devices: 120-150px
 * Tablets: 150-200px
 * 
 * @param baseHeight - Base input height (default: 200)
 * @returns Responsive input height
 * @throws ResponsiveValidationError if baseHeight is invalid
 */
export const getResponsiveInputHeight = (baseHeight: number = 200): number => {
  try {
    const validatedBaseHeight = validateNumber(baseHeight, 'baseHeight', 50, 500);
    const { height } = getScreenDimensions();

    if (height <= HEIGHT_THRESHOLDS.SMALL_DEVICE) {
      // iPhone SE, iPhone 8: 15% of height, max 120px
      const calculatedHeight = safePercentage(height, RESPONSIVE_PERCENTAGES.INPUT_SMALL_DEVICE);
      return Math.min(calculatedHeight, SIZE_CONSTRAINTS.INPUT_MAX_SMALL);
    } else if (height <= HEIGHT_THRESHOLDS.MEDIUM_DEVICE) {
      // iPhone 13 mini, iPhone 13: 18% of height, max 150px
      const calculatedHeight = safePercentage(height, RESPONSIVE_PERCENTAGES.INPUT_MEDIUM_DEVICE);
      return Math.min(calculatedHeight, SIZE_CONSTRAINTS.INPUT_MAX_MEDIUM);
    }

    // Larger devices: use validated base height capped at max
    return Math.min(validatedBaseHeight, SIZE_CONSTRAINTS.INPUT_MAX_LARGE);
  } catch (error) {
    if (__DEV__) {
      console.warn('[getResponsiveInputHeight] Error calculating input height, using fallback');
    }
    return 200; // Safe fallback
  }
};

/**
 * Responsive icon container size
 * Used for icon containers, cards, etc.
 * 
 * @param baseSize - Base container size (default: 140)
 * @returns Responsive icon container size
 * @throws ResponsiveValidationError if baseSize is invalid
 */
export const getResponsiveIconContainerSize = (baseSize: number = 140): number => {
  try {
    const validatedBaseSize = validateNumber(baseSize, 'baseSize', 50, 300);
    const { width } = getScreenDimensions();

    if (width <= DEVICE_BREAKPOINTS.SMALL_PHONE) {
      // Small phones: 30% of width, max 120px
      const calculatedSize = safePercentage(width, RESPONSIVE_PERCENTAGES.ICON_CONTAINER_SMALL_PHONE);
      return Math.min(calculatedSize, SIZE_CONSTRAINTS.ICON_MAX_SMALL);
    } else if (width >= DEVICE_BREAKPOINTS.TABLET) {
      // Tablets: 20% of width, max 180px
      const calculatedSize = safePercentage(width, RESPONSIVE_PERCENTAGES.ICON_CONTAINER_TABLET);
      return Math.min(calculatedSize, SIZE_CONSTRAINTS.ICON_MAX_TABLET);
    }

    // Standard phones: use validated base size
    return validatedBaseSize;
  } catch (error) {
    if (__DEV__) {
      console.warn('[getResponsiveIconContainerSize] Error calculating container size, using fallback');
    }
    return 140; // Safe fallback
  }
};

/**
 * Responsive max width for content
 * Prevents text from stretching too wide on tablets
 * 
 * @param baseWidth - Base content width (default: 400)
 * @returns Responsive max width
 * @throws ResponsiveValidationError if baseWidth is invalid
 */
export const getResponsiveMaxWidth = (baseWidth: number = 400): number => {
  try {
    const validatedBaseWidth = validateNumber(baseWidth, 'baseWidth', 100, 1000);
    const { width } = getScreenDimensions();

    if (width <= DEVICE_BREAKPOINTS.SMALL_PHONE) {
      // Small phones: 90% of width
      return safePercentage(width, RESPONSIVE_PERCENTAGES.CONTENT_SMALL_PHONE);
    } else if (width >= DEVICE_BREAKPOINTS.TABLET) {
      // Tablets: 60% of width, max 600px
      const calculatedWidth = safePercentage(width, RESPONSIVE_PERCENTAGES.CONTENT_TABLET);
      return Math.min(calculatedWidth, SIZE_CONSTRAINTS.CONTENT_MAX_TABLET);
    }

    // Standard phones: use base width with 85% maximum
    const maxWidth = safePercentage(width, RESPONSIVE_PERCENTAGES.CONTENT_PHONE);
    return Math.min(maxWidth, validatedBaseWidth);
  } catch (error) {
    if (__DEV__) {
      console.warn('[getResponsiveMaxWidth] Error calculating max width, using fallback');
    }
    return 400; // Safe fallback
  }
};

/**
 * Responsive font size
 * Scales text for different devices while respecting minimum sizes
 * 
 * @param baseFontSize - Base font size
 * @returns Responsive font size
 * @throws ResponsiveValidationError if baseFontSize is invalid
 */
export const getResponsiveFontSize = (baseFontSize: number): number => {
  try {
    const validatedBaseSize = validateFontSize(baseFontSize);
    const { width } = getScreenDimensions();

    if (width <= DEVICE_BREAKPOINTS.SMALL_PHONE) {
      // Small phones: slightly smaller text with minimum size constraint
      const scaledSize = validatedBaseSize * RESPONSIVE_PERCENTAGES.FONT_SMALL_PHONE;
      return Math.max(scaledSize, SIZE_CONSTRAINTS.FONT_MIN_SIZE);
    } else if (width >= DEVICE_BREAKPOINTS.TABLET) {
      // Tablets: slightly larger text
      return validatedBaseSize * RESPONSIVE_PERCENTAGES.FONT_TABLET;
    }

    // Standard phones: use validated base size
    return validatedBaseSize;
  } catch (error) {
    if (__DEV__) {
      console.warn('[getResponsiveFontSize] Error calculating font size, using fallback');
    }
    return 16; // Safe fallback
  }
};

/**
 * Responsive grid columns
 * Returns number of columns for grid layouts
 * 
 * @param mobileColumns - Number of columns for mobile devices (default: 2)
 * @param tabletColumns - Number of columns for tablet devices (default: 4)
 * @returns Responsive number of grid columns
 * @throws ResponsiveValidationError if parameters are invalid
 */
export const getResponsiveGridColumns = (
  mobileColumns: number = GRID_CONFIG.DEFAULT_MOBILE_COLUMNS,
  tabletColumns: number = GRID_CONFIG.DEFAULT_TABLET_COLUMNS
): number => {
  try {
    const validatedMobile = validateNumber(mobileColumns, 'mobileColumns', 1, 20);
    const validatedTablet = validateNumber(tabletColumns, 'tabletColumns', 1, 20);
    
    const { width } = getScreenDimensions();
    return width >= DEVICE_BREAKPOINTS.TABLET ? validatedTablet : validatedMobile;
  } catch (error) {
    if (__DEV__) {
      console.warn('[getResponsiveGridColumns] Error calculating grid columns, using fallback');
    }
    return 2; // Safe fallback
  }
};