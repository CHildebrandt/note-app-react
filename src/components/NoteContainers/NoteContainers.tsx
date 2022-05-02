import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useLayoutEffect, memo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Note from "../Note/Note";
import SortMenu from "../SortMenu/SortMenu";
import TrashContainer from "../Trash/Trash";
import useStore from "../../store/store";
import DraggableList from "../DraggableList/DraggableList";
import cleanUp from "../../functions/cleanUp";
import useDomReady from "../../hooks/useDomReady";

const ListContainers = () => {
	const [pinnedIds, setPinnedIds] = useStore(useCallback(s => [s.pinnedIds, s.setPinnedIds], []));
	const [unpinnedIds, setUnpinnedIds] = useStore(useCallback(s => [s.unpinnedIds, s.setUnpinnedIds], []));
	const trashedIds = useStore(useCallback(s => s.trashedIds, []));

	const [trashOpen, setTrashOpen] = useState(false);
	const domReady = useDomReady();

	const trashBtnRef = useRef<(HTMLButtonElement | null)>(null);

	useLayoutEffect(cleanUp, [pinnedIds, unpinnedIds, trashedIds]);

	const toggleTrashOpen = useCallback(() => setTrashOpen(!trashOpen), [trashOpen]);

	return (
		<>
			<SortMenu ids={pinnedIds} reorder={setPinnedIds} />
			<DraggableList ids={pinnedIds} setter={setPinnedIds}>
				{pinnedIds.map(id => <Note key={id} id={id} />)}
			</DraggableList>

			<hr />

			<SortMenu ids={unpinnedIds} reorder={setUnpinnedIds} />
			<DraggableList ids={unpinnedIds} setter={setUnpinnedIds}>
				{unpinnedIds.map(id => <Note key={id} id={id} />)}
			</DraggableList>

			{(trashOpen) && <TrashContainer
				trashIds={trashedIds}
				setTrashOpen={setTrashOpen}
				btnRef={trashBtnRef}
			/>}

			{(domReady) && createPortal(
				<button id="show-trash-btn"
					onClick={toggleTrashOpen}
					ref={trashBtnRef}
					style={{ zIndex: '5' }}
				>
					<FontAwesomeIcon icon={faTrashAlt} />
				</button>
			, document.getElementById('left-menu')!)}
		</>
	)
}

export default memo(ListContainers)