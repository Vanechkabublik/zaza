import {IsString, IsEnum, IsOptional, IsNumber, Max, Min} from 'class-validator';

export class NanobananoDto {
    @IsString()
    prompt: string;

    @IsEnum(['jpg', 'png'])
    @IsOptional()
    output_format?: string = 'jpg';
}