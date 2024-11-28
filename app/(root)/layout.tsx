import StreamVideoProvider from "@/providers/StreamClientProvider";
import React, { ReactNode } from "react";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <StreamVideoProvider>
        {children} {/* remember to check why we have to do this*/}
      </StreamVideoProvider>
    </main>
  );
};

export default RootLayout;
