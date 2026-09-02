export function BrandPromiseSection() {
  return (
    <section className="mx-auto w-[94%] max-w-7xl py-8 sm:py-12">
      <div className="relative overflow-hidden rounded-[3rem] bg-[#302722] text-[#FFF8EF]">
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-[#A88CC7]/25 blur-3xl" />
        <div className="absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-[#78A894]/20 blur-3xl" />

        <div className="relative grid gap-8 p-6 sm:p-9 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:p-12">
          <div className="relative min-h-[360px] rounded-[2.5rem] bg-[#F5E1ED] p-4 sm:min-h-[480px]">
            <img
              src="/images/habba/products/hbb-lavender-rose-bracelet-card.png"
              alt="أسورة لافندر بوردة"
              className="absolute inset-[6%] h-[88%] w-[88%] object-contain"
            />
            <div className="absolute bottom-5 left-5 flex gap-1.5" aria-hidden="true">
              <span className="habba-bead h-5 w-5 bg-[#F56F67]" />
              <span className="habba-bead h-4 w-4 bg-[#F4DFA0]" />
              <span className="habba-bead h-6 w-6 bg-[#CBE9E2]" />
            </div>
          </div>

          <div className="text-right">
            <p className="text-xs font-extrabold text-[#E8B5AF]">handmade يعني التفاصيل لها حياة</p>
            <h2 className="mt-3 max-w-xl text-3xl font-black leading-[1.2] tracking-[-0.03em] sm:text-5xl">
              مش نسخة مطبوعة
              <span className="block text-[#F3C7C2]">من بعضها.</span>
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-8 text-[#E7DBD5] sm:text-base">
              كل قطعة في حبّة معمولة بإيد. ممكن تظهر فروق بسيطة في ترتيب خرزة أو درجة لون حسب الخامات المتاحة، وده جزء طبيعي من القطعة مش عيب مستخبي.
            </p>

            <div className="mt-8 grid gap-5 border-t border-white/15 pt-6 sm:grid-cols-3">
              <div>
                <span className="habba-bead h-3 w-3 bg-[#F56F67]" />
                <p className="mt-2 text-sm font-bold">معمولة بإيد</p>
              </div>
              <div>
                <span className="habba-bead h-3 w-3 bg-[#CBE9E2]" />
                <p className="mt-2 text-sm font-bold">الخامات تحدد التوفر</p>
              </div>
              <div>
                <span className="habba-bead h-3 w-3 bg-[#F4DFA0]" />
                <p className="mt-2 text-sm font-bold">اختلاف بسيط طبيعي</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
