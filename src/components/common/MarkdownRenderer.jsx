/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import propTypes from 'prop-types';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CodeBlock from './CodeBlock';

const MarkdownRenderer = ({ content }) => {
    return (
        <div className="prose-custom w-full max-w-none leading-8">
            <Markdown
                remarkPlugins={[remarkGfm]}
                components={{
                    h1: ({ node, ...props }) => <h1 className="text-3xl font-bold my-4" {...props} />,
                    h2: ({ node, ...props }) => <h2 className="text-2xl font-semibold my-3" {...props} />,
                    h3: ({ node, ...props }) => <h3 className="text-xl font-semibold my-2" {...props} />,
                    pre: ({ node, ...props }) => <>{props.children}</>,
                    p: ({ node, children, ...props }) => <span className="my-2 leading-relaxed" {...props}>{children}</span>,
                    ul: ({ node, ...props }) => <ul className="list-disc list-inside my-2" {...props} />,
                    ol: ({ node, ...props }) => <ol className="list-decimal list-inside my-2" {...props} />,
                    li: ({ node, ...props }) => <li className="ml-4" {...props} />,
                    a: ({ node, ...props }) => <a className="text-blue-600 hover:underline" {...props} />,
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
