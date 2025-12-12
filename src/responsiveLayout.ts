/**
 * Responsive Layout Utilities
 *
 * Layout utilities for positioning and spacing.
 * Handles safe areas and responsive positioning.
 */

import { getScreenDimensions } from './deviceDetection';
import { 
  DEVICE_BREAKPOINTS, 
  LAYOUT_CONSTANTS,
  HEIGHT_THRESHOLDS,
  SIZE_CONSTRAINTS
} from './config';
import { 
  validateNumber, 
  validateSafeAreaInsets
} from './validation';

/**
 * Responsive horizontal padding
 * Accounts for safe area on notched devices and iPad
 * 
 * @param basePadding - Base padding value (default: 16)
 * @param insets - Safe area insets object
 * @returns Responsive horizontal padding
 * @throws ResponsiveValidationError if parameters are invalid
 */
export const getResponsiveHorizontalPadding = (
  basePadding: number = LAYOUT_CONSTANTS.HORIZONTAL_PADDING_BASE,
  insets: { left?: number; right?: number } = { left: 0, right: 0 }
): number => {
  try {
    const validatedBasePadding = validateNumber(basePadding, 'basePadding', 0, 100);
    validateSafeAreaInsets(insets);
    
    const { width } = getScreenDimensions();
    const { left = 0, right = 0 } = insets;

    if (width >= DEVICE_BREAKPOINTS.TABLET) {
      // iPad: larger padding with safe area consideration
      const tabletPadding = validatedBasePadding * 1.5;
      return Math.max(
        tabletPadding, 
        left + LAYOUT_CONSTANTS.HORIZONTAL_PADDING_BASE, 
        right + LAYOUT_CONSTANTS.HORIZONTAL_PADDING_BASE
      );
    }

    // Phones: account for safe area with smaller offset
    return Math.max(
      validatedBasePadding, 
      left + LAYOUT_CONSTANTS.SAFE_AREA_OFFSET, 
      right + LAYOUT_CONSTANTS.SAFE_AREA_OFFSET
    );
  } catch (error) {
    if (__DEV__) {
      console.warn('[getResponsiveHorizontalPadding] Error calculating padding, using fallback');
    }
    return 16; // Safe fallback
  }
};

/**
 * Responsive bottom positioning
 * Accounts for home indicator and safe area
 * 
 * @param basePosition - Base bottom position (default: 32)
 * @param insets - Safe area insets object
 * @returns Responsive bottom position
 * @throws ResponsiveValidationError if parameters are invalid
 */
export const getResponsiveBottomPosition = (
  basePosition: number = LAYOUT_CONSTANTS.BOTTOM_POSITION_BASE,
  insets: { bottom?: number } = { bottom: 0 }
): number => {
  try {
    const validatedBasePosition = validateNumber(basePosition, 'basePosition', 0, 500);
    validateSafeAreaInsets(insets);
    
    const { bottom = 0 } = insets;
    return Math.max(validatedBasePosition, bottom + LAYOUT_CONSTANTS.SAFE_AREA_OFFSET);
  } catch (error) {
    if (__DEV__) {
      console.warn('[getResponsiveBottomPosition] Error calculating bottom position, using fallback');
    }
    return 32; // Safe fallback
  }
};

/**
 * Responsive FAB (Floating Action Button) position
 * CRITICAL: Ensures FAB appears above tab bar and safe areas
 *
 * Tab bar heights:
 * - iOS: ~80-90px (including safe area)
 * - Android: ~70px
 *
 * FAB positioning:
 * - Tablets: 100px from bottom (generous spacing)
 * - Phones: 90px from bottom (above tab bar)
 * - Safe area aware (home indicator clearance)
 * 
 * @param insets - Safe area insets object
 * @returns Responsive FAB position with bottom and right values
 * @throws ResponsiveValidationError if insets are invalid
 */
export const getResponsiveFABPosition = (
  insets: { bottom?: number; right?: number } = { bottom: 0, right: 0 }
): { bottom: number; right: number } => {
  try {
    validateSafeAreaInsets(insets);
    const { width } = getScreenDimensions();
    const { bottom = 0, right = 0 } = insets;

    if (width >= DEVICE_BREAKPOINTS.TABLET) {
      // iPad: larger margins, higher position
      return {
        bottom: Math.max(
          LAYOUT_CONSTANTS.FAB_BOTTOM_TABLET, 
          bottom + LAYOUT_CONSTANTS.TAB_BAR_OFFSET
        ),
        right: Math.max(
          LAYOUT_CONSTANTS.FAB_RIGHT_TABLET, 
          right + LAYOUT_CONSTANTS.HORIZONTAL_PADDING_BASE
        ),
      };
    }

    // Phones: standard position above tab bar, respect safe area
    return {
      bottom: Math.max(
        LAYOUT_CONSTANTS.TAB_BAR_OFFSET, 
        bottom + LAYOUT_CONSTANTS.SAFE_AREA_OFFSET
      ),
      right: Math.max(
        LAYOUT_CONSTANTS.FAB_RIGHT_PHONE, 
        right + LAYOUT_CONSTANTS.SAFE_AREA_OFFSET
      ),
    };
  } catch (error) {
    if (__DEV__) {
      console.warn('[getResponsiveFABPosition] Error calculating FAB position, using fallback');
    }
    return { bottom: 90, right: 20 }; // Safe fallback
  }
};

/**
 * Responsive modal max height
 * Prevents modals from taking too much space on tablets
 * or too little on small devices
 * 
 * @returns Modal max height as percentage string
 */
export const getResponsiveModalMaxHeight = (): string => {
  try {
    const { height } = getScreenDimensions();

    if (height <= HEIGHT_THRESHOLDS.SMALL_DEVICE) {
      // Small devices: 75% of height
      return LAYOUT_CONSTANTS.MODAL_HEIGHT_SMALL;
    } else if (height >= HEIGHT_THRESHOLDS.LARGE_DEVICE) {
      // Tablets: 60% of height
      return LAYOUT_CONSTANTS.MODAL_HEIGHT_TABLET;
    }

    // Standard: 70%
    return LAYOUT_CONSTANTS.MODAL_HEIGHT_STANDARD;
  } catch (error) {
    if (__DEV__) {
      console.warn('[getResponsiveModalMaxHeight] Error calculating modal height, using fallback');
    }
    return '70%'; // Safe fallback
  }
};

/**
 * Responsive modal min height
 * Ensures modals are always usable and not too small
 * Complements getResponsiveModalMaxHeight for complete modal sizing
 * 
 * @returns Modal min height in pixels
 */
export const getResponsiveMinModalHeight = (): number => {
  try {
    const { height } = getScreenDimensions();

    if (height <= HEIGHT_THRESHOLDS.SMALL_DEVICE) {
      // iPhone SE, 8: 40% of height, min 250px
      const calculatedHeight = height * 0.4;
      return Math.max(calculatedHeight, SIZE_CONSTRAINTS.MODAL_MIN_SMALL);
    } else if (height >= HEIGHT_THRESHOLDS.LARGE_DEVICE) {
      // iPad: 35% of height, min 350px, max 500px (capped for usability)
      const calculatedHeight = height * 0.35;
      return Math.min(
        Math.max(calculatedHeight, SIZE_CONSTRAINTS.MODAL_MIN_TABLET), 
        SIZE_CONSTRAINTS.MODAL_MAX_TABLET
      );
    }

    // Standard: 45% of height, min 300px
    const calculatedHeight = height * 0.45;
    return Math.max(calculatedHeight, SIZE_CONSTRAINTS.MODAL_MIN_STANDARD);
  } catch (error) {
    if (__DEV__) {
      console.warn('[getResponsiveMinModalHeight] Error calculating modal min height, using fallback');
    }
    return 300; // Safe fallback
  }
};