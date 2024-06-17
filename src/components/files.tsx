import { Sources } from '@/interfaces/messages';
import React from 'react';
import Image from 'next/image';
import file from '../../public/file.svg';

interface FilestProps {
  sources: Sources[];
}

const Files = ({ sources }: FilestProps) => {
  const uniqueSources = (sources: Sources[]): Sources[] => {
    const seen = new Set();
    return sources.filter((source) => {
      const duplicate = seen.has(source.title);
      seen.add(source.title);
      return !duplicate;
    });
  };

  console.log(uniqueSources(sources));

  return (
    <>
      {sources &&
        uniqueSources(sources).map((source, i) => (
          <a
            key={i}
            className="text-blue flex gap-2 mb-2"
            href={`/pdf/php_documents/${source.title}.pdf`}
            target="_blank"
          >
            <Image
              className="max-h-[24px]"
              src={file}
              alt="file icon"
              width={22}
              height={24}
            />
            <span>
              {source.title}
              {source.title}.pdf
            </span>
          </a>
        ))}
    </>
  );
};

export default Files;
