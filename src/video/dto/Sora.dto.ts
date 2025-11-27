import {IsIn, IsInt, IsOptional, IsString, Max, Min, MinLength} from "class-validator";
import {Type} from "class-transformer";

export class SoraDto {
    @IsString({ message: "Prompt must be a string" })
    @MinLength(5, { message: "Prompt must not be empty" })
    prompt: string;

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    @Min(4)
    @Max(12)
    @IsIn([4, 8, 12])
    seconds?: number = 4;

    @IsOptional()
    @IsString()
    @IsIn(['portrait', 'landscape'])
    aspect_ratio?: string = 'portrait';

    @IsOptional()
    @IsString()
    @IsIn(['standard', 'high'])
    resolution?: string = 'standard';
}