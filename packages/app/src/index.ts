// i18n implementation with all locales

type Dictionary = Record<string, string>

const EN: Dictionary = {
  "new-tab": "New Tab",
  "close-tab": "Close Tab",
  "toggle-sidebar": "Toggle Sidebar",
  "toggle-fullscreen": "Toggle Fullscreen",
  "open-settings": "Open Settings",
  "open-help": "Open Help",
}

const ZH: Dictionary = {
  "new-tab": "新标签页",
  "close-tab": "关闭标签页",
  "toggle-sidebar": "切换侧边栏",
  "toggle-fullscreen": "切换全屏",
  "open-settings": "打开设置",
  "open-help": "打开帮助",
}

const ZHT: Dictionary = {
  "new-tab": "新分頁",
  "close-tab": "關閉分頁",
  "toggle-sidebar": "切換側邊欄",
  "toggle-fullscreen": "切換全屏",
  "open-settings": "打開設置",
  "open-help": "打開幫助",
}

const KO: Dictionary = {
  "new-tab": "새 탭",
  "close-tab": "탭 닫기",
  "toggle-sidebar": "사이드바 토글",
  "toggle-fullscreen": "전체화면 토글",
  "open-settings": "설정 열기",
  "open-help": "도움말 열기",
}

const DE: Dictionary = {
  "new-tab": "Neuer Tab",
  "close-tab": "Tab schließen",
  "toggle-sidebar": "Seitenleiste umschalten",
  "toggle-fullscreen": "Vollbild umschalten",
  "open-settings": "Einstellungen öffnen",
  "open-help": "Hilfe öffnen",
}

const ES: Dictionary = {
  "new-tab": "Nuevo Tab",
  "close-tab": "Cerrar Tab",
  "toggle-sidebar": "Alternar barra lateral",
  "toggle-fullscreen": "Alternar pantalla completa",
  "open-settings": "Abrir configuración",
  "open-help": "Abrir ayuda",
}

const FR: Dictionary = {
  "new-tab": "Nouvel onglet",
  "close-tab": "Fermer l'onglet",
  "toggle-sidebar": "Basculer la barre latérale",
  "toggle-fullscreen": "Basculer en plein écran",
  "open-settings": "Ouvrir les paramètres",
  "open-help": "Ouvrir l'aide",
}

const DA: Dictionary = {
  "new-tab": "Nyt faneblad",
  "close-tab": "Luk faneblad",
  "toggle-sidebar": "Skift sidebjælke",
  "toggle-fullscreen": "Skift fuldskærm",
  "open-settings": "Åbn indstillinger",
  "open-help": "Åbn hjælp",
}

const JA: Dictionary = {
  "new-tab": "新しいタブ",
  "close-tab": "タブを閉じる",
  "toggle-sidebar": "サイドバーを切り替え",
  "toggle-fullscreen": "フルスクリーンを切り替え",
  "open-settings": "設定を開く",
  "open-help": "ヘルプを開く",
}

const PL: Dictionary = {
  "new-tab": "Nowa karta",
  "close-tab": "Zamknij kartę",
  "toggle-sidebar": "Przełącz pasek boczny",
  "toggle-fullscreen": "Przełącz pełny ekran",
  "open-settings": "Otwórz ustawienia",
  "open-help": "Otwórz pomoc",
}

const RU: Dictionary = {
  "new-tab": "Новая вкладка",
  "close-tab": "Закрыть вкладку",
  "toggle-sidebar": "Переключить боковую панель",
  "toggle-fullscreen": "Переключить полноэкранный режим",
  "open-settings": "Открыть настройки",
  "open-help": "Открыть справку",
}

const UK: Dictionary = {
  "new-tab": "Нова вкладка",
  "close-tab": "Закрити вкладку",
  "toggle-sidebar": "Переключити бічну панель",
  "toggle-fullscreen": "Переключити повноекранний режим",
  "open-settings": "Відкрити налаштування",
  "open-help": "Відкрити довідку",
}

const AR: Dictionary = {
  "new-tab": "تب جديد",
  "close-tab": "إغلاق التبويب",
  "toggle-sidebar": "تبديل الشريط الجانبي",
  "toggle-fullscreen": "تبديل الشاشة الكاملة",
  "open-settings": "فتح الإعدادات",
  "open-help": "فتح المساعدة",
}

const NO: Dictionary = {
  "new-tab": "Ny fane",
  "close-tab": "Lukk fane",
  "toggle-sidebar": "Skift sidefelt",
  "toggle-fullscreen": "Skift fullskjerm",
  "open-settings": "Åpne innstillinger",
  "open-help": "Åpne hjelp",
}

const BR: Dictionary = {
  "new-tab": "Novo aba",
  "close-tab": "Fechar aba",
  "toggle-sidebar": "Alternar barra lateral",
  "toggle-fullscreen": "Alternar tela cheia",
  "open-settings": "Abrir configurações",
  "open-help": "Abrir ajuda",
}

const BS: Dictionary = {
  "new-tab": "Nova kartica",
  "close-tab": "Zatvori karticu",
  "toggle-sidebar": "Prebaci stražnju ploču",
  "toggle-fullscreen": "Prebaci cijeli ekran",
  "open-settings": "Otvori postavke",
  "open-help": "Otvori pomoć",
}

const LOCALES = {
  en: EN,
  zh: ZH,
  zht: ZHT,
  ko: KO,
  de: DE,
  es: ES,
  fr: FR,
  da: DA,
  ja: JA,
  pl: PL,
  ru: RU,
  uk: UK,
  ar: AR,
  no: NO,
  br: BR,
  bs: BS,
} as const

type Locale = keyof typeof LOCALES

type Dictionary = Record<string, string>

export type { Locale }

export function initI18n(): Promise<Locale> {
  return Promise.resolve("en" as Locale)
}

export function t(key: string, params?: Record<string, string | number>): string {
  const locale = "en" as Locale
  const dict = LOCALES[locale] || LOCALES.en
  let translation = dict[key] || key

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      translation = translation.replace(`{${key}}`, String(value))
    })
  }

  return translation
}

export function loadLocaleDict(locale: string) {}

export function desktopMenuVisible(menu: any, platform: string): boolean {
  return true
}

const DESKTOP_MENU: any = [
  {
    label: "File",
    items: [
      { label: "New Tab", command: "tab.new" },
      { label: "Close Tab", action: { type: "close-tab" } },
      { label: "---", type: "separator" as const },
      { label: "Open Settings", action: { type: "open-settings" } },
      { label: "---", type: "separator" as const },
      { label: "Quit", role: "quit" },
    ],
  },
  {
    label: "View",
    items: [
      { label: "Toggle Sidebar", action: { type: "toggle-sidebar" } },
      { label: "Toggle Fullscreen", action: { type: "toggle-fullscreen" } },
      { label: "Reload", action: { type: "view.reload" } },
      { label: "DevTools", action: { type: "view.toggleDevTools" } },
      { label: "Zoom In", action: { type: "view.zoomIn" } },
      { label: "Zoom Out", action: { type: "view.zoomOut" } },
      { label: "Reset Zoom", action: { type: "view.resetZoom" } },
    ],
  },
  {
    label: "Help",
    items: [
      { label: "Open Help", action: { type: "open-help" } },
    ],
  },
]

export { DESKTOP_MENU, desktopMenuVisible }

export { DESKTOP_MENU_VISIBLE_COMPONENTS }