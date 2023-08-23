import {Image , ScrollView} from 'react-native';
import { styled } from 'styled-components/native';
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

import { useState ,useRef, useEffect} from 'react';
import BasicNpremiumCardGrid from '../../grid/BasicNpremiumCardGrid';
import MonthTicketGrid from '../../grid/MonthTicketGrid';
import PtUserListGrid from '../../grid/PtUserListGrid';
import { getDetailSearchCenter,getTicketType } from '../../../api/homeApi';

import { useRecoilState } from 'recoil';
import { detailCenterState } from '../../../store/atom';

function DetailCenterTemplate({ route }) {
    const { id } = route.params;
    const scrollViewRef = useRef(null);
    const [btnName, setBtnName] = useState('');
    const [selectedCard, setSelectedCard] = useState(0);
    const [selectedMonthCard, setSelectedMonthCard] = useState(0);
    const [activeButton, setActiveButton] = useState('');

    const [detailData, setDetailData] = useRecoilState(detailCenterState);

    const handleBtnPress = async(id, name) => {
        setBtnName(name);

        try {
          console.log('id', name)
          const response = await getTicketType(id, name);
          console.log('response', response)
        } catch (error) {
          console.error("Error fetching search", error);
          // 적절한 에러 처리 로직
        }
    };

    const navigation = useNavigation();

    const goBackScreens = () => {
        navigation.goBack();
    };

    const goConsultingScreens = () => {
        navigation.navigate('Consulting');
    };

    const goSetSubscribeState = () => {
        setBtnName('SUBSCRIBE');
        setActiveButton('SUBSCRIBE');
        scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
    }

    const goSubcribePriceScreens = () => {
        navigation.navigate('Subscribe');
    };

    const goPtUserListPriceScreens = () => {
        navigation.navigate('PT');
    };
  

    const goUseTicketPriceScreens = () => {
        navigation.navigate('Use');
    };

    const handleUserClick = (id) => {
      console.log('id', id)
      navigation.navigate('PtDetail', {id: id})
  }


      const getDetailCenterData = async (id) => {
        try {
          console.log('id', id)
          const response = await getDetailSearchCenter(id);
          setDetailData(response);
        } catch (error) {
          console.error("Error fetching search", error);
          // 적절한 에러 처리 로직
        }
      };
      
      useEffect(() => {
        getDetailCenterData(id)
      }, []);

    const testImg = require('../../../assets/img/detailTest.png');
    const backArrow = require('../../../assets/img/back_arrow.png');

    const ticketData = [
        {
            id: 0,
            title: 'Basic',
            contents : '선택한 센터에서만 사용가능',
            price: '30,000',
        },
        {
            id: 1,
            title: 'Premium',
            contents : '모든 센터 사용 가능',
            price: '119,000',
        },
    ]

    const monthTicketData = [
        {
            id: 0,
            title: '1개월 이용권',
            price: '70,000',
        },
        {
            id: 1,
            title: '3개월 이용권',
            price: '210,000',
        },
        {
            id: 2,
            title: '6개월 이용권',
            price: '420,000',
        },
        {
            id: 3,
            title: '12개월 이용권',
            price: '840,000',
        },
        {
            id: 4,
            title: '4개월 이용권+PT 이용권',
            price: '5,000,000',
        }
    ]


    return (
        <Container>
            <ScrollView
            ref={scrollViewRef}
              bounces={false}
         
              showsVerticalScrollIndicator={false}
              overScrollMode="never"
            >
              {
                detailData.images?.length === 0 ? (
                  <MainImg source={testImg}
                  resizeMode="cover"
                  />
                ):(
                  <MainImg source={{uri:detailData.mainImage}}
                   resizeMode="cover"
                   />
                )
              }
            <GobackTouchable onPress={goBackScreens}>
            <Image source={backArrow}/>
            </GobackTouchable>

            <GymBasicInfoGrid 
            onPress={goConsultingScreens}
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
          ticketData={ticketData} 
          selectedCard={selectedCard}
          setSelectedCard={setSelectedCard}
          />
        )}

        {btnName === 'PT' && (
          <PtUserListGrid 
          handleUserClick={handleUserClick}
          />
        )}

        {btnName === 'TICKET' && (
          <MonthTicketGrid 
          monthTicketData={monthTicketData} 
          selectedMonthCard={selectedMonthCard}
          setSelectedMonthCard={setSelectedMonthCard}
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

        {btnName === 'SUBSCRIBE' && (
          <ActiveMainBtn
            onPress={goSubcribePriceScreens}
          >구독하기</ActiveMainBtn>
        )}

        {btnName === 'PT' && (
          <ActiveMainBtn
            onPress={goConsultingScreens}
          >P.T 상담하기</ActiveMainBtn>
        )}

        {btnName === 'TICKET' && (
          <ActiveMainBtn
            onPress={goUseTicketPriceScreens}
          >구매하기</ActiveMainBtn>
        )}

        {btnName !== 'SUBSCRIBE' && btnName !== 'PT' && btnName !== 'TICKET' && (
          <ActiveMainBtn
          onPress={goSetSubscribeState}
          >이용하기</ActiveMainBtn>
        )}


        </ScrollView>
        </Container>
    );
}

export default DetailCenterTemplate;


const Container = styled.View`
    flex: 1;
    background-color: ${COLORS.sub};
    /* padding: 0 20px; */
`


const MainImg = styled.Image`
    width: 100%;
    height: 310px;
`

const GobackTouchable = styled.TouchableOpacity`
position: absolute;
top: 56px;
left: 20px;
`;
