'use client';
import { Sources } from '@/interfaces/messages';
import { useState, useEffect, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import DraggableFile from './draggable-file';
import update from 'immutability-helper';

export const ItemTypes = {
  SOURCE: 'source',
};

interface FilesProps {
  sources: Sources[];
  id: string;
}

const Files = ({ sources, id }: FilesProps) => {
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

  // const moveSource = useCallback(
  //   (dragIndex: number, hoverIndex: number) => {
  //     const dragSource = visibleSources[dragIndex];
  //     const dragUpdateSource = updatedSources[dragIndex];
  //     const newSources = [...visibleSources];
  //     const newUpdateSources = [...updatedSources];
  //     newSources.splice(dragIndex, 1);
  //     newUpdateSources.splice(dragIndex, 1);
  //     newSources.splice(hoverIndex, 0, dragSource);
  //     newUpdateSources.splice(hoverIndex, 0, dragUpdateSource);
  //     setVisibleSources(newSources);
  //     setUpdatedSources(newUpdateSources);
  //   },
  //   [visibleSources]
  // );

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

  const findCard = useCallback(
    (id: string) => {
      const card = visibleSources.filter((c) => c.file_id === id)[0] as Sources;
      return {
        card,
        index: visibleSources.indexOf(card),
      };
    },
    [visibleSources]
  );

  const moveCard = useCallback(
    (id: string, atIndex: number) => {
      const { card, index } = findCard(id);
      setVisibleSources(
        update(visibleSources, {
          $splice: [
            [index, 1],
            [atIndex, 0, card],
          ],
        })
      );
      const updatedIndex = updatedSources.indexOf(card);
      setUpdatedSources(
        update(updatedSources, {
          $splice: [
            [updatedIndex, 1],
            [atIndex, 0, card],
          ],
        })
      );
    },
    [findCard, visibleSources, updatedSources]
  );

  const [, drop] = useDrop(() => ({ accept: ItemTypes.SOURCE }));

  return (
    <div className="flex flex-col gap-2" ref={drop}>
      {visibleSources &&
        visibleSources.map((source, i) => (
          <DraggableFile
            key={source.title}
            id={source.file_id}
            index={i}
            source={source}
            moveSource={moveCard}
            handleSourceClick={handleSourceClick}
            findCard={findCard}
          />
        ))}
      {updatedSources.length > visibleCount && (
        <button className="text-blue-500 mt-2" onClick={handleShowMore}>
          Show More
        </button>
      )}
    </div>
  );
};

export default Files;
