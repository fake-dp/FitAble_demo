import styled from 'styled-components/native';
import {COLORS} from '../../../constants/color';
import GobackBlackGrid from '../../grid/GobackBlackGrid';
import {useNavigation} from '@react-navigation/native';

import {useEffect, useState} from 'react';
import {getOrderList} from '../../../api/mypageApi';
import {ScrollView} from 'react-native';

import {View, Text, StyleSheet, Image} from 'react-native';

import {
  changeStatus,
  formatCommaNumber,
  formatDate,
} from '../../../utils/CustomUtils';
import FastImage from 'react-native-fast-image';

function MyProductTemplate(props) {
  const navigation = useNavigation();

  const [selectedItem, setSelectedItem] = useState(null);
  const [open, setOpen] = useState(false);
  const [orderData, setOrderData] = useState('');

  const goBackScreens = () => {
    navigation.goBack();
  };
  const getOrderItemList = async () => {
    try {
      const res = await getOrderList();
      if (res) {
        setOrderData(res.content);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    getOrderItemList();
  }, []);

  return (
    <Container>
      <Header>
        <GobackBlackGrid onPress={goBackScreens}>주문상품 확인</GobackBlackGrid>
      </Header>

      {/* <TestGrid>
        <MyProductText>곧 업데이트 예정입니다.</MyProductText>
      </TestGrid> */}
      <Body>
        {orderData &&
          orderData.map((data, index) => (
            <View key={index}>
              <OrderNumber
                onPress={() => navigation.navigate('OrderItemDetail', data.id)}>
                <OrderInfo>주문번호 {data?.code}</OrderInfo>
                <View style={{width: 15}}>
                  <ItemDetailIcon
                    resizeMode="contain"
                    source={require('../../../assets/img/vector.png')}></ItemDetailIcon>
                </View>
              </OrderNumber>
              <Line></Line>

              <OrderInfo style={{fontWeight: 700, marginBottom: 14}}>
                {' '}
                {formatDate(data?.createAt)}
              </OrderInfo>

              <OrderStatus style={{marginBottom: 14}}>
                {' '}
                {changeStatus(data?.status)}
              </OrderStatus>

              {data?.products.map((item, index) => (
                <View key={index} style={{marginBottom: 19}}>
                  <View style={{flexDirection: 'row'}}>
                    <ItemImg source={{uri: item?.product.mainImage}}></ItemImg>
                    <ItemInfoArea>
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: 500,
                          color: '#707070',
                        }}>
                        {item.product.brand}
                      </Text>
                      <ItemInfo>{item.product.name}</ItemInfo>
                    </ItemInfoArea>
                  </View>
                  <View style={{marginStart: 83}}>
                    <View style={{flexDirection: 'row'}}>
                      <ItemOption>{item.option.name} | </ItemOption>
                      <ItemOption>{item.quantity}개</ItemOption>
                    </View>
                    <ItemInfo>
                      {formatCommaNumber(item.product.salePrice)}원
                    </ItemInfo>
                  </View>
                </View>
              ))}
            </View>
          ))}
      </Body>
    </Container>
  );
}

export default MyProductTemplate;

const Container = styled.View`
  flex: 1;
  /* height: 100%; */
  /* padding: 0 20px; */
  background-color: ${COLORS.white};
`;

const Header = styled.View`
  /* flex: 1; */
  /* height: 100%; */
  padding: 0 20px;
  margin-bottom: 10px;
  background-color: ${COLORS.white};
`;

const Body = styled.ScrollView`
  flex: 1;
  /* height: 100%; */
  padding: 0 20px;
  background-color: ${COLORS.white};
`;

const OrderNumber = styled.TouchableOpacity`
  margin-top: 40px;
  width: 100%;
  height: 60px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const OrderInfo = styled.Text`
  color: ${COLORS.sub};
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  /* line-height: 140%; 22.4px */
  letter-spacing: -0.4px;
`;

const OrderStatus = styled.Text`
  color: ${COLORS.sub};

  /* body 2 */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  /* line-height: 160%; 22.4px */
  letter-spacing: -0.35px;
`;

const ItemBrand = styled.Text`
  color: ${COLORS.gray_400};

  /* H3 */
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  /* line-height: 160%; 19.2px */
  letter-spacing: -0.3px;
`;

const ItemOption = styled.Text`
  color: ${COLORS.gray_400};

  /* body */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  /* line-height: 160%; 22.4px */
  letter-spacing: -0.35px;
`;

const ItemInfo = styled.Text`
  margin-top: 4px;
  width: 100%;
  color: ${COLORS.sub};

  /* body 2 */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  /* line-height: 160%; 22.4px */
  letter-spacing: -0.35px;
`;

const ItemInfoArea = styled.View`
  width: 80%;
`;

export const Line = styled.View`
  width: 100%;
  height: 1px;
  background: #eee;
  margin-bottom: 28px;
`;

const ItemImg = styled(FastImage)`
  height: 70px;
  width: 70px;
  border-radius: 10px;
  margin-right: 12px;
`;

const ItemDetailIcon = styled(FastImage)`
  height: 15px;
  width: 100%;
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  pickerContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 16,
  },
  item: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  itemText: {
    fontSize: 16,
  },
  cancelButton: {
    marginTop: 16,
    paddingVertical: 12,
    backgroundColor: 'red',
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    color: 'white',
  },
});
