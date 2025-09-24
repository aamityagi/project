"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Button } from "./ui/button";
import contentData from "../data/comingSoonContent.json"; // import JSON

interface ComingSoonProps {
  pageKey: keyof typeof contentData;
  actionLabel?: string;
  onActionClick?: () => void;
}

const ComingSoon: React.FC<ComingSoonProps> = ({ pageKey, actionLabel = "Go Back", onActionClick }) => {
  const content = contentData[pageKey];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <Card className="w-full max-w-md shadow-lg border border-gray-200">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-extrabold text-gray-900 animate-pulse">
            🚧 {content.title}
          </CardTitle>
          <CardDescription className="text-gray-600 mt-2">
            {content.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center mt-4">
          <Button variant="outline" onClick={onActionClick}>
            {actionLabel}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComingSoon;
