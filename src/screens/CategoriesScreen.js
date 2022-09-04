import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Button,
  ScrollView,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as data from '../constants/data.json';

import {useTheme} from '../contexts/ThemeProvider';

const setLocalItem = async data => {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem('@storage_Key', jsonValue);
  } catch (error) {}
};

const getLocalItem = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@storage_Key');
    console.log('Anoop', jsonValue);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
    console.log(e);
  }
};

function CategoriesScreen(props) {
  const {theme, updateTheme} = useTheme();

  return (
    <ScrollView
      style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <View
        style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
        {/* <TouchableOpacity onPress={() => setLocalItem(data)}>
          <Text style={[{color: '#000'}, {color: theme.textColor}]}>
            Save file
          </Text>
        </TouchableOpacity> */}
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 10,
          }}>
          <TouchableOpacity
            onPress={() => getLocalItem(data)}
            style={styles.getStyle}>
            <Text style={[{color: '#000'}, {color: theme.textColor}]}>
              Get file
            </Text>
          </TouchableOpacity>
        </View>
        {/* <View>
          <Text style={[{color: '#000'}, {color: theme.textColor}]}>
            {JSON.stringify(data)}
          </Text>
        </View> */}
        <FlatList
          data={data}
          keyExtractor={({id}, index) => id}
          renderItem={({item}) => (
            <View style={{paddingBottom: 10}}>
              <Text style={{color: theme.textColor}}>{item.id}</Text>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  getStyle: {
    borderColor: '#000',
    borderWidth: 1,
    height: 30,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CategoriesScreen;