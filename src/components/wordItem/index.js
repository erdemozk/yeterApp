import { Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@hooks';
import style from './style';

const WordItem = ({
  item,
  selectMode,
  deleteWord,
  selectedWords,
  setSelectMode,
  setSelectedWords,
}) => {
  const TextItem = ({ item }) => (
    <Text
      style={{
        color:
          selectMode && selectedWords.indexOf(item) !== -1
            ? useTheme('selectedColor')
            : useTheme('textColor'),
      }}>
      {item.title}
    </Text>
  );

  const handleOnLongPress = item => {
    if (selectMode) return;
    setSelectMode(true);
    setSelectedWords([item]);
  };

  const handleOnPress = () => {
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
    } else deleteWord(item);
  };

  return (
    <TouchableOpacity
      onLongPress={() => handleOnLongPress(item)}
      onPress={handleOnPress}
      style={[
        style.itemWrapper,
        {
          borderColor:
            selectMode && selectedWords.indexOf(item) !== -1
              ? useTheme('selectedColor')
              : useTheme('touchBorder'),
          backgroundColor: useTheme('touchBackground'),
        },
      ]}>
      <TextItem item={item} />
    </TouchableOpacity>
  );
};

export default WordItem;
