import "./style.css";

// RIVA frontend logic
// The original single-file logic is preserved here and split from the HTML.
// @ts-nocheck
/* =========================================================
   DATA
========================================================= */
const CATEGORIES = {
  men: [
    { slug: "tees", label: "Tees", icon: "👕" },
    { slug: "hoodies", label: "Hoodies", icon: "🧥" },
    { slug: "baggy-pants", label: "Baggy Pants", icon: "👖" },
    { slug: "cargo", label: "Cargo", icon: "🎒" },
    { slug: "caps", label: "Caps", icon: "🧢" },
    { slug: "shorts", label: "Shorts", icon: "🩳" },
    { slug: "sneakers", label: "Sneakers", icon: "🥾" },
    { slug: "accessories", label: "Accessories", icon: "🕶️" },
  ],
  women: [
    { slug: "crop-tees", label: "Crop Tees", icon: "👚" },
    { slug: "hoodies", label: "Hoodies", icon: "🧥" },
    { slug: "baggy-jeans", label: "Baggy Jeans", icon: "👖" },
    { slug: "coord-sets", label: "Co-ord Sets", icon: "👗" },
    { slug: "tank-tops", label: "Tank Tops", icon: "🎽" },
    { slug: "shorts", label: "Shorts", icon: "🩳" },
    { slug: "sneakers", label: "Sneakers", icon: "🥾" },
    { slug: "accessories", label: "Accessories", icon: "👜" },
  ],
};

// Replace these with your own image URLs (one per category slug).
// This object is shared by category tiles AND product ticket cards.

const PRODUCT_IMAGES = {
  men: {
    tees: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6se0lnHOljR3LHq7c0S4bwgyzEQVitYKVyLwJajZArg&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUgX6Wo4vyuoRl209Vf8SCcJrwPatneysmb4fXhQP8dQ&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4kCW12v0NpgDhkxX9tqqGIF_1N3vjQNJ8YN6nDiYLUw&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDH4zHLab5Zwss3BPogtYoXHP5pZJ6EV3nw51dn-gC8g&s=10",
    ],

    hoodies: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfkOHrDen1tBFjB9T-_YJ4e7IurbRIaJVHvY9meZi4mA&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSibyVz9IkcivQeAQf-4wOOsXaN8TzfG84t9E1pwYrm5g&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwBrYuV-M8CwC8N7HQjuT1fCDokH872uDcPjWupYcPdA&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMgzZp_PcWlc91s0QqVb7jp6yI8PRrZ2ZpC4n5JMLUbQ&s=10",
    ],

    "baggy-pants": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9LBDQPCuFE2wTLk-yo3zVndofJZbY4IH43at3wWPjng&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8swMBjN5xyyY2gczkinfIemgEbHr_y9wB8wIiuheWlg&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAReR9Htuh5oW1ahTKjUNu1BCjsYQgVorQhBPBqZ4AUg&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7c5j-EZBz_wWwGqdfUuwyeciIiglhS2GBcuHqqQYyRg&s=10",
    ],

    cargo: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8qyQ_beYTblrPEOEAzVOwL_fTHC-9Jo3PnwTI97jkvA&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQliZ8vYAIL3lG8IhmuSeGkYpnDPTnVWVaJEqWjgizbg&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQYYSVjD-RaSC7yNLzN1Gy1th9ZN5wHXGSyKOOXV3mHQ&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-BuUjIcDmgCNU6qnYxQxlE1jah0_4leMbpaJw9rXEsA&s",
    ],

    caps: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi6zKNK5zlTP0caXvCsekjCRuggTsGsfmLyNuWtX5LGA&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyNWQrndrvh65Sk2FEyGE_1bLrMnKPFlxuTfW7_bEBBA&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVxZ6XuBlcUvvr3TfkRI-R8g3jMMgRi6ci6VAVfHHWrA&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkjKYz4qOFsDhliVKDpAUZJNTzpJgqo2D55IJVBmosqQ&s=10",
    ],

    shorts: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBE7_CVvgCkM9K1lx4vWEUjlAsr_FYDNA3XBmZFPwihQ&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGZ7zrRkoXAz93cO_8F9hZpeKKBMbwcskuXuQb6uTBPg&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRS43X47LkqSU62TcjzFTtLGE-31wfms4kkz1l-uGGDw&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB0WfwiY9QIpOpLO2ohLf2Qkacg423s4Q-C0xRQr2GDQ&s=10",
    ],

    sneakers: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0W2TCexHSv3xXjbj9U5gSJSRVVhv2mETr6xNjtlEgrw&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnqzpgqr_QeTaZCAQ0xvY3k7Q61_j-TINPLIfFap35Hg&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRQZtTuNdSUly2Rm1KY-n2D0Dx3XcGaNtxlA5-VMkHBA&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxKe3axiRcOLI81fAfzmqZ3OAq4Np1s0xL7dHhiIn4dw&s=10",
    ],

    accessories: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwZJVycf_A16ywRV9EhxpIy2bxVxzcROGnJJSIKcDtLg&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNMhAe6rsujhx0VGy9xZWi8EFkM7R0sqTC2acPFuvkeg&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0_ebeMd8KIlpB3_gHwY0se_crhdwjiCgCVMdGBlHOpQ&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTZzcKhtpmVcCr19Z96Txi8AVNGsRg0iZYYXFaOURQ5w&s",
    ],
  },

  women: {
    "crop-tees": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9BRqOlS7CSG9aHWROrW2cbgXeQkj_OZS022B0j5bIFw&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWwbzcSMRarZ9yzBV5pAuSM7tN_Vrm3aGPtZ9w5iGoKg&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzMmmv7Zpzv1LK4AuTLed1vd3TBtSJQB0udmA8fyJX3g&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnPNp3hVy-gkD8XVoBK9FLBFbexTaTtH9UjtDEg6Lk4A&s=10",
    ],

    hoodies: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMkP1DI2qQVr77iVve1Q8zhaV6ZkEi7NsVumbnXTJL_w&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnC2UuN2R4W7I_0y1DcMk4j-TL70cnv6GUcB0tEDQztw&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEMKz8E1ZeZDzMFq41BqgNx4ZquN6wxSHh7pgaW0HU3A&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpUp6lYP8AAOqrcLIIhYpqsLVDiYLXvb9TRFtNMP1OHg&s=10",
    ],

    "baggy-jeans": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeO8R7tOksRGHDAYp6-XK7tF-TCy2x-LXI5ab7ErKN9Q&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq6IF2HvWq-O0UFyArwCgs332CpEDiOAS-3pXdmZd9PQ&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8dX1FBjTzZJlM_ebxBlO1TJXrQIDVinw4nk2KwpDvNA&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAlpY6_POAEYFIa1xQ_naCepXiqI9URhwb3tiljXZReQ&s=10",
    ],

    "coord-sets": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIHzmogwhkY7pgQtOfh-rHuK4QBQNmbpHIA7r75rmqFQ&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcw8biuXfzn5ptI6WvZ_QoYx_WNuz8BM2g0k9X0hAxlg&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYidcALjFX6mye6RSgRbQ2RYcPAlktBIOSQiLT3X7Heg&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqT3_WtjbyF8mQM8nEC-rp0Qn5p845qSs11jgvEZgBCQ&s",
    ],

    "tank-tops": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcP_01ko4oYhLHgskAcjrl_hjQYO8vr8ITeXz7nBid2A&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJ63p-pAa-7UR98MwPBJKdVIvo3iNWa--Nv-_AERuMkQ&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsOxnLk-ipBe57hos40XD3e59OEac5L7jvsK09UD-G_g&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0lmaWLKLdcLaIG9bGbZCBtq6-moOIvQOTOnXAFaEB5g&s",
    ],

    shorts: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBBnYcuurC_Ta9xZ9fT4hc4oT1qp6BKZ2jQaPQ2VGCfQ&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC9FW9GE8_yVOvyWv52tTZD9TvegY_teB_Our3nvLEmg&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBt26tjridVQ_JLCtU9XuQjBsMUw8es2TSVRYogHrTyg&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2ku953zRBNOupLdcHd2kNg8_-mO-G_JGqJUenbCNceA&s=10",
    ],

    sneakers: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFSAFoHo4BwuLn0aljixzqq0p9hb2wc1Mq9Z_NxV1eCg&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuuvOqaEpe7VTNcXXFYan6csuXHDlWYp4UbeKgYY4C-w&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShwHdIyc7XjrctehJpi6xwSN4svuB2DwzKYNhrPvmL6A&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuv2WQ1HaVElY_31KbPCke8Z6dvFlVqhQyI1fvJrsDSw&s=10",
    ],

    accessories: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxuik6Qy2nyp4W2CjGIeTXF6c5H8cGACXZgsadA1Rcmw&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToqTOi8Xo4DJ7ePcPFRzpa86IVHvTHQr9Oyp9PScqBoQ&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRx4pPZeO0etKwvG0riipY6tmWyGOArDpW854533JLWQQ&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRG0qiszy6rwNEjB2SCjMnM_XXXfguTaIM4TATTSDjb6w&s",
    ],
  },
};

const CATEGORY_COVERS = {
  men: {
    tees: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7fk592vArSyrjcwj2yBZoWrOHBJJMtM8T7s1FhFwaCw&s=10",
    hoodies:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFFOVknsmUMVK-is3KB8bYMSNNfS0cq-OAsSMW1sp52A&s=10",
    "baggy-pants":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKq-yCsXtQLb5nUGJ2sUITuWoSgdadsVL8425hJ_zWdw&s=10",
    cargo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZQJ94_ti8G4E58tV_zn3auCxqFDn_1sskNoGSy0xaMw&s",
    caps: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpzQCYm_9n-Jfo7hc8UsnahaqSdPMQqIwdhtjM9eatOQ&s=10",
    shorts:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS90N_dDp7Afwt2fxvMXrHRZ-ipItE3jX6xLRTQFSBCWQ&s=10",
    sneakers:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8uFVTHgMJJ2e-yNL8yNgg3cavIlCmFEbimHOI-KKBvw&s=10",
    accessories:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQM9ADXGA9O_J-PuoqdDIyye3pLle6RzYCsasnnStuKdA&s=10",
  },

  women: {
    "crop-tees":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYYgW_3jA8ZyC83B1V6CKZRBQW0-gbrZEkVGilvTFEYw&s=10",
    hoodies:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLBGKvPQPC2ceE2Cp1uT_f9OzxcQKghRteqKh7Ct7Flg&s=10",
    "baggy-jeans":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLauf1Nc6HnBUgwki-B4kiNzpZxzaLedgUj_1a8oLHgg&s=10",
    "coord-sets":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS795DrfavGiEWSVwE6uVgzcolj73BwVPI94jL4aLV9Wg&s=10",
    "tank-tops":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu2UhD41vS7wRY7vl06jbUvMzNv85wx2BGA2_q96Dh4A&s=10",
    shorts:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTXF2ZjQygczjzMlBCiYmI9QYf2PGQeWD3E4_7N95O1w&s=10",
    sneakers:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5Mmh8A4E8Z_Q8KWURTVKxqyzhg5QfqH4mXOgWntZGKw&s=10",
    accessories:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTESk95NfR6aV2MP6TLsVXIcMQ9dTAJVlsYV8t-WV3dXQ&s=10",
  },
};

const NAME_VARIANTS = ["Classic", "Drop", "Signature", "Noise"];
const TAGS = ["Bestseller", "New", null, null];
const DESCRIPTIONS = [
  "Cut oversized with a heavyweight cotton blend, garment-washed for a broken-in feel from day one.",
  "Streetwear staple built for everyday rotation — relaxed fit, reinforced stitching, made to last through every wear.",
  "A Riva signature piece. Boxy silhouette, premium fabric, finished with subtle branding for a clean look.",
];

function buildProducts() {
  const list = [];

  ["men", "women"].forEach((gender) => {
    let id = gender === "men" ? 1000 : 2000;

    CATEGORIES[gender].forEach((cat) => {
      NAME_VARIANTS.forEach((variant, i) => {
        id++;

        const price = 549 + i * 140 + cat.slug.length * 6;

        const old = price + 280 + i * 40;

        const images = PRODUCT_IMAGES[gender][cat.slug];

        list.push({
          id,

          gender,

          cat: cat.slug,

          catLabel: cat.label,

          icon: cat.icon,

          name: `${cat.label} ${variant}`,

          price,

          old,

          tag: TAGS[i],

          desc: DESCRIPTIONS[i % DESCRIPTIONS.length],

          sizes: ["S", "M", "L", "XL"],

          // DIFFERENT IMAGE FOR EACH PRODUCT
          image: images[i],
        });
      });
    });
  });

  return list;
}
const PRODUCTS = buildProducts();

/* =========================================================
   STATE
========================================================= */
let cart = []; // {id, size, qty}
let homeGender = "men";

function findProduct(id) {
  return PRODUCTS.find((p) => p.id === Number(id));
}
function cartTotalItems() {
  return cart.reduce((s, c) => s + c.qty, 0);
}
function cartSubtotal() {
  return cart.reduce((s, c) => {
    const p = findProduct(c.id);
    return s + (p ? p.price * c.qty : 0);
  }, 0);
}
function updateBagCount() {
  document.getElementById("bagCount").textContent = cartTotalItems();
}

function addToCart(id, size, qty) {
  qty = qty || 1;
  size = size || "M";
  const existing = cart.find((c) => c.id === id && c.size === size);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id, size, qty });
  }
  updateBagCount();
}
function removeFromCart(id, size) {
  cart = cart.filter((c) => !(c.id === id && c.size === size));
  updateBagCount();
}
function setQty(id, size, qty) {
  const item = cart.find((c) => c.id === id && c.size === size);
  if (item) {
    item.qty = Math.max(1, qty);
    updateBagCount();
  }
}

/* =========================================================
   TIMERS + TRUST + NEWSLETTER
========================================================= */
const trustWords = [
  "100% ORIGINAL",
  "COD AVAILABLE",
  "EASY 7-DAY RETURNS",
  "PAN-INDIA DELIVERY",
  "SECURE PAYMENTS",
];
document.getElementById("trustTrack").innerHTML = trustWords
  .map((w) => `<span>${w}</span>`)
  .join("")
  .repeat(2);

document.querySelectorAll(".deal-timer").forEach((el) => {
  let totalSeconds = parseFloat(el.dataset.hours) * 3600;
  function render() {
    const h = Math.floor(totalSeconds / 3600),
      m = Math.floor((totalSeconds % 3600) / 60),
      s = Math.floor(totalSeconds % 60);
    el.innerHTML = `<div><b>${String(h).padStart(2, "0")}</b><span>Hrs</span></div><div><b>${String(m).padStart(2, "0")}</b><span>Min</span></div><div><b>${String(s).padStart(2, "0")}</b><span>Sec</span></div>`;
  }
  render();
  setInterval(() => {
    if (totalSeconds > 0) {
      totalSeconds--;
      render();
    }
  }, 1000);
});

document.getElementById("newsForm").addEventListener("submit", (e) => {
  e.preventDefault();
  document.getElementById("newsMsg").textContent =
    "You're on the list. First drop hits your inbox soon.";
  e.target.reset();
});

/* =========================================================
   RENDER HELPERS
========================================================= */
function ticketCard(p) {
  return `
  <div class="ticket" data-goto="product" data-id="${p.id}">
    <div class="ticket-img">${p.tag ? `<span class="ticket-tag">${p.tag}</span>` : ""}<img src="${p.image}" alt="${p.name}" loading="lazy"></div>
    <div class="ticket-body">
      <div class="ticket-cat">${p.catLabel}</div>
      <div class="ticket-name">${p.name}</div>
      <div class="ticket-price"><span class="now">₹${p.price}</span><span class="old">₹${p.old}</span></div>
      <button class="add-btn" data-quickadd="${p.id}">Add to bag</button>
    </div>
  </div>`;
}

function catCard(gender, cat) {
  const count = PRODUCTS.filter(
    (p) => p.gender === gender && p.cat === cat.slug,
  ).length;

  const coverImage = CATEGORY_COVERS[gender][cat.slug];

  return `
  <button
    class="cat-card"
    data-goto="list"
    data-gender="${gender}"
    data-cat="${cat.slug}">

    <span class="cat-icon">

      <img
        src="${coverImage}"
        alt="${cat.label}">

    </span>

    <span class="cat-count">
      ${count} styles
    </span>

    <span class="cat-name display">
      ${cat.label}
    </span>

  </button>`;
}

function renderHomeCategories() {
  document.getElementById("homeCatGrid").innerHTML = CATEGORIES[homeGender]
    .map((c) => catCard(homeGender, c))
    .join("");
}
function renderHomeProducts() {
  const picks = PRODUCTS.filter((p) => p.tag === "Bestseller").slice(0, 8);
  document.getElementById("homeProductGrid").innerHTML = picks
    .map(ticketCard)
    .join("");
}
renderHomeCategories();
renderHomeProducts();

document.querySelectorAll("[data-homegender]").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll("[data-homegender]")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    homeGender = btn.dataset.homegender;
    renderHomeCategories();
  });
});

/* Single delegated click handler for ALL internal navigation — no <a href>, no real navigation, so no interceptor dialog */
document.body.addEventListener("click", (e) => {
  const quick = e.target.closest("[data-quickadd]");
  if (quick) {
    e.stopPropagation();
    const id = Number(quick.dataset.quickadd);
    addToCart(id, "M", 1);
    quick.classList.add("added");
    quick.textContent = "Added ✓";
    setTimeout(() => {
      quick.classList.remove("added");
      quick.textContent = "Add to bag";
    }, 1600);
    return;
  }
  const goto = e.target.closest("[data-goto]");
  if (goto) {
    if (goto.dataset.goto === "list") {
      navigate(`/shop/${goto.dataset.gender}/${goto.dataset.cat}`);
    }
    if (goto.dataset.goto === "product") {
      navigate(`/product/${goto.dataset.id}`);
    }
    return;
  }
  const nav = e.target.closest("[data-nav]");
  if (nav) {
    navigate(nav.dataset.nav);
  }
});

/* =========================================================
   ROUTER (pure JS state, no href/location changes that could
   be flagged as leaving the page — history API only)
========================================================= */
let currentRoute = "/";

function navigate(path) {
  currentRoute = path;
  history.pushState({ path }, "", location.pathname + location.search);
  render();
  window.scrollTo({ top: 0, behavior: "auto" });
}
window.addEventListener("popstate", (e) => {
  currentRoute = (e.state && e.state.path) || "/";
  render();
});

function showView(id) {
  document
    .querySelectorAll(".view")
    .forEach((v) => v.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function crumbBtn(label, path) {
  return `<button data-nav="${path}">${label}</button>`;
}

function renderShop(gender) {
  document.getElementById("shopGenderLabel").textContent =
    gender === "men" ? "Men" : "Women";
  document.getElementById("shopTag").textContent =
    gender === "men" ? "Men's collection" : "Women's collection";
  document.getElementById("shopTitle").textContent = "Pick a category";
  document.getElementById("shopCatGrid").innerHTML = CATEGORIES[gender]
    .map((c) => catCard(gender, c))
    .join("");
  showView("view-shop");
}

function renderList(gender, catSlug) {
  const cats = CATEGORIES[gender];
  const cat = cats.find((c) => c.slug === catSlug) || cats[0];

  document.getElementById("listBreadcrumb").innerHTML =
    crumbBtn("Home", "/") +
    '<span class="sep">/</span>' +
    crumbBtn(gender === "men" ? "Men" : "Women", `/shop/${gender}`) +
    '<span class="sep">/</span>' +
    `<span class="current">${cat.label}</span>`;

  document.getElementById("listTag").textContent =
    gender === "men" ? "Men" : "Women";
  document.getElementById("listTitle").textContent = cat.label;

  const bar = document.getElementById("listFilterBar");
  bar.innerHTML = cats
    .map(
      (c) =>
        `<button class="chip ${c.slug === cat.slug ? "active" : ""}" data-filtercat="${c.slug}">${c.label}</button>`,
    )
    .join("");
  bar.querySelectorAll("[data-filtercat]").forEach((btn) => {
    btn.addEventListener("click", () =>
      navigate(`/shop/${gender}/${btn.dataset.filtercat}`),
    );
  });

  const items = PRODUCTS.filter(
    (p) => p.gender === gender && p.cat === cat.slug,
  );
  document.getElementById("listProductGrid").innerHTML = items
    .map(ticketCard)
    .join("");
  document.getElementById("listEmpty").style.display = items.length
    ? "none"
    : "block";
  showView("view-list");
}

function renderProduct(id) {
  const p = findProduct(id);
  if (!p) {
    navigate("/");
    return;
  }

  document.getElementById("pdpBreadcrumb").innerHTML =
    crumbBtn("Home", "/") +
    '<span class="sep">/</span>' +
    crumbBtn(p.gender === "men" ? "Men" : "Women", `/shop/${p.gender}`) +
    '<span class="sep">/</span>' +
    crumbBtn(p.catLabel, `/shop/${p.gender}/${p.cat}`) +
    '<span class="sep">/</span>' +
    `<span class="current">${p.name}</span>`;

  let selectedSize = p.sizes[1];
  let qty = 1;

  function renderPdp() {
    document.getElementById("pdpContent").innerHTML = `
      <div class="pdp-img"><img src="${p.image}" alt="${p.name}"></div>
      <div>
        ${p.tag ? `<span class="pdp-tag">${p.tag}</span>` : ""}
        <h1 class="pdp-name display">${p.name}</h1>
        <div class="pdp-price"><span class="now">₹${p.price}</span><span class="old">₹${p.old}</span></div>
        <p class="pdp-desc">${p.desc}</p>
        <div class="pdp-label">Select size</div>
        <div class="size-row" id="sizeRow">
          ${p.sizes.map((s) => `<button class="size-chip ${s === selectedSize ? "active" : ""}" data-size="${s}">${s}</button>`).join("")}
        </div>
        <div class="pdp-label">Quantity</div>
        <div class="qty-row">
          <div class="qty-stepper">
            <button id="qtyMinus">−</button><span id="qtyVal">${qty}</span><button id="qtyPlus">+</button>
          </div>
        </div>
        <div class="pdp-actions">
          <button class="btn-primary" id="pdpAddBtn" style="text-align:center;">Add to bag — ₹${p.price * qty}</button>
          <button class="btn-outline" data-nav="/shop/${p.gender}/${p.cat}" style="text-align:center;">Back to ${p.catLabel}</button>
        </div>
        <div class="pdp-meta">SKU: RIVA-${p.id} · Category: ${p.catLabel}<br>Free shipping on orders above ₹999 · 7-day easy returns</div>
      </div>`;

    document.querySelectorAll("#sizeRow .size-chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        selectedSize = chip.dataset.size;
        renderPdp();
      });
    });
    document.getElementById("qtyMinus").addEventListener("click", () => {
      qty = Math.max(1, qty - 1);
      renderPdp();
    });
    document.getElementById("qtyPlus").addEventListener("click", () => {
      qty = qty + 1;
      renderPdp();
    });
    document.getElementById("pdpAddBtn").addEventListener("click", () => {
      addToCart(p.id, selectedSize, qty);
      const btn = document.getElementById("pdpAddBtn");
      const original = btn.textContent;
      btn.textContent = "Added to bag ✓";
      setTimeout(() => {
        btn.textContent = original;
      }, 1500);
    });
  }
  renderPdp();
  showView("view-product");
}

function renderCart() {
  const wrap = document.getElementById("cartWrap");
  if (cart.length === 0) {
    wrap.innerHTML = `<div class="empty-state" style="grid-column:1/-1;">Your bag is empty. <button data-nav="/shop/men">Start shopping →</button></div>`;
    return;
  }
  const itemsHTML = cart
    .map((c) => {
      const p = findProduct(c.id);
      return `
    <div class="cart-item">
      <div class="cart-item-img"><img src="${p.image}" alt="${p.name}"></div>
      <div>
        <div class="cart-item-name">${p.name}</div>
        <div class="cart-item-meta">Size ${c.size} · ₹${p.price} each</div>
        <div class="cart-item-controls">
          <div class="qty-stepper">
            <button data-dec="${c.id}" data-size="${c.size}">−</button>
            <span>${c.qty}</span>
            <button data-inc="${c.id}" data-size="${c.size}">+</button>
          </div>
          <button class="remove-link" data-remove="${c.id}" data-size="${c.size}">Remove</button>
        </div>
      </div>
      <div class="cart-item-price">₹${p.price * c.qty}</div>
    </div>`;
    })
    .join("");

  const subtotal = cartSubtotal();
  const shipping = subtotal > 999 || subtotal === 0 ? 0 : 79;
  const total = subtotal + shipping;

  wrap.innerHTML = `
    <div>${itemsHTML}</div>
    <div class="summary-box">
      <div class="summary-row"><span>Subtotal (${cartTotalItems()} items)</span><span>₹${subtotal}</span></div>
      <div class="summary-row"><span>Shipping</span><span>${shipping === 0 ? "Free" : "₹" + shipping}</span></div>
      <div class="summary-row total"><span>Total</span><span>₹${total}</span></div>
      <button class="btn-primary" data-nav="/checkout" style="display:block; width:100%; text-align:center; margin-top:20px;">Proceed to checkout</button>
    </div>`;

  wrap.querySelectorAll("[data-inc]").forEach((b) =>
    b.addEventListener("click", () => {
      const item = cart.find(
        (c) => c.id == b.dataset.inc && c.size === b.dataset.size,
      );
      setQty(item.id, item.size, item.qty + 1);
      renderCart();
    }),
  );
  wrap.querySelectorAll("[data-dec]").forEach((b) =>
    b.addEventListener("click", () => {
      const item = cart.find(
        (c) => c.id == b.dataset.dec && c.size === b.dataset.size,
      );
      setQty(item.id, item.size, item.qty - 1);
      renderCart();
    }),
  );
  wrap.querySelectorAll("[data-remove]").forEach((b) =>
    b.addEventListener("click", () => {
      removeFromCart(Number(b.dataset.remove), b.dataset.size);
      renderCart();
    }),
  );
}

function renderCheckout() {
  const wrap = document.getElementById("checkoutWrap");
  if (cart.length === 0) {
    wrap.innerHTML = `<div class="empty-state" style="grid-column:1/-1;">Your bag is empty. <button data-nav="/shop/men">Start shopping →</button></div>`;
    return;
  }
  const subtotal = cartSubtotal();
  const shipping = subtotal > 999 ? 0 : 79;
  const total = subtotal + shipping;
  let payMethod = "cod";

  wrap.innerHTML = `
    <div>
      <div class="pdp-label" style="margin-bottom:14px;">Shipping details</div>
      <div class="form-row">
        <div class="form-group"><label>Full name</label><input type="text" id="cfName" placeholder="Your name"></div>
        <div class="form-group"><label>Phone</label><input type="tel" id="cfPhone" placeholder="10-digit number"></div>
      </div>
      <div class="form-group"><label>Address</label><input type="text" id="cfAddress" placeholder="House no, street, area"></div>
      <div class="form-row">
        <div class="form-group"><label>City</label><input type="text" id="cfCity" placeholder="City"></div>
        <div class="form-group"><label>State</label><input type="text" id="cfState" placeholder="State"></div>
      </div>
      <div class="form-group" style="max-width:220px;"><label>Pincode</label><input type="text" id="cfPincode" placeholder="000000"></div>

      <div class="pdp-label" style="margin:26px 0 14px;">Payment method</div>
      <div class="pay-options" id="payOptions">
        <button class="pay-opt active" data-pay="cod">Cash on Delivery</button>
        <button class="pay-opt" data-pay="card">Credit / Debit Card</button>
        <button class="pay-opt" data-pay="upi">UPI</button>
      </div>
      <div class="field-error" id="cfError"></div>
    </div>
    <div class="summary-box">
      <div class="summary-row"><span>Subtotal</span><span>₹${subtotal}</span></div>
      <div class="summary-row"><span>Shipping</span><span>${shipping === 0 ? "Free" : "₹" + shipping}</span></div>
      <div class="summary-row total"><span>Total</span><span>₹${total}</span></div>
      <button class="btn-primary" id="placeOrderBtn" style="width:100%; margin-top:20px; text-align:center;">Place order</button>
    </div>`;

  wrap.querySelectorAll("[data-pay]").forEach((opt) => {
    opt.addEventListener("click", () => {
      wrap
        .querySelectorAll("[data-pay]")
        .forEach((o) => o.classList.remove("active"));
      opt.classList.add("active");
      payMethod = opt.dataset.pay;
    });
  });

  document.getElementById("placeOrderBtn").addEventListener("click", () => {
    const name = document.getElementById("cfName").value.trim();
    const phone = document.getElementById("cfPhone").value.trim();
    const address = document.getElementById("cfAddress").value.trim();
    const city = document.getElementById("cfCity").value.trim();
    const state = document.getElementById("cfState").value.trim();
    const pincode = document.getElementById("cfPincode").value.trim();
    const err = document.getElementById("cfError");
    if (!name || !phone || !address || !city || !state || !pincode) {
      err.textContent =
        "Please fill in all shipping details before placing your order.";
      return;
    }
    if (!/^\d{10}$/.test(phone)) {
      err.textContent = "Enter a valid 10-digit phone number.";
      return;
    }
    if (!/^\d{6}$/.test(pincode)) {
      err.textContent = "Enter a valid 6-digit pincode.";
      return;
    }
    err.textContent = "";
    const orderId = "RIVA" + Math.floor(100000 + Math.random() * 900000);
    document.getElementById("confirmId").innerHTML =
      `Order ID: <strong>${orderId}</strong><br>Payment: ${payMethod.toUpperCase()} · Total: ₹${total}`;
    cart = [];
    updateBagCount();
    navigate("/confirmation");
  });
}

function render() {
  const parts = currentRoute.split("/").filter(Boolean);
  if (parts.length === 0) {
    showView("view-home");
    return;
  }
  if (parts[0] === "shop" && parts[1] && !parts[2]) {
    renderShop(parts[1]);
    return;
  }
  if (parts[0] === "shop" && parts[1] && parts[2]) {
    renderList(parts[1], parts[2]);
    return;
  }
  if (parts[0] === "product" && parts[1]) {
    renderProduct(parts[1]);
    return;
  }
  if (parts[0] === "cart") {
    renderCart();
    showView("view-cart");
    return;
  }
  if (parts[0] === "checkout") {
    renderCheckout();
    showView("view-checkout");
    return;
  }
  if (parts[0] === "confirmation") {
    showView("view-confirmation");
    return;
  }
  showView("view-home");
}

render();
updateBagCount();
