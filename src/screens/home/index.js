import React, { useState, useEffect } from 'react';
import {
  Alert,
  Keyboard,
  FlatList,
  SafeAreaView,
  NativeModules,
  TouchableWithoutFeedback,
} from 'react-native';
import { useTheme } from '@hooks';
import { AddButton } from 'elements';
import { defaultList } from '_constants';
import { SelectBar, SearchBar, WordItem } from 'components';
import { notifyInfo, notifyError, notifySuccess } from 'utils';

const { YeterNative } = NativeModules;

const HomePage = () => {
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: useTheme('background'),
        }}>
        {selectMode ? (
          <SelectBar
            words={words}
            prepareData={prepareData}
            setSelectMode={setSelectMode}
            selectedWords={selectedWords}
            setSelectedWords={setSelectedWords}
          />
        ) : (
          <SearchBar searchWord={searchWord} setSearchWord={setSearchWord} />
        )}
        <FlatList
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingVertical: 10 }}
          data={
            searchWord?.length > 0
              ? words.filter(word => word.title.includes(searchWord))
              : words
          }
          renderItem={({ item }) => (
            <WordItem
              item={item}
              deleteWord={deleteWord}
              selectMode={selectMode}
              setSelectMode={setSelectMode}
              selectedWords={selectedWords}
              setSelectedWords={setSelectedWords}
            />
          )}
          onScrollBeginDrag={Keyboard.dismiss}
        />
        <AddButton onPress={addWord} />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default HomePage;
