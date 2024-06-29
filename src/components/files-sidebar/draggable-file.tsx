import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import Image from 'next/image';
import file from '../../../public/file.svg';
import { Sources } from '@/interfaces/messages';
import { ItemTypes } from '@/components/files-sidebar/files';
import FileFeedback from './file-feedback';

interface DraggableFileProps {
  source: Sources;
  index: number;
  moveSource: (dragIndex: number, hoverIndex: number) => void;
  handleSourceClick: (source: Sources) => void;
}

const DraggableFile = ({
  source,
  index,
  moveSource,
  handleSourceClick,
}: DraggableFileProps) => {
  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: ItemTypes.SOURCE,
    hover(item: { index: number }) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;
      moveSource(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    type: ItemTypes.SOURCE,
    item: { type: ItemTypes.SOURCE, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // drag(drop(ref));

  const toPercent = (decimal: number): string => {
    return (decimal * 100).toFixed(0) + '%';
  };

  const replaceUnderscores = (text: string): string => {
    return text.replace(/([a-zA-Z])_([a-zA-Z])/g, '$1 $2');
  };

  return (
    <>
      <div className="cursor-move" ref={drag}>
        ...
      </div>
      <div
        ref={preview}
        className={`border border-gray p-2 rounded  ${
          !source.relevant ? 'opacity-30' : ''
        } ${isDragging ? 'opacity-10' : 'opacity-100'}`}
      >
        <a
          className="text-gray-light flex gap-2 mb-2"
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
          <span className="ml-auto">{toPercent(source.score)}</span>
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
    </>
  );
};

export default DraggableFile;
