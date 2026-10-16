/**
 * Pantalla de inicio de sesión de Fiadoma, copiada de la app real (lib/features/auth/presentation/views/login_view.dart):
 * mismos colores (AppColors), marca, lema y campos. No inventa datos de clientes.
 */
export function FiadomaPhone({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`overflow-hidden rounded-[1.4rem] border-[6px] border-carbon bg-carbon shadow-[6px_6px_0_var(--color-violeta)] ${className}`}
    >
      <div className="relative flex aspect-[9/19] flex-col items-center overflow-hidden rounded-[0.9rem] bg-[#fafaf5] px-[9%] pt-[16%] text-[#1a1208]">
        {/* Brillo durazno de arriba, como en la app */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-[radial-gradient(ellipse_at_top,#ffd4a366,transparent_70%)]" />
        <span className="absolute left-1/2 top-[2.5%] h-[2.2%] w-[30%] -translate-x-1/2 rounded-full bg-carbon" />

        <span className="relative grid aspect-square w-[30%] place-items-center rounded-[32%] bg-[#ff6b1a] shadow-[0_8px_18px_rgb(255_107_26/0.38)]">
          <svg viewBox="0 0 24 24" className="size-1/2" fill="none" stroke="#fff" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9.5 4.5 4h15L21 9.5M3 9.5h18M3 9.5a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0M5 12.5V20h14v-7.5M10 20v-4.5h4V20" />
          </svg>
        </span>
        <span className="relative mt-[6%] text-[clamp(0.8rem,1.6vw,1.05rem)] font-extrabold tracking-tight">fiadoma</span>
        <span className="relative mt-[3%] text-center text-[clamp(0.45rem,0.85vw,0.6rem)] leading-tight text-[#6b5e4f]">
          Controla tus fiados, cuida tu negocio
        </span>

        <div className="relative mt-[12%] flex w-full flex-col gap-[6%]">
          {["Correo electrónico", "Contraseña"].map((label) => (
            <span
              key={label}
              className="block rounded-[0.45rem] border border-[#efe4d6] bg-white px-[8%] py-[7%] text-[clamp(0.42rem,0.8vw,0.56rem)] text-[#6b5e4f]"
            >
              {label}
            </span>
          ))}
          <span className="mt-[4%] block rounded-full bg-[#ff6b1a] py-[8%] text-center text-[clamp(0.45rem,0.85vw,0.6rem)] font-bold text-white shadow-[0_6px_14px_rgb(255_107_26/0.35)]">
            Iniciar sesión
          </span>
        </div>
        <span className="relative mt-[10%] text-[clamp(0.4rem,0.75vw,0.52rem)] text-[#6b5e4f]">
          ¿No tienes cuenta? <b className="text-[#ff6b1a]">Regístrate</b>
        </span>
      </div>
    </div>
  );
}
