import { useEffect, useState } from "react";

export default function useDebounce(initValue = "", delay = 500) {
   const [value, setValue] = useState(initValue);

   useEffect(() => {
      const timer = setTimeout(() => {
         setValue(initValue);
      }, delay);
      return () => {
         clearTimeout(timer);
      };
   }, [delay, initValue]);
   return value;
}
