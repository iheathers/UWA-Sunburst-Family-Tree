import "./globals.css";

export const metadata = {
  title: "UWA Sunburst Chart",
  description:
    "An interactive platform to view and manage your family relationships.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
