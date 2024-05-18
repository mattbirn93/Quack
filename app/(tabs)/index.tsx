import { Image, StyleSheet, Platform, View , Text} from 'react-native';

import { HelloWave } from '../../frontend/src/components/HelloWave';
import ParallaxScrollView from '../../frontend/src/components/ParallaxScrollView';
import { ThemedText } from '../../frontend/src/components/ThemedText';
import { ThemedView } from '../../frontend/src/components/ThemedView';

export default function HomeScreen() {
  console.log("Hello Turkey")
  return (
    <View style={styles.container}>
      <Text>Hello From the Main Screen Index.tsx file!!!</Text>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EE82EE',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
