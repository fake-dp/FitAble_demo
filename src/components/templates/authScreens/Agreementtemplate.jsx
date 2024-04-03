import { styled } from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import MainBtn from '../../ui/buttonUi/MainBtn';
import React, { useState, useEffect} from 'react';
import CheckBox from '@react-native-community/checkbox';
import {  Alert, Platform,TouchableOpacity, Linking, ScrollView,Dimensions} from 'react-native';
import CheckBtn from '../../ui/buttonUi/CheckBtn';
import { agreementList} from '../../../data/AgreementData';
import GobackGrid from '../../grid/GobackGrid';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import {upDateMyInfo,joinInfo} from '../../../api/authApi'
import {signUpInfoState,isLoginState,fcmTokenState} from '../../../store/atom';
import { useRecoilState } from 'recoil';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FastImage from 'react-native-fast-image';

function Agreementtemplate(props) {

    const navigation = useNavigation();

    const route = useRoute();

    const updateInfoText = route.params?.data;
    const [signUpInfo, setSignUpInfo] = useRecoilState(signUpInfoState);
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoginState);
    const [fcmToken, setFcmToken] = useRecoilState(fcmTokenState);
    
    const [allCheck, setAllCheck] = useState(false);
    const [isSelected, setSelection] = useState({});

    const [deviceNotiCheck, setDeviceNotiCheck] = useState(false);
    console.log('isSelected11',signUpInfo.agreements)


    useEffect(() => {
      const newSelection = {
        ...isSelected,
        3: signUpInfo.agreements.pushAlarm,
        4: signUpInfo.agreements.marketing,
        5: signUpInfo.agreements.storeMarketing,
      };
      setSelection(newSelection);
  }, [signUpInfo.agreements.pushAlarm, signUpInfo.agreements.marketing, signUpInfo.agreements.storeMarketing]);
  
    
      

  const toggleAllCheck = () => {
    const newAllCheck = !allCheck;

    // 모든 체크박스 상태를 newAllCheck 값으로 설정합니다.
    const updatedSelection = { ...isSelected };
    for (const key of Object.keys(isSelected)) {
        updatedSelection[key] = newAllCheck;
    }

    setAllCheck(newAllCheck);
    setSelection(updatedSelection);

    setSignUpInfo(prevInfo => ({
        ...prevInfo,
        agreements: {
            pushAlarm: newAllCheck,
            marketing: newAllCheck,
            storeMarketing: newAllCheck,
        }
    }));
};


    

      const goBackNavigation = () => {
        // 로그인 화면으로 이동
        navigation.navigate('SignIn');
        // setSignUpInfo({...signUpInfo, name: '', phone: ''});
    }

    useEffect(() => {
      const initialSelection = agreementList.reduce((acc, item) => {
        acc[item.id] = item.isCheck;
        return acc;
      }, {});
      setSelection(initialSelection);
    }, []);
    

    const handleCheckboxChange = (id) => {
      const newIsSelected = !isSelected[id];
      const updatedSelection = {
          ...isSelected,
          [id]: newIsSelected,
      };
  
      // 개별 체크박스 변경 후, 모든 체크박스가 체크되어 있는지 확인
      // const allChecked = Object.values(updatedSelection).every(value => value);
      const allChecked = Object.keys(updatedSelection).every(key => updatedSelection[key]);
      // 전체 체크박스 상태 업데이트
      setAllCheck(allChecked);
      setSelection(updatedSelection);
    
      // 선택 체크박스에 따라 signUpInfo의 agreements 업데이트
      if (id === 3) { // pushAlarm
          setSignUpInfo((prevInfo) => ({
              ...prevInfo,
              agreements: {
                  ...prevInfo.agreements,
                  pushAlarm: newIsSelected
              }
          }));
      } else if (id === 4) { // marketing
          setSignUpInfo((prevInfo) => ({
              ...prevInfo,
              agreements: {
                  ...prevInfo.agreements,
                  marketing: newIsSelected
              }
          }));
      } else if (id === 5) { // storeMarketing
          setSignUpInfo((prevInfo) => ({
              ...prevInfo,
              agreements: {
                  ...prevInfo.agreements,
                  storeMarketing: newIsSelected
              }
          }));
      }
  };
  
  
    




  // const [selectedItem, setSelectedItem] = useState(null);


    const handleItemPress = (url) => {
      Linking.canOpenURL(url).then(supported => {
        if (supported) {
          Linking.openURL(url);
        } else {
          console.log("Don't know how to open URI: " + url);
        }
      });
    };
  
    const handleAndroidLink = (url) => {
      console.log('url',url)
      navigation.navigate('TermWebView', {uri: url})
  }
  
  const isAndroidLink = Platform.OS === 'android' ? handleAndroidLink : handleItemPress;

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
        fcmToken: fcmToken,
        agreements: {
          marketing: signUpInfo.agreements.marketing,
          pushAlarm: signUpInfo.agreements.pushAlarm,
          storeMarketing: signUpInfo.agreements.storeMarketing
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
          fcmToken: fcmToken,
          agreements: {
            marketing: signUpInfo.agreements.marketing,
            pushAlarm: signUpInfo.agreements.pushAlarm,
            storeMarketing: signUpInfo.agreements.storeMarketing
          }
      }
    //   const bodyData = {
    //     name: '무드등',
    //     birthDay: '1992-03-04',
    //     gender: 'MALE',
    //     phone: '18113131414',
    //     password: 'qwer1234!',
    //     fcmToken: fcmToken,
    //     agreements: {
    //       marketing: signUpInfo.agreements.marketing,
    //       pushAlarm: signUpInfo.agreements.pushAlarm,
    //       storeMarketing: signUpInfo.agreements.storeMarketing
    //     }
    // }

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
        if(error.response.data.code === 10201){
          console.log('회원가입 실패')
          Alert.alert('회원가입 실패', '이미 가입된 회원입니다.', [{ text: '확인' }]);
        }
      }
    }
    const rigthIcon = require('../../../assets/img/rightIcon.png');
    

    const isActiveBtn = isSelected[0] && isSelected[1] && isSelected[2];
    const SmallDeivece = Dimensions.get('window').height < 680 ? true : false;

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
        <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        >
          <ListContainerListBox SmallDeivece={SmallDeivece}>
        {
            agreementList.map((item) => (
              
                <ListContainer key={item.id} 
                styledProps={agreementList.length ===2}>
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

                  <IndexListContainer key={item.id} onPress={() => isAndroidLink(item.url)}>
                    <TouchableOpacity key={item.id} onPress={() => isAndroidLink(item.url)}>
                        <ListText>{item.title}</ListText>
                        <SubTitleText>{item.subText}</SubTitleText>
                    </TouchableOpacity>

                        <IconsImg 
                        resizeMode={FastImage.resizeMode.contain}
                        source={rigthIcon}/>
          
                  </IndexListContainer>

                </ListContainer>
            ))
        }
                  </ListContainerListBox>
        </ScrollView>
      <BottomBtnContainer>
        {
            isActiveBtn ? 
            <MainBtn
            colorProp={isActiveBtn}
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
/* margin-top: 34px; */
margin-top: ${Platform.OS === 'ios' ? '34px' : '4px'};
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

const ListContainerListBox = styled.View`
 margin-bottom: ${props => props.SmallDeivece ? '110px' : '0px'};

  /* padding: 0 20px; */
`

const ListContainer = styled.View`
flex-direction: row;
border-bottom-color: ${COLORS.white};

border-bottom-width: ${(props) => (props.styledProps ? 1 : 0)};
margin-top: 24px;
padding: ${Platform.OS === 'ios' ? '0 20px 0 10px' : '0px'};
`;

const ListText = styled.Text`
color: ${COLORS.gray_100};
font-size: 14px;
font-weight: 400;
/* text-decoration: underline solid ${COLORS.gray_100}; */
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

const IconsImg = styled(FastImage)`
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