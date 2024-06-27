'use client';
import { Sources } from '@/interfaces/messages';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import file from '../../../public/file.svg';

interface FilestProps {
  sources: Sources[];
  id: string;
}

const Files = ({ sources, id }: FilestProps) => {
  const [updatedSources, setUpdatedSources] = useState<Sources[]>([]);
  const [visibleCount, setVisibleCount] = useState(1);

  useEffect(() => {
    if (sources && sources.length > 0) {
      console.log(sources, id);
      const relevantSources = sources.filter((source) => source.id === id);
      setUpdatedSources(relevantSources);
    }
  }, [sources, id]);

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

  const toPercent = (decimal: number): string => {
    return (decimal * 100).toFixed(0) + '%';
  };

  const sortByScore = (sources: Sources[]): Sources[] => {
    return sources.sort((a, b) => {
      if (a.relevant !== b.relevant) {
        return a.relevant ? -1 : 1;
      }
      return b.score - a.score;
    });
  };

  const replaceUnderscores = (text: string): string => {
    return text.replace(/([a-zA-Z])_([a-zA-Z])/g, '$1 $2');
  };

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 2);
  };

  const visibleSources = uniqueSources(updatedSources).slice(0, visibleCount);

  return (
    <div className="flex flex-col gap-2">
      {visibleSources &&
        sortByScore(uniqueSources(visibleSources)).map((source, i) => (
          <div
            className={`border border-gray p-2 rounded ${
              !source.relevant ? 'opacity-30' : ''
            } ${i >= visibleCount - 2 ? 'animate-fadeIn' : ''}
            `}
            key={i}
          >
            <a
              className="text-gray-light flex gap-2 mb-2"
              href={`/pdf/php_documents/${encodeURIComponent(
                source.title
              )}.pdf`}
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
              <div className="flex flex-wrap gap-2 text-sm text-gray-darker">
                {source.metadata_keywords?.map((keyword) => (
                  <div key={keyword} className="border p-1 border-gray rounded">
                    {keyword}
                  </div>
                ))}
              </div>
              <div className="self-end cursor-pointer p-1">
                <button onClick={() => handleSourceClick(source)}>
                  {source.relevant ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 40 40"
                      width="18"
                      height="18"
                      fill="#C6C6C6"
                      id="recycle-bin"
                    >
                      <path d="M28 40H11.8c-3.3 0-5.9-2.7-5.9-5.9V16c0-.6.4-1 1-1s1 .4 1 1v18.1c0 2.2 1.8 3.9 3.9 3.9H28c2.2 0 3.9-1.8 3.9-3.9V16c0-.6.4-1 1-1s1 .4 1 1v18.1c0 3.2-2.7 5.9-5.9 5.9zM33.3 4.9h-7.6C25.2 2.1 22.8 0 19.9 0s-5.3 2.1-5.8 4.9H6.5C4.2 4.9 2.4 6.7 2.4 9s1.8 4 4.1 4h26.9c2.3 0 4.1-1.8 4.1-4.1s-1.9-4-4.2-4zM19.9 2c1.8 0 3.3 1.2 3.7 2.9h-7.5c.5-1.7 2-2.9 3.8-2.9zm13.4 9H6.5c-1.1 0-2.1-.9-2.1-2.1 0-1.1.9-2.1 2.1-2.1h26.9c1.1 0 2.1.9 2.1 2.1-.1 1.2-1 2.1-2.2 2.1z"></path>
                      <path d="M12.9 35.1c-.6 0-1-.4-1-1V17.4c0-.6.4-1 1-1s1 .4 1 1v16.7c0 .5-.5 1-1 1zM26.9 35.1c-.6 0-1-.4-1-1V17.4c0-.6.4-1 1-1s1 .4 1 1v16.7c0 .5-.5 1-1 1zM19.9 35.1c-.6 0-1-.4-1-1V17.4c0-.6.4-1 1-1s1 .4 1 1v16.7c0 .5-.5 1-1 1z"></path>
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 64 64"
                      width="20"
                      height="20"
                      fill="#C6C6C6"
                      id="undo"
                    >
                      <path d="M8.49 36.85a2 2 0 0 1 2 1.94A21.55 21.55 0 1 0 32 17.46H14.2l13.13 10.1a1.93 1.93 0 0 1 .34 2.72 2 2 0 0 1-1.31.74 2 2 0 0 1-1.44-.4L7.29 17.05a.76.76 0 0 1-.18-.18l-.25-.28v-.05a1.89 1.89 0 0 1-.23-.5v-.14a2.45 2.45 0 0 1 0-.54v-.2l.06-.28a1.27 1.27 0 0 1 .09-.18.94.94 0 0 1 .12-.22 2 2 0 0 1 .27-.33L24.92.41a2 2 0 0 1 2.75.34 1.93 1.93 0 0 1-.34 2.72L14.2 13.58H32A25.21 25.21 0 1 1 6.54 38.79a1.94 1.94 0 0 1 1.95-1.94Z"></path>
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
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
