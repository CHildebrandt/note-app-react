import { Data, ListItems } from '../data/types';

export function initStates(items: ListItems): { [key: string]: Data; } {
    const toReturn: { [key: string]: Data; } = {};
    items.forEach(item => toReturn[item.id] = item);
    return toReturn;
}
