import React from "react";
import { ExplodedContent } from "../types/tiktok";
import { Eye, Heart, ExternalLink } from "lucide-react";

interface ExplodedContentCardProps {
  content: ExplodedContent;
}

export function ExplodedContentCard({ content }: ExplodedContentCardProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <a
      href={content.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer"
    >
      <div className="aspect-video bg-gray-100 relative">
        {content.thumbnailUrl ? (
          <img
            src={content.thumbnailUrl}
            alt={content.caption}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <span>썸네일 없음</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <p className="text-sm text-gray-900 line-clamp-2 mb-3">
          {content.caption}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Eye className="w-4 h-4 mr-1" />
              <span>{formatNumber(content.views)}</span>
            </div>
            <div className="flex items-center">
              <Heart className="w-4 h-4 mr-1" />
              <span>{formatNumber(content.likes)}</span>
            </div>
          </div>
          <span className="text-xs text-gray-500">
            {formatDate(content.createdAt)}
          </span>
        </div>
      </div>
    </a>
  );
}
