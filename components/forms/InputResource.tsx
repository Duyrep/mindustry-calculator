"use client";

import pluralize from "pluralize";
import { Menu, Plus, Trash, Trash2 } from "lucide-react";
import { useState } from "react";

import {
  Button,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
  DialogFooter,
  Input,
  SpriteImage,
} from "@/components/ui";

import { getAllGroupsOfItems, getAllItems, getItemById } from "@/game";
import { useProduction } from "@/context";
import { twMerge } from "tailwind-merge";

export default function InputResource() {
  const { targets, addTarget, removeAllTargets } = useProduction();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <div className="p-2 bg-surface-a10 rounded-md">
      <div className="flex flex-col gap-1">
        {targets.map((target) => (
          <Item {...target} key={target.id} />
        ))}

        <div className="flex gap-2">
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button className="w-full flex justify-center">
                <Plus size={28} strokeWidth={3} />
              </Button>
            </DialogTrigger>
            <SelectItemDialogContent
              onSelect={(itemId) => {
                addTarget(itemId);
                setShowAddDialog(false);
              }}
            />
          </Dialog>

          <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
            <DialogTrigger asChild>
              <Button className="aspect-square flex flex-wrap content-center justify-center">
                <Trash />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Warning</DialogTitle>
              <div className="p-4">
                Are you sure you want to delete everything?
              </div>
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
        </div>
      </div>
    </div>
  );
}

function Item({ id }: { id: string }) {
  const { removeTarget } = useProduction();

  return (
    <div className="flex flex-wrap content-center justify-between gap-1 bg-surface-a20 rounded-md">
      <div className="flex gap-2">
        <div className="p-2 flex flex-wrap justify-center content-center hover:cursor-grab active:cursor-grabbing border-r border-surface-a50">
          <Menu size={32} className="w-8 h-8" />
        </div>
        <SelectItem id={id} />
        <Input />
      </div>
      <div className="p-1 flex flex-wrap justify-center content-center">
        <Button className="p-1" onClick={() => removeTarget(id)}>
          <Trash2 className="w-8 h-8" />
        </Button>
      </div>
    </div>
  );
}

function SelectItem({ id }: { id: string }) {
  const { changeTarget, getTarget } = useProduction();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const item = getItemById(getTarget(id)?.itemId ?? "");

  return (
    <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
      <DialogTrigger asChild>
        <div
          className={twMerge(
            "m-1 p-1 border border-surface-a50 rounded-md flex flex-wrap content-center justify-center duration-200 outline-primary aspect-square",
            "hover:outline-1 hover:border hover:border-primary hover:cursor-pointer",
          )}
        >
          <SpriteImage
            row={item?.image.row ?? 0}
            col={item?.image.col ?? 0}
            title={item?.name}
          />
        </div>
      </DialogTrigger>

      <SelectItemDialogContent
        itemId={item?.id}
        onSelect={(itemId) => {
          changeTarget(id, itemId);
          setShowAddDialog(false);
        }}
      />
    </Dialog>
  );
}

function SelectItemDialogContent({
  itemId,
  onSelect,
}: {
  itemId?: string;
  onSelect: (itemId: string) => void;
}) {
  const [showGroup, setShowGroup] = useState<string>("all");

  return (
    <DialogContent className="w-96">
      <DialogTitle asChild>
        <Input placeholder="Search" className="w-full h-10 font-black" />
      </DialogTitle>

      {/* group */}
      <div className="flex gap-1 y-1 overflow-x-auto w-full">
        {["all", ...getAllGroupsOfItems()].map((group) => (
          <Button
            key={group}
            className={`p-1 bg-surface-a20 rounded-md font-bold min-w-16 ${showGroup === group && "bg-primary"}`}
            onClick={() => setShowGroup(group)}
          >
            {pluralize(
              group.charAt(0).toUpperCase() + group.slice(1),
              group === "all" ? 1 : 0,
            )}
          </Button>
        ))}
      </div>

      <hr className="my-2 border-surface-a30" />

      <div className="overflow-auto">
        {/* items */}
        <div className="flex flex-wrap justify-center duration-200">
          {getAllItems().map(({ id, image, group }) => (
            <Button
              key={id}
              className={`
                rounded-md duration-200 Button
                hover:cursor-pointer active:bg-surface-a30/25
                ${group !== showGroup && showGroup !== "all" ? "p-0 max-w-0 max-h-0 delay-200 m-0" : "p-1 max-w-40 max-h-40 m-0.5"}
                ${itemId === id ? "bg-primary" : "bg-surface-a20 hover:bg-surface-a30"}
              `}
              onClick={() => onSelect(id)}
            >
              <div
                className={`duration-200 ${group !== showGroup && showGroup !== "all" ? "scale-0" : "scale-[100%] delay-200"}`}
              >
                <SpriteImage row={image.row} col={image.col} />
              </div>
            </Button>
          ))}
        </div>
      </div>

      <DialogClose />
    </DialogContent>
  );
}
