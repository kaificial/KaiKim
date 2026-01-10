export interface Project {
    id: string;
    title: string;
    description: string;
    tags: string[];
    status: 'Live' | 'Building' | 'Archived';
    url: string;
    video?: string;
    solidColor?: string;
    icon?: string;
    github?: string;
    demo?: string;
}

export const projects: Project[] = [
    {
        id: 'rooke',
        title: 'Rooke',
        description: 'Chess web app for beginners with sandbox and vs AI mode',
        tags: ['Typescript', 'Zustand', 'Three.js'],
        status: 'Building',
        url: 'rooke.vercel.app',
        github: 'https://github.com/kaificial/rooke',
        demo: 'https://rooke.vercel.app',
        video: '/assets/rooke-video.mp4'
    },
    {
        id: 'texify',
        title: 'TeXify',
        description: 'Convert handwritten math into polished LaTeX in seconds, without writing a single backslash.',
        tags: ['React', 'AI', 'LaTeX'],
        status: 'Building',
        url: '',
        github: 'https://github.com/kaificial/texify',
        video: '/assets/ScribeAI.mp4'
    },

];
