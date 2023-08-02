import { styled } from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import {Image , ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GobackGrid from '../../grid/GobackGrid';
import ConsultingLabelGrid from '../../grid/ConsultingLabelGrid';

import {consultingListData} from '../../../data/ConsultingData';
import ConsultBigBtn from '../../ui/buttonUi/ConsultBigBtn';
function ConsultingTemplate(props) {

    const navigation = useNavigation();

    const goBackScreens = () => {
        navigation.goBack();
    };



    return (
        <Container>
            <ScrollView
              bounces={false}
              showsVerticalScrollIndicator={false}
              overScrollMode="never"
            >
            <GobackGrid onPress={goBackScreens}>상담하기</GobackGrid>

            <ConsultingLabelGrid 
                consultingListData={consultingListData}
            />

            <ConsultBigBtn>상담요청</ConsultBigBtn>

            </ScrollView>
        </Container>
    );
}

export default ConsultingTemplate;

const Container = styled.View`
    flex:1;
    padding: 0 20px;
    background-color: ${COLORS.sub};
`