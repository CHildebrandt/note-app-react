import { Data } from "../../data/types";
import useStore from "../../store/store";

const isNull = (x: (HTMLLIElement|null)) => x === null;
const animationTime = 300;

function searchSort(results: HTMLLIElement[], allItems: HTMLLIElement[]) {
	const unres = allItems.filter(x => !results.includes(x));
	const comb = results.concat(unres);

	comb.forEach((x, i) => {
		
		const fX = x.offsetLeft, fY = x.offsetTop;
		const tX = allItems[i].offsetLeft, tY = allItems[i].offsetTop;
		x.style.transform = `translate(${tX - fX}px, ${tY - fY}px)`;
	})
}

const SearchAnimation = (searchVal: string) => {
	const pinnedIds = useStore.getState().pinnedIds;
	const unpinnedIds = useStore.getState().unpinnedIds;

	const itemStates = useStore.getState().noteStates;

	const pinnedData = pinnedIds.map(id => itemStates[id]);
	const unpinnedData = unpinnedIds.map(id => itemStates[id]);
	const dom1 = pinnedData.map(x => x.ref.current!);
	const dom2 = unpinnedData.map(x => x.ref.current!);
	
	if (dom1.some(isNull) || dom2.some(isNull)) return

	const data = pinnedData.concat(unpinnedData);
	const items = dom1.concat(dom2);
	items.forEach((note) => {
		note.classList.remove('hazy');
	});

	const sortMenus = Array.from(document.getElementsByClassName('sort-bar')) as HTMLDivElement[];
	// const newNote = document.getElementById('new-note') as HTMLDivElement;
	// const leftMenu = document.getElementById('left-menu') as HTMLDivElement;

	if (searchVal !== '') {
		const searchFilter = (x: Data) => x.title.concat(x.text).toLowerCase().includes(searchVal.toLowerCase());
		const searchFilterNot = (x: Data) => !x.title.concat(x.text).toLowerCase().includes(searchVal.toLowerCase());

		items.forEach((x) => { x.style.transition = `all ${animationTime}ms`; });
		const unResults = data.filter(searchFilterNot).map(y => y.ref.current!);

		const pinnedRes = pinnedData.filter(searchFilter).map(y => y.ref.current!);
		const unpinnedRes = unpinnedData.filter(searchFilter).map(y => y.ref.current!);
		searchSort(pinnedRes, dom1);
		searchSort(unpinnedRes, dom2);

		unResults.forEach((x) => x.classList.add('hazy'));

		sortMenus.forEach(x => x.classList.add('disabled'));
		// newNote.classList.add('disabled');
		// leftMenu.classList.add('disabled');
	}
	else {
		items.forEach((note) => {
			note.style.transform = '';
		});
		setTimeout(() => {
			items.forEach((note) => {
				note.style.transition = '';
			});
			sortMenus.forEach(x => x.classList.remove('disabled'));
			// newNote.classList.remove('disabled');
			// leftMenu.classList.remove('disabled');
		}, animationTime)
	}
}

export default SearchAnimation