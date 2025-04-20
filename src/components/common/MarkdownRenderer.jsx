/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import propTypes from 'prop-types';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CodeBlock from './CodeBlock';

const MarkdownRenderer = ({ content }) => {
    return (
        <div className="w-full max-w-none leading-8 text-slate-700 dark:text-gray-200">
            <Markdown
                remarkPlugins={[remarkGfm]}
                components={{
                    h1: ({ node, ...props }) => <h1 className="text-3xl text-slate-600 dark:text-gray-200 font-bold my-4" {...props} />,
                    h2: ({ node, ...props }) => <h2 className="text-2xl text-slate-600 dark:text-gray-200 font-semibold my-3" {...props} />,
                    h3: ({ node, ...props }) => <h3 className="text-xl text-slate-600 dark:text-gray-200 font-semibold my-2" {...props} />,
                    h4: ({ node, ...props }) => <h3 className="text-lg text-slate-600 dark:text-gray-200 font-semibold my-2" {...props} />,
                    pre: ({ node, ...props }) => <>{props.children}</>,
                    p: ({ node, children, ...props }) => <span className="my-2 leading-relaxed" {...props}>{children}</span>,
                    ul: ({ node, ...props }) => <ul className="list-disc list-inside my-2" {...props} />,
                    ol: ({ node, ...props }) => <ol className="list-decimal list-inside my-2" {...props} />,
                    li: ({ node, ...props }) => <li className="ml-4" {...props} />,
                    a: ({ node, ...props }) => <a className="text-blue-600 hover:underline" {...props} />,
                    table: ({ node, ...props }) => (
                        <div className="my-4 overflow-x-auto">
                            <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600" {...props} />
                        </div>
                    ),
                    hr: ({ node, ...props }) => <hr className="border-t border-gray-300 dark:border-gray-600 my-10" {...props} />,
                    thead: ({ node, ...props }) => <thead className="bg-gray-100 dark:bg-gray-700" {...props} />,
                    tbody: ({ node, ...props }) => <tbody {...props} />,
                    tr: ({ node, ...props }) => <tr className="border-b border-gray-300 dark:border-gray-600" {...props} />,
                    th: ({ node, ...props }) => <th className="py-2 px-4 font-semibold text-left border-r border-gray-300 dark:border-gray-600 last:border-r-0" {...props} />,
                    td: ({ node, ...props }) => <td className="py-2 px-4 border-r border-gray-300 dark:border-gray-600 last:border-r-0" {...props} />,
                    blockquote: ({ node, ...props }) => (
                        <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4" {...props} />
                    ),
                    code: ({ node, inline, className, children, ...props }) => {
                        if (inline) {
                            return (
                                <code className="bg-gray-100 text-sm px-1 rounded custom-scrollbar" {...props}>
                                    {children}
                                </code>
                            );
                        }

                        return <CodeBlock className={className}>{children}</CodeBlock>;
                    },
                }}
            >
                {content}
            </Markdown>
        </div>
    );
};

MarkdownRenderer.propTypes = {
    content: propTypes.string.isRequired,
};

export default MarkdownRenderer;
