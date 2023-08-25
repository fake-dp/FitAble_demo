import { styled } from 'styled-components/native';
import MonthTicketCard from '../ui/card/MonthTicketCard';
import { COLORS } from '../../constants/color';
import {TouchableOpacity} from 'react-native';

function MonthTicketGrid({ticketData, selectedMonthCard, setSelectedMonthCard}) {
    return (
        <Container>
            {
                ticketData.tickets.map((item, index) => {
                    const isSelected = selectedMonthCard === index;
                    return (
                        <TouchableOpacity
                        key={index}
                         onPress={() => setSelectedMonthCard(index)}>
                        <MonthTicketCard
                            key={index}
                            name={item.name}
                            price={item.price}
                            type={item.type}
                            isSelected={isSelected}
                        />
                        </TouchableOpacity>
                    )
                }
                )
            }
            <SubTextContainer>
            <SubText>{ticketData?.description}</SubText>
            </SubTextContainer>
            <ContainerLine />
        </Container>
    );
}

export default MonthTicketGrid;

const Container = styled.View`
 padding: 0 20px;
 margin-top: 30px;
`

const SubTextContainer = styled.View`
    margin-top:28px;
`

const SubText = styled.Text`
    font-size: 14px;
font-weight: 400;
line-height: 22.40px;
color: ${COLORS.gray_300};
`

const ContainerLine = styled.View`
     border-top-width: 1px;
    border-top-color: ${COLORS.gray_500};
    padding: 0 20px;
    margin-top: 30px;
    /* margin-bottom: 40px; */
`