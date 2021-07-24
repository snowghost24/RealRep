import * as React from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { Appbar, FAB, Switch, Paragraph } from 'react-native-paper';
import ScreenWrapper from '../ScreenWrapper';

type Props = {
  navigation: StackNavigationProp<{}>;
};

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

const AppbarExample = ({ navigation }: Props) => {
  const [showLeftIcon, setShowLeftIcon] = React.useState(true);
  const [showSubtitle, setShowSubtitle] = React.useState(true);
  const [showSearchIcon, setShowSearchIcon] = React.useState(true);
  const [showMoreIcon, setShowMoreIcon] = React.useState(true);
  const [showCustomColor, setShowCustomColor] = React.useState(false);
  const [showExactTheme, setShowExactTheme] = React.useState(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <Appbar.Header
          style={showCustomColor ? { backgroundColor: '#ffff00' } : null}
          theme={{
            mode: showExactTheme ? 'exact' : 'adaptive',
          }}
        >
          {showLeftIcon && (
            <Appbar.BackAction onPress={() => navigation.goBack()} />
          )}
          <Appbar.Content
            title="Title"
            subtitle={showSubtitle ? 'Subtitle' : null}
          />
          {showSearchIcon && (
            <Appbar.Action icon="magnify" onPress={() => {}} />
          )}
          {showMoreIcon && (
            <Appbar.Action icon={MORE_ICON} onPress={() => {}} />
          )}
        </Appbar.Header>
      ),
    });
  }, [
    navigation,
    showLeftIcon,
    showSubtitle,
    showSearchIcon,
    showMoreIcon,
    showCustomColor,
    showExactTheme,
  ]);

  return (
    <>
      <ScreenWrapper
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.row}>
          <Paragraph>Left icon</Paragraph>
          <Switch value={showLeftIcon} onValueChange={setShowLeftIcon} />
        </View>
        <View style={styles.row}>
          <Paragraph>Subtitle</Paragraph>
          <Switch value={showSubtitle} onValueChange={setShowSubtitle} />
        </View>
        <View style={styles.row}>
          <Paragraph>Search icon</Paragraph>
          <Switch value={showSearchIcon} onValueChange={setShowSearchIcon} />
        </View>
        <View style={styles.row}>
          <Paragraph>More icon</Paragraph>
          <Switch value={showMoreIcon} onValueChange={setShowMoreIcon} />
        </View>
        <View style={styles.row}>
          <Paragraph>Custom Color</Paragraph>
          <Switch value={showCustomColor} onValueChange={setShowCustomColor} />
        </View>
        <View style={styles.row}>
          <Paragraph>Exact Dark Theme</Paragraph>
          <Switch value={showExactTheme} onValueChange={setShowExactTheme} />
        </View>
      </ScreenWrapper>
      <Appbar
        style={styles.bottom}
        theme={{ mode: showExactTheme ? 'exact' : 'adaptive' }}
      >
        <Appbar.Action icon="archive" onPress={() => {}} />
        <Appbar.Action icon="email" onPress={() => {}} />
        <Appbar.Action icon="label" onPress={() => {}} />
        <Appbar.Action icon="delete" onPress={() => {}} />
      </Appbar>
      <FAB icon="reply" onPress={() => {}} style={styles.fab} />
    </>
  );
};

AppbarExample.title = 'Appbar';

export default AppbarExample;

const styles = StyleSheet.create({
  container: {
    marginBottom: 56,
  },
  contentContainer: {
    paddingVertical: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 28,
  },
});
