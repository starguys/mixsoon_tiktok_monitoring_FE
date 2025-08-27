import React from "react";
import * as Select from "@radix-ui/react-select";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { TimeFilter, LanguageFilter } from "../types/tiktok";

interface FilterBarProps {
  timeFilter: TimeFilter;
  languageFilter: LanguageFilter;
  onTimeFilterChange: (filter: TimeFilter) => void;
  onLanguageFilterChange: (filter: LanguageFilter) => void;
}

export function FilterBar({
  timeFilter,
  languageFilter,
  onTimeFilterChange,
  onLanguageFilterChange,
}: FilterBarProps) {
  const timeOptions = [
    { value: "all", label: "전체" },
    { value: "today", label: "오늘 (24시간)" },
    { value: "week", label: "최근 7일" },
    { value: "month", label: "최근 30일" },
  ];

  const languageOptions = [
    { value: "all", label: "전체" },
    { value: "ko", label: "한국어" },
    { value: "en", label: "영어" },
    { value: "es", label: "스페인어" },
  ];

  return (
    <div className="flex gap-4 mb-6">
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700">기간:</label>
        <Select.Root
          value={timeFilter}
          onValueChange={(value) => onTimeFilterChange(value as TimeFilter)}
        >
          <Select.Trigger className="inline-flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium bg-white border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            <Select.Value />
            <Select.Icon>
              <ChevronDownIcon className="h-4 w-4 opacity-50" />
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content className="overflow-hidden bg-white rounded-md shadow-lg border border-gray-200">
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
          <Select.Trigger className="inline-flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium bg-white border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            <Select.Value />
            <Select.Icon>
              <ChevronDownIcon className="h-4 w-4 opacity-50" />
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content className="overflow-hidden bg-white rounded-md shadow-lg border border-gray-200">
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
    </div>
  );
}
