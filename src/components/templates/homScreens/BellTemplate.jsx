import { styled } from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import { FlatList, ActivityIndicator, View } from 'react-native';
import BellList from '../../ui/list/BellList';
import { useState,useEffect } from 'react';
import { getPushAlarmHistory } from '../../../api/homeApi';
import GobackGrid from '../../grid/GobackGrid';
import { useNavigation } from '@react-navigation/native';
function BellTemplate(props) {

    const navigation = useNavigation();

    const [bellList, setBellList] = useState([]);
    const [loading, setLoading] = useState(true);

    const getBellData = async () => {
        try{
            const response = await getPushAlarmHistory();
            // console.log('response@@!',response.content)
            setBellList(response.content);
        } catch (error){
            console.error('Error getting:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getBellData();
    },[])

    // console.log('bellList',!bellList)

    if (loading) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:COLORS.sub }}>
            <ActivityIndicator size="large" color={COLORS.main} />
          </View>
        );
      }

    return (
        
        <Container>
        <GobackGrid onPress={() => navigation.goBack()}>알람</GobackGrid>
        {
                bellList.length === 0 ?(
                    <NoListContainer>
                    <NoListText>도착한 알림이 없습니다</NoListText>
                </NoListContainer>
                ):null
              }
        <FlatList
             bounces={false}
             showsVerticalScrollIndicator={false}
             overScrollMode="never"
            data={bellList}
            renderItem={({ item }) => <BellList data={item.histories} maindate={item.date} />}
            keyExtractor={(item, index) => String(index)}/>
        </Container>
    );
}

export default BellTemplate;

const Container = styled.View`
    flex:1;
    padding: 0 20px;
    background-color: ${COLORS.sub};
`

const NoListContainer = styled.View`
    margin-top: 120px;
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