import { Trash } from "lucide-react";
import { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui";
import { useProductionStore } from "@/store";

export function ConfirmClearAllDialog() {
  const removeAllTargets = useProductionStore((state) => state.removeAllTargets)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
      <DialogTrigger asChild>
        <Button className="aspect-square flex flex-wrap content-center justify-center">
          <Trash />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Warning</DialogTitle>
        <div className="p-4">Are you sure you want to delete everything?</div>
        <DialogFooter>
          <div className="flex gap-2">
            <Button
              className="min-w-16"
              onClick={() => setShowDeleteDialog(false)}
            >
              No
            </Button>
            <Button
              className="min-w-16"
              onClick={() => {
                removeAllTargets();
                setShowDeleteDialog(false);
              }}
            >
              Yes
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
