import styled from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import {formatCommaNumber} from '../../../utils/CustomUtils';
function PtPriceCard({ptTicketData,isSelected}) {

    // console.log('ptTicketData',ptTicketData)
    const {id, price, name,pricePerTime} = ptTicketData;

    return (
        <CardContainer
        isSelected={isSelected}
        >
            <TextContainer>
                <LeftTextContainer>
                <PtTicketText isSelected={isSelected}>
                    {name.length > 14? name.substring(0, 14) + '...' : name}
                </PtTicketText>
                </LeftTextContainer>


                <RightTextContainer>

                <PtTicketText isSelected={isSelected}>{formatCommaNumber(price)}원</PtTicketText>
                <PtTicketPriceText isSelected={isSelected}>회당{formatCommaNumber(pricePerTime)}원</PtTicketPriceText>
               
                </RightTextContainer>

            </TextContainer>
        </CardContainer>
    );
}

export default PtPriceCard;


const CardContainer = styled.View`
    background-color: ${({ isSelected }) => isSelected ? COLORS.box : '#262626'};
    border-radius: 15px;
    width: 100%;
    height: 70px;
    margin-bottom: 8px;
`;

const TextContainer = styled.View`
    flex: 1;
    padding: 0 20px;
    flex-direction: row;
    align-items: center; /* 가운데 정렬 활성화 */
    justify-content: space-between;
`;

const LeftTextContainer = styled.View`
     flex-direction: row;
`

const RightTextContainer = styled.View`
        align-items: flex-end;
`

const PtTicketText = styled.Text`
    font-size: 16px;
    font-weight: 700;
    color:  ${({ isSelected }) => isSelected ? COLORS.main : COLORS.gray_400};
`;

const PtTicketCountText = styled.Text`
    font-size: 16px;
    font-weight: 700;
    margin-left: 14px;
    color:  ${({ isSelected }) => isSelected ? COLORS.main : COLORS.gray_400};
`;

const PtTicketPriceText = styled.Text`
  font-size: 12px;
font-weight: 400;
line-height: 19.20px;
    color:  ${({ isSelected }) => isSelected ? COLORS.gray_200 : COLORS.gray_400};
`;