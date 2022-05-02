import { useEffect, ChangeEvent, memo, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { debounce } from 'lodash';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import SearchAnimation from './SearchAnimation';
import useStore from '../../store/store';
import { da } from '../../data/types';
import scss from './TopBar.module.scss';

function Search() {
	const [
		searchVal, 
		setSearchVal, 
		clear, 
		searchInputRef
	] = useStore(useCallback(s => [s.searchVal, s.setSearchVal, s.clearSearch, s.searchInputRef], []));

	useEffect(() => SearchAnimation(searchVal), [searchVal]);

	const onChange = debounce((e: ChangeEvent<HTMLInputElement>) => {
		setSearchVal(e.target.value)
	}, 300);

	return (
		<div className={scss.search} style={{ position: 'relative' }}>
			<input 
				type="text" 
				id="search-bar" 
				style={{
					boxShadow: (searchVal) ? '0 0 1em var(--highlight)' : undefined
				}} 
				placeholder={(da) ? 'Søg' : 'Search'} 
				ref={searchInputRef} 
				onChange={onChange} 
			/>
			<button aria-label="Clear search" id="search-btn" onClick={clear}>
				<FontAwesomeIcon icon={searchVal ? faTimes : faSearch} />
			</button>
		</div>
	)
}

export default memo(Search);