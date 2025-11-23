import { IsOptional, IsString, MinLength, Matches } from "class-validator";

export class GenDto {
    @IsString({ message: "Prompt must be a string" })
    @MinLength(25, { message: "Prompt must be at least 25 characters long" })
    @Matches(/^[a-zA-Z0-9\s\.,!?'-]+$/, {
        message: "Prompt must contain only English characters, numbers and basic punctuation"
    })
    prompt: string;
}