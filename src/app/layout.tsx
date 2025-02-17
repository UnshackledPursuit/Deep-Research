import "./globals.css";
import { AuthProvider } from "@/lib/contexts/AuthContext";
import { UserMenu } from "./components/UserMenu";
import { AuthGuard } from "./components/AuthGuard";
import { headers } from "next/headers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {/* Only protect routes that are not the auth page */}
          {children?.toString().includes("AuthPage") ? (
            <div className="min-h-screen">
              {children}
            </div>
          ) : (
            <div className="min-h-screen">
              <div className="fixed top-4 right-4 z-50">
                <UserMenu />
              </div>
              <AuthGuard>{children}</AuthGuard>
            </div>
          )}
        </AuthProvider>
      </body>
    </html>
  );
}
