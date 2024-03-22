import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Alert,
  Keyboard,
  FlatList,
  StatusBar,
  TextInput,
  SafeAreaView,
  NativeModules,
  useColorScheme,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import color from '../../constants/color';
import defaultList from '../../constants/defaultList';
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

  const IconButton = ({icon, color, size, onPress}) => (
    <TouchableOpacity
      onPress={onPress}
      style={{padding: 5, width: 50, height: 50}}>
      <Icon name={icon} size={size} color={color} />
    </TouchableOpacity>
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

  const SelectBar = () => (
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

  const SearchBar = () => (
    <View
      style={{
        flexDirection: 'row',
        borderBottomWidth: 1,
        marginHorizontal: 10,
        justifyContent: 'flex-end',
        borderColor: isDarkMode
          ? color.dark.touchBorder
          : color.light.touchBorder,
      }}>
      <TextInput
        autoFocus
        value={searchWord}
        onChangeText={setSearchWord}
        autoCapitalize="none"
        placeholder="Search"
        autoCorrect={false}
        style={{
          height: 54,
          fontSize: 14,
          width: '100%',
          borderWidth: 1,
          borderRadius: 4,
          marginVertical: 10,
          paddingHorizontal: 10,
          borderColor: isDarkMode
            ? color.dark.touchBorder
            : color.light.touchBorder,
          backgroundColor: isDarkMode
            ? color.dark.touchBackground
            : color.light.touchBackground,
          color: isDarkMode ? color.dark.textColor : color.light.textColor,
        }}
      />
    </View>
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: isDarkMode ? 'black' : 'white',
        }}>
        {selectMode ? <SelectBar /> : <SearchBar />}
        <FlatList
          style={{flex: 1}}
          contentContainerStyle={{paddingVertical: 10}}
          data={
            searchWord.length > 0
              ? words.filter(word => word.title.includes(searchWord))
              : words
          }
          renderItem={({item, index}) => <Item item={item} index={index} />}
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
                !words.filter(word => word.title === text).length
              ) {
                await YeterNative.addWord(text.toLowerCase())
                  .then(data => {
                    prepareData(data);
                    notifySuccess(`${text.toLowerCase()} added`);
                  })
                  .catch(e => notifyError(null, e));
              } else notifyInfo('Word already exists');
            });
          }}>
          <Icon name="plus" size={32} color="#FFFFFF"/>
        </TouchableOpacity>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Home;
