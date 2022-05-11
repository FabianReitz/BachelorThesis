import { BatteryState } from 'expo-battery';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useBatteryState } from '@use-expo/battery';

// Battery indicator:
// Android: ✅
// iOS: ✅

export default function App() {
    // Using @use-expo/battery to get out-of-the-box battery hook.
    const [batteryState] = useBatteryState();

    return (
        <View style={styles.container}>
            <StatusBar hidden />
            {/* Battery indicator */}
            <Text>Battery:</Text>
            <Text>{states[batteryState] || ''}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

// Determin the state of the battery.
const states = {
    [BatteryState.UNKNOWN]: 'unkown',
    [BatteryState.UNPLUGGED]: 'unplugged',
    [BatteryState.CHARGING]: 'charging',
    [BatteryState.FULL]: 'full',
};
