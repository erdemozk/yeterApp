import { defaultList } from '_constants';
import React, { useState, useEffect } from 'react';
import { Alert, NativeModules } from 'react-native';
import { notifyInfo, notifyError, notifySuccess } from 'utils';

const { YeterNative } = NativeModules;

const Home = () => {
  const [words, setWords] = useState([]);
  const [searchWord, setSearchWord] = useState('');
  const [selectMode, setSelectMode] = useState(false);
  const [selectedWords, setSelectedWords] = useState([]);

  const prepareData = data => {
    const result = data.map((item, index) => {
      return {
        id: index,
        title: item,
      };
    });
    setWords(result);
  };

  const initialDefaultWords = async () => {
    await YeterNative.getWords().then(async data => {
      if (data.length === 0) {
        defaultList.forEach(async item => {
          await YeterNative.addWord(item);
        });
        await YeterNative.getWords().then(data => prepareData(data));
      } else {
        prepareData(data);
      }
    });
  };

  useEffect(() => {
    initialDefaultWords();
  }, []);

  const addWord = () =>
    Alert.prompt('Add Word', null, async text => {
      if (text && text.length > 0 && !words.some(word => word.title === text)) {
        try {
          const data = await YeterNative.addWord(text.toLowerCase());
          prepareData(data);
          notifySuccess(`${text.toLowerCase()} added`);
        } catch (error) {
          notifyError(null, error);
        }
      } else notifyInfo('Word already exists');
    });

  const deleteWord = item =>
    Alert.alert('Are you sure?', `Do you want to delete ${item.title} word?`, [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancelled'),
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await YeterNative.removeWord(item.title)
            .then(data => {
              prepareData(data);
              notifyInfo(`${item.title} deleted`);
            })
            .catch(e => notifyError(null, e));
        },
      },
    ]);

  return (
    _content &&
    _content({
      words,
      addWord,
      deleteWord,
      searchWord,
      selectMode,
      prepareData,
      setSearchWord,
      setSelectMode,
      selectedWords,
      setSelectedWords,
    })
  );
};

export default content => {
  _content = content;
  return Home;
};
