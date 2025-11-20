import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";

export function SidebarNav({ className, items, selectedItem, handleSelect, ...props}) {
  return (
    <nav
      className={"flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1"}
      {...props}
    >
      {items.map((item) => (
        <a
          onClick={() => handleSelect(item)}
          href="#"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            selectedItem === item.href
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start"
          )}
        >
          {item.title}
        </a>
      ))}
    </nav>
  );
}
