import React from 'react';
import style from './style';
import { useTheme } from '@hooks';
import { View, TextInput } from 'react-native';

const SearchBar = ({ searchWord, setSearchWord }) => (
  <View style={[style.container, { borderColor: useTheme('touchBorder') }]}>
    <TextInput
      autoFocus
      value={searchWord}
      onChangeText={setSearchWord}
      clearButtonMode="while-editing"
      autoCapitalize="none"
      placeholder="Search"
      autoCorrect={false}
      style={[
        style.textInput,
        {
          color: useTheme('textColor'),
          borderColor: useTheme('touchBorder'),
          backgroundColor: useTheme('touchBackground'),
        },
      ]}
    />
  </View>
);

export default SearchBar;
