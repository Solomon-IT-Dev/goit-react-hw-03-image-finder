import PropTypes from 'prop-types';
import { SearchbarContainer, SearchForm, SearchFormBtn, SearchFormBtnLabel, SearchFormInput } from './Searchbar.styled';
import { IconContext } from 'react-icons';
import { MdSearch } from 'react-icons/md';

export default function Searchbar(props) {
    return (
        <SearchbarContainer>
            <SearchForm>
                <SearchFormBtn type="submit" aria-label="Search images">
                    <IconContext.Provider value={{ size: "2.5em" }}>
                        <MdSearch />
                    </IconContext.Provider>
                    <SearchFormBtnLabel>Search</SearchFormBtnLabel>
                </SearchFormBtn>

                <SearchFormInput
                type="text"
                autocomplete="off"
                autoFocus
                placeholder="Search images and photos"
                />
            </SearchForm>
        </SearchbarContainer>
    );
};