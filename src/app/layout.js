import "./globals.css";

export const metadata = {
  title: "MediBook",
  description: "Book doctor appointments easily",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
