import styled from 'styled-components/native';
import { COLORS } from '../../../constants/color';

function BasicNpreTicketCard({title, contents, price,isSelected}) {

    return (
        <CardContainer
        isSelected={isSelected}
        >
            <UpTextContainer>
            <MainTitleText
             isSelected={isSelected}
            >{title}</MainTitleText>
            <SubContentsText
             isSelected={isSelected}
            >{contents}</SubContentsText>
            </UpTextContainer>

            <DownTextContainer>
            <MainTitleText
             isSelected={isSelected}
            >￦{price}</MainTitleText>
            <MonthText
             isSelected={isSelected}
            >/월</MonthText>
            </DownTextContainer>
        </CardContainer>
    );
}

export default BasicNpreTicketCard;


const CardContainer = styled.View`
   background-color: ${({ isSelected }) => isSelected ? COLORS.box : '#262626'};
  border-radius: 15px;
  width: 100%;
  height: 146px;
  margin-bottom: 12px;
`


const UpTextContainer = styled.View`
    padding: 20px 20px 0 20px;
`

const MainTitleText = styled.Text`
font-size: 24px;
font-weight: 700;
line-height: 32.40px;
color: ${({ isSelected }) => isSelected ? COLORS.main : COLORS.gray_400};
`

const SubContentsText = styled.Text`
font-size: 14px;
font-weight: 400;
line-height: 22.40px;
color: ${({ isSelected }) => isSelected ? COLORS.gray_200 : COLORS.gray_400};
`

const MonthText = styled.Text`
font-size: 16px;
font-weight: 700;
line-height: 22.40px;
color: ${({ isSelected }) => isSelected ? COLORS.gray_100 : COLORS.gray_400};
margin-top: 7px;
`

const DownTextContainer = styled.View`
    flex-direction: row;
    justify-content: flex-end;
    padding: 20px 20px 0 0;
    align-items: center;
`