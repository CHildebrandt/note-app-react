import { ListItems } from "../../data/types";

/**Will only work with the defined breakpoints and CSS */
function getRect(editId: string, items: ListItems, size: { width: number, height: number }) {
	if (!size.height || !size.width) {
		return {};
	}
	const index = items.findIndex(x => x.id === editId);
	let editedNode = (index !== -1) ? items[index].ref.current : document.getElementById(editId);
	if (!editedNode) return {};
	const wWidth = window.innerWidth;
	const wHeight = window.innerHeight;
	if (editId === 'new-note') {
		if (wWidth <= 1700) {
			editedNode = document.getElementById('new-note-btn') as HTMLElement;
        }
		if (!editedNode) return {};
    }
	const { x: xVal, y: yVal, width, height } = editedNode.getBoundingClientRect();
	
	// dividing by two as the element is centered on the window, and we're using top-left as transform origin
	const x = xVal - (wWidth / 2) + (size.width / 2);
	const y = yVal - (wHeight / 2) + (size.height / 2);
	const scaleX = width / size.width;
	const scaleY = height / size.height;
	return {
		x,
		y,
		scaleX,
		scaleY,
		borderRadius: (editId === 'new-note' && wWidth <= 1700) ? '50%' : undefined
	};
}

export default getRect;