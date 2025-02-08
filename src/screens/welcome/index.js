import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useTheme } from '@hooks';
import { WELCOME_SHOWN_KEY } from '_constants';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const WelcomePage = () => {
  const navigation = useNavigation();
  const theme = useTheme();

  const onGetStarted = async () => {
    try {
      await AsyncStorage.setItem(WELCOME_SHOWN_KEY, 'true');
      navigation.navigate('Home');
    } catch (e) {}
  };

  const renderItem = ({ item }) => (
    <View style={styles.content}>
      <Image source={item.image} style={styles.image} resizeMode="contain" />
      <Text
        style={{
          marginTop: 10,
          fontWeight: '500',
          color: theme ? 'white' : 'black',
        }}
        adjustsFontSizeToFit>
        {item.desc}
      </Text>
    </View>
  );

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme ? '#161A1D' : '#fff' }}>
      <View style={styles.container}>
        <View>
          <FlatList
            horizontal
            data={[
              {
                image: require('../../assets/image1.png'),
                desc: '• On your iPhone, go to the Settings app and scroll down.\n• Tap on Messages to open its settings.',
              },
              {
                image: require('../../assets/image2.png'),
                desc: '• Within the Messages settings, locate and tap on Unknown & Spam (found under “Message Filtering”).',
              },
              {
                image: require('../../assets/image3.png'),
                desc: '• Toggle on the Filter Unknown Senders switch if it’s not already enabled.\n• In the SMS Filtering section just below, select Yeter as the filtering app.',
              },
            ]}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 34, paddingHorizontal: 20 }}
            keyExtractor={(_, index) => index.toString()}
            pagingEnabled
            renderItem={renderItem}
          />
          <TouchableOpacity style={styles.button} onPress={onGetStarted}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
    width: width * 0.8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: width * 0.8,
    height: height * 0.7,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 12,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default WelcomePage;
