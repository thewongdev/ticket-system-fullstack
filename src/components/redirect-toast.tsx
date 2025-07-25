"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { deleteCookieByKey, getCookieByKey } from "@/actions/cookies";

const RedirectToast = () => {
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
  }, []);

  // return null because we don't want to render anything here
  return null;
};

export { RedirectToast };
