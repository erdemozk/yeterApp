import React from 'react';
import style from './style';
import { useTheme } from '@hooks';
import { notifyInfo } from 'utils';
import { View, Text, Alert, NativeModules } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { YeterNative } = NativeModules;

const SelectBar = ({
  words,
  prepareData,
  setSelectMode,
  selectedWords,
  setSelectedWords,
}) => {
  const handleDelete = async () =>
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
    ]);

  const handleExitSelectMode = () => setSelectMode(false);

  const handleSelectAllorNone = () => {
    if (selectedWords.length !== words.length) {
      return setSelectedWords(words);
    }
    return setSelectedWords([]);
  };

  return (
    <View
      style={[
        style.container,
        {
          backgroundColor: useTheme('touchBackground'),
          borderColor: useTheme('touchBorder'),
        },
      ]}>
      <View style={style.leftSideContainer}>
        <Icon
          size={26}
          name="close"
          onPress={handleExitSelectMode}
          color={useTheme('textColor')}
        />
        <Text
          style={{
            fontSize: 14,
            color: useTheme('textColor'),
          }}>
          Selected Word {`${selectedWords.length}`}
        </Text>
      </View>
      <View style={style.rightSideContainer}>
        <Icon
          size={26}
          name={
            selectedWords.length !== words.length
              ? 'expand-all-outline'
              : 'collapse-all-outline'
          }
          onPress={handleSelectAllorNone}
          color={useTheme('textColor')}
        />
        <Icon
          size={26}
          name="delete-outline"
          onPress={handleDelete}
          color={useTheme('textColor')}
        />
      </View>
    </View>
  );
};

export default SelectBar;
