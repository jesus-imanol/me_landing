// Avisa a los buscadores que usan IndexNow (Bing, Yandex, Seznam, Naver, Yep) que el sitio cambió.
// Uso, después de desplegar:  npm run indexnow
// La llave vive en public/19ed98dad4de0daaf13c17f8c3b38a4a.txt y tiene que estar publicada en el dominio.
const KEY = "19ed98dad4de0daaf13c17f8c3b38a4a";
const SITE = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.chuy7x.space").replace(/\/$/, "");
const host = new URL(SITE).host;

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host,
    key: KEY,
    keyLocation: `${SITE}/${KEY}.txt`,
    urlList: [`${SITE}/`, `${SITE}/sitemap.xml`],
  }),
});
console.log(`IndexNow → ${res.status} ${res.statusText}`);
if (!res.ok) process.exitCode = 1;
