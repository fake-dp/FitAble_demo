import React, {Component} from 'react';
import Postcode from '@actbase/react-daum-postcode';

import {useNavigation} from '@react-navigation/native';

const SearchAddress = () => {
  const navigation = useNavigation();

  const onAddressSelected = addressData => {
    console.log('주소 데이터', addressData);
    const address = addressData;
    navigation.navigate('DeliveryAddress', {address});
  };

  return (
    <Postcode
      style={{width: '100%', height: '100%'}}
      jsOptions={{animation: true}}
      onSelected={onAddressSelected}
      //   onSelected={data => {
      //     setAddressData(data);
      //     navigation.goBack();
      //   }}
      onError={() => console.log('주소에러')}
    />
  );
};
export default SearchAddress;
