import {Button, Image , ScrollView} from 'react-native';
import { styled } from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import { useNavigation } from '@react-navigation/native';
import LongTextGrid from '../../grid/LongTextGrid';
import { useState ,useRef,useEffect} from 'react';
import GymPtBasicInfoGrid from '../../grid/GymPtBasicInfoGrid';
import PtCareerGrid from '../../grid/PtCareerGrid';
import PtCardListGrid from '../../grid/PtCardListGrid';
import { useRecoilState } from 'recoil';
import {ptState, centerIdState } from '../../../store/atom';
import { useRoute } from '@react-navigation/native';
import { getDetailTrainers} from '../../../api/homeApi';
function DetailPtTemplate() {
    const route = useRoute();
    const id = route.params.id;
    console.log('Received id:', id);
    const scrollViewRef = useRef(null);


    const [selectedCard, setSelectedCard] = useState(0);
    const [ptData, setPtData] = useRecoilState(ptState);
    const [centerId, setCenterId] = useRecoilState(centerIdState);
    const [detailTrainersData, setDetailTrainersData] = useState([]);
    console.log('reciveve',id, '센터아이디',centerId)
 
    const navigation = useNavigation();

    const goBackScreens = () => {
        navigation.goBack();
    };

    const goConsultingScreens = () => {
        navigation.navigate('Consulting');
    };

    const goPtPriceScreens = () => {
        navigation.navigate('PT');
    };

    const getDetailTrainersData = async ( centerId, id) => {
        try {
            const response = await getDetailTrainers(centerId,id);
            setDetailTrainersData(response);
        } catch (error) {
            console.error('Error getting home banners:', error.response.config.headers); // 에러 로깅
        }
    };

    useEffect(() => {
        getDetailTrainersData(centerId,id);
    }, []);


    const testImg = require('../../../assets/img/testptuserimgbig.png');
    const backArrow = require('../../../assets/img/back_arrow.png');

   console.log('detailTrainersData',detailTrainersData.career)
            const {career, qualifications,description} = detailTrainersData;

    return (
        <Container>
            <ScrollView
              ref={scrollViewRef}
              bounces={false}
         
              showsVerticalScrollIndicator={false}
              overScrollMode="never"
            >
            <TestImg source={testImg}/>
            <GobackTouchable onPress={goBackScreens}>
            <Image source={backArrow}/>
            </GobackTouchable>


            <GymPtBasicInfoGrid 
            detailTrainersData={detailTrainersData}
            />



            {
            description &&   <LongTextGrid description={detailTrainersData.description}/>
            }
            {
            career && qualifications &&  <PtCareerGrid detailTrainersData={detailTrainersData}/>
            }

           

            <PtCardListGrid 
                ptTicketData={ptData}
                selectedCard={selectedCard}
                setSelectedCard={setSelectedCard}
            />


        <BtnContainer>
        <ConsultingBtn onPress={goConsultingScreens} >
            <ConsultingBtnText>상담하기</ConsultingBtnText>
        </ConsultingBtn>

        <ParchaseBtn onPress={goPtPriceScreens}>
            <ParchaseBtnText>구매하기</ParchaseBtnText>
        </ParchaseBtn>
        </BtnContainer>


        </ScrollView>
        </Container>
    );
}

export default DetailPtTemplate;


const Container = styled.View`
    flex: 1;
    background-color: ${COLORS.sub};
    /* padding: 0 20px; */
`


const TestImg = styled.Image`
    width: 100%;
`

const GobackTouchable = styled.TouchableOpacity`
position: absolute;
top: 56px;
left: 20px;
`;


const BtnContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    padding: 28px 20px;
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