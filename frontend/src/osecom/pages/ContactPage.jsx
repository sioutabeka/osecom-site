import { useMemo, useState } from "react";
import axios from "axios";
import { C } from "../lib/theme";
import { SITE } from "../config/site";

const NEEDS = [
  "Community Management",
  "Création UGC",
  "Stratégie digitale",
  "Audit réseaux sociaux",
  "Autre demande",
];

const BUDGETS = [
  "Moins de 500 €",
  "500 € – 1 500 €",
  "1 500 € – 3 000 €",
  "3 000 € +",
  "Pas encore défini",
];

const SLOTS = ["10:00", "11:30", "14:00", "15:30", "17:00"];

const STEPS = ["01 · Date", "02 · Vous", "03 · Confirmation"];

const INITIAL_DATA = {
  name: "",
  email: "",
  businessName: "",
  website: "",
  budget: "",
  service: "",
  date: "",
  project: "",
};

export default function ContactPage() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState(INITIAL_DATA);
  const setField = (key, value) => setData((d) => ({ ...d, [key]: value }));

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Calendar state
  const today = new Date();
  const [calMonth, setCalMonth] = useState(today.getMonth());
  const [calYear, setCalYear] = useState(today.getFullYear());
  const [pickedDay, setPickedDay] = useState(null);
  const [pickedSlot, setPickedSlot] = useState(null);

  const monthDays = useMemo(() => buildMonthDays(calYear, calMonth), [calYear, calMonth]);
  const monthName = new Date(calYear, calMonth).toLocaleString("fr-FR", {
    month: "long",
    year: "numeric",
  });

  function prevMonth() {
    if (calMonth === 0) {
      setCalMonth(11);
      setCalYear((y) => y - 1);
    } else setCalMonth((m) => m - 1);
  }

  function nextMonth() {
    if (calMonth === 11) {
      setCalMonth(0);
      setCalYear((y) => y + 1);
    } else setCalMonth((m) => m + 1);
  }

  const isPast = (d) => isPastDay(d, calYear, calMonth);
  const isWeekend = (d) => isWeekendDay(d, calYear, calMonth);

  function resetForm() {
    setStep(0);
    setPickedDay(null);
    setPickedSlot(null);
    setData(INITIAL_DATA);
  }

  async function submit() {
    if (!data.name || !data.email || !data.service || !data.project) {
      setErrorMsg(
        "Merci de remplir les champs obligatoires (nom, email, besoin, message)."
      );
      return;
    }
    setSubmitting(true);
    setErrorMsg("");
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const res = await axios.post(`${API_URL}/api/contact`, data);
      if (res.data?.success) {
        setStep(2);
      } else {
        setErrorMsg(res.data?.message || "Une erreur est survenue.");
      }
    } catch (err) {
      console.error("Contact submit error:", err);
      setErrorMsg(`Erreur serveur. Veuillez réessayer ou écrire à ${SITE.email}.`);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="page page--contact">
      <section className="ct">
        <ContactInfo />

        <div className="ct__right">
          <Stepper step={step} />

          {step === 0 && (
            <DateStep
              monthName={monthName}
              monthDays={monthDays}
              calMonth={calMonth}
              pickedDay={pickedDay}
              pickedSlot={pickedSlot}
              onPrevMonth={prevMonth}
              onNextMonth={nextMonth}
              onPickDay={setPickedDay}
              onPickSlot={setPickedSlot}
              isPast={isPast}
              isWeekend={isWeekend}
              onContinue={() => {
                setField("date", `${pickedDay}/${calMonth + 1} · ${pickedSlot}`);
                setStep(1);
              }}
            />
          )}

          {step === 1 && (
            <DetailsStep
              data={data}
              setField={setField}
              submitting={submitting}
              errorMsg={errorMsg}
              onBack={() => setStep(0)}
              onSubmit={submit}
            />
          )}

          {step === 2 && <Confirmation data={data} onRestart={resetForm} />}
        </div>
      </section>
    </main>
  );
}

function ContactInfo() {
  return (
    <div className="ct__left">
      <span className="mono">BOOK A CALL · 30 MIN · FREE</span>
      <h1>Parlons de votre projet.</h1>
      <p>
        Un appel de 30 minutes pour cerner vos enjeux et voir si on est faits
        pour collaborer.
      </p>

      <div className="ct__meta">
        <MetaRow label="FORMAT" value="Visio · Google Meet" />
        <MetaRow label="DURÉE" value="30 minutes" />
        <MetaRow label="TARIF" value="Gratuit · sans engagement" />
        <MetaRow label="POUR" value="Marques, entreprises, startups" />
      </div>

      <div className="ct__contact">
        <span className="mono">OR REACH OUT</span>
        <a className="ct__mail" href={SITE.emailHref}>
          {SITE.email}
        </a>
      </div>
    </div>
  );
}

function MetaRow({ label, value }) {
  return (
    <div className="ct__meta-row">
      <span className="mono">{label}</span>
      <span>{value}</span>
    </div>
  );
}

function Stepper({ step }) {
  return (
    <div className="ct__steps">
      {STEPS.map((label, i) => (
        <span
          key={label}
          className={
            "ct__step " +
            (i === step ? "is-active" : i < step ? "is-done" : "")
          }
        >
          {label}
        </span>
      ))}
    </div>
  );
}

function DateStep({
  monthName,
  monthDays,
  calMonth,
  pickedDay,
  pickedSlot,
  onPrevMonth,
  onNextMonth,
  onPickDay,
  onPickSlot,
  isPast,
  isWeekend,
  onContinue,
}) {
  const canContinue = pickedDay && pickedSlot;
  return (
    <div className="ct__panel ct__panel--cal">
      <div className="cal__head">
        <button className="cal__nav" onClick={onPrevMonth}>‹</button>
        <span className="cal__title">{monthName}</span>
        <button className="cal__nav" onClick={onNextMonth}>›</button>
      </div>
      <div className="cal__grid cal__grid--head">
        {["L", "M", "M", "J", "V", "S", "D"].map((d, i) => (
          <span key={i}>{d}</span>
        ))}
      </div>
      <div className="cal__grid">
        {monthDays.map((d, i) => (
          <button
            key={i}
            disabled={!d || isPast(d) || isWeekend(d)}
            className={"cal__day " + (pickedDay === d ? "is-picked" : "")}
            onClick={() => onPickDay(d)}
          >
            {d || ""}
          </button>
        ))}
      </div>

      {pickedDay && (
        <div className="cal__slots">
          <span className="mono">
            CRÉNEAUX DISPONIBLES · {pickedDay}/{calMonth + 1}
          </span>
          <div className="cal__slot-row">
            {SLOTS.map((s) => (
              <button
                key={s}
                className={"slot " + (pickedSlot === s ? "is-picked" : "")}
                onClick={() => onPickSlot(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="ct__panel-foot">
        <span />
        <button
          className="btn btn--brown"
          disabled={!canContinue}
          onClick={onContinue}
        >
          Continuer
        </button>
      </div>
    </div>
  );
}

function DetailsStep({ data, setField, submitting, errorMsg, onBack, onSubmit }) {
  const canSubmit =
    !submitting && data.name && data.email && data.service && data.project;
  return (
    <div className="ct__panel">
      <Field label="NOM *">
        <input
          value={data.name}
          onChange={(e) => setField("name", e.target.value)}
          placeholder="Votre nom"
        />
      </Field>
      <Field label="EMAIL *">
        <input
          type="email"
          value={data.email}
          onChange={(e) => setField("email", e.target.value)}
          placeholder="nom@bonjour.com"
        />
      </Field>
      <Field label="MARQUE / ENTREPRISE">
        <input
          value={data.businessName}
          onChange={(e) => setField("businessName", e.target.value)}
          placeholder="Nom de votre marque"
        />
      </Field>
      <Field label="SITE / INSTAGRAM">
        <input
          value={data.website}
          onChange={(e) => setField("website", e.target.value)}
          placeholder="https://votresite.com"
        />
      </Field>
      <ChipField
        label="BESOIN PRINCIPAL *"
        options={NEEDS}
        selected={data.service}
        onSelect={(v) => setField("service", v)}
      />
      <ChipField
        label="BUDGET ESTIMÉ"
        options={BUDGETS}
        selected={data.budget}
        onSelect={(v) => setField("budget", v)}
      />
      <Field label="DÉCRIVEZ VOTRE BESOIN *">
        <textarea
          rows={4}
          value={data.project}
          onChange={(e) => setField("project", e.target.value)}
          placeholder="Expliquez-moi votre situation actuelle, vos objectifs et ce que vous attendez concrètement."
        />
      </Field>
      {errorMsg && <p className="ct__error">{errorMsg}</p>}
      <div className="ct__panel-foot">
        <button
          type="button"
          className="btn btn--ghost"
          onClick={onBack}
          disabled={submitting}
        >
          Retour
        </button>
        <button
          type="button"
          className="btn btn--olive"
          disabled={!canSubmit}
          onClick={onSubmit}
        >
          {submitting ? "Envoi en cours…" : "Confirmer le RDV"}
        </button>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div className="field">
      <label className="mono">{label}</label>
      {children}
    </div>
  );
}

function ChipField({ label, options, selected, onSelect }) {
  return (
    <Field label={label}>
      <div className="chip-row">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            className={"chip " + (selected === opt ? "is-on" : "")}
            onClick={() => onSelect(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
    </Field>
  );
}

function Confirmation({ data, onRestart }) {
  return (
    <div className="ct__panel ct__panel--confirm">
      <svg viewBox="0 0 60 60" width="60" height="60" className="confirm__mark">
        <circle cx="30" cy="30" r="26" fill="none" stroke={C.olive} strokeWidth="2.5" />
        <path
          d="M 18 31 L 27 40 L 44 22"
          fill="none"
          stroke={C.olive}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <h3>Demande envoyée.</h3>
      <p>
        Merci {data.name || "à vous"} — je vous reviens très vite pour caler le
        RDV du <strong>{data.date}</strong>.
      </p>
      <p className="mono">Récapitulatif</p>
      <ul className="confirm__list">
        <li>
          <span className="mono">EMAIL</span> {data.email}
        </li>
        {data.businessName && (
          <li>
            <span className="mono">MARQUE</span> {data.businessName}
          </li>
        )}
        {data.service && (
          <li>
            <span className="mono">BESOIN</span> {data.service}
          </li>
        )}
        {data.budget && (
          <li>
            <span className="mono">BUDGET</span> {data.budget}
          </li>
        )}
      </ul>
      <button className="btn btn--ghost" onClick={onRestart}>
        Nouvelle demande
      </button>
    </div>
  );
}

// ────────── pure helpers ──────────

function buildMonthDays(year, month) {
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const offset = (first.getDay() + 6) % 7; // Monday-first
  const days = [];
  for (let i = 0; i < offset; i++) days.push(null);
  for (let d = 1; d <= last.getDate(); d++) days.push(d);
  return days;
}

function isPastDay(d, year, month) {
  if (!d) return true;
  const date = new Date(year, month, d);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
}

function isWeekendDay(d, year, month) {
  if (!d) return false;
  const wd = new Date(year, month, d).getDay();
  return wd === 0 || wd === 6;
}
