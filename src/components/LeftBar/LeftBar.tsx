import { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faPalette, faSun } from "@fortawesome/free-solid-svg-icons";
import setThemeColor from './setThemeColor';
import { a, useTransition } from "react-spring";
import scss from './LeftBar.module.scss';

function toggleDarkMode(on: boolean) {
    if (!on) { // LIGHT MODE
        document.documentElement.setAttribute('data-theme', 'light');
    }
    else { // DARK MODE
        document.documentElement.setAttribute('data-theme', 'dark');
    }
}

function Leftbarcontainer() {
    const [darkModeOn, setDarkModeOn] = useState(true);
    const [val, setVal] = useState('0');
    const [colorHover, setColorHover] = useState(false);

    useEffect(() => {
        toggleDarkMode(darkModeOn);
        setThemeColor(val, darkModeOn);
    }, [darkModeOn, val]);

    const hover = useCallback(() => setColorHover(true), []);
    const unHover = useCallback(() => setColorHover(false), []);
    const clickToggle = useCallback(() => setDarkModeOn(!darkModeOn), [darkModeOn]);
    const onInput = useCallback((e: any) => setVal(e.target.value), []);

    const from = {
        zIndex: -5,
        opacity: 0,
        x: -60,
        width: 0
    }
    const sliderTransition = useTransition(colorHover, {
        config: {
            duration: 300
        },
        from,
        enter: {
            zIndex: 3,
            opacity: 1,
            x: 0,
            width: 300
        },
        leave: from
    })

    return (
        <div className={scss.cont} style={{ zIndex: '3' }} onPointerLeave={unHover}>
            <div id="left-menu">
                <button onClick={clickToggle} onPointerEnter={unHover}>
                    <FontAwesomeIcon icon={darkModeOn ? faMoon : faSun} />
                </button>
                <div style={{ position: 'relative'}}>
                    <button onPointerEnter={hover}>
                        <FontAwesomeIcon icon={faPalette} />
                    </button>
                    {sliderTransition((style, item) => (item) && 
                        <a.div className={scss.slider} style={style}>
                            <input value={val} type="range" step="1" min="0" max="8" onInput={onInput} />
                        </a.div>)
                    }
                </div>
            </div>
        </div>
    )
}

export default Leftbarcontainer;