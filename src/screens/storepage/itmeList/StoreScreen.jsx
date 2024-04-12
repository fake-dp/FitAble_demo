import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import * as styles from './styles';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {getProductList} from '../../../api/storeApi';
import {useEffect, useState} from 'react';
import {formatCommaNumber} from '../../../utils/CustomUtils';
import {useRoute, useIsFocused} from '@react-navigation/native';

function StoreScreen(props) {
  const navigation = useNavigation();
  const [itemList, setItemList] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [isEndReached, setIsEndReached] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const windowHeight = Dimensions.get('window').height;
  const windowWidth = Dimensions.get('window').width;

  const route = useRoute();
  const isFocused = useIsFocused();

  const getStoreProductList = async () => {
    try {
      setIsLoading(true);
      const res = await getProductList(currentPage);
      console.log('res123123', res);
      if (res) {
        setItemList(prevData => [...prevData, ...res.content]);
        setCurrentPage(prevPage => prevPage + 1);
      }
      if (res.content.length === 0) {
        setIsEndReached(true);
      }
    } catch (error) {
      console.log('error', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getStoreProductList();
  }, [isFocused]);

  const scrollData = () => {
    console.log('isEndReached', isEndReached);
    if (!isLoading && !isEndReached) {
      getStoreProductList();
    }
  };

  // const onRefresh = () => {
  //   console.log('loading?');
  //   if (!isLoading) {
  //     // setCurrentPage(0);
  //     getStoreProductList();
  //   }
  // };

  const renderItem = ({item, index}) => {
    const isLastItem = index === itemList.length - 1;
    return (
      <styles.Data
        key={item.id}
        onPress={() => {
          navigation.navigate('DetailItem', item.id);
        }}
        isLastItem={isLastItem}>
          <styles.DataInnercontainer>
        <styles.ItemImage
          // source={require('../../../assets/img/pricetestproduct.png')}
          source={{uri: item?.mainImage}}
        />

        <View style={{padding: 10}}>
          <styles.TitleText style={{fontSize: 14, color: '#707070'}}>
            {item.brand}
          </styles.TitleText>
          <View>
            <styles.TitleText>{item.name}</styles.TitleText>
          </View>

          {item.isDiscount && (
            <styles.TitleText
              style={{
                fontSize: 12,
                textDecorationLine: 'line-through',

                color: '#b5b5b5',
              }}>
              {formatCommaNumber(item.price)}원
            </styles.TitleText>
          )}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            {!!item.discountRate && (
              <styles.TitleText
                style={{
                  fontSize: 14,
                  fontWeight: 700,

                  color: '#FF7A00',
                  marginRight: 10,
                }}>
                {item.discountRate}%
              </styles.TitleText>
            )}
            <styles.TitleText>
              {formatCommaNumber(item.salePrice)}원
            </styles.TitleText>
          </View>
        </View>
        </styles.DataInnercontainer>
      </styles.Data>
    );
  };
  return (
    <styles.Container>
      <SafeAreaView
        style={{
          height: windowHeight,
        }}>
        <FlatList
          data={itemList}
          bounces={false}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          // extraData={selectedId}
          onEndReached={() => {
            // console.log('바닥');
            scrollData();
          }}
          numColumns={2}
          onEndReachedThreshold={1}
          ListFooterComponent={
            isLoading && (
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Text>loading...</Text>
              </View>
            )
          }
          // refreshing={isLoading}
          // onScroll={onRefresh}
        />
      </SafeAreaView>
    </styles.Container>
  );
}

export default StoreScreen;
