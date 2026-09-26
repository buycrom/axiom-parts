import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getProductBySlug,
  getRelatedProducts,
  getFrequentlyBoughtWith,
  products,
  DEMO_DATA_NOTICE,
} from "@/data/products";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductPurchase } from "@/components/product/ProductPurchase";
import {
  RelatedProducts,
  FrequentlyBoughtWith,
} from "@/components/product/RelatedProducts";
import { formatPrice } from "@/lib/utils";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Produit introuvable" };
  return {
    title: product.metaTitle ?? product.name,
    description: product.metaDescription ?? product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product);
  const fbt = getFrequentlyBoughtWith(product);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    image: product.images.map((i) => i.src),
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: product.price,
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/PreOrder",
    },
  };

  return (
    <div className="container-axiom section-pad py-10 md:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <p className="mb-6 font-mono text-[10px] text-axiom-muted/70">
        {DEMO_DATA_NOTICE}
      </p>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        <ProductGallery images={product.images} />
        <ProductPurchase product={product} />
      </div>

      <div className="mt-16 grid gap-10 border-t border-axiom-border pt-12 md:mt-20 md:grid-cols-2 lg:grid-cols-3">
        <InfoBlock title="À quoi sert cette pièce ?" code="PURPOSE">
          {product.purpose}
        </InfoBlock>
        <InfoBlock title="Comment l'utiliser ?" code="USAGE">
          {product.howToUse}
        </InfoBlock>
        <InfoBlock title="Compatibilité" code="COMPATIBILITY">
          {product.compatibleWith.length === 0 ? (
            <span>Compatibilité à confirmer — contactez-nous.</span>
          ) : (
            <ul className="space-y-1.5">
              {product.compatibleWith.map((c) => (
                <li key={`${c.brand}-${c.model}-${c.version}`}>
                  <span className="text-axiom-text">{c.brand}</span>
                  {" — "}
                  {c.model}
                  {c.version ? ` (${c.version})` : ""}
                </li>
              ))}
            </ul>
          )}
        </InfoBlock>
      </div>

      <section className="mt-12 border border-axiom-border bg-axiom-surface p-6 md:p-8">
        <p className="instrument-label mb-3">SPECS</p>
        <h2 className="font-display mb-6 text-xl font-semibold">
          Caractéristiques
        </h2>
        <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(product.specs).map(([key, value]) =>
            value ? (
              <div key={key} className="border-b border-axiom-border pb-3">
                <dt className="instrument-label mb-1">{key}</dt>
                <dd className="text-sm">{value}</dd>
              </div>
            ) : null
          )}
          <div className="border-b border-axiom-border pb-3">
            <dt className="instrument-label mb-1">prix</dt>
            <dd className="text-sm">{formatPrice(product.price)}</dd>
          </div>
        </dl>
        <p className="mt-4 font-mono text-[10px] text-axiom-muted">
          Fabrication 3D · matériau · dimensions · compatibilité — valeurs démo
          à remplacer.
        </p>
      </section>

      {product.installationSteps && product.installationSteps.length > 0 && (
        <section className="mt-12">
          <p className="instrument-label mb-3">INSTALL</p>
          <h2 className="font-display mb-6 text-xl font-semibold">
            Installation
          </h2>
          <ol className="grid gap-4 md:grid-cols-3">
            {product.installationSteps.map((step, i) => (
              <li
                key={step.title}
                className="border border-axiom-border bg-axiom-surface p-5"
              >
                <span className="font-mono text-2xl text-axiom-accent/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display font-semibold">{step.title}</h3>
                <p className="mt-1 text-sm text-axiom-muted">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </section>
      )}

      <FrequentlyBoughtWith main={product} products={fbt} />
      <RelatedProducts products={related} />
    </div>
  );
}

function InfoBlock({
  title,
  code,
  children,
}: {
  title: string;
  code: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="instrument-label mb-2">{code}</p>
      <h2 className="font-display mb-3 text-xl font-semibold">{title}</h2>
      <div className="text-sm leading-relaxed text-axiom-muted">{children}</div>
    </div>
  );
}
