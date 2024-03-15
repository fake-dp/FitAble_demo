import RNPickerSelect from 'react-native-picker-select';
import styled from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import { View,Text,Platform } from 'react-native';
import { useState ,useRef, useEffect} from 'react';

function MyCenterSelectPicker({mainCenter,mainCenterId,centerName ,postMainCenterData}) {

    const pickerRef = useRef();
    const [selectedValue, setSelectedValue] = useState(mainCenter);
    const [tempValue, setTempValue] = useState(mainCenter);
    // console.log('centerName',centerName[0].id,mainCenter)

    const [selectedCenterId, setSelectedCenterId] = useState(mainCenterId);


    const openPicker = () => {
        pickerRef.current.togglePicker(true)
    };

    const centerOptions = centerName.map(center => ({
        label: center.name,
        value: center.id  
    }));

 
    // console.log('centerOptions',centerOptions)

      const handleValueChange = (value) => {
        setSelectedCenterId(value);
        if(Platform.OS === 'android'){
          console.log('value',value)
        }
      };

      const handleClose = () => {
        // Picker가 닫힐 때 선택된 센터 ID를 초기값으로 재설정
        setSelectedCenterId(mainCenterId);
    };


    useEffect(() => {
      if(Platform.OS === 'android'){
        handleDonePress();
      }
    }, [selectedCenterId]);


      const handleDonePress = async() => {
        const selectedCenter = centerName.find(center => center.id === selectedCenterId);
        if (selectedCenter) {
            console.log('selectedCenter',selectedCenter.id, selectedCenter.name)
            await postMainCenterData(selectedCenter.id, selectedCenter.name);
            setSelectedCenterId(selectedCenter.id);
        }else{
            console.log('기타일껄요')
        }
      };

    return (
      <>
        {
          Platform.OS === 'ios' ? (
            <PickerContainer onPress={openPicker}>
            <RNPickerSelect
            ref={pickerRef}
            onValueChange={handleValueChange}
            onDonePress={handleDonePress}
            onClose={handleClose}
            doneText="변경"
            value={selectedCenterId}
              items={centerOptions}
              placeholder={{}}
              style={{
                inputIOS:{
                  paddingRight: 6,
                  fontSize: 16,
                  color: COLORS.gray_400,
                },
              }}
            />
            <DownIcon source={require('../../../assets/img/rightIcon.png')} />
          </PickerContainer>
          ):(
            <AndroidContainer>
            <RNPickerSelect

            onValueChange={handleValueChange}
    
          value={selectedCenterId}
          textInputProps={{ underlineColorAndroid: 'transparent'}}
          useNativeAndroidPickerStyle={false}
          fixAndroidTouchableBug={true}
            // onClose={handleDonePress}
              items={centerOptions}
              Icon={() => {
                return <DownIcon 
                resizeMode='contain'
                source={require('../../../assets/img/rightIcon.png')} />
              }
              }
              placeholder={{}}
              style={{
                inputAndroid:{
                  color: COLORS.gray_400,
                  height: 50,
                  fontSize: 16,
                  padding: 10,
                  marginRight: 30,
                },
              iconContainer: {
                top: 16,
                right: 12,
              },
            }}
            />
  </AndroidContainer>

          )
        }
        </>
    );
}

export default MyCenterSelectPicker;

const PickerContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const AndroidContainer = styled.View`
width: auto;
`;

const DownIcon = styled.Image`
    width: 20px;
    height: 20px;
`;
