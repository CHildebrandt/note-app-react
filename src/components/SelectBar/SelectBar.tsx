import { faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback } from "react";
import { createPortal } from "react-dom";
import { da } from "../../data/types";
import useDomReady from "../../hooks/useDomReady";
import useStore from "../../store/store";
import scss from './SelectBar.module.scss';

const numSelText = (da) ? 'Antal valgte: ' : 'Selected: ';

const SelectButtons = () => {
	const selectArr = useStore(useCallback(s => Object.keys(s.selectStates), []));
	const [deselectAll, fadeBeforeTrash] = useStore(useCallback(s => [s.deselectAll, s.fadeBeforeTrashSelected], []));

	const domReady = useDomReady();

	return (domReady) ? createPortal(
		<div className={`${scss.bar} ${(selectArr.length > 0) ? scss.show : ''}`} id="select-bar">
			<div style={{ order: 1 }} />
			<div style={{ order: 2 }}>
				<h2>{numSelText + selectArr.length}</h2>
				<div className="btn" onClick={deselectAll}>
					<FontAwesomeIcon icon={faTimes} size="2x" />
				</div>
				<div className="btn" onClick={fadeBeforeTrash}>
					<FontAwesomeIcon icon={faTrash} size="2x" />
				</div>
			</div>
			<div style={{ order: 3 }} />
		</div>
	, document.getElementById('outside')!) : null;
}

export default SelectButtons;