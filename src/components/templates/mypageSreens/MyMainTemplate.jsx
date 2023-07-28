import { styled } from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import MySettingHeaderGrid from '../../grid/MySettingHeaderGrid';
import { useNavigation } from '@react-navigation/native';

function MyMainTemplate(props) {

    const navigation = useNavigation();

    const goSettingScreen = () => {
        navigation.navigate('AppSetting');
    }

    const goSearchCenterScreen = () => {
        navigation.navigate('SearchCenter');
      }

    const goEditMyProfileScreen = () => {
        console.log('goEditMyProfileScreen');
        navigation.navigate('MyProfile');
    }

    const goCenterRegistScreen = () => {
        navigation.navigate('CenterRegist');
    }

    const goMyBookListScreen = () => {
        navigation.navigate('MyBookList');
    }

    const goCenterMarkScreen = () => {
        navigation.navigate('MyCenter');
    }

    const goMileageScreen = () => {
        console.log('@@@@@akakak')
        navigation.navigate('Mileage');
    }

    const goFitableQnAScreen = () => {
        navigation.navigate('FitableQnA');
    }

    const rightIcon = require('../../../assets/img/rightIcon.png');



    return (
        <Container>
            <MySettingHeaderGrid 
            onPress={goSettingScreen}
            goEditMyProfileScreen={goEditMyProfileScreen}
            />

            <AddTicketBtn
            onPress={goSearchCenterScreen}
            >
                <AddTicketBtnText>이용권 추가 구매</AddTicketBtnText>
            </AddTicketBtn>

             <GridLine/>

                <SettingListBtnFirst onPress={goCenterRegistScreen}>
                    <SettingListText>대표 센터</SettingListText>
                    <FirstSettingContainer>
                      <SettingSubText>에이블짐 노원점</SettingSubText>
                    <SettingListRightIcon source={rightIcon}/>
                    </FirstSettingContainer>
                </SettingListBtnFirst>

            
                <GridLine/>

                <SettingListBtn onPress={goMyBookListScreen}>
                    <SettingListText>전체 예약 목록</SettingListText>
                    <SettingListRightIcon source={rightIcon}/>
                </SettingListBtn>

                <SettingListBtn>
                    <SettingListText>이용권 목록 </SettingListText>
                    <SettingListRightIcon source={rightIcon}/>
                </SettingListBtn>


                <SettingListBtn onPress={goCenterMarkScreen}>
                    <SettingListText>내 센터</SettingListText>
                    <SettingListRightIcon source={rightIcon}/>
                </SettingListBtn>
 

                <SettingListBtn onPress={goMileageScreen}>
                    <SettingListText>마일리지</SettingListText>
                    <SettingListRightIcon source={rightIcon}/>
                </SettingListBtn>

                <GridLine/>

                <SettingListBtn>
                    <SettingListText>주문상품 확인</SettingListText>
                    <SettingListRightIcon source={rightIcon}/>
                </SettingListBtn>
 

                <SettingListBtn onPress={goFitableQnAScreen}>
                    <SettingListText>핏에이블 문의</SettingListText>
                    <SettingListRightIcon source={rightIcon}/>
                </SettingListBtn>

        </Container>
    );
}

export default MyMainTemplate;

const Container = styled.View`
    flex:1;
    padding: 0 20px;
    background-color: ${COLORS.sub};
`

const GridLine = styled.View`
    width: 100%;
    height: 1px;
    background-color: ${COLORS.gray_500};
    margin-bottom: 18px;
    margin-top: 15px;
`

const AddTicketBtn = styled.TouchableOpacity`
    width: 100%;
    height: 50px;
    background-color: ${COLORS.sub};
    border-radius: 13px;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    font-weight: 700;
    margin-bottom: 30px;
    border: 1px solid ${COLORS.gray_300};
`

const AddTicketBtnText = styled.Text`
    color: ${COLORS.white};
    font-size: 16px;
`

const SettingListBtnFirst = styled.TouchableOpacity`
   flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
`


const SettingListBtn = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 15px 0;
`
    
const SettingListText = styled.Text`
font-size: 16px;
color: ${COLORS.white};
font-weight: 500;
line-height: 22.40px;
`
    
const SettingListRightIcon = styled.Image`
    width: 20px;
    height: 20px;
`

const FirstSettingContainer = styled.View`
flex-direction: row;
align-items: center;
justify-content: center;
`

const SettingSubText = styled.Text`
font-size: 14px;
color: ${COLORS.gray_200};
font-weight: 500;
line-height: 22.40px;
margin-right: 8px;
`