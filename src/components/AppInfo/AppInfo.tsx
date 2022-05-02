import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHtml5, faCss3Alt, faReact, faFirefox, faChrome, faSafari, faEdge, faOpera } from '@fortawesome/free-brands-svg-icons'
import scss from './AppInfo.module.scss';
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { createPortal } from "react-dom";
import { a, easings, useChain, useSpringRef } from "react-spring";
import useFade from "../../hooks/useFade";
import { da } from "../../data/types";
import useToggleOnce from "../../hooks/useToggleOnce";

const duration = 200;

const description = (da) ? <>
	<p>Memo-app tydeligt inspireret af Google Keep, med ca. de samme funktioner.</p>
	<p>Inkluderer animerede popups, drag & drop, søgning, sortering og papirkurv.</p>
	<p>Dette er en demo, og bruger-relateret funktionalitet er ikke implementeret.</p>
	<p>Ikke intenderet til touch. Transpilet til ES5 med Babel.</p>
</>
: <>
	<p>Note app inspired by Google Keep, with about the same functionality.</p>
	<p>Includes a popups, drag & drop, search, sorting and trashing.</p>
	<p>This is a demo, and user-related functionality is not implemented.</p>
	<p>Not intended for touch devices. Transpiled to ES5 with Babel.</p>
</>

function AppInfo(props: { setInfoOpen: (open: boolean) => void }) {
	const { setInfoOpen } = props;
	const [mounted, startUnmount] = useToggleOnce(true);
	const endUnmount = () => {
		if (!mounted) {
			setInfoOpen(false);
		}
	}

	const bgRef = useSpringRef();
	const bgFade = useFade(mounted, bgRef, duration, undefined, undefined, endUnmount);
	const modalRef = useSpringRef();
	const modalFade = useFade(mounted, modalRef, duration, easings.easeInOutQuad);

	useChain((mounted) ? [bgRef, modalRef] : [modalRef, bgRef]);
	
	return (
		createPortal(
			<>
				{bgFade((style, item) => {
					return (item) ? <a.div className={scss.bg} onClick={startUnmount} style={style} /> : null
				})}
				{modalFade((style, item) => {
					return (item) ? <a.div className={scss.info} id="info" style={style}>
					<button className={scss.close} onClick={startUnmount}>
						<FontAwesomeIcon icon={faTimes} size="3x" />
					</button>
					<h1 style={{ marginTop: '10px', marginBottom: '30px' }}>Info</h1>
					{description}
					<h3 style={{ marginTop: '30px' }}>{(da) ? 'Værktøjer' : 'Tools'}</h3>
					<table>
						<tbody>
							<tr>
								<td><FontAwesomeIcon icon={faHtml5} size="3x" style={{ color: '#d84924' }} /></td>
								<td><FontAwesomeIcon icon={faCss3Alt} size="3x" style={{ color: '#146cad' }} /></td>
								<td><span style={{ fontSize: '45px', color: '#2f72bc', verticalAlign: 'middle'}}>Ts</span></td>
								<td><FontAwesomeIcon icon={faReact} size="3x" style={{ color: '#5ccfee' }} /></td>
							</tr>
							<tr>
								<td>HTML5</td>
								<td>CSS3</td>
								<td>TypeScript</td>
								<td>React</td>
							</tr>
						</tbody>
					</table>
					<h3 style={{ marginTop: '25px', marginBottom: '10px' }}>{(da) ? 'Biblioteker' : 'Libraries'}</h3>
					<ul>
						<li>
							dnd-kit - <a href="https://github.com/clauderic/dnd-kit/" target="_blank" rel="noreferrer">https://github.com/clauderic/dnd-kit/</a>
						</li>
						<li>
							zustand - <a href="https://github.com/pmndrs/zustand" target="_blank" rel="noreferrer">https://github.com/pmndrs/zustand</a>
						</li>
						<li>
							Font Awesome - <a href="https://fontawesome.com/" target="_blank" rel="noreferrer">https://fontawesome.com/</a>
						</li>
						<li>
							Lodash - <a href="https://lodash.com/" target="_blank" rel="noreferrer">https://lodash.com/</a>
						</li>
						<li>
							react-spring - <a href="https://www.npmjs.com/package/react-spring" target="_blank" rel="noreferrer">https://www.npmjs.com/package/react-spring</a>
						</li>
						<li>
							uuid - <a href="https://www.npmjs.com/package/uuid" target="_blank" rel="noreferrer">https://www.npmjs.com/package/uuid</a>
						</li>
					</ul>
					<h3 style={{ marginTop: '40px' }}>{(da) ? 'Estimeret kompatibilitet' : 'Estimated compatibility'}</h3>
					<table>
						<tbody>
							<tr>
								<td><FontAwesomeIcon icon={faFirefox} size="3x" style={{ color: "#f26211"}} /></td>
								<td><FontAwesomeIcon icon={faSafari} size="3x" style={{ color: "#2088e3" }} /></td>
								<td><FontAwesomeIcon icon={faChrome} size="3x" style={{ color: "#0f9554" }} /></td>
								<td><FontAwesomeIcon icon={faEdge} size="3x" style={{ color: "#2cb9d6" }} /></td>
								<td><FontAwesomeIcon icon={faOpera} size="3x" style={{ color: "#ed1527" }} /></td>
							</tr>
							<tr>
								<td>Firefox</td>
								<td>Safari</td>
								<td>Chrome</td>
								<td>Edge</td>
								<td>Opera</td>
							</tr>
							<tr>
								<td>21.0+</td>
								<td>6.0+</td>
								<td>23.0+</td>
								<td>1.0+</td>
								<td>15.0+</td>
							</tr>
						</tbody>
					</table>
				</a.div> : null
				})}
			</>
			, document.getElementById('outside')!)
    );
}

export default AppInfo;