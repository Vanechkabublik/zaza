import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as crypto from 'crypto';

export type UploadFolder = 'photos' | 'videos' | 'audio';

export interface UploadResult {
    filename: string;
    originalName: string;
    mimetype: string;
    size: number;
    folder: UploadFolder;
    hash: string;
    path: string;
    url: string;
}

@Injectable()
export class FileService {
    private readonly uploadBasePath: string;
    private readonly baseUrl: string;

    private readonly maxSizes = {
        photos: 10 * 1024 * 1024,
        videos: 100 * 1024 * 1024,
        audio: 50 * 1024 * 1024,
    };

    private readonly allowedTypes = {
        photos: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
        videos: ['video/mp4', 'video/mpeg', 'video/ogg', 'video/webm'],
        audio: ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/aac'],
    };

    constructor(private configService: ConfigService) {
        this.uploadBasePath = this.configService.getOrThrow('UPLOAD_BASE_PATH');
        this.baseUrl = this.configService.getOrThrow('BASE_URL');
        this.initDirs();
    }

    private async initDirs(): Promise<void> {
        try {
            await fs.mkdir(path.join(this.uploadBasePath, 'photos'), { recursive: true });
            await fs.mkdir(path.join(this.uploadBasePath, 'videos'), { recursive: true });
            await fs.mkdir(path.join(this.uploadBasePath, 'audio'), { recursive: true });
        } catch {
            throw new InternalServerErrorException('Cannot create upload dirs');
        }
    }

    // НОВЫЙ МЕТОД: Автоматически определяет папку по MIME-типу
    private detectFolder(mimetype: string): UploadFolder {
        if (mimetype.startsWith('image/')) {
            return 'photos';
        } else if (mimetype.startsWith('video/')) {
            return 'videos';
        } else if (mimetype.startsWith('audio/')) {
            return 'audio';
        }
        throw new BadRequestException(`Unsupported file type: ${mimetype}`);
    }

    // ИСПРАВЛЕННЫЙ МЕТОД: Теперь не нужно передавать folder
    async upload(file: Express.Multer.File): Promise<UploadResult> {
        // Автоматически определяем папку по MIME-типу
        const folder = this.detectFolder(file.mimetype);

        const maxSize = this.maxSizes[folder];
        if (file.size > maxSize) {
            throw new BadRequestException(`File too large. Max: ${maxSize / 1024 / 1024}MB`);
        }

        const allowed = this.allowedTypes[folder];
        if (!allowed.includes(file.mimetype)) {
            throw new BadRequestException(`File type not allowed for ${folder}`);
        }

        const filename = `${Date.now()}-${crypto.randomBytes(8).toString('hex')}${path.extname(file.originalname)}`;
        const filePath = path.join(this.uploadBasePath, folder, filename);
        const hash = crypto.createHash('md5').update(file.buffer).digest('hex');

        try {
            await fs.writeFile(filePath, file.buffer);
            return {
                filename,
                originalName: file.originalname,
                mimetype: file.mimetype,
                size: file.size,
                folder,
                hash,
                path: filePath,
                url: `${this.baseUrl}/uploads/${folder}/${filename}`
            };
        } catch {
            throw new InternalServerErrorException('Save failed');
        }
    }

    async uploadMultiple(files: Express.Multer.File[]): Promise<UploadResult[]> {
        if (!files || files.length === 0) {
            throw new BadRequestException('No files provided');
        }

        const uploadPromises = files.map(file => this.upload(file));
        return Promise.all(uploadPromises);
    }
}