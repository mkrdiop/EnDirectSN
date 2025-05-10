import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, LayoutDashboard, Settings, Share2, Sparkles, Languages, CreditCard } from "lucide-react";
import Link from "next/link";

const features = [
  {
    title: "Streaming Setup",
    description: "Configure HD streaming and personalize your broadcast with logos and overlays.",
    icon: Settings,
    href: "/streaming-settings",
    cta: "Configure Stream",
  },
  {
    title: "Multistreaming",
    description: "Reach a wider audience by streaming to multiple platforms simultaneously.",
    icon: Share2,
    href: "/multistreaming",
    cta: "Set Up Destinations",
  },
  {
    title: "AI Highlights",
    description: "Automatically generate engaging highlight reels from your live streams.",
    icon: Sparkles,
    href: "/ai-highlights",
    cta: "Create Highlights",
  },
  {
    title: "AI Translation",
    description: "Provide live translations of your stream in multiple languages.",
    icon: Languages,
    href: "/ai-translation",
    cta: "Translate Content",
  },
  {
    title: "Payments",
    description: "Manage your earnings and integrate with Sonatel for payment processing.",
    icon: CreditCard,
    href: "/payments",
    cta: "View Payments",
  },
];

export default function DashboardPage() {
  return (
    <div className="container mx-auto">
      <PageHeader
        title="Dashboard"
        description="Welcome to EnDirectAuSénégal! Manage your streams and access powerful features."
        icon={LayoutDashboard}
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center gap-4 pb-4">
              <feature.icon className="h-10 w-10 text-primary" />
              <div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription>{feature.description}</CardDescription>
            </CardContent>
            <CardContent>
              <Link href={feature.href} passHref>
                <Button variant="default" className="w-full group">
                  {feature.cta}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-8 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 p-6 shadow-lg">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">Ready to Go Live?</h2>
            <p className="text-muted-foreground mt-1">
              Start your professional live stream today with EnDirectAuSénégal.
            </p>
          </div>
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground group">
            Start New Stream <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
