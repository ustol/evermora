import { Container } from "@/components/layout/Container";

const sections = [
  {
    title: "What we believe",
    body: "We believe every life deserves to be remembered with respect and care. We believe a memorial should belong to the family, not to a platform. And we believe that the stories, the photographs, and the kind words shared in a person's honour are worth keeping safe, so they can be returned to for years to come.",
  },
  {
    title: "What families can do here",
    body: "On Akornafa, a family can tell the fuller story of a loved one's life and share the details of the funeral in one clear place. Friends and community can leave tributes, lay a virtual wreath or rose, and add photographs that bring a lifetime of moments together. Every memorial can be public, unlisted, or private, and the family decides who may contribute and what appears. The space stays exactly as they wish it to be.",
  },
  {
    title: "Who we are",
    body: "Akornafa is a product of Hoganam Ltd., based in Ghana. We are proud to serve families here at home and wherever our people have made their lives, offering a place to honour those who came before and to preserve their memory for those who come after.",
  },
];

export default function AboutPage() {
  return (
    <Container className="pt-7 pb-16 sm:pt-8 sm:pb-24">
      <article className="mx-auto max-w-3xl">
        <header className="border-b border-border pb-10">
          <h1 className="font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            About Akornafa
          </h1>
          <div className="mt-8 space-y-6 text-lg leading-8 text-muted-foreground">
            <p>
              In our culture, we do not say goodbye quietly. When someone we love passes,
              family and community come together from near and far to remember, to mourn,
              and to celebrate a life well lived. Akornafa was built to hold that
              gathering, and to make sure no memory is lost to distance or time.
            </p>
            <p>
              Akornafa is a dignified place for families to announce a funeral, raise a
              memorial page, and welcome tributes and condolences from everyone who held
              their loved one dear. Whether relatives are in the same town or scattered
              across the world, they can come to one quiet, respectful space to grieve
              together and to honour the person they have lost.
            </p>
          </div>
        </header>

        <div className="divide-y divide-border">
          {sections.map((section) => (
            <section key={section.title} className="py-10">
              <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
                {section.title}
              </h2>
              <p className="mt-4 text-base leading-8 text-muted-foreground sm:text-lg">
                {section.body}
              </p>
            </section>
          ))}
        </div>

        <p className="border-t border-border pt-10 font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Honouring lives. Preserving memories.
        </p>
      </article>
    </Container>
  );
}
