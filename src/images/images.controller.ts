import {
  Controller,
  Post,
  Put,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'src/utils/filesManipulation';
import { ApiBody, ApiConsumes, ApiProperty, ApiTags } from '@nestjs/swagger';

@ApiTags('Images')
@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}
  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @UseInterceptors(
    FilesInterceptor('files', 999, {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
    const imageList = [];
    if (files && files.length > 0)
      files.forEach((file) => {
        const fileReponse = {
          originalname: file.originalname,
          filename: file.filename,
        };
        imageList.push(fileReponse);
      });
    return { data: imageList };
  }
}
