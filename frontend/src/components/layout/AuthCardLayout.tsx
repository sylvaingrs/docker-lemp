import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';

interface AuthCardLayoutProps {
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export default function AuthCardLayout({ title, children, footer }: AuthCardLayoutProps) {
  return (
    <div className="s-min-h-screen s-flex s-flex-center s-bg-gray s-px-m">
      <Card className="s-w-full s-max-w-md s-shadow-l s-p-m">
        <CardHeader>
          <CardTitle className="s-title-l s-text-center">{title}</CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>
        {footer && (
          <CardFooter className="s-flex s-flex-center s-flex-column s-mt-m">{footer}</CardFooter>
        )}
      </Card>
    </div>
  );
}
