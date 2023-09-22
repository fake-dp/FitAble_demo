import { styled } from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import EctInput from '../../ui/inputUi/EctInput';
import MainBtn from '../../ui/buttonUi/MainBtn';
import React, {useCallback, useRef, useState, useEffect} from 'react';
import CheckBox from '@react-native-community/checkbox';
import { Text, StyleSheet, View, Platform,TouchableOpacity, Image} from 'react-native';
import CheckBtn from '../../ui/buttonUi/CheckBtn';
import AgreementModal from '../../ui/modal/AgreementModal';
import { agreementList} from '../../../data/AgreementData'
import GobackGrid from '../../grid/GobackGrid';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import {upDateMyInfo,joinInfo} from '../../../api/authApi'
import {signUpInfoState,isLoginState} from '../../../store/atom';
import { useRecoilState } from 'recoil';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Agreementtemplate(props) {

    const navigation = useNavigation();

    const route = useRoute();

    const updateInfoText = route.params?.data;
    const [signUpInfo, setSignUpInfo] = useRecoilState(signUpInfoState);
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoginState);
    const [allCheck, setAllCheck] = useState(false);
    const [isSelected, setSelection] = useState({});
    const [checkedCount, setCheckedCount] = useState(0); 
    console.log('dd@@@3213123@',signUpInfo)

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

      const goBackNavigation = () => {
        // 로그인 화면으로 이동
        navigation.navigate('SignIn');
        // setSignUpInfo({...signUpInfo, name: '', phone: ''});
    }

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

    const handlePass = (signUpInfo) => {
      updateInfoText ? updateInfoUser(signUpInfo) : signUpinfoApi(signUpInfo)
        // console.log('home으로 고고씽')
        // console.log('testst',signUpInfo)
    }

    const updateInfoUser = async (signUpInfo) => {
      console.log('signUpInfo회원업데이트',signUpInfo)
      const bodyData ={
        birthDay: signUpInfo.birthDay,
        gender: signUpInfo.gender,
        password: signUpInfo.password,
        fcmToken: "dCilaS_PlFE:APA91bHi45B4d1V5XEPaTW9hhtmoR",
        agreements: {
        marketing: false,
        pushAlarm: false,
        storeMarketing: false
  }
}
console.log('업데이트bodyData',bodyData)
      try{
        const response = await upDateMyInfo(bodyData);
        console.log('updateInfoUser response:', response)
        if(response){
          // navigation.navigate('Home');
          console.log('resaaa',response)
          setIsLoggedIn(true);
        }
      }catch(error){
        console.error('updateInfoUser error:', error.response.data);
      }
    }

    const signUpinfoApi = async (signUpInfo) => {
      console.log('signUpInfo@@@',signUpInfo)
      const bodyData = {
          name: signUpInfo.name,
          birthDay: signUpInfo.birthDay,
          gender: signUpInfo.gender,
          phone: signUpInfo.phone,
          password: signUpInfo.password,
          fcmToken: "dCilaS_PlFE:APA91bHi45B4d1V5XEPaTW9hhtmoR",
          agreements: {
            marketing: false,
            pushAlarm: false,
            storeMarketing: false
          }
      }
      console.log('회원가입bodyData',bodyData)
      try{
        const response = await joinInfo(bodyData);
        console.log('signUpinfoApi response:', response)
        if(response){
          // navigation.navigate('Home');
          console.log('회원가입 응답',response)
          const { accessToken, refreshToken } = response;
          await AsyncStorage.setItem("accessToken", accessToken);
          await AsyncStorage.setItem("refreshToken", refreshToken);
          setIsLoggedIn(true);
        }
      }catch(error){
        console.error('signUpinfoApi error:', error.response.data);
      }
    }
    const rigthIcon = require('../../../assets/img/rightIcon.png');
    
    return (
        <AuthContainer>
            <GobackGrid onPress={goBackNavigation}/>
            <AgreementContainer>
                <AuthText>이용약관 내용에</AuthText>
                <AuthText>동의해주세요</AuthText>
            </AgreementContainer>
        <CheckBtn 
          onPress={toggleAllCheck} allCheck={allCheck} 
        />
        {
            agreementList.map((item) => (
              
                <ListContainer key={item.id} styledProps={agreementList.length ===2}>

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

                  <IndexListContainer onPress={() => handleItemPress(item)}>
                    <TouchableOpacity key={item.id} onPress={() => handleItemPress(item)}>
                        <ListText>{item.title}</ListText>
                        <SubTitleText>{item.subText}</SubTitleText>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => handleItemPress(item)}>
                        <IconsImg source={rigthIcon}/>
                    </TouchableOpacity>
                  </IndexListContainer>

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
            onPress={()=>handlePass(signUpInfo)}
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
padding:0 20px;
`

const AgreementContainer = styled.View`
margin-top: 34px;
`

const AuthText = styled.Text`
color: ${COLORS.white};
font-size: 28px;
font-weight: 500;
line-height: 37.80px;
`;

const CheckBoxStyle = styled(CheckBox)`
width: 24px;
height: 24px;
`;

const ListContainer = styled.View`
flex-direction: row;
/* justify-content: space-between; */
/* align-items: center;*/
/* background-color: red; */
/* border-bottom-width: 1px; */
border-bottom-color: ${COLORS.white};

border-bottom-width: ${(props) => (props.styledProps ? 1 : 0)};
margin-top: 24px;
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
  bottom: 10px;
  left: 0;
  right: 0;    
`;

const IconsImg = styled.Image`
width: 20px;
height: 20px;
margin-right: 23px;
`

const SubTitleText = styled.Text`
color: ${COLORS.gray_300};
font-size: 14px;
font-weight: 400;
line-height: 22.40px;
`

const IndexListContainer = styled.TouchableOpacity`
flex-direction: row;
justify-content: space-between;
/* background-color: blue; */
width: 100%;
padding-left: 16px;
`