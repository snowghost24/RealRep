import * as React from 'react';
import { FlatList } from 'react-native';
import { List, Divider, useTheme } from 'react-native-paper';
import { useSafeArea } from 'react-native-safe-area-context';
import type { StackNavigationProp } from '@react-navigation/stack';

import ActivityIndicatorExample from './src/Examples/ActivityIndicatorExample';
import AppbarExample from './src/Examples/AppbarExample';
import AvatarExample from './src/Examples/AvatarExample';
import BadgeExample from './src/Examples/BadgeExample';
import BannerExample from './src/Examples/BannerExample';
import BottomNavigationExample from './src/Examples/BottomNavigationExample';
import ButtonExample from './src/Examples/ButtonExample';
import CardExample from './src/Examples/CardExample';
import CheckboxExample from './src/Examples/CheckboxExample';
import CheckboxItemExample from './src/Examples/CheckboxItemExample';
import ChipExample from './src/Examples/ChipExample';
import DataTableExample from './src/Examples/DataTableExample';
import DialogExample from './src/Examples/DialogExample';
import DividerExample from './src/Examples/DividerExample';
import FABExample from './src/Examples/FABExample';
import IconButtonExample from './src/Examples/IconButtonExample';
import ListAccordionExample from './src/Examples/ListAccordionExample';
import ListAccordionExampleGroup from './src/Examples/ListAccordionGroupExample';
import ListSectionExample from './src/Examples/ListSectionExample';
import MenuExample from './src/Examples/MenuExample';
import ProgressBarExample from './src/Examples/ProgressBarExample';
import RadioButtonExample from './src/Examples/RadioButtonExample';
import RadioButtonGroupExample from './src/Examples/RadioButtonGroupExample';
import SearchbarExample from './src/Examples/SearchbarExample';
import SnackbarExample from './src/Examples/SnackbarExample';
import SurfaceExample from './src/Examples/SurfaceExample';
import SwitchExample from './src/Examples/SwitchExample';
import TextExample from './src/Examples/TextExample';
import TextInputExample from './src/Examples/TextInputExample';
import ToggleButtonExample from './src/Examples/ToggleButtonExample';
import TouchableRippleExample from './src/Examples/TouchableRippleExample';
import ThemeExample from './src/Examples/ThemeExample';
import RadioButtonItemExample from './src/Examples/RadioButtonItemExample';

export const examples = {
    activityIndicator: ActivityIndicatorExample,
    appbar: AppbarExample,
    avatar: AvatarExample,
    badge: BadgeExample,
    banner: BannerExample,
    bottomNavigation: BottomNavigationExample,
    button: ButtonExample,
    card: CardExample,
    checkbox: CheckboxExample,
    checkboxItem: CheckboxItemExample,
    chip: ChipExample,
    dataTable: DataTableExample,
    dialog: DialogExample,
    divider: DividerExample,
    fab: FABExample,
    iconButton: IconButtonExample,
    listAccordion: ListAccordionExample,
    listAccordionGroup: ListAccordionExampleGroup,
    listSection: ListSectionExample,
    menu: MenuExample,
    progressbar: ProgressBarExample,
    radio: RadioButtonExample,
    radioGroup: RadioButtonGroupExample,
    radioItem: RadioButtonItemExample,
    searchbar: SearchbarExample,
    snackbar: SnackbarExample,
    surface: SurfaceExample,
    switch: SwitchExample,
    text: TextExample,
    textInput: TextInputExample,
    toggleButton: ToggleButtonExample,
    touchableRipple: TouchableRippleExample,
    theme: ThemeExample,
};

const data = Object.keys(examples).map(
    (id): Item => ({ id, data: examples[id] })
);

export default function ExampleList({ navigation }: Props) {
    const renderItem = ({ item }: { item: Item }) => (
        <List.Item
            title={item.data.title}
            onPress={() => navigation.navigate(item.id)}
        />
    );

    const keyExtractor = (item: { id: string }) => item.id;

    const { colors } = useTheme();
    const safeArea = useSafeArea();

    return (
        <FlatList
            contentContainerStyle={{
                backgroundColor: colors.background,
                paddingBottom: safeArea.bottom,
                paddingLeft: safeArea.left,
                paddingRight: safeArea.right,
            }}
            style={{ backgroundColor: colors.background }}
            ItemSeparatorComponent={Divider}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            data={data}
        />
    );
}
