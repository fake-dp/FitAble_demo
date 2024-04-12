import {View, Text, Image, TouchableOpacity} from 'react-native';
import * as styles from './styles';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';

import {
  getCartList,
  deleteCartItem,
  putItemQuantity,
} from '../../../api/storeApi';
import {useCallback, useEffect, useState} from 'react';
import {formatCommaNumber} from '../../../utils/CustomUtils';
import {COLORS} from '../../../constants/color';
import {useRecoilState} from 'recoil';
import {itemListData} from '../../../store/atom';
import GobackBlackGrid from '../../../components/grid/GobackBlackGrid';

function CartScreen(props) {
  const navigation = useNavigation();
  const [isSelected, setSelection] = useState({});

  const [allCheck, setAllCheck] = useState(false);
  const [itemList, setItemList] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [itemDataList, setItemDataList] = useRecoilState(itemListData);
  const [ready, setReady] = useState(false);
  const isFocused = useIsFocused();

  const getStoreProductList = async () => {
    try {
      const res = await getCartList();
      console.log('res123123', res);
      if (res) {
        setItemList(res);
        // itemDataSetting(res);
        if (res.cartSize) {
          setTotalPrice(res.orderPrice);
          choiceItemTotalPrice(res);
          
        } else setTotalPrice(0);
        setReady(true);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    if (itemList && ready) {
      itemDataSetting(itemList);
    }
  }, [ready]);


  console.log('isSelected',isSelected)

  const itemDataSetting = itemList => {
    if (itemList) {
      const isSelected = itemList?.carts?.reduce((acc, item) => {
        acc[item.cartId] = true;
        return acc;
      }, {});
      setSelection(isSelected);
    }
  };

  const postQuantity = async (cartId, quantity, status) => {
    try {
      const res = await putItemQuantity(
        cartId,
        status === 'plus' ? quantity + 1 : quantity - 1,
      );

      if (res) {
        getStoreProductList();
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  //상품 삭제 api
  const delProduct = async cartId => {
    try {
      const res = await deleteCartItem(cartId);
      console.log('delres', res);
      if (res) {
        getStoreProductList();
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getStoreProductList();
    }, [quantity]),
  );

  console.log(itemList);

  // 모든 목록 리스트 체크 여부 확인
  useEffect(() => {
    if (isSelected && Object.keys(isSelected).length > 0) {
      const allChecked = Object.values(isSelected).every(value => value);
      setAllCheck(allChecked);
      choiceItemTotalPrice(itemList);
    } else {
      setAllCheck(false);
    }
  }, [isSelected]);

  //전체 선택
  const toggleAllCheckBoxes = () => {
    if (itemList.cartSize) {
      setSelection(prevState => {
        const allChecked = Object.values(prevState).every(value => value);
        const newState = {};
        for (const key in prevState) {
          newState[key] = !allChecked;
        }
        return newState;
      });
    }
  };
  
  const choiceItemTotalPrice = itemList => {
    let totalPrice = 0;
    let choiceData = [];
    itemList &&
      itemList?.carts.forEach(item => {
        if (isSelected[item.cartId]) {
          totalPrice += item.product.salePrice * item.quantity;
          choiceData.push(item);
        }
      });
    setTotalPrice(totalPrice);
    setItemDataList(choiceData);
  };

  // 개별 목록 리스트 체크 여부 확인
  const handleCheckboxChange = id => {
    setSelection(prevState => {
      const updatedSelection = {...prevState};
      updatedSelection[id] = !prevState[id];

      return updatedSelection;
    });
  };

  const goBackScreens = () => {
    navigation.goBack();
  };

  return (
    <styles.Container>
      <styles.Header>
        <GobackBlackGrid onPress={goBackScreens}>장바구니</GobackBlackGrid>
      </styles.Header>
      <styles.Body>
        <TouchableOpacity
          onPress={toggleAllCheckBoxes}
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <styles.CheckBoxStyle
            value={allCheck}
            onCheckColor={COLORS.main}
            onFillColor={COLORS.box}
            onTintColor={COLORS.box}
            boxType={'square'}
          />
          <Text>전체선택</Text>
        </TouchableOpacity>
        <styles.Line></styles.Line>

        <View>
          <Text style={{marginBottom: 24, color: '#707070'}}>
            <Text style={{color: '#FF7A00'}}>{itemList?.cartSize}</Text>
            개의 상품이 있습니다
          </Text>
        </View>

        {(itemList?.carts || []).map((data, index) => (
          <View key={index}>
            <styles.ItemCartArea>
              <styles.CheckBoxStyle
                value={isSelected[data.cartId]}
                onValueChange={() => handleCheckboxChange(data.cartId)}
                // tintColors={{true: COLORS.main, false: COLORS.main}}
                onCheckColor={COLORS.main}
                // onFillColor={{true: COLORS.box, false: 'COLORS.gray_200'}}
                onFillColor={COLORS.box}
                onTintColor={COLORS.box}
                boxType={'square'}
                // tintColor={COLORS.main}
              />

              <View
                style={{
                  flexDirection: 'row',
                  borderRadius: 15,
                  // justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <Image
                    source={{uri: data?.product.mainImage}}
                    style={{
                      width: 70,
                      height: 70,
                      marginHorizontal: 10,
                      borderRadius: 10,
                    }}
                  />

                  <styles.ItemInfoArea>
                    <styles.ItemText style={{marginBottom: 6}}>
                      {data.product.brand}
                    </styles.ItemText>
                    <styles.ItemText
                      style={{color: '#1f1f1f', marginBottom: 6}}>
                      {data.product.name}
                    </styles.ItemText>
                    <styles.ItemText>{data.option.name}</styles.ItemText>
                  </styles.ItemInfoArea>
                  <TouchableOpacity
                    onPress={() => {
                      delProduct(data.cartId);
                    }}>
                    <Image
                      style={{width: 20, height: 20, marginLeft: 10}}
                      source={require('../../../assets/img/close.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </styles.ItemCartArea>

            <styles.PriceArea>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <styles.QuantityButton
                  onPress={() => {
                    if (data.quantity > 1) {
                      postQuantity(data.cartId, data.quantity, 'minus');
                    } else {
                      console.log('수량이 1보다 작음');
                    }
                  }}>
                  <styles.CustomImage
                    style={{
                      marginRight: 17,
                    }}
                    source={require('../../../assets/img/storeminus.png')}
                  />
                </styles.QuantityButton>
                <styles.QuantityText>{data.quantity}</styles.QuantityText>
                <styles.QuantityButton
                  onPress={() => {
                    if (data.quantity < 99) {
                      postQuantity(data.cartId, data.quantity, 'plus');
                    } else {
                      console.log('수량이 99보다 큼');
                    }
                  }}>
                  <styles.CustomImage
                    style={{
                      marginLeft: 17,
                    }}
                    source={require('../../../assets/img/storeplus.png')}
                  />
                </styles.QuantityButton>
              </View>

              <styles.TitleText>
                {formatCommaNumber(data.quantity * data.product.salePrice)}원
              </styles.TitleText>
            </styles.PriceArea>
          </View>
        ))}
        <View>
          <styles.Line />
          <styles.PriceInfo style={{marginBottom: 14}}>
            <styles.PriceInfoText>주문상품 금액</styles.PriceInfoText>
            <styles.PriceInfoText>
              {/* {formatCommaNumber(itemList.orderPrice)}원 */}
              {formatCommaNumber(totalPrice)}원
            </styles.PriceInfoText>
          </styles.PriceInfo>
          <styles.PriceInfo>
            <styles.PriceInfoText>배송비</styles.PriceInfoText>
            <styles.PriceInfoText>
              {formatCommaNumber(itemList.shippingPrice)}원
            </styles.PriceInfoText>
          </styles.PriceInfo>
        </View>
        <styles.Line />
        <styles.PriceInfo style={{paddingBottom: 25}}>
          <styles.PriceInfoText style={{color: '#1f1f1f', fontWeight: 600}}>
            총 결제 금액
          </styles.PriceInfoText>
          <styles.PriceInfoText style={{color: '#1f1f1f', fontWeight: 600}}>
            {/* {formatCommaNumber(itemList.paymentPrice)}원 */}
            {totalPrice > 0
              ? formatCommaNumber(totalPrice + 3500)
              : formatCommaNumber(totalPrice)}
            원
          </styles.PriceInfoText>
        </styles.PriceInfo>
      </styles.Body>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <styles.OrderButton
          onPress={() => {
            if (totalPrice > 0) {
              navigation.pop()
              navigation.navigate('ItemOrder');
            }
          }}>
          <styles.OrderButtonText>주문하기</styles.OrderButtonText>
        </styles.OrderButton>
      </View>
    </styles.Container>
  );
}

export default CartScreen;
