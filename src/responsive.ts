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



