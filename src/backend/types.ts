export type Member = {
    id: string;
    login: string;
    details: string;
    avatarUrl: string;
    displayName: string;
};

export type Message = {
    sender: string;
    text: string;
};

export type Paste = {
    id: string;
    name: string;
    views: string;
    content: string;
    codeType: string;
};

export type AccountCredentials = {
    username: string;
    token: string;
};

export type AppleLoginResponse = {
    authorization: {
        code: string;
        id_token: string;
    };
    user?: {
        name: {
            firstName: string;
            lastName: string;
        };
        email: string;
    };
};

export type Profile = {
    icon: string;
    displayName: string;
};

export type Channel = {
    id: string;
    name: string;
    icon: string;

    members: Profile[];
    lastMessages: ChatMessage[];
    conversations: Conversation[];
};

export type Conversation = {
    id: string;
    name: string;

    hasCall: boolean;
    callParticipants: Profile[];

    messages: ChatMessage[];
};

export type ChatMessage = {
    sender: Profile;
    content: string;
    time: bigint;
};

export type OldPaste = {
    id: string;
    name: string;
};

export enum Mobile {
    Android,
    iOS,
    Unknown
}

/** Name -> Internal */
export const Languages: { [key: string]: string } = {
    "Auto Detect": "auto",
    Plaintext: "plaintext",
    C: "c",
    "C#": "csharp",
    "C++": "cpp",
    cURL: "curl",
    Dart: "dart",
    Elixir: "elixir",
    GDScript: "godot",
    Go: "go",
    Gradle: "gradle",
    GraphQL: "graphql",
    Groovy: "groovy",
    HTML: "html",
    TOML: "toml",
    JSON: "json",
    Java: "java",
    JavaScript: "javascript",
    Kotlin: "kotlin",
    Makefile: "makefile",
    Nginx: "nginx",
    "Objective-C": "objectivec",
    "OpenGL Shading Language": "glsl",
    PHP: "php",
    PowerShell: "powershell",
    Properties: "properties",
    "Protocol Buffers": "protobuf",
    Python: "python",
    "Razor CSHTML": "razor",
    Rust: "rust",
    SCSS: "scss",
    SQL: "sql",
    Scala: "scala",
    Svelte: "svelte",
    Swift: "swift",
    "Visual Basic Script": "vbscript",
    "x86 Assembly": "x86asm",
    YAML: "yaml"
};

/** Name -> Duration */
export const Durations: { [key: string]: number } = {
    "Never": 0,
    "After Read": -1,
    "5 minutes": 5 * 60 * 1000,
    "15 minutes": 15 * 60 * 1000,
    "30 minutes": 30 * 60 * 1000,
    "1 hour": 60 * 60 * 1000,
    "2 hours": 2 * 60 * 60 * 1000,
    "4 hours": 4 * 60 * 60 * 1000,
    "8 hours": 8 * 60 * 60 * 1000,
    "12 hours": 12 * 60 * 60 * 1000,
    "1 day": 24 * 60 * 60 * 1000,
    "7 days": 7 * 24 * 60 * 60 * 1000,
    "30 days": 30 * 24 * 60 * 60 * 1000
};

/** List of seiKimo owners. */
export const Owners: string[] = [
    "KingRainbow44",
    "Arikatsu",
    "KiminaNatsuki"
];
