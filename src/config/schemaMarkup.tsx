import Head from 'next/head';

interface SchemaProps {
  schema: any;
}

export default function SchemaMarkup({ schema }: SchemaProps) {
  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }
        }
      />
    </Head>
  );
}
