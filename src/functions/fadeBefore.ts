import { Data } from "../data/types";
import useStore from "../store/store";

function initFadeElem(elem: HTMLElement, delay: number, duration: number) {
    elem.style.transition = `all ${duration}ms`;
    if (delay !== 0) {
        elem.style.transitionDelay = `${delay}`;
    }
    elem.style.opacity = '0';
}

const refsAreNull = (x: any) => x.ref.current === null;

/** 
 * Fades out one or more elements, and animates siblings to their new position before calling a function.
 * Any library do this?
 * */
function fadeBefore(
    items: (Data | Data[]),
    fn: (() => void) | undefined,
    duration: number = 400, 
    moveSiblings: boolean = true, 
    delay: number = 0
) {
    // Clear any active search, for simplicity
    if (useStore.getState().searchVal) {
        useStore.getState().clearSearch();
        setTimeout(() => {
            fadeBefore(items, fn, duration, moveSiblings, delay);
        }, duration);
        return;
    }

    if (!Array.isArray(items)) {
        items = [items];
    }
    if (items.some(refsAreNull)) {
        return;
    }

    items.forEach(item => initFadeElem(item.ref.current!, delay, duration))

    const isTrashed = items[0].trash;
    const isPinned = items[0].pin;

    if (moveSiblings) {
        const all = (isTrashed 
            ? useStore.getState().trashedIds 
            : isPinned 
                ? useStore.getState().pinnedIds 
                : useStore.getState().unpinnedIds
            ).map(x => useStore.getState().noteStates[x]);
        
        if (all.some(refsAreNull)) {
            return;
        }
        const ids = items.map(x => x.id);
        const firstIndex = all.findIndex(x => ids.includes(x.id));
        
        const fadeIds = items.map(x => x.id);

        const siblingIndexes: number[] = all.reduce((acc, curr, index) => {
            if (!fadeIds.includes(curr.id)) {
                acc.push(index);
            }
            return acc;
        }, [] as number[]);
        
        let dec = 0;
        const domArr = all.map(x => x.ref.current!)
        const xOffsets = domArr.map(x => x.offsetLeft);
        const yOffsets = domArr.map(x => x.offsetTop);

        const len = all.length;
        for (let i = firstIndex; i < len; i++) {
            // if current is a fading item
            if (!siblingIndexes.includes(i)) {
                dec += 1;
                continue;
            }
            domArr[i].style.transition = `all ${duration}ms`;
            const x = xOffsets[i - dec] - xOffsets[i];
            const y = yOffsets[i - dec] - yOffsets[i];
            domArr[i].style.transform = `translate3d(${x}px, ${y}px, 0)`;
        }
    }
    if (fn) {
        setTimeout(fn, duration);
    }
}

export default fadeBefore