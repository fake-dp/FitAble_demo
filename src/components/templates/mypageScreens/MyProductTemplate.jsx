import styled from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import GobackBlackGrid from '../../grid/GobackBlackGrid';
import { useNavigation } from '@react-navigation/native';
import GobackGrid from '../../grid/GobackGrid';
import DatePicker from 'react-native-date-picker'
import { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet,Button} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
function MyProductTemplate(props) {

    const navigation = useNavigation();

    const goBackScreens = () => {
        navigation.goBack();
    };

    const [selectedItem, setSelectedItem] = useState(null);
    const [open, setOpen] = useState(false);

  
    const data = ['항목 1', '항목 2', '항목 3', '항목 4', '항목 5','항목 1', '항목 2', '항목 3', '항목 4', '항목 5'];

    const renderItem = ({ item }) => (
        <TouchableOpacity
          style={[
            styles.item,
            { backgroundColor: item === selectedItem ? 'lightgray' : 'white' },
          ]}
          onPress={() => {
            onClose(item);
          }}
        >
          <Text style={styles.itemText}>{item}</Text>
        </TouchableOpacity>
      );

    const [selectedImage, setSelectedImage] = useState(null);


    return (
        <Container>
 
            <GobackBlackGrid onPress={goBackScreens}>주문상품 확인</GobackBlackGrid>
            <TestGrid>
  
     
      
            <MyProductText>곧 업데이트 예정입니다.</MyProductText>
            </TestGrid>
        </Container>
    );
}

export default MyProductTemplate;

const Container = styled.View`
  flex: 1;
  padding: 0 20px;
  background-color: ${COLORS.white};
`;


const TestGrid = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`


const MyProductText = styled.Text`
font-size: 16px;
color: ${COLORS.sub};
font-weight: 500;
line-height: 22.40px;
`

const SelectedImageContainer = styled.View`
  margin-top: 20px;
`;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    pickerContainer: {
      backgroundColor: 'white',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      padding: 16,
    },
    item: {
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    itemText: {
      fontSize: 16,
    },
    cancelButton: {
      marginTop: 16,
      paddingVertical: 12,
      backgroundColor: 'red',
      borderRadius: 10,
      alignItems: 'center',
    },
    cancelButtonText: {
      fontSize: 16,
      color: 'white',
    },
  });