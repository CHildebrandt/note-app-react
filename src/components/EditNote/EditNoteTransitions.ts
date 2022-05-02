import { useTransition, useSpringRef, useSpring, useChain, easings } from "react-spring";
import useFade from "../../hooks/useFade";

const revealEditedItem = () => {
	const arr = Array.from(document.getElementsByClassName('being-edited')); // only one item
	arr.forEach((x) => x.classList.remove('being-edited'));
}

function EditNoteTransitions(mounted: boolean, duration: number, from: {}, finalUnmount: () => void) {
	const modalFade = useFade(mounted, undefined, duration / 1.5);

	const fadeRef = useSpringRef();
	const popupTransition = useTransition(mounted, {
		ref: fadeRef,
		config: { duration: duration / 2 },
		from: {
			...from,
			opacity: 0
		},
		enter: {
			...from,
			opacity: 1
		},
		leave: {
			...from,
			opacity: 0
		},
		onRest: (mounted) ? undefined : finalUnmount
	})

	const moveRef = useSpringRef();
	const popupMove = useSpring({
		ref: moveRef,
		config: { duration, easing: easings.easeInOutQuad },
		from,
		to: (mounted) ? {
			x: 0,
			y: 0,
			scaleX: 1,
			scaleY: 1,
			borderRadius: (from.hasOwnProperty('borderRadius')) ? '2%' : undefined
		} : from,
		onRest: (mounted) ? undefined : revealEditedItem
	})

	const contentRef = useSpringRef();
	const contentFade = useFade(mounted, contentRef, duration);

	useChain((mounted) ? [fadeRef, moveRef, contentRef] : [contentRef, moveRef, fadeRef])

	return { modalFade, popupMove, popupTransition, contentFade };
}

export default EditNoteTransitions