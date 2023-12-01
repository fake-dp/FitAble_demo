import RNPickerSelect from 'react-native-picker-select';
import styled from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import { View,Text } from 'react-native';
import { useState ,useRef} from 'react';

function MyCenterSelectPicker({mainCenter,mainCenterId,centerName ,postMainCenterData}) {

    const pickerRef = useRef();
    const [selectedValue, setSelectedValue] = useState(mainCenter);
    const [tempValue, setTempValue] = useState(mainCenter);
    // console.log('centerName',centerName[0].id,mainCenter)

    const [selectedCenterId, setSelectedCenterId] = useState(mainCenterId);


    const openPicker = () => {
      pickerRef.current?.togglePicker(true);
    };

    const centerOptions = centerName.map(center => ({
        label: center.name, // 센터 이름을 라벨로 사용
        value: center.id    // 센터 ID를 값으로 사용
    }));

    // centerOptions.push({
    //     label: '이용할 센터 추가',
    //     value: 'fake_id'
    // });
 
    console.log('centerOptions',centerOptions)

      const handleValueChange = (value) => {
        setSelectedCenterId(value);
      };

      const handleDonePress = async() => {
        const selectedCenter = centerName.find(center => center.id === selectedCenterId);
        if (selectedCenter) {
            console.log('selectedCenter',selectedCenter.id, selectedCenter.name)
            await postMainCenterData(selectedCenter.id, selectedCenter.name);
        }else{
            console.log('기타일껄요')
        }
      };

    return (
        <PickerContainer onPress={openPicker}>
      <RNPickerSelect
      ref={pickerRef}
      onValueChange={handleValueChange}
    //   onDonePress={handleDonePress}
      InputAccessoryView={() => null}
    //   doneText="완료"
      onClose={handleDonePress}
        items={centerOptions}
        placeholder={{ label: mainCenter, value: mainCenterId }}
        style={{
          inputIOS: {
            fontSize: 16,
            fontWeight: 500,
            color: COLORS.gray_400,
          },
          inputAndroid: {
            fontSize: 16,
            fontWeight: 500,
            color: COLORS.gray_400,
          },
          placeholder:{
            fontSize: 16,
            fontWeight: 500,
            color: COLORS.gray_400,
          },
        }}
      />
      <DownIcon source={require('../../../assets/img/rightIcon.png')} />
    </PickerContainer>
    );
}

export default MyCenterSelectPicker;

const PickerContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  /* background-color: red; */
`;

const DownIcon = styled.Image`
  margin-left: 8px;
  width: 20px;
    height: 20px;
`;

const SettingSubText = styled.Text`
font-size: 14px;
color: ${COLORS.gray_400};
font-weight: 500;
line-height: 22.40px;
margin-right: 8px;
`