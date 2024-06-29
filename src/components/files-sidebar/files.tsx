'use client';
import { Sources } from '@/interfaces/messages';
import { useState, useEffect, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DraggableFile from './draggable-file';

export const ItemTypes = {
  SOURCE: 'source',
};

interface FilestProps {
  sources: Sources[];
  id: string;
}

const Files = ({ sources, id }: FilestProps) => {
  const [updatedSources, setUpdatedSources] = useState<Sources[]>([]);
  const [visibleCount, setVisibleCount] = useState(1);
  const [visibleSources, setVisibleSources] = useState<Sources[]>([]);

  useEffect(() => {
    if (sources && sources.length > 0) {
      const relevantSources = sortByScore(
        uniqueSources(sources.filter((source) => source.id === id))
      );
      setUpdatedSources(relevantSources);
    }
  }, [sources, id]);

  useEffect(() => {
    setVisibleCount(1);
  }, [sources]);

  useEffect(() => {
    setVisibleSources(updatedSources.slice(0, visibleCount));
  }, [updatedSources, visibleCount]);

  const uniqueSources = (sources: Sources[]): Sources[] => {
    const seen = new Set();
    return sources.filter((source) => {
      const duplicate = seen.has(source.title);
      seen.add(source.title);
      return !duplicate;
    });
  };

  const handleSourceClick = (source: Sources) => {
    setUpdatedSources((prevSources) =>
      prevSources.map((s) =>
        s.title === source.title ? { ...s, relevant: !s.relevant } : s
      )
    );
  };

  const moveSource = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragSource = visibleSources[dragIndex];
      const dragUpdateSource = updatedSources[dragIndex];
      const newSources = [...visibleSources];
      const newUpdateSources = [...updatedSources];
      newSources.splice(dragIndex, 1);
      newUpdateSources.splice(dragIndex, 1);
      newSources.splice(hoverIndex, 0, dragSource);
      newUpdateSources.splice(hoverIndex, 0, dragUpdateSource);
      setVisibleSources(newSources);
      setUpdatedSources(newUpdateSources);
    },
    [visibleSources]
  );

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 2);
  };

  const sortByScore = (sources: Sources[]): Sources[] => {
    return sources.sort((a, b) => {
      if (a.relevant !== b.relevant) {
        return a.relevant ? -1 : 1;
      }
      return b.score - a.score;
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col gap-2">
        {visibleSources &&
          visibleSources.map((source, i) => (
            <DraggableFile
              key={source.title}
              index={i}
              source={source}
              moveSource={moveSource}
              handleSourceClick={handleSourceClick}
            />
          ))}
        {updatedSources.length > visibleCount && (
          <button className="text-blue-500 mt-2" onClick={handleShowMore}>
            Show More
          </button>
        )}
      </div>
    </DndProvider>
  );
};

export default Files;
