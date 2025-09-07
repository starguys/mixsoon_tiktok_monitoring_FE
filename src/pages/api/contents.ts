import type { NextApiRequest, NextApiResponse } from "next";
import { ExplodedContentResponse } from "../../types/tiktok";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ExplodedContentResponse | { error: string }>
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { page = "0", size = "9", days, hours, tier, language } = req.query;

    // 쿼리 파라미터 구성
    const searchParams = new URLSearchParams();
    searchParams.append("page", page as string);
    searchParams.append("size", size as string);

    if (days) searchParams.append("days", days as string);
    if (hours) searchParams.append("hours", hours as string);
    if (tier) searchParams.append("tier", tier as string);
    if (language) searchParams.append("language", language as string);

    const url = `https://www.mixsoon-tiktok-monitoring.site/api/contents?${searchParams.toString()}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API 호출 실패: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("API 에러:", error);
    res.status(500).json({ error: "서버 에러가 발생했습니다." });
  }
}
