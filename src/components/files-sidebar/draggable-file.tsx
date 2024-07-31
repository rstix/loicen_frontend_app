import Image from 'next/image';
import file from '../../../public/file.svg';
import { Sources } from '@/interfaces/messages';
import FileFeedback from './file-feedback';
import { CSS } from '@dnd-kit/utilities';
import { useSortable, defaultAnimateLayoutChanges } from '@dnd-kit/sortable';
import { useSession } from 'next-auth/react';
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
  // const [session, loading] = useSession();

  // console.log(session, loading);
  const { data: session, status } = useSession();

  const defaultStyle = {
    transform: CSS.Translate.toString(transform),
    transition,
    // height: `${height ? height + 'px' : 'auto'}`,
    zIndex: isDragging ? 10 : 1,
    backgroundColor: isDragging ? '#2D2D2D' : 'transparent',
  };

  const replaceUnderscores = (text: string): string => {
    return text.replace(/([a-zA-Z])_([a-zA-Z])/g, '$1 $2');
  };

  const handleFileClick = async (fileName: string) => {
    if (status === 'authenticated') {
      // const userId = session.user.id; // Get user ID from session
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
      className={`flex justify-between border border-gray rounded relative ${
        !source.relevant ? 'opacity-40' : ''
      }`}
    >
      <div
        className="flex flex-col items-center cursor-move w-[32px] py-2"
        {...listeners}
      >
        {source.relevant && <div className="">{index + 1}</div>}
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

      <div className={`border-l border-gray p-2  flex-1`}>
        <a
          className="text-gray-light flex gap-2 mb-3"
          // href={`/pdf/php_documents/${encodeURIComponent(
          //   source.base_name
          // )}.pdf`}
          onClick={() => handleFileClick(`${source.base_name}.pdf`)}
          target="_blank"
        >
          <Image
            className="max-h-[24px]"
            src={file}
            alt="file icon"
            width={22}
            height={24}
          />
          <span>{replaceUnderscores(source.title.replace(/,\d+$/, ''))}</span>
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
