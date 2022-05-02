import { MutableRefObject, useEffect, useState } from "react";
import { useTransition, easings } from "react-spring";
import useFade from "../../hooks/useFade";

function getBtnRect(btnRef: MutableRefObject<HTMLButtonElement | null>) {
	const btn = btnRef.current;
	if (btn === null) return {
		x: 0,
		y: 0,
		scaleX: 1,
		scaleY: 1,
		borderRadius: 20,
		opacity: 0.7
	};
	const { x, y, width, height } = btn.getBoundingClientRect();
	const winWidth = window.innerWidth;
	const winHeight = window.innerHeight;
	return {
		x: x - winWidth * 0.1,
		y: y - winHeight * 0.1,
		scaleX: width / (winWidth * 0.8 + 20),
		scaleY: height / (winHeight * 0.8 + 20),
		borderRadius: 200,
		opacity: 0.7
	}
}

function TrashContainerTransitions(mounted: boolean, duration: number, btnRef: MutableRefObject<HTMLButtonElement | null>, unmount: () => void) {
	const [from, setFrom] = useState(getBtnRect(btnRef));

	useEffect(() => {
		const updFrom = () => setFrom(getBtnRect(btnRef));
		window.addEventListener('resize', updFrom);
		return () => window.removeEventListener('resize', updFrom);
	}, [setFrom, btnRef])

	const mountModal = useFade(mounted, undefined, duration, easings.linear, (mounted) ? 0 : duration / 2, (mounted) ? undefined : unmount);

	const mountContainer = useTransition(mounted, {
		config: { duration, easing: easings.easeInOutCubic },
		delay: (mounted) ? 0 : duration / 2,
		from,
		enter: {
			x: 0,
			y: 0,
			scaleX: 1,
			scaleY: 1,
			borderRadius: 20,
			opacity: 1
		},
		leave: from
	})

	const fadeContent = useFade(mounted, undefined, duration / 2, undefined, (mounted) ? duration / 2 : 0);

	return { mountModal, mountContainer, fadeContent };
}

export default TrashContainerTransitions;