import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import styled from 'styled-components/native';
import { COLORS } from "../../constants/color";
import ConsultLabel from '../ui/label/ConsultLabel';
function ConsultingLabelTag({TagData, setSelectedTags,selectedTags}) {

    console.log('selectedTags@@',selectedTags)

    const [customTags, setCustomTags] = useState([]);

    const handleCustomTagChange = (index, value) => {
      const newTags = [...customTags];
      newTags[index] = value;
      setCustomTags(newTags);
    }
  

    return (
        <>
        {
            TagData.map((item, index) => {
                return (
                    <GridContainer key={index}>
                        <Title>{item.title}</Title>
                        <SubTitle>{item.subtext}</SubTitle>
                        <TagContainer>
                            {
                                item.tag.map((tag, index) => (
                                    <ConsultLabel 
                                    key={index} 
                                    tag={tag}
                                    customTag={customTags[index] || ''} 
                                    setCustomTag={(value) => handleCustomTagChange(index, value)} 
                                    selected={selectedTags.includes(tag)}
                                    onPress={(tag) => {
                                        if (tag === "기타") {
                                            // 기존에 선택된 기타 태그가 있다면 삭제
                                            setSelectedTags((prevTags) => prevTags.filter((t) => t !== customTags[index]));
                                    
                                            // 새로운 사용자 지정 태그 추가
                                            if (customTags[index].trim() !== "" && !selectedTags.includes(customTags[index].trim())) {
                                                setSelectedTags((prevTags) => [...prevTags, customTags[index].trim()]);
                                            }
                                        } else {
                                            if (selectedTags.includes(tag)) {
                                                setSelectedTags((prevTags) => prevTags.filter((t) => t !== tag));
                                            } else if (selectedTags.length < 3) {
                                                setSelectedTags((prevTags) => [...prevTags, tag]);
                                            }
                                        }
                                    }}                                    
                                    />
                                ))
                            }
                        </TagContainer>
                    </GridContainer>
                )
            }
            )
        } 
        </>
    );
}

export default ConsultingLabelTag;


const GridContainer = styled.View`
    
  margin-top: 40px;
  border-bottom-width: 1px;
  border-bottom-color: ${COLORS.gray_500};
  padding-bottom: 25px;
  ${(props) =>
    props.isLastItem &&
    `
    border-bottom-width: 0;
  `}
    
`;

const Title = styled.Text`
  font-size: 20px;
  color: ${COLORS.white};
  font-weight: 700;
  line-height: 30px;
`;

const TagContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 10px;
`;

const SubTitle = styled.Text`
  font-size: 14px;
  font-weight: 400;
  line-height: 22.40px;
  color: ${COLORS.gray_300};
`;

const Content = styled.Text`
  font-size: 14px;
  font-weight: 400;
  line-height: 22.40px;
  color: ${COLORS.gray_400};
`;
