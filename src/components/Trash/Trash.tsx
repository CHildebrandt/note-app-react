import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { memo, MutableRefObject, useCallback } from 'react';
import { a } from 'react-spring';
import TrashTransitions from './TrashTransitions';
import scss from './Trash.module.scss';
import { da } from '../../data/types';
import Note from '../Note/Note';
import useToggleOnce from '../../hooks/useToggleOnce';

const duration = 400;
const emptyText = (da) ? 'Her er tomt. Prøv at smide en note ud.' : '...is empty. Try throwing out a note.';
const headline = (da) ? 'Papirkurv' : 'Trash'

function Trash(props: {
	trashIds: string[], 
	setTrashOpen: (a: boolean) => void, 
	btnRef: MutableRefObject<HTMLButtonElement | null> 
}) {
	const { trashIds, setTrashOpen, btnRef } = props;

	const [mounted, startUnmount] = useToggleOnce(true);

	const unmount = useCallback(() => {
		setTimeout(() => {
			setTrashOpen(false);
		}, duration * 1.5)
	}, [setTrashOpen])

	const { 
		mountModal, 
		mountContainer, 
		fadeContent 
	} = TrashTransitions(mounted, duration, btnRef, unmount);
	
	return (
		<>
			{mountModal((style, item) => (item) && <a.div className={scss.bg} id="trash-modal" onClick={startUnmount} style={style} />)}

			{mountContainer((style, item) => (item) && <a.div className={scss.trash} style={style}>
				{fadeContent((style, item) => (item) && <a.div id="trash-content" style={style}>
					<button className={scss.close} id="hide-trash-btn" onClick={startUnmount}>
						<FontAwesomeIcon icon={faTimes} size="3x" />
					</button>
					<h1>{headline}</h1>
					{(trashIds.length > 0) 
						? <ul className="trash-ul" id="trash-ul">
							{trashIds.map(x => <Note key={x} id={x} />)}
						</ul>
						: <h2>{emptyText}</h2>
					}
				</a.div>)}
			</a.div>)}
		</>
	);
}

export default memo(Trash);