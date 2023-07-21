import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import styled from 'styled-components/native';
import { COLORS } from "../../constants/color";
import ConsultLabel from '../ui/label/ConsultLabel';
import ConsultInput from '../ui/inputUi/ConsultInput';

function ConsultingLabelGrid({ consultingListData }) {
  const [selectedTags, setSelectedTags] = useState({});
  const [showTextInput, setShowTextInput] = useState(false);
  const [customTag, setCustomTag] = useState("");

  const handleTagClick = (itemId, tag) => {
    setSelectedTags((prevSelectedTags) => {
      const selectedTagsForItem = prevSelectedTags[itemId] || [];
      const isTagSelected = selectedTagsForItem.includes(tag);

      if (tag === "기타") {
        // Toggle TextInput for "기타" tag
        setShowTextInput((prevShowTextInput) => !prevShowTextInput);
        setCustomTag(""); // Reset custom tag value when toggling the TextInput
      } else {
        if (isTagSelected) {
          return {
            ...prevSelectedTags,
            [itemId]: selectedTagsForItem.filter(
              (selectedTag) => selectedTag !== tag
            ),
          };
        } else if (selectedTagsForItem.length < 3) {
          return {
            ...prevSelectedTags,
            [itemId]: [...selectedTagsForItem, tag],
          };
        }
      }
      return prevSelectedTags;
    });
  };
console.log('selectedTags',selectedTags)
  return (
    <>
      {consultingListData.map((item, index) => (
        <Container key={item.id} isLastItem={index === consultingListData.length - 1}>
          <Title>{item.title}</Title>
          <SubTitle>{item.subtext}</SubTitle>
          <TagContainer>
            {item.tag
              ? item.tag.map((tag, index) => (
                  <ConsultLabel
                    key={index}
                    tag={tag}
                    selected={selectedTags[item.id]?.includes(tag)}
                    onPress={() => handleTagClick(item.id, tag)}
                  />
                ))
              : null}
          </TagContainer>
          <Content>{item.content}</Content>
          {item.title === '질병 및 유의사항' && (
            <ConsultInput/>
          )}
        </Container>
      ))}
    </>
  );
}

export default ConsultingLabelGrid;

const Container = styled.View`
  margin-top: 40px;
  border-bottom-width: 1px;
  border-bottom-color: ${COLORS.gray_500};
  padding: 10px 0;
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
