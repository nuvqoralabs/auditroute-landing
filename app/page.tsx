"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  ClipboardCheck,
  Fuel,
  Gauge,
  Menu,
  Navigation,
  Phone,
  ReceiptText,
  Route,
  ShieldCheck,
  Sparkles,
  TrendingDown,
  X,
  XCircle,
  Zap,
} from "lucide-react";

const mxn = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0,
});

const SAVINGS_RATE = 0.12;
const MONTHLY_PRICE_PER_VEHICLE = 349;

const comparisonRows = [
  {
    label: "Costo por vehículo",
    audit: "Desde $349 MXN / mes",
    gps: "$700–$1,500 MXN / mes",
  },
  {
    label: "Instalación física",
    audit: "No requiere",
    gps: "Técnico, cableado y equipo",
  },
  {
    label: "Contratos forzosos",
    audit: "Cancela cuando quieras",
    gps: "Frecuentemente 12–36 meses",
  },
  {
    label: "Facilidad de uso",
    audit: "Listo desde el celular",
    gps: "Plataforma y hardware adicional",
  },
  {
    label: "Tiempo de implementación",
    audit: "Hasta 48 horas",
    gps: "Depende de agenda e instalación",
  },
  {
    label: "Hardware adicional",
    audit: "Ninguno",
    gps: "Dispositivo instalado por unidad",
  },
];

const steps = [
  {
    icon: Phone,
    number: "01",
    title: "Tu chofer registra",
    text: "Carga odómetro y ticket desde su celular en menos de 60 segundos.",
  },
  {
    icon: ClipboardCheck,
    number: "02",
    title: "AuditRoute valida",
    text: "Cruza kilometraje, litros, costo y ruta para señalar inconsistencias.",
  },
  {
    icon: BarChart3,
    number: "03",
    title: "Tú tomas acción",
    text: "Detecta patrones, corrige fugas y comprueba el ahorro de cada unidad.",
  },
];

function Logo() {
  return (
    <a href="#inicio" className="flex items-center gap-2.5" aria-label="AuditRoute, inicio">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald text-white shadow-lg shadow-emerald/20">
        <Route size={20} strokeWidth={2.6} />
      </span>
      <span className="text-lg font-extrabold tracking-[-0.03em] text-white">
        Audit<span className="text-emerald">Route</span>
      </span>
    </a>
  );
}

function PrimaryButton({
  children,
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`group inline-flex items-center justify-center gap-2 rounded-xl bg-emerald px-6 py-4 text-sm font-extrabold text-ink shadow-glow transition duration-200 hover:-translate-y-0.5 hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald ${className}`}
    >
      {children}
      <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
    </button>
  );
}

function DashboardPreview() {
  return (
    <div className="relative mx-auto w-full max-w-[560px] lg:mx-0">
      <div className="absolute -inset-8 rounded-full bg-emerald/10 blur-3xl" />
      <div className="relative overflow-hidden rounded-[28px] border border-white/15 bg-white p-3 shadow-[0_35px_100px_rgba(0,0,0,0.36)] sm:p-4">
        <div className="rounded-[20px] bg-[#F4F8FB] p-4 sm:p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Resumen mensual</p>
              <p className="mt-1 text-lg font-extrabold text-ink">Control de flota</p>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald" /> En línea
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-ink p-4 text-white">
              <div className="mb-6 flex items-center justify-between">
                <span className="text-xs text-white/55">Gasto validado</span>
                <Fuel size={17} className="text-emerald" />
              </div>
              <p className="number-tabular text-2xl font-black tracking-tight">$38,420</p>
              <p className="mt-1 text-[11px] text-white/45">MXN · octubre</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="mb-6 flex items-center justify-between">
                <span className="text-xs text-slate-500">Ahorro detectado</span>
                <TrendingDown size={17} className="text-emerald" />
              </div>
              <p className="number-tabular text-2xl font-black tracking-tight text-ink">$6,180</p>
              <p className="mt-1 text-[11px] font-semibold text-emerald-600">−13.9% este mes</p>
            </div>
          </div>

          <div className="mt-3 rounded-2xl border border-slate-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-extrabold text-ink">Alertas por revisar</p>
                <p className="mt-0.5 text-xs text-slate-400">Actividad de las últimas 24 h</p>
              </div>
              <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-black text-amber-600">3 nuevas</span>
            </div>
            <div className="mt-4 space-y-3">
              {[
                ["Nissan NP300 · 04", "Kilometraje atípico", "Hace 12 min"],
                ["Ford Transit · 02", "Ticket duplicado", "Hace 2 h"],
              ].map(([unit, alert, time], index) => (
                <div key={unit} className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                  <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${index === 0 ? "bg-amber-100 text-amber-600" : "bg-rose-100 text-rose-600"}`}>
                    {index === 0 ? <Gauge size={17} /> : <ReceiptText size={17} />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-extrabold text-ink">{unit}</p>
                    <p className="truncate text-[11px] text-slate-500">{alert}</p>
                  </div>
                  <span className="hidden text-[10px] text-slate-400 sm:block">{time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-7 -left-3 hidden items-center gap-3 rounded-2xl border border-slate-100 bg-white p-3 pr-5 shadow-soft sm:flex lg:-left-10">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
          <ShieldCheck size={21} />
        </span>
        <div>
          <p className="text-xs font-black text-ink">Sin hardware</p>
          <p className="text-[11px] text-slate-400">Activo en 48 horas</p>
        </div>
      </div>
    </div>
  );
}

function RoiCalculator({ compact = false }: { compact?: boolean }) {
  const [vehicles, setVehicles] = useState(5);
  const [spend, setSpend] = useState(9000);
  const monthlySavings = useMemo(
    () => vehicles * spend * SAVINGS_RATE,
    [vehicles, spend],
  );
  const annualSavings = monthlySavings * 12;
  const investment = vehicles * MONTHLY_PRICE_PER_VEHICLE;
  const netSavings = Math.max(0, monthlySavings - investment);

  return (
    <div className={compact ? "" : "grid items-stretch gap-8 lg:grid-cols-[1.05fr_.95fr] lg:gap-10"}>
      <div className={compact ? "" : "rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft sm:p-8"}>
        {!compact && (
          <div className="mb-8 flex items-start justify-between gap-4">
            <div>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-emerald-600">Tus números</span>
              <h3 className="mt-2 text-2xl font-black tracking-[-0.04em] text-ink">Calcula tu fuga invisible</h3>
            </div>
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-emerald-50 text-emerald-600">
              <CircleDollarSign size={23} />
            </span>
          </div>
        )}

        <div className="space-y-8">
          <div>
            <div className="mb-4 flex items-end justify-between gap-4">
              <label htmlFor={compact ? "modal-vehicles" : "vehicles"} className="text-sm font-bold text-slate-600">
                Número de vehículos
              </label>
              <output className="number-tabular text-2xl font-black text-ink">{vehicles}</output>
            </div>
            <input
              id={compact ? "modal-vehicles" : "vehicles"}
              className="range-input"
              style={{ "--progress": `${((vehicles - 1) / 9) * 100}%` } as React.CSSProperties}
              type="range"
              min="1"
              max="10"
              value={vehicles}
              onChange={(event) => setVehicles(Number(event.target.value))}
              aria-valuetext={`${vehicles} vehículos`}
            />
            <div className="mt-2 flex justify-between text-[11px] font-semibold text-slate-400">
              <span>1 vehículo</span>
              <span>10 vehículos</span>
            </div>
          </div>

          <div>
            <div className="mb-4 flex items-end justify-between gap-4">
              <label htmlFor={compact ? "modal-spend" : "spend"} className="max-w-[220px] text-sm font-bold leading-snug text-slate-600">
                Gasto promedio mensual por vehículo
              </label>
              <output className="number-tabular text-right text-xl font-black text-ink sm:text-2xl">{mxn.format(spend)}</output>
            </div>
            <input
              id={compact ? "modal-spend" : "spend"}
              className="range-input"
              style={{ "--progress": `${((spend - 3000) / 27000) * 100}%` } as React.CSSProperties}
              type="range"
              min="3000"
              max="30000"
              step="500"
              value={spend}
              onChange={(event) => setSpend(Number(event.target.value))}
              aria-valuetext={`${mxn.format(spend)} al mes por vehículo`}
            />
            <div className="mt-2 flex justify-between text-[11px] font-semibold text-slate-400">
              <span>$3,000</span>
              <span>$30,000</span>
            </div>
          </div>
        </div>

        {!compact && (
          <p className="mt-8 border-t border-slate-100 pt-5 text-xs leading-relaxed text-slate-400">
            Estimación ilustrativa basada en un potencial de optimización del 12%. El ahorro real puede variar según la operación de tu flota.
          </p>
        )}
      </div>

      <div className={`${compact ? "mt-7" : ""} relative overflow-hidden rounded-[28px] bg-ink p-6 text-white sm:p-8`}>
        <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-emerald/15 blur-3xl" />
        <div className="relative">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.17em] text-emerald-300">
            <Sparkles size={15} /> Tu oportunidad de ahorro
          </div>
          <p className="mt-7 text-sm text-white/55">Ahorro estimado mensual:</p>
          <p className="number-tabular mt-1 text-4xl font-black tracking-[-0.05em] text-white sm:text-5xl">
            {mxn.format(monthlySavings)} <span className="text-base tracking-normal text-white/45">MXN</span>
          </p>
          <p className="mt-2 text-sm font-semibold text-emerald-300">{mxn.format(annualSavings)} potenciales al año</p>

          <div className="my-7 h-px bg-white/10" />

          <dl className="space-y-3 text-sm">
            <div className="flex items-center justify-between gap-4">
              <dt className="text-white/50">Gasto mensual de flota</dt>
              <dd className="number-tabular font-bold">{mxn.format(vehicles * spend)}</dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-white/50">Inversión en AuditRoute</dt>
              <dd className="number-tabular font-bold">{mxn.format(investment)}</dd>
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-3">
              <dt className="font-semibold text-white/75">Beneficio neto estimado</dt>
              <dd className="number-tabular font-black text-emerald-300">{mxn.format(netSavings)}</dd>
            </div>
          </dl>

          <a
            href="#precio"
            className="group mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-black text-ink transition hover:bg-emerald-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Quiero capturar este ahorro <ChevronRight size={17} className="transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </div>
  );
}

function SavingsChart() {
  return (
    <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.055] p-5 sm:p-7">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-white/45">Gasto semanal en combustible</p>
          <p className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">De $38,600 a $30,700</p>
        </div>
        <div className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald/10 px-3 py-2 text-xs font-black text-emerald-300">
          <TrendingDown size={15} /> −20.5% en 60 días
        </div>
      </div>

      <div className="mt-7 overflow-x-auto" role="img" aria-label="Gráfica ilustrativa que muestra una reducción del gasto de combustible de 38,600 a 30,700 pesos en 60 días">
        <svg viewBox="0 0 640 250" className="min-w-[540px]" aria-hidden="true">
          <defs>
            <linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[36, 86, 136, 186].map((y) => (
            <line key={y} x1="34" x2="615" y1={y} y2={y} stroke="white" strokeOpacity="0.08" strokeDasharray="4 7" />
          ))}
          <path d="M35,45 C95,51 130,62 175,78 S260,90 312,116 S404,132 456,154 S540,170 610,196 L610,224 L35,224 Z" fill="url(#chartFill)" />
          <path className="chart-line" d="M35,45 C95,51 130,62 175,78 S260,90 312,116 S404,132 456,154 S540,170 610,196" fill="none" stroke="#34D399" strokeWidth="4" strokeLinecap="round" />
          {[
            [35, 45],
            [175, 78],
            [312, 116],
            [456, 154],
            [610, 196],
          ].map(([x, y]) => (
            <g key={`${x}-${y}`}>
              <circle cx={x} cy={y} r="7" fill="#07182B" stroke="#34D399" strokeWidth="3" />
            </g>
          ))}
          {[
            [35, "Día 1"],
            [175, "Día 15"],
            [312, "Día 30"],
            [456, "Día 45"],
            [610, "Día 60"],
          ].map(([x, label]) => (
            <text key={label} x={x} y="244" textAnchor={x === 35 ? "start" : x === 610 ? "end" : "middle"} fill="white" fillOpacity="0.38" fontSize="11" fontWeight="600">
              {label}
            </text>
          ))}
        </svg>
      </div>
    </div>
  );
}

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = modalOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalOpen]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setModalOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <main>
      <section id="inicio" className="relative overflow-hidden bg-ink pb-24 pt-5 text-white sm:pb-32">
        <div className="hero-grid pointer-events-none absolute inset-0 opacity-50" />
        <div className="hero-glow pointer-events-none absolute -right-32 top-20 h-[520px] w-[520px]" />

        <nav className="container-shell relative z-20 flex h-16 items-center justify-between" aria-label="Navegación principal">
          <Logo />
          <div className="hidden items-center gap-7 md:flex">
            <a href="#como-funciona" className="text-sm font-semibold text-white/65 transition hover:text-white">Cómo funciona</a>
            <a href="#calculadora" className="text-sm font-semibold text-white/65 transition hover:text-white">Calculadora</a>
            <a href="#comparativa" className="text-sm font-semibold text-white/65 transition hover:text-white">Comparativa</a>
            <a href="#precio" className="text-sm font-semibold text-white/65 transition hover:text-white">Precio</a>
          </div>
          <button onClick={() => setModalOpen(true)} className="hidden rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-extrabold text-white backdrop-blur transition hover:bg-white/15 md:block">
            Calcular ahorro
          </button>
          <button onClick={() => setMenuOpen((value) => !value)} className="grid h-10 w-10 place-items-center rounded-lg border border-white/15 md:hidden" aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"} aria-expanded={menuOpen}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>

        {menuOpen && (
          <div className="container-shell relative z-20 mt-2 rounded-2xl border border-white/10 bg-[#0D2A46] p-3 md:hidden">
            {[['Cómo funciona', '#como-funciona'], ['Calculadora', '#calculadora'], ['Comparativa', '#comparativa'], ['Precio', '#precio']].map(([label, href]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)} className="block rounded-xl px-4 py-3 text-sm font-bold text-white/75 hover:bg-white/5 hover:text-white">{label}</a>
            ))}
          </div>
        )}

        <div className="container-shell relative z-10 grid items-center gap-16 pt-16 lg:grid-cols-[1.02fr_.98fr] lg:gap-12 lg:pt-24">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-2 text-xs font-extrabold text-emerald-200">
              <Zap size={14} fill="currentColor" /> Control operativo para flotillas de 1 a 10 vehículos
            </div>
            <h1 className="mt-7 max-w-[720px] text-[42px] font-black leading-[1.04] tracking-[-0.055em] text-white sm:text-6xl lg:text-[66px]">
              Elimina las fugas de combustible y desvíos en tu flota <span className="text-emerald-300">sin instalar GPS caros.</span>
            </h1>
            <p className="mt-7 max-w-[620px] text-base font-medium leading-7 text-white/62 sm:text-lg sm:leading-8">
              Control de odómetro, tickets y kilometraje con solo el celular de tus choferes. Empieza a ahorrar en 48 horas.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <PrimaryButton onClick={() => setModalOpen(true)} className="w-full sm:w-auto">
                Calcular cuánto dinero está perdiendo mi flota
              </PrimaryButton>
              <a href="#como-funciona" className="inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-extrabold text-white/75 transition hover:text-white">
                Ver cómo funciona <ChevronRight size={17} />
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-xs font-bold text-white/50">
              <span className="flex items-center gap-2"><CheckCircle2 size={15} className="text-emerald-300" /> Sin instalación</span>
              <span className="flex items-center gap-2"><CheckCircle2 size={15} className="text-emerald-300" /> Sin plazo forzoso</span>
              <span className="flex items-center gap-2"><CheckCircle2 size={15} className="text-emerald-300" /> Soporte en español</span>
            </div>
          </div>

          <DashboardPreview />
        </div>
      </section>

      <section className="border-b border-slate-100 bg-white py-7">
        <div className="container-shell flex flex-col items-center justify-between gap-5 sm:flex-row">
          <p className="text-center text-xs font-extrabold uppercase tracking-[0.18em] text-slate-400 sm:text-left">Una operación más clara desde el primer día</p>
          <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-sm font-black text-slate-500 sm:justify-end">
            <span className="flex items-center gap-2"><Fuel size={17} className="text-emerald-500" /> Combustible</span>
            <span className="flex items-center gap-2"><ReceiptText size={17} className="text-emerald-500" /> Tickets</span>
            <span className="flex items-center gap-2"><Navigation size={17} className="text-emerald-500" /> Rutas</span>
            <span className="flex items-center gap-2"><Gauge size={17} className="text-emerald-500" /> Odómetro</span>
          </div>
        </div>
      </section>

      <section id="como-funciona" className="bg-mist py-24 sm:py-32">
        <div className="container-shell">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-emerald-600">Control sin complicaciones</span>
            <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] text-ink sm:text-5xl">De tickets sueltos a decisiones claras.</h2>
            <p className="mt-5 text-base leading-7 text-slate-500">Tres pasos sencillos para saber cuánto gasta cada unidad, dónde se desvía y qué debes corregir.</p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {steps.map((step, index) => (
              <article key={step.number} className="group relative overflow-hidden rounded-[24px] border border-slate-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:shadow-soft">
                <div className="flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-50 text-emerald-600 transition group-hover:bg-emerald group-hover:text-white">
                    <step.icon size={23} />
                  </span>
                  <span className="text-4xl font-black tracking-[-0.05em] text-slate-100">{step.number}</span>
                </div>
                <h3 className="mt-8 text-xl font-black tracking-[-0.03em] text-ink">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-500">{step.text}</p>
                {index < steps.length - 1 && <ArrowRight className="absolute -right-4 top-1/2 hidden text-slate-300 md:block" size={24} />}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="calculadora" className="bg-white py-24 sm:py-32">
        <div className="container-shell">
          <div className="mb-12 max-w-3xl">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-emerald-600">Calculadora ROI</span>
            <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] text-ink sm:text-5xl">Ponle un número a lo que hoy no ves.</h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-500">Ajusta el tamaño y gasto de tu flotilla. Verás una estimación inmediata del ahorro que una operación más controlada puede liberar.</p>
          </div>
          <RoiCalculator />
        </div>
      </section>

      <section id="comparativa" className="bg-mist py-24 sm:py-32">
        <div className="container-shell">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-emerald-600">Menos fricción, más control</span>
            <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] text-ink sm:text-5xl">El control de flota ya no necesita hardware costoso.</h2>
          </div>

          <div className="mt-14 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-soft">
            <div className="grid grid-cols-[1.1fr_.95fr_.95fr] border-b border-slate-200 bg-slate-50 text-xs font-black uppercase tracking-[0.12em] text-slate-400 sm:text-sm">
              <div className="p-4 sm:p-6">Comparativa</div>
              <div className="border-l border-slate-200 bg-emerald-50 p-4 text-emerald-700 sm:p-6">AuditRoute</div>
              <div className="border-l border-slate-200 p-4 sm:p-6">GPS tradicional</div>
            </div>
            {comparisonRows.map((row) => (
              <div key={row.label} className="grid grid-cols-[1.1fr_.95fr_.95fr] border-b border-slate-100 last:border-0">
                <div className="p-4 text-xs font-extrabold text-ink sm:p-6 sm:text-sm">{row.label}</div>
                <div className="flex gap-2 border-l border-slate-100 bg-emerald-50/55 p-4 text-xs font-bold leading-5 text-emerald-800 sm:p-6 sm:text-sm">
                  <Check size={17} className="mt-0.5 shrink-0 text-emerald-500" strokeWidth={3} />
                  <span>{row.audit}</span>
                </div>
                <div className="flex gap-2 border-l border-slate-100 p-4 text-xs font-semibold leading-5 text-slate-500 sm:p-6 sm:text-sm">
                  <XCircle size={17} className="mt-0.5 shrink-0 text-slate-300" />
                  <span>{row.gps}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-xs text-slate-400">Los rangos de GPS son referencias generales de mercado y pueden variar por proveedor.</p>
        </div>
      </section>

      <section className="overflow-hidden bg-ink py-24 sm:py-32">
        <div className="container-shell grid items-center gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/7 px-3 py-2 text-xs font-black uppercase tracking-[0.17em] text-emerald-300">
              <BadgeCheck size={15} /> Caso ilustrativo · datos simulados
            </span>
            <h2 className="mt-6 text-3xl font-black tracking-[-0.045em] text-white sm:text-5xl">Una paquetería local recupera el control en 60 días.</h2>
            <p className="mt-5 text-base leading-7 text-white/55">El escenario modela una operación de 7 camionetas que sustituyó el control manual de tickets por validaciones diarias de odómetro y rendimiento.</p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-3xl font-black tracking-tight text-emerald-300">7</p>
                <p className="mt-1 text-xs font-semibold text-white/45">unidades monitoreadas</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-3xl font-black tracking-tight text-emerald-300">4.2×</p>
                <p className="mt-1 text-xs font-semibold text-white/45">retorno estimado</p>
              </div>
            </div>
          </div>
          <SavingsChart />
        </div>
      </section>

      <section id="precio" className="bg-white py-24 sm:py-32">
        <div className="container-shell">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-emerald-600">Precio simple</span>
            <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] text-ink sm:text-5xl">Paga por unidad. Ahorra desde la primera.</h2>
            <p className="mt-5 text-base leading-7 text-slate-500">Sin instalación, sin equipo en comodato y sin letra pequeña.</p>
          </div>

          <div className="relative mx-auto mt-14 max-w-xl overflow-hidden rounded-[30px] border-2 border-emerald bg-white p-7 shadow-soft sm:p-10">
            <div className="absolute right-0 top-0 rounded-bl-2xl bg-emerald px-5 py-2 text-xs font-black text-ink">IDEAL PARA 1–10 VEHÍCULOS</div>
            <div className="mt-7 flex items-end gap-2 sm:mt-2">
              <span className="number-tabular text-6xl font-black tracking-[-0.06em] text-ink">$349</span>
              <span className="pb-2 text-sm font-bold text-slate-400">MXN / vehículo / mes</span>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-500">Todo lo que una flotilla pequeña necesita para controlar gasto y kilometraje.</p>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                "Control de odómetro",
                "Registro de tickets",
                "Alertas por inconsistencias",
                "Reporte por unidad",
                "Usuarios de chofer incluidos",
                "Soporte en español",
              ].map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-sm font-bold text-slate-600">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-50 text-emerald-600"><Check size={14} strokeWidth={3} /></span>
                  {feature}
                </li>
              ))}
            </ul>

            <PrimaryButton onClick={() => setModalOpen(true)} className="mt-9 w-full">
              Calcular mi ahorro ahora
            </PrimaryButton>
            <p className="mt-4 text-center text-xs font-semibold text-slate-400">Cancela cuando quieras · Sin costo de instalación</p>
          </div>
        </div>
      </section>

      <section className="px-3 pb-3 sm:px-5 sm:pb-5">
        <div className="relative overflow-hidden rounded-[28px] bg-emerald px-6 py-16 text-center sm:px-10 sm:py-20">
          <div className="absolute -left-20 -top-28 h-72 w-72 rounded-full border-[55px] border-white/15" />
          <div className="absolute -bottom-32 -right-20 h-80 w-80 rounded-full border-[65px] border-ink/10" />
          <div className="relative mx-auto max-w-3xl">
            <h2 className="text-3xl font-black tracking-[-0.05em] text-ink sm:text-5xl">Cada mes sin control también tiene un costo.</h2>
            <p className="mx-auto mt-5 max-w-xl text-base font-semibold leading-7 text-ink/65">Descubre en menos de un minuto cuánto podrías recuperar con AuditRoute.</p>
            <button onClick={() => setModalOpen(true)} className="group mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-7 py-4 text-sm font-black text-white shadow-xl transition hover:-translate-y-0.5 hover:bg-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink">
              Calcular el ahorro de mi flota <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>

      <footer className="bg-white py-10">
        <div className="container-shell flex flex-col items-center justify-between gap-5 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-ink text-emerald"><Route size={18} /></span>
            <span className="font-extrabold tracking-[-0.03em] text-ink">Audit<span className="text-emerald-600">Route</span></span>
          </div>
          <p className="text-center text-xs text-slate-400">© 2026 AuditRoute. Control inteligente para pequeñas flotillas.</p>
          <a href="mailto:hola@auditroute.mx" className="text-xs font-extrabold text-ink hover:text-emerald-600">hola@auditroute.mx</a>
        </div>
      </footer>

      {modalOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-ink/75 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="roi-modal-title" onMouseDown={(event) => {
          if (event.currentTarget === event.target) setModalOpen(false);
        }}>
          <div className="relative my-6 w-full max-w-xl rounded-[28px] bg-white p-6 shadow-2xl sm:p-8">
            <button autoFocus onClick={() => setModalOpen(false)} className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200 hover:text-ink" aria-label="Cerrar calculadora">
              <X size={19} />
            </button>
            <span className="text-xs font-black uppercase tracking-[0.18em] text-emerald-600">Calculadora rápida</span>
            <h2 id="roi-modal-title" className="mt-3 pr-12 text-3xl font-black tracking-[-0.045em] text-ink">¿Cuánto podría ahorrar tu flota?</h2>
            <p className="mt-3 mb-7 text-sm leading-6 text-slate-500">Ajusta tus datos para obtener una estimación instantánea.</p>
            <RoiCalculator compact />
          </div>
        </div>
      )}
    </main>
  );
}
