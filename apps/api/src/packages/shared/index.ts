export interface Category{
    id: number;
    name: string;
    description: string|null;
    created_at?: Date;
}

export interface Technology {
    id: string;
    category_id: string;
    name: string;
    description: string | null;
    official_url: string | null;
    installation_script: string;
    verification_command: string | null;
    created_at?: Date;
}

export interface GenerateScriptPayLoad {
    technologyIds: string[];
}

export interface GenerateScriptResponse {
    filename: string;
    content: string;
}