import Navigation from "~/components/navigation";
interface CampaignLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: CampaignLayoutProps) {
  return (
    <div className="bg-foreground">
      <Navigation />
      {children}
    </div>
  );
}
