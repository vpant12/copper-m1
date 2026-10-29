import Image from "next/image";

// Night Sky in both themes, so it always uses the Desert Sand logo.
export function SiteFooter() {
  return (
    <footer
      data-testid="site-footer"
      className="border-t border-white/10 bg-[#1c2333] text-[#efe3d0]"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-4 py-10 sm:flex-row sm:items-center sm:justify-between">
        <Image
          src="/brand/logo-dark.png"
          alt="Copper State Labs"
          width={1200}
          height={197}
          className="h-auto w-36"
        />
        <p className="text-sm opacity-80">Fictional — for educational use.</p>
      </div>
    </footer>
  );
}
