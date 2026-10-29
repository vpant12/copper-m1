import Image from "next/image";
import { CheckIcon, MinusIcon, ShieldCheckIcon } from "lucide-react";
import { SiteFooter } from "@/components/copper/site-footer";
import { SiteHeader } from "@/components/copper/site-header";
import { Button } from "@/components/ui/button";
import {
  formatMemory,
  formatNotesHours,
  formatUsd,
  getPlans,
  getPrivacySummary,
  getProducts,
  type Product,
} from "@/lib/copper/catalog";
import { cn } from "@/lib/utils";

const TAGLINE = "From raw ideas to refined answers.";

// Alt text and captions for the photos the catalog points to.
const CUTOUT_ALT: Record<string, string> = {
  "copper-home":
    "Copper Home smart speaker: a copper fabric dome with a round clock display",
  "copper-notes":
    "Copper Notes clip-on recorder: a brushed copper square with a glowing amber ring",
};

type Shot = { alt: string; caption: string; width: number; height: number };

const LIFESTYLE: Record<string, Shot> = {
  "/assets/lifestyle/copper-home-desert-light.png": {
    alt: "Copper Home on a stone kitchen counter, with saguaros and mountains through the window at sunset",
    caption: "Copper Home keeps the house running, from sprinklers to storm alerts.",
    width: 1672,
    height: 941,
  },
  "/assets/lifestyle/copper-notes-stone-desk.png": {
    alt: "Copper Notes and its charging puck on a sunlit stone desk",
    caption: "Copper Notes charges on its puck, ready for the next meeting.",
    width: 1672,
    height: 941,
  },
  "/assets/lifestyle/copper-notes-golden-hour.png": {
    alt: "A person writing in a notebook with Copper Notes clipped to their shirt pocket",
    caption: "Clip it on, take notes your way, and get the summary afterward.",
    width: 1536,
    height: 1024,
  },
};

// Product color names from the catalog, shown as brand-color swatches.
function swatchClass(color: string) {
  if (color.includes("Copper")) return "bg-primary";
  if (color.includes("Patina")) return "bg-accent";
  if (color.includes("Night Sky")) return "bg-[#1c2333]";
  if (color.includes("Desert Sand")) return "bg-[#efe3d0]";
  return "bg-muted";
}

export default function Home() {
  const products = getProducts();
  const plans = getPlans();
  const privacy = getPrivacySummary();
  const shots = products.flatMap((product) =>
    product.lifestyle.map((src) => ({ product, src, ...LIFESTYLE[src] })),
  );

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section
          data-testid="hero"
          id="top"
          className="bg-secondary text-secondary-foreground scroll-mt-16"
        >
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
            <div className="flex flex-col items-start gap-6">
              <p className="text-primary text-sm font-semibold tracking-widest uppercase">
                Made for Arizona homes and workdays
              </p>
              <h1 className="text-4xl leading-tight font-bold text-balance sm:text-5xl lg:text-6xl">
                Meet Copper: smarter home, sharper notes.
              </h1>
              <p className="text-muted-foreground text-xl">{TAGLINE}</p>
              <Button asChild size="lg" className="h-11 px-6 text-base">
                <a href="#products">See products</a>
              </Button>
            </div>
            <div className="grid grid-cols-2 items-end gap-4">
              {products.map((product) => (
                <Image
                  key={product.id}
                  src={product.cutout}
                  alt={CUTOUT_ALT[product.id] ?? product.name}
                  width={1254}
                  height={1254}
                  preload
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="h-auto w-full drop-shadow-xl"
                />
              ))}
            </div>
          </div>
        </section>

        <section
          data-testid="products"
          id="products"
          className="mx-auto max-w-6xl scroll-mt-16 px-4 py-20"
        >
          <SectionHeading
            eyebrow="Products"
            title="Two devices, one Copper"
            intro="A speaker for the house and a recorder for your day. Both work with the Copper app."
          />
          <div className="grid gap-6 md:grid-cols-2">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <section
          data-testid="showcase"
          id="showcase"
          className="bg-secondary/50 scroll-mt-16"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-16 px-4 py-20">
            <SectionHeading
              eyebrow="At home in Arizona"
              title="Built for real days"
            />
            {shots.map((shot, i) => (
              <figure
                key={shot.src}
                className="grid items-center gap-6 md:grid-cols-5 md:gap-10"
              >
                <Image
                  src={shot.src}
                  alt={shot.alt ?? `${shot.product.name} in use`}
                  width={shot.width ?? 1600}
                  height={shot.height ?? 900}
                  sizes="(min-width: 768px) 60vw, 100vw"
                  className={cn(
                    "h-auto w-full rounded-2xl shadow-lg md:col-span-3",
                    i % 2 === 1 && "md:order-last",
                  )}
                />
                <figcaption className="flex flex-col gap-2 md:col-span-2">
                  <span className="text-primary text-sm font-semibold tracking-widest uppercase">
                    {shot.product.name}
                  </span>
                  <span className="text-2xl font-semibold text-balance">
                    {shot.caption ?? shot.product.type}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section
          data-testid="plus-pricing"
          id="plus"
          className="mx-auto max-w-6xl scroll-mt-16 px-4 py-20"
        >
          <SectionHeading
            eyebrow="Copper Plus"
            title="Free to start. Plus when you want more."
            intro="Every Copper works on the Free plan. Copper Plus keeps more and does more."
          />
          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
            {plans.map((plan) => {
              const plus = plan.id === "copper-plus";
              return (
                <div
                  key={plan.id}
                  className={cn(
                    "bg-card flex flex-col gap-6 rounded-2xl border p-6 sm:p-8",
                    plus && "border-primary ring-primary shadow-lg ring-2",
                  )}
                >
                  <h3 className={cn("text-2xl font-bold", plus && "text-primary")}>
                    {plan.name}
                  </h3>
                  <div>
                    <p className="text-4xl font-bold">
                      {formatUsd(plan.monthlyUsd)}
                      <span className="text-muted-foreground text-base font-normal">
                        /month
                      </span>
                    </p>
                    <p className="text-muted-foreground mt-1">
                      or {formatUsd(plan.annualUsd)}/year
                    </p>
                  </div>
                  <dl className="divide-y border-t">
                    <PlanRow label="Memory kept" value={formatMemory(plan.memoryDays)} />
                    <PlanRow
                      label="Notes recording"
                      value={formatNotesHours(plan.notesHoursPerMonth)}
                    />
                    <PlanRow
                      label="Refined answers"
                      value={
                        plan.refinedAnswers ? (
                          <CheckIcon className="text-primary size-5" aria-label="Included" />
                        ) : (
                          <MinusIcon className="text-muted-foreground size-5" aria-label="Not included" />
                        )
                      }
                    />
                  </dl>
                </div>
              );
            })}
          </div>
        </section>

        <section
          data-testid="privacy-summary"
          id="privacy"
          className="bg-accent text-accent-foreground scroll-mt-16"
        >
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 md:grid-cols-5">
            <div className="flex flex-col gap-4 md:col-span-2">
              <ShieldCheckIcon className="size-10" aria-hidden />
              <h2 className="text-3xl font-bold text-balance sm:text-4xl">
                Your privacy, in plain words
              </h2>
              <p className="text-lg">
                How Copper handles recordings under our {privacy.policy} privacy
                policy. It all starts with &ldquo;{privacy.wakeWord}.&rdquo;
              </p>
            </div>
            <ul className="flex flex-col gap-4 md:col-span-3">
              {privacy.points.map((point) => (
                <li
                  key={point}
                  className="flex gap-3 rounded-xl bg-white/25 p-4 text-base"
                >
                  <CheckIcon className="mt-0.5 size-5 shrink-0" aria-hidden />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

function SectionHeading({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="mx-auto mb-12 flex max-w-2xl flex-col gap-3 text-center">
      <p className="text-primary text-sm font-semibold tracking-widest uppercase">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-bold text-balance sm:text-4xl">{title}</h2>
      {intro && <p className="text-muted-foreground text-lg">{intro}</p>}
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <article
      data-testid="product-card"
      data-product={product.id}
      className="bg-card flex flex-col gap-6 rounded-2xl border p-6 shadow-sm sm:p-8"
    >
      <div className="bg-secondary flex flex-col items-center gap-4 rounded-xl p-6">
        <Image
          src={product.cutout}
          alt={CUTOUT_ALT[product.id] ?? product.name}
          width={1254}
          height={1254}
          sizes="(min-width: 768px) 30vw, 80vw"
          className="h-auto w-full max-w-64"
        />
        <ul className="flex flex-wrap justify-center gap-3" aria-label="Colors">
          {product.colors.map((color) => (
            <li key={color} className="flex items-center gap-1.5 text-xs">
              <span
                className={cn(
                  "size-4 rounded-full border border-black/15",
                  swatchClass(color),
                )}
                aria-hidden
              />
              {color}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold">{product.name}</h3>
          <p className="text-muted-foreground">{product.type}</p>
        </div>
        <p className="text-primary text-3xl font-bold">
          {formatUsd(product.priceUsd)}
        </p>
      </div>
      <ul className="flex flex-col gap-4">
        {product.features.map((feature) => (
          <li key={feature.name} className="flex gap-3">
            <CheckIcon className="text-primary mt-0.5 size-5 shrink-0" aria-hidden />
            <span>
              <span className="font-semibold">{feature.name}.</span>{" "}
              <span className="text-muted-foreground">{feature.description}</span>
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function PlanRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-semibold">{value}</dd>
    </div>
  );
}
