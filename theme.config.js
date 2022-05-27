const array = ['📍', '️📌', '️😁', '️🏓', '️🧷', '️🙂', '️😀', '️🥰', '️😺', '️😼', '️⌨️', '💡', '️🧪', '️📜', '️✏️', '📝', '️✒️', '🖋', '️🖊', '️🤨', '️🙄']
const rand = array[Math.floor(Math.random() * array.length)]

export default {
  github: 'https://github.com/JastinXyz/whatscode.js',
  docsRepositoryBase: 'https://github.com/JastinXyz/whatscode.js/blob/docs',
  titleSuffix: ' – whatscode.js',
  logo: (
    <>
      <span className="mr-2 font-extrabold hidden md:inline">Whatscode.js</span>
      <span className="text-gray-600 font-normal hidden md:inline">
        Create a Whatsapp bot easily and quickly.
      </span>
    </>
  ),
  head: (
    <>
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Language" content="en" />
      <meta name="description" content="Whatscode.js: a package to create Whatsapp bots easily and quickly, even coding experience is not really needed... " />
      <meta name="og:description" content="Nextra: the Next.js site builder" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content="logo.png" />
      <meta name="twitter:site:domain" content="whatscode.jstnlt.my.id" />
      <meta name="twitter:url" content="https://whatscode.jstnlt.my.id" />
      <meta name="og:title" content="Whatscode.js: Create a Whatsapp bot easily and quickly." />
      <meta name="og:image" content="logo.png" />
      <meta name="apple-mobile-web-app-title" content="Whatscode.js" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="logo.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href="logo.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="logo.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="96x96"
        href="logo.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="logo.png"
      />
      <meta name="msapplication-TileImage" content="logo.png" />
    </>
  ),
  search: true,
  prevLinks: true,
  nextLinks: true,
  footer: true,
  footerEditLink: <>Edit this page on Github {rand}</>,
  footerText: <>MIT {new Date().getFullYear()} © Whatscode.js.</>,
  unstable_faviconGlyph: '👋',
}
