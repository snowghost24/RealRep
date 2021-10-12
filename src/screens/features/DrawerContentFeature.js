import * as React from 'react';
import { PreferencesContext } from '../../services/PreferencesContext';
import DrawerItems from './DrawerItems';

const DrawerContentFeature = ( props ) => (
    <PreferencesContext.Consumer>
        {( preferences ) => (
            <DrawerItems
                toggleTheme={ preferences.toggleTheme }
                toggleRTL={ preferences.toggleRtl }
                isRTL={ preferences.rtl }
                isDarkTheme={ preferences.theme.dark }
                { ...props }
            />
        )}
    </PreferencesContext.Consumer>
);

export default DrawerContentFeature;
