import { useState, useCallback } from "react";
import { useTransition } from "react-spring";
import {  HOVERS } from "../../data/types";
import { faBell, faBellSlash, faThumbtack, faTimes, faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons';
import useStore from "../../store/store";
import scss from './Note.module.scss';
import useCurry from "../../hooks/useCurry";
import useToggle from "../../hooks/useToggle";
import { useSortable } from "@dnd-kit/sortable";
import useMergeRefs from "../../hooks/useMergeRefs";
import { SortableTransition } from "@dnd-kit/sortable/dist/hooks/types";
import { CSS } from '@dnd-kit/utilities';

const Transition: SortableTransition = { duration: 500, easing: 'cubic-bezier(0.25, 1, 0.5, 1)' };

function NoteLogic(id: string) {
    const state = useStore(useCallback(s => s.noteStates[id], [id]));
    const selected = useStore(useCallback(s => s.selectStates[id], [id]));
    const draggingDisabled = useStore(useCallback(s => s.draggingDisabled, []));
    
    const [hovered, setHovered] = useState(false);
    const [hoveredButton, hoverButtonCurry] = useCurry(HOVERS.NONE);
    const [notif, toggleNotif] = useToggle(false);

    // curried functions from the store
    const [
        click,
        toggleSelect,
        togglePin,
        trashNote,
        setColor
    ] = useStore(useCallback(s => [
        s.click(id), 
        s.toggleSelect(id), 
        s.pinClick(id), 
        s.trashClick(id),
        s.setColor(id)
    ], [id]));

    const fade = useTransition(hovered, {
        config: { duration: 150 },
        from: { opacity: (selected) ? 1 : 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 }
    });

    const mouseEnter = useCallback(() => setHovered(true), []);
    const mouseLeave = useCallback(() => {
        hoverButtonCurry(HOVERS.NONE)();
        setHovered(false);
    }, [hoverButtonCurry])

    const className = `note ${scss.note} ${selected ? scss.selected : ''} ${state.trash ? scss.trash : ''}`;
    const showPin = (state.pin || hovered);
    const pinIcon = (hoveredButton === HOVERS.PIN && state.pin) ? faTimes : faThumbtack;
    const notifIcon = (notif) ? faBell : faBellSlash;
    const notifToggleIcon = (notif) ? faToggleOn : faToggleOff;
    
    const { 
        listeners, 
        setNodeRef, 
        transform, 
        transition, 
    } = useSortable({ id, transition: Transition, disabled: draggingDisabled });
    const rootStyle = { transform: CSS.Transform.toString(transform), transition};
    const mergedRef = useMergeRefs(setNodeRef, state.ref);

    return {
        hovers: { 
            mouseEnter, 
            mouseLeave, 
            hoveredButton, 
            hoverButtonCurry 
        },
        functions: { 
            toggleNotif, 
            click, 
            toggleSelect, 
            setColor, 
            trashNote, 
            togglePin 
        },
        values: { 
            title: state.title, 
            text: state.text, 
            selected, 
            className, 
            showPin, 
            fade, 
            pinIcon, 
            notifIcon, 
            notifToggleIcon, 
            color: state.color 
        },
        drag: { 
            listeners, 
            mergedRef, 
            rootStyle 
        }
    }
}

export default NoteLogic