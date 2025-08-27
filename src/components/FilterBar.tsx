import React from "react";
import * as Select from "@radix-ui/react-select";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { TimeFilter, LanguageFilter, TierFilter } from "../types/tiktok";

interface FilterBarProps {
  timeFilter: TimeFilter;
  languageFilter: LanguageFilter;
  tierFilter: TierFilter;
  onTimeFilterChange: (filter: TimeFilter) => void;
  onLanguageFilterChange: (filter: LanguageFilter) => void;
  onTierFilterChange: (filter: TierFilter) => void;
}

export function FilterBar({
  timeFilter,
  languageFilter,
  tierFilter,
  onTimeFilterChange,
  onLanguageFilterChange,
  onTierFilterChange,
}: FilterBarProps) {
  const timeOptions = [
    { value: "ALL", label: "전체" },
    { value: "1", label: "1일" },
    { value: "7", label: "7일" },
    { value: "30", label: "30일" },
    { value: "365", label: "365일" },
    { value: "72", label: "72시간" },
    { value: "48", label: "48시간" },
    { value: "24", label: "24시간" },
  ];

  const languageOptions = [
    { value: "ALL", label: "전체" },
    { value: "en", label: "영어" },
    { value: "es", label: "스페인어" },
    { value: "ko", label: "한국어" },
  ];

  const tierOptions = [
    { value: "ALL", label: "전체" },
    { value: "NANO", label: "나노" },
    { value: "MICRO", label: "마이크로" },
    { value: "MID", label: "미드" },
    { value: "MEGA", label: "메가" },
  ];

  return (
    <div className="flex gap-4">
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700">기간:</label>
        <Select.Root
          value={timeFilter}
          onValueChange={(value) => onTimeFilterChange(value as TimeFilter)}
        >
          <Select.Trigger className="inline-flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium bg-white border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-gray-900">
            <Select.Value />
            <Select.Icon>
              <ChevronDownIcon className="h-4 w-4 opacity-50" />
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content className="overflow-hidden bg-white rounded-md shadow-lg border border-gray-200 z-[9999]">
              <Select.Viewport className="p-1">
                {timeOptions.map((option) => (
                  <Select.Item
                    key={option.value}
                    value={option.value}
                    className="relative flex items-center px-8 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-900 cursor-pointer rounded"
                  >
                    <Select.ItemText>{option.label}</Select.ItemText>
                  </Select.Item>
                ))}
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700">언어:</label>
        <Select.Root
          value={languageFilter}
          onValueChange={(value) =>
            onLanguageFilterChange(value as LanguageFilter)
          }
        >
          <Select.Trigger className="inline-flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium bg-white border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-gray-900">
            <Select.Value />
            <Select.Icon>
              <ChevronDownIcon className="h-4 w-4 opacity-50" />
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content className="overflow-hidden bg-white rounded-md shadow-lg border border-gray-200 z-[9999]">
              <Select.Viewport className="p-1">
                {languageOptions.map((option) => (
                  <Select.Item
                    key={option.value}
                    value={option.value}
                    className="relative flex items-center px-8 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-900 cursor-pointer rounded"
                  >
                    <Select.ItemText>{option.label}</Select.ItemText>
                  </Select.Item>
                ))}
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700">티어:</label>
        <Select.Root
          value={tierFilter}
          onValueChange={(value) => onTierFilterChange(value as TierFilter)}
        >
          <Select.Trigger className="inline-flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium bg-white border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-gray-900">
            <Select.Value />
            <Select.Icon>
              <ChevronDownIcon className="h-4 w-4 opacity-50" />
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content className="overflow-hidden bg-white rounded-md shadow-lg border border-gray-200 z-[9999]">
              <Select.Viewport className="p-1">
                {tierOptions.map((option) => (
                  <Select.Item
                    key={option.value}
                    value={option.value}
                    className="relative flex items-center px-8 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-900 cursor-pointer rounded"
                  >
                    <Select.ItemText>{option.label}</Select.ItemText>
                  </Select.Item>
                ))}
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>
    </div>
  );
}
