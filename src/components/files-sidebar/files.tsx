// 'use client';
// import { Sources } from '@/interfaces/messages';
// import { useState, useEffect } from 'react';
// import DraggableFile from './draggable-file';
// import SortableList from './sortable-list';

// interface FilesProps {
//   sources: Sources[];
//   id: string;
// }

// const Files = ({ sources, id }: FilesProps) => {
//   const [updatedSources, setUpdatedSources] = useState<Sources[]>([]);
//   const [visibleCount, setVisibleCount] = useState(1);
//   const [visibleSources, setVisibleSources] = useState<Sources[]>([]);
//   const [sortedOrder, setSortedOrder] = useState<string[]>([]);

//   useEffect(() => {
//     if (sources && sources.length > 0) {
//       const relevantSources = sortByScore(
//         uniqueSources(sources.filter((source) => source.id === id))
//       );
//       setUpdatedSources(relevantSources);
//       setSortedOrder(relevantSources.map((source) => source.file_id));
//     }
//   }, [sources, id]);

//   useEffect(() => {
//     setVisibleSources((prevVisibleSources) => [
//       ...prevVisibleSources,
//       ...updatedSources.slice(prevVisibleSources.length, visibleCount),
//     ]);
//     setSortedOrder((prevVisibleSources) => [
//       ...prevVisibleSources,
//       ...updatedSources
//         .slice(prevVisibleSources.length, visibleCount)
//         .map((source) => source.file_id),
//     ]);
//   }, [updatedSources, visibleCount]);

//   const uniqueSources = (sources: Sources[]): Sources[] => {
//     const seen = new Set();
//     return sources.filter((source) => {
//       const duplicate = seen.has(source.title);
//       seen.add(source.title);
//       return !duplicate;
//     });
//   };

//   const handleSourceClick = (source: Sources) => {
//     setVisibleSources((prevSources) =>
//       prevSources.map((s) =>
//         s.title === source.title ? { ...s, relevant: !s.relevant } : s
//       )
//     );
//   };

//   const handleShowMore = () => {
//     setVisibleCount((prevCount) => prevCount + 1);
//   };

//   const sortByScore = (sources: Sources[]): Sources[] => {
//     return sources.sort((a, b) => {
//       if (a.relevant !== b.relevant) {
//         return a.relevant ? -1 : 1;
//       }
//       return b.score - a.score;
//     });
//   };

//   const handleOrderChange = (newOrder: string[]) => {
//     // console.log(newOrder);
//     setSortedOrder(newOrder);
//   };

//   return (
//     <div className="flex flex-col gap-2">
//       {visibleSources.length > 0 && (
//         <SortableList
//           visibleSources={visibleSources}
//           handleSourceClick={handleSourceClick}
//           sortedOrder={sortedOrder}
//           onOrderChange={handleOrderChange}
//         />
//       )}
//       {updatedSources.length > visibleCount && (
//         <button className="text-blue-500 my-2" onClick={handleShowMore}>
//           Show More
//         </button>
//       )}
//       <div className="mt-3 flex flex-col gap-2">
//         {visibleSources &&
//           visibleSources
//             .filter((source) => !source.relevant)
//             .map((source, i) => (
//               <DraggableFile
//                 key={source.title}
//                 id={source.file_id}
//                 index={i}
//                 source={source}
//                 handleSourceClick={handleSourceClick}
//               />
//             ))}
//       </div>
//     </div>
//   );
// };

// export default Files;

'use client';
import { Sources } from '@/interfaces/messages';
import { useState, useEffect } from 'react';
import DraggableFile from './draggable-file';
import SortableList from './sortable-list';

interface FilesProps {
  sources: Sources[];
  id: string;
}

const Files = ({ sources, id }: FilesProps) => {
  const [updatedSources, setUpdatedSources] = useState<Sources[]>([]);
  const [visibleCount, setVisibleCount] = useState(2);
  const [visibleSources, setVisibleSources] = useState<Sources[]>([]);
  const [sortedOrder, setSortedOrder] = useState<string[]>([]);

  useEffect(() => {
    if (sources && sources.length > 0) {
      const relevantSources = getUniqueSortedSources(sources, id);
      setVisibleSources(relevantSources.slice(0, visibleCount));
      setSortedOrder(relevantSources.map((source) => source.file_id));
    }
  }, [sources, id, visibleCount]);

  const getUniqueSortedSources = (
    sources: Sources[],
    id: string
  ): Sources[] => {
    const uniqueSources = Array.from(
      new Map(
        sources
          .filter((source) => source.id === id)
          .map((source) => [source.title, source])
      ).values()
    );
    return uniqueSources.sort(
      (a, b) =>
        b.score - a.score ||
        (a.relevant === b.relevant ? 0 : a.relevant ? -1 : 1)
    );
  };

  const handleSourceClick = (source: Sources) => {
    setVisibleSources((prevSources) =>
      prevSources.map((s) =>
        s.title === source.title ? { ...s, relevant: !s.relevant } : s
      )
    );
  };

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 1);
  };

  const handleOrderChange = (newOrder: string[]) => {
    setSortedOrder(newOrder);
    setVisibleSources((prevVisibleSources) =>
      newOrder.map(
        (file_id) =>
          prevVisibleSources.find((source) => source.file_id === file_id)!
      )
    );
  };

  return (
    <div className="flex flex-col gap-2">
      {visibleSources.length > 0 ? (
        <SortableList
          visibleSources={visibleSources}
          handleSourceClick={handleSourceClick}
          sortedOrder={sortedOrder}
          onOrderChange={handleOrderChange}
        />
      ) : (
        <div className="text-center mt-10 mx-auto text-gray-darker">
          The most relevant files will be listed here.
        </div>
      )}
      {updatedSources.length > visibleCount && (
        <button className=" my-2" onClick={handleShowMore}>
          Show More
        </button>
      )}
      <div className="mt-3 flex flex-col gap-2">
        {visibleSources
          .filter((source) => !source.relevant)
          .map((source, i) => (
            <DraggableFile
              key={source.title}
              id={source.file_id}
              index={i}
              source={source}
              handleSourceClick={handleSourceClick}
            />
          ))}
      </div>
    </div>
  );
};

export default Files;
