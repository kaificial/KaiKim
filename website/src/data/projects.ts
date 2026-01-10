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
    longDescription?: string;
}

export const projects: Project[] = [
    {
        id: 'rooke',
        title: 'Rooke',
        description: 'Chess web app for beginners with sandbox and vs AI mode',
        longDescription: `Not only can Rooke be used to play chess, but it can also be used to learn more about machine strategy; visually. Compared to the traditional engines that operate in the dark, Rooke brings the hidden logic to life visually in a 3D environment for your learning/curiosity.

### <u>**How the AI Works**</u>

<u>**Minimax: The Decision Tree**</u>  
The Minimax algorithm treats the game as a 0 sum game. The main goal: is to maximize its score and assumes its opponent (you) will play perfectly to minimize the score.

The recursive relation for a Minimax value $V$ at a state $s$ and depth $d$ is: 

$$V(s, d) = \\begin{cases} \\text{Eval}(s) & \\text{if } d=0 \\text{ or game over} \\\\ \\max_{a \\in A} V(\\text{result}(s, a), d-1) & \\text{if Player = Max} \\\\ \\min_{a \\in A} V(\\text{result}(s, a), d-1) & \\text{if Player = Min} \\end{cases}$$
#
<u>**Alpha-Beta Pruning, Efficiency Boost**</u> 
<br />
Alpha-beta pruning doesn't change the result of Minimax; it just stops looking at branches that can’t influence the absolute final decision.
</br>
• **Alpha ($\\alpha$):** The best (highest) score the Max player is guaranteed.
</br>
• **Beta ($\\beta$):** The best (lowest) score the Min player is guaranteed.

The pruning condition happens when **$\\beta \\le \\alpha$**. 

If the Min player has a move that results in a score less than what the Max player has already secured somewhere else, the Max player will never let the game to reach that position, so we stop searching that branch.
#
<u>**Heuristics**</u>
<br />
Since chess has $10^{120}$ possible games (Claude Shannon's estimate), we can’t search to the end. So… we use a: 
<br />
*Heuristic Evaluation Function* $f(s)$ to estimate the “strength” of a position:
#
$$f(s) = w_m \\cdot M + w_p \\cdot P + w_k \\cdot K + \\dots$$
#
Where:
#
• **$M$ (Material):**  which is  $\\sum (\\text{Value}_{\\text{white}} - \\text{Value}_{\\text{black}})$.
#
• **$P$ (Position/PST):** Bonus/penalty based on where pieces stand. For example, a Knight at $e4$ (center) has a higher PST value than a Knight at $a1$ (the corner).
#
• **$w$:** are the weights assigned to each factor.
#
<u>**The Web Worker Pattern**</u>
<br />
The **Main Thread** handles the "View" (Three.js/Canvas rendering at 60fps) and the user input. If you ran a heavy search on the main thread, the screen would freeze until the AI finished.

So **the Web Worker** acts as a background thread, the step by step process is: 
1. **Main Thread:** Sends a message \`postMessage({board: currentFEN, depth: 4})\`.
2. **Web Worker:** Gets the data, runs the Minimax recursion formula (utilizing all 100 % of background CPU core).
3. **Main Thread:** Still renders the 3D animations and UI.
4. **Web Worker:** Sends a message back \`postMessage({bestMove: 'e2e4'})\` when its done.

Because Web Workers don't share memory with the main thread, the board state is passed as a string (FEN) or a Typed Array to keep the process and communication fast.

### <u>**The Visualization** </u>

- “Thoughts” are buffered and played back every 800ms, which lets  users to actually read it’s “thought process” and decision making. 
- **Principal Variation (PV) Ghosts**: these are 3D projections (holograms) of the AI's predicted move sequences which show you exactly what it expects to happen next.

(And you can toggle these visualizations on/off thoughout your game!)`,
        tags: ['Three.js', 'JavaScript (ES6+)', 'HTML5', 'CSS3 (Vanilla)', 'WebGL', 'GSAP', 'Web Workers API', 'Vite', 'PostCSS'],
        status: 'Building',
        url: 'rooke.vercel.app',
        github: 'https://github.com/kaificial/rooke',
        demo: 'https://rooke.vercel.app',
        video: '/assets/rooke-video.mp4'
    },
    {
        id: 'texify',
        title: 'Scribe',
        description: 'Convert handwritten math into polished LaTeX in seconds, without writing a single backslash.',
        tags: ['React', 'Vite', 'TypeScript', 'Tailwind CSS', 'Transformers.js', 'Web Workers', 'Luminance Thresholding', 'KaTeX', 'FileReader API', 'Canvas API', 'Clipboard API'],
        status: 'Live',
        url: 'https://texifylatex.vercel.app',
        github: 'https://github.com/kaificial/texify',
        demo: 'https://texifylatex.vercel.app',
        video: '/assets/TeXify.mp4'
    },

];
