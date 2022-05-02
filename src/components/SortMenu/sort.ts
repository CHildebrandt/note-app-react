import { Data } from "../../data/types";
import useStore from "../../store/store";

function sort(arr: string[], how: 'date' | 'title' | 'text', ascending: boolean = false) {
	const itemStates = useStore.getState().noteStates as {[key: string]: Data};
	const clone = [...arr];

	if (how === 'date') {
		clone.sort((a, b) => {
			if (itemStates[a].edit > itemStates[b].edit) return 1;
			else return -1;
		});
	}
	else if (how === 'title') {
		clone.sort((a, b) => {
			if (itemStates[a].title.toLowerCase() > itemStates[b].title.toLowerCase()) return 1;
			else return -1;
		});
	}
	else {
		clone.sort((a, b) => {
			if (itemStates[a].text.toLowerCase() > itemStates[b].text.toLowerCase()) return 1;
			else return -1;
		});
	}
	if (ascending) {
		clone.reverse();
	}

	const len = clone.length;
	for (let i = 0; i < len; i++) {
		const to = itemStates[arr[i]].ref.current;
		const from = itemStates[clone[i]].ref.current;
		if (!from || !to) {
			return arr;
		}
		const xTo = to.offsetLeft, yTo = to.offsetTop;
		const xFrom = from.offsetLeft, yFrom = from.offsetTop;
		from.style.transition = 'all 0.3s';
		from.style.transform = `translate3d(${xTo - xFrom}px, ${yTo - yFrom}px, 0px)`;
	}
		
	return clone;
}

export default sort;