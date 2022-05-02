import { faThumbtack, faBellSlash } from "@fortawesome/free-solid-svg-icons";
import { forwardRef, ForwardedRef } from "react";
import { a, SpringValue } from "react-spring";
import { da } from "../../data/types";
import useStore from "../../store/store";
import scss from './Note.module.scss';
import { Center, ElementButtons, PinButton } from "./NoteContents";

const selText = (da) ? ['Vælg', 'Valgt'] : ['Select', 'Selected'];

/** Note "clone" that will be shown when dragging */
function Ghost(
    props: {
        id: string,
        boxShadow: { boxShadow: SpringValue<string> }
    }, 
    ref: ForwardedRef<HTMLLIElement | null>
) {
	const { id, boxShadow } = props;
	const data = useStore(s => s.noteStates[id]);
	const selected = useStore(s => s.selectStates[id]);
	const org = data.ref.current;
	const { width, height } = (org) ? org.getBoundingClientRect() : { width: 0, height: 0 };

	return (
		<a.li 
            className={`note ${scss.ghost} ${scss.note} ${selected ? scss.selected : ''}`}
            style={{ width: width + 'px', height: height + 'px', ...boxShadow }} 
            ref={ref}
        >
			<button className={scss.select}>
                <span>
                    {selected ? selText[1] : selText[0]}
                </span>
            </button>
            {data.pin && <PinButton icon={faThumbtack} />}
            <div className={scss.bg} style={{ backgroundColor: data.color }}>
                <Center title={data.title} text={data.text} />
                <ElementButtons icon={faBellSlash} />
			</div>
		</a.li>
	)
}

export default forwardRef(Ghost);