import PropTypes from 'prop-types';
import { Searchbar, SearchForm, SearchFormBtn, SearchFormBtnLabel, SearchFormInput } from './Searchbar.styled';

export default function Searchbar(props) {
    return (
        <Searchbar>
            <SearchForm>
                <SearchFormBtn type="submit">
                    <SearchFormBtnLabel>Search</SearchFormBtnLabel>
                </SearchFormBtn>

                <SearchFormInput
                class="input"
                type="text"
                autocomplete="off"
                autofocus
                placeholder="Search images and photos"
                />
            </SearchForm>
        </Searchbar>
    );
};