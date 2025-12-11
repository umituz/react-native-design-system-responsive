/**
 * @umituz/react-native-design-system-responsive - Public API
 *
 * Responsive design utilities for React Native - Screen dimensions, device detection,
 * and responsive sizing utilities following Material Design 3 and iOS HIG principles.
 *
 * Usage:
 * ```typescript
 * import { useResponsive, isTablet, getResponsiveLogoSize } from '@umituz/react-native-design-system-responsive';
 * ```
 */

// Hook exports
export { useResponsive, useResponsiveSizes, useDeviceType } from './useResponsive';
export type { UseResponsiveReturn } from './useResponsive';

// Utility function exports
export {
  getScreenDimensions,
  isSmallPhone,
  isTablet,
  getResponsiveLogoSize,
  getResponsiveInputHeight,
  getResponsiveHorizontalPadding,
  getResponsiveBottomPosition,
  getResponsiveFABPosition,
  getResponsiveModalMaxHeight,
  getResponsiveMinModalHeight,
  getResponsiveIconContainerSize,
  getResponsiveGridColumns,
  getResponsiveMaxWidth,
  getResponsiveFontSize,
  isLandscape,
  getKeyboardBehavior,
  getDeviceType,
  getMinTouchTargetSize,
  getSpacingMultiplier,
  getOnboardingIconMarginTop,
  getOnboardingIconMarginBottom,
  getOnboardingTitleMarginBottom,
  getOnboardingTextPadding,
  getOnboardingDescriptionMarginTop,
  DeviceType,
} from './responsive';

// Platform constants exports
export {
  IOS_HIG,
  ANDROID_MATERIAL,
  PLATFORM_CONSTANTS,
  isValidTouchTarget,
  getMinTouchTarget,
} from './platformConstants';

