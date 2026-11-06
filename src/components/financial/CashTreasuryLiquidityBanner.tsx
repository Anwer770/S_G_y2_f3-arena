import React, { useState } from 'react';
import {
  Wallet,
  ArrowDownLeft,
  ArrowUpRight,
  Plus,
  Eye,
  X,
  CheckCircle2,
  Building2,
} from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

interface CashTreasuryLiquidityBannerProps {
  balance?: number;
  currency?: string;
  onOpenReceipt?: () => void;
  onOpenPayment?: () => void;
  onOpenJournal?: () => void;
  onAddTreasury?: (name: string, balance: number, currency: string) => void;
}

export const CashTreasuryLiquidityBanner: React.FC<CashTreasuryLiquidityBannerProps> = ({
  balance = 52000,
  currency = 'YER',
  onOpenReceipt,
  onOpenPayment,
  onOpenJournal,
  onAddTreasury,
}) => {
  const [isAddTreasuryModalOpen, setIsAddTreasuryModalOpen] = useState(false);
  const [treasuryName, setTreasuryName] = useState('');
  const [treasuryType, setTreasuryType] = useState('صندوق مباشر');
  const [initialBalance, setInitialBalance] = useState<number | ''>('');
  const [treasuryCurrency, setTreasuryCurrency] = useState('YER');
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const handleCreateTreasury = (e: React.FormEvent) => {
    e.preventDefault();
    if (!treasuryName.trim()) return;

    if (onAddTreasury) {
      onAddTreasury(
        treasuryName.trim(),
        typeof initialBalance === 'number' ? initialBalance : 0,
        treasuryCurrency
      );
    }
    setShowSuccessToast(true);
    setTimeout(() => {
      setShowSuccessToast(false);
      setIsAddTreasuryModalOpen(false);
      setTreasuryName('');
      setInitialBalance('');
    }, 900);
  };

  return (
    <>
      {/* 
        اللوحة الملكية: شريط إجمالي رصيد الخزينة والسيولة النقدية المتاحة
        مطابق تماماً للتصميم المرفق بالصورة (Screenshot Image 1)
      */}
      <div
        className="w-full bg-gradient-to-r from-[#2563EB] via-[#2563EB] to-[#1D4ED8] text-white rounded-2xl p-4 sm:p-5 shadow-lg shadow-blue-600/20 border border-blue-400/30 flex flex-col lg:flex-row items-center justify-between gap-4 select-none transition-all"
        dir="rtl"
      >
        {/* Right Section (Start in RTL): Wallet Icon + Titles + Big Balance */}
        <div className="flex items-center gap-3.5 sm:gap-4 w-full lg:w-auto justify-between lg:justify-start">
          {/* Wallet Icon Box */}
          <div className="w-13 h-13 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center text-white shrink-0 shadow-inner">
            <Wallet className="w-7 h-7 text-white stroke-[2.2]" />
          </div>

          {/* Titles & Numbers */}
          <div className="text-right space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm sm:text-base font-bold text-white tracking-wide">
                إجمالي رصيد الخزينة والسيولة النقدية المتاحة
              </span>
              <span className="px-3 py-0.5 rounded-full bg-white/20 text-white text-xs font-semibold backdrop-blur-xs border border-white/20 shadow-2xs">
                حسابات الصندوق المباشرة
              </span>
            </div>

            <div className="flex items-baseline gap-2 font-mono">
              <span className="text-xs sm:text-sm font-bold text-blue-100 uppercase">
                {currency}
              </span>
              <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {formatCurrency(balance)}
              </span>
            </div>
          </div>
        </div>

        {/* Left Section: 4 Distinct Action Buttons (Emerald, Red, Blue, Amber) */}
        <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap w-full lg:w-auto justify-start lg:justify-end">
          {/* 1. + إيداع / سند قبض (أخضر زمردي #0D9488 / #059669) */}
          <button
            type="button"
            onClick={onOpenReceipt}
            className="flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-[#0D9488] hover:bg-[#0F766E] text-white font-bold text-xs sm:text-sm shadow-sm hover:shadow transition-all active:scale-95 cursor-pointer shrink-0"
            title="إنشاء وتوثيق سند قبض / إيداع نقدي مباشر"
          >
            <ArrowDownLeft className="w-4 h-4 stroke-[2.5]" />
            <span>+ إيداع / سند قبض</span>
          </button>

          {/* 2. - سحب / سند صرف (أحمر مرجاني #EF4444) */}
          <button
            type="button"
            onClick={onOpenPayment}
            className="flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-[#EF4444] hover:bg-[#DC2626] text-white font-bold text-xs sm:text-sm shadow-sm hover:shadow transition-all active:scale-95 cursor-pointer shrink-0"
            title="إنشاء وتوثيق سند صرف / سحب نقدي مباشر"
          >
            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            <span>- سحب / سند صرف</span>
          </button>

          {/* 3. + خزينة جديدة (أزرق ملكي شبه شفاف) */}
          <button
            type="button"
            onClick={() => setIsAddTreasuryModalOpen(true)}
            className="flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs sm:text-sm border border-white/30 shadow-sm hover:shadow transition-all active:scale-95 cursor-pointer shrink-0"
            title="إضافة خزينة فرعية، صندوق كاش، أو حساب مصرفي جديد"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>+ خزينة جديدة</span>
          </button>

          {/* 4. دفتر اليومية (كهرماني / ذهبي #D97706) */}
          <button
            type="button"
            onClick={onOpenJournal}
            className="flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-[#D97706] hover:bg-[#B45309] text-white font-bold text-xs sm:text-sm shadow-sm hover:shadow transition-all active:scale-95 cursor-pointer shrink-0"
            title="عرض واستعراض دفتر اليومية وسجل القيود المحاسبية"
          >
            <Eye className="w-4 h-4 stroke-[2.5]" />
            <span>دفتر اليومية</span>
          </button>
        </div>
      </div>

      {/* Modal: إضافة خزينة أو صندوق جديد */}
      {isAddTreasuryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div
            className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-md border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden"
            dir="rtl"
          >
            <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                    إضافة خزينة أو صندوق نقدي جديد
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    تهيئة محفظة أو حساب صندوق جديد للنظام
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsAddTreasuryModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTreasury} className="p-5 space-y-4">
              {showSuccessToast && (
                <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>تم إضافة الخزينة بنجاح إلى سجل الصناديق والحسابات!</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  اسم الخزينة / الصندوق <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="مثال: الخزينة الرئيسية، صندوق كاش الوردية..."
                  value={treasuryName}
                  onChange={(e) => setTreasuryName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    نوع الخزينة
                  </label>
                  <select
                    value={treasuryType}
                    onChange={(e) => setTreasuryType(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="صندوق مباشر">صندوق مباشر</option>
                    <option value="خزينة فرعية">خزينة فرعية</option>
                    <option value="محفظة كاش">محفظة كاش</option>
                    <option value="حساب مصرفي">حساب مصرفي / بنك</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    العملة الأساسية
                  </label>
                  <select
                    value={treasuryCurrency}
                    onChange={(e) => setTreasuryCurrency(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="YER">ريال يمني (YER)</option>
                    <option value="SAR">ريال سعودي (SAR)</option>
                    <option value="USD">دولار أمريكي (USD)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  الرصيد الافتتاحي (اختياري)
                </label>
                <input
                  type="number"
                  placeholder="0.00"
                  value={initialBalance}
                  onChange={(e) =>
                    setInitialBalance(e.target.value === '' ? '' : Number(e.target.value))
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-mono font-semibold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddTreasuryModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black shadow-sm transition active:scale-95 cursor-pointer"
                >
                  حفظ الخزينة الجديدة
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
