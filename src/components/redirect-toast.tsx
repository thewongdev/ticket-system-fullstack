"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { deleteCookieByKey, getCookieByKey } from "@/actions/cookies";

const RedirectToast = () => {
  // we need to know the current path to determine if we have a new redirect
  // if we don't do this, the toast won't show up as RedirectToast is now placed in layout component
  // Pages re-render on new route, but Layouts do not. Hence we need to use usePathname to get the current path
  // and add it to the dependency array of useEffect
  const pathname = usePathname();

  // we use useEffect here because we want to run this code on the client side
  // we want to show the toast message after the redirect has happened
  // we don't want to run this code on the server side because we don't have access to cookies there
  useEffect(() => {
    const showCookieToast = async () => {
      const message = await getCookieByKey("toast");

      if (message) {
        toast.success(message);
        deleteCookieByKey("toast");
      }
    };

    showCookieToast();
  }, [pathname]);

  // return null because we don't want to render anything here
  return null;
};

export { RedirectToast };
