import styled from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import GobackBlackGrid from '../../grid/GobackBlackGrid';
import { useNavigation } from '@react-navigation/native';
import { useRecoilState } from 'recoil';
import { myinfoState,inquiryListState } from '../../../store/atom';
import {getValidCenterName,getNoticeList,getInquiryList,postMainCenter} from '../../../api/mypageApi';
import { Alert,ScrollView, Platform } from 'react-native';
import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import MyInquiryList from '../../grid/MyInquiryList';
import MyNoticeList from '../../grid/MyNoticeList';
import CenterPicker from '../../ui/custom/CenterPicker';
import SelectPicker from '../../ui/custom/SelectPicker';
import MyCenterSelectPicker from '../../ui/custom/MyCenterSelectPicker';

function CenterMarkTemplate(props) {

    const navigation = useNavigation();

    const [myInfo, setMyInfo] = useRecoilState(myinfoState);
    const [noticeList, setNoticeList] = useState([]);
    const [inquiryList, setInquiryList] = useRecoilState(inquiryListState);

    const [showPicker, setShowPicker] = useState(false);
    const [centerName, setCenterName] = useState([]);

    const getNoticeListData = async () => {
        try {
            const response = await getNoticeList();
            setNoticeList(response.content);
            // console.log('response@@',response.content)
        } catch (error) {
            console.error('Error getting!@:', error.response.data);
        }
    };

    const getInquiryListData = async (id) => {
        console.log('id값',id)
        try {
            if(id){

                const response = await getInquiryList(id);
                setInquiryList(response.content);
            }else{
                return;
            }
            // console.log('response@@@',response)
        } catch (error) {
            console.error('Error getting!!:', error);
        }
    };

    const getValidCenterNameData = async () => {
        try {
            const response = await getValidCenterName();
            console.log('response@@@',response)
            setCenterName(response);
        } catch (error) {
            console.error('Error getting:', error);
        }
    };

    const postMainCenterData = async (id, name) => {
        console.log('fdGhkrd확인용',id,name)
        try {
            const response = await postMainCenter(id);
            if(response){
                setMyInfo({...myInfo, mainCenterId:id ,mainCenter: name});
                Alert.alert('센터변경 완료', '메인센터가 변경되었습니다', [
                    {text: '확인', onPress: () => setShowPicker(false)},
                    ]);
            }else{
                Alert.alert('센터변경 실패', '다시한번 확인해주세요.');
            }
        }catch(error){
            console.error('error:', error);
            Alert.alert('에러', '센터 변경에 실패했습니다.');
        }
    }
    console.log('myInfo',myInfo)

    // useEffect(() => {
    //     myInfo.mainCenterId &&
    //     getNoticeListData();
    //     getInquiryListData(myInfo.mainCenterId);
    //     getValidCenterNameData()
    // }, [myInfo]);

    useFocusEffect(
        useCallback(() => {
            myInfo.mainCenterId &&
            getNoticeListData();
            getInquiryListData(myInfo.mainCenterId);
            getValidCenterNameData()
        },[myInfo]));


    const goBackScreens = () => {
        navigation.goBack();
    };

    console.log('centerNamecenterName',centerName)
    const rightIcon = require('../../../assets/img/rightIcon.png');


    return (
        <Container>
            <BackgroundWrapper isTrue={showPicker}>

            <BackbtnContainer>
            <GobackBlackGrid onPress={goBackScreens}/>
            </BackbtnContainer>
            </BackgroundWrapper>
            <ScrollView
            >
              
                <SettingListBtnFirst>
                    <SettingListText>대표 센터</SettingListText>


                    {/* <FirstSettingContainer
                    onPress={() => setShowPicker(true)}
                    >
                      <SettingSubText>{myInfo?.mainCenter ? myInfo.mainCenter : "내 센터 등록하기"}</SettingSubText>
                    <SettingListRightIcon source={rightIcon}/>
                    </FirstSettingContainer> */}
                    <MyCenterSelectPicker 
                    mainCenter={myInfo?.mainCenter}
                    mainCenterId={myInfo?.mainCenterId}
                    centerName={centerName}
                    postMainCenterData={postMainCenterData}
                    />

                </SettingListBtnFirst>


                <MyNoticeList noticeList={noticeList}/>
                <MyInquiryList inquiryList={inquiryList} centerId={myInfo.mainCenterId}/>

                {/* <NoListContainer>
                    <NoListText>등록된 센터가 없습니다</NoListText>
                </NoListContainer> */}
            </ScrollView>
            {
          showPicker && (

        // <MyCenterSelectPicker 
        // centerOptions={centerName?.map(center => ({ label: center.name, value: center.id }))}
        // onCenterSelect={(selectedCenterId) => {
        // postMainCenterData(selectedCenterId);
        // setShowPicker(false);
        // }}
        // />

          <CenterPicker 
          centerName={centerName}
          setShowPicker={setShowPicker}
          setMyInfo={setMyInfo}
          postMainCenterData={postMainCenterData}
          />
          )}
        </Container>
    );
}

export default CenterMarkTemplate;

const Container = styled.View`
  flex: 1;
  /* padding: 0 20px; */
  background-color: ${COLORS.white};
`;

const BackgroundWrapper = styled.TouchableOpacity`
    width: 100%;
    height: 18%;
    /* background-color: ${COLORS.white}; */
    background-color: ${props => props.isTrue ? 'rgba(0, 0, 0, 0)' : COLORS.white};
    z-index: 50;
`

const BackbtnContainer = styled.TouchableOpacity`
  /* padding: 0 20px; */
position: absolute;
/* top: 85px; */
/* height: 56px; */
top: ${Platform.OS === 'ios' ? '85px' : '56px'};
left: 20px;
`;

const SettingListBtnFirst = styled.View`
/* margin-top: ${Platform.OS === 'ios' ? '140px' : '110px'}; */
  padding: 0 20px;
   flex-direction: row;
    justify-content: space-between;
    align-items: center;
   /* margin-top: 33px; */
`

    
const SettingListText = styled.Text`
font-size: 16px;
color: ${COLORS.sub};
font-weight: 500;
line-height: 22.40px;
`
    
const SettingListRightIcon = styled.Image`
    width: 20px;
    height: 20px;
`

const FirstSettingContainer = styled.TouchableOpacity`
flex-direction: row;
align-items: center;
justify-content: center;
`

const SettingSubText = styled.Text`
font-size: 14px;
color: ${COLORS.gray_400};
font-weight: 500;
line-height: 22.40px;
margin-right: 8px;
`

const NoListContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    margin-bottom: 100px;
`

const NoListText = styled.Text`
    font-size: 16px;
    font-weight: 500;
    line-height: 22.40px;
    color: ${COLORS.gray_300};
`