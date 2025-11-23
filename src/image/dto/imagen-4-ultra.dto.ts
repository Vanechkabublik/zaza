import {IsString, IsEnum, IsOptional, IsNumber, Max, Min} from 'class-validator';

export class Imagen4UltraDto {
    @IsString()
    prompt: string;

    @IsEnum(['1:1', '9:16', '16:9', '3:4', '4:3'])
    @IsOptional()
    aspect_ratio?: string = '16:9';

    @IsEnum(['jpg', 'png'])
    @IsOptional()
    output_format?: string = 'jpg';
}