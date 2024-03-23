import React from 'react';
import {color} from '../../constants';
import {View, useColorScheme, TextInput} from 'react-native';

const SearchBar = ({searchWord, setSearchWord}) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
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
        clearButtonMode="while-editing"
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
};

export default SearchBar;
