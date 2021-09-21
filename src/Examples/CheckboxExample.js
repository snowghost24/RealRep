import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Paragraph,
  Checkbox,
  Colors,
  TouchableRipple,
} from 'react-native-paper';
import ScreenWrapper from '../components/ScreenWrappers/ScreenWrapper';

const CheckboxExample = () => {
  const [checkedNormal, setCheckedNormal] = React.useState(true);
  const [checkedCustom, setCheckedCustom] = React.useState(true);
  const [indeterminate, setIndeterminate] = React.useState(true);

  return (
    <ScreenWrapper style={styles.container}>
      <TouchableRipple onPress={() => setCheckedNormal(!checkedNormal)}>
        <View style={styles.row}>
          <Paragraph>Normal</Paragraph>
          <View pointerEvents="none">
            <Checkbox status={checkedNormal ? 'checked' : 'unchecked'} />
          </View>
        </View>
      </TouchableRipple>

      <TouchableRipple onPress={() => setCheckedCustom(!checkedCustom)}>
        <View style={styles.row}>
          <Paragraph>Custom</Paragraph>
          <View pointerEvents="none">
            <Checkbox
              color={Colors.blue500}
              status={checkedCustom ? 'checked' : 'unchecked'}
            />
          </View>
        </View>
      </TouchableRipple>

      <TouchableRipple onPress={() => setIndeterminate(!indeterminate)}>
        <View style={styles.row}>
          <Paragraph>Indeterminate</Paragraph>
          <View pointerEvents="none">
            <Checkbox status={indeterminate ? 'indeterminate' : 'unchecked'} />
          </View>
        </View>
      </TouchableRipple>

      <View style={styles.row}>
        <Paragraph>Checked (Disabled)</Paragraph>
        <Checkbox status="checked" disabled />
      </View>
      <View style={styles.row}>
        <Paragraph>Unchecked (Disabled)</Paragraph>
        <Checkbox status="unchecked" disabled />
      </View>
      <View style={styles.row}>
        <Paragraph>Indeterminate (Disabled)</Paragraph>
        <Checkbox status="indeterminate" disabled />
      </View>
    </ScreenWrapper>
  );
};

CheckboxExample.title = 'Checkbox';

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
});

export default CheckboxExample;
