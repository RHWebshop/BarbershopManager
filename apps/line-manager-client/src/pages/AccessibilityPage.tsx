export function AccessibilityPage() {
  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight">הצהרת נגישות</h1>
        <p className="text-lg text-muted-foreground">
          אנו פועלים להנגשת האתר לכלל האוכלוסייה, כולל אנשים עם מוגבלויות.
        </p>
      </div>

      {false && (
        <div className="space-y-10">
          <p>כאן יופיע תוכן הצהרת הנגישות המלא.</p>
        </div>
      )}
    </div>
  );
}
