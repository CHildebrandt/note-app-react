import { createRef, MutableRefObject } from 'react';
import { v1 } from 'uuid';

export interface Data {
    [key: string]: (string | boolean | MutableRefObject<HTMLLIElement | null> | undefined);
    id: string;
    title: string;
    text: string;
    pin: boolean;
    trash: boolean;
    edit: string;
    color: string;
    ref: MutableRefObject<HTMLLIElement | null>;
}

export type ListItems = Data[];

// arbitrary values
export const HOVERS = {
    NONE: 0,
    BELL: 1,
    COLOR: 2,
    PIN: 3
}

export function newNoteData(title: string, text: string, edit: string): Data {
    return {
        trash: false,
        title,
        text,
        pin: false,
        edit,
        id: v1(),
        color: 'var(--background)',
        ref: createRef()
    }
}

export const da = window.navigator.language === 'da';