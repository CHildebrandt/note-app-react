import scss from './SortMenu.module.scss';
import { faCalendarDay, faCaretDown, faCaretUp, faSortAlphaDown, faSortAlphaUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { memo } from 'react';
import { da } from '../../data/types';
import sortingCallbacks from './sortingCallbacks';

const title = (da) ? 'Titel' : 'Title';
const text = (da) ? 'Tekst' : 'Text';

function SortMenu(props: {
    ids: string[], 
    reorder: (ids: string[]) => void 
}) {
    const { ids, reorder } = props;
    const { 
        dateDesc, 
        dateAsc, 
        titleDesc, 
        titleAsc, 
        textDesc, 
        textAsc 
    } = sortingCallbacks(ids, reorder);
    const style = {marginLeft: '15px'}

    return (
        <div className={scss.bar}>
            <div>
                <button aria-label="Sort by date, descending" onClick={dateDesc}>
                    <FontAwesomeIcon icon={faCalendarDay} />
                    <FontAwesomeIcon style={style} icon={faCaretDown} />
                </button>
                <button aria-label="Sort by date, ascending" onClick={dateAsc}>
                    <FontAwesomeIcon icon={faCalendarDay} />
                    <FontAwesomeIcon style={style} icon={faCaretUp} />
                </button>
                <button onClick={titleDesc}>
                    {title}
                    <FontAwesomeIcon style={style} icon={faSortAlphaDown} />
                </button>
                <button onClick={titleAsc}>
                    {title}
                    <FontAwesomeIcon style={style} icon={faSortAlphaUp} />
                </button>
                <button onClick={textDesc}>
                    {text}
                    <FontAwesomeIcon style={style} icon={faSortAlphaDown} />
                </button>
                <button onClick={textAsc}>
                    {text}
                    <FontAwesomeIcon style={style} icon={faSortAlphaUp} />
                </button>
            </div>
        </div>
    )
}

export default memo(SortMenu);