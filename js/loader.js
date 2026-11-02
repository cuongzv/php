/* Nap tung partial (partials/*.html) vao <div data-include="..."> tuong ung.
   Ly do tach js/main.js rieng: script dat trong partial khi nap bang fetch/innerHTML
   se KHONG tu chay, nen loader phai nap xong het partial roi moi nap js/main.js.
   Luu y: mo truc tiep bang file:// se bi chan fetch (CORS). De xem thu, chay
   server cuc bo trong thu muc nay, vi du: python3 -m http.server 8000
   roi mo http://localhost:8000/ — hoac deploy len Cloudflare Pages. */
document.addEventListener("DOMContentLoaded", () => {
  const slots = document.querySelectorAll("[data-include]");
  const load = (el) =>
    fetch(el.dataset.include)
      .then((r) => {
        if (!r.ok) throw new Error(r.status);
        return r.text();
      })
      .then((html) => {
        el.innerHTML = html;
      })
      .catch(() => {
        el.innerHTML =
          '<p style="padding:20px;color:#a00">Nao foi possivel carregar ' +
          el.dataset.include +
          "</p>";
      });
  Promise.all([...slots].map(load)).then(() => {
    const s = document.createElement("script");
    s.src = "js/main.js";
    document.body.appendChild(s);
  });
});
