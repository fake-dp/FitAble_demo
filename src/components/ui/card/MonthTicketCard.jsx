import styled from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import {formatCommaNumber} from '../../../utils/CustomUtils';
function MonthTicketCard({ type, name, price, isSelected }) {
    return (
        <CardContainer
        isSelected={isSelected}
        >
            <TextContainer>
            <MonthTicketText isSelected={isSelected}>
                {name.length > 14? name.substring(0, 14) + '...' : name}
            </MonthTicketText>

                <MonthTicketText
                isSelected={isSelected}
                >{formatCommaNumber(price)}원</MonthTicketText>
            </TextContainer>
        </CardContainer>
    );
}

export default MonthTicketCard;

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

const MonthTicketText = styled.Text`
    font-size: 16px;
    font-weight: 700;
    color:  ${({ isSelected }) => isSelected ? COLORS.main : COLORS.gray_400};
`;
