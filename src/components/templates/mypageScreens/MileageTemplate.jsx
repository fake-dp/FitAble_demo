import { styled } from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import GobackBlackGrid from '../../grid/GobackBlackGrid';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';
import MileageList from '../../ui/list/MileageList';
import { FlatList } from 'react-native';
import { useState,useEffect } from 'react';
import { getMileages } from '../../../api/mypageApi';

function MileageTemplate(props) {
    
    const navigation = useNavigation();

    const [mileageList, setMileageList] = useState([]); // 마일리지 내역
    const [totalMileage, setTotalMileage] = useState(0); // 총 마일리지

    const goBackScreens = () => {
        navigation.goBack();
    };


    const close = require('../../../assets/img/close.png');



    const getMilagesData = async () => {
        const response = await getMileages();
        setMileageList(response.mileageHistories.content);
        setTotalMileage(response.totalMileage);
    }


    useEffect(() => {
        getMilagesData();
    },[])



    return (
        <Container>
            <CloseBtn onPress={goBackScreens}>
            <CloseImg source={close}/>
            </CloseBtn>

            <PriceText>{totalMileage}원</PriceText>
            <TitleText>핏에이블 마일리지</TitleText>

            <GridLine />

                <ListTitleText>내역</ListTitleText>


            <FlatList
             bounces={false}
         
             showsVerticalScrollIndicator={false}
             overScrollMode="never"
            data={mileageList}
            renderItem={({ item }) => <MileageList data={item} />}
            // keyExtractor={(item) => item.id.toString()}
        />
        </Container>
    );
}

export default MileageTemplate;

const Container = styled.View`
    flex:1;
    padding: 0 20px;
    background-color: ${COLORS.white};
`


const CloseBtn = styled.TouchableOpacity`
  align-items: flex-end;
  margin-right: 11px;
  margin-bottom: 41px;
`

const CloseImg = styled.Image`
    width: 32px;
    height: 32px;
`

const PriceText = styled.Text`
font-size: 28px;
color: ${COLORS.sub};
font-weight: 400;
line-height: 37.80px;
`
const TitleText = styled.Text`
font-size: 20px;
font-weight: 600;
line-height: 28px;
color: ${COLORS.gray_400};
`

const GridLine = styled.View`
    width: 100%;
    height: 1px;
    background-color: ${COLORS.gray_200};
    margin-bottom: 20px;
    margin-top: 36px;
`

const ListTitleText = styled.Text`
color: ${COLORS.sub};
font-size: 20px;
font-weight: 700;
line-height: 30px;
margin-bottom: 30px;
`


