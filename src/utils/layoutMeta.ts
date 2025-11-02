import type { Locale } from "../i18n/ui";

type Social = { link?: string };
type MenuItem = { link?: string };
type Education = { title?: string; sub_title?: string };

export function computeLayoutMeta(opts: {
  site: URL | undefined;
  path: string;
  lang: Locale;
  basic: any;
  socialLinks: Social[] | undefined;
  menuItems: MenuItem[] | undefined;
  education: Education[] | undefined;
  image?: string;
  title?: string;
  description?: string;
}) {
  const { site, path, lang, basic, socialLinks, menuItems, education, image, title, description } = opts;

  const canonical = site ? new URL(path, site).toString() : undefined;
  const isFR = path.startsWith('/fr');
  const enPath = isFR ? (path.slice(3) || '/') : path;
  const frPath = isFR ? path : (`/fr${path === '/' ? '/' : path}`);
  const enAlt = site ? new URL(enPath, site).toString() : undefined;
  const frAlt = site ? new URL(frPath, site).toString() : undefined;

  const job = (lang === 'en' ? basic?.locales?.en?.job : basic?.job) ?? basic?.job ?? '';
  const summary = (lang === 'en' ? basic?.locales?.en?.summary : basic?.summary) ?? basic?.summary ?? '';
  const defaultTitle = title ?? `${basic?.name ?? ''}  ${job}`.replace('\u0013','–');
  const defaultDescription = ("" + (description ?? summary)).slice(0,160);

  const avatarPath = basic?.avatar ?? '/images/avatar.png';
  const ogImage = image ? (site ? new URL(image, site).toString() : image) : (site ? new URL(avatarPath, site).toString() : avatarPath);

  const hasPhD = (education ?? []).some((e) => {
    const txt = `${e?.title ?? ''} ${e?.sub_title ?? ''}`.toLowerCase();
    return txt.includes('phd') || txt.includes('doctorat');
  });

  const socialLinksLinks = (socialLinks ?? []).map((s) => s.link).filter((x): x is string => !!x);
  const externalMenuLinks = (menuItems ?? [])
    .filter((m) => typeof m?.link === 'string' && (m.link as string).startsWith('http'))
    .map((m) => m.link as string);
  const sameAs = [...socialLinksLinks, ...externalMenuLinks];

  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: basic?.name,
    jobTitle: basic?.job,
    honorificSuffix: hasPhD ? 'PhD' : undefined,
    url: site ? site.toString() : undefined,
    description: basic?.summary,
    image: ogImage,
    sameAs
  };

  return { canonical, enAlt, frAlt, defaultTitle, defaultDescription, ogImage, hasPhD, sameAs, personJsonLd };
}
