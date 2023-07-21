import { styled } from 'styled-components/native';
import BasicNpreTicketCard from '../ui/card/BasicNpreTicketCard';
import { COLORS } from '../../constants/color';
import {TouchableOpacity} from 'react-native';

function BasicNpremiumCardGrid({ticketData,selectedCard, setSelectedCard}) {

    return (
        <Container>
            {
                ticketData.map((item, index) => {
                    const isSelected = selectedCard === index;
                    return (
                        <TouchableOpacity
                             key={index}
                              onPress={() => setSelectedCard(index)}>
                        <BasicNpreTicketCard
                            key={index}
                            title={item.title}
                            contents={item.contents}
                            price={item.price}
                            isSelected={isSelected}
                            />
                        </TouchableOpacity>
                    )
                }
                )
            }
             <SubTextContainer>
            <SubText>· 전문 트레이너와 함께 운동할 수 있는 이용권입니다</SubText>
            <SubText>· 트레이너에 따라 가격이 상이할 수 있습니다</SubText>
            </SubTextContainer>
            <ContainerLine/>
        </Container>
    );
}


export default BasicNpremiumCardGrid;

const Container = styled.View`
 padding: 0 20px;
 margin-top: 30px;
`

const ContainerLine = styled.View`
     border-top-width: 1px;
    border-top-color: ${COLORS.white};
    padding: 0 20px;
    margin-top: 30px;
    /* margin-bottom: 40px; */
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