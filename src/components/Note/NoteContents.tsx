import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import colors from '../../data/colors';
import { a } from 'react-spring';
import { faBan, faClock, faCalendar, faPaintBrush, faTrashAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { memo } from 'react';
import scss from './Note.module.scss';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { HOVERS } from '../../data/types';

export const PinButton = memo((props: {
    hovers?: (a: number) => () => void,
    onClick?: () => void, 
    icon: IconDefinition
}) => {
    const { hovers } = props;
    return (
        <button 
            className={scss.pin} 
            onMouseEnter={hovers ? hovers(HOVERS.PIN) : undefined} 
            onMouseLeave={hovers ? hovers(HOVERS.NONE) : undefined}
            onClick={props.onClick}
        >
            <FontAwesomeIcon icon={props.icon} />
        </button>
    )
})

export const Center = memo((props: {
    text: string, 
    title: string, 
    listeners?: SyntheticListenerMap, 
    onClick?: () => void
}) => {
    return (
        <div className={scss.center} onClick={props.onClick} {...props.listeners}>
            <h4>{props.title}</h4>
            {props.text && props.title && <hr />}
            <p>{props.text}</p>
        </div>
    )
})

export const ElementButtons = memo((props: {
    hovers?: (a: number) => () => void,
    trashNote?: () => void,
    icon: IconDefinition 
}) => {
    const { hovers } = props;
    return (
        <div className={scss.buttons}>
            <div onMouseEnter={hovers ? hovers(HOVERS.BELL) : undefined}>
                <FontAwesomeIcon icon={props.icon} />
            </div>
            <div onMouseEnter={hovers ? hovers(HOVERS.COLOR) : undefined}>
                <FontAwesomeIcon icon={faPaintBrush} />
            </div>
            <div onMouseEnter={hovers ? hovers(HOVERS.NONE) : undefined} onClick={props.trashNote}>
                <FontAwesomeIcon icon={faTrashAlt} />
            </div>
        </div>
    )
})

export const ColorTray = memo((props: {
    style: any, 
    color: string, 
    setColor: (name: string) => void
}) => {
    return (
        <a.div className={scss.palette} style={props.style}>
            {colors.map((x, i) => {
                const updateColor = () => {
                    const setTo = (props.color !== x) ? x : 'var(--background)';
                    props.setColor(setTo);
                }
                return <button key={i} className={scss.colors} style={{ backgroundColor: x }} onClick={updateColor}>
                    {props.color === x && <FontAwesomeIcon className={scss.remove} icon={faBan} />}
                </button>
            })}
        </a.div>
    )
})

export const DateTray = memo((props: {
    style: any,
    onClick: () => void, 
    icon: IconDefinition
}) => {
    return (
        <a.div className={scss.date} style={props.style}>
            <button>
                <FontAwesomeIcon icon={faCalendar} style={{ fontSize: '1.4em' }} />
            </button>
            <button>
                <FontAwesomeIcon icon={faClock} style={{ fontSize: '1.4em' }} />
            </button>
            <button onClick={props.onClick}>
                <FontAwesomeIcon icon={props.icon} size="2x" />
            </button>
        </a.div>
    )
})