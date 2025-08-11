import { cloneElement, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  // AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ActionState } from "./form/utils/to-action-state";
import { Button } from "./ui/button";

type UseConfirmDialogProps = {
  title?: string;
  description?: string;
  // action: () => void;
  action: () => Promise<ActionState>;
  trigger: React.ReactElement;
};

const useConfirmDialog = ({
  title = "Are you absolutely sure?",
  description = "This action cannot be undone. Make sure you understand the consequences.",
  action,
  trigger,
}: UseConfirmDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // since form action requires a promise, we need to wrap the action in a promise
  const formAction = async () => {
    await action();
  };

  // AlertDialogTrigger originally is in <AlertDialog></AlertDialog> from shadcn. Now we've
  // extracted it out, so we need to make <AlertDialog> a controlled component
  // other issue is we can't actually use AlertDialogTrigger here, we need to clone it
  // <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
  const dialogTrigger = cloneElement(trigger, {
    onClick: () => setIsOpen((prevState) => !prevState),
  } as React.HTMLAttributes<HTMLElement>);

  const dialog = (
    // make <AlertDialog> a controlled component now that we've extracted AlertDialogTrigger out
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <form action={formAction}>
              <Button type="submit">Confirm</Button>
            </form>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  return [dialogTrigger, dialog];
};

export { useConfirmDialog };
