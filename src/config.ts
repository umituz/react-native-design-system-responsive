/**
 * Responsive Design Configuration
 *
 * Centralized configuration for responsive design system.
 * All magic numbers and breakpoints are defined here for maintainability.
 */

/**
 * Device breakpoints based on standard device sizes
 * These values determine when responsive behaviors change
 */
export const DEVICE_BREAKPOINTS = {
  SMALL_PHONE: 375,    // iPhone 13 mini and smaller
  MEDIUM_PHONE: 414,   // iPhone 13/14/15
  LARGE_PHONE: 428,    // iPhone 14 Pro Max
  SMALL_TABLET: 768,   // iPad mini
  TABLET: 1024,        // iPad Air and larger tablets
} as const;

/**
 * Responsive sizing percentages
 * These percentages control how elements scale relative to screen dimensions
 */
export const RESPONSIVE_PERCENTAGES = {
  // Logo sizing percentages
  LOGO_SMALL_PHONE_MAX: 0.28,  // 28% of screen width for small phones
  LOGO_TABLET_MAX: 0.15,      // 15% of screen width for tablets
  
  // Icon container sizing percentages
  ICON_CONTAINER_SMALL_PHONE: 0.30,  // 30% of screen width for small phones
  ICON_CONTAINER_TABLET: 0.20,       // 20% of screen width for tablets
  
  // Content width percentages
  CONTENT_SMALL_PHONE: 0.90,   // 90% of screen width for small phones
  CONTENT_PHONE: 0.85,          // 85% of screen width for standard phones
  CONTENT_TABLET: 0.60,         // 60% of screen width for tablets
  
  // Input height percentages
  INPUT_SMALL_DEVICE: 0.15,    // 15% of screen height for small devices
  INPUT_MEDIUM_DEVICE: 0.18,    // 18% of screen height for medium devices
  
  // Font scaling factors
  FONT_SMALL_PHONE: 0.90,      // 90% of base font size for small phones
  FONT_TABLET: 1.10,            // 110% of base font size for tablets
} as const;

/**
 * Size constraints and limits
 * These values define minimum and maximum sizes for responsive elements
 */
export const SIZE_CONSTRAINTS = {
  // Logo size constraints
  LOGO_MIN_SMALL: 100,          // Minimum logo size for small phones
  LOGO_MAX_SMALL: 120,          // Maximum logo size for small phones
  LOGO_MIN_TABLET: 140,         // Minimum logo size for tablets
  LOGO_MAX_TABLET: 200,         // Maximum logo size for tablets
  
  // Input height constraints
  INPUT_MAX_SMALL: 120,         // Maximum input height for small devices
  INPUT_MAX_MEDIUM: 150,        // Maximum input height for medium devices
  INPUT_MAX_LARGE: 200,          // Maximum input height for large devices
  
  // Icon container constraints
  ICON_MAX_SMALL: 120,           // Maximum icon container for small phones
  ICON_MAX_TABLET: 180,          // Maximum icon container for tablets
  
  // Content width constraints
  CONTENT_MAX_TABLET: 600,       // Maximum content width for tablets
  
  // Modal height constraints
  MODAL_MIN_SMALL: 250,         // Minimum modal height for small devices
  MODAL_MIN_STANDARD: 300,       // Minimum modal height for standard devices
  MODAL_MIN_TABLET: 350,        // Minimum modal height for tablets
  MODAL_MAX_TABLET: 500,        // Maximum modal height for tablets
  
  // Font size constraints
  FONT_MIN_SIZE: 11,             // Minimum font size
} as const;

/**
 * Layout spacing and positioning
 * These values control spacing, padding, and positioning
 */
export const LAYOUT_CONSTANTS = {
  // Spacing multipliers
  SPACING_MULTIPLIER_SMALL: 0.90,   // 90% spacing for small devices
  SPACING_MULTIPLIER_TABLET: 1.20,   // 120% spacing for tablets
  SPACING_MULTIPLIER_STANDARD: 1.0,   // 100% spacing for standard devices
  
  // Padding and margins
  HORIZONTAL_PADDING_BASE: 16,         // Base horizontal padding
  BOTTOM_POSITION_BASE: 32,           // Base bottom position
  
  // Safe area offsets
  SAFE_AREA_OFFSET: 16,               // Safe area offset for positioning
  TAB_BAR_OFFSET: 90,                 // Tab bar height + spacing for FAB positioning
  
  // FAB positioning
  FAB_BOTTOM_TABLET: 100,             // FAB bottom position for tablets
  FAB_RIGHT_TABLET: 24,               // FAB right position for tablets
  FAB_RIGHT_PHONE: 20,                // FAB right position for phones
  
  // Modal heights
  MODAL_HEIGHT_SMALL: '75%',          // Modal max height for small devices
  MODAL_HEIGHT_STANDARD: '70%',        // Modal max height for standard devices
  MODAL_HEIGHT_TABLET: '60%',         // Modal max height for tablets
} as const;

/**
 * Device height thresholds
 * These values determine responsive behavior based on screen height
 */
export const HEIGHT_THRESHOLDS = {
  SMALL_DEVICE: 667,    // iPhone SE, iPhone 8 height
  MEDIUM_DEVICE: 844,    // iPhone 13 mini, iPhone 13 height
  LARGE_DEVICE: 1024,    // Tablet height threshold
} as const;

/**
 * Grid layout configuration
 * Controls responsive grid behavior
 */
export const GRID_CONFIG = {
  DEFAULT_MOBILE_COLUMNS: 2,    // Default columns for mobile
  DEFAULT_TABLET_COLUMNS: 4,    // Default columns for tablet
} as const;

/**
 * Input validation constraints
 * Defines valid ranges for input parameters
 */
export const VALIDATION_CONSTRAINTS = {
  MIN_BASE_SIZE: 0,               // Minimum valid base size
  MAX_BASE_SIZE: 10000,           // Maximum valid base size
  MIN_BASE_FONT_SIZE: 1,          // Minimum valid font size
  MAX_BASE_FONT_SIZE: 1000,       // Maximum valid font size
  MIN_SCREEN_DIMENSION: 100,      // Minimum valid screen dimension
  MAX_SCREEN_DIMENSION: 10000,    // Maximum valid screen dimension
} as const;