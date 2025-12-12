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

import { useCallback, useMemo } from 'react';
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
  getMinTouchTarget,
  getSpacingMultiplier,
  DeviceType,
} from './responsive';

export interface UseResponsiveReturn {
  // Device info
  width: number;
  height: number;
  isSmallDevice: boolean;
  isTabletDevice: boolean;
  isLandscapeDevice: boolean;
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

  // Memoize utility functions to prevent unnecessary re-renders
  const getLogoSize = useCallback((baseSize?: number) => getResponsiveLogoSize(baseSize), []);
  const getInputHeight = useCallback((baseHeight?: number) => getResponsiveInputHeight(baseHeight), []);
  const getIconSize = useCallback((baseSize?: number) => getResponsiveIconContainerSize(baseSize), []);
  const getMaxWidth = useCallback((baseWidth?: number) => getResponsiveMaxWidth(baseWidth), []);
  const getFontSize = useCallback((baseFontSize: number) => getResponsiveFontSize(baseFontSize), []);
  const getGridCols = useCallback((mobile?: number, tablet?: number) => getResponsiveGridColumns(mobile, tablet), []);

  // Memoize responsive values to prevent unnecessary recalculations
  const responsiveValues = useMemo(() => ({
    // Device info
    width,
    height,
    isSmallDevice: isSmallPhone(),
    isTabletDevice: isTablet(),
    isLandscapeDevice: isLandscape(),
    deviceType: getDeviceType(),

    // Safe area insets
    insets,

    // Responsive sizes (with default values)
    logoSize: getResponsiveLogoSize(),
    inputHeight: getResponsiveInputHeight(),
    iconContainerSize: getResponsiveIconContainerSize(),
    maxContentWidth: getResponsiveMaxWidth(),
    minTouchTarget: getMinTouchTarget(),

    // Responsive positioning
    horizontalPadding: getResponsiveHorizontalPadding(undefined, insets),
    bottomPosition: getResponsiveBottomPosition(undefined, insets),
    fabPosition: getResponsiveFABPosition(insets),

    // Responsive layout
    modalMaxHeight: getResponsiveModalMaxHeight(),
    modalMinHeight: getResponsiveMinModalHeight(),
    gridColumns: getResponsiveGridColumns(),
    spacingMultiplier: getSpacingMultiplier(),

    // Utility functions (memoized)
    getLogoSize,
    getInputHeight,
    getIconSize,
    getMaxWidth,
    getFontSize,
    getGridCols,
  }), [width, height, insets]);

  return responsiveValues;
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
