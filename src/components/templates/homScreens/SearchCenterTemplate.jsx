
import { styled } from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import { ScrollView, TouchableOpacity ,View,TextInput} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GobackGrid from '../../grid/GobackGrid';
import React, { useState,useEffect } from 'react';
import SearchListBoxGrid from '../../grid/SearchListBoxGrid';
import { getSearchCenter } from '../../../api/homeApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

function SearchCenterTemplate({searchCenterText,labelText}) {
    const navigation = useNavigation();
    const [isTyping, setIsTyping] = useState(false);
    const [recentList, setRecentList] = useState([]);
    const [searchData, setSearchData] = useState([])
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);

  // console.log('labelText',labelText)
    useEffect(() => {
        const loadRecentSearches = async () => {
          try {
            const recentSearches = await AsyncStorage.getItem('recentSearches');
            if (recentSearches) {
              setRecentList(JSON.parse(recentSearches));
            }
          } catch (e) {
            console.error(e);
          }
        };
        loadRecentSearches();
      }, [searchData]);
    
      const saveRecentSearch = async (text) => {
        if (text.trim() === '') {
          return; 
        }
        try {
          const recentSearches = await AsyncStorage.getItem('recentSearches');
          const parsedRecentSearches = recentSearches ? JSON.parse(recentSearches) : [];
          if (parsedRecentSearches.some((item) => item.title === text)) {
            return;
          }
          const updatedRecentSearches = [{ id: new Date().getTime(), title: text }, ...parsedRecentSearches];
         
          // 여기서 가장 오래된 검색어(가장 마지막 항목)를 제거한다.
    if (updatedRecentSearches.length > 6) {
      updatedRecentSearches.pop();
    }
         
          await AsyncStorage.setItem('recentSearches', JSON.stringify(updatedRecentSearches));
          setRecentList(updatedRecentSearches);
        } catch (e) {
          console.error(e);
        }
      };
      

      const handleSearchQueryChange = (text) => {
        setSearchQuery(text);
      };

    const goBackScreens = () => {
        navigation.goBack();
    };

    const handleTextInputFocus = () => {
        setIsTyping(true);
      };
    
      const handleTextInputBlur = () => {
        setIsTyping(false);
      };

      const removeRecentSearch = async(id) => {
        console.log(id)
        const updatedRecentSearchData = recentList.filter((item) => item.id !== id);
        setRecentList(updatedRecentSearchData);
        try {
            await AsyncStorage.setItem('recentSearches', JSON.stringify(updatedRecentSearchData));
          } catch (e) {
            console.error(e);
          }
      };



    const handleSearch = async () => {
        setIsLoading(true);
        try {
          const response = await getSearchCenter(searchQuery);
          const filteredList = response.content.map((item) => ({
              id: item.id,
              name: item.name,
              address: item.address,
              mainImage: item.mainImage,
              programs: item.programs,
            }));
             setSearchData(filteredList);
             saveRecentSearch(searchQuery);
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
        setIsLoading(false);
        setIsTyping(true);
      };


    const recentHandleSearch = async (searchText) => {
      setIsLoading(true);
      try {
        const response = await getSearchCenter(searchText);
        const filteredList = response.content.map((item) => ({
            id: item.id,
            name: item.name,
            address: item.address,
            mainImage: item.mainImage,
            programs: item.programs,
          }));
           setSearchData(filteredList);
           saveRecentSearch(searchQuery);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
      setIsLoading(false);
      setIsTyping(true);
    };
      
      const handleRecentSearchClick = async(searchText) => {
        console.log('searchText',searchText)
        setSearchQuery(searchText);
        recentHandleSearch(searchText);
      };


      const handleGoDetailCenter = (id) => {
        // console.log('id', id)
        navigation.navigate('DetailCenter', { id });
    }

    const search = require('../../../assets/img/search.png');
    const close = require('../../../assets/img/close_20.png');
    // console.log('searchCenterText',searchCenterText)
    return (
        <Container>
            <GobackGrid onPress={goBackScreens}>{searchCenterText ? searchCenterText:'이용권 구매'}</GobackGrid>
            
           {
            isLoading ? (
                <IsLoadingContainer>
                    <IsLoadingText>검색 중...</IsLoadingText>
                </IsLoadingContainer>
            ):(
                <>
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
                placeholder="센터를 입력해주세요"
                placeholderTextColor={COLORS.gray_200}
                onFocus={handleTextInputFocus}
                onBlur={handleTextInputBlur}
                onChangeText={handleSearchQueryChange}
                onSubmitEditing={handleSearch}
                returnKeyType="done"
                />
                </SearchContainer>
    
              
                {
                !labelText && !isTyping && recentList.length!==0? (
                <RecentSearchContainer>
                <RecentSearchTitle>최근 검색어</RecentSearchTitle>
                <ScrollView
                bounces={false}
                showsVerticalScrollIndicator={false}
                overScrollMode="never"
                >
                {recentList.map((item, index) => (
                    <RecentSearchBox key={index}>
                      <TouchableOpacity onPress={() => handleRecentSearchClick(item.title)}>
                    <RecentSearchText>{item.title}</RecentSearchText>
                      </TouchableOpacity>
                    <TouchableOpacity onPress={()=>removeRecentSearch(item.id)}>
                    <ImageIcon source={close}/>
                    </TouchableOpacity>
                    </RecentSearchBox>
                ))}
                </ScrollView>
                </RecentSearchContainer>
                    ) : (
                      !isTyping && <RecentSearchTitle>{labelText}</RecentSearchTitle>
                    )
                }

{isTyping && searchData.length === 0 ? (
  <NoSearchResultText>검색 결과가 없습니다.</NoSearchResultText>
) : null}

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
    </>
            )
           }
            

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

const IsLoadingContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`

const IsLoadingText = styled.Text`
    font-size: 16px;
    font-weight: 500;
    line-height: 22.40px;
    color: ${COLORS.white};
`

const NoSearchResultText = styled.Text`
  font-size: 16px;
  font-weight: 500;
  line-height: 22.40px;
  color: ${COLORS.gray_300};
  text-align: center;
  margin-top: 140px;
`;