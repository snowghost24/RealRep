import { PreferencesContext } from "../../services/PreferencesContext";
import DrawerItems from "./DrawerItems";
import * as React from "react";

const DrawerContentFeature = (props) => {
    return (
        <PreferencesContext.Consumer>
            {(preferences) => (
                <DrawerItems
                    {...props}
                    toggleTheme={preferences.toggleTheme}
                    toggleRTL={preferences.toggleRtl}
                    isRTL={preferences.rtl}
                    isDarkTheme={preferences.theme.dark}
                />
            )}
        </PreferencesContext.Consumer>)
};

export default DrawerContentFeature;
