import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import images from 'res/images';
import colors from 'res/colors';
import MessageListItem from './MessageListItem';
import SearchBar from './SearchBar';
import I18n from 'library/utils/I18n';
import { Provider, connect } from 'react-redux';
import { fetchMessages, fetchArticleDetails } from "actions";

const DmScreen = (props) => {
  useEffect(() => props.fetchMessages(), []);

  renderMessages = ({ item }) => {
    return <MessageListItem item={item}/>
  }
  return (
    <FlatList
      style={styles.container}
      ListHeaderComponent={() =>
        <React.Fragment>
          <SearchBar />
          <Text style={styles.header}>{I18n.t('home.dm.bodyTitle')}</Text>
        </React.Fragment>
      }
      data={props.data.messages}
      renderItem={this.renderMessages}
    />
  );
};


DmScreen.navigationOptions = ({ navigation }) => ({
  headerStyle: {
    backgroundColor: colors.tabBackground,
  },
  headerTintColor: colors.text,
  headerTitleStyle: {
    fontFamily: Platform.OS === 'ios' ? 'Futura' : 'Roboto',
  },
  headerLeft: () => (
    <View style={styles.headerLeftContainer}>
      <TouchableOpacity style={styles.headerLeftBackButton} onPress={() => navigation.goBack(null)}>
        <Image style={styles.headerLeftBackButtonImage} source={images.back} />
        <Text style={styles.headerLeftBackButtonText}>{I18n.t('home.dm.appBarTitle')}</Text>
      </TouchableOpacity>
    </View>
  ),
  headerRight: () => (
    <View style={styles.headerRightContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('Info')}>
        <Image style={styles.headerRightCamera} source={images.video_camera} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Info')}>
        <Image style={styles.headerRightDm} source={images.write} />
      </TouchableOpacity>
    </View>
  ),
});

const styles = StyleSheet.create({
  container: { backgroundColor: colors.background, padding: 20 },
  header: { color: colors.text, fontSize: 16, fontWeight: 'bold', marginTop: 20 },
  headerLeftContainer: { marginLeft: 20, flex: 1, flexDirection: 'row', alignItems: 'center' },
  headerLeftBackButton: { flexDirection: 'row' },
  headerLeftBackButtonImage: { height: 25, width: 25 },
  headerLeftBackButtonText: { color: colors.text, marginLeft: 20, fontSize: 18 },
  headerRightContainer: { marginRight: 20, flex: 1, flexDirection: 'row', alignItems: 'flex-start' },
  headerRightCamera: { width: 25, height: 25, resizeMode: 'contain' },
  headerRightDm: { marginLeft: 20, paddingTop: 10, height: 23, width: 23, resizeMode: 'contain' },
});

const mapStateToProps = ({ data = {status: {message: ''}, messages: []}, isLoadingData = false }) => ({
  data,
  isLoadingData
});

export default connect(
  mapStateToProps,
  {
    fetchMessages
  }
)(DmScreen);
