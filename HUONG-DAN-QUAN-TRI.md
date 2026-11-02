# Hướng dẫn quản trị — Beauty Port Cascais (bản tách từ code đã gửi)

Bản này giữ nguyên giao diện teal như code anh gửi ngày 02/11/2026, chỉ tách
thành từng file nhỏ để sửa từng phần cho dễ. Không dùng chung với bộ kit
cream/bronze cũ — CSS và class của 2 bản khác nhau hoàn toàn.

## Cấu trúc thư mục

- `index.html` — khung trang: phần head, thẻ Google Ads, CSS, vị trí nạp các partial.
- `partials/header.html` — header: logo, menu, chuyển ngôn ngữ PT / UA / EN, nút Marcar.
- `partials/hero.html` — ảnh bìa + tiêu đề “Beleza que encontra o seu norte.”
- `partials/services.html` — 6 dịch vụ: Cabelo, Cor, Unhas, Rosto, Massagem, Mais.
- `partials/space.html` — phần “O espaço” (ảnh không gian salon).
- `partials/prices.html` — toàn bộ bảng giá, 14 nhóm tab.
- `partials/portfolio.html` — ảnh portfolio + lightbox.
- `partials/team.html` — 9 thành viên team + dịch vụ tại nhà.
- `partials/contact.html` — 5 kênh liên hệ: WhatsApp, Instagram, Telegram, Google Maps, Telefone.
- `partials/visit.html` — địa chỉ, giờ mở cửa, nút Google Maps / Gọi ngay.
- `partials/footer.html` — footer + nút Marcar trên mobile.
- `css/style.css` — CSS gốc của site live (bản đã format, 2.283 dòng). Đừng thay bằng CSS khác.
- `js/loader.js` — nạp các partial vào trang.
- `js/main.js` — logic tabs giá, portfolio/lightbox, tracking click liên hệ (Google Ads).
- `image-site/` — logo (`beauty-port-logo.svg`) và ảnh mặt tiền hero.
- `beauty-port-logo.svg` (ở thư mục gốc) — bắt buộc giữ lại: CSS dùng nó làm họa tiết
  nền mờ (`url(/beauty-port-logo.svg)`), xóa file này là mất họa tiết nền.

## Sửa từng việc thì mở file nào

| Muốn sửa | Mở file |
|---|---|
| Đổi giá một dịch vụ | `partials/prices.html` — tìm tên nhóm tab (ví dụ “Cortes Femininos”), rồi sửa dòng `<p>TÊN DỊCH VỤ</p>` và `<strong>GIÁ €</strong>` tương ứng. Thêm nhóm mới = copy nguyên một `<section class="inline-price-panel">` và một nút tab tương ứng, đổi số thứ tự + id. |
| Đổi tên/mô tả dịch vụ | `partials/services.html` |
| Đổi tiêu đề, ảnh hero | `partials/hero.html`; thay ảnh thì chép file mới vào `image-site/` và đổi tên file trong đó |
| Đổi thành viên team | `partials/team.html` |
| Đổi số điện thoại / WhatsApp | Sửa cả 2 chỗ: `partials/contact.html` (link `wa.me/…`, `tel:+…`, số hiển thị) và `partials/visit.html` (số hiển thị + link `tel:`) |
| Đổi địa chỉ, giờ mở cửa | `partials/visit.html` |
| Đổi link Instagram / Telegram / Maps | `partials/contact.html` |
| Đổi màu, font, bố cục | `css/style.css` — chỉ sửa khi thật cần, vì đây là CSS gốc của site live |
| Sửa logic tabs / portfolio / tracking | `js/main.js` — đừng chèn `<script>` vào trong partial, script trong partial nạp bằng fetch sẽ không tự chạy |

## Xem thử trước khi deploy

Đừng mở `index.html` trực tiếp bằng file:// — trình duyệt sẽ chặn nạp partial.
Chạy server cục bộ trong thư mục này rồi mở `http://localhost:8000/`:

```
python3 -m http.server 8000
```

## Deploy lên Cloudflare Pages

Upload toàn bộ thư mục này, đặt thư mục gốc (root) chính là thư mục này.
Không cần build gì thêm — đây là HTML tĩnh.

## 3 lưu ý giữ nguyên từ code đã gửi

1. Trong code gửi, `canonical` và `og:url` đang là `https://example.com/`. Khi deploy
   lên domain chính thì đổi 2 chỗ đó trong `index.html` thành
   `https://beautyportcascais.com/`.
2. Ảnh portfolio, ảnh không gian, ảnh team đang dùng link tuyệt đối
   `https://beautyportcascais.com/_astro/….webp` của site live — vẫn load bình
   thường khi deploy, nhưng nếu site live đổi tên file ảnh thì phải cập nhật link.
3. Nút chuyển ngôn ngữ UA / EN trong header đang trỏ về site live (`/uk/`, `/en/`)
   — bản này chỉ có tiếng Bồ Đào Nha (PT) như code đã gửi.
