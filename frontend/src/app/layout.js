import "./globals.css";

export const metadata = {
  title: "Family tree",
  description: "Sunburst Family tree",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
