import { useRef, useCallback, useEffect, useState } from 'react';
import ResizeObserverPolyfill from 'resize-observer-polyfill';

const ResizeObserver = window.ResizeObserver || ResizeObserverPolyfill;

export default function useResizeObserver(paddingPlusBorder: number = 0) {
	const plus = paddingPlusBorder * 2;
	const [size, setSize] = useState({ width: 0, height: 0 });
	const resizeObserver = useRef<ResizeObserver>(null!);

	const onResize = useCallback((entries) => {
		const { width, height } = entries[0].contentRect;
		setSize({ width: width + plus, height: height + plus });
	}, [plus]);

	const ref = useCallback((node) => {
		if (node !== null) {
			if (resizeObserver.current) {
				resizeObserver.current.disconnect();
			}
			resizeObserver.current = new ResizeObserver(onResize);
			resizeObserver.current.observe(node);
		}
	}, [onResize]);

	useEffect(() => () => {
		resizeObserver.current.disconnect();
	}, []);

	return { ref, width: size.width, height: size.height, size };
}