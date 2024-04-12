import {styled} from 'styled-components/native';
import {COLORS} from '../../../constants/color';
import {Alert, Modal, ScrollView} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {useEffect, useState} from 'react';
import {formatCommaNumber} from '../../../utils/CustomUtils';
import {portCart} from '../../../api/storeApi';
import {useNavigation} from '@react-navigation/native';
import {itemListData} from '../../../store/atom';
import {useRecoilState} from 'recoil';
import GestureRecognizer from 'react-native-swipe-gestures';

function OptionChoiceModal({
  modalVisible,
  setModalVisible,
  closeModal,
  item,
  // options,
  // price,
  productId,
}) {
  const upcoupon = require('../../../assets/img/storecaret-up.png');

  const downcoupon = require('../../../assets/img/storecaret-down.png');

  const [isModalOpen, setIsModalOpen] = useState(true);
  const [option, setSelectedOption] = useState([]);
  const [itemQuantity, setQuantity] = useState(1);
  const navigation = useNavigation();
  const [itemDataList, setItemDataList] = useRecoilState(itemListData);

  // let option = [];

  useEffect(() => {
    setIsModalOpen(false);
  }, []);

  const [totalPrice, setTotalPrice] = useState(0);

  console.log('oitemption', item);
  console.log('totalPrice', totalPrice);

  const handleSelectOption = itemOption => {
    console.log('itemOption', itemOption);
    // option.push({...option, quantity: 1});
    // setSelectedOption({...option, quantity: 1});
    if (option.length > 0) {
      setSelectedOption([
        ...option,
        {
          id: itemOption.id,
          product: {
            brand: item.brand,
            name: item.name,
            mainImage: item.mainImage,
            salePrice: item.salePrice,
          },
          option: {
            name: itemOption.name,
          },

          quantity: 1,
        },
      ]);
      console.log('quantity', option.quantity);
    } else {
      setSelectedOption([
        {
          id: itemOption.id,
          product: {
            brand: item.brand,
            name: item.name,
            mainImage: item.mainImage,
            salePrice: item.salePrice,
          },
          option: {
            name: itemOption.name,
          },

          quantity: 1,
        },
      ]);
      console.log('quantity', option.quantity);
    }

    setIsModalOpen(false); // 옵션 선택 후 목록 닫기
  };

  const toggleCoupon = () => {
    setIsModalOpen(prev => !prev);
  };

  const handleIncrement = id => {
    setSelectedOption(prevOptions => {
      return prevOptions.map(option => {
        if (option.id === id && option.quantity < 99) {
          return {...option, quantity: option.quantity + 1};
        }
        return option;
      });
    });
  };

  const handleDecrease = id => {
    setSelectedOption(prevOptions => {
      return prevOptions.map(option => {
        if (option.id === id && option.quantity > 1) {
          return {...option, quantity: option.quantity - 1};
        }
        return option;
      });
    });
  };

  useEffect(() => {
    if (option) {
      let totalPriceFromOptions = 0;

      for (let i = 0; i < option.length; i++) {
        let optionPrice = option[i].quantity * item?.salePrice;
        console.log('1', optionPrice);

        totalPriceFromOptions += optionPrice;
      }

      setTotalPrice(totalPriceFromOptions);
    } else {
      setTotalPrice(0);
    }
  }, [option]);

  const postCart = async () => {
    try {
      const response = await portCart(productId, option);

      if (response) {
        console.log(response);
        // Alert.alert('해당 상품이 장바구니에 담겼습니다');
        closeModal();
        setSelectedOption([]);
        navigation.navigate('ItemCart');
      } else {
        return;
      }
    } catch (error) {
      console.error('err', error);
    }
  };

  const handleRemoveOption = optionId => {
    console.log(optionId);
    const updatedOptions = option.filter(option => option.id !== optionId);
    setSelectedOption(updatedOptions);
  };

  return (
    <GestureRecognizer
      style={{flex: 1}}
      onSwipeUp={() => setModalVisible(true)}
      // onSwipeDown={() => setModalVisible(false)}
    >
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={closeModal}>
        <ModalContainer>
          <ModalContent>
            <ScrollView showsVerticalScrollIndicator={true} bounces={false}>
              <ModalCloseButton onPress={closeModal}>
                <ModalCloseBox
                  source={require('../../../assets/img/close.png')}
                />
              </ModalCloseButton>

              <ModalTitle>옵션 선택</ModalTitle>
              <SelectOptionContainer>
                <SelectCouponContainer
                  onPress={toggleCoupon}
                  activeOpacity={0.8}
                  style={
                    isModalOpen
                      ? {
                          backgroundColor: '#f6f6f6',
                          borderBottomLeftRadius: 0,
                          borderBottomRightRadius: 0,
                        }
                      : {backgroundColor: '#fff'}
                  }>
                  <TouchableOpacity onPress={toggleCoupon}>
                    <SelectCouponInnerContainer>
                      <SelectCouponText>옵션을 선택해주세요</SelectCouponText>
                    </SelectCouponInnerContainer>
                  </TouchableOpacity>

                  <LeftContainer onPress={toggleCoupon} activeOpacity={0.8}>
                    {/* <SelectCouponText>{option?.endDate}</SelectCouponText> */}
                    <SelectCouponImg
                      resizeMode={FastImage.resizeMode.contain}
                      source={isModalOpen ? upcoupon : downcoupon}
                    />
                  </LeftContainer>
                </SelectCouponContainer>
                {isModalOpen && item?.options && (
                  <>
                    {item?.options.map(item => (
                      <TouchableOpacity
                        key={item.id}
                        onPress={() => {
                          if (
                            option.findIndex(
                              seleteItem => item.id === seleteItem.id,
                            ) === -1
                          ) {
                            handleSelectOption(item);
                          } else {
                            Alert.alert('실패', '이미 선택한 옵션입니다.', [
                              '확인',
                            ]);
                          }
                        }}>
                        <CouponListContainer>
                          <CouponListText>{item.name}</CouponListText>
                        </CouponListContainer>
                      </TouchableOpacity>
                    ))}
                  </>
                )}
              </SelectOptionContainer>
              {(option || []).map((option, index) => (
                <SelectContainerBox key={index}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text>{option.option.name}</Text>
                    <ModalCloseButton
                      onPress={() => handleRemoveOption(option.id)}>
                      <OptionDeleteButton
                        source={require('../../../assets/img/x-2.png')}
                      />
                    </ModalCloseButton>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <ModalCloseButton
                        onPress={() => {
                          handleDecrease(option.id);
                        }}>
                        <QuantityButton
                          style={{
                            marginRight: 17,
                          }}
                          source={require('../../../assets/img/storeminus.png')}
                        />
                      </ModalCloseButton>
                      <QuantityText>{option.quantity}</QuantityText>
                      <ModalCloseButton
                        onPress={() => handleIncrement(option.id)}>
                        <QuantityButton
                          style={{
                            marginLeft: 17,
                          }}
                          source={require('../../../assets/img/storeplus.png')}
                        />
                      </ModalCloseButton>
                    </View>
                    <QuantityText style={{fontSize: 16, marginTop: 4}}>
                      {formatCommaNumber(item?.salePrice * option.quantity)}원
                    </QuantityText>
                  </View>
                </SelectContainerBox>
              ))}
            </ScrollView>
            {totalPrice ? (
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <PriceText style={{fontSize: 16, marginTop: 10}}>
                    총 결제 금액
                  </PriceText>
                  <PriceText>{formatCommaNumber(totalPrice)}원</PriceText>
                </View>

                <View style={{flexDirection: 'row'}}>
                  <SubButton
                    isBuy={true}
                    style={{marginRight: 10}}
                    onPress={() => {
                      if (option.length > 0) {
                        postCart();
                      } else {
                        console.log('선택된 옵션이 없음');
                      }
                    }}>
                    <ButtonText isBuy={true}>장바구니</ButtonText>
                  </SubButton>
                  <SubButton
                    onPress={() => {
                      if (option.length > 0) {
                        navigation.navigate('ItemOrder');
                        setItemDataList(option);
                        closeModal();
                      } else {
                        console.log('선택된 옵션이 없음');
                      }
                    }}>
                    <ButtonText>구매하기</ButtonText>
                  </SubButton>
                </View>
              </View>
            ) : null}
          </ModalContent>
        </ModalContainer>
      </Modal>
    </GestureRecognizer>
  );
}

export default OptionChoiceModal;

const ModalContainer = styled.View`
  flex: 1;
  /* height: 50%; */
  justify-content: flex-end;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.View`
  background-color: ${COLORS.white};
  width: 100%;
  padding: 20px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  flex: 0.7;
`;

const ModalTitle = styled.Text`
  margin-top: 45px;
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: 600;
  /* line-height: 140%; */
  color: ${COLORS.sub};
`;

const PriceText = styled.Text`
  font-size: 20px;
  font-weight: 600;
  line-height: 30px;
  color: ${COLORS.sub};
  margin-top: 25px;

  margin-bottom: 28px;
`;

const QuantityText = styled.Text`
  color: ${COLORS.sub};

  /* H5 */
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  /* line-height: 140%; 28px */
  letter-spacing: -0.5px;
`;

const ModalText = styled.Text`
  font-size: 14px;
  font-weight: 400;
  line-height: 22.4px;
  margin-top: 25px;
  margin-bottom: 30px;
`;

const ModalCloseButton = styled.TouchableOpacity``;

const ModalCloseBox = styled(FastImage)`
  position: absolute;
  right: 15px;
  top: 15px;
  width: 20px;
  height: 20px;
`;

OptionDeleteButton = styled(FastImage)`
  width: 20px;
  height: 20px;
  flex-shrink: 0;
`;

const QuantityButton = styled(FastImage)`
  height: 24px;
  width: 24px;
`;

const CouponListContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 15px 16px;
  background-color: ${COLORS.white};
  border-bottom: 1px solid ${COLORS.sub};
  width: 100%;
  border-radius: 13px;
  /* justify-content: space-between; */
`;

const CouponListText = styled.Text`
  font-size: 14px;
  width: 100%;
  padding-left: 10px;
  color: ${COLORS.sub};
  font-weight: 400;
  line-height: 22.4px;
`;

const SelectContainerBox = styled.View`
  margin-top: 12px;
  padding: 15px 16px;
  width: 100%;
  height: 86px;
  flex-shrink: 0;
  border-radius: 15px;
  background: ${COLORS.gray_100};
  justify-content: space-between;
`;

const SelectCouponContainer = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  align-items: center;
  padding: 15px 16px;
  background-color: ${COLORS.white};
  justify-content: space-between;
  border-radius: 13px;
`;

const SelectOptionContainer = styled.TouchableOpacity`
  align-items: center;
  /* padding: 15px 16px; */
  background-color: ${COLORS.white};
  border: 1px solid ${COLORS.sub};
  border-radius: 13px;
  justify-content: space-between;
`;

const SelectCouponInnerContainer = styled.View`
  width: 100%;

  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const SelectCouponText = styled.Text`
  font-size: 14px;
  font-weight: 400;
  line-height: 22.4px;
  color: ${COLORS.sub};
  margin-left: 8px;
`;

const LeftContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;
const SelectCouponImg = styled(FastImage)`
  margin-left: 10px;
  width: 22px;
  height: 22px;
`;

const SubButton = styled.TouchableOpacity`
  width: 50%;
  height: 60px;
  border-radius: 90px;
  background-color: ${props => (props.isBuy ? '#f6f6f6' : '#1f1f1f')};
  align-items: center;
  justify-content: center;
`;

const ButtonText = styled.Text`
  font-size: 16px;
  color: ${props => (props.isBuy ? '#707070' : '#fff')};
  font-weight: 600;
  /* margin-left: 8px; */
`;
