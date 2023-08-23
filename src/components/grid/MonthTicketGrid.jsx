import { styled } from 'styled-components/native';
import MonthTicketCard from '../ui/card/MonthTicketCard';
import { COLORS } from '../../constants/color';
import {TouchableOpacity} from 'react-native';

function MonthTicketGrid({monthTicketData, selectedMonthCard, setSelectedMonthCard}) {
    return (
        <Container>
            {
                monthTicketData.map((item, index) => {
                    const isSelected = selectedMonthCard === index;
                    return (
                        <TouchableOpacity
                        key={index}
                         onPress={() => setSelectedMonthCard(index)}>
                        <MonthTicketCard
                            key={index}
                            title={item.title}
                            price={item.price}
                            isSelected={isSelected}
                        />
                        </TouchableOpacity>
                    )
                }
                )
            }
            <SubTextContainer>
            <SubText>· 일반 이용권을 구매할 수 있습니다.</SubText>
            <SubText>· 헬스장 이용권과 PT 이용권, 이외의 운동을 커스텀하여 이용권을 구매할 수 있습니다.</SubText>
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