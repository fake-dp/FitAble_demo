import { styled } from 'styled-components/native';
import { COLORS } from '../../constants/color';
import CheckBox from '@react-native-community/checkbox';
import { Linking, Platform } from 'react-native';
import {getAgreeTerms} from '../../api/cardApi';
import { centerIdState } from '../../store/atom';
import { useRecoilState } from 'recoil';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import TermsModal from '../ui/modal/TermsModal';
function PaymentAgreementGrid({ isInfoAgree,isRefundAgree, isCenterAgree, handleToggleInfoAgree, handleToggleRefundAgree, handleToggleCenterAgree }) {

    const navigation = useNavigation();
    const [mainCenterId, setMainCenterId] = useRecoilState(centerIdState)
    const [termData, setTermData] = useState([])
    const [modalVisible, setModalVisible] = useState(false);

    const handleLinkPress = (url) => {
        Linking.canOpenURL(url).then(supported => {
          if (supported) {
            Linking.openURL(url);
          } else {
            console.log("Don't know how to open URI: " + url);
          }
        });
      };

      const handleAndroidLink = (url) => {
        navigation.navigate('BannerWebView', {uri: url})
    }

const isAndroidLink = Platform.OS === 'android' ? handleAndroidLink : handleLinkPress;

      const getTermsData = async () => {
        try{
            const response = await getAgreeTerms(mainCenterId);
            if(response){
                console.log('response',response,response.ticketCenterTerms)
                setTermData(response.ticketCenterTerms)
                setModalVisible(true)
            }
        }catch(e){
            console.log('error',e)
        }
    }

    const hanldeCloseModal = () => {
        setModalVisible(false)
    }

    // console.log('termData',termData)



    return (
        <>
        <Container>
            <AgreementContainer>

              <CheckBoxStyle
                        value={isInfoAgree}
                        onValueChange={handleToggleInfoAgree}
                        tintColors={{ true: COLORS.main, false: COLORS.main }}
                        onCheckColor={COLORS.main}
                        onFillColor={COLORS.box}
                        onTintColor={COLORS.box}
                        boxType={'square'}
                        tintColor={COLORS.main}
                        />
            <AgreementLink
            // 깜빡임 방지 하이라트 제어
            activeOpacity={1}
            onPress={()=>isAndroidLink('https://fitable.notion.site/Privacy-Policy-fcfd2a7bbea3444fa49730fb12879755')}
            >
            <AgreementStringText>개인정보 제3자 제공동의</AgreementStringText>
            </AgreementLink>
            <AgreementText>에 동의합니다.</AgreementText>
        
            </AgreementContainer>

            {/* 2 */}
            <AgreementContainer>

              <CheckBoxStyle
                        value={isRefundAgree}
                        onValueChange={handleToggleRefundAgree}
                        tintColors={{ true: COLORS.main, false: COLORS.main }}
                        onCheckColor={COLORS.main}
                        onFillColor={COLORS.box}
                        onTintColor={COLORS.box}
                        boxType={'square'}
                        tintColor={COLORS.main}
                        />
            <AgreementLink
            activeOpacity={1}
            onPress={()=>isAndroidLink('https://fitable.notion.site/Terms-of-use-151276937bf842ad9eabc522978f9148')}
            >
            <AgreementStringText>취소 및 환불 규정</AgreementStringText>
            </AgreementLink>
            <AgreementText>에 동의합니다.</AgreementText>
        
            </AgreementContainer>

            {/* 3 */}
            <AgreementContainer>

            <CheckBoxStyle
                value={isCenterAgree}
                onValueChange={handleToggleCenterAgree}
                tintColors={{ true: COLORS.main, false: COLORS.main }}
                onFillColor={COLORS.box}
                onTintColor={COLORS.box}
                boxType={'square'}
                tintColor={COLORS.main}
                onCheckColor={COLORS.main}
                />
                <AgreementTextContainer>
                <AgreementText>회원 본인은 위 결제 내용을 확인했으며</AgreementText>

             <SubAgreementContainer>   
        <AgreementLink
            activeOpacity={1}
            onPress={getTermsData}
            >
        <AgreementStringText>이용권 센터 약관</AgreementStringText>
        </AgreementLink>
        <AgreementText>에 동의합니다.</AgreementText>
        </SubAgreementContainer>
        </AgreementTextContainer>
        </AgreementContainer>
      
        </Container>
        {modalVisible && modalVisible&&
            <TermsModal 
            modalVisible={modalVisible}
            hanldeCloseModal={hanldeCloseModal}
            termData={termData}
            />
        }
            </>
    );
}

export default PaymentAgreementGrid;

const Container = styled.View`
 padding: 0 20px;
 margin-top: 40px;
 margin-bottom: 10px;
 `

const AgreementContainer = styled.View`
    display : flex; 
    flex-direction: row;
    /* align-items: center; */
    margin-bottom: 18px;
`

 const AgreementText = styled.Text`
color: ${COLORS.white};
font-size: 16px;
font-weight: 300;
line-height: 22px;
 `

const AgreementLink = styled.TouchableOpacity`
`

const AgreementStringText = styled.Text`
color: ${COLORS.white};
font-size: 16px;
font-weight: 400;
line-height: 22px;
text-decoration: underline;
text-decoration-color: ${COLORS.white};
`

const AgreementTextContainer = styled.View`
display : flex;
flex-direction: column;
`

const SubAgreementContainer = styled.View`
display : flex;
flex-direction: row;
align-items: center;
`

const CheckBoxStyle = styled(CheckBox)`
width: 24px;
height: 24px;
margin-right: 12px;
`;