// src/components/ui/command.tsx

import * as React from "react"
import { type DialogProps } from "@radix-ui/react-dialog"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
import { Command as CommandPrimitive } from "cmdk"
import { cn } from "@/lib/utils.js"
import { Dialog, DialogContent } from "@/components/ui/dialog.js"

// ------------------------------------------
// 1) COMMAND ROOT
// ------------------------------------------
type CommandRef = React.ElementRef<typeof CommandPrimitive>
type CommandProps = React.ComponentPropsWithoutRef<typeof CommandPrimitive> & {
  /** If you want to render nested children (Groups, Items, etc.), add them here. */
  children?: React.ReactNode
}

export const Command = React.forwardRef<CommandRef, CommandProps>(
  ({ className, children, ...props }, ref) => (
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
  )
)

Command.displayName = "Command"

// ------------------------------------------
// 2) COMMAND DIALOG
// ------------------------------------------
export interface CommandDialogProps extends DialogProps {
  children?: React.ReactNode
}

export const CommandDialog = ({ children, ...props }: CommandDialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent className="overflow-hidden p-0">
        <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  )
}

// ------------------------------------------
// 3) COMMAND INPUT
// ------------------------------------------
type CommandInputRef = React.ElementRef<typeof CommandPrimitive.Input>
type CommandInputProps = React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input> & {
  children?: React.ReactNode
}

export const CommandInput = React.forwardRef<CommandInputRef, CommandInputProps>(
  ({ className, ...props }, ref) => (
    <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
      <MagnifyingGlassIcon className="mr-2 h-4 w-4 shrink-0 opacity-50" />
      <CommandPrimitive.Input
        ref={ref}
        className={cn(
          "flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    </div>
  )
)

CommandInput.displayName = "CommandInput"

// ------------------------------------------
// 4) COMMAND LIST
// ------------------------------------------
type CommandListRef = React.ElementRef<typeof CommandPrimitive.List>
type CommandListProps = React.ComponentPropsWithoutRef<typeof CommandPrimitive.List> & {
  children?: React.ReactNode
}

export const CommandList = React.forwardRef<CommandListRef, CommandListProps>(
  ({ className, children, ...props }, ref) => (
    <CommandPrimitive.List
      ref={ref}
      className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)}
      {...props}
    >
      {children}
    </CommandPrimitive.List>
  )
)

CommandList.displayName = "CommandList"

// ------------------------------------------
// 5) COMMAND EMPTY
// ------------------------------------------
type CommandEmptyRef = React.ElementRef<typeof CommandPrimitive.Empty>
type CommandEmptyProps = React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty> & {
  children?: React.ReactNode
}

export const CommandEmpty = React.forwardRef<CommandEmptyRef, CommandEmptyProps>(
  ({ className, children, ...props }, ref) => (
    <CommandPrimitive.Empty
      ref={ref}
      className={cn("py-6 text-center text-sm", className)}
      {...props}
    >
      {children}
    </CommandPrimitive.Empty>
  )
)

CommandEmpty.displayName = "CommandEmpty"

// ------------------------------------------
// 6) COMMAND GROUP
// ------------------------------------------
type CommandGroupRef = React.ElementRef<typeof CommandPrimitive.Group>
type CommandGroupProps = React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group> & {
  children?: React.ReactNode
}

export const CommandGroup = React.forwardRef<CommandGroupRef, CommandGroupProps>(
  ({ className, children, ...props }, ref) => (
    <CommandPrimitive.Group
      ref={ref}
      className={cn(
        "overflow-hidden p-1 text-foreground",
        "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5",
        "[&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
        className
      )}
      {...props}
    >
      {children}
    </CommandPrimitive.Group>
  )
)

CommandGroup.displayName = "CommandGroup"

// ------------------------------------------
// 7) COMMAND SEPARATOR
// ------------------------------------------
type CommandSeparatorRef = React.ElementRef<typeof CommandPrimitive.Separator>
type CommandSeparatorProps = React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>

export const CommandSeparator = React.forwardRef<
  CommandSeparatorRef,
  CommandSeparatorProps
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 h-px bg-border", className)}
    {...props}
  />
))

CommandSeparator.displayName = "CommandSeparator"

// ------------------------------------------
// 8) COMMAND ITEM
// ------------------------------------------
type CommandItemRef = React.ElementRef<typeof CommandPrimitive.Item>
type CommandItemProps = React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item> & {
  children?: React.ReactNode
}

export const CommandItem = React.forwardRef<CommandItemRef, CommandItemProps>(
  ({ className, children, ...props }, ref) => (
    <CommandPrimitive.Item
      ref={ref}
      className={cn(
        "relative flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
        "data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50",
        "[&_svg]:pointer-events-none [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0",
        className
      )}
      {...props}
    >
      {children}
    </CommandPrimitive.Item>
  )
)

CommandItem.displayName = "CommandItem"

// ------------------------------------------
// 9) SHORTCUT
// ------------------------------------------
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
