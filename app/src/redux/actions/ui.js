export const UPDATE_PRIMARY_COLOR = "UPDATE_PRIMARY_COLOR";
export const UPDATE_SECONDARY_COLOR = "UPDATE_SECONDARY_COLOR";
export const UPDATE_FOREGROUND_COLOR = "UPDATE_FOREGROUND_COLOR";
export const UPDATE_APPBAR_DEFINED = "UPDATE_APPBAR_DEFINED";
export const UPDATE_APPBAR_HEIGHT = "UPDATE_APPBAR_HEIGHT";
export const UPDATE_BOTTOMNAV_DEFINED = "UPDATE_BOTTOMNAV_DEFINED";
export const UPDATE_BOTTOMNAV_HEIGHT = "UPDATE_BOTTOMNAV_HEIGHT";
export const UPDATE_NAVDRAWER_CLOSING_FROM_TOGGLE_BUTTON = "UPDATE_NAVDRAWER_CLOSING_FROM_TOGGLE_BUTTON";
export const UPDATE_NAVDRAWER_DEFINED = "UPDATE_NAVDRAWER_DEFINED";
export const UPDATE_NAVDRAWER_OPEN = "UPDATE_NAVDRAWER_OPEN";

/**
 * Update the primary color of the ui.
 * @param {string} primaryColor the primary color.
 * @returns {{ type: string, primaryColor: string }}
 */
export const updatePrimaryColor = (primaryColor="#000000") => ({
  type: UPDATE_PRIMARY_COLOR,
  primaryColor
});

/**
 * Update the secondary color of the ui.
 * @param {string} secondaryColor the secondary color.
 * @returns {{ type: string, secondaryColor: string }}
 */
export const updateSecondaryColor = (secondaryColor="#000000") => ({
  type: UPDATE_SECONDARY_COLOR,
  secondaryColor
})

/**
 * Update the foreground color of the ui.
 * @param {string} foregroundColor the foreground color.
 */
export const updateForegroundColor = (foregroundColor="#ffffff") => ({
  type: UPDATE_FOREGROUND_COLOR,
  foregroundColor
})

/**
 * Update whether or not an appbar is used by the ui.
 * @param {boolean} appbarDefined whether or not the appbar is defined.
 * @returns {{ type: string, appbarDefined: boolean }}
 */
export const updateAppbarDefined = (appbarDefined=false) => ({
  type: UPDATE_APPBAR_DEFINED,
  appbarDefined
})

/**
 * Update the height of the appbar.
 * @param {number} appbarHeight the height of the appbar.
 */
export const updateAppbarHeight = (appbarHeight=0) => ({
  type: UPDATE_APPBAR_HEIGHT,
  appbarHeight
})

/**
 * Update whether or not the ui uses a bottom nav.
 * @param {boolean} bottomNavDefined whether or not the bottom nav is defined.
 * @returns {{ type: string, bottomNavDefined: boolean }}
 */
export const updateBottomNavDefined = (bottomNavDefined=false)  => ({
  type: UPDATE_BOTTOMNAV_DEFINED,
  bottomNavDefined
})

/**
 * Update the height of the bottom nav.
 * @param {number} bottomNavHeight the height of the bottom nav.
 */
export const updateBottomNavHeight = (bottomNavHeight=0) => ({
  type: UPDATE_BOTTOMNAV_HEIGHT,
  bottomNavHeight
})

/**
 * Update whether or not the nav drawer is closing from a toggle button click.
 * @param {boolean} navDrawerClosingFromToggleButton
 */
export const updateNavDrawerClosingFromToggleButton = (navDrawerClosingFromToggleButton) => ({
  type: UPDATE_NAVDRAWER_CLOSING_FROM_TOGGLE_BUTTON,
  navDrawerClosingFromToggleButton
});

/**
 * Update whether or not the ui uses a nav drawer.
 * @param {boolean} navDrawerDefined whether or not the nav drawer is defined.
 * @returns {{ type: string, navDrawerDefined: boolean }}
 */
export const updateNavDrawerDefined = (navDrawerDefined=false) => ({
  type: UPDATE_BOTTOMNAV_DEFINED,
  navDrawerDefined
})

/**
 * Update whether or not the nav drawer is open.
 * @param {boolean} navDrawerOpen whether or not the nav drawer is open.
 */
export const updateNavDrawerOpen = (navDrawerOpen=false) => ({
  type: UPDATE_NAVDRAWER_OPEN,
  navDrawerOpen
})
