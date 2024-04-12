import {Image, Linking, Text, TouchableOpacity, View} from 'react-native';
import * as styles from './styles';
import {useEffect, useState} from 'react';
import {
  changeStatus,
  formatCommaNumber,
  formatDate,
  formatPhoneNumber,
} from '../../../utils/CustomUtils';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {getOrderItemData} from '../../../api/storeApi';

import {useRoute} from '@react-navigation/native';
import OptionChoiceModal from '../../../components/ui/modal/OptionChoiceModal';
import GobackBlackGrid from '../../../components/grid/GobackBlackGrid';

export default function OrderItemDetailScreen(props) {
  const navigation = useNavigation();
  // const route = useRoute();
  const id = props.route.params;
  const [detailData, setData] = useState({});
  const isFocused = useIsFocused();

  useEffect(() => {
    getBuyDetailInfo();
  }, [isFocused]);

  const getBuyDetailInfo = async () => {
    try {
      const res = await getOrderItemData(id);
      if (res) {
        console.log('lfskjdflkj ljflskjdlkjslkjflksjldkjflskjf', res);
        setData(res);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  console.log('detailData', detailData.products);

  const handlePress = url => {
    const formattedUrl =
      url.startsWith('http://') || url.startsWith('https://')
        ? url
        : `http://${url}`;
    Linking.openURL(formattedUrl).catch(err =>
      console.error('An error occurred', err),
    );
  };

  const goBackScreens = () => {
    navigation.goBack();
  };

  return (
    <styles.Container>
      <styles.Header>
        <GobackBlackGrid onPress={goBackScreens}>
          주문상품 상세내역
        </GobackBlackGrid>
      </styles.Header>
      <styles.Body>
        <styles.InfoTitleText
          style={{fontWeight: 600, marginTop: 20, marginBottom: 0}}>
          주문번호 {detailData?.code}
        </styles.InfoTitleText>
        <styles.Line />
        <styles.InfoTitleText>
          {formatDate(String(detailData.createAt))}
        </styles.InfoTitleText>
        <styles.InfoText style={{color: '#1f1f1f', marginTop: 10}}>
          {changeStatus(detailData?.status)}
        </styles.InfoText>
        <View style={{flexDirection: 'row', marginVertical: 25}}>
          <styles.InfoText style={{fontWeight: 400}}>
            {detailData?.deliveryNote?.company ?? null}
            {'  '}
          </styles.InfoText>
          {detailData?.deliveryNote?.path ? (
            <TouchableOpacity
              onPress={() => {
                // Linking.openURL(`http://${detailData?.deliveryNote?.path}`);
                // Linking.openURL(`${detailData?.deliveryNote?.path}`);
                handlePress(detailData?.deliveryNote?.path);
              }}>
              <styles.InfoText
                style={{color: '#3693FF', textDecorationLine: 'underline'}}>
                {detailData?.deliveryNote?.number}
              </styles.InfoText>
            </TouchableOpacity>
          ) : (
            <styles.InfoText>
              {detailData?.deliveryNote?.number}
            </styles.InfoText>
          )}
        </View>
        {detailData?.products?.map((item, index) => (
          <View style={{flexDirection: 'row', marginBottom: 20}} key={index}>
            <View>
              {item.product.mainImage ? (
                <styles.CustomImage source={{uri: item.product.mainImage}} />
              ) : (
                <styles.CustomImage
                  source={require('../../../assets/img/noimage.png')}
                />
              )}

              {/* <styles.CustomImage
                source={require('../../../assets/img/bell-1.png')}
              /> */}
            </View>
            <View>
              <styles.InfoText style={{fontSize: 12, marginBottom: 4}}>
                {item.product.brand}
              </styles.InfoText>
              <styles.NameArea>
                <Text>{item.product.name}</Text>
              </styles.NameArea>
              <View style={{flexDirection: 'row', marginVertical: 6}}>
                <styles.InfoText style={{fontWeight: 400}}>
                  {item.option.name} |{' '}
                </styles.InfoText>
                <styles.InfoText style={{fontWeight: 400}}>
                  수량 {item.quantity}개
                </styles.InfoText>
              </View>
              <Text>{formatCommaNumber(item.product.salePrice)}원</Text>
              {item.isReviewWritable && (
                <styles.Button
                  onPress={() => {
                    navigation.navigate('ProductReview', item);
                  }}>
                  <styles.ButtonText>리뷰 작성</styles.ButtonText>
                </styles.Button>
              )}
            </View>
          </View>
        ))}
        <styles.Line />

        <View>
          <styles.InfoTitleText>배송지 정보</styles.InfoTitleText>
          <styles.InfoView>
            <styles.InfoText>받는이</styles.InfoText>
            <styles.InfoText>{detailData?.delivery?.name}</styles.InfoText>
          </styles.InfoView>
          <styles.InfoView>
            <styles.InfoText>휴대폰번호</styles.InfoText>
            <styles.InfoText>
              {formatPhoneNumber(detailData?.delivery?.phone || '')}

              {/* {formatPhoneNumber(detailData?.delivery?.phone)} */}
            </styles.InfoText>
          </styles.InfoView>
          <styles.InfoView>
            <styles.InfoText>우편번호</styles.InfoText>
            <styles.InfoText>{detailData?.delivery?.zipCode}</styles.InfoText>
          </styles.InfoView>
          <styles.InfoView>
            <styles.InfoText>주소</styles.InfoText>
            <styles.InfoText>{detailData?.delivery?.address}</styles.InfoText>
          </styles.InfoView>
          <styles.InfoView>
            <styles.InfoText style={{paddingRight: 10}}>
              상세주소
            </styles.InfoText>
            <styles.InfoText style={{textAlign: 'right', width: 250}}>
              {detailData?.delivery?.addressDetail}
            </styles.InfoText>
          </styles.InfoView>
          <styles.Line />

          <View>
            <styles.InfoTitleText>결제 금액</styles.InfoTitleText>
            <styles.InfoView>
              <styles.InfoText>주문상품 금액</styles.InfoText>
              <styles.InfoText>
                {formatCommaNumber(detailData?.payment?.orderPrice)}원
              </styles.InfoText>
            </styles.InfoView>
            <styles.InfoView>
              <styles.InfoText>마일리지</styles.InfoText>
              <styles.InfoText>
                {formatCommaNumber(detailData?.payment?.mileage)}원
              </styles.InfoText>
            </styles.InfoView>
            <styles.InfoView>
              <styles.InfoText>배송비</styles.InfoText>
              <styles.InfoText>
                {formatCommaNumber(detailData?.payment?.shippingFee)}원
              </styles.InfoText>
            </styles.InfoView>
            <styles.InfoView>
              <Text>결제수단</Text>
              <View style={{flexDirection: 'row'}}>
                <styles.InfoText>
                  {detailData?.payment?.card.name}
                </styles.InfoText>
                <styles.InfoText>
                  ({detailData?.payment?.card.number})
                </styles.InfoText>
              </View>
            </styles.InfoView>
          </View>
          <styles.InfoView style={{marginTop: 26}}>
            <styles.InfoTitleText>총 결제 금액</styles.InfoTitleText>
            <styles.InfoTitleText>
              {formatCommaNumber(detailData?.payment?.paymentPrice)}원
            </styles.InfoTitleText>
          </styles.InfoView>
          <styles.Line />

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ItemInquiry', {
                type: 'ORDER',
                id: detailData?.id,
              });
            }}>
            <Text style={{textDecorationLine: 'underline'}}>
              주문취소/교환/반품 문의
            </Text>
          </TouchableOpacity>
        </View>
      </styles.Body>
    </styles.Container>
  );
}
