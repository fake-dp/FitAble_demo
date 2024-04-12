import {View, Text, Image, TouchableOpacity, TextInput} from 'react-native';
import * as styles from './styles';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import Postcode from '@actbase/react-daum-postcode';
import {buyerData} from '../../../store/atom';

import {
  getCartList,
  portAddress,
  portItemQuantity,
} from '../../../api/storeApi';
import {useCallback, useEffect, useState} from 'react';
import {formatCommaNumber} from '../../../utils/CustomUtils';
import CheckBox from '@react-native-community/checkbox';
import {useRecoilState} from 'recoil';
import GobackBlackGrid from '../../../components/grid/GobackBlackGrid';

export default function OrderScreen({route}) {
  const navigation = useNavigation();
  const [itemList, setItemList] = useState('');
  const [name, setName] = useState('');
  const [firstPhone, setFirstPhone] = useState('');
  const [middlePhone, setMiddlePhone] = useState('');
  const [lastPhone, setLastPhone] = useState('');

  const [address, setAddress] = useState('');
  const [addressDetail, setAddressDetail] = useState('');
  const [zipCode, setZipCode] = useState(14984);
  const [buyerAddressData, setBuyerAddressData] = useRecoilState(buyerData);

  useEffect(() => {
    if (buyerAddressData) {
      setName(buyerAddressData.name);
      setFirstPhone(buyerAddressData.phone?.substring(0, 3));
      setMiddlePhone(buyerAddressData.phone?.substring(3, 7));
      setLastPhone(buyerAddressData.phone?.substring(7));
      setAddress(buyerAddressData.address);
      setAddressDetail(buyerAddressData.addressDetail);
    }
  }, []);

  useEffect(() => {
    if (route.params) {
      setAddress(route.params.address.address);
      setZipCode(route.params.address.zonecode);
    }
  }, [route]);

  const postAdress = async () => {
    try {
      const res = await portAddress(
        name,
        firstPhone + middlePhone + lastPhone,
        zipCode,
        address,
        addressDetail,
      );
      console.log('res', res);
      if (res) {
        navigation.goBack();
        // setAddressData([]);
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  const goBackScreens = () => {
    navigation.goBack();
  };

  return (
    <styles.Container>
      <styles.Header>
        <GobackBlackGrid onPress={goBackScreens}>배송지</GobackBlackGrid>
      </styles.Header>
      <styles.Body>
        <View>
          <styles.TitleText>이름</styles.TitleText>
          <styles.AddressInput
            placeholder="수령인"
            // placeholderTextColor={COLORS.gray_300}
            value={name}
            onChangeText={setName}
            maxLength={10}
            // secureTextEntry={true}
            // keyboardType="numeric"
            returnKeyType="done"
          />
        </View>
        <View>
          <styles.TitleText>휴대폰번호</styles.TitleText>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <styles.AddressInput
              placeholder="010"
              style={{width: 100}}
              // placeholderTextColor={COLORS.gray_300}
              maxLength={4}
              value={firstPhone}
              onChangeText={setFirstPhone}
              // secureTextEntry={true}
              keyboardType="numeric"
              returnKeyType="done"
            />
            <Text style={{height: 50}}>-</Text>

            <styles.AddressInput
              placeholder="0000"
              style={{width: 100}}
              maxLength={4}
              // placeholderTextColor={COLORS.gray_300}
              value={middlePhone}
              onChangeText={setMiddlePhone}
              // secureTextEntry={true}
              keyboardType="numeric"
              returnKeyType="done"
            />
            <Text style={{height: 50}}>-</Text>

            <styles.AddressInput
              placeholder="0000"
              style={{width: 100}}
              maxLength={4}
              value={lastPhone}
              onChangeText={setLastPhone}
              keyboardType="numeric"
              returnKeyType="done"
            />
          </View>
        </View>
        <View>
          <styles.TitleText>배송지</styles.TitleText>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <styles.AddressInput
              placeholder="주소"
              editable={false}
              style={{width: 230}}
              // placeholderTextColor={COLORS.gray_300}
              value={address}
              onChangeText={setAddress}
              // secureTextEntry={true}
              returnKeyType="done"
            />
            <styles.AddressSearchButton
              onPress={() => navigation.navigate('searchAddress')}>
              <Text>주소 검색</Text>
            </styles.AddressSearchButton>
          </View>
          <styles.AddressInput
            placeholder="상세주소"
            // placeholderTextColor={COLORS.gray_300}
            value={addressDetail}
            onChangeText={setAddressDetail}
            // secureTextEntry={true}
            // maxLength={40}
            returnKeyType="done"
          />
        </View>
      </styles.Body>
      <styles.OrderButton
        style={{marginHorizontal: 15, width: 'auto'}}
        allcheck={
          !!name &&
          !!firstPhone &&
          !!middlePhone & !!lastPhone &&
          !!zipCode &&
          !!address &&
          !!addressDetail
        }
        onPress={() => {
          postAdress();
        }}>
        <styles.OrderButtonText
          allcheck={
            !!name &&
            !!firstPhone &&
            !!middlePhone & !!lastPhone &&
            !!zipCode &&
            !!address &&
            !!addressDetail
          }>
          등록하기
        </styles.OrderButtonText>
      </styles.OrderButton>
    </styles.Container>
  );
}
