import DraggableFile from './draggable-file';
import React, { useState, useEffect, useRef, RefObject } from 'react';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  MeasuringStrategy,
  TouchSensor,
  DragEndEvent,
  DragStartEvent,
} from '@dnd-kit/core';
import { Sources } from '@/interfaces/messages';

const measuringConfig = {
  droppable: {
    strategy: MeasuringStrategy.Always,
  },
};

interface SortableListProps {
  visibleSources: Sources[];
  handleSourceClick: (source: Sources) => void;
  onOrderChange: (newOrder: string[]) => void;
  sortedOrder: string[];
}

interface ElementRefs {
  [key: string]: RefObject<HTMLDivElement>;
}

const SortableList = ({
  visibleSources,
  handleSourceClick,
  onOrderChange,
  sortedOrder,
}: SortableListProps) => {
  const [items, setItems] = useState<Sources[]>(
    visibleSources.filter((source: Sources) => source.relevant)
  );
  const [activeId, setActiveId] = useState<string>('');
  const elementRefs = useRef<ElementRefs>({});

  useEffect(() => {
    items.forEach((item) => {
      if (!elementRefs.current[item.file_id]) {
        elementRefs.current[item.file_id] = React.createRef();
      }
    });
    console.log('items', items);
  }, [items]);

  useEffect(() => {
    setItems(visibleSources.filter((source: Sources) => source.relevant));
    console.log('visibleSources', visibleSources);
  }, [visibleSources]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    useSensor(TouchSensor, {
      activationConstraint: undefined,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over!.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.file_id === active.id);
        const newIndex = items.findIndex((item) => item.file_id === over!.id);
        const newOrder = arrayMove(items, oldIndex, newIndex);
        onOrderChange(newOrder.map((item) => item.file_id));
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  // const getItemHeight = (id: string, isAuto?: boolean): number | string => {
  //   const ref = elementRefs.current[id];
  //   if (!isAuto && ref && ref.current) {
  //     return ref.current.getBoundingClientRect().height;
  //   }
  //   return 'auto';
  // };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      measuring={measuringConfig}
    >
      <SortableContext
        items={sortedOrder}
        strategy={verticalListSortingStrategy}
      >
        {sortedOrder.map((id) => {
          const source = items.find((item) => item.file_id === id);
          if (!source) return null;
          return (
            <div key={source.file_id} ref={elementRefs.current[source.file_id]}>
              <DraggableFile
                id={source.file_id}
                index={sortedOrder.indexOf(source.file_id)}
                source={source}
                handleSourceClick={handleSourceClick}
                // height={getItemHeight(source.file_id)}
                activeId={activeId}
              />
            </div>
          );
        })}
      </SortableContext>
    </DndContext>
  );
};

export default SortableList;
