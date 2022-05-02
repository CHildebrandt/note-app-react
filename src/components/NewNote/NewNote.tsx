import { faStickyNote } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MouseEvent, useCallback, useEffect, useRef } from "react";
import { da } from "../../data/types";
import useStore from "../../store/store";
import scss from './NewNote.module.scss';

function NewNote(props: { setEditId: (id: string) => void }) {
	const { setEditId } = props;
	const clearSearch = useStore(useCallback(s => s.clearSearch, []));
	// We don't need to re-render when search value changes
	const searchVal = useRef(useStore.getState().searchVal);
	useEffect(() => useStore.subscribe(s => (searchVal.current = s.searchVal)), []);

	const onClick = useCallback((event: MouseEvent<HTMLInputElement | HTMLButtonElement, globalThis.MouseEvent>) => {
		if (searchVal.current) {
			clearSearch();
		}
		setEditId('new-note');
		event.currentTarget.classList.add('being-edited');
	}, [setEditId, searchVal, clearSearch])

	return (
		<div className={scss.new} id="new-note">
			<input 
				type="text" 
				placeholder={(da) ? 'Ny note' : 'New note'} 
				id="new-note-text" 
				onClick={onClick} 
			/>
			<button id="new-note-btn" className={scss.button} onClick={onClick}>
				<FontAwesomeIcon icon={faStickyNote} size="3x" />
			</button>
		</div>
	);
}

export default NewNote;