/* Logic goc tu code da gui: tabs gia, portfolio/lightbox, tracking lien he (Google Ads). */
/* Chay sau khi loader nap xong tat ca partials, vi script trong partial se khong tu chay. */

document.querySelectorAll(`[data-price-tabs]`).forEach(e=>{let t=Array.from(e.querySelectorAll(`[data-price-tab]`)),n=Array.from(e.querySelectorAll(`[role='tabpanel']`)),r=e.querySelector(`.price-tab-list`),i=e.querySelector(`[data-price-prev]`),a=e.querySelector(`[data-price-next]`),o=0,s=e=>{o=Math.max(0,Math.min(t.length-1,e));let s=t[o];if(t.forEach(e=>e.setAttribute(`aria-selected`,String(e===s))),n.forEach(e=>{e.hidden=e.id!==s.dataset.priceTab}),i&&(i.disabled=o===0),a&&(a.disabled=o===t.length-1),r){let e=s.offsetLeft-(r.clientWidth-s.clientWidth)/2;r.scrollTo({left:Math.max(0,e),behavior:matchMedia(`(prefers-reduced-motion: reduce)`).matches?`auto`:`smooth`})}};t.forEach((e,n)=>{e.addEventListener(`click`,()=>s(n)),e.addEventListener(`keydown`,e=>{e.key===`ArrowLeft`&&(e.preventDefault(),s(o-1),t[Math.max(0,o)]?.focus()),e.key===`ArrowRight`&&(e.preventDefault(),s(o+1),t[Math.min(t.length-1,o)]?.focus())})}),i?.addEventListener(`click`,()=>s(o-1)),a?.addEventListener(`click`,()=>s(o+1))});

document.querySelectorAll(`[data-portfolio]`).forEach(e=>{let t=e.querySelector(`[data-portfolio-toggle]`),n=e.querySelector(`[data-portfolio-reveal]`),r=e.querySelector(`.portfolio-grid`),i=e.querySelector(`[data-portfolio-previous]`),a=e.querySelector(`[data-portfolio-next]`),o=e.querySelector(`[data-portfolio-lightbox]`),s=o?.querySelector(`[data-lightbox-image]`),c=o?.querySelector(`[data-lightbox-close]`);t?.addEventListener(`click`,()=>{let e=t.getAttribute(`aria-expanded`)===`true`;t.setAttribute(`aria-expanded`,String(!e)),n?.classList.toggle(`is-expanded`,!e),n?.toggleAttribute(`inert`,e),n?.setAttribute(`aria-hidden`,String(e))});let l=e=>r?.scrollBy({left:e*r.clientWidth*.72,behavior:`smooth`});i?.addEventListener(`click`,()=>l(-1)),a?.addEventListener(`click`,()=>l(1)),e.querySelectorAll(`[data-lightbox-trigger]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.querySelector(`img`);if(!t||!o||!s)return;let n=t.srcset.split(`,`).map(e=>e.trim().split(/\s+/)[0]).filter(Boolean);s.src=n.at(-1)||t.currentSrc||t.src,s.alt=t.alt,o.showModal()})}),c?.addEventListener(`click`,()=>o?.close()),o?.addEventListener(`click`,e=>{e.target===o&&o.close()}),o?.addEventListener(`close`,()=>{s&&(s.src=``)})});

document.addEventListener("click", (event) => {
const link = event.target.closest("a[data-contact-channel]");
if (!link) return;
const channel = link.dataset.contactChannel;
const tier = link.dataset.googleAdsConversion;
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
event: "contact_click",
contact_channel: channel,
conversion_tier: tier || "supporting",
});
if (tier !== "primary" || typeof window.gtag !== "function") return;
const opensNewContext = link.target === "_blank";
let navigated = false;
const navigate = () => {
if (navigated || opensNewContext) return;
navigated = true;
window.location.href = link.href;
};
if (!opensNewContext) {
event.preventDefault();
window.setTimeout(navigate, 800);
}
window.gtag("event", "conversion", {
send_to: "AW-18306026037/ftDqCPqBofBcELWU_5hE",
event_category: "contact",
event_label: channel,
event_callback: navigate,
event_timeout: 800,
transport_type: "beacon",
});
});
