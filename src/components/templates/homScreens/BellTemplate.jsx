import { styled } from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import { FlatList } from 'react-native';
import BellList from '../../ui/list/BellList';
import { useState,useEffect } from 'react';
import { getPushAlarmHistory } from '../../../api/homeApi';
function BellTemplate(props) {

    const [bellList, setBellList] = useState([]);

    const getBellData = async () => {
        const response = await getPushAlarmHistory();
        console.log('response',response)
        setBellList(response);
    }

    useEffect(() => {
        getBellData();
    },[])


    return (
        <Container>
        <FlatList
             bounces={false}
             showsVerticalScrollIndicator={false}
             overScrollMode="never"
            data={bellList}
            renderItem={({ item }) => <BellList data={item.histories} maindate={item.date} />}
            keyExtractor={(item, index) => String(index)}
        />
        </Container>
    );
}

export default BellTemplate;

const Container = styled.View`
    flex:1;
    padding: 10px;
    background-color: ${COLORS.sub};
`