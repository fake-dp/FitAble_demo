import React from 'react';
import DetailPtTemplate from '../../components/templates/homSreens/DetailPtTemplate';
import { useRoute } from '@react-navigation/native'; 
function PtDetailSrceen() {
    const route = useRoute();
    const { id } = route.params; 

    return (
        <DetailPtTemplate 
        id={id}
        />
    );
}

export default PtDetailSrceen;