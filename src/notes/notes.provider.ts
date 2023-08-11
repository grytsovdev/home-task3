import { Note } from './entities/note.entity';

export const notesProviders = [
  {
    provide: 'NOTES_REPOSITORY',
    useValue: Note,
  },
];
