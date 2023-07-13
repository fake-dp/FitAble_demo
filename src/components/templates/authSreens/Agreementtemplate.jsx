import { styled } from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import EctInput from '../../ui/inputUi/EctInput';
import MainBtn from '../../ui/buttonUi/MainBtn';
import React, {useCallback, useRef, useState, useEffect} from 'react';
import CheckBox from '@react-native-community/checkbox';
import { Text, StyleSheet, View, Platform,TouchableOpacity, Modal} from 'react-native';
import CheckBtn from '../../ui/buttonUi/CheckBtn';
import AgreementModal from '../../ui/modal/AgreementModal';
import { agreementList} from '../../../data/AgreementData'


function Agreementtemplate(props) {

    const [allCheck, setAllCheck] = useState(false);
    const [isSelected, setSelection] = useState({});
    const [checkedCount, setCheckedCount] = useState(0); 

    // 모든 목록 리스트 체크 여부 확인
    const toggleAllCheck = () => {
        const updatedSelection = {};
        const newAllCheck = !allCheck;
    
        agreementList.forEach((item) => {
          updatedSelection[item.id] = newAllCheck;
        });
    
        setAllCheck(newAllCheck);
        setSelection(updatedSelection);
        console.log('updatedSelection',updatedSelection, 'newAllCheck',newAllCheck)
      };
    
        // 개별 목록 리스트 체크 여부 확인
    const handleCheckboxChange = (id) => {
        setSelection((prevState) => {
          const updatedSelection = { ...prevState };
          updatedSelection[id] = !prevState[id];
          return updatedSelection;
        });
      };

// 선택된 체크박스 개수 업데이트
  useEffect(() => {
    const count = Object.values(isSelected).filter((value) => value).length;
    setCheckedCount(count);
  }, [isSelected]);

   // 모든 목록 리스트 체크 여부 확인
  useEffect(() => {
    if(checkedCount >= 4) {     
        const allChecked = Object.values(isSelected).every((value) => value);
        setAllCheck(allChecked);
    }else{
        return;
    }
  }, [isSelected]);


  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemPress = (item) => {
      setSelectedItem(item);
      setModalVisible(true);
    };
  
    const closeModal = () => {
      setModalVisible(false);
      setSelectedItem(null);
    };

    const handlePass = () => {
        console.log('home으로 고고씽')
    }


    return (
        <AuthContainer>
                <AuthText>이용약관 내용에</AuthText>
                <AuthText>동의해주세요</AuthText>
        <CheckBtn 
          onPress={toggleAllCheck} allCheck={allCheck} 
        />
        {
            agreementList.map((item) => (
                <ListContainer key={item.id}>
                    <TouchableOpacity key={item.id} onPress={() => handleItemPress(item)}>
                        <ListText>{item.title}</ListText>
                    </TouchableOpacity>

                    <CheckBoxStyle
                        value={isSelected[item.id]}
                        onValueChange={() => handleCheckboxChange(item.id)}
                        tintColors={{ true: COLORS.main, false: COLORS.main }}

                        onCheckColor={COLORS.main}
                        onFillColor={COLORS.box}
                        onTintColor={COLORS.box}
                        boxType={'square'}
                        tintColor={COLORS.main}
                    />
                </ListContainer>
            ))
        }
        
        <AgreementModal 
        modalVisible={modalVisible}
        selectedItem={selectedItem}
        closeModal={closeModal}
        />


      <BottomBtnContainer>
        {
            checkedCount >= 3 ? <MainBtn
            colorProp={checkedCount >=3 ? true : false}
            onPress={handlePass}
            >다음</MainBtn> : ''
        }
           
            </BottomBtnContainer>

        </AuthContainer>
    );
}

export default Agreementtemplate;

const AuthContainer = styled.View`
flex: 1;
background-color: ${COLORS.sub};
padding: 44px 20px 0 20px;
`

const AuthText = styled.Text`
color: ${COLORS.white};
font-size: 28px;
font-weight: 500;
line-height: 37.80px;
`;

const CheckBoxStyle = styled(CheckBox)`
width: 25px;
height: 25px;
`;

const ListContainer = styled.View`
flex-direction: row;
justify-content: space-between;
align-items: center;

margin-top: 30px;
padding: ${Platform.OS === 'ios' ? '0 20px 0 10px' : '0 19px 0 10px'};
`;

const ListText = styled.Text`
color: ${COLORS.gray_100};
font-size: 14px;
font-weight: 400;
text-decoration: underline solid ${COLORS.gray_100};
line-height: 22.40px;
`


const BottomBtnContainer = styled.View`
   align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 34px;
  left: 0;
  right: 0;    
`;

