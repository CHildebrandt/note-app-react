import sort from './sort';

function sortingCallbacks(
	items: string[], 
	reorder: (items: string[]) => void
) {
	function sortItems(how: 'date' | 'title' | 'text', ascending: boolean = false) {
		const sorted = sort(items, how, ascending);
		setTimeout(() => {
			reorder(sorted);
		}, 300);
	}

	const dateDesc = () => sortItems('date');
	const dateAsc = () => sortItems('date', true);
	const titleDesc = () => sortItems('title');
	const titleAsc = () => sortItems('title', true);
	const textDesc = () => sortItems('text');
	const textAsc = () => sortItems('text', true);

	return {
		dateDesc, dateAsc, titleDesc, titleAsc, textDesc, textAsc
    }
}

export default sortingCallbacks