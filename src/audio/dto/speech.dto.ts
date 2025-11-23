import { IsOptional, IsString, IsNumber, Min, Max, IsIn, MinLength } from "class-validator";

export class SpeechDto {
    @IsString({ message: "Text must be a string" })
    @MinLength(1, { message: "Text must not be empty" })
    text: string;

    @IsString({ message: "Voice must be a string" })
    @IsIn([
        'af_alloy', 'af_aoede', 'af_bella', 'af_jessica', 'af_kore',
        'af_nicole', 'af_nova', 'af_river', 'af_sarah', 'af_sky',
        'am_adam', 'am_echo', 'am_eric', 'am_fenrir', 'am_liam',
        'am_michael', 'am_onyx', 'am_puck'
    ], { message: "Voice must be a valid voice ID" })
    @IsOptional()
    voice_id?: string;

    @IsNumber()
    @Min(0.1, { message: "Speed must be at least 0.1" })
    @Max(5, { message: "Speed must be at most 5" })
    @IsOptional()
    speed?: number;
}