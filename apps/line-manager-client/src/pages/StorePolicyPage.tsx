export function StorePolicyPage() {
  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight">מדיניות החנות</h1>
        <p className="text-lg text-muted-foreground">
          כאן תוכלו למצוא מידע על תנאי הרכישה, ביטולים, החזרות ומשלוחים.
        </p>
      </div>

      {false && (
        <div className="space-y-10">
          <p>כאן יופיעו תנאי השימוש ומדיניות החנות המלאה.</p>
        </div>
      )}
    </div>
  );
}
