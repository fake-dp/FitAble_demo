import {  Button, ScrollView, TouchableOpacity,ActivityIndicator, View } from 'react-native';
import styled from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import HomeMainBanner from '../../ui/banner/HomeMainBanner';
import HomeSubBanner from '../../ui/banner/HomeSubBanner';
import FloatingBtn from '../../ui/buttonUi/FloatingBtn';
import UserTicketCard from '../../ui/card/UserTicketCard';
import UserTicketNoneCard from '../../ui/card/UserTicketNoneCard';
import { useNavigation } from '@react-navigation/native';
import { getHomeBanners } from '../../../api/homeApi';
import {getHomeTickets,getHomeReservations}from '../../../api/lessonsApi'
import { useState, useRef,useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useRecoilState } from 'recoil';
import { homeTicketListState, homeClassListState,mainCenterIdState } from '../../../store/atom';
import LessonCard from '../../ui/card/LessonCard';

function HomeMainTemplate(props) {

    const navigation = useNavigation();
    const ticketScrollViewRef = useRef(null);
    const reservationScrollViewRef = useRef(null);
    const goDetailCenterScreen = (id) => {
      console.log('디테일로 갑니다@@!@#',mainCenterId)
        navigation.navigate('DetailCenter', {id:id});
      };

    const goSearchCenterScreen = () => {
        navigation.navigate('SearchCenter');
      }

    // 마이 페이지 이용권 목록으로 가기
    const goMyPageTicketListScreen = () => {
            console.log('이용권 목록')
        navigation.navigate('CenterTicket');
      };

    // 마이 페이지 전체 예약 목록으로 가기
    const goMyPageReservationListScreen = () => {
        navigation.navigate('MyBookList');
      };

    // 이용권 상세페이지 이동
    const detailTicketsScreen = (id) => {
      navigation.navigate('TicketDetail', {id:id})
    };

    const [fitablesBanners, setFitablesBanners] = useState([]);
    const [centersBanners, setCentersBanners] = useState([]);
    // const [mainCenterId, setMainCenterId] = useState(null);
     const [mainCenterId, setMainCenterId] = useRecoilState(mainCenterIdState);
    // 홈 회원 이용권 목록 및 예약 목록
    const [homeTicketList, setHomeTicketList] = useRecoilState(homeTicketListState);
    const [homeReservationList, setHomeReservationList] = useRecoilState(homeClassListState);
    const [loading, setLoading] = useState(true);

    const getUseHomeBanners = async () => {
        try {
          const response = await getHomeBanners();
            setFitablesBanners(response.fitables);
            setCentersBanners(response.centers);
            setMainCenterId(response.mainCenterId);
        } catch (error) {
          console.error('Error getting home banners:', error.response); // 에러 로깅
        } finally {
          setLoading(false);  // 데이터를 가져온 후에 로딩 상태를 false로 설정
      }
      };

    const getUseHomeTickets = async () => {
        try {
          const response = await getHomeTickets();
          setHomeTicketList(response);
        } catch (error) {
          console.error('Error getting home tickets:', error.response); // 에러 로깅
        }
      };

    const getUseHomeReservations = async () => {
        try {
          const response = await getHomeReservations();
          setHomeReservationList(response);
        } catch (error) {
          console.error('Error getting home reservations:', error.response); // 에러 로깅
        }
      };
console.log('mainCenterId',mainCenterId,homeReservationList)



useFocusEffect(
  useCallback(() => {
    if (ticketScrollViewRef.current) {
      ticketScrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
    }
    if (reservationScrollViewRef.current) {
      reservationScrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
    }
  }, [])
);

useFocusEffect(
  useCallback(() => {
        getUseHomeBanners();
        getUseHomeTickets();
        getUseHomeReservations();
  },[]));
 
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:COLORS.sub }}>
        <ActivityIndicator size="large" color={COLORS.main} />
      </View>
    );
  }


    return (
        <Container>
          <ScrollView
          showsVerticalScrollIndicator={false}
          overScrollMode="never"
          bounces={false}
          >
        <HomeMainBanner fitablesBanners={fitablesBanners}/>
        <SubContainer>
        <HomeSubBanner centersBanners={centersBanners}/>
        <TitleTextContainer>
        <TitleText>현재 내 이용권</TitleText>
        <AllContentsClickBox onPress={goMyPageTicketListScreen}>
        {
          homeTicketList.length !== 0 && <AllText>전체보기</AllText>
        }
        </AllContentsClickBox>
        </TitleTextContainer>
        </SubContainer>

  {
    // 센터 등록하기 이용권 없을때
    homeTicketList.length === 0 && homeReservationList.length === 0 ?
    <UserTicketNoneCard 
    onPress={goSearchCenterScreen}
    />
    :
    <>

    <ScrollView
    ref={reservationScrollViewRef}
    horizontal={true}
    bounces={false}
    showsVerticalScrollIndicator={false}
    overScrollMode="never"
    showsHorizontalScrollIndicator={false}
    >
    {homeTicketList.map((item, index) => (
        <UserTicketCard
        key={item.id}
        index={index}
        homeTicketList={item}
        detailTicketsScreen={detailTicketsScreen}
        isLast={index === homeTicketList.length - 1} 
        isMargin={homeReservationList.length > 0 ? true : false}
        />
        ))}
    </ScrollView>
{
  homeReservationList.length === 0 ? null :(
    <>
    <SubContainer>
    <TitleTextContainer>
<TitleReservationsText>예약된 운동</TitleReservationsText>
<AllContentsClickBox onPress={goMyPageReservationListScreen}>
<AllReservationText>전체보기</AllReservationText>
</AllContentsClickBox>
    </TitleTextContainer>
  </SubContainer>
<ScrollView
ref={ticketScrollViewRef}
horizontal={true}
bounces={false}
showsVerticalScrollIndicator={false}
showsHorizontalScrollIndicator={false}
overScrollMode="never">
  {
    homeReservationList.map((item, index) => (
    <LessonCard
    key={index}
    homeReservationList={item}
    />
    ))
  }
</ScrollView>
</>
  )
}
     
    </>
 }
 </ScrollView>
 {mainCenterId && (<FloatingBtn onPress={()=>goDetailCenterScreen(mainCenterId)} />)}
 </Container>
    );
}

export default HomeMainTemplate;

const Container = styled.View`
  flex: 1;
  background-color: ${COLORS.sub};
`;

const SubContainer = styled.View`
  padding: 0 20px;
  margin-top: 24px;
`;

const TitleTextContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const AllContentsClickBox = styled.TouchableOpacity`
  padding: 10px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const AllText = styled.Text`
  color: ${COLORS.gray_200};
  font-size: 12px;
  font-weight: 400;
  padding-top: 20px;
`;

const TitleText = styled.Text`
  font-size: 20px;
  font-weight: 700;
  line-height: 30px;
  color: ${COLORS.white};
  margin-top: 20px;
`;

const TitleReservationsText = styled.Text`
  font-size: 20px;
  font-weight: 700;
  line-height: 30px;
  color: ${COLORS.white};
  margin-top: 22px;
`;

const AllReservationText = styled.Text`
  color: ${COLORS.gray_200};
  font-size: 12px;
  font-weight: 400;
  margin-top: 40px;
`;
