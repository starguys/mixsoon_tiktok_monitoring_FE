import React from "react";
import {
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from "recharts";
import { ChartData, TierData } from "../types/tiktok";

interface ChartSectionProps {
  chartData: ChartData[];
  tierData: TierData[];
  isHourly?: boolean;
}

export function ChartSection({
  chartData,
  tierData,
  isHourly,
}: ChartSectionProps) {
  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active?: boolean;
    payload?: Array<{ color: string; name: string; value: number }>;
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      const formatTime = (timeStr: string) => {
        if (isHourly) {
          return new Date(timeStr).toLocaleString("ko-KR", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          });
        }
        return new Date(timeStr).toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
      };

      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium">{label ? formatTime(label) : ""}</p>
          {payload.map((entry, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* 시간별/일별 업로드수 + 평균조회수 차트 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          일별 업로드수 및 평균 조회수
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={(value) => {
                return new Date(value).toLocaleDateString("ko-KR", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar
              yAxisId="left"
              dataKey={"uploads"}
              fill="#3B82F6"
              name="업로드 수"
              radius={[4, 4, 0, 0]}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey={"averageViews"}
              stroke="#EF4444"
              strokeWidth={2}
              name="평균 조회수"
              dot={{ fill: "#EF4444", strokeWidth: 2, r: 4 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* 티어별 차트 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          티어별 평균 업로드 수 및 조회수
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={tierData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="tier" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar
              yAxisId="left"
              dataKey="uploads"
              fill="#10B981"
              name="업로드 수"
              radius={[4, 4, 0, 0]}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="averageViews"
              stroke="#F59E0B"
              strokeWidth={2}
              name="평균 조회수"
              dot={{ fill: "#F59E0B", strokeWidth: 2, r: 4 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
