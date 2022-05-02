import scss from './MainSection.module.scss';
import NewNote from '../NewNote/NewNote';
import EditNote from '../EditNote/EditNote';
import SelectBar from '../SelectBar/SelectBar';
import NoteContainers from '../NoteContainers/NoteContainers';
import useStore from '../../store/store';
import useResizeObserver from '../../hooks/useResizeObserver';
import { useCallback, useEffect } from 'react';

function MainSection() {
	const [editId, setEditId] = useStore(useCallback(s => [s.editId, s.setEditId], []));
	const { ref, size } = useResizeObserver();
	const clearSearch = useStore(useCallback(s => s.clearSearch, []))

	// if window resizes while search is active, then we clear the search and any animation offsets
	useEffect(clearSearch, [size, clearSearch]);

    return (
		<div className={scss.cont}>
			{/* nesting to get a padding for the scrollbar of the inner div */}
            <div>
                <div ref={ref}>
					<NewNote setEditId={setEditId} />
					{(editId) && <EditNote editId={editId} setEditId={setEditId} />}
					<NoteContainers />
					<SelectBar />
				</div>
            </div>
        </div>
	)
}

export default MainSection;
