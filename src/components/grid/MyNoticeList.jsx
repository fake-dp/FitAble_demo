import React, { useState, useRef } from 'react';
import styled from 'styled-components/native';
import { COLORS } from '../../constants/color';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';
const DEVICE_WIDTH = Dimensions.get('window').width;
function MyNoticeList({ noticeList }) {

  const [page, setPage] = useState(0);

  const ITEMS_PER_PAGE = 5;
  const scrollViewRef = useRef();
  const onPageChange = (newPage) => {
    if (newPage >= 0 && newPage < Math.ceil(noticeList.length / ITEMS_PER_PAGE)) {
      setPage(newPage);
    }
  };

// const onPageChange = (newPage) => {
//     if (typeof newPage === 'number') {
//       setPage(newPage);
//       scrollViewRef.current.scrollTo({ x: newPage * DEVICE_WIDTH, animated: true });
//     } else {
//       const { contentOffset } = newPage.nativeEvent;
//       const viewSize = newPage.nativeEvent.layoutMeasurement.width;
//       const newPageIndex = Math.floor(contentOffset.x / viewSize);
//       setPage(newPageIndex);
//     }
//   };

  return (
    <ListContainer>
      <NoticeListTextContainer>
        <NoticeListText>센터 공지사항</NoticeListText>
      </NoticeListTextContainer>
      <View>
        {
            noticeList.length === 0 && (
                <NoListContainer>
                <NoListText>등록된 공지사항이 없습니다.</NoListText>
                </NoListContainer>
            ) 

        }
        {noticeList.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE).map((item) => (
            <ListTextContainer key={item.id}>
            <ListTitle>{item.title}</ListTitle>
            <ListDate>{item.createAt}</ListDate>
            </ListTextContainer>
        ))}
      </View>
               {/* <StyledScrollView 
        ref={scrollViewRef}
        horizontal 
        pagingEnabled 
        onScroll={onPageChange} 
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
      >
        {Array.from({ length: Math.ceil(noticeList.length / ITEMS_PER_PAGE) }).map((_, index) => (
          <PageContainer key={index}>
            {noticeList.slice(index * ITEMS_PER_PAGE, (index + 1) * ITEMS_PER_PAGE).map(item => (
              <ListTextContainer key={item.id}>
                <ListTitle>{item.title}</ListTitle>
                <ListDate>{item.createAt}</ListDate>
              </ListTextContainer>
            ))}
          </PageContainer>
        ))}
      </StyledScrollView> */}

      <PaginationContainer>
       {noticeList.length > 5 &&
       
        <Pagination dots={Math.ceil(noticeList.length / ITEMS_PER_PAGE)} active={page} onPageChange={onPageChange} />
       }
      </PaginationContainer>
    </ListContainer>
  );
}

const Pagination = ({ dots, active, onPageChange }) => {
    return (
      <PaginationContainer>
        {Array.from({ length: dots }).map((_, i) => (
          <TouchableOpacity key={i} onPress={() => onPageChange(i)}>
            <Dot active={i === active} />
          </TouchableOpacity>
        ))}
      </PaginationContainer>
    );
  };

export default MyNoticeList;

const Dot = styled.View`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: ${(props) => (props.active ? COLORS.sub : COLORS.gray_200)};
  margin: 0 5px;
`;

const PaginationContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

const NoticeListTextContainer = styled.View`
margin-top: 33px;
border-bottom-width: 1px;
border-color: ${COLORS.gray_100};
`

const NoticeListText = styled.Text`
font-size: 16px;
color: ${COLORS.sub};
font-weight: 500;
line-height: 22.40px;
margin-bottom: 20px;
`

const ListContainer = styled.View`
padding: 0 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    
`;

const ListTextContainer = styled.TouchableOpacity`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 16px 0;
    border-bottom-width: 1px;
    border-color: ${COLORS.gray_100};
`;

const ListTitle = styled.Text`
color: ${COLORS.sub};
font-size: 16px;
font-weight: 400;
line-height: 22.40px;

`;

const ListDate = styled.Text`
color: ${COLORS.gray_300};
font-size: 14px;
font-weight: 400;
line-height: 22.40px;
/* margin-right: 40px; */
`;

const NoListContainer = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
    margin-bottom: 50px;
`

const NoListText = styled.Text`
    font-size: 14px;
    font-weight: 400;
    color: ${COLORS.gray_300};
`

const StyledScrollView = styled.ScrollView`
  flex: 1;
`;

const PageContainer = styled.View`
  width: ${DEVICE_WIDTH}px;
  flex: 1;
`;