"use client"
import React, { useState } from "react";
import { Button } from "./button";

interface DialogProps {
  title: string;
  children: React.ReactNode;
  triggerText?: string;
}

export const Dialog: React.FC<DialogProps> = ({ title, children, triggerText = "Open" }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>{triggerText}</Button>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded p-6 w-96 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">{title}</h2>
            <div>{children}</div>
            <div className="mt-4 flex justify-end">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
