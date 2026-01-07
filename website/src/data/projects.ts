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
        id: 'texify',
        title: 'TeXify',
        description: 'Convert handwritten math into polished LaTeX in seconds, without writing a single backslash.',
        tags: ['React', 'AI', 'LaTeX'],
        status: 'Building',
        url: '',
        github: 'https://github.com/kaificial/texify',
        video: '/assets/ScribeAI.mp4'
    },
    {
        id: 'ratemyeats',
        title: 'RateMyEats',
        description: 'University dining hall rating platform for Canadian students',
        tags: ['React', 'Node.js', 'MongoDB'],
        status: 'Building',
        url: 'ratemyeats.com',
        solidColor: '#262626'
    }
];
