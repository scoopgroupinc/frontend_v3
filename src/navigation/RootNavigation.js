// RootNavigation.js

import * as React from 'react';

export const navigationRef = React.createRef();

export function navigate(name, params) {
    navigationRef.current?.navigate(name, params);
}

// add other navigation functions that you need and export them

export const currentRouteName = () => {
    return navigationRef?.current?.getCurrentRoute()?.name
}