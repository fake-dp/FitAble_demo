import styled from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import GobackBlackGrid from '../../grid/GobackBlackGrid';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {getNoticeDetail} from '../../../api/mypageApi';
import { WebView } from 'react-native-webview';
function NoticeDetailTemplate(props) {

    const route = useRoute();
    const itemId = route?.params.item
    const pathId = route?.params.path
  console.log('itemIditemId',itemId,pathId)
    const [noticeDetailData, setNoticeDetailData] = useState(null);
    const navigation = useNavigation();

    const getNoticeDetailData = async (id) => {
        try {
            const response = await getNoticeDetail(id);
            // console.log('res',response)
            setNoticeDetailData(response);
        } catch (error) {
            console.error('Error getting:', error);
        }
    };

    // console.log('data',noticeDetailData)

    useEffect(()=> {
        if(itemId){
            getNoticeDetailData(itemId)
        }else if(pathId){
            getNoticeDetailData(pathId)
        }
    },[itemId,pathId])

    const goBack = () => {
        navigation.goBack();
    }

    return (
        <Container>
              <GobackBlackGrid
            onPress={goBack}
            >센터 공지사항</GobackBlackGrid>
            <HeaderTextContainer>
             <TitleText>{noticeDetailData ? noticeDetailData.title : '로딩 중...'}</TitleText>
             <DateText>{noticeDetailData ? noticeDetailData.createAt : '로딩 중...'}</DateText>
            </HeaderTextContainer>

            {/* <NoticeLine/> */}
            
             <WebView
                originWhitelist={['*']}
                // source={{ html: noticeDetailData ? noticeDetailData.context : '' }}
                source={{
                    html: `
                      <html>
                        <head>
                          <meta name="viewport" content="width=device-width, initial-scale=1">
                          <style>
                          p { 
                            font-size: 14px;
                            font-weight: 400;
                            letter-spacing: -0.4px;
                            color: ${COLORS.gray_400};
                          }
                          li {
                            font-size: 14px;
                            font-weight: 400;
                            letter-spacing: -0.4px;
                            color: ${COLORS.gray_400};
                          }
                          ol{
                            font-size: 14px;
                            font-weight: 400;
                            letter-spacing: -0.4px;
                            color: ${COLORS.gray_400};
                          }
                          ul{
                            font-size: 14px;
                            font-weight: 400;
                            letter-spacing: -0.4px;
                            color: ${COLORS.gray_400};
                          }
                          span {
                            font-size: 14px;
                            font-weight: 400;
                            letter-spacing: -0.4px;
                            color: ${COLORS.gray_400};
                          }
                          img { max-width: 100%; height: auto; }
                        </style>
                        </head>
                        <body>
                          ${noticeDetailData ? noticeDetailData.context : ''}
                        </body>
                      </html>
                    `
                  }}
/>
        </Container>
    );
}

export default NoticeDetailTemplate;

const Container = styled.View`
    flex:1;
    /* padding: 0 20px; */
    padding: 0 20px;

    background-color: ${COLORS.white};
`

const HeaderTextContainer = styled.View`
    flex-direction: row;
    flex-direction: column;
    margin-top: 52px;
    border-bottom-width: 1px;
    border-color: ${COLORS.gray_200};
    margin-bottom: 40px;
`

const TitleText = styled.Text`
font-size: 16px;
font-weight: 400;
letter-spacing: -0.4px;
color: ${COLORS.sub};
padding: 0 10px;

`

const DateText = styled.Text`
font-size: 14px;
font-weight: 400;
letter-spacing: -0.35px;
color: ${COLORS.gray_300};
margin-top: 5px;
margin-bottom: 20px;
padding: 0 10px;


`