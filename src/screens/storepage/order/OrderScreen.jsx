import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import {createRef, useRef} from 'react';
import * as styles from './styles';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {itemListData, buyerData} from '../../../store/atom';
import {getBuyerData} from '../../../api/storeApi';
import {useCallback, useEffect, useState} from 'react';
import {formatCommaNumber} from '../../../utils/CustomUtils';
import {useRecoilState} from 'recoil';
import {COLORS} from '../../../constants/color';
import GobackBlackGrid from '../../../components/grid/GobackBlackGrid';

export default function OrderAdressScreen(props) {
  const navigation = useNavigation();
  const inputRef = useRef(0);
  const [buyer, setBuyer] = useState('');
  const [price, setTotalPrice] = useState(0);
  const [mileage, setMileage] = useState(0);
  const [itemDataList, setItemDataList] = useRecoilState(itemListData);
  const [buyerAddressData, setBuyerAddressData] = useRecoilState(buyerData);
  const [allCheck, setAllCheck] = useState(false);

  const [isSelected, setSelection] = useState({});

  console.log('itemDataList', itemDataList);
  console.log('mileage', mileage);

  const getStoreBuyer = async () => {
    try {
      const res = await getBuyerData();
      console.log('buyer', res);
      if (res) {
        setBuyer(res);
        setBuyerAddressData(res.delivery);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  console.log('allCheck', allCheck);
  useEffect(() => {
    getStoreBuyer();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getStoreBuyer();
    }, []),
  );

  // 모든 목록 리스트 체크 여부 확인
  useEffect(() => {
    if (Object.keys(isSelected).length === 3) {
      const allChecked = Object.values(isSelected).every(value => value);
      setAllCheck(allChecked);
    }
  }, [isSelected]);

  // 개별 목록 리스트 체크 여부 확인
  const handleCheckboxChange = id => {
    setSelection(prevState => {
      const updatedSelection = {...prevState};
      updatedSelection[id] = !prevState[id];
      return updatedSelection;
    });
  };

  const onCheckLimit = value => {
    inputRef.current.clear();

    const parsedQty = Number.parseInt(value);
    if (Number.isNaN(parsedQty)) {
      setMileage('');
    } else if (buyer?.mileage === 0) {
      Alert.alert('사용가능한 마일리지가 없습니다');
      setMileage('');
    } else if (parsedQty > buyer?.mileage || parsedQty > price + 3400) {
      setMileage('');
      Alert.alert(
        '사용 가능한 마일리지보다 많이 입력되었습니다. \n 다시 입력해주세요.',
      );
      setMileage('');
    } else {
      setMileage(parsedQty);
    }
  };

  useEffect(() => {
    let totalPriceFromOptions = 0;

    for (let i = 0; i < itemDataList.length; i++) {
      let optionPrice =
        itemDataList[i].quantity * itemDataList[i].product.salePrice;
      console.log('1', optionPrice);

      totalPriceFromOptions += optionPrice;
    }

    setTotalPrice(totalPriceFromOptions);
  }, []);

  const goBackScreens = () => {
    navigation.goBack();
  };

  const formattedOptions = Object.values(itemDataList).map(option => ({
    cartId: option.cartId ?? null,
    optionId: option.id ?? null,
    quantity: option.quantity || 0, // 예시, 실제 데이터에 맞게 조정 필요
  }));

  const goPaymentScreens = () => {
    console.log('결제결제결제결제 바로결제결제');
    const paymentInfoData = {
      tid: '',
      // product: [{cartId: '', optionId: '', quantity: 0}],
      product: formattedOptions,

      mileage: mileage || 0,
      // ticket: {
      //   id: itemDataList.cartId,
      //   salePrice: 1800,
      // },
      // options: formattedOptions,
      // totalPrice: price + 3500,
      // authInfo: {
      //   authToken: '',
      //   amount: '',
      //   tid: '',
      // },
    };
    Object.keys(paymentInfoData).forEach(key => {
      if (paymentInfoData[key] === undefined || paymentInfoData[key] === null) {
        delete paymentInfoData[key];
      }
    });
    console.log('@@subPaymentInfoData', paymentInfoData);
    navigation.pop();
    navigation.navigate('StorePaymentWebView', {
      paymentInfoData,
      totalPrice: price + 3500 - mileage,
      goodsName: 'test 이용권2',
    });
    // postInfoPaymentId(paymentInfoData)
  };

  return (
    <styles.Container>
      <styles.Header>
        <GobackBlackGrid onPress={goBackScreens}>결제하기</GobackBlackGrid>
      </styles.Header>

      <styles.Body>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 16,
          }}>
          <Text style={{fontSize: 16, fontWeight: 600}}>구매 상품</Text>
        </View>

        {itemDataList &&
          itemDataList.map((data, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                // justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 20,
              }}>
              <Image
                source={{uri: data?.product.mainImage}}
                style={{
                  width: 120,
                  height: 120,
                  marginHorizontal: 12,
                  borderRadius: 15,
                }}
              />

              <styles.ItemInfo>
                <Text style={{color: '#1f1f1f', fontSize: 14}}>
                  {data.product.brand}
                </Text>
                <styles.ItemText
                  style={{color: '#1f1f1f', marginTop: 10, fontSize: 16}}>
                  {data.product.name}
                </styles.ItemText>
                <View style={{flexDirection: 'row', marginTop: 20}}>
                  <styles.ItemText>{data.option.name} | </styles.ItemText>

                  <styles.ItemText>{data.quantity}개</styles.ItemText>
                </View>
              </styles.ItemInfo>
            </View>
          ))}

        <styles.AddressInfo>
          <styles.Line />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 12,
            }}>
            <styles.TitleText>배송지</styles.TitleText>
            <styles.DeliveryAddressButton
              onPress={() => {
                navigation.navigate('DeliveryAddress');
              }}>
              <Text>변경하기</Text>
            </styles.DeliveryAddressButton>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View>
              <styles.PriceInfoText style={{marginBottom: 14}}>
                수령인
              </styles.PriceInfoText>
              <styles.PriceInfoText style={{marginBottom: 14}}>
                휴대폰번호
              </styles.PriceInfoText>
              <styles.PriceInfoText style={{marginBottom: 14}}>
                배송지
              </styles.PriceInfoText>
            </View>
            <View style={{marginLeft: 10}}>
              <styles.PriceInfo style={{marginBottom: 14}}>
                <styles.PriceInfoText>
                  {buyer?.delivery?.name ?? '-'}
                </styles.PriceInfoText>
              </styles.PriceInfo>
              <styles.PriceInfo style={{marginBottom: 14}}>
                <styles.PriceInfoText>
                  {buyer?.delivery?.phone ?? '-'}
                </styles.PriceInfoText>
              </styles.PriceInfo>
              <styles.PriceInfo
                style={{
                  marginBottom: 14,
                }}>
                <styles.PriceInfoText style={{paddingRight: 80}}>
                  {buyer?.delivery?.address ?? '-'}{' '}
                  {buyer?.delivery?.addressDetail ?? ''}
                </styles.PriceInfoText>
              </styles.PriceInfo>
            </View>
          </View>
        </styles.AddressInfo>
        <View>
          <styles.Line />
          <styles.PriceInfo>
            <styles.TitleText>마일리지</styles.TitleText>
          </styles.PriceInfo>
          <styles.MilageInputArea>
            <styles.MilageInput
              ref={inputRef}
              // placeholder="0"
              placeholderTextColor={COLORS.gray_300}
              value={mileage}
              onChangeText={onCheckLimit}
              // secureTextEntry={true}

              keyboardType="numeric"
              returnKeyType="done"
            />
            <Text style={{color: '#707070'}}>원</Text>
          </styles.MilageInputArea>
          <styles.PriceInfo style={{marginBottom: 14}}>
            <styles.PriceInfoText>사용 가능한 마일리지</styles.PriceInfoText>
            <styles.PriceInfoText>
              {formatCommaNumber(buyer?.mileage ?? 0)}원
            </styles.PriceInfoText>
          </styles.PriceInfo>
        </View>

        <View>
          <styles.Line />
          <styles.PriceInfo style={{marginBottom: 14}}>
            <styles.PriceInfoText>주문상품 금액</styles.PriceInfoText>
            <styles.PriceInfoText>
              {formatCommaNumber(price)}원
            </styles.PriceInfoText>
          </styles.PriceInfo>
          <styles.PriceInfo style={{marginBottom: 14}}>
            <styles.PriceInfoText>마일리지</styles.PriceInfoText>
            <styles.PriceInfoText>
              {mileage > 0 && '-'}
              {formatCommaNumber(mileage)}원
              {/* {formatCommaNumber(itemList.shippingPrice)}원 */}
            </styles.PriceInfoText>
          </styles.PriceInfo>
          <styles.PriceInfo style={{marginBottom: 14}}>
            <styles.PriceInfoText>배송비</styles.PriceInfoText>
            <styles.PriceInfoText>3,500원</styles.PriceInfoText>
          </styles.PriceInfo>
        </View>

        <styles.PriceInfo style={{marginBottom: 50, marginTop: 26}}>
          <styles.TitleText>총 결제 금액</styles.TitleText>
          <styles.PriceInfoText style={{color: '#1f1f1f', fontWeight: 600}}>
            {formatCommaNumber(price + 3500 - mileage)}원
          </styles.PriceInfoText>
        </styles.PriceInfo>

        <View style={{marginBottom: 20}}>
          <styles.AgreeTerms>
            {/* <styles.CheckBoxStyle /> */}
            <styles.CheckBoxStyle
              value={isSelected['개인정보']}
              onValueChange={() => handleCheckboxChange('개인정보')}
              // tintColors={{true: COLORS.main, false: COLORS.main}}
              onCheckColor={COLORS.main}
              // onFillColor={{true: COLORS.box, false: 'COLORS.gray_200'}}
              onFillColor={COLORS.box}
              onTintColor={COLORS.box}
              boxType={'square'}
              // tintColor={COLORS.main}
            />
            <Text>
              <Text style={{textDecorationLine: 'underline'}}>
                개인정보 제3자 제공동의
              </Text>
              에 동의합니다.
            </Text>
          </styles.AgreeTerms>
          <styles.AgreeTerms>
            <styles.CheckBoxStyle
              value={isSelected['환불']}
              onValueChange={() => handleCheckboxChange('환불')}
              // tintColors={{true: COLORS.main, false: COLORS.main}}
              onCheckColor={COLORS.main}
              // onFillColor={{true: COLORS.box, false: 'COLORS.gray_200'}}
              onFillColor={COLORS.box}
              onTintColor={COLORS.box}
              boxType={'square'}
              // tintColor={COLORS.main}
            />
            <Text>
              <Text style={{textDecorationLine: 'underline'}}>
                취소 및 환불 규정
              </Text>
              에 동의합니다.
            </Text>
          </styles.AgreeTerms>
          <styles.AgreeTerms>
            <styles.CheckBoxStyle
              value={isSelected['구매진행']}
              onValueChange={() => handleCheckboxChange('구매진행')}
              // tintColors={{true: COLORS.main, false: COLORS.main}}
              onCheckColor={COLORS.main}
              onFillColor={COLORS.box}
              onTintColor={COLORS.box}
              boxType={'square'}
              // tintColor={COLORS.main}
            />
            <Text>
              회원 본인은 위 주문 내용을 확인했으며 상품정보, 거래조건 확인 및
              구매 진행에 동의합니다.
            </Text>
          </styles.AgreeTerms>
        </View>
      </styles.Body>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <styles.OrderButton
          allcheck={allCheck}
          onPress={() => {
            allCheck ? goPaymentScreens() : null;
          }}>
          <styles.OrderButtonText allcheck={allCheck}>
            결제하기
          </styles.OrderButtonText>
        </styles.OrderButton>
      </View>
    </styles.Container>
  );
}
