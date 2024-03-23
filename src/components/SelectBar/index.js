import React from 'react';
import { View, Text, Alert, useColorScheme, NativeModules } from 'react-native';
import { notifyInfo } from '../../utils';
import {color} from '../../constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const {YeterNative} = NativeModules;

const SelectBar = ({
  words,
  selectedWords,
  prepareData,
  setSelectMode,
  setSelectedWords,
}) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View
      style={{
        height: 54,
        borderWidth: 1,
        borderRadius: 4,
        marginVertical: 10,
        flexDirection: 'row',
        marginHorizontal: 10,
        paddingHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: isDarkMode
          ? color.dark.touchBackground
          : color.light.touchBackground,
        borderColor: isDarkMode
          ? color.dark.touchBorder
          : color.light.touchBorder,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '43%',
        }}>
        <Icon
          size={26}
          name="close"
          onPress={() => setSelectMode(false)}
          color={isDarkMode ? color.dark.textColor : color.light.textColor}
        />
        <Text
          style={{
            fontSize: 14,
            color: isDarkMode ? color.dark.textColor : color.light.textColor,
          }}>
          Selected Word {`${selectedWords.length}`}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '20%',
        }}>
        <Icon
          size={26}
          name={
            selectedWords.length !== words.length
              ? 'expand-all-outline'
              : 'collapse-all-outline'
          }
          onPress={() =>
            selectedWords.length !== words.length
              ? setSelectedWords(words)
              : setSelectedWords([])
          }
          color={isDarkMode ? color.dark.textColor : color.light.textColor}
        />
        <Icon
          size={26}
          name="delete-outline"
          onPress={() =>
            Alert.alert('Are you sure?', 'Selected words will be deleted', [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'Delete',
                style: 'destructive',
                onPress: async () => {
                  selectedWords.forEach(async word => {
                    await YeterNative.removeWord(word.title);
                  });
                  await YeterNative.getWords().then(data => {
                    prepareData(data);
                    setSelectMode(false);
                    setSelectedWords([]);
                  });
                  notifyInfo('Selected words deleted');
                },
              },
            ])
          }
          color={isDarkMode ? color.dark.textColor : color.light.textColor}
        />
      </View>
    </View>
  );
};

export default SelectBar;
