import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { NoteDto } from './dto/note.dto';
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get('/stats')
  async getStats() {
    return await this.notesService.getStats();
  }

  @Post()
  create(@Body() createNoteDto: NoteDto) {
    console.log(createNoteDto);
    return this.notesService.create(createNoteDto);
  }

  @Get()
  findAll() {
    return this.notesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const note = await this.notesService.findOne(id);
    if (!note) throw new NotFoundException("This note doesn't exist");
    return note;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateNoteDto: NoteDto) {
    const note = await this.notesService.update(id, updateNoteDto);
    return note;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const rowsCount = await this.notesService.remove(id);
    if (rowsCount === 0) throw new NotFoundException("This note doesn't exist");
    return 'Deleted successfuly';
  }

  @Patch(':id/archive')
  async archive(@Param('id') id: string) {
    const note = await this.notesService.archive(id);
    if (note[0] === 0) throw new NotFoundException("This note doesn't exist");
    return 'Archived successfuly';
  }
  @Patch(':id/unarchive')
  async unarchive(@Param('id') id: string) {
    const note = await this.notesService.unarchive(id);
    if (note[0] === 0) throw new NotFoundException("This note doesn't exist");
    return 'Unarchived successfuly';
  }
}
