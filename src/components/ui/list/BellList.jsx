import { styled } from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import {postReadPushAlarm} from '../../../api/pushApi';
import { useNavigation } from '@react-navigation/native';
function BellList(props) {
    const navigation = useNavigation();
    const { data, maindate } = props; 
    console.log('data',data)

    const goDetailScreen = async(id) => {
         console.log('oid',id)
            const response = await postReadPushAlarm(id);
            console.log('읽음',response)

    }

    return (
        <>
        <MainTitleDate>{maindate}</MainTitleDate>
        {
            data.map((item,index) => {
                return (
                    <ContentsContainer key={index} isLastItem={index === data.length - 1}>
                       <TouchContainer onPress={()=>goDetailScreen(item.id)}>
                        <ContentsText>{item.context}</ContentsText>
                        <ContentsDate>{item.date}</ContentsDate>
                       </TouchContainer>
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

const TouchContainer = styled.TouchableOpacity`
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

const NoListContainer = styled.View`
    /* margin-top: 120px; */
    justify-content: center;
    align-items: center;
    flex:1;
    /* height: 100%; */
`

const NoListText = styled.Text`
color: ${COLORS.gray_200};
font-size: 16px;
font-weight: 500;
line-height: 22.40px;
`