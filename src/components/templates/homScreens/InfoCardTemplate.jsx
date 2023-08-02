import { styled } from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import GobackBlackGrid from '../../grid/GobackBlackGrid';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native';
function InfoCardTemplate(props) {

    const navigation = useNavigation();

    const goBackScreens = () => {
        navigation.goBack();
    };

    return (
        <Container>
            <GobackBlackGrid onPress={goBackScreens}>카드 등록</GobackBlackGrid>
                <TitleContainer>
                    <TitleText>카드 정보를</TitleText>
                    <TitleText>입력해주세요</TitleText>
                </TitleContainer>

                <CardContainer>
                    <CardIputBox>
                        <TextInput
                             style={{marginLeft: 10, fontSize: 16}}
                             placeholder="1234 - 1234 - 1234 -1234"
                             placeholderTextColor={COLORS.gray_300}
                        />
                    </CardIputBox>

                    <CardSmallBoxContainer>
                    <CardInputSmallBox>
                        <TextInput 
                             style={{marginLeft: 10, fontSize: 16}}
                            placeholder="MM/YY"
                            placeholderTextColor={COLORS.gray_300}
                            />
                        
                    </CardInputSmallBox>
                     <CardInputSmallBox>
                     <TextInput
                          style={{marginLeft: 10, fontSize: 16}} 
                            placeholder="보안코드"
                            placeholderTextColor={COLORS.gray_300}
                            />
                    </CardInputSmallBox>
                    </CardSmallBoxContainer>

                    <CardIputBox>
                        <TextInput
                            style={{marginLeft: 10, fontSize: 16}}
                             placeholder="비밀번호 앞 2자리"
                             placeholderTextColor={COLORS.gray_300}
                            secureTextEntry={true}
                        />
                    </CardIputBox>

                <CardGuideContainer>
                    <CardGuideText>· 본인 명의의 카드만 등록할 수 있습니다.</CardGuideText>
                    <CardGuideText>· 카드는 한 개만 등록할 수 있습니다.</CardGuideText>
                </CardGuideContainer>

                </CardContainer>
        </Container>
    );
}


export default InfoCardTemplate;

const Container = styled.View`
    flex:1;
    padding: 0 20px;
    background-color: ${COLORS.white};
`

const TitleContainer = styled.View`
    margin-top: 64px;
`

const TitleText = styled.Text`
    font-size: 28px;
    color: ${COLORS.sub};
    font-weight: 400;
    line-height: 37.80px;
`

const CardContainer = styled.View`
margin-top: 46px;
`

const CardIputBox = styled.View`
    flex-direction: row;
    border: 1px solid ${COLORS.gray_300}; 
    border-radius: 13px;
    height: 50px;
    align-items: center;
`


const CardSmallBoxContainer = styled.View`
    flex-direction: row;
    margin-top: 12px;
    margin-bottom: 12px;
    justify-content: space-between;
`

const CardInputSmallBox = styled.View`
    flex-direction: row;
    border: 1px solid ${COLORS.gray_300}; 
    border-radius: 13px;
    height: 50px;
    width: 48%;
`

const CardGuideContainer = styled.View`
    margin-top: 29px;
`

const CardGuideText = styled.Text`
    font-size: 14px;
color: ${COLORS.gray_400};
font-weight: 400;
line-height: 22.40px;
`