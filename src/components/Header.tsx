import React, { useState, useEffect } from 'react';
import { ActiveModuleTab } from '../types';
import { getCurrentUserProfile, SETTINGS_UPDATED_EVENT } from '../utils/settingsStorage';
import { useAuth } from '../context/AuthContext';
import {
  Menu,
  Calendar,
  Layers,
  Settings,
  Sparkles,
  Sun,
  Moon,
  Search,
  Bell,
  User,
  LogOut,
  ShieldCheck,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  activeTab: ActiveModuleTab;
  setActiveTab: (tab: ActiveModuleTab) => void;
  onToggleMobileSidebar: () => void;
  alertsCount?: number;
  onOpenAlertsModal?: () => void;
}

const TAB_TITLES: Record<ActiveModuleTab, { title: string; subtitle: string; icon: string }> = {
  dashboard: {
    title: 'اللوحة التحكم',
    subtitle: 'نظرة شاملة ولحظية على مؤشرات الأداء، الأرصدة المالية، والمخزون والمهام',
    icon: '📊',
  },
  financial: {
    title: 'ادارة السجل اليومي',
    subtitle: 'المطابقة المحاسبية الدقيقة للتدفقات النقدية والمصرفية وحسابات الصندوق',
    icon: '💳',
  },
  debts: {
    title: 'ادارة الديون والالتزامات',
    subtitle: 'تتبع الديون المستحقة لنا وعلينا، سجلات السداد، وجداول الأقساط',
    icon: '🪙',
  },
  stock: {
    title: 'ادارة صرف وتوريد',
    subtitle: 'مراقبة حركة المخزون، رصيد أول المدة، وحركات التوريد والصرف',
    icon: '📦',
  },
  tasks: {
    title: 'إدارة العمل',
    subtitle: 'متابعة المشاريع والمهام وأداء العمل',
    icon: '⚡',
  },
  taskflow: {
    title: 'إدارة العمل',
    subtitle: 'متابعة المشاريع والمهام وأداء العمل',
    icon: '⚡',
  },
  workos: {
    title: 'إدارة العمل',
    subtitle: 'متابعة المشاريع والمهام وأداء العمل',
    icon: '⚡',
  },
  customers: {
    title: 'ادارة العملاء وزيارات',
    subtitle: 'سجل العملاء، خطوط السير الأسبوعية، وتوثيق الزيارات والتحصيلات',
    icon: '👥',
  },
  doctors: {
    title: 'ادارة الاطباء وزيارات',
    subtitle: 'دليل الأطباء والمراكز، تتبع العينات المجانية، وتقييم خطط التغطية',
    icon: '🩺',
  },
  routines: {
    title: 'ادارة الروتين والعادات',
    subtitle: 'بناء الانضباط والالتزام اليومي والأسبوعي وتتبع سلاسل الإنجاز',
    icon: '🔥',
  },
  knowledge: {
    title: 'ادارة الملاحظات',
    subtitle: 'أرشفة التوجيهات الإدارية، محاضر الاجتماعات، والمسودات السريعة',
    icon: '📚',
  },
  custody: {
    title: 'ادارة العهد والاشكاليات',
    subtitle: 'متابعة وتوثيق العهد المالية والعينية، الفروقات المحاسبية، والتسويات',
    icon: '🛡️',
  },
  links: {
    title: 'مكتبة الروابط',
    subtitle: 'فهرس شامل لأدوات الذكاء الاصطناعي، مواقع العمل، المنصات، ومصادر الإنتاجية',
    icon: '🌐',
  },
  settings: {
    title: 'الاعدادات',
    subtitle: 'تصدير واستيراد قواعد البيانات الموحدة وإدارة النسخ الاحتياطي والأمان',
    icon: '⚙️',
  },
};

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onToggleMobileSidebar,
  alertsCount = 0,
  onOpenAlertsModal,
}) => {
  const { theme, toggleTheme, isDark } = useTheme();
  const { currentUser, logout } = useAuth();
  const currentTabMeta = TAB_TITLES[activeTab] || TAB_TITLES.dashboard;
  const [userProfile, setUserProfile] = useState(() => getCurrentUserProfile());

  useEffect(() => {
    const handleSettingsUpdate = () => {
      setUserProfile(getCurrentUserProfile());
    };
    window.addEventListener(SETTINGS_UPDATED_EVENT, handleSettingsUpdate);
    return () => window.removeEventListener(SETTINGS_UPDATED_EVENT, handleSettingsUpdate);
  }, []);

  const todayArabic = new Intl.DateTimeFormat('ar-SA-u-ca-gregory', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date());

  return (
    <header className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30 shadow-2xs transition-colors" dir="rtl">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5 flex items-center justify-between gap-3">
        {/* Right side: Mobile Menu Toggle + Search Bar */}
        <div className="flex items-center gap-2.5 min-w-0">
          {/* Mobile Right Sidebar Toggle */}
          <button
            onClick={onToggleMobileSidebar}
            className="flex lg:hidden items-center justify-center w-9 h-9 rounded-lg bg-[#0F3935] hover:bg-[#134E48] text-white transition-colors cursor-pointer shadow-xs shrink-0 border border-[#134E48]"
            title="فتح القائمة الجانبية"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Quick Search Field */}
          <div className="relative hidden sm:flex items-center w-48 md:w-56 lg:w-64">
            <input
              type="text"
              placeholder="بحث سريع... (Ctrl+K)"
              className="w-full bg-[#F3F4F6] dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg pr-3 pl-8 py-1.5 text-xs text-slate-700 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#0D9488] focus:border-[#0D9488] transition-all"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 absolute left-2.5 pointer-events-none" />
          </div>
        </div>

        {/* Center: Current Screen Title & Subtitle (في المنتصف تماماً) */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-100/80 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/70 shadow-2xs">
            <span className="text-base select-none">{currentTabMeta.icon}</span>
            <h1 className="text-xs sm:text-sm md:text-base font-black text-slate-900 dark:text-slate-100 tracking-tight">
              {currentTabMeta.title}
            </h1>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium hidden lg:block mt-0.5 max-w-sm truncate">
            {currentTabMeta.subtitle}
          </p>
        </div>

        {/* Left side: User Greeting + Notifications + Theme Toggle + Logout */}
        <div className="flex items-center gap-2 shrink-0">
          {/* User Greeting & Avatar Badge */}
          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700/80 transition-all cursor-pointer group shadow-2xs"
            title={`المستخدم الحالي: ${currentUser?.name || userProfile.name} (انقر لفتح الإعدادات)`}
          >
            <div className="w-7 h-7 rounded-lg bg-[#0D9488] text-white font-black text-xs flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform border border-emerald-400/30 shrink-0">
              {currentUser?.avatarInitial || userProfile.initial}
            </div>
            <div className="text-right hidden sm:block">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-100 block group-hover:text-[#0D9488] transition-colors leading-tight">
                مرحباً، {(currentUser?.name || userProfile.name).split(' ')[0]}
              </span>
              <span className="text-[10px] font-semibold text-[#0D9488] dark:text-teal-400 block leading-tight">
                {currentUser?.role === 'admin'
                  ? 'مدير النظام'
                  : currentUser?.role === 'accountant'
                  ? 'محاسب مالي'
                  : currentUser?.role === 'sales'
                  ? 'مندوب مبيعات'
                  : 'مستعرض'}
              </span>
            </div>
          </button>

          {/* Notification Bell with Dynamic Alerts */}
          <div className="relative">
            <button
              onClick={onOpenAlertsModal}
              className="flex items-center justify-center w-8 h-8 rounded-lg bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-[#0D9488] dark:hover:text-teal-400 hover:bg-slate-50 dark:hover:bg-slate-700/70 transition-all cursor-pointer border border-slate-200 dark:border-slate-700 shadow-2xs"
              title={`الإشعارات وتنبيهات المواعيد (${alertsCount} مستحقة)`}
              aria-label="تنبيهات المواعيد والاستحقاقات"
            >
              <Bell className="w-4 h-4" />
            </button>
            {alertsCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[17px] h-[17px] px-1 rounded-full bg-[#EF4444] text-white text-[10px] font-black flex items-center justify-center ring-2 ring-white dark:ring-slate-900 animate-in zoom-in">
                {alertsCount > 99 ? '99+' : alertsCount}
              </span>
            )}
          </div>

          {/* Theme Toggle Button (Light/Dark) */}
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-8 h-8 rounded-lg bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-[#0D9488] dark:hover:text-teal-400 hover:bg-slate-50 dark:hover:bg-slate-700/70 transition-all cursor-pointer border border-slate-200 dark:border-slate-700 shadow-2xs group"
            title={isDark ? 'التبديل إلى الوضع النهاري' : 'التبديل إلى الوضع الليلي'}
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-400 transition-transform group-hover:rotate-45" />
            ) : (
              <Moon className="w-4 h-4 text-slate-600 dark:text-slate-300 transition-transform group-hover:-rotate-12" />
            )}
          </button>

          {/* Coral Red Logout Button (#EF4444) */}
          <button
            type="button"
            onClick={logout}
            className="p-1.5 rounded-lg text-slate-400 dark:text-slate-500 hover:text-white hover:bg-[#EF4444] transition-colors cursor-pointer"
            title="تسجيل الخروج من المنظومة"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};

