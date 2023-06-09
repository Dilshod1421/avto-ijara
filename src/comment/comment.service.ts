import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from './models/comment.model';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment) private commentRepository: typeof Comment,
  ) { }

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const comment = await this.commentRepository.create(createCommentDto);
    return comment;
  }

  async findAll(): Promise<Comment[]> {
    const comments = await this.commentRepository.findAll();
    return comments;
  }

  async findOne(id: number): Promise<Comment> {
    const comment = await this.commentRepository.findOne({ where: { id } });
    return comment;
  }

  async update(id: number, updateCommentDto: UpdateCommentDto): Promise<Comment> {
    const comment = await this.commentRepository.update(updateCommentDto, { where: { id }, returning: true });
    return comment[1][0];
  }

  async remove(id: number): Promise<Object> {
    const comment = await this.commentRepository.findByPk(id);
    await this.commentRepository.destroy({ where: { id } });
    return { message: "Removed comment", comment };
  }
}
