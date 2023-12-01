import RNPickerSelect from 'react-native-picker-select';
import styled from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import { View,Text } from 'react-native';
import { useState ,useRef, useCallback} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
function SelectPicker({mainCenter,centerName,mainCenterId}) {
    
    const navigation = useNavigation();
    const pickerRef = useRef();

    const [selectedCenterId, setSelectedCenterId] = useState(mainCenterId);
    const openPicker = () => {
      pickerRef.current?.togglePicker(true);
    };


    const handleValueChange = (value) => {
        setSelectedCenterId(value);
      };

      const handleDonePress = async() => {
        const selectedCenter = centerName.find(center => center.id === selectedCenterId);
        if (selectedCenter) {
            console.log('selectedCenter',selectedCenter.id, selectedCenter.name)
        }else{
            console.log('기타일껄요')
            navigation.navigate('SearchCenter');
        }
      };

      const centerOptions = centerName.map(center => ({
        label: center.name, // 센터 이름을 라벨로 사용
        value: center.id    // 센터 ID를 값으로 사용
    }));

    centerOptions.push({
        label: '이용할 센터 추가',
        value: 'fake_id'
    });


    useFocusEffect(
        useCallback(() => {
            handleValueChange(mainCenterId);
            return () => {
                console.log('fuck')
            };
        }, [mainCenterId])
    );

   return (
    <PickerContainer onPress={openPicker}>
      <RNPickerSelect
      ref={pickerRef}
      onValueChange={handleValueChange}
    //   onDonePress={handleDonePress}
      InputAccessoryView={() => null}
      onClose={handleDonePress}
        items={centerOptions}
        placeholder={{ label: mainCenter, value: mainCenterId }}
        style={{
          inputIOS: {
            fontSize: 20,
            fontWeight: 'bold',
            color: COLORS.white,
          },
          inputAndroid: {
            fontSize: 20,
            fontWeight: 'bold',
            color: COLORS.white,
          },
          placeholder:{
            fontSize: 20,
            fontWeight: 'bold',
            color: COLORS.white,
          },
        }}
      />
      <DownIcon source={require('../../../assets/img/whitedownex.png')} />
    </PickerContainer>
    );
};

export default SelectPicker;

const PickerContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const DownIcon = styled.Image`
  margin-left: 8px;
`;
