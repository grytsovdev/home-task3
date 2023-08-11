import { Inject, Injectable } from '@nestjs/common';
import { NoteDto } from './dto/note.dto';
import { Note } from './entities/note.entity';

@Injectable()
export class NotesService {
  constructor(
    @Inject('NOTES_REPOSITORY') private notesRepository: typeof Note,
  ) {}
  async create(note: NoteDto) {
    return await this.notesRepository.create<Note>({ ...note });
  }

  async findAll() {
    return await this.notesRepository.findAll();
  }

  async findOne(id: string) {
    return await this.notesRepository.findOne({ where: { id } });
  }

  async update(id: string, updateNoteDto: NoteDto) {
    const [numberOfAffectedRows, [updatedNotes]] =
      await this.notesRepository.update(updateNoteDto, {
        where: { id },
        returning: true,
      });
    return { numberOfAffectedRows, updatedNotes };
  }

  async remove(id: string) {
    return await this.notesRepository.destroy({
      where: { id },
    });
  }
  async archive(id: string) {
    return await this.notesRepository.update(
      { archived: true },
      {
        where: { id },
        returning: true,
      },
    );
  }
  async unarchive(id: string) {
    return await this.notesRepository.update(
      { archived: false },
      {
        where: { id },
        returning: true,
      },
    );
  }
  async getStats() {
    const notes = await this.findAll();

    const notesCount = notes.length;
    const archivedNotesCount = notes.filter((note) => note.archived).length;
    const activeNotesCount = notesCount - archivedNotesCount;

    const categories = ['Idea', 'Random Thought', 'Task'];
    const categoryCount = {};
    const activeCategotyCount = {};
    const archivedCategoryCount = {};

    categories.forEach((category) => {
      const count = notes.filter((note) => note.category === category).length;
      categoryCount[category] = count;

      const archivedCount = notes.filter(
        (note) => note.category === category && note.archived,
      ).length;

      archivedCategoryCount[category] = archivedCount;

      const activeCount = count - archivedCount;
      activeCategotyCount[category] = activeCount;
    });

    return {
      notesCount,
      activeNotesCount,
      archivedNotesCount,
      categoryCount,
      activeCategotyCount,
      archivedCategoryCount,
    };
  }
}
