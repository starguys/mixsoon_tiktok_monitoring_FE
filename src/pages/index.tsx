import React, { useState, useEffect } from "react";
import { Upload, Gift, DollarSign, Eye, Zap } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { KPICard } from "../components/KPICard";
import { FilterBar } from "../components/FilterBar";
import { ChartSection } from "../components/ChartSection";
import { ExplodedContentCard } from "../components/ExplodedContentCard";
import { SkeletonCard } from "../components/SkeletonCard";
import { Pagination } from "../components/Pagination";
import {
  fetchDailyMetrics,
  fetchHourlyData,
  fetchDailyChartData,
  fetchDailyTierData,
  fetchHourlyTierData,
  fetchExplodedContents,
} from "../api/metrics";
import { mockTierData } from "../data/mockData";
import {
  TimeFilter,
  LanguageFilter,
  TierFilter,
  HourlyData,
} from "../types/tiktok";

export default function Dashboard() {
  const router = useRouter();

  // URL 쿼리스트링에서 초기값 가져오기
  const [timeFilter, setTimeFilter] = useState<TimeFilter>(
    (router.query.time as TimeFilter) || "ALL"
  );
  const [languageFilter, setLanguageFilter] = useState<LanguageFilter>(
    (router.query.language as LanguageFilter) || "ALL"
  );
  const [tierFilter, setTierFilter] = useState<TierFilter>(
    (router.query.tier as TierFilter) || "ALL"
  );
  const [currentPage, setCurrentPage] = useState(
    parseInt(router.query.page as string) || 0
  );

  // URL 업데이트 함수
  const updateURL = (updates: Record<string, string | number>) => {
    const newQuery = { ...router.query, ...updates };

    // "ALL" 값인 경우 쿼리에서 제거
    Object.keys(newQuery).forEach((key) => {
      if (newQuery[key] === "ALL") {
        delete newQuery[key];
      }
    });

    // 페이지가 0인 경우 쿼리에서 제거
    if (newQuery.page === 0) {
      delete newQuery.page;
    }

    router.push(
      {
        pathname: router.pathname,
        query: newQuery,
      },
      undefined,
      { shallow: true }
    );
  };

  // 필터 변경 핸들러들
  const handleTimeFilterChange = (filter: TimeFilter) => {
    setTimeFilter(filter);
    updateURL({ time: filter, page: 0 }); // 기간 변경 시 페이지 초기화
  };

  const handleLanguageFilterChange = (filter: LanguageFilter) => {
    setLanguageFilter(filter);
    updateURL({ language: filter, page: 0 }); // 언어 변경 시 페이지 초기화
  };

  const handleTierFilterChange = (filter: TierFilter) => {
    setTierFilter(filter);
    updateURL({ tier: filter, page: 0 }); // 티어 변경 시 페이지 초기화
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    updateURL({ page });
  };

  // URL 변경 시 상태 동기화
  useEffect(() => {
    if (router.isReady) {
      const newTimeFilter = (router.query.time as TimeFilter) || "ALL";
      const newLanguageFilter =
        (router.query.language as LanguageFilter) || "ALL";
      const newTierFilter = (router.query.tier as TierFilter) || "ALL";
      const newPage = parseInt(router.query.page as string) || 0;

      if (newTimeFilter !== timeFilter) setTimeFilter(newTimeFilter);
      if (newLanguageFilter !== languageFilter)
        setLanguageFilter(newLanguageFilter);
      if (newTierFilter !== tierFilter) setTierFilter(newTierFilter);
      if (newPage !== currentPage) setCurrentPage(newPage);
    }
  }, [router.isReady, router.query]);

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

  // 일별 티어 데이터 가져오기
  const { data: dailyTierData, isLoading: dailyTierLoading } = useQuery({
    queryKey: ["dailyTierData", timeFilter, languageFilter],
    queryFn: () => {
      return fetchDailyTierData({
        days: timeFilter === "ALL" ? undefined : timeFilter,
        language: languageFilter === "ALL" ? undefined : languageFilter,
      });
    },
    enabled: !isHourly,
  });

  // 시간별 티어 데이터 가져오기
  const { data: hourlyTierData, isLoading: hourlyTierLoading } = useQuery({
    queryKey: ["hourlyTierData", timeFilter, languageFilter],
    queryFn: () => {
      return fetchHourlyTierData({
        hours: timeFilter === "ALL" ? undefined : timeFilter,
        language: languageFilter === "ALL" ? undefined : languageFilter,
      });
    },
    enabled: isHourly,
  });

  // 터진 콘텐츠 데이터 가져오기
  const { data: explodedContentsData, isLoading: explodedContentsLoading } =
    useQuery({
      queryKey: ["explodedContents", currentPage],
      queryFn: () => fetchExplodedContents(currentPage, 9),
    });

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

      {/* 필터 바 - Sticky */}
      <div className="sticky top-0 z-50 bg-gray-50 border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <FilterBar
            timeFilter={timeFilter}
            languageFilter={languageFilter}
            tierFilter={tierFilter}
            onTimeFilterChange={handleTimeFilterChange}
            onLanguageFilterChange={handleLanguageFilterChange}
            onTierFilterChange={handleTierFilterChange}
          />
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
              tierData={
                isHourly
                  ? (hourlyTierData || []).map(
                      (item: {
                        tier: string;
                        uploads: number;
                        viewsAvg: number;
                      }) => ({
                        tier: item.tier,
                        uploads: item.uploads,
                        averageViews: item.viewsAvg,
                      })
                    )
                  : (dailyTierData || []).map(
                      (item: {
                        tier: string;
                        uploads: number;
                        viewsAvg: number;
                      }) => ({
                        tier: item.tier,
                        uploads: item.uploads,
                        averageViews: item.viewsAvg,
                      })
                    )
              }
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
                총 {explodedContentsData?.totalElements || 0}개의 터진 콘텐츠
              </p>
            </div>

            {explodedContentsLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 9 }).map((_, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 rounded-lg h-64 animate-pulse"
                  />
                ))}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {explodedContentsData?.content.map((content) => (
                    <ExplodedContentCard
                      key={content.contentId}
                      content={content}
                    />
                  ))}
                </div>

                {explodedContentsData && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={explodedContentsData.totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
