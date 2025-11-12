/**
 * useResponsive Hook
 *
 * React Hook for accessing responsive utilities with real-time dimension updates
 * and safe area insets integration.
 *
 * Usage:
 * ```tsx
 * const { logoSize, inputHeight, fabPosition, isSmallDevice } = useResponsive();
 * ```
 */

import { useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
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
  isSmallPhone,
  isTablet,
  isLandscape,
  getDeviceType,
  getMinTouchTargetSize,
  getSpacingMultiplier,
  getOnboardingIconMarginTop,
  getOnboardingIconMarginBottom,
  getOnboardingTitleMarginBottom,
  getOnboardingTextPadding,
  getOnboardingDescriptionMarginTop,
  getOnboardingIconSize,
  getFormBottomPadding,
  getInputIconSize,
  getFormContentWidth,
  getFormElementSpacing,
  DeviceType,
} from '../utils/responsive';

export interface UseResponsiveReturn {
  // Device info
  width: number;
  height: number;
  isSmallDevice: boolean;
  isTabletDevice: boolean;
  isLandscapeMode: boolean;
  deviceType: DeviceType;

  // Safe area insets
  insets: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };

  // Responsive sizes
  logoSize: number;
  inputHeight: number;
  iconContainerSize: number;
  maxContentWidth: number;
  minTouchTarget: number;

  // Responsive positioning
  horizontalPadding: number;
  bottomPosition: number;
  fabPosition: { bottom: number; right: number };

  // Responsive layout
  modalMaxHeight: string;
  modalMinHeight: number;
  gridColumns: number;
  spacingMultiplier: number;

  // Onboarding-specific spacing (pre-calculated, device-aware)
  onboardingIconMarginTop: number;
  onboardingIconMarginBottom: number;
  onboardingIconSize: number;
  onboardingTitleMarginBottom: number;
  onboardingTextPadding: number;
  onboardingDescriptionMarginTop: number;

  // Form-specific spacing (pre-calculated, universal)
  formBottomPadding: number;
  inputIconSize: number;
  formContentWidth: number | undefined;
  formElementSpacing: number;

  // Utility functions
  getLogoSize: (baseSize?: number) => number;
  getInputHeight: (baseHeight?: number) => number;
  getIconSize: (baseSize?: number) => number;
  getMaxWidth: (baseWidth?: number) => number;
  getFontSize: (baseFontSize: number) => number;
  getGridCols: (mobile?: number, tablet?: number) => number;
}

/**
 * Hook for responsive design utilities
 * Automatically updates when screen dimensions or orientation changes
 */
export const useResponsive = (): UseResponsiveReturn => {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  return {
    // Device info
    width,
    height,
    isSmallDevice: isSmallPhone(),
    isTabletDevice: isTablet(),
    isLandscapeMode: isLandscape(),
    deviceType: getDeviceType(),

    // Safe area insets
    insets,

    // Responsive sizes (with default values)
    logoSize: getResponsiveLogoSize(),
    inputHeight: getResponsiveInputHeight(),
    iconContainerSize: getResponsiveIconContainerSize(),
    maxContentWidth: getResponsiveMaxWidth(),
    minTouchTarget: getMinTouchTargetSize(),

    // Responsive positioning
    horizontalPadding: getResponsiveHorizontalPadding(16, insets),
    bottomPosition: getResponsiveBottomPosition(32, insets),
    fabPosition: getResponsiveFABPosition(insets),

    // Responsive layout
    modalMaxHeight: getResponsiveModalMaxHeight(),
    modalMinHeight: getResponsiveMinModalHeight(),
    gridColumns: getResponsiveGridColumns(),
    spacingMultiplier: getSpacingMultiplier(),

    // Onboarding-specific spacing (pre-calculated, no component calculations)
    onboardingIconMarginTop: getOnboardingIconMarginTop(),
    onboardingIconMarginBottom: getOnboardingIconMarginBottom(),
    onboardingIconSize: getOnboardingIconSize(),
    onboardingTitleMarginBottom: getOnboardingTitleMarginBottom(),
    onboardingTextPadding: getOnboardingTextPadding(),
    onboardingDescriptionMarginTop: getOnboardingDescriptionMarginTop(),

    // Form-specific spacing (pre-calculated, universal)
    formBottomPadding: getFormBottomPadding(insets.bottom),
    inputIconSize: getInputIconSize(),
    formContentWidth: getFormContentWidth(),
    formElementSpacing: getFormElementSpacing(),

    // Utility functions (allow custom base values)
    getLogoSize: (baseSize) => getResponsiveLogoSize(baseSize),
    getInputHeight: (baseHeight) => getResponsiveInputHeight(baseHeight),
    getIconSize: (baseSize) => getResponsiveIconContainerSize(baseSize),
    getMaxWidth: (baseWidth) => getResponsiveMaxWidth(baseWidth),
    getFontSize: (baseFontSize) => getResponsiveFontSize(baseFontSize),
    getGridCols: (mobile, tablet) => getResponsiveGridColumns(mobile, tablet),
  };
};

/**
 * Shorthand hook for just responsive sizes
 */
export const useResponsiveSizes = () => {
  const { logoSize, inputHeight, iconContainerSize, maxContentWidth } = useResponsive();
  return { logoSize, inputHeight, iconContainerSize, maxContentWidth };
};

/**
 * Shorthand hook for just device type checks
 */
export const useDeviceType = () => {
  const { isSmallDevice, isTabletDevice, deviceType } = useResponsive();
  return { isSmallDevice, isTabletDevice, deviceType };
};
