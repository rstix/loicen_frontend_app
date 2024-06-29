import React from 'react';
import { Sources } from '@/interfaces/messages';
import Files from '@/components/files-sidebar/files';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

interface FilesProvider {
  sources: Sources[];
  lastId: string;
}

const FilesProvider = ({ sources, lastId }: FilesProvider) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Files sources={sources} id={lastId} />
    </DndProvider>
  );
};

export default FilesProvider;
