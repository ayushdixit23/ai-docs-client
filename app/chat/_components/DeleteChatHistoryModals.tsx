import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash, Trash2 } from "lucide-react";

export default function DeleteChatHistoryModal({ onConfirm, setShowDropdown }: { onConfirm: () => void, setShowDropdown: (show: boolean) => void }) {
  return (
    <AlertDialog >
      <AlertDialogTrigger asChild>
        <button
          className="flex items-center cursor-pointer gap-2 w-full px-3 py-2 text-sm text-left hover:bg-red-600 rounded-md hover:text-white text-red-500"
        >
          <Trash className="w-3 h-3" />
          Delete
        </button>
      </AlertDialogTrigger>
    
      <AlertDialogContent className="bg-[#121212] text-white border border-[#fff]/10">
        <div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
          <div
            className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border"
            aria-hidden="true"
          >
            <Trash2 className="opacity-80" size={16} strokeWidth={2} />
          </div>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this chat?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              This action is <span className="font-bold">permanent</span>. Deleting this chat will remove all messages, members, and data associated with it.
              This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel 
            onClick={() => {
              setShowDropdown(false)
            }}
            className="text-white bg-[#212121] hover:bg-[#212121]/80 hover:text-none border border-[#fff]/10">Cancel</AlertDialogCancel>
          <AlertDialogAction
            asChild
            className="bg-red-600 hover:bg-red-500 text-white"
          >
            <button
              onClick={onConfirm}
              className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete Chat
            </button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
