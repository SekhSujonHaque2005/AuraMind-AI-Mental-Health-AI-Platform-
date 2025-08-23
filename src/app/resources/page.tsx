import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

const resources = [
  {
    name: "National Suicide Prevention Lifeline",
    description: "Provides 24/7, free and confidential support for people in distress, prevention and crisis resources for you or your loved ones.",
    phone: "988",
    website: "https://988lifeline.org/",
  },
  {
    name: "Crisis Text Line",
    description: "Connect with a volunteer Crisis Counselor for free, 24/7 support via text message.",
    phone: "Text HOME to 741741",
    website: "https://www.crisistextline.org/",
  },
  {
    name: "The Trevor Project",
    description: "The leading national organization providing crisis intervention and suicide prevention services to lesbian, gay, bisexual, transgender, queer & questioning (LGBTQ) young people under 25.",
    phone: "1-866-488-7386",
    website: "https://www.thetrevorproject.org/",
  },
  {
    name: "NAMI (National Alliance on Mental Illness)",
    description: "The nation's largest grassroots mental health organization dedicated to building better lives for the millions of Americans affected by mental illness.",
    phone: "1-800-950-NAMI (6264)",
    website: "https://www.nami.org/",
  },
  {
    name: "SAMHSA National Helpline",
    description: "Confidential free help, from public health agencies, to find substance use treatment and information. 24/7.",
    phone: "1-800-662-HELP (4357)",
    website: "https://www.samhsa.gov/find-help/national-helpline",
  }
];

export default function ResourcesPage() {
  return (
    <div className="container mx-auto max-w-4xl py-8 px-4">
      <h1 className="text-4xl font-bold font-headline mb-4 text-center">Mental Health Resources</h1>
      <p className="text-muted-foreground text-center mb-12">
        If you are in immediate danger, please call 911. For other support, these resources can help.
      </p>
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
        {resources.map((resource) => (
          <Card key={resource.name} className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="font-headline">{resource.name}</span>
                {resource.website && (
                  <a
                    href={resource.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                    aria-label={`Visit ${resource.name} website`}
                  >
                    <ExternalLink className="h-5 w-5" />
                  </a>
                )}
              </CardTitle>
              <CardDescription>{resource.description}</CardDescription>
            </CardHeader>
            <CardContent className="mt-auto">
              <p className="font-semibold text-primary">{resource.phone}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
