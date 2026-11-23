import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BarChart3, Camera } from 'lucide-react';
import { SlideHeader } from '../SlideHeader';
import { SeaMap } from '../SeaMap';
import { MediaImage } from '../MediaImage';
import {
  getCenterById,
  getIndustryPhotosForCenter,
  MAINLAND_COUNTRIES,
  REGIONAL_INDUSTRIAL_ANALYSIS,
} from '../../data/presentationData';

type RightPanelTab = 'photos' | 'analysis';

export const Slide3Mainland: React.FC = () => {
  const [activeCenterId, setActiveCenterId] = useState<string>('ha-noi');
  const [activeTab, setActiveTab] = useState<RightPanelTab>('photos');

  const activeCenter = getCenterById(activeCenterId) ?? getCenterById('ha-noi')!;
  const activePhotos = getIndustryPhotosForCenter(activeCenter);
  const analysis = REGIONAL_INDUSTRIAL_ANALYSIS.mainland;

  return (
    <section
      aria-label="Slide 3: Công nghiệp các nước Đông Nam Á lục địa"
      className="flex min-h-full w-full flex-col bg-[#F6F8FB] px-3.5 pb-6 pt-3 sm:px-6 lg:h-full lg:px-14 lg:pb-5 lg:pt-5"
    >
      <SlideHeader
        kicker="ĐÔNG NAM Á LỤC ĐỊA · 5 QUỐC GIA, 6 TRUNG TÂM CÔNG NGHIỆP"
        title="CÔNG NGHIỆP CÁC NƯỚC ĐÔNG NAM Á LỤC ĐỊA"
        subtitle="Chọn trung tâm trên bản đồ hoặc chuyển tab để xem phân tích điểm chung & khác biệt (World Bank, IMF)"
      />

      {/* TOP STAGE: Full-width clear map on mobile, 7/12 Left Map + 5/12 Right Panel on tablet/desktop */}
      <div className="mt-2 grid grid-cols-12 gap-3 sm:gap-4 lg:min-h-0 lg:flex-[1.38] lg:gap-5">
        {/* LEFT: Clear Mainland SEA Map */}
        <div className="col-span-12 h-[270px] min-w-0 sm:h-[320px] md:col-span-7 md:h-auto lg:min-h-0">
          <SeaMap
            mode="mainland"
            activeCenterId={activeCenterId}
            onSelectCenter={(id) => {
              setActiveCenterId(id);
              setActiveTab('photos');
            }}
            showLeaderLines
            showCountryNames
            staggerMarkers
            className="h-full w-full shadow-sm"
          />
        </div>

        {/* RIGHT: Tabbed Panel — Industry Photos OR World Bank & IMF Regional Comparison */}
        <div
          data-testid="slide3-right-panel"
          className="col-span-12 flex min-w-0 flex-col gap-2 rounded-2xl border border-slate-200/90 bg-white p-3 shadow-xs sm:p-3.5 md:col-span-5 lg:min-h-0"
        >
          {/* Compact 2-Tab Switcher */}
          <div
            role="tablist"
            aria-label="Chuyển đổi giữa ảnh ngành và phân tích World Bank, IMF"
            className="grid shrink-0 grid-cols-2 gap-1 rounded-xl bg-slate-100/90 p-1"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'photos'}
              onClick={() => setActiveTab('photos')}
              className={`inline-flex items-center justify-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all ${
                activeTab === 'photos'
                  ? 'bg-[#0F294A] text-white shadow-xs'
                  : 'text-slate-600 hover:text-[#0F294A]'
              }`}
            >
              <Camera className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>Ảnh ngành ({activeCenter.shortCity ?? activeCenter.city})</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'analysis'}
              onClick={() => setActiveTab('analysis')}
              className={`inline-flex items-center justify-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all ${
                activeTab === 'analysis'
                  ? 'bg-[#0D7A7E] text-white shadow-xs'
                  : 'text-slate-600 hover:text-[#0F294A]'
              }`}
            >
              <BarChart3 className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>Phân tích WB &amp; IMF</span>
            </button>
          </div>

          {activeTab === 'photos' ? (
            <motion.div
              key={`photos-${activeCenter.id}`}
              initial={{ opacity: 0.4, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              data-testid="slide3-photos-panel"
              className="flex min-h-0 flex-1 flex-col gap-2"
            >
              <div className="shrink-0 border-b border-slate-100 pb-1.5">
                <div className="flex flex-wrap items-baseline justify-between gap-1.5">
                  <div className="flex flex-wrap items-baseline gap-x-1.5">
                    <h2 className="text-sm font-bold text-[#0F294A] lg:text-[15px]">
                      {activeCenter.city}
                    </h2>
                    <span aria-hidden="true" className="text-slate-300">
                      ·
                    </span>
                    <span className="text-xs font-semibold text-[#0D7A7E]">
                      {activeCenter.country}
                    </span>
                  </div>
                  <span className="font-mono-num shrink-0 text-xs font-semibold text-[#D97736]">
                    {activePhotos.length} ngành
                  </span>
                </div>
                <p className="mt-0.5 text-xs leading-snug text-slate-600">
                  {activeCenter.industries.join(', ')}.
                </p>
              </div>

              <div
                className={`grid gap-2 lg:min-h-0 lg:flex-1 ${
                  activePhotos.length <= 2
                    ? 'grid-cols-2 md:grid-cols-1 lg:grid-cols-2'
                    : 'grid-cols-2 lg:grid-rows-2'
                }`}
              >
                {activePhotos.slice(0, 4).map((photo) => (
                  <MediaImage
                    key={`${activeCenter.id}-${photo.key}`}
                    imageKey={photo.key}
                    showCaption
                    caption={photo.label}
                    className="aspect-[16/10] w-full rounded-lg lg:aspect-auto lg:h-full"
                    imgClassName="transition-transform duration-700 hover:scale-105"
                  />
                ))}
              </div>

              {/* Subtle 1-line WB & IMF teaser inviting instant switch */}
              <button
                type="button"
                onClick={() => setActiveTab('analysis')}
                className="flex shrink-0 items-center justify-between gap-2 rounded-lg border border-[#0D7A7E]/25 bg-[#EDF7F7] px-2.5 py-1.5 text-left text-[11px] font-medium text-[#0F294A] transition-colors hover:border-[#0D7A7E]/60"
              >
                <span className="truncate">
                  <strong className="text-[#0D7A7E]">WB &amp; IMF:</strong> FDI chuỗi cung ứng &amp; so sánh với ĐNA hải đảo
                </span>
                <span className="shrink-0 font-bold text-[#D97736]">Xem →</span>
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="mainland-analysis"
              initial={{ opacity: 0.4, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              data-testid="slide3-analysis-panel"
              className="flex min-h-0 flex-1 flex-col justify-between gap-2 overflow-y-auto pr-0.5"
            >
              {/* Điểm chung */}
              <div className="rounded-xl border border-[#0D7A7E]/25 bg-[#F2FAFA] p-2.5">
                <h2 className="text-xs font-bold uppercase tracking-wide text-[#0D7A7E]">
                  {analysis.regionTitle}
                </h2>
                <ul className="mt-1.5 space-y-1 text-[11.5px] leading-snug text-slate-700">
                  {analysis.commonalities.map((item, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0D7A7E]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Điểm khác biệt */}
              <div className="rounded-xl border border-[#D97736]/25 bg-[#FFF9F4] p-2.5">
                <h2 className="text-xs font-bold uppercase tracking-wide text-[#B85D1E]">
                  {analysis.comparisonTitle}
                </h2>
                <ul className="mt-1.5 space-y-1 text-[11.5px] leading-snug text-slate-700">
                  {analysis.differences.map((item, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D97736]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* World Bank WDI Benchmarks */}
              <div className="rounded-xl border border-slate-200/85 bg-slate-50/90 p-2">
                <div className="grid grid-cols-3 gap-1.5">
                  {analysis.benchmarks.map((bm) => (
                    <div
                      key={bm.country}
                      className="rounded-lg bg-white px-2 py-1.5 text-center shadow-2xs"
                    >
                      <div className="text-[11px] font-bold text-[#0F294A]">{bm.country}</div>
                      <div className="font-mono-num text-[11px] font-bold text-[#0D7A7E]">
                        {bm.manufacturingShareGdp}
                      </div>
                      <div className="mt-0.5 line-clamp-2 text-[9.5px] leading-tight text-slate-500">
                        {bm.highlight}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-1.5 text-[10px] leading-tight text-slate-500">
                  {analysis.sourceNote}
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* BOTTOM STRIP: 5 Mainland Countries Selector Cards */}
      <div className="mt-2.5 grid shrink-0 grid-cols-1 gap-2 sm:grid-cols-2 lg:mt-3 lg:grid-cols-5 lg:gap-2.5">
        {MAINLAND_COUNTRIES.map((group, idx) => {
          const centers = group.centerIds
            .map((id) => getCenterById(id))
            .filter((c): c is NonNullable<typeof c> => Boolean(c));
          const isCountryActive = group.centerIds.includes(activeCenterId);

          return (
            <motion.article
              key={group.country}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.35,
                delay: 0.08 + idx * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`flex flex-col rounded-xl border px-3 py-2 transition-colors ${
                isCountryActive
                  ? 'border-[#0D7A7E]/75 bg-white shadow-sm'
                  : 'border-slate-200/85 bg-white/85 hover:border-slate-300'
              }`}
            >
              <div className="flex items-baseline gap-1.5">
                <span className="font-mono-num text-[11px] font-bold text-[#0D7A7E]">
                  {group.order}.
                </span>
                <h3 className="text-xs font-bold text-[#0F294A] sm:text-[13px]">
                  {group.country}
                </h3>
              </div>

              <div className="mt-1 flex flex-col gap-1">
                {centers.map((center) => {
                  const isSelected = activeCenterId === center.id;
                  return (
                    <button
                      key={center.id}
                      type="button"
                      onClick={() => {
                        setActiveCenterId(center.id);
                        setActiveTab('photos');
                      }}
                      className={`group w-full rounded-md px-1.5 py-1 text-left text-[11.5px] leading-snug transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#0D7A7E] ${
                        isSelected
                          ? 'bg-[#0D7A7E]/12 text-[#0F294A]'
                          : 'text-slate-600 hover:bg-slate-100/80'
                      }`}
                    >
                      <span
                        className={`font-semibold ${
                          isSelected
                            ? 'text-[#D97736]'
                            : 'text-[#0F294A] group-hover:text-[#0D7A7E]'
                        }`}
                      >
                        {center.shortCity ?? center.city}:{' '}
                      </span>
                      <span>{center.industries.join(', ')}.</span>
                    </button>
                  );
                })}
              </div>
            </motion.article>
          );
        })}
      </div>

      {/* Mobile (< md): Always display full World Bank & IMF comparison card below countries for effortless reading */}
      <div className="mt-3 rounded-2xl border border-slate-200/90 bg-white p-3.5 shadow-xs md:hidden">
        <h2 className="text-xs font-bold uppercase tracking-wide text-[#0D7A7E]">
          {analysis.regionTitle}
        </h2>
        <ul className="mt-1.5 space-y-1 text-xs leading-relaxed text-slate-700">
          {analysis.commonalities.map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0D7A7E]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <h3 className="mt-3 text-xs font-bold uppercase tracking-wide text-[#B85D1E]">
          {analysis.comparisonTitle}
        </h3>
        <ul className="mt-1.5 space-y-1 text-xs leading-relaxed text-slate-700">
          {analysis.differences.map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D97736]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-3 grid grid-cols-3 gap-1.5">
          {analysis.benchmarks.map((bm) => (
            <div key={bm.country} className="rounded-lg bg-slate-50 p-2 text-center">
              <div className="text-[11px] font-bold text-[#0F294A]">{bm.country}</div>
              <div className="font-mono-num text-[11px] font-bold text-[#0D7A7E]">
                {bm.manufacturingShareGdp}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-2 text-[10.5px] text-slate-500">{analysis.sourceNote}</p>
      </div>
    </section>
  );
};
