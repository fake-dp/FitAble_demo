import { styled } from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import GobackBlackGrid from '../../grid/GobackBlackGrid';
import { useNavigation } from '@react-navigation/native';
import {ActivityIndicator, View} from 'react-native';
import MileageList from '../../ui/list/MileageList';
import { FlatList } from 'react-native';
import { useState,useEffect } from 'react';
import { getMileages } from '../../../api/mypageApi';
import FastImage from 'react-native-fast-image'

function MileageTemplate(props) {
    
    const navigation = useNavigation();

    const [mileageList, setMileageList] = useState([]); // 마일리지 내역
    const [totalMileage, setTotalMileage] = useState(0); // 총 마일리지
    const [loading, setLoading] = useState(true);
    const goBackScreens = () => {
        navigation.goBack();
    };


    const close = require('../../../assets/img/close.png');



    const getMilagesData = async () => {
        try{

            const response = await getMileages();
            setMileageList(response.mileageHistories.content);
            setTotalMileage(response.totalMileage);
        } catch (error) {
            console.error('Error getting:', error);
        } finally {
            setLoading(false);
    }
}





    useEffect(() => {
        getMilagesData();
    },[])



    // if (loading) {
    //     return (
    //       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:COLORS.white }}>
    //         <ActivityIndicator size="large" color={COLORS.sub} />
    //       </View>
    //     );
    //   }


    return (
        <Container>
               {loading && (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.white }}>
                    <ActivityIndicator size="large" color={COLORS.sub} />
                </View>
            )}
            <CloseBtn onPress={goBackScreens}>
            <CloseImg source={close}/>
            </CloseBtn>

            <PriceText>{totalMileage.toLocaleString()}원</PriceText>
            <TitleText>핏에이블 마일리지</TitleText>

            <GridLine />

                <ListTitleText>내역</ListTitleText>
                {
                mileageList.length === 0 ?(
                    <NoListContainer>
                        <NoListText>마일리지 내역이 없습니다</NoListText>
                    </NoListContainer>
                 ):null
                 }
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

const CloseImg = styled(FastImage)`
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

const NoListContainer = styled.View`
    /* margin-top: 120px; */
    justify-content: center;
    align-items: center;
    flex:1;
    /* height: 100%; */
`

const NoListText = styled.Text`
color: ${COLORS.gray_400};
font-size: 16px;
font-weight: 500;
line-height: 22.40px;
`