import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import Image from 'next/image';
import file from '../../../public/file.svg';
import { Sources } from '@/interfaces/messages';
import { ItemTypes } from '@/components/files-sidebar/files';
import FileFeedback from './file-feedback';

interface Item {
  id: string;
  originalIndex: number;
}

interface DraggableFileProps {
  source: Sources;
  id: string;
  index: number;
  moveSource: (id: string, to: number) => void;
  findCard: (id: string) => { index: number };
  handleSourceClick: (source: Sources) => void;
}

const DraggableFile = ({
  source,
  id,
  index,
  moveSource,
  findCard,
  handleSourceClick,
}: DraggableFileProps) => {
  const originalIndex = findCard(id).index;
  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: ItemTypes.SOURCE,
      item: { id, originalIndex },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const { id: droppedId, originalIndex } = item;
        const didDrop = monitor.didDrop();
        if (!didDrop) {
          moveSource(droppedId, originalIndex);
        }
      },
    }),
    [id, originalIndex, moveSource]
  );

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.SOURCE,
      hover({ id: draggedId }: Item) {
        if (draggedId !== id) {
          const { index: overIndex } = findCard(id);
          moveSource(draggedId, overIndex);
        }
      },
    }),
    [findCard, moveSource]
  );

  // const toPercent = (decimal: number): string => {
  //   return (decimal * 100).toFixed(0) + '%';
  // };

  const replaceUnderscores = (text: string): string => {
    return text.replace(/([a-zA-Z])_([a-zA-Z])/g, '$1 $2');
  };

  return (
    <div
      ref={(node) => preview(drop(node))}
      className="flex justify-between relative border border-gray rounded"
    >
      <div
        ref={drag}
        className="flex flex-col items-center cursor-move w-[32px] py-2"
      >
        <div className="">{index + 1}</div>
        <div className="self-center my-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            fill="none"
            viewBox="0 0 128 128"
            id="drag-indicator"
          >
            <circle
              cx="50"
              cy="64"
              r="8"
              fill="#ececec"
              transform="rotate(90 50 64)"
            ></circle>
            <circle
              cx="50"
              cy="91"
              r="8"
              fill="#ececec"
              transform="rotate(90 50 91)"
            ></circle>
            <circle
              cx="50"
              cy="37"
              r="8"
              fill="#ececec"
              transform="rotate(90 50 37)"
            ></circle>
            <circle
              cx="77"
              cy="64"
              r="8"
              fill="#ececec"
              transform="rotate(90 77 64)"
            ></circle>
            <circle
              cx="77"
              cy="91"
              r="8"
              fill="#ececec"
              transform="rotate(90 77 91)"
            ></circle>
            <circle
              cx="77"
              cy="37"
              r="8"
              fill="#ececec"
              transform="rotate(90 77 37)"
            ></circle>
          </svg>
        </div>
        <div className="opacity-0">{index + 1}</div>
      </div>

      <div
        className={`border-l border-gray p-2  flex-1  ${
          !source.relevant ? 'opacity-30' : ''
        } ${isDragging ? 'opacity-10' : 'opacity-100'}`}
      >
        <a
          className="text-gray-light flex gap-2 mb-3"
          href={`/pdf/php_documents/${encodeURIComponent(source.title)}.pdf`}
          target="_blank"
        >
          <Image
            className="max-h-[24px]"
            src={file}
            alt="file icon"
            width={22}
            height={24}
          />
          <span>{replaceUnderscores(source.title)}</span>
        </a>
        <div className="flex gap-2 justify-between">
          <div className="flex-col">
            <div className="flex flex-wrap gap-2 text-sm text-gray-darker">
              {source.metadata_keywords?.map((keyword) => (
                <div key={keyword} className="border p-1 border-gray rounded">
                  {keyword}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-[10px] mb-[3px]">
          <FileFeedback
            source={source}
            handleSourceClick={handleSourceClick}
            // onSendFeedback={}
          />
        </div>
      </div>
    </div>
  );
};

export default DraggableFile;
