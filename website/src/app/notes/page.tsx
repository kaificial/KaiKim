import Link from "next/link";

export const metadata = {
    title: "Notes | Kai Kim",
    description: "Thoughts, ideas, and notes.",
};

export default function NotesPage() {
    return (
        <div className="container mx-auto px-4 py-24 max-w-2xl">
            <h1 className="text-3xl font-bold mb-12">Notes</h1>

            <div className="flex flex-col gap-8">
                <Link href="/notes/her" className="group block">
                    <article className="flex justify-between items-baseline border-b border-gray-200 dark:border-gray-800 pb-4">
                        <h2 className="text-xl font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            Her
                        </h2>
                        <time className="text-sm text-gray-500 dark:text-gray-400">
                            Feb 12, 2026
                        </time>
                    </article>
                </Link>
            </div>
        </div>
    );
}
