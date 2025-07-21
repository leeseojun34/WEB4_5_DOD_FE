import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type ControlledAlertBoxProps = {
  title?: string;
  content: string;
  cancel: string;
  action: string;
  isOpen: boolean;
  onClose: () => void;
  cancelHandler?: () => void;
  actionHandler: () => void;
};

const ControlledAlertBox = ({
  title = "",
  content,
  cancel,
  action,
  isOpen,
  onClose,
  cancelHandler,
  actionHandler,
}: ControlledAlertBoxProps) => {
  const handleCancel = () => {
    cancelHandler?.();
    onClose();
  };

  const handleAction = () => {
    actionHandler();
    onClose();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="w-[320px] px-10 flex flex-col justify-center items-center bg-[color:var(--color-white)] border-0">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-medium text-base text-[color:var(--color-black)]">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="font-normal text-sm text-[color:var(--color-black)]">
            {content}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="w-full flex flex-row justify-center items-center gap-4">
          <AlertDialogCancel
            onClick={handleCancel}
            className="flex-1 border-0 font-normal text-sm text-[color:var(--color-black)] bg-[color:var(--color-muted)] transition-colors hover:scale-101 hover:bg-[var(--color-gray-border)] duration-300 cursor-pointer"
          >
            {cancel}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleAction}
            className="flex-1 border-0 bg-[color:var(--color-primary-400)] text-[color:var(--color-white)] transition-colors hover:scale-101 hover:bg-[var(--color-primary-400-hover)] duration-300 cursor-pointer"
          >
            {action}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ControlledAlertBox;
