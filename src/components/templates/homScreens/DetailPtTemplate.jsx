import {Button, Image , ScrollView} from 'react-native';
import { styled } from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import { useNavigation } from '@react-navigation/native';
import LongTextGrid from '../../grid/LongTextGrid';
import { useState ,useRef,useCallback} from 'react';
import GymPtBasicInfoGrid from '../../grid/GymPtBasicInfoGrid';
import PtCareerGrid from '../../grid/PtCareerGrid';
import PtCardListGrid from '../../grid/PtCardListGrid';
import { useRecoilState } from 'recoil';
import {ptState, centerIdState,selectedPtCardId } from '../../../store/atom';
import { useRoute } from '@react-navigation/native';
import { getDetailTrainers} from '../../../api/homeApi';
import PtSwiperBanner from '../../ui/banner/PtSwiperBanner';
import { useFocusEffect } from '@react-navigation/native';
function DetailPtTemplate() {
    const route = useRoute();
    const id = route.params.id;
    // console.log('Received id:', id);
    const scrollViewRef = useRef(null);
    const [selectedPtCardInfo, setSelectedPtCardInfo] = useRecoilState(selectedPtCardId);

    const [ptData, setPtData] = useRecoilState(ptState);
    const [centerId, setCenterId] = useRecoilState(centerIdState);
    const [detailTrainersData, setDetailTrainersData] = useState([]);
    // console.log('reciveve',id, '센터아이디',centerId,detailTrainersData.images)
 
    const navigation = useNavigation();

    const goBackScreens = () => {
        navigation.goBack();
    };


    const goConsultingScreens = (centerId,  trainerId, selectedName) => {
        navigation.navigate('Consulting',{ centerId, trainerId, selectedName});
    };

    const goPtPriceScreens = () => {
        navigation.navigate('PT', {data:selectedPtCardInfo,images});
    };

    const getDetailTrainersData = async ( centerId, id) => {
        try {
            const response = await getDetailTrainers(centerId,id);
            setDetailTrainersData(response);
        } catch (error) {
            // console.log('id확인',id, '센터아이디',centerId)
            console.error('Error getting:', error); // 에러 로깅
        }
    };

      // pt 카드 데이터 넘기는 버튼
      const getPtDataBtn = (id) =>{
        setSelectedPtCardInfo({id})
      }



    useFocusEffect(
        useCallback(() => {
            getDetailTrainersData(centerId,id);
        },[]));


    const testImg = require('../../../assets/img/testptuserimgbig.png');
    const backArrow = require('../../../assets/img/back_arrow.png');

//    console.log('detailTrainersData',detailTrainersData.career)
    const {career, qualifications,description,images} = detailTrainersData;
    // console.log('test22',detailTrainersData)
    return (
        <Container>
            <GobackTouchable onPress={goBackScreens}>
            <BackArrow source={backArrow}/>
            </GobackTouchable>
            <ScrollView
              ref={scrollViewRef}
              bounces={false}
              showsVerticalScrollIndicator={false}
              overScrollMode="never"
            >
            {
                images&&images.length>0 ? (
                    <PtSwiperBanner images={images}/>
                ):(
                    <Image source={testImg}/>
                )
            }
           
            <GymPtBasicInfoGrid 
            detailTrainersData={detailTrainersData}
            centerId={centerId}
            id={id}
            />

            {description && <LongTextGrid description={detailTrainersData.description}/>}
            {career && qualifications &&  <PtCareerGrid detailTrainersData={detailTrainersData}/>}

            <PtCardListGrid 
                ptTicketData={ptData}
                selectedPtCardInfo={selectedPtCardInfo}
                getPtDataBtn={getPtDataBtn}
            />
        </ScrollView>
        <StickyBtnContainer>

<BtnContainer>
<ConsultingBtn onPress={()=>goConsultingScreens(centerId,id,detailTrainersData.name )}>
    <ConsultingBtnText>상담하기</ConsultingBtnText>
</ConsultingBtn>

<ParchaseBtn onPress={goPtPriceScreens}>
    <ParchaseBtnText>구매하기</ParchaseBtnText>
</ParchaseBtn>
</BtnContainer>
    </StickyBtnContainer>
    </Container>
    );
}

export default DetailPtTemplate;


const Container = styled.View`
    flex: 1;
    background-color: ${COLORS.sub};
    /* padding: 0 20px; */
`

const BackArrow = styled.Image`
    margin: 56px 0 11px 20px;
`

const TestImg = styled.Image`
    width: 100%;
`

const GobackTouchable = styled.TouchableOpacity`
`;


const BtnContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-top: 20px;
    /* padding: 28px 20px; */
`

const StickyBtnContainer = styled.View`
    position: sticky;
    bottom: 10px;
    width: 100%;
    padding: 0 20px;
    margin-bottom: 10px;
    margin-top: 10px;
`

const ConsultingBtn = styled.TouchableOpacity`
    width: 48%;
    height: 60px;
    background-color: ${COLORS.box};
    justify-content: center;
    align-items: center;
    border-radius: 90px;
`

const ConsultingBtnText = styled.Text`
    color: ${COLORS.white};
    font-size: 16px;
    font-weight: 700;

`

const ParchaseBtn = styled.TouchableOpacity`
    width: 48%;
    height: 60px;
    background-color: ${COLORS.main};
    justify-content: center;
    align-items: center;
    border-radius: 90px;
`

const ParchaseBtnText = styled.Text`
    color: ${COLORS.sub};
    font-size: 16px;
    font-weight: 700;
`