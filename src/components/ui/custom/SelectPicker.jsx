import RNPickerSelect from 'react-native-picker-select';
import styled from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import { Platform } from 'react-native';
import { useState ,useRef, useCallback} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image'

function SelectPicker({setMyInfo,mainCenter,centerName,mainCenterId}) {
    
    const navigation = useNavigation();
    const pickerRef = useRef();

    const [selectedCenterId, setSelectedCenterId] = useState(mainCenterId);
    const openPicker = () => {
      pickerRef.current?.togglePicker(true);
    };


    const handleValueChange = (value) => {
      console.log('ba',value)
        setSelectedCenterId(value);
        if(Platform.OS !== 'ios' && value === 'fake_id'){
          navigation.navigate('SearchCenter');
        }
      };

      const handleDonePress = async() => {
        console.log('dd')
        const selectedCenter = centerName.find(center => center.id === selectedCenterId);
        if (selectedCenter) {
            setMyInfo(prevState => ({
              ...prevState,
              mainCenterId: selectedCenterId,
              mainCenter: selectedCenter.name
            }));
            console.log('selectedCenter',selectedCenter.id,selectedCenterId, selectedCenter.name)
        }else{
            console.log('기타일껄요')
            navigation.navigate('SearchCenter');
        }
      };

      const handleClose = () => {
        setSelectedCenterId(mainCenterId);
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
                console.log('hello')
            };
        }, [mainCenterId])
    );

   return (
    <PickerContainer onPress={openPicker}>
      <RNPickerSelect
      ref={pickerRef}
      onValueChange={handleValueChange}
      onDonePress={handleDonePress}
      doneText="변경"
      value={selectedCenterId}
      // InputAccessoryView={() => null}
      textInputProps={{ underlineColorAndroid: 'transparent'}}
      useNativeAndroidPickerStyle={false}
      fixAndroidTouchableBug={true}
      onClose={handleClose}
        items={centerOptions}
        placeholder={{}}
        style={{
          inputIOS: {
            fontSize: 20,
            fontWeight: 'bold',
            color: COLORS.white,
            paddingRight: 20,
          },
          inputAndroid: {
            display: 'flex',
            flexDirection: 'row',
            fontSize: 20,
            fontWeight: 'bold',
            color: COLORS.white,
            paddingRight: 20,

          },
          placeholder:{
            fontSize: 20,
            fontWeight: 'bold',
            color: COLORS.white,
          },
        }}
      />

      <DownIcon 
      source={require('../../../assets/img/whitedownex.png')} />

    </PickerContainer>
    );
};

export default SelectPicker;

const PickerContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const DownIcon = styled(FastImage)`
  /* margin-left: 18px; */
  width: 20px;
  height: 20px;
  align-self: center; 
`;
