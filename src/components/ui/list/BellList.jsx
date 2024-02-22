import { styled } from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import {postReadPushAlarm} from '../../../api/pushApi';
import { useNavigation } from '@react-navigation/native';
function BellList(props) {
    const navigation = useNavigation();
    const { data, maindate } = props; 
    console.log('data',data)

    const determineScreenFromType = (type, optionName) => {
        switch (type) {
          case 'LESSON':
            return 'MyBookList';
          case 'TICKET':
            return 'CenterTicket';
          case 'SUBSCRIBE':
            return 'SubscribeScreen';
          case 'STORE':
            return 'Store';
          case 'CONSULTING':
            return 'Bell';
          case 'MILEAGE':
            return 'Mileage';
          case 'ETC':
            return 'Mileage';
          case 'NOTICE':
            return 'DetailNotice';
          case 'INQUIRY':
            if (optionName === 'CENTER') {
              return 'MyCenter';
            } else if (optionName === 'FITABLE') {
              return 'ProductQnA';
            } else if (optionName === 'STORE') {
              return 'Store';
            } else {
              // 기타 처리
              return 'Bell'; // 예를 들어, 기타 화면 또는 오류 처리 화면
            }
          default:
            return 'Bell'; // 기본 화면 또는 오류 처리 화면
        }
      };
      



    const goDetailScreen = async(id,type,optionName,path) => {
         console.log('oiddfadsfasd',id,type,optionName,path)
        //  const screenName = determineScreenFromType(type,optionName);
        //  navigation.navigate(screenName,{path:path});
         try {
            const response = await postReadPushAlarm(id);
            console.log('읽음', response);
            if(response){
                const screenName = determineScreenFromType(type,optionName);
                navigation.navigate(screenName,{path:path});
            }else{
                return;
            }
            // 화면으로 이동
          } catch (error) {
            console.error('읽음오류입니당', error);
          }

    }

    return (
        <>
        <MainTitleDate>{maindate}</MainTitleDate>
        {
            data.map((item,index) => {
                return (
                    <ContentsContainer key={index} isLastItem={index === data.length - 1}>
                       <TouchContainer onPress={()=>goDetailScreen(item.id, item.type, item.optionName, item.path)}>
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