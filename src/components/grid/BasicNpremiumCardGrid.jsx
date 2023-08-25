import { styled } from 'styled-components/native';
import BasicNpreTicketCard from '../ui/card/BasicNpreTicketCard';
import { COLORS } from '../../constants/color';
import {TouchableOpacity} from 'react-native';

function BasicNpremiumCardGrid({subscribeData,selectedCard, setSelectedCard}) {

    return (
        <Container>
            {
                subscribeData.tickets.map((item, index) => {
                    const isSelected = selectedCard === index;
                    return (
                        <TouchableOpacity
                             key={index}
                              onPress={() => setSelectedCard(index)}>
                        <BasicNpreTicketCard
                            key={index}
                            type={item.type}
                            name={item.name}
                            price={item.price}
                            isSelected={isSelected}
                            />
                        </TouchableOpacity>
                    )
                }
                )
            }
             <SubTextContainer>
            <SubText>{subscribeData?.description}</SubText>
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
    border-top-color: ${COLORS.gray_500};
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