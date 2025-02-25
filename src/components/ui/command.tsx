// command.tsx (TypeScript)

import * as React from "react"
import { type DialogProps } from "@radix-ui/react-dialog"
import { Command as CommandPrimitive } from "cmdk"
import { Search } from "lucide-react"

import { cn } from "@/lib/utils"
import { Dialog, DialogContent } from "@/components/ui/dialog"

// -----------------------
// 1) COMMAND ROOT WRAPPER
// -----------------------
interface CommandProps
  extends React.ComponentPropsWithoutRef<typeof CommandPrimitive> {
  children?: React.ReactNode
}

export const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  CommandProps
>(({ children, className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
      className
    )}
    {...props}
  >
    {children}
  </CommandPrimitive>
))

Command.displayName = "Command"

// -----------------------
// 2) DIALOG WRAPPER
// -----------------------
export const CommandDialog = ({ children, ...props }: DialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent className="overflow-hidden p-0">
        <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  )
}

// -----------------------
// 3) COMMAND INPUT
//    (placeholder, value, onValueChange)
// -----------------------
interface CommandInputProps
  extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input> {
  placeholder?: string
  value?: string
  /** If you want a callback for controlled input, pass onValueChange. */
  onValueChange?: (val: string) => void
}

export const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  CommandInputProps
>(({ className, placeholder, value, onValueChange, onChange, ...props }, ref) => {
  // Tie your custom onValueChange to the input’s onChange event
  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onValueChange?.(e.target.value)
      onChange?.(e) // call the original onChange if provided
    },
    [onValueChange, onChange]
  )

  return (
    <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
      <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
      <CommandPrimitive.Input
        ref={ref}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className={cn(
          "flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none",
          "placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    </div>
  )
})

CommandInput.displayName = "CommandInput"

// -----------------------
// 4) COMMAND LIST
// -----------------------
interface CommandListProps
  extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.List> {
  children?: React.ReactNode
}

export const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  CommandListProps
>(({ children, className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)}
    {...props}
  >
    {children}
  </CommandPrimitive.List>
))

CommandList.displayName = "CommandList"

// -----------------------
// 5) COMMAND EMPTY
// -----------------------
interface CommandEmptyProps
  extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty> {
  children?: React.ReactNode
}

export const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  CommandEmptyProps
>(({ children, ...props }, ref) => (
  <CommandPrimitive.Empty ref={ref} className="py-6 text-center text-sm" {...props}>
    {children}
  </CommandPrimitive.Empty>
))

CommandEmpty.displayName = "CommandEmpty"

// -----------------------
// 6) COMMAND GROUP
//    (heading? prop for custom section title)
// -----------------------
interface CommandGroupProps
  extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group> {
  children?: React.ReactNode
  heading?: string
}

export const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  CommandGroupProps
>(({ children, className, heading, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      "overflow-hidden p-1 text-foreground",
      "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5",
      "[&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium",
      "[&_[cmdk-group-heading]]:text-muted-foreground",
      className
    )}
    {...props}
  >
    {/* If the user passed a heading prop, render it. */}
    {heading && (
      <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
        {heading}
      </div>
    )}
    {children}
  </CommandPrimitive.Group>
))

CommandGroup.displayName = "CommandGroup"

// -----------------------
// 7) COMMAND SEPARATOR
// -----------------------
interface CommandSeparatorProps
  extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator> {}

export const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  CommandSeparatorProps
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 h-px bg-border", className)}
    {...props}
  />
))

CommandSeparator.displayName = "CommandSeparator"

// -----------------------
// 8) COMMAND ITEM
//    (value? & onSelect? for your custom usage)
// -----------------------
interface CommandItemProps
  extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item> {
  children?: React.ReactNode
  /**
   * Custom value to pass to onSelect
   * if you don’t want to rely on
   * the built-in cmdk onSelect string.
   */
  value?: string
  onSelect?: (value: string) => void
}

export const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  CommandItemProps
>(({ children, className, value, onSelect, ...props }, ref) => {
  // If both `onSelect` and `value` exist, we call `onSelect(value)`:
  const handleSelect = React.useCallback(() => {
    if (onSelect && typeof value === "string") {
      onSelect(value)
    }
  }, [onSelect, value])

  return (
    <CommandPrimitive.Item
      ref={ref}
      onSelect={handleSelect}
      className={cn(
        "relative flex select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none",
        "data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50",
        "[&_svg]:pointer-events-none [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0",
        className
      )}
      {...props}
    >
      {children}
    </CommandPrimitive.Item>
  )
})

CommandItem.displayName = "CommandItem"

// -----------------------
// 9) OPTIONAL SHORTCUT
// -----------------------
interface CommandShortcutProps extends React.HTMLAttributes<HTMLSpanElement> {}

export function CommandShortcut({ className, ...props }: CommandShortcutProps) {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)}
      {...props}
    />
  )
}

CommandShortcut.displayName = "CommandShortcut"