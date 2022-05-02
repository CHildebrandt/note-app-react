const cleanUp = () => {
	// simplest way of accessing
	const arr = Array.from(document.getElementsByClassName('note')) as HTMLLIElement[];
	arr.forEach((elem) => {
		elem.style.transitionDuration = '';
		elem.style.transform = '';
	});
	const editClean = Array.from(document.getElementsByClassName('being-edited'));
	editClean.forEach(x => x.classList.remove('being-edited'));
};
export default cleanUp