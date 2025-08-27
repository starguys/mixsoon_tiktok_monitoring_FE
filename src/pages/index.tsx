import React, { useState } from "react";
import { Upload, Gift, DollarSign, Eye, TrendingUp, Zap } from "lucide-react";
import { KPICard } from "../components/KPICard";
import { FilterBar } from "../components/FilterBar";
import { ChartSection } from "../components/ChartSection";
import { ExplodedContentCard } from "../components/ExplodedContentCard";
import {
  mockKPIData,
  mockChartData,
  mockTierData,
  mockTikTokContents,
} from "../data/mockData";
import { TimeFilter, LanguageFilter } from "../types/tiktok";

export default function Dashboard() {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("all");
  const [languageFilter, setLanguageFilter] = useState<LanguageFilter>("all");

  // 터진 콘텐츠만 필터링 (exploded_bucket이 있는 것들)
  const explodedContents = mockTikTokContents.filter(
    (content) => content.exploded_bucket
  );

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                TikTok 모니터링 대시보드
              </h1>
              <p className="text-sm text-gray-600">
                시딩한 컨텐츠들의 퍼포먼스 모니터링 & 트래킹
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">마지막 업데이트</p>
              <p className="text-sm font-medium text-gray-900">
                {new Date().toLocaleString("ko-KR")}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 필터 바 */}
        <FilterBar
          timeFilter={timeFilter}
          languageFilter={languageFilter}
          onTimeFilterChange={setTimeFilter}
          onLanguageFilterChange={setLanguageFilter}
        />

        {/* KPI 카드 섹션 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <KPICard
            title="업로드 갯수"
            value={mockKPIData.totalUploads}
            icon={Upload}
            trend={{ value: 12, isPositive: true }}
            description="선택된 기간 동안의 총 업로드 수"
          />
          <KPICard
            title="무료 협찬수"
            value={mockKPIData.freeSponsorships}
            icon={Gift}
            trend={{ value: 8, isPositive: true }}
            description="무료 제품 제공 협찬 콘텐츠"
          />
          <KPICard
            title="유료 협찬수"
            value={mockKPIData.paidSponsorships}
            icon={DollarSign}
            trend={{ value: 15, isPositive: true }}
            description="유료 협찬 콘텐츠"
          />
          <KPICard
            title="평균 조회수"
            value={formatNumber(mockKPIData.averageViews)}
            icon={Eye}
            trend={{ value: 5, isPositive: true }}
            description="전체 콘텐츠의 평균 조회수"
          />
          <KPICard
            title="터진 콘텐츠수"
            value={mockKPIData.explodedContent}
            icon={Zap}
            trend={{ value: 25, isPositive: true }}
            description="10K, 100K, 1M 이상 조회수 콘텐츠"
          />
          <KPICard
            title="성장률"
            value="+18.5%"
            icon={TrendingUp}
            trend={{ value: 18.5, isPositive: true }}
            description="전월 대비 성장률"
          />
        </div>

        {/* 차트 섹션 */}
        <div className="mb-8">
          <ChartSection chartData={mockChartData} tierData={mockTierData} />
        </div>

        {/* 터진 콘텐츠 섹션 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">터진 콘텐츠</h3>
            <p className="text-sm text-gray-600">
              총 {explodedContents.length}개의 터진 콘텐츠
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {explodedContents.map((content) => (
              <ExplodedContentCard key={content.content_id} content={content} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
