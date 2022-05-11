import React, { useEffect, useState } from 'react';
import { BatteryState } from 'expo-battery';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Gyroscope } from 'expo-sensors';
import { StatusBar } from 'expo-status-bar';
import { useBatteryState } from '@use-expo/battery';

import { Notification } from './Notification';

// Battery indicator:
// Android: ✅
// iOS: ✅

// Gyroscope API:
// Android: ✅
// iOS: ✅

// Notification:
// - has to be logged in locally into expo account, otherwise a backend (e.g. firebase) is needed
// Android: ❌
// iOS: ✅

// Border
// Android: ✅
// iOS: ✅

export default function App() {
    // Using @use-expo/battery to get out-of-the-box battery hook.
    const [batteryState] = useBatteryState();

    // Using expo-sensors for gyroscope API.
    const [gyroscope, setGyroscope] = useState({
        x: 0,
        y: 0,
        z: 0,
    });

    const [subscription, setSubscription] = useState(null);

    const _subscribe = () => {
        setSubscription(
            Gyroscope.addListener((gyroscopeData) => {
                setGyroscope(gyroscopeData);
            })
        );
    };

    const _unsubscribe = () => {
        subscription && subscription.remove();
        setSubscription(null);
    };

    useEffect(() => {
        _subscribe();
        return () => _unsubscribe();
    }, []);

    const { x, y, z } = gyroscope;

    // Retuned Component
    return (
        <View style={styles.container}>
            <StatusBar hidden />
            {/* Battery indicator */}
            <Text>Battery:</Text>
            <Text style={{ marginBottom: 20 }}>
                {states[batteryState] || ''}
            </Text>
            {/* Gyroscope API */}
            <Text>Gyroscope:</Text>
            <Text style={{ marginBottom: 60 }}>
                x: {round(x)} y: {round(y)} z: {round(z)}
            </Text>
            {/* Push Notification Button */}
            <Notification />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderStyle: 'solid',
        borderWidth: 20,
        borderColor: 'blue',
    },
});

// Determin the state of the battery.
const states = {
    [BatteryState.UNKNOWN]: 'unkown',
    [BatteryState.UNPLUGGED]: 'unplugged',
    [BatteryState.CHARGING]: 'charging',
    [BatteryState.FULL]: 'full',
};

// Round a given number.
const round = (n) => {
    if (!n) return 0;
    return Math.floor(n * 100) / 100;
};
