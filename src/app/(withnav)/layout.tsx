import Navigation from "~/components/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-foreground">
      <Navigation></Navigation>
      {children}
      </body>
    </html>
  );
}
