import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo, faUser } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import AppInfo from '../AppInfo/AppInfo';
import Search from './Search';
import scss from './TopBar.module.scss';

function Topbarcontainer() {
    const [infoOpen, setInfoOpen] = useState(false);

    return (
        <div className={scss.top}>
            <div style={{ order: 1 }}>
                <div className={scss.user + " btn"}>
                    <FontAwesomeIcon icon={faUser} size="2x" />
                </div>
            </div>
            <div style={{ order: 2 }}>
                <Search />
            </div>
            <div style={{ order: 3 }}>
                <button onClick={() => setInfoOpen(!infoOpen)}>
                    App info <FontAwesomeIcon icon={faInfo} style={{ marginLeft: '5px' }} />
                </button>
            </div>
            {infoOpen && <AppInfo setInfoOpen={setInfoOpen} />}
        </div>
    )
}

export default Topbarcontainer;