import create from 'zustand'
import { createRef, MutableRefObject } from 'react';
import { Data, newNoteData } from '../data/types'
import { initStates } from './initStates';
import removeProperty from './removePropertyImmutably';
import dataInit from '../data/data';
import fadeBefore from '../functions/fadeBefore';

interface Store {
    noteStates: {[key: string]: Data}
    setSingleNoteState: (id: string, newState: Data) => void
    
    pinnedIds: string[];
    unpinnedIds: string[];
    trashedIds: string[];
    setPinnedIds: (pinnedIds: string[]) => void;
    setUnpinnedIds: (unpinnedIds: string[]) => void;
    
    trash: (id: string) => void;
    unTrash: (id: string) => void;
    togglePin: (id: string) => void;
    pin: (id: string) => void;
    unPin: (id: string) => void;
    
    selectStates: { [key: string]: boolean };
    toggleSelect: (id: string) => () => void;
    addSelect: (id: string) => void;
    removeSelect: (id: string) => void;
    deselectAll: () => void;
    trashSelected: () => void;
    
    updateNote: (id: string, title: string, text: string) => void;
    newNote: (title: string, text: string) => void;
    editId: string;
    setEditId: (id: string) => void;
    draggingDisabled: boolean;
    
    searchVal: string;
    setSearchVal: (search: string) => void;
    clearSearch: () => void;
    searchInputRef: MutableRefObject<HTMLInputElement | null>;
    
    click: (id: string) => () => void;
    pinClick: (id: string) => () => void;
    trashClick: (id: string) => () => void;
    setColor: (id: string) => (color: string) => void;
    fadeBeforeTrashSelected: () => void;
}

const useStore = create<Store>((set, get) => ({
    // Storing all note states in a single object. Each note component then only needs its id to get its state, and any parent or sorting function only needs an array of ids.
    noteStates: initStates(dataInit),
    setSingleNoteState: (id, newState) => set(s => ({
        noteStates: {...s.noteStates, [id]: newState},
    })),

    pinnedIds: dataInit.filter(item => item.pin).map(x => x.id),
    unpinnedIds: dataInit.filter(item => !item.pin).map(x => x.id),
    trashedIds: [],
    setPinnedIds: (pinnedIds) => set({ pinnedIds }),
    setUnpinnedIds: (unpinnedIds) => set({ unpinnedIds }),

    trash: (id) => {
        const s = get();
        if (!s.trashedIds.includes(id)) {
            const trashedIds = [...s.trashedIds, id];
            if (s.noteStates[id].pin) {
                set({ 
                    trashedIds, 
                    pinnedIds: s.pinnedIds.filter(x => x !== id) 
                });
            }
            else {
                set({ 
                    trashedIds, 
                    unpinnedIds: s.unpinnedIds.filter(x => x !== id) 
                });
            }
            s.setSingleNoteState(id, {...s.noteStates[id], trash: true})
        }
    },
    unTrash: (id) => {
        const s = get();
        if (!s.pinnedIds.includes(id) && !s.unpinnedIds.includes(id)) {
            set({ trashedIds: s.trashedIds.filter(x => x !== id) });
            if (s.noteStates[id].pin) {
                s.setPinnedIds([...s.pinnedIds, id]);
            }
            else {
                s.setUnpinnedIds([...s.unpinnedIds, id]);
            }
            s.setSingleNoteState(id, {...s.noteStates[id], trash: false});
        }
    },
    togglePin: (id) => {
        const s = get();
        s.noteStates[id].pin ? s.unPin(id) : s.pin(id)
    },
    pin: (id) => {
        const s = get();
        if (!s.pinnedIds.includes(id)) {
            s.setUnpinnedIds(s.unpinnedIds.filter((x) => x !== id));
            s.setPinnedIds([...s.pinnedIds, id]);
            s.setSingleNoteState(id, {...s.noteStates[id], pin: true});
        }
    },
    unPin: (id) => {
        const s = get();
        if (!s.unpinnedIds.includes(id)) {
            s.setPinnedIds(s.pinnedIds.filter((x) => x !== id));
            s.setUnpinnedIds([...s.unpinnedIds, id]);
            s.setSingleNoteState(id, {...s.noteStates[id], pin: false});
        }
    },

    selectStates: {},
    addSelect: (id: string) => set(s => ({
        selectStates: { ...s.selectStates, [id]: true }
    })),
    removeSelect: (id: string) => set(s => ({
        selectStates: removeProperty(s.selectStates, id)
    })),
    deselectAll: () => set({ selectStates: {} }),
    trashSelected: () => {
        const s = get();
        const selectIds = Object.keys(s.selectStates);
        const filter = (id: string) => !selectIds.includes(id);
        const noteStates = selectIds.reduce((acc, curr) => ({
            ...acc, [curr]: {
                ...s.noteStates[curr], trash: true
            }
        }), s.noteStates);
        set({
            noteStates,
            trashedIds: [...s.trashedIds, ...selectIds],
            pinnedIds: s.pinnedIds.filter(filter),
            unpinnedIds: s.unpinnedIds.filter(filter),
            selectStates: {}
        })
    },

    updateNote: (id, title, text) => {
        const s = get();
        const replacer = {...s.noteStates[id]};
        replacer.title = title;
        replacer.text = text;
        replacer.edit = new Date().toISOString().replace('T', ' kl. ').slice(0, -5);
        s.setSingleNoteState(id, replacer);
    },
    newNote: (title, text) => {
        const s = get();
        const edit = new Date().toISOString().replace('T', ' kl. ').slice(0, -5);
        const note = newNoteData(title, text, edit);
        s.setSingleNoteState(note.id, note);
        s.setUnpinnedIds([...s.unpinnedIds, note.id]);
    },
    editId: '',
    setEditId: (editId) => set({ editId }),
    draggingDisabled: false,

    searchVal: '',
    setSearchVal: (search) => set({
        searchVal: search,
        draggingDisabled: (search) ? true : false
    }),
    clearSearch: () => {
        const s = get();
        s.setSearchVal('');
        if (s.searchInputRef.current) {
            s.searchInputRef.current.value = '';
        }
    },
    searchInputRef: createRef(),

    click: (id) => () => {
        const s = get();
        if (s.noteStates[id].trash) {
            fadeBefore(s.noteStates[id], () => s.unTrash(id));
        }
        else {
            s.noteStates[id].ref.current?.classList.add('being-edited');
            s.setEditId(id);
        }
    },
    toggleSelect: (id) => () => {
        const s = get();
        s.selectStates[id] ? s.removeSelect(id) : s.addSelect(id);
    },
    pinClick: (id) => () => {
        const s = get();
        fadeBefore(s.noteStates[id], () => s.togglePin(id));
    },
    trashClick: (id) => () => {
        const s = get();
        if (s.selectStates[id]) {
            s.removeSelect(id);
        }
        fadeBefore(s.noteStates[id], () => s.trash(id));
    },
    setColor: (id) => (color) => {
        const s = get();
        s.setSingleNoteState(id, {...s.noteStates[id], color})
    },
    fadeBeforeTrashSelected: () => {
        const s = get();
		if (s.searchVal) {
			s.trashSelected();
			s.clearSearch();
			return;
		}
		const selectedItems = Object.keys(s.selectStates).map(x => s.noteStates[x]);
		if (selectedItems.length > 0) {
			const pinnedSelected = selectedItems.filter(x => x.pin);
			const unpinnedSelected = selectedItems.filter(x => !x.pin);
			if (pinnedSelected.length > 0) {
				fadeBefore(pinnedSelected, s.trashSelected);
			} 
			if (unpinnedSelected.length > 0) {
				fadeBefore(unpinnedSelected, s.trashSelected);
			}
		}
	}
}))

export default useStore;