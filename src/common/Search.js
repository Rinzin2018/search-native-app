import * as React from 'react';
import {Searchbar} from 'react-native-paper';
import {View} from 'react-native';

const SearchBar = (props) => {
  const {placeholder = 'Search', value, onChange, autoFocus = false} = props;

  return (
    <View
      style={{
        backgroundColor: '#101727',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Searchbar
        placeholder={placeholder}
        onChangeText={onChange}
        value={value}
        iconColor="#999ba3"
        autoFocus={autoFocus}
        placeholderTextColor="#b0aeae"
        inputStyle={{color: '#b0aeae', fontSize: 14}}
        style={{
          backgroundColor: '#263046',
          height: 40,
        }}
      />
    </View>
  );
};

export default SearchBar;
