export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://claude-academy.onewave.ai/#organization",
        "name": "OneWave AI",
        "url": "https://onewave-ai.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://claude-academy.onewave.ai/logo.png",
          "width": 512,
          "height": 512
        },
        "sameAs": [
          "https://twitter.com/onewave_ai",
          "https://linkedin.com/company/onewave-ai"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://claude-academy.onewave.ai/#website",
        "url": "https://claude-academy.onewave.ai",
        "name": "OneWave Claude Academy",
        "description": "Master the complete Anthropic Claude ecosystem with gamified, interactive training. Learn Claude Chat, Claude Code, MCP, API, and Enterprise deployment.",
        "publisher": {
          "@id": "https://claude-academy.onewave.ai/#organization"
        }
      },
      {
        "@type": "Course",
        "name": "Claude Academy - Anthropic Ecosystem Training",
        "description": "Comprehensive training platform for mastering Claude Chat, Claude Code, MCP development, Anthropic API, and Claude Enterprise. Gamified learning with certifications.",
        "provider": {
          "@id": "https://claude-academy.onewave.ai/#organization"
        },
        "educationalLevel": "Beginner to Expert",
        "audience": {
          "@type": "EducationalAudience",
          "educationalRole": "professional"
        },
        "hasCourseInstance": {
          "@type": "CourseInstance",
          "courseMode": "online",
          "courseWorkload": "PT8W",
          "instructor": {
            "@type": "Organization",
            "name": "OneWave AI"
          }
        },
        "offers": [
          {
            "@type": "Offer",
            "name": "Individual",
            "price": "29",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "url": "https://claude-academy.onewave.ai/upgrade"
          },
          {
            "@type": "Offer",
            "name": "Team",
            "price": "99",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "url": "https://claude-academy.onewave.ai/upgrade"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is Claude Academy?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Claude Academy is a gamified training platform that teaches professionals and teams how to effectively use the complete Anthropic Claude ecosystem, including Claude Chat, Claude Code, MCP, API, and Enterprise features."
            }
          },
          {
            "@type": "Question",
            "name": "What learning tracks are available?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Claude Academy offers 6 comprehensive learning tracks: Claude Chat Fundamentals, Claude Code Mastery, MCP Development, Anthropic API, Claude Enterprise, and Claude Skills & Automation."
            }
          },
          {
            "@type": "Question",
            "name": "Are certifications included?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! Claude Academy offers verifiable certifications at Associate, Professional, and Expert levels. These can be shared on LinkedIn and verified by employers."
            }
          },
          {
            "@type": "Question",
            "name": "Is there team pricing?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, we offer team plans starting at $99/month for up to 10 seats, with team dashboards, progress tracking, and analytics. Enterprise plans with custom pricing are also available."
            }
          }
        ]
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
