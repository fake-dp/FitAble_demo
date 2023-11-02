import { styled } from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import SearchCenterTemplate from '../homScreens/SearchCenterTemplate';

function ExerciseSearchCenterTemplate({searchCenterText,labelText}) {
    return (
        <SearchCenterTemplate 
        searchCenterText={searchCenterText}
        labelText={labelText}
        />
    );
}

export default ExerciseSearchCenterTemplate;