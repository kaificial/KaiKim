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
        id: 'ratemyeats',
        title: 'RateMyEats',
        description: 'University dining hall rating platform for Canadian students',
        tags: ['React', 'Node.js', 'MongoDB'],
        status: 'Building',
        url: 'ratemyeats.com',
        solidColor: '#262626'
    },
    {
        id: 'rooke',
        title: 'Rooke',
        description: 'A chess app Made for new chess players looking to improve their skills.',
        tags: ['React Native', 'TypeScript', 'Chess'],
        status: 'Live',
        url: 'rooke.gg',
        icon: '♜',
        video: '/assets/Rooke.mp4'
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
    }
];
