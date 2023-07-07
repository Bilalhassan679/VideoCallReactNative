import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ContactList from '../../../assets/data/contacts.json';
import useContactScreen from './useContactScreen';

const ContactScreen = ({navigation}) => {
  const {} = useContactScreen(navigation);
  const [filtered, setFiltered] = useState(ContactList);
  const [changeText, onChangeText] = useState('');
  useEffect(() => {
    const searchList = ContactList.filter(item =>
      item.user_display_name.toLowerCase().includes(changeText.toLowerCase()),
    );
    setFiltered(searchList);
  }, [changeText]);

  //navigate CallUser
  const callUsers = user => {
    navigation.navigate('CallingScreen', {user});
  };

  return (
    <SafeAreaView>
      <View>
        <TextInput
          style={styles.searchText}
          placeholder="Search your name..."
          onChangeText={onChangeText}
          value={changeText}
        />
        <FlatList
          data={filtered}
          renderItem={({item}) => {
            return (
              <Pressable onPress={() => callUsers(item)} style={styles.contact}>
                <Text>{item.user_display_name}</Text>
              </Pressable>
            );
          }}
          ItemSeparatorComponent={() => <View style={styles.sperator} />}
        />
      </View>
    </SafeAreaView>
  );
};

export default ContactScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  searchText: {
    padding: 5,
    backgroundColor: '#deddd9',
    marginHorizontal: 10,
    margin: 10,
    borderRadius: 5,
  },
  contact: {
    padding: 10,
  },
  sperator: {
    borderColor: '#c9c8c3',
    borderWidth: StyleSheet.hairlineWidth,
  },
});
