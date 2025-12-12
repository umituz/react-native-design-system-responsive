/**
 * Device Detection Utilities
 *
 * Utilities for detecting device types and screen dimensions.
 * Follows universal design principles for cross-platform compatibility.
 */

import { Dimensions } from 'react-native';
import { DEVICE_BREAKPOINTS } from './config';
import { validateScreenDimensions } from './validation';

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
 * Get current screen dimensions
 * @returns Screen width and height
 * @throws ResponsiveValidationError if dimensions are invalid
 */
export const getScreenDimensions = () => {
  const { width, height } = Dimensions.get('window');
  
  try {
    validateScreenDimensions(width, height);
    return { width, height };
  } catch (error) {
    if (__DEV__) {
      console.warn('[getScreenDimensions] Invalid screen dimensions detected, using fallback values');
    }
    // Fallback to safe default dimensions
    return { width: 414, height: 896 };
  }
};

/**
 * Check if current device is a small phone (iPhone 13 mini, SE)
 * @returns true if device is a small phone
 */
export const isSmallPhone = (): boolean => {
  try {
    const { width } = getScreenDimensions();
    return width <= DEVICE_BREAKPOINTS.SMALL_PHONE;
  } catch (error) {
    if (__DEV__) {
      console.warn('[isSmallPhone] Error detecting device type, assuming standard phone');
    }
    return false;
  }
};

/**
 * Check if current device is a tablet (iPad)
 * @returns true if device is a tablet
 */
export const isTablet = (): boolean => {
  try {
    const { width } = getScreenDimensions();
    return width >= DEVICE_BREAKPOINTS.SMALL_TABLET;
  } catch (error) {
    if (__DEV__) {
      console.warn('[isTablet] Error detecting device type, assuming phone');
    }
    return false;
  }
};

/**
 * Check if device is in landscape mode
 * @returns true if device is in landscape orientation
 */
export const isLandscape = (): boolean => {
  try {
    const { width, height } = getScreenDimensions();
    return width > height;
  } catch (error) {
    if (__DEV__) {
      console.warn('[isLandscape] Error detecting orientation, assuming portrait');
    }
    return false;
  }
};

/**
 * Get current device type
 * @returns Device type enum value
 */
export const getDeviceType = (): DeviceType => {
  try {
    const { width } = getScreenDimensions();

    if (width <= DEVICE_BREAKPOINTS.SMALL_PHONE) {
      return DeviceType.SMALL_PHONE;
    } else if (width <= DEVICE_BREAKPOINTS.MEDIUM_PHONE) {
      return DeviceType.MEDIUM_PHONE;
    } else if (width <= DEVICE_BREAKPOINTS.LARGE_PHONE) {
      return DeviceType.LARGE_PHONE;
    }

    return DeviceType.TABLET;
  } catch (error) {
    if (__DEV__) {
      console.warn('[getDeviceType] Error detecting device type, assuming medium phone');
    }
    return DeviceType.MEDIUM_PHONE;
  }
};