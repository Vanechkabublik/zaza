import {IsOptional, IsString} from "class-validator";

export class PromptDto {
    @IsString({message: "Prompt must be a string"})
    prompt: string
}