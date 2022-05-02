import { a } from 'react-spring';
import NoteLogic from './NoteLogic';
import { memo } from 'react';
import scss from './Note.module.scss';
import { PinButton, Center, ElementButtons, DateTray, ColorTray } from './NoteContents';
import { da, HOVERS } from '../../data/types';

const selText = (da) ? ['Vælg', 'Valgt'] : ['Select', 'Selected'];
const dataUntrash = (da) ? 'Gendan' : 'Untrash';

function Note(props: { id: string }) {
    const { id } = props;
    const { hovers, functions, values, drag } = NoteLogic(id);

    const { 
        mouseEnter, 
        mouseLeave, 
        hoveredButton, 
        hoverButtonCurry 
    } = hovers;

    const { 
        toggleNotif, 
        click, 
        toggleSelect, 
        setColor, 
        togglePin, 
        trashNote 
    } = functions;

    const { 
        title, 
        text, 
        className, 
        selected, 
        color, 
        showPin, 
        fade, 
        pinIcon, 
        notifIcon, 
        notifToggleIcon 
    } = values;

    const { listeners, mergedRef, rootStyle } = drag;

    return (
        <li 
            id={id} 
            className={className} 
            ref={mergedRef} 
            onMouseEnter={mouseEnter} 
            onMouseLeave={mouseLeave} 
            style={rootStyle}
        >
            {fade((style, item) => (item || selected) &&
                <a.button 
                    className={scss.select} 
                    onClick={toggleSelect}
                    style={style} 
                >
                    <span>{selected ? selText[1] : selText[0]}</span>
                </a.button>
            )}
            <div className={scss.bg} style={{ backgroundColor: color }} data-untrash={dataUntrash}>
                {showPin && 
                    <PinButton 
                        hovers={hoverButtonCurry} 
                        onClick={togglePin} 
                        icon={pinIcon} 
                    />
                }
                <Center 
                    title={title} 
                    text={text} 
                    listeners={listeners} 
                    onClick={click} 
                />
                {fade((style, item) => (item) && 
                    <a.div style={style}>
                        <ElementButtons 
                            hovers={hoverButtonCurry}
                            trashNote={trashNote}
                            icon={notifIcon} 
                        />
                        {hoveredButton === HOVERS.BELL && 
                            <DateTray 
                                onClick={toggleNotif} 
                                icon={notifToggleIcon}
                                style={style}
                            />
                        }
                        {hoveredButton === HOVERS.COLOR && 
                            <ColorTray 
                                color={color} 
                                setColor={setColor} 
                                style={style} 
                            />
                        }
                    </a.div>
                )}
            </div>
        </li>
    )
}
export default memo(Note);