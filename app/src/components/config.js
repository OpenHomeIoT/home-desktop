
const listeners = {
    primaryColor: [],
    secondaryColor: [],
    foregroundColor: [],
    appbarDefined: [],
    navDrawerDefined: [],
    bottomNavDefined: [],
    appbarHeight: [],
    navDrawerWidth: [],
    navDrawerOpen: [],
    bottomNavHeight: [],
};

let config = {
    primaryColor: "#000000",
    secondaryColor: "#000000",
    foregroundColor: "#ffffff",
    appbarDefined: false,
    navDrawerDefined: false,
    bottomNavDefined: false,
    appbarHeight: 62,
    navDrawerWidth: 240,
    navDrawerOpen: false,
    bottomNavHeight: 62
};

/* Keeps track of message box stats. Only one can ever be open at a time. */
let messageBox = {
    height: 0,
    width: 0,
    headerHeight: 0,
    footerHeight: 0
};
let messageBoxListeners = [];

const setPrimaryColor = (color) => {
    config.primaryColor = color;
    listeners.primaryColor.forEach(listener => listener(config.primaryColor));
}
const getPrimaryColor = (listener) => {
    listeners.primaryColor.push(listener);
    listener(config.primaryColor);
}

const setSecondaryColor = (color) => {
    config.secondaryColor = color;
    listeners.secondaryColor.forEach(listener => listener(config.secondaryColor));
}
const getSecondaryColor = (listener) => {
    listeners.secondaryColor.push(listener);
    listener(config.secondaryColor);
}

const setForegroundColor = (color) => {
    config.foregroundColor = color;
    listeners.foregroundColor.forEach(listener => listener(config.foregroundColor));
}
const getForegroundColor = (listener) => {
    listeners.foregroundColor.push(listener);
    listener(config.foregroundColor);
}

const setAppbarDefined = (value) => {
    config.appbarDefined = value;
    listeners.appbarDefined.forEach(listener => listener(config.appbarDefined));
}
const getAppbarDefined = (listener) => {
    listeners.appbarDefined.push(listener);
    listener(config.appbarDefined);
}

const setNavDrawerDefined = (value) => {
    config.navDrawerDefined = value;
    listeners.navDrawerDefined.forEach(listener => listener(config.navDrawerDefined));
}
const getNavDrawerDefined = (listener) => {
    listeners.navDrawerDefined.push(listener);
    listener(config.navDrawerDefined);
}

const setBottomNavDefined = (value) => {
    config.bottomNavDefined = value;
    listeners.bottomNavDefined.forEach(listener => listener(config.bottomNavDefined));
}
const getBottomNavDefined = (listener) => {
    listeners.bottomNavDefined.push(listener);
    listener(config.bottomNavDefined);
}

const setAppbarHeight = (value) => {
    config.appbarHeight = value;
    listeners.appbarHeight.forEach(listener => listener(config.appbarHeight));
}
const getAppbarHeight = (listener) => {
    listeners.appbarHeight.push(listener);
    listener(config.appbarHeight);
}

const setNavDrawerWidth = (value) => {
    config.navDrawerWidth = value;
    listeners.navDrawerWidth.forEach(listener => listener(config.navDrawerWidth));
}
const getNavDrawerWidth = (listener) => {
    listeners.navDrawerWidth.push(listener);
    listener(config.navDrawerWidth);
}

const setNavDrawerOpen = (value) => {
    config.navDrawerOpen = value;
    listeners.navDrawerOpen.forEach(listener => listener(config.navDrawerOpen));
}
const getNavDrawerOpen = (listener) => {
    listeners.navDrawerOpen.push(listener);
    listener(config.navDrawerOpen);
}

const setBottomNavHeight = (value) => {
    config.bottomNavHeight = value;
    listeners.bottomNavHeight.forEach(listener => listener(config.bottomNavHeight));
}
const getBottomNavHeight = (listener) => {
    listeners.bottomNavHeight.push(listener);
    listener(config.bottomNavHeight);
}

const clearConfigListener = (l) => {
    for (let [configName, ls] of Object.entries(listeners)) {
        if (ls.indexOf(l) !== -1) {
            listeners[configName].splice(listeners[configName].indexOf(l), 1)
            return;
        }
    }
}

const openMessageBox = (rect) => {
    Object.assign(messageBox, {
        height: rect.height,
        width: rect.width
    });
    messageBoxListeners.forEach(listener => listener(messageBox));
}
const getMessageBox = (listener) => {
    messageBoxListeners.push(listener);
    listener(messageBox);
}
const addMessageBoxHeader = (rect) => {
    Object.assign(messageBox, { headerHeight: rect.height });
    messageBoxListeners.forEach(listener => listener(messageBox));
}
const addMessageBoxFooter = (rect) => {
    Object.assign(messageBox, { footerHeight: rect.height });
    messageBoxListeners.forEach(listener => listener(messageBox));
}
const clearMessageBoxListener = (listener) => {
    if (messageBoxListeners.indexOf(listener) !== -1) { messageBoxListeners.splice(messageBoxListeners.indexOf(listener, 1)); }
}

export {
    setPrimaryColor,
    getPrimaryColor,
    setSecondaryColor,
    getSecondaryColor,
    setForegroundColor,
    getForegroundColor,
    setAppbarDefined,
    getAppbarDefined,
    setNavDrawerDefined,
    getNavDrawerDefined,
    setBottomNavDefined,
    getBottomNavDefined,
    setAppbarHeight,
    getAppbarHeight,
    setNavDrawerWidth,
    getNavDrawerWidth,
    setNavDrawerOpen,
    getNavDrawerOpen,
    setBottomNavHeight,
    getBottomNavHeight,
    clearConfigListener,
    openMessageBox,
    getMessageBox,
    clearMessageBoxListener,
    addMessageBoxHeader,
    addMessageBoxFooter,
}