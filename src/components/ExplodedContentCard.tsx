import React from "react";
import { TikTokContent } from "../types/tiktok";
import { Eye, Heart, MessageCircle, Bookmark } from "lucide-react";

interface ExplodedContentCardProps {
  content: TikTokContent;
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

  const getSponsorshipLabel = (type: string) => {
    switch (type) {
      case "organic":
        return "오가닉";
      case "pr_free":
        return "무료 협찬";
      case "pr_paid":
        return "유료 협찬";
      default:
        return type;
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "나노":
        return "bg-gray-100 text-gray-800";
      case "마이크로":
        return "bg-blue-100 text-blue-800";
      case "미드":
        return "bg-purple-100 text-purple-800";
      case "메가":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getSponsorshipColor = (type: string) => {
    switch (type) {
      case "organic":
        return "bg-green-100 text-green-800";
      case "pr_free":
        return "bg-yellow-100 text-yellow-800";
      case "pr_paid":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* 썸네일 */}
      <div className="relative">
        <img
          src={content.thumbnail || "https://picsum.photos/300/400"}
          alt={content.description || "TikTok content"}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
          {content.exploded_bucket}
        </div>
      </div>

      {/* 콘텐츠 정보 */}
      <div className="p-4">
        {/* 설명 */}
        <p className="text-sm font-medium text-gray-900 mb-2 line-clamp-2">
          {content.description || "설명 없음"}
        </p>

        {/* 조회수 */}
        <div className="flex items-center gap-1 mb-3">
          <Eye className="w-4 h-4 text-gray-500" />
          <span className="text-lg font-bold text-gray-900">
            {formatNumber(content.views)}
          </span>
        </div>

        {/* 상호작용 지표 */}
        <div className="flex items-center gap-4 mb-3 text-xs text-gray-600">
          <div className="flex items-center gap-1">
            <Heart className="w-3 h-3" />
            <span>{formatNumber(content.likes)}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle className="w-3 h-3" />
            <span>{formatNumber(content.comments)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bookmark className="w-3 h-3" />
            <span>{formatNumber(content.saves)}</span>
          </div>
        </div>

        {/* 태그들 */}
        <div className="flex flex-wrap gap-2">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getTierColor(
              content.tier
            )}`}
          >
            {content.tier}
          </span>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getSponsorshipColor(
              content.sponsorship_type
            )}`}
          >
            {getSponsorshipLabel(content.sponsorship_type)}
          </span>
        </div>

        {/* 인플루언서 정보 */}
        <div className="mt-3 pt-3 border-t border-gray-100">
          <p className="text-sm text-gray-600">
            <span className="font-medium">{content.influencer_handle}</span>
            <span className="ml-2 text-xs">
              ({formatNumber(content.followers)} 팔로워)
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
