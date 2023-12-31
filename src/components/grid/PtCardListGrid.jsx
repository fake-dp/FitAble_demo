import {TouchableOpacity} from 'react-native';
import { styled } from 'styled-components/native';
import { COLORS } from '../../constants/color';
import PtPriceCard from '../ui/card/PtPriceCard';

function PtCardListGrid({ptTicketData,selectedPtCardInfo ,getPtDataBtn}) {
// console.log('selectedPtCardInfoselectedPtCardInfo',selectedPtCardInfo)
    return (
        <Container>
            <ContainerLine/>
            <MainTitleText>P.T</MainTitleText>
            {
                ptTicketData.tickets.map((item, index) => {
                    const isSelected = selectedPtCardInfo.id === item.id.toString();
                    return (
                        <TouchableOpacity
                        key={index}
                         onPress={() => getPtDataBtn(item.id)}>
                        <PtPriceCard
                        key={index}
                        ptTicketData={item}
                        isSelected={isSelected}
                        />
                        </TouchableOpacity>
                    )
                }
                )
            }
            <SubText>{ptTicketData.description}</SubText>
        </Container>
    );
}

export default PtCardListGrid;

const Container = styled.View`
    padding: 0 20px;
`

const ContainerLine = styled.View`
     border-top-width: 1px;
    border-top-color: ${COLORS.gray_500};
    padding: 0 20px;
    margin-bottom: 40px;
`

const MainTitleText = styled.Text`
font-size: 20px;
font-weight: 700;
line-height: 30px;
color: ${COLORS.white};
margin-bottom: 18px;
`

const SubText = styled.Text`
    font-size: 14px;
font-weight: 400;
line-height: 22.40px;
color: ${COLORS.gray_300};
`