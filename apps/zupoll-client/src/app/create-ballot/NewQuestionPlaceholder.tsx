import React from "react";
import { TbMessageQuestion } from "react-icons/tb";
import { cn } from "../../@/lib/utils";

export const NewQuestionPlaceholder = React.forwardRef<
  HTMLButtonElement,
  React.HTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        "mb-3 relative block w-full rounded-lg border-2 border-dashed border-gray-400 p-8 text-center hover:border-gray-200 focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 active:ring-offset-background",
        className
      )}
      {...props}
    >
      <div className="mx-auto h-12 w-12 text-foreground/80">
        <TbMessageQuestion className="stroke-custom" size={48} />
      </div>
      <span className="mt-2 block text-sm font-semibold text-foreground/80">
        Add Poll
      </span>
    </button>
  );
});
NewQuestionPlaceholder.displayName = "NewQuestionPlaceholder";