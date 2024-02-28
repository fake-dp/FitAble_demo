import {Alert, Image , ScrollView} from 'react-native';
import styled from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import { useNavigation } from '@react-navigation/native';
import GymBasicInfoGrid from '../../grid/GymBasicInfoGrid';
import ThreeBtnGrid from '../../grid/ThreeBtnGrid';
import OperatingProgram from '../../grid/OperatingProgram';
import OperatingTime from '../../grid/OperatingTime';
import FacilitiesGrid from '../../grid/FacilitiesGrid';
import PhotoScrollGrid from '../../grid/PhotoScrollGrid';

import ActiveMainBtn from '../../ui/buttonUi/ActiveMainBtn';
import AboutChannel from '../../grid/AboutChannel';
import LongTextGrid from '../../grid/LongTextGrid';
import ShopTagGrid from '../../grid/ShopTagGrid';
import { useFocusEffect } from '@react-navigation/native';
import { useState ,useRef, useCallback} from 'react';
import BasicNpremiumCardGrid from '../../grid/BasicNpremiumCardGrid';
import MonthTicketGrid from '../../grid/MonthTicketGrid';
import PtUserListGrid from '../../grid/PtUserListGrid';
import { getDetailSearchCenter,getTicketType ,getTrainers ,getTrainersName} from '../../../api/homeApi';

import { useRecoilState } from 'recoil';
import { detailCenterState,ticketState,ptState ,subscribeState ,centerIdState,
  threeBtnState,selectedPtCardId,selectedSubCardId,selectedUseCardId } from '../../../store/atom';
import CustomPicker from '../../../components/ui/custom/Picker';
import FastImage from 'react-native-fast-image'

function DetailCenterTemplate({ route }) {
    const { id } = route.params;
    const scrollViewRef = useRef(null);
    const [btnName, setBtnName] = useRecoilState(threeBtnState);
    // const [selectedCard, setSelectedCard] = useState(0);
    // const [selectedMonthCard, setSelectedMonthCard] = useState(0);
    const [activeButton, setActiveButton] = useState('');

    const [detailData, setDetailData] = useRecoilState(detailCenterState);
    const [subscribeData, setSubscribeData] = useRecoilState(subscribeState);
    const [ticketData, setTicketData] = useRecoilState(ticketState);
    const [ptData, setPtData] = useRecoilState(ptState);
    const [centerId, setCenterId] = useRecoilState(centerIdState);
    const [trainersData, setTrainersData] = useState([]);

    const [selectedCardInfo, setSelectedCardInfo] = useRecoilState(selectedSubCardId);
    const [selectedUseCardInfo, setSelectedUseCardInfo] = useRecoilState(selectedUseCardId);
    const [selectedPtCardInfo, setSelectedPtCardInfo] = useRecoilState(selectedPtCardId);
    // 피커 & 트레이너 이름 조회 상태
    const [trainerName, setTrainerName] = useState('');
    const [showPicker, setShowPicker] = useState(false);
  console.log('detailDatadetailData',detailData.subscription,detailData.pt,detailData.ticket)
    const handleBtnPress = async(id, name) => {
        setBtnName(name);
        setCenterId(id);
        try {
          console.log('id',id, name)
          const response = await getTicketType(id, name);
        
          if (name === 'SUBSCRIBE') {
            setSubscribeData(response);
            setSelectedCardInfo({id:response.tickets[0].id})
          } else if (name === 'PT') {
            setPtData(response);
            setSelectedPtCardInfo({id:response.tickets[0].id})
          } else if (name === 'TICKET') {
            setTicketData(response);
            setSelectedUseCardInfo({id:response.tickets[0].id})
          }
        } catch (error) {
          // 에러 처리
        }
    };
  
    const navigation = useNavigation();

    const goBackScreens = () => {
        setBtnName('');
        setActiveButton('');
        navigation.goBack();
    };

    const goConsultingScreens = (id) => {
        navigation.navigate('Consulting', {centerId: id});
    };

    const getTrainersNameData = async (id) => {
      try {
        // console.log('id', id)
        const response = await getTrainersName(id);
        setTrainerName(response);
        setShowPicker(true);
      } catch (error) {
        console.error("Error fetching search", error);
        // 적절한 에러 처리 로직
      }
    };

    const handleTypeDetail = () => {
 console.log('btnName',btnName)
        if (detailData.subscription) {
          handleBtnPress(id, 'SUBSCRIBE');
          setBtnName('SUBSCRIBE');
          setActiveButton('SUBSCRIBE');
      } else if (detailData.pt) {
          handleBtnPress(id, 'PT');
          setBtnName('PT');
          setActiveButton('PT');
      } else if (detailData.ticket) {
          handleBtnPress(id, 'TICKET');
          setBtnName('TICKET');
          setActiveButton('TICKET');
      } else {
        Alert.alert('이용권을 준비하고 있습니다');
      }

        scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
    }
    // selectedCardState
    const goSubcribePriceScreens = () => {
      console.log('selectedCardInfo',selectedCardInfo)
        navigation.navigate('Subscribe',{data:selectedCardInfo});
    };

    const goUseTicketPriceScreens = () => {
        navigation.navigate('Use',{data:selectedUseCardInfo});
    };

    const handleUserClick = (id) => {
      // console.log('id@@@@@센터 아이디',id )
      navigation.navigate('PtDetail', {id})
  }


      const getDetailCenterData = async (id) => {
        try {
          // console.log('id', id)
          const response = await getDetailSearchCenter(id);
          setDetailData(response);
        } catch (error) {
          console.error("Error fetching search", error);
          // 적절한 에러 처리 로직
        }
      };

      const getTrainerData = async (id) => {
        try {
          // console.log('id', id)
          const response = await getTrainers(id);
          setTrainersData(response);
        } catch (error) {
          console.error("Error fetching search", error);
          // 적절한 에러 처리 로직
        }
      };


      // 구독 카드 데이터 넘기는 버튼
      const getSubscribeDataBtn = (id) =>{
        setSelectedCardInfo({id})
      }

      // 이용 카드 데이터 넘기는 버튼
      const getUseCardDataBtn = (id) =>{
        setSelectedUseCardInfo({id})
      }
      

      useFocusEffect(
        useCallback(() => {
          getDetailCenterData(id)
          getTrainerData(id)
          return () => {
            setBtnName('');
            setActiveButton('');
        };
        },[]));

    const notImg = require('../../../assets/img/notDetailImg.png');
    const backArrow = require('../../../assets/img/back_arrow.png');
    const testArrow = require('../../../assets/img/back_black.png');

  console.log('selectedCard@@',selectedCardInfo,selectedUseCardInfo)
        console.log('detailData',detailData)
    return (
        <Container>
            <ScrollView
              ref={scrollViewRef}
              bounces={false}
              showsVerticalScrollIndicator={false}
              overScrollMode="never"
            >
              {
                detailData?.mainImage ? (
                  <ImgContainer>
                  <MainImg 
                  resizeMode={FastImage.resizeMode.contain}
                  source={{uri:detailData?.mainImage}}/>
                  </ImgContainer>
                  ):(
                    <ImgContainer>
                      <NoImg source={notImg}/>
                    </ImgContainer>
                )
              }
            <GobackTouchable onPress={goBackScreens}>
            <FastImage 
            style={{width: 28, height: 28}}
            source={backArrow} 
            resizeMode={FastImage.resizeMode.contain}
            />
   
            </GobackTouchable>

            <GymBasicInfoGrid 
            onPress={()=>goConsultingScreens(id)}
            name={detailData.name}
            address={detailData.address}
            phone={detailData.phone}
            />


              <ThreeBtnGrid
              onPressSubscribe={() => handleBtnPress(id,'SUBSCRIBE')}
              onPressPT={() => handleBtnPress(id,'PT')}
              onPressUse={() => handleBtnPress(id,'TICKET')}
              setActiveButton={setActiveButton}
              activeButton={activeButton}
              subscription={detailData.subscription}
              pt={detailData.pt}
              ticket={detailData.ticket}
            />
      
     

        
        {btnName === 'SUBSCRIBE' && (
          <BasicNpremiumCardGrid 
          subscribeData={subscribeData} 
          selectedCardInfo={selectedCardInfo}
          getSubscribeDataBtn={getSubscribeDataBtn}
          />
        )}

        {btnName === 'PT' && (
          <PtUserListGrid 
          handleUserClick={handleUserClick}
          ptData={ptData}
          trainersData={trainersData}
          />
        )}

        {btnName === 'TICKET' && (
          <MonthTicketGrid 
          ticketData={ticketData} 
          selectedUseCardInfo={selectedUseCardInfo}
          getUseCardDataBtn={getUseCardDataBtn}
          />
        )}

        {btnName !== 'PT' && (
        
        <>
        {detailData.description && (<LongTextGrid description={detailData.description} />)}
        {detailData.tags?.length > 0 && (<ShopTagGrid tags={detailData.tags}/>)}
        {detailData.programs?.length > 0 && (<OperatingProgram programs={detailData.programs}/>)}
        {detailData.operationTimes?.length > 0 && (<OperatingTime operationTimes={detailData.operationTimes}/>)}
        {detailData.facilities?.length > 0 && (<FacilitiesGrid facilities={detailData.facilities}/>)}
        {detailData.images?.length > 0 && (<PhotoScrollGrid images={detailData.images}/>)}
           {
             detailData.links?.homepage && detailData.links?.instagram && detailData.links?.kakao && detailData.links?.blog && (   
             <AboutChannel
             homepage={detailData.links?.homepage}
             instagram={detailData.links?.instagram}
             kakao={detailData.links?.kakao}
             blog={detailData.links?.blog}
             />)
           }
            </>
        )}
        </ScrollView>
        <StickyBtnContainer>
        {btnName === 'SUBSCRIBE' && (
          <ActiveMainBtn
            onPress={goSubcribePriceScreens}
            btnName={btnName}
          >구독하기</ActiveMainBtn>
        )}

        {btnName === 'PT' && (
          <ActiveMainBtn
            onPress={()=>getTrainersNameData(id)}
            btnName={btnName}
          >P.T 상담하기</ActiveMainBtn>
        )}

        {btnName === 'TICKET' && (
          <ActiveMainBtn
            onPress={goUseTicketPriceScreens}
            btnName={btnName}
          >구매하기</ActiveMainBtn>
        )}

        {btnName !== 'SUBSCRIBE' && btnName !== 'PT' && btnName !== 'TICKET' && (
          <ActiveMainBtn
          onPress={handleTypeDetail}
          // btnName={id}
          >이용하기</ActiveMainBtn>
        )}
         </StickyBtnContainer>
         {
          showPicker && (
            <CustomPicker
            trainerName={trainerName}
            centerId={id}
            setShowPicker={setShowPicker}
            />)
        }
        </Container>
    );
}

export default DetailCenterTemplate;


const Container = styled.View`
    flex: 1;
    background-color: ${COLORS.sub};
    /* padding: 0 20px; */
`
const ImgContainer = styled.View`
    width: 100%;
    height: 312px;
`

const MainImg = styled(FastImage)`
    width: 100%;
    height: 100%;
    // 중앙 정렬 비율 맞게
    
`

const NoImg = styled(FastImage)`
    width: 100%;
    height: 100%;
    /* height: 312px; */
`

const GobackTouchable = styled.TouchableOpacity`
position: absolute;
top: 56px;
left: 20px;
`;

const StickyBtnContainer = styled.View`
    position: sticky;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    margin-top: 20px;
`