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
export { useResponsive } from './useResponsive';
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
  getDeviceType,
  DeviceType,
} from './responsive';

// Device detection exports
export { getSpacingMultiplier } from './deviceDetection';



// Platform constants exports
export {
  IOS_HIG,
  PLATFORM_CONSTANTS,
  isValidTouchTarget,
  getMinTouchTarget,
} from './platformConstants';

