import Image from 'next/image';
import file from '../../../public/file.svg';
import { Sources } from '@/interfaces/messages';
import FileFeedback from './file-feedback';
import { CSS } from '@dnd-kit/utilities';
import { useSortable, defaultAnimateLayoutChanges } from '@dnd-kit/sortable';
import { useSession } from 'next-auth/react';
import FileIcon from '../icon/file-icon';
import DraggableIcon from '../icon/draggable-icon';
// import { options } from '@/app/api/auth/[...nextauth]/options';
// import { getServerSession } from 'next-auth/next';

interface DraggableFileProps {
  source: Sources;
  id: string;
  index: number;
  handleSourceClick: (source: Sources) => void;
  height?: number;
  activeId?: string;
}

const animateLayoutChanges = (args: any) => {
  return args.isSorting || args.wasDragging
    ? defaultAnimateLayoutChanges(args)
    : true;
};

const DraggableFile = ({
  source,
  id,
  index,
  handleSourceClick,
}: // height,
DraggableFileProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    animateLayoutChanges,
    id: id,
  });
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const { data: session, status } = useSession();

  const defaultStyle = {
    transform: CSS.Translate.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
  };

  const replaceUnderscores = (text: string): string => {
    return text.replace(/([a-zA-Z])_([a-zA-Z])/g, '$1 $2');
  };

  const handleFileClick = async (fileName: string) => {
    if (status === 'authenticated') {
      const response = await fetch(`${apiUrl}/pdf/${fileName}`);
      if (response.ok) {
        const fileBlob = await response.blob();
        const url = window.URL.createObjectURL(fileBlob);
        window.open(url, '_blank');
      } else {
        console.error('Failed to fetch file');
      }
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={defaultStyle}
      {...attributes}
      className={`flex justify-between border border-border rounded relative ${
        !source.relevant ? 'opacity-40' : ''
      } ${isDragging ? 'bg-background' : 'transparent'}`}
    >
      <div
        className="flex flex-col items-center cursor-move w-[32px] py-2"
        {...listeners}
      >
        {source.relevant && <div className="">{index + 1}</div>}
        <div className="self-center my-auto">
          <DraggableIcon />
        </div>
        <div className="opacity-0">{index + 1}</div>
      </div>

      <div className={`border-l border-border p-2  flex-1`}>
        <a
          className="text-text flex gap-2 mb-3"
          onClick={() => handleFileClick(`${source.base_name}.pdf`)}
          target="_blank"
        >
          <div className="h-10 w-10">
            <FileIcon />
          </div>
          <span className="">
            {replaceUnderscores(source.title.replace(/,\d+$/, ''))}
          </span>
        </a>
        <div className="flex gap-2 justify-between">
          <div className="flex-col">
            <div className="flex flex-wrap gap-2 text-sm text-text">
              {source.metadata_keywords?.map((keyword) => (
                <div key={keyword} className="border p-1 border-border rounded">
                  {keyword}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-[10px] mb-[3px]">
          <FileFeedback source={source} handleSourceClick={handleSourceClick} />
        </div>
      </div>
    </div>
  );
};

export default DraggableFile;
