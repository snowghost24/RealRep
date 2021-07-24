import * as React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Button, List, useTheme } from 'react-native-paper';
import ScreenWrapper from '../ScreenWrapper';

const ButtonExample = () => {
  const { colors } = useTheme();

  return (
    <ScreenWrapper>
      <List.Section title="Text button">
        <View style={styles.row}>
          <Button onPress={() => {}} style={styles.button}>
            Default
          </Button>
          <Button
            color={colors.accent}
            onPress={() => {}}
            style={styles.button}
          >
            Custom
          </Button>
          <Button disabled onPress={() => {}} style={styles.button}>
            Disabled
          </Button>
          <Button icon="camera" onPress={() => {}} style={styles.button}>
            Icon
          </Button>
          <Button loading onPress={() => {}} style={styles.button}>
            Loading
          </Button>
          <Button
            icon="camera"
            onPress={() => {}}
            style={styles.button}
            contentStyle={{ flexDirection: 'row-reverse' }}
          >
            Icon right
          </Button>
        </View>
      </List.Section>
      <List.Section title="Outlined button">
        <View style={styles.row}>
          <Button mode="outlined" onPress={() => {}} style={styles.button}>
            Default
          </Button>
          <Button
            mode="outlined"
            color={colors.accent}
            onPress={() => {}}
            style={styles.button}
          >
            Custom
          </Button>
          <Button
            mode="outlined"
            disabled
            onPress={() => {}}
            style={styles.button}
          >
            Disabled
          </Button>
          <Button
            mode="outlined"
            icon="camera"
            onPress={() => {}}
            style={styles.button}
          >
            Icon
          </Button>
          <Button
            mode="outlined"
            loading
            onPress={() => {}}
            style={styles.button}
          >
            Loading
          </Button>
          <Button
            icon="heart"
            mode="outlined"
            onPress={() => {}}
            style={styles.button}
            labelStyle={{
              fontWeight: '800',
              fontSize: 24,
            }}
          >
            Custom Font
          </Button>
        </View>
      </List.Section>
      <List.Section title="Contained button">
        <View style={styles.row}>
          <Button mode="contained" onPress={() => {}} style={styles.button}>
            Default
          </Button>
          <Button
            mode="contained"
            color={colors.accent}
            onPress={() => {}}
            style={styles.button}
          >
            Custom
          </Button>
          <Button
            mode="contained"
            disabled
            onPress={() => {}}
            style={styles.button}
          >
            Disabled
          </Button>
          <Button
            mode="contained"
            icon="camera"
            onPress={() => {}}
            style={styles.button}
          >
            Icon
          </Button>
          <Button
            mode="contained"
            loading
            onPress={() => {}}
            style={styles.button}
          >
            Loading
          </Button>
        </View>
      </List.Section>
      <List.Section title="Custom icon">
        <View style={styles.row}>
          <Button
            mode="outlined"
            icon={{
              uri:
                'https://avatars0.githubusercontent.com/u/17571969?v=3&s=400',
            }}
            onPress={() => {}}
            style={styles.button}
          >
            Remote image
          </Button>
          <Button
            mode="outlined"
            icon={require('../../assets/images/favorite.png')}
            onPress={() => {}}
            style={styles.button}
          >
            Required asset
          </Button>
          <Button
            mode="outlined"
            icon={({ size }) => (
              <Image
                source={require('../../assets/images/chameleon.jpg')}
                style={{ width: size, height: size, borderRadius: size / 2 }}
              />
            )}
            onPress={() => {}}
            style={styles.button}
          >
            Custom component
          </Button>
        </View>
      </List.Section>
    </ScreenWrapper>
  );
};

ButtonExample.title = 'Button';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
  },
  button: {
    margin: 4,
  },
});

export default ButtonExample;
