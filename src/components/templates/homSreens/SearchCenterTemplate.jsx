
import { styled } from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import {Image , ScrollView, TouchableOpacity ,View,TextInput} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GobackGrid from '../../grid/GobackGrid';
import React, { useState } from 'react';
import SearchListBoxGrid from '../../grid/SearchListBoxGrid';

function SearchCenterTemplate(props) {
    const navigation = useNavigation();
    const [isTyping, setIsTyping] = useState(false);
    const [recentList, setRecentList] = useState([
        {
            id: 0,
            title: '에이블짐 노원점',
        },
        {
            id: 1,
            title: '노원 에이블짐',
        },
        {
            id: 2,
            title: '에이블짐 강남점',
        },
        {
            id: 3,
            title: '강남 에이블짐',
        },
        {
            id: 4,
            title: '에이블짐 수유점',
        },
        {
            id: 5,
            title: '에이블짐 천호역점',
        },
    ]);

    const [searchData, setSearchData] = useState([])

    const [searchList, setSearchList] = useState([
        {
            id: 0,
            title: '에이블짐 노원본점',
            map: '서울 노원구 상계로 77',
            srcimg: require('../../../assets/img/searchlist_1.png'),
            tag:[
                '헬스','P.T','필라테스','요가'
            ]
        },
        {
            id: 1,
            title: '에이블짐 수유점',
            map: '서울 노원구 상계로 77',
            srcimg: require('../../../assets/img/searchlist_2.png'),
            tag:[
                '헬스','P.T',
            ]
        },
        {
            id: 2,
            title: '에이블짐 천호역점',
            map: '서울 노원구 상계로 77',
            srcimg: require('../../../assets/img/searchlist_3.png'),
            tag:[
                '헬스','P.T','골프',
            ]
        },
        {
            id: 3,
            title: '에이블짐 마곡역점',
            map: '서울 노원구 상계로 77',
            srcimg: require('../../../assets/img/searchlist_4.png'),
            tag:[
                '헬스',
            ]
        },
        {
            id: 4,
            title: '에이블짐 삼성역점',
            map: '서울 노원구 상계로 77',
            srcimg: require('../../../assets/img/searchlist_1.png'),
            tag:[
                '골프',
            ]
        },
    ]);

    const goBackScreens = () => {
        navigation.goBack();
    };

    const handleTextInputFocus = () => {
        setIsTyping(true);
      };
    
      const handleTextInputBlur = () => {
        setIsTyping(false);
      };

      const removeRecentSearch = (id) => {
        console.log(id)
        const updatedRecentSearchData = recentList.filter((item) => item.id !== id);
        setRecentList(updatedRecentSearchData);
      };

      const handleSearch = (text) => {
        // 검색어를 받아와서 searchList를 필터링하여 맞는 결과만 보여주는 함수
        const filteredList = searchList.filter(
          (item) =>
            item.title.includes(text) || // 타이틀에서 검색어가 포함된 경우
            item.tag.some((tag) => tag.includes(text)) // 태그 중에서 검색어가 포함된 경우
        );
        setSearchData(filteredList); // 필터링된 결과를 recentList로 설정하여 화면에 보여줌
      };


      const handleGoDetailCenter = (id) => {
        console.log('id', id)
        navigation.navigate('DetailCenter')
    }

    const search = require('../../../assets/img/search.png');
    const close = require('../../../assets/img/close_20.png');
   

    return (
        <Container>
            <GobackGrid onPress={goBackScreens}>이용권 구매</GobackGrid>
            
            {
                !isTyping && (
                    <TitleContainer>
                    <TitleText>이용하고 싶은</TitleText>
                    <TitleText>센터는 어디인가요?</TitleText>
                    </TitleContainer>
                )
            }
        

            <SearchContainer>
            <ImageIcon source={search}/>
            <TextInput
            style={{marginLeft: 10, fontSize: 16, color: COLORS.white}}
            placeholder="센터를 입력해 주세요"
            placeholderTextColor={COLORS.gray_200}
            onFocus={handleTextInputFocus}
            onBlur={handleTextInputBlur}
            onChangeText={handleSearch} 
            />
            </SearchContainer>

          
            {
                !isTyping &&(
            <RecentSearchContainer>
            <RecentSearchTitle>최근 검색어</RecentSearchTitle>

            <ScrollView
            bounces={false}
            showsVerticalScrollIndicator={false}
            overScrollMode="never"
            >

            <View>
            {recentList.map((item, index) => (
                <RecentSearchBox key={index}>
                <RecentSearchText>{item.title}</RecentSearchText>
                <TouchableOpacity onPress={()=>removeRecentSearch(item.id)}>
                <ImageIcon source={close}/>
                </TouchableOpacity>
                </RecentSearchBox>
            ))}
            </View>
            </ScrollView>
            </RecentSearchContainer>
                )
            }

            {/* 검색 데이터 */}
            {isTyping && searchData.length > 0 && (
            <ScrollView
            bounces={false}
            showsVerticalScrollIndicator={false}
            overScrollMode="never"
            >
            <View>
            {searchData.map((item) => (
                <SearchListBoxGrid 
                key={item.id}
                onPress={handleGoDetailCenter}
                searchListData={item}
                />
            ))}
            </View>
            </ScrollView>
            )}

            

        </Container>
    );
}

export default SearchCenterTemplate;

const Container = styled.View`
    flex:1;
    background-color: ${COLORS.sub};
    padding: 0 20px;
`

const TitleContainer = styled.View`
    margin-top: 64px;
`

const TitleText = styled.Text`
    font-size: 28px;
    color: ${COLORS.white};
    font-weight: 400;
    line-height: 37.80px;
`

const SearchContainer = styled.View`
    flex-direction: row;
    align-items: center;
    margin-top: 40px;
    background-color: ${COLORS.box};
    height: 50px;
    border-radius: 13px;
    margin-bottom: 28px;
`

const ImageIcon = styled.Image`
    margin-left: 16px;
`

const RecentSearchContainer = styled.View`
    margin-top: 44px;
`

const RecentSearchTitle = styled.Text`
font-size: 14px;
font-weight: 400;
line-height: 22.40px;
color: ${COLORS.gray_300};
margin-bottom: 27px;
`

const RecentSearchBox = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 31px;
`

const RecentSearchText = styled.Text`
font-size: 16px;
font-weight: 500;
line-height: 22.40px;
color: ${COLORS.gray_200};
`