function productCard(p){
  return `<article class="product-card">
    <a href="/product.html?id=${p.id}"><img src="${p.image}" alt="${p.titleEn}"></a>
    <h3 class="ar">${p.titleAr}</h3>
    <p>${p.titleEn}</p>
    <p class="meta">${p.category} • ${p.collectionAr}</p>
    <p class="meta ar">السعر: قريبًا</p>
    <a class="btn btn-primary ar" href="${buildWhatsAppLink(p.titleAr)}" target="_blank">اسأل على واتساب</a>
  </article>`;
}
