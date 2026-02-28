export function PrivacyPage() {
  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight">מדיניות פרטיות</h1>
        <p className="text-lg text-muted-foreground">
          אנו שומרים על פרטיות המשתמשים שלנו ומחויבים להגנה על המידע האישי שלהם.
        </p>
      </div>

      {false && (
        <div className="space-y-10">
          <p>כאן יופיע פירוט מדיניות הפרטיות.</p>
        </div>
      )}
    </div>
  );
}
