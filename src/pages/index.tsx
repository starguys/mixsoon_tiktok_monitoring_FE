import React, { useState } from "react";
import { Upload, Gift, DollarSign, Eye, Zap } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { KPICard } from "../components/KPICard";
import { FilterBar } from "../components/FilterBar";
import { ChartSection } from "../components/ChartSection";
import { ExplodedContentCard } from "../components/ExplodedContentCard";
import { SkeletonCard } from "../components/SkeletonCard";
import {
  fetchDailyMetrics,
  fetchHourlyData,
  fetchDailyChartData,
} from "../api/metrics";
import { mockTierData, mockTikTokContents } from "../data/mockData";
import {
  TimeFilter,
  LanguageFilter,
  TierFilter,
  HourlyData,
} from "../types/tiktok";

export default function Dashboard() {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("ALL");
  const [languageFilter, setLanguageFilter] = useState<LanguageFilter>("ALL");
  const [tierFilter, setTierFilter] = useState<TierFilter>("ALL");

  // 시간 단위 여부 확인
  const isHourly = ["72", "48", "24"].includes(timeFilter);

  // API 데이터 가져오기
  const {
    data: metricsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["dailyMetrics", timeFilter, languageFilter, tierFilter],
    queryFn: () => {
      return fetchDailyMetrics({
        days:
          timeFilter === "ALL" ? undefined : isHourly ? undefined : timeFilter,
        hours:
          timeFilter === "ALL" ? undefined : isHourly ? timeFilter : undefined,
        language: languageFilter === "ALL" ? undefined : languageFilter,
        tier: tierFilter === "ALL" ? undefined : tierFilter,
      });
    },
    enabled: true, // 항상 호출
  });

  // 시간별 차트 데이터 가져오기
  const { data: hourlyChartData, isLoading: hourlyChartLoading } = useQuery({
    queryKey: ["hourlyChartData", timeFilter, languageFilter, tierFilter],
    queryFn: () => {
      return fetchHourlyData({
        hours: timeFilter === "ALL" ? undefined : timeFilter,
        language: languageFilter === "ALL" ? undefined : languageFilter,
        tier: tierFilter === "ALL" ? undefined : tierFilter,
      });
    },
    enabled: isHourly,
  });

  // 일별 차트 데이터 가져오기
  const { data: dailyChartData, isLoading: dailyChartLoading } = useQuery({
    queryKey: ["dailyChartData", timeFilter, languageFilter, tierFilter],
    queryFn: () => {
      return fetchDailyChartData({
        days: timeFilter === "ALL" ? undefined : timeFilter,
        language: languageFilter === "ALL" ? undefined : languageFilter,
        tier: tierFilter === "ALL" ? undefined : tierFilter,
      });
    },
    enabled: !isHourly,
  });

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

  // 에러 상태 처리
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-2">데이터를 불러오는데 실패했습니다.</p>
          <p className="text-gray-600 text-sm">{error.message}</p>
        </div>
      </div>
    );
  }

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
          </div>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 필터 바 */}
        <FilterBar
          timeFilter={timeFilter}
          languageFilter={languageFilter}
          tierFilter={tierFilter}
          onTimeFilterChange={setTimeFilter}
          onLanguageFilterChange={setLanguageFilter}
          onTierFilterChange={setTierFilter}
        />

        {/* KPI 카드 섹션 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-3"></div>
          {isLoading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : (
            <>
              <KPICard
                title="업로드 갯수"
                value={metricsData?.uploads || 0}
                icon={Upload}
                trend={{ value: 12, isPositive: true }}
                description="선택된 기간 동안의 총 업로드 수"
              />
              <KPICard
                title="무료 협찬수"
                value={metricsData?.prFree || 0}
                icon={Gift}
                trend={{ value: 8, isPositive: true }}
                description="무료 제품 제공 협찬 콘텐츠"
              />
              <KPICard
                title="유료 협찬수"
                value={metricsData?.prPaid || 0}
                icon={DollarSign}
                trend={{ value: 15, isPositive: true }}
                description="유료 협찬 콘텐츠"
              />
              <KPICard
                title="평균 조회수"
                value={metricsData?.viewsAvg?.toLocaleString() || "0"}
                icon={Eye}
                trend={{ value: 5, isPositive: true }}
                description="전체 콘텐츠의 평균 조회수"
              />
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      터진 콘텐츠
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {(metricsData?.gte10k || 0) +
                        (metricsData?.gte100k || 0) +
                        (metricsData?.gte1m || 0)}
                    </p>
                  </div>
                  <div className="bg-orange-50 p-3 rounded-lg">
                    <Zap className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
                <div className="flex gap-6">
                  <div>
                    <p className="text-lg font-bold text-gray-900">
                      {metricsData?.gte10k || 0}
                    </p>
                    <p className="text-xs text-gray-600">10K+</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">
                      {metricsData?.gte100k || 0}
                    </p>
                    <p className="text-xs text-gray-600">100K+</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">
                      {metricsData?.gte1m || 0}
                    </p>
                    <p className="text-xs text-gray-600">1M+</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* 차트 섹션 */}
        {!isLoading && (
          <div className="mb-8">
            <ChartSection
              chartData={
                isHourly
                  ? []
                  : (dailyChartData || []).map(
                      (item: {
                        day: string;
                        dailyUploads: number;
                        dailyViewsAvg: number;
                      }) => ({
                        date: item.day,
                        uploads: item.dailyUploads,
                        averageViews: item.dailyViewsAvg,
                      })
                    )
              }
              tierData={mockTierData}
              hourlyData={hourlyChartData?.sort(
                (a, b) =>
                  new Date(a.hour).getTime() - new Date(b.hour).getTime()
              )}
              isHourly={isHourly}
            />
          </div>
        )}

        {/* 터진 콘텐츠 섹션 */}
        {!isLoading && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                터진 콘텐츠
              </h3>
              <p className="text-sm text-gray-600">
                총 {explodedContents.length}개의 터진 콘텐츠
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {explodedContents.map((content) => (
                <ExplodedContentCard
                  key={content.content_id}
                  content={content}
                />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
