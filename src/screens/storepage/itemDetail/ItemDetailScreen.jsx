import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as styles from './styles';
import {useEffect, useState} from 'react';
import {formatCommaNumber} from '../../../utils/CustomUtils';
import {useNavigation} from '@react-navigation/native';
import {getProductDetail} from '../../../api/storeApi';
import {useRoute} from '@react-navigation/native';
import OptionChoiceModal from '../../../components/ui/modal/OptionChoiceModal';
import GobackBlackGrid from '../../../components/grid/GobackBlackGrid';

export default function ItemDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const id = route.params;

  console.log('id', id);

  const [detailData, setData] = useState('');

  const getStoreProductDetail = async () => {
    try {
      const res = await getProductDetail(id);
      console.log('rdkfjlskdlkfjlskjflk', res);
      if (res) {
        console.log('res', res);
        setData(res);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    getStoreProductDetail();
  }, []);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [imageSize, setImageSize] = useState({width: 0, height: 0});
  const [detailImageSize, setDetailImageSize] = useState({width: 0, height: 0});

  const closeModal = () => {
    setModalVisible(false);
    // setSelectedItem(null);
  };

  const goBackScreens = () => {
    navigation.goBack();
  };
  const goToCartScreen = () => {
    navigation.navigate('ItemCart');
  };

  const goToBellScreen = () => {
    navigation.navigate('Bell');
  };

  return (
    <styles.Container>
      <styles.Header>
        <GobackBlackGrid onPress={goBackScreens}>상품 상세</GobackBlackGrid>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={goToCartScreen}>
            <Image
              style={{width: 24, height: 24}}
              // source={require('/src/assets/img/shopping-cart-1.png')}
              source={require('../../../assets/img/shopping-cart-1.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={goToBellScreen}>
            <Image
              style={{width: 24, height: 24, marginStart: 20}}
              source={require('../../../assets/img/bell-1.png')}
            />
          </TouchableOpacity>
          {/* )} */}
        </View>
      </styles.Header>
      <ScrollView
        style={{flex: 1}}
        bounces={false}
        // contentContainerStyle={{paddingBottom: 100}}
        showsVerticalScrollIndicator={false}>
        <OptionChoiceModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          item={detailData}
          closeModal={closeModal}
          // options={detailData?.options}
          // price={detailData?.salePrice}
          productId={id}
        />
        <styles.MainImageArea>
          <styles.CustomImage
            source={{uri: detailData?.mainImage}}
            style={{width: '100%', height: imageSize.height}}
            onLoad={event => {
              const {width, height} = event.nativeEvent;
              const screenWidth = Dimensions.get('window').width;
              const calculatedHeight = height * (screenWidth / width);
              setImageSize({width: screenWidth, height: calculatedHeight});
            }}
            resizeMode="stretch"
          />
        </styles.MainImageArea>

        {/* <styles.Container> */}
        <styles.Body>
          <styles.InfoText style={{color: '#707070', fontSize: 14}}>
            {detailData?.brand}
          </styles.InfoText>
          <styles.InfoText>{detailData?.name}</styles.InfoText>
          <styles.Line />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <styles.InfoTitleText>판매가</styles.InfoTitleText>
            <styles.InfoText style={{color: '#707070'}}>
              {formatCommaNumber(detailData?.price)}원
            </styles.InfoText>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <styles.InfoTitleText>할인가</styles.InfoTitleText>
            <View style={{flexDirection: 'row'}}>
              {!!detailData?.discountRate && (
                <styles.InfoText style={{color: '#FF7A00', marginRight: 12}}>
                  {detailData?.discountRate}%
                </styles.InfoText>
              )}
              <styles.InfoText>
                {formatCommaNumber(detailData?.salePrice)}원
              </styles.InfoText>
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <styles.InfoTitleText>적립 마일리지</styles.InfoTitleText>

            <styles.InfoText style={{color: '#707070'}}>
              {formatCommaNumber(detailData?.mileage)}원
            </styles.InfoText>
          </View>
          <styles.Line />
          <styles.ItemDetail>
            <TouchableOpacity>
              <Text style={{color: '#1F1F1F'}}>상품 상세</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ItemReview', detailData?.id);
              }}>
              <Text style={{color: '#B5B5B5'}}>리뷰</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ItemInquiry', {
                  type: 'PRODUCT',
                  id: detailData?.id,
                });
              }}>
              <Text style={{color: '#B5B5B5'}}>상품 문의</Text>
            </TouchableOpacity>
          </styles.ItemDetail>
          {detailData?.infoImage && (
            <styles.CustomImage
              resizeMode="cover"
              source={{uri: detailData?.infoImage}}
              style={{width: '100%', height: detailImageSize.height}}
              onLoad={event => {
                const {width, height} = event.nativeEvent;
                const screenWidth = Dimensions.get('window').width;
                const calculatedHeight = height * (screenWidth / width);
                setDetailImageSize({
                  width: screenWidth,
                  height: calculatedHeight,
                });
              }}
            />
          )}
        </styles.Body>
        {/* </styles.> */}
      </ScrollView>
      <styles.Bottom>
        <styles.Button
          onPress={() => {
            setModalVisible(true);
          }}>
          <styles.InfoText style={{color: 'white', fontSize: 14}}>
            구매하기
          </styles.InfoText>
        </styles.Button>
      </styles.Bottom>
    </styles.Container>
  );
}
