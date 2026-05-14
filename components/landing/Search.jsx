"use client";
import { useCallback } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import useDebounce from "@/app/hooks/useDebounce";

const Search = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const applyQuery = useCallback(
    (term) => {
      const params = new URLSearchParams(searchParams);
      if (term) {
        params.set("query", term);
      } else {
        params.delete("query");
      }

      const qs = params.toString();
      replace(qs ? `${pathname}?${qs}` : pathname);
    },
    [searchParams, pathname, replace]
  );

  const doSearch = useDebounce(applyQuery, 500);

  function handleSearch(term) {
    doSearch(term);
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search an Event"
        className="bg-[#27292F] border border-[#CCCCCC]/20 py-1 px-2 rounded-md"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get("query")?.toString()}
      />
    </div>
  );
};

export default Search;
