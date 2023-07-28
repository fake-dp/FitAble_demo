import { styled } from 'styled-components/native';
import { COLORS } from '../../../constants/color';
function BellList(props) {

    const { data, maindate } = props; 

    return (
        <>
        <MainTitleDate>{maindate}</MainTitleDate>
        {
            data.map((item,index) => {
                return (
                    <ContentsContainer key={index} isLastItem={index === data.length - 1}>
                        <ContentsText>{item.contents}</ContentsText>
                        <ContentsDate>{item.date}</ContentsDate>
                    </ContentsContainer>
                )
            }
            )
        }
    </>
    );
}

export default BellList;



const MainTitleDate = styled.Text`
font-size: 20px;
font-weight: 700;
line-height: 30px;
color: ${COLORS.white};
margin-top: 30px;
margin-bottom: 14px;
`

const ContentsContainer = styled.View`
     border-bottom-width: 1px;
     border-bottom-color: ${COLORS.box};
    padding: 10px 0;
    ${(props) =>
    props.isLastItem &&
    `
    border-bottom-width: 0;
  `}
`

const ContentsText = styled.Text`
font-size: 16px;
font-weight: 500;
line-height: 22.40px;
color: ${COLORS.gray_200};
`

const ContentsDate = styled.Text`
font-size: 14px;
font-weight: 400;
line-height: 22.40px;
margin-top: 6px;
color: ${COLORS.gray_300};
`