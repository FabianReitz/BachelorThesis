import 'package:flutter/material.dart';
import 'package:battery_plus/battery_plus.dart';
import 'dart:async';
import 'package:motion_sensors/motion_sensors.dart';
import 'package:vector_math/vector_math_64.dart' hide Colors;
import 'package:awesome_notifications/awesome_notifications.dart';

void main() async {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        debugShowCheckedModeBanner: false,
        home: Scaffold(
            body: Center(
                child: Container(
          width: 50000,
          decoration: BoxDecoration(
            border: Border.all(
              color: Colors.blue,
              width: 30,
            ),
          ),
          child: Padding(
            padding: const EdgeInsets.only(top: 100),
            child: Column(
              children: [
                Text(
                  'Battery: ',
                  style: TextStyle(fontSize: 25),
                ),
                MyHomePage() // Text("${getBatteryStatus()}")
              ],
            ),
          ),
        ))));
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({Key? key}) : super(key: key);

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  Vector3 _gyroscope = Vector3.zero();

  final Battery _battery = Battery();

  BatteryState? _batteryState;
  StreamSubscription<BatteryState>? _batteryStateSubscription;

  @override
  void initState() {
    super.initState();
    getBatteryState();
    motionSensors.gyroscope.listen((GyroscopeEvent event) {
      setState(() {
        _gyroscope.setValues(event.x, event.y, event.z);
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(
            'Battery State: $_batteryState',
            style: const TextStyle(fontSize: 18),
          ),
          Text('Gyroscope'),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: <Widget>[
              Text('${_gyroscope.x.toStringAsFixed(4)}'),
              Text('${_gyroscope.y.toStringAsFixed(4)}'),
              Text('${_gyroscope.z.toStringAsFixed(4)}'),
            ],
          ),
        ],
      ),
    );
  }

  @override
  void dispose() {
    super.dispose();
    if (_batteryStateSubscription != null) {
      _batteryStateSubscription!.cancel();
    }
  }

  void getBatteryState() {
    _batteryStateSubscription =
        _battery.onBatteryStateChanged.listen((BatteryState state) {
      setState(() {
        _batteryState = state;
      });
    });
  }
}
