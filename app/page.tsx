import { TaplinkPage } from "@/components/taplink/TaplinkPage";
import { getTaplinkPageData } from "@/data/taplink-page-source";

export default async function HomePage() {
  const data = await getTaplinkPageData();

  return <TaplinkPage data={data} />;
}
