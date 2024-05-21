import React from 'react';
import {
  Keyboard,
  FlatList,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';
import { useTheme } from '@hooks';
import { AddButton } from 'elements';
import { Home } from 'pageContainers';
import { SelectBar, SearchBar, WordItem } from 'components';

const HomePage = ({
  words,
  addWord,
  selectMode,
  deleteWord,
  searchWord,
  prepareData,
  setSelectMode,
  setSearchWord,
  selectedWords,
  setSelectedWords,
}) => (
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
          searchWord.length > 0
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

export default Home(HomePage);
