import { a } from 'react-spring';
import EditNoteLogic from './EditNoteLogic';
import scss from './EditNote.module.scss';
import { da } from '../../data/types';

const titlePlace = (da) ? 'Overskrift' : 'Title';
const textPlace = (da) ? 'Din tekst...' : 'Your text...';
const saveText = (da) ? 'Gem' : 'Save';
const cancelText = (da) ? 'Annulér' : 'Cancel';

function EditNote(props: { editId: string, setEditId: (id: string) => void }) {
	
	if (!props.editId) return null;
	const { funcs, vals } = EditNoteLogic(props);

	const { modalFade, startUnmount, popupTransition, changeTitle, changeText, save, contentFade } = funcs;
	const { ref, textRef, popupMove, title, text, edit } = vals;

	return (
		<>
			{modalFade((style, item) => (item) && 
				<a.div className={scss.bg} onClick={startUnmount} style={style} />
            )}
			{popupTransition((style, item) => (item) && 
				<a.div ref={ref} className={scss.edit} style={{ ...style, ...popupMove, width: Math.min(400, window.innerWidth) }}>
					{contentFade((style, item) => (item) && 
						<a.div style={style}>
							<input type="text" placeholder={titlePlace} defaultValue={title} onChange={changeTitle} />
							<textarea name="text" placeholder={textPlace} defaultValue={text} ref={textRef} onChange={changeText} />
							<span>{edit}</span>
							<div className={scss.btns}>
								<button onClick={save}>{saveText}</button>
								<button onClick={startUnmount}>{cancelText}</button>
							</div>
						</a.div>
                    )}
				</a.div>
			)}
		</>
	);
}

export default EditNote;