import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, DollarSign, AlertTriangle } from "lucide-react";
import Image from "next/image";

export default function PaymentsPage() {
  return (
    <div className="container mx-auto">
      <PageHeader
        title="Payments & Monetization"
        description="Manage your earnings and integrate with Sonatel Orange Money for seamless payments."
        icon={CreditCard}
      />

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Image src="https://picsum.photos/seed/sonatel/40/40" alt="Sonatel Orange Money" width={40} height={40} className="rounded-full" data-ai-hint="Sonatel logo"/>
              Sonatel Orange Money Integration
            </CardTitle>
            <CardDescription>
              Allow viewers to pay for access to your exclusive live streams using Sonatel Orange Money.
              Set your prices and manage payouts directly.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center p-4 rounded-md bg-primary/10 text-primary border border-primary/20">
              <AlertTriangle className="h-6 w-6 mr-3 shrink-0" />
              <p className="text-sm">
                <strong>Developer Note:</strong> Full Sonatel Orange Money API integration is a complex feature.
                This section is a placeholder. In a production environment, this would involve secure API calls,
                transaction handling, and user authentication with Sonatel services.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Stream Pricing</h3>
              <p className="text-muted-foreground mb-2">
                Define access fees for your premium live content. Offer various pricing tiers or pay-per-view options.
              </p>
              <Button disabled>Configure Pricing (Coming Soon)</Button>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Payouts</h3>
              <p className="text-muted-foreground mb-2">
                View your earnings and manage your payout settings. Funds are transferred securely via Orange Money.
              </p>
              <Button disabled>View Earnings (Coming Soon)</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-6 w-6 text-primary" />
              Earnings Overview
            </CardTitle>
            <CardDescription>
              Track your revenue from paid live streams.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-4xl font-bold text-primary">0 CFA</p>
            <p className="text-muted-foreground mt-1">Total Earnings (Last 30 Days)</p>
            <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-semibold">0</p>
                <p className="text-muted-foreground">Paid Streams</p>
              </div>
              <div>
                <p className="font-semibold">0</p>
                <p className="text-muted-foreground">Subscribers</p>
              </div>
            </div>
            <Button variant="outline" className="mt-6" disabled>
              View Detailed Report (Coming Soon)
            </Button>
          </CardContent>
        </Card>
      </div>

       <Card className="mt-8 shadow-md bg-secondary/10">
        <CardHeader>
          <CardTitle>Why Monetize with EnDirectAuSénégal?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-secondary-foreground/80">
          <p><strong>Local Payment Solution:</strong> Seamless integration with Sonatel Orange Money, widely used in Senegal.</p>
          <p><strong>Direct Earnings:</strong> Keep a significant portion of your revenue.</p>
          <p><strong>Easy Setup:</strong> Quickly configure pricing for your exclusive content.</p>
          <p><strong>Secure Transactions:</strong> All payments are processed securely.</p>
        </CardContent>
      </Card>
    </div>
  );
}
