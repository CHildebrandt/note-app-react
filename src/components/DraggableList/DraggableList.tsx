import { useSensors, useSensor, PointerSensor, KeyboardSensor, closestCenter, DragOverlay, DndContext } from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import { sortableKeyboardCoordinates, arrayMove, SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { memo, useCallback, useState } from "react";
import { useSpring } from "react-spring";
import useStore from "../../store/store";
import Ghost from "../Note/Ghost";

const dropTime = 300;
const idle = { 
	boxShadow: '4px 4px 20px rgba(0,0,0,0), 0 0 40px rgba(0,0,0,0)'
};
const active = { 
	boxShadow: '4px 4px 20px rgba(0,0,0,1), 0 0 40px rgba(0,0,0,1)'
};

/**dnd-kit wrapper component */
function DraggableList (props: {
	ids: string[], 
	setter: (ids: string[]) => void, 
	children: JSX.Element[] 
}) {
	const { ids, setter, children } = props;
	const itemStates = useStore(useCallback(s => s.noteStates, []));
	const [activeId, setActiveId] = useState('');
	
	const sensors = useSensors(useSensor(PointerSensor, { 
		activationConstraint: { distance: 8	} 
	}), useSensor(KeyboardSensor, { 
		coordinateGetter: sortableKeyboardCoordinates, 
	}));
	
	const boxShadow = useSpring({
		config: {
			duration: dropTime
		},
		from: (activeId) ? idle : active,
		to: (activeId) ? active : idle,
	});
	
	function startDrag(event: {active: {id: string}}) {
		const { active } = event;
		const elem = itemStates[active.id].ref.current;
		if (elem) {
			elem.style.opacity = '0.4';
		}
		setActiveId(active.id);
	}

	const endDrag = (event: any) => {
		const { active, over } = event;
		if (active.id !== over.id) {
			const oldIndex = ids.findIndex(id => id === active.id);
			const newIndex = ids.findIndex(id => id === over.id);
			setter(arrayMove(ids, oldIndex, newIndex));
		}
		const elem = itemStates[activeId].ref.current;
		if (elem) {
			setTimeout(() => {
				elem.style.opacity = '';
			}, dropTime);
		}
		setActiveId('');
	}

	return (
		<DndContext
			sensors={sensors} 
			collisionDetection={closestCenter} 
			onDragStart={startDrag} 
			onDragEnd={endDrag} 
			autoScroll={false} 
			modifiers={[restrictToParentElement]}
		>
			<SortableContext items={ids} strategy={rectSortingStrategy}>
				<ul>
					{children}
				</ul>
			</SortableContext>
			<DragOverlay 
				zIndex={2} 
				wrapperElement="ul" 
				adjustScale={true} 
				dropAnimation={{ 
					duration: dropTime, 
					easing: 'cubic-bezier(0.18, 0.67, 0.6, 1)'
				}} 
				modifiers={[restrictToParentElement]}
			>
				{(activeId) && <Ghost boxShadow={boxShadow} id={activeId} />}
			</DragOverlay>
		</DndContext>
	)
}

export default memo(DraggableList);