import type { Product } from "@line-manager/types";

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "תספורת גברים",
    description:
      "תספורת מקצועית לגברים הכוללת שטיפה, גזירה ועיצוב. הספר שלנו יתאים את התספורת לצורת הפנים ולסגנון האישי שלך.",
    price: 80,
    category: "haircut",
    isFeatured: true,
    imageUrl: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&h=300&fit=crop",
  },
  {
    id: "2",
    name: "תספורת נשים",
    description:
      "תספורת מעוצבת לנשים עם ייעוץ אישי, שטיפה, גזירה ופן מקצועי. אנחנו מתמחים בכל סגנון — קצר, ארוך, שכבות ועוד.",
    price: 150,
    category: "haircut",
    imageUrl: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop",
  },
  {
    id: "3",
    name: "צביעת שיער מלאה",
    description:
      "צביעה מלאה בצבעים איכותיים ועמידים. כוללת ייעוץ צבע, ביצוע הצביעה, שטיפה וטיפול לאחר צביעה.",
    price: 350,
    category: "color",
    imageUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop",
  },
  {
    id: "4",
    name: "גוונים / הייליטס",
    description:
      "הבהרה חלקית או גוונים עדינים ליצירת מראה טבעי ורענן. מתאים למי שרוצה שינוי עדין עם אפקט מרשים.",
    price: 400,
    category: "color",
    imageUrl: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=400&h=300&fit=crop",
  },
  {
    id: "5",
    name: "עיצוב לאירוע",
    description:
      "עיצוב שיער מקצועי לאירועים מיוחדים — חתונות, בר/בת מצוות, מסיבות ועוד. כולל ייעוץ וביצוע תסרוקת מושלמת.",
    price: 250,
    category: "styling",
    imageUrl: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&h=300&fit=crop",
  },
  {
    id: "6",
    name: "החלקה ברזילאית",
    description:
      "טיפול החלקה עם קראטין ברזילאי איכותי. מחליק, מבריק ומשקם את השיער לתקופה ממושכת.",
    price: 600,
    category: "treatment",
    isFeatured: true,
    imageUrl: "https://images.unsplash.com/photo-1522338242992-e1a54571a6d8?w=400&h=300&fit=crop",
  },
  {
    id: "7",
    name: "טיפול שיקום שיער",
    description:
      "טיפול עומק לשיקום שיער פגום ויבש. משתמשים בחומרים מקצועיים שמחזירים לשיער לחות, ברק וחיוניות.",
    price: 200,
    category: "treatment",
    imageUrl: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=400&h=300&fit=crop",
  },
  {
    id: "8",
    name: "שמפו מקצועי",
    description:
      "שמפו איכותי לשימוש יומיומי. מנקה בעדינות, שומר על לחות טבעית ומתאים לכל סוגי השיער.",
    price: 75,
    category: "product",
    imageUrl: "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=400&h=300&fit=crop",
  },
  {
    id: "9",
    name: "מסכת שיער מזינה",
    description:
      "מסכה עשירה בויטמינים ושמנים טבעיים. מעניקה הזנה עמוקה ומשאירה את השיער רך ומבריק.",
    price: 95,
    category: "product",
    isFeatured: true,
    imageUrl: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=300&fit=crop",
  },
  {
    id: "10",
    name: "ספריי עיצוב",
    description:
      "ספריי עיצוב קל לאחיזה גמישה. מאפשר עיצוב טבעי ללא קשיחות, מתאים לשימוש יומיומי.",
    price: 65,
    category: "product",
    imageUrl: "https://images.unsplash.com/photo-1585751119414-ef2636f8aede?w=400&h=300&fit=crop",
  },
];

export const CATEGORY_LABELS: Record<string, string> = {
  all: "הכל",
  haircut: "תספורות",
  color: "צביעה",
  styling: "עיצוב",
  treatment: "טיפולים",
  product: "מוצרים",
};
