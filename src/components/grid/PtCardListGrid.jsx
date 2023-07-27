import {TouchableOpacity} from 'react-native';
import { styled } from 'styled-components/native';
import { COLORS } from '../../constants/color';
import PtPriceCard from '../ui/card/PtPriceCard';

function PtCardListGrid({ptTicketData,selectedCard ,setSelectedCard}) {
    return (
        <Container>
            <ContainerLine/>
            <MainTitleText>P.T</MainTitleText>
            {
                ptTicketData.map((item, index) => {
                    const isSelected = selectedCard === index;
                    return (
                        <TouchableOpacity
                        key={index}
                         onPress={() => setSelectedCard(index)}>
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