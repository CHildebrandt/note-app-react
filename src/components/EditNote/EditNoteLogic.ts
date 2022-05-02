import { useState, useRef, useEffect, ChangeEvent, useCallback } from "react";
import { da } from "../../data/types";
import useResizeObserver from "../../hooks/useResizeObserver";
import useToggleOnce from "../../hooks/useToggleOnce";
import useStore from "../../store/store";
import EditNoteTransitions from "./EditNoteTransitions";
import getRect from "./getRect";

const duration = 300;
const lastEditText = (da) ? 'Sidst redigeret d. ' : 'Last edit was ';

function EditNoteLogic(props: { editId: string, setEditId: (id: string) => void }) {
	const { editId, setEditId } = props;

	const isNewNote = editId === 'new-note';
	const items = useStore(useCallback(s => Object.keys(s.noteStates).map(key => s.noteStates[key]), []));
	const note = (!isNewNote) ? items.filter((p) => p.id === editId)[0] : { title: '', text: '', edit: '' };
	const [newNote, updateNote] = useStore(useCallback(s => [s.newNote, s.updateNote], []));
	
	// hidePopup initializes unmounting animation
	const [mounted, startUnmount] = useToggleOnce(true);
	const titleVal = useRef(note.title);
	const textVal = useRef(note.text);

	const textRef = useRef<(HTMLTextAreaElement | null)>(null);

	const { size, ref } = useResizeObserver(21);
	const [from, setFrom] = useState(getRect(editId, items, size));

	useEffect(() => {
		if (mounted) {
			setFrom(getRect(editId, items, size));
		}
	}, [mounted, editId, items, size])

	// unmounts component completely
	const finalUnmount = useCallback(() => {
		setEditId('');
	}, [setEditId]);

	const { 
		modalFade, 
		popupMove, 
		popupTransition, 
		contentFade 
	} = EditNoteTransitions(mounted, duration, from, finalUnmount);

	// FOCUS TEXT
	useEffect(() => {
		setTimeout(() => {
			if (textRef.current) {
				textRef.current.focus();
			}
		}, duration);
	}, [])

	const save = useCallback(() => {
		if (titleVal.current !== note.title || textVal.current !== note.text) {
			if (isNewNote) {
				newNote(titleVal.current, textVal.current);
			}
			else {
				updateNote(editId, titleVal.current, textVal.current);
			}
		}
		startUnmount();
	}, [note.title, note.text, editId, startUnmount, isNewNote, newNote, updateNote])

	const changeTitle = (e: ChangeEvent<HTMLInputElement>) => titleVal.current = e.target.value;
	const changeText = (e: ChangeEvent<HTMLTextAreaElement>) => textVal.current = e.target.value;

	const time = (da) ? note.edit : note.edit.replace('kl.', '-');

	return {
		funcs: {
			modalFade,
			startUnmount,
			popupTransition,
			changeTitle,
			changeText,
			save,
			contentFade
		},
		vals: {
			ref,
			textRef,
			popupMove,
			title: note.title,
			text: note.text,
			edit: (note.edit) ? lastEditText + time : ''
        }
    }
}

export default EditNoteLogic