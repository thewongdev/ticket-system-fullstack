import { RedirectToast } from "@/components/redirect-toast";

type RootTemplateProps = {
  children: React.ReactNode;
};

export default function Template({ children }: RootTemplateProps) {
  // with template we can share components between pages
  // without having to wrap each page in a layout.
  // Also have advantage of useEffect resynchronizing on route change

  return (
    <>
      <>{children}</>
      <RedirectToast />
    </>
  );
}
