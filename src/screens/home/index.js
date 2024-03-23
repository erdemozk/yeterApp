import React, {useState, useEffect} from 'react';
import {
  Text,
  Alert,
  Keyboard,
  FlatList,
  SafeAreaView,
  NativeModules,
  useColorScheme,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {color, defaultList} from '../../constants';
import {SelectBar, SearchBar} from '../../components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {notifyInfo, notifyError, notifySuccess} from '../../utils';

const {YeterNative} = NativeModules;

const Home = () => {
  const isDarkMode = useColorScheme() === 'dark';
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

  const TextItem = ({item}) => (
    <Text
      style={{
        color: isDarkMode
          ? selectMode && selectedWords.indexOf(item) !== -1
            ? color.dark.selectedColor
            : color.dark.textColor
          : selectMode && selectedWords.indexOf(item) !== -1
          ? color.light.selectedColor
          : color.light.textColor,
      }}>
      {item.title}
    </Text>
  );

  const Item = ({item}) => {
    return (
      <TouchableOpacity
        onLongPress={() => {
          if (selectMode) return;
          setSelectMode(true);
          setSelectedWords([item]);
        }}
        onPress={() => {
          if (selectMode) {
            if (selectedWords.filter(word => word.id === item.id).length) {
              const newSelectedWords = selectedWords.filter(
                word => word.id !== item.id,
              );
              setSelectedWords(newSelectedWords);
            } else {
              const newSelectedWords = [...selectedWords, item];
              setSelectedWords(newSelectedWords);
            }
          } else
            Alert.alert(
              'Are you sure?',
              `Do you want to delete ${item.title} word?`,
              [
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
              ],
            );
        }}
        style={{
          justifyContent: 'center',
          borderColor: isDarkMode
            ? selectMode && selectedWords.indexOf(item) !== -1
              ? color.dark.selectedColor
              : color.dark.touchBorder
            : selectMode && selectedWords.indexOf(item) !== -1
            ? color.light.selectedColor
            : color.light.touchBorder,
          backgroundColor: isDarkMode
            ? color.dark.touchBackground
            : color.light.touchBackground,
          borderWidth: 1,
          padding: 15,
          marginHorizontal: 10,
          marginVertical: 5,
          borderRadius: 4,
        }}>
        <TextItem item={item} />
      </TouchableOpacity>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: isDarkMode ? 'black' : 'white',
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
          style={{flex: 1}}
          contentContainerStyle={{paddingVertical: 10}}
          data={
            searchWord.length > 0
              ? words.filter(word => word.title.includes(searchWord))
              : words
          }
          renderItem={({item, index}) => <Item item={item} index={index} />}
          onScrollBeginDrag={Keyboard.dismiss}
        />
        <TouchableOpacity
          style={{
            right: 20,
            width: 60,
            height: 60,
            bottom: 50,
            borderWidth: 1,
            borderRadius: 30,
            paddingVertical: 6,
            position: 'absolute',
            alignItems: 'center',
            borderColor: '#DCE2FC',
            justifyContent: 'center',
            backgroundColor: '#3A76F0',
          }}
          onPress={() => {
            Alert.prompt('Add Word', null, async text => {
              if (
                text &&
                text.length > 0 &&
                !words.some(word => word.title === text)
              ) {
                try {
                  const data = await YeterNative.addWord(text.toLowerCase());
                  prepareData(data);
                  notifySuccess(`${text.toLowerCase()} added`);
                } catch (error) {
                  notifyError(null, error);
                }
              } else notifyInfo('Word already exists');
            });
          }}>
          <Icon name="plus" size={32} color="#FFFFFF" />
        </TouchableOpacity>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Home;
