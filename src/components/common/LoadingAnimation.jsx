
function LoadingAnimation() {
  return (
    <div className="flex items-start gap-5 group">
      <div className="flex-1 rounded-lg p-4 max-w-2xl bg-transparent text-slate-700 dark:text-gray-100">
        <div className="flex space-x-2">
          <div className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-300 animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-300 animate-bounce" style={{ animationDelay: '300ms' }}></div>
          <div className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-300 animate-bounce" style={{ animationDelay: '600ms' }}></div>
        </div>
      </div>
    </div>
  );
}

export default LoadingAnimation;