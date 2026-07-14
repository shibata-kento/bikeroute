import Link from "next/link";

/**
 * クリックできるタグ。押すと記事一覧をそのタグで絞り込む（/articles?tag=X）。
 * 新しいインデックス対象ページを作らず、既存の一覧をフィルタする方式。
 */
export function TagPills({ tags, active }: { tags: string[]; active?: string }) {
  return (
    <div className="flex flex-wrap gap-1">
      {tags.map((tag) => (
        <Link
          key={tag}
          href={`/articles?tag=${encodeURIComponent(tag)}`}
          className={`rounded-full px-2 py-0.5 text-xs font-medium transition-colors ${
            tag === active
              ? "bg-orange-500 text-white"
              : "bg-orange-100 text-orange-700 hover:bg-orange-200"
          }`}
        >
          {tag}
        </Link>
      ))}
    </div>
  );
}
