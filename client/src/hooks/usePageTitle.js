import { useEffect } from "react";

function usePageTitle(title) {
  useEffect(() => {
    document.title = `${title} | I ❤ Clouds`;
  }, [title]);
}

export default usePageTitle;