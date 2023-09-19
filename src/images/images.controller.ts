import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
  Get,
  Param,
  Res,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import fileExists, {
  editFileName,
  imageFileFilter,
} from 'src/utils/filesManipulation';
import { ApiBody, ApiConsumes, ApiParam, ApiTags } from '@nestjs/swagger';
import { createReadStream } from 'fs';
import { join } from 'path';

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

  // Create a Get Route to serve the image files
  @Get(':imgpath')
  @ApiParam({ name: 'imgpath', type: 'string' })
  async serveImage(@Param('imgpath') image: string, @Res() res) {
    const filePath = join(process.cwd(), 'uploads', image);

    if (!fileExists(filePath)) {
      res.status(404).send('Imagem não encontrada');
      return;
    }

    const fileStream = createReadStream(filePath);
    res.setHeader('Content-Type', 'image/png');
    fileStream.pipe(res);
  }
}
