import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import styled from 'styled-components/native';
import { COLORS } from "../../constants/color";
import ConsultLabel from '../ui/label/ConsultLabel';
function ConsultingLabelTag({ TagData, setSelectedTags, selectedTags }) {
    const [customTag, setCustomTag] = useState(''); // 사용자 정의 태그 입력값
    const [isCustomTagActive, setIsCustomTagActive] = useState(false); // 사용자 정의 태그 입력 필드 활성화 상태
    console.log('selectedTags',selectedTags)

    useEffect(() => {
        console.log('selectedTags',customTag)
    }, [customTag])


    const handleTagPress = (tag) => {
        if (tag === "기타") {
            if (!isCustomTagActive && selectedTags.length < 3) {
                setIsCustomTagActive(true);
                setSelectedTags([...selectedTags, `기타:${customTag}`]);
            } else {
                setIsCustomTagActive(false); 
                setSelectedTags(selectedTags.filter((selectedTag) => !selectedTag.startsWith("기타:")));
                setCustomTag("");
            }
        } else {
            if (selectedTags.includes(tag)) {
                setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag));
            } else {
                if (selectedTags.length < 3) {
                    setSelectedTags([...selectedTags, tag]);
                }
            }
        }
    };
    
    // 사용자 정의 태그 변경 핸들러
    const handleCustomTagChange = (value) => {
        setCustomTag(value);
    };
    
    const handleCustomTagSubmit = () => {
        if (customTag.trim()) {
            const newSelectedTags = [...selectedTags.filter((selectedTag) => !selectedTag.startsWith("기타:"))];
            if (newSelectedTags.length < 3) {
                setSelectedTags([...newSelectedTags, `기타:${customTag.trim()}`]);
            }
        }
    };
    
    

    return (
        <>
            {TagData.map((item, idx) => (
                <GridContainer key={idx}>
                    <Title>{item.title}</Title>
                    <SubTitle>{item.subtext}</SubTitle>
                    <TagContainer>
                        {item.tag.map((tag, tagIdx) => (
                            <ConsultLabel
                                key={tagIdx}
                                tag={tag}
                                // selected={selectedTags.includes(tag)}
                                selected={selectedTags.includes(tag) || (tag === "기타" && customTag && isCustomTagActive)}
                                onPress={() => handleTagPress(tag)}
                                isCustomTagActive={isCustomTagActive && tag === "기타"}
                                customTag={customTag}
                                setCustomTag={handleCustomTagChange}
                                submitCustomTag={handleCustomTagSubmit}
                            />
                        ))}
                    </TagContainer>
                </GridContainer>
            ))}
        </>
    );
}



export default ConsultingLabelTag;


const GridContainer = styled.View`
    
  margin-top: 40px;
  border-bottom-width: 1px;
  border-bottom-color: ${COLORS.gray_500};
  padding-bottom: 25px;
  width : 100%;
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
