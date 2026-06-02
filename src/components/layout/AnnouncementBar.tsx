import Link from "next/link";

export function AnnouncementBar() {
  return (
    <div className="bg-brand text-white py-2 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-4 text-sm font-body">
        <span className="flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5 text-sand flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3 3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
          </svg>
          Envío incluido a todo el país
        </span>
        <span className="text-sage/60" aria-hidden="true">·</span>
        <Link
          href="/registro"
          className="flex items-center gap-1.5 hover:text-sand transition-colors duration-150"
        >
          <svg className="w-3.5 h-3.5 text-sand flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
          </svg>
          Registrate y obtené <strong>10% OFF</strong>
        </Link>
      </div>
    </div>
  );
}
