import { IsString, MinLength, IsOptional, IsBoolean, IsIn, IsNumber, Min, Max } from 'class-validator';

export class VideoBaseDto {
    @IsString({ message: "Prompt must be a string" })
    @MinLength(1, { message: "Prompt must not be empty" })
    prompt: string;

    @IsNumber()
    @Min(8, { message: "Duration must be at least 8 second" })
    @IsOptional()
    duration?: number = 8;

    @IsString()
    @IsIn(['16:9', '9:16'], { message: "Aspect ratio must be 16:9, 9:16" })
    @IsOptional()
    aspect_ratio?: string = '16:9';

    @IsString()
    @IsIn(['720p', '1080p'], { message: "Resolution must be 720p or 1080p" })
    @IsOptional()
    resolution?: string = '1080p';

    @IsOptional()
    generate_audio?: boolean = true;
}
