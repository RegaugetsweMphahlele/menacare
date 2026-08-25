/*
 * MenaCare — Soft Orbit product experience
 * An empathetic companion app: generous white space, tactile floating assets,
 * youth-friendly copy, and a grounded Deep Blue information hierarchy.
 */
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Backpack,
  Bell,
  BookOpen,
  Brain,
  CalendarDays,
  Check,
  ChevronRight,
  CircleHelp,
  CircleUserRound,
  Droplets,
  Flower2,
  GraduationCap,
  Heart,
  HeartHandshake,
  Home as HomeIcon,
  LockKeyhole,
  MapPin,
  MessageCircle,
  Moon,
  Navigation,
  Phone,
  Plus,
  Send,
  ShieldCheck,
  Smile,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { MapView } from "@/components/Map";

type Screen = "landing" | "onboarding" | "app";
type View = "home" | "track" | "learn" | "pads" | "chat" | "support" | "profile";
type Message = { sender: "bot" | "user"; text: string };

const assets = {
  mark: "/manus-storage/menacare-butterfly-mark-no-star_94ff0096.png",
  primaryLogo: "/manus-storage/Primary-logo1_ed2f0176.png",
  hero: "/manus-storage/menacare-hero-orbit-no-stars_8cd2773e.png",
  resource: "/manus-storage/menacare-resource-access-no-stars_9e3eebc1.png",
  learning: "/manus-storage/menacare-learning-garden-no-stars_2b132367.png",
  youngWoman: "/manus-storage/hero-woman_3dc44d85.jpg",
  bot: "/manus-storage/mena-bot_bf6b7b2c.png",
  backpack: "/manus-storage/backpack_ba45b31d.png",
  journey: "/manus-storage/WhatsAppImage2026-08-15at11.05.20_1b3d98bd.jpeg",
};

const navItems: { id: View; label: string; Icon: typeof HomeIcon }[] = [
  { id: "home", label: "Home", Icon: HomeIcon },
  { id: "track", label: "Track", Icon: CalendarDays },
  { id: "learn", label: "Learn", Icon: BookOpen },
  { id: "pads", label: "Get pads", Icon: MapPin },
  { id: "chat", label: "Ask Mena", Icon: MessageCircle },
  { id: "support", label: "Support", Icon: CircleHelp },
  { id: "profile", label: "Profile", Icon: CircleUserRound },
];

const lessonTopics = [
  ["Starting your period", "The simple things to expect before, during, and after.", Flower2],
  ["Understanding your cycle", "Learn what the different days in your cycle can mean.", CalendarDays],
  ["Symptoms & how to manage", "Gentle ideas for cramps, bloating, and everyday comfort.", Heart],
  ["Period products 101", "Pads, tampons, cups, and how to choose what feels right.", Backpack],
  ["Sexual & reproductive health", "Clear, respectful information about consent and care.", ShieldCheck],
  ["When to get help", "Know the signs that deserve a trusted adult or health worker.", HeartHandshake],
] as const;

const symptomOptions = ["Cramps", "Back pain", "Bloating", "Headache", "Mood swings", "Tiredness", "Acne", "Nausea"];
const moodOptions = ["Good", "Okay", "Uncomfortable", "Not great"];

function Brand({ light = false }: { light?: boolean }) {
  return (
    <a className="brand" href="#top" aria-label="MenaCare home">
      <span className="brand-mark"><img src={assets.mark} alt="MenaCare butterfly" /></span>
      <span className="brand-word">Mena<span>Care</span></span>
      {light ? null : <span className="sr-only">Because Her Future Shouldn't Pause</span>}
    </a>
  );
}

function AppNavigation({ view, setView }: { view: View; setView: (view: View) => void }) {
  return (
    <>
      <aside className="app-sidebar" aria-label="Primary app navigation">
        <Brand />
        <nav className="app-nav">
          {navItems.map(({ id, label, Icon }) => (
            <button key={id} className={view === id ? "active" : ""} onClick={() => setView(id)}>
              <Icon aria-hidden="true" /> {label}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <strong>Need a little help?</strong>
          <p>You do not have to figure it all out alone.</p>
          <button className="mc-button small pink" onClick={() => setView("support")}>Find support <ArrowRight size={14} /></button>
        </div>
      </aside>
      <nav className="mobile-nav" aria-label="Mobile app navigation">
        {navItems.slice(0, 5).map(({ id, label, Icon }) => (
          <button key={id} className={view === id ? "active" : ""} onClick={() => setView(id)}>
            <Icon size={18} aria-hidden="true" /><span>{label}</span>
          </button>
        ))}
      </nav>
    </>
  );
}

function Landing({ onEnter, hasOnboarded }: { onEnter: () => void; hasOnboarded: boolean }) {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const featureIcons = [CalendarDays, BookOpen, MessageCircle];
  const programRows: [string, string, LucideIcon][] = [
    ["First period onboarding", "A gentle, no-pressure place to begin.", Heart],
    ["Cycle tracking", "Spot patterns and log what you feel.", CalendarDays],
    ["Ask Mena", "Private, supportive answers when you need them.", MessageCircle],
    ["Learn & grow", "Clear lessons built for real questions.", BookOpen],
    ["Get pads", "Find local care and request help quickly.", MapPin],
    ["Help & support", "Reach a trusted adult or a support option.", HeartHandshake],
  ];
  return (
    <div id="top" className="mc-app">
      <header className="landing-header">
        <Brand />
        <nav className="landing-links" aria-label="Landing page navigation">
          <a href="#why">Why MenaCare</a><a href="#how">How it works</a><a href="#journey">Inside the app</a>
        </nav>
        <button className="mc-button small" onClick={onEnter}>{hasOnboarded ? "Open my space" : "Get started"} <ArrowRight size={14} /></button>
      </header>

      <main>
        <section className="hero">
          <div className="hero-grid">
            <div>
              <span className="mc-eyebrow"><Heart size={14} /> A softer way to learn your rhythm</span>
              <h1 className="mc-display">Your body. <br />Your journey. <br /><strong>We’re here for you.</strong></h1>
              <p className="mc-copy" style={{ maxWidth: 490 }}>MenaCare helps you understand your cycle, ask the questions on your mind, and find care when you need it—at your pace.</p>
              <div className="hero-actions">
                <button className="mc-button pink" onClick={onEnter}>{hasOnboarded ? "Continue my journey" : "Start with MenaCare"} <ArrowRight size={16} /></button>
                <button className="mc-button ghost" onClick={() => scrollTo("why")}>Take a look <ChevronRight size={15} /></button>
              </div>
              <p className="hero-note"><LockKeyhole size={13} /> Private by design. Built with care.</p>
            </div>
            <div className="hero-visual" aria-label="Illustration of a young person supported by MenaCare">
              <div className="hero-orb" />
              <img className="hero-illustration" src={assets.hero} alt="Young person supported by menstrual health resources" />
              <span className="orbit-dot a" /><span className="orbit-dot b" /><span className="orbit-dot c" />
              <div className="orb-card one"><span className="orb-icon"><CalendarDays size={16} /></span><span>Know your cycle<br /><small>one day at a time</small></span></div>
              <div className="orb-card two"><span className="orb-icon"><Heart size={16} /></span><span>Care that listens<br /><small>no judgment, ever</small></span></div>
              <div className="orb-card three"><span className="orb-icon"><MessageCircle size={16} /></span><span>Ask what’s on<br /><small>your mind</small></span></div>
            </div>
          </div>
        </section>

        <div className="landing-ribbon"><span className="ribbon-sparkle"><Heart size={20} /></span><div><strong>Because her future shouldn’t pause.</strong><p>Health information and support should feel clear, kind, and close at hand.</p></div></div>

        <section id="why" className="landing-section">
          <div className="section-intro"><span className="mc-kicker">A caring toolkit</span><h2 className="mc-display">Three ways to feel more sure of yourself.</h2><p className="mc-copy">A private little corner of the internet for information, check-ins, and practical help—without overwhelming you.</p></div>
          <div className="feature-three">
            {["Track", "Learn", "Ask"].map((title, index) => {
              const Icon = featureIcons[index];
              const copy = ["Notice your cycle, moods, and symptoms in a calm calendar.", "Build confidence with kind, bite-sized health lessons.", "Talk through questions with Mena, your supportive AI guide."][index];
              return <article key={title}><span className="feature-number"><Icon size={20} /></span><h3>{title}</h3><p>{copy}</p>{index === 0 ? <img className="feature-flair" src={assets.backpack} alt="" /> : <span className="feature-heart-flair"><Heart size={33} fill="currentColor" strokeWidth={1.2} /></span>}</article>;
            })}
          </div>
        </section>

        <section className="landing-section program-layout">
          <div className="program-art"><img src={assets.resource} alt="Friendly resources for menstrual health care" /></div>
          <div><span className="mc-kicker">Everything in one caring place</span><h2 className="mc-display" style={{ margin: ".65rem 0 .8rem", fontSize: "clamp(2.2rem, 4vw, 3.7rem)", lineHeight: ".94" }}>The support you need—right when you need it.</h2><p className="mc-copy">Start somewhere simple. MenaCare keeps the next step clear, whether you are learning about your first period, looking for pads, or reaching out for help.</p>
            <div className="program-list">{programRows.map(([title, copy, Icon]) => <button key={title} onClick={onEnter}><span className="list-icon"><Icon size={17} /></span><span>{title}<small>{copy}</small></span><ChevronRight size={16} /></button>)}</div>
          </div>
        </section>

        <section id="how" className="how-band"><div className="landing-section"><div className="section-intro"><span className="mc-kicker">How it works</span><h2 className="mc-display">A confident next step can be a small one.</h2></div><div className="how-steps"><article className="how-step"><span className="how-count">01</span><h3>Tell us what brings you here</h3><p>Choose the kind of support that feels most useful today.</p></article><article className="how-step"><span className="how-count">02</span><h3>Make it yours</h3><p>Share only the basics so your space can feel personal.</p></article><article className="how-step"><span className="how-count">03</span><h3>Find your rhythm</h3><p>Track, learn, ask, and return whenever you need to.</p></article></div></div></section>

        <section id="journey" className="landing-section journey-section"><div><span className="mc-kicker">A look inside</span><h2 className="mc-display" style={{ margin: ".65rem 0 .8rem", fontSize: "clamp(2.2rem, 4vw, 3.7rem)", lineHeight: ".94" }}>Thoughtfully designed for every part of the journey.</h2><p className="mc-copy">The app stays simple when you are in a hurry and supportive when you need time. Each space keeps helpful actions close by.</p><div className="journey-points"><div><Check size={17} /> First period onboarding that feels gentle, not scary</div><div><Check size={17} /> Cycle, mood, and symptom tracking that is easy to revisit</div><div><Check size={17} /> Learning and support that is always judgment-free</div></div><button className="mc-button" style={{ marginTop: "1.3rem" }} onClick={onEnter}>See my MenaCare space <ArrowRight size={15} /></button></div><div className="journey-art"><img src={assets.journey} alt="MenaCare onboarding, tracking, chat, learning, and support interface previews" /></div></section>

        <section className="final-cta"><div><span className="mc-kicker">A safe place to start</span><h2 className="mc-display">Your questions deserve kind answers.</h2><p className="mc-copy">Make space for your health, your voice, and your future. We’ll take it one step at a time.</p><button className="mc-button blue" style={{ marginTop: "1.3rem" }} onClick={onEnter}>Get started with MenaCare <ArrowRight size={16} /></button></div></section>
      </main>
      <footer className="landing-footer"><div className="footer-inner"><div><Brand light /><p className="footer-copy">Because her future shouldn’t pause. MenaCare provides general educational support and is not a replacement for a health professional in an emergency.</p></div><div className="footer-links"><button onClick={() => scrollTo("why")}>About MenaCare</button><button onClick={onEnter}>Explore the app</button><button onClick={() => scrollTo("top")}>Back to top</button></div></div></footer>
    </div>
  );
}

function Onboarding({ onComplete, onBack }: { onComplete: (name: string, ageGroup: string, firstPeriod: string) => void; onBack: () => void }) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [ageGroup, setAgeGroup] = useState("");
  const [firstPeriod, setFirstPeriod] = useState("");
  const next = () => { if (step === 2) onComplete(name.trim() || "friend", ageGroup, firstPeriod); else setStep(current => current + 1); };
  const valid = step === 0 || (step === 1 && Boolean(ageGroup)) || (step === 2 && Boolean(firstPeriod));
  return <div className="onboarding"><aside className="onboarding-aside"><button style={{ background: "transparent", padding: 0, textAlign: "left" }} onClick={onBack}><Brand light /></button><div><p className="mc-kicker" style={{ color: "#FF99D8" }}>Your MenaCare space</p><h1 className="mc-display">Here to help you feel more like yourself.</h1><p>A private corner for the questions, changes, and everyday moments that matter.</p></div><div className="onboarding-quote">“Because her future shouldn’t pause.”</div></aside><main className="onboarding-main"><section className="onboarding-panel"><div className="stepper" aria-label={`Step ${step + 1} of 3`}><span className="active" /><span className={step > 0 ? "active" : ""} /><span className={step > 1 ? "active" : ""} /></div>
    {step === 0 && <><span className="mc-eyebrow"><Heart size={14} /> You are in the right place</span><h2 className="mc-display">Let’s make this feel a little easier.</h2><p className="mc-copy">MenaCare is here to help you understand your body, find reliable answers, and feel supported every step of the way.</p><div className="onboarding-art"><img src={assets.hero} alt="Warm MenaCare welcome illustration" /></div><label className="field-label" htmlFor="name">What would you like us to call you? <span style={{ fontWeight: 500 }}>(optional)</span></label><input id="name" className="name-input" placeholder="Your first name or a nickname" value={name} onChange={e => setName(e.target.value)} /></>}
    {step === 1 && <><span className="mc-eyebrow"><Heart size={14} /> A little about you</span><h2 className="mc-display">Which age group feels right for you?</h2><p className="mc-copy">This helps us keep your MenaCare space clear, comfortable, and age-appropriate.</p><div className="age-grid">{["9–12", "13–15", "16–18", "18+"].map(age => <button key={age} className={`choice ${ageGroup === age ? "selected" : ""}`} onClick={() => setAgeGroup(age)}>{age}</button>)}</div><p className="hero-note"><LockKeyhole size={13} /> Your details stay in this browser.</p></>}
    {step === 2 && <><span className="mc-eyebrow"><CalendarDays size={14} /> One last thing</span><h2 className="mc-display">Have you had your first period yet?</h2><p className="mc-copy">There is no wrong answer. This simply helps us show the most useful starting points.</p><div className="age-grid">{[["Yes", "I have already started"], ["No", "I am still waiting"], ["Not sure", "I have questions about it"]].map(([title, detail]) => <button key={title} className={`choice ${firstPeriod === title ? "selected" : ""}`} onClick={() => setFirstPeriod(title)}><span>{title}<small style={{ display: "block", marginTop: ".2rem", color: "rgba(5,10,48,.58)", fontSize: ".62rem", fontWeight: 500 }}>{detail}</small></span></button>)}</div></>}
    <div className="onboarding-actions"><button className="mc-button ghost" onClick={() => step === 0 ? onBack() : setStep(current => current - 1)}>Back</button><button className="mc-button pink" disabled={!valid} onClick={next}>{step === 2 ? "Open my space" : "Continue"} <ArrowRight size={15} /></button></div>
  </section></main></div>;
}

function Dashboard({ name, mood, setMood, setView }: { name: string; mood: string; setMood: (m: string) => void; setView: (v: View) => void }) {
  const quick = [["Track your cycle", "Log a period or symptom", CalendarDays, "track"], ["Ask Mena", "Supportive answers", MessageCircle, "chat"], ["Learn something new", "Short, clear lessons", BookOpen, "learn"], ["Get pads", "Find practical support", MapPin, "pads"], ["How are you feeling?", "Check in with yourself", Heart, "track"], ["Get help", "Find someone to talk to", HeartHandshake, "support"]] as const;
  return <><div className="dashboard-grid"><section className="dash-hero"><div className="dash-hero-copy"><span className="mc-kicker" style={{ color: "#FF99D8" }}>Your space, your pace</span><h2 className="mc-display">Good to see you, {name}.</h2><p>How are you feeling today? A small check-in can help you notice what you need.</p><button className="mc-button white small" style={{ marginTop: "1rem" }} onClick={() => setView("track")}>Check in with my cycle <ArrowRight size={14} /></button></div><img className="dash-bot" src={assets.bot} alt="MenaCare AI assistant waving" /></section>
    <aside className="cycle-card"><div className="card-label"><span>Your cycle at a glance</span><CalendarDays size={16} color="#64007D" /></div><h3>Day 3</h3><p>of your period · Flow: medium</p><div className="cycle-track" aria-label="Cycle progress"><span className="period" /><span className="period" /><span className="period" /><span className="period" /><span /><span /><span /><span className="ovu" /><span /><span /><span className="predicted" /><span className="predicted" /></div><div className="cycle-key"><span><i />Period</span><span><i className="purple" />Ovulation</span><span><i className="coral" />Predicted</span></div></aside>
    <section className="mood-card"><div><h3>How is your body feeling?</h3><p>There is no right answer—just choose what feels closest today.</p></div><div className="mood-options">{moodOptions.map(option => <button key={option} className={mood === option ? "active" : ""} onClick={() => setMood(option)}>{option === "Good" ? "🙂" : option === "Okay" ? "😌" : option === "Uncomfortable" ? "😕" : "😣"} {option}</button>)}</div></section></div>
    <div className="quick-heading"><div><h2>What can we help with?</h2><p>Tap a card to take the next gentle step.</p></div></div><div className="quick-grid">{quick.map(([title, detail, Icon, target]) => <button key={title} className="quick-card" onClick={() => setView(target)}><span className="quick-icon"><Icon size={20} /></span><span><strong>{title}</strong><small>{detail}</small></span><ChevronRight size={16} color="#64007D" /></button>)}</div></>;
}

function TrackView({ symptoms, setSymptoms, mood, onLog }: { symptoms: string[]; setSymptoms: (list: string[]) => void; mood: string; onLog: () => void }) {
  const now = new Date(); const year = now.getFullYear(); const month = now.getMonth(); const start = new Date(year, month, 1).getDay(); const days = new Date(year, month + 1, 0).getDate(); const today = now.getDate();
  const allDays = useMemo(() => Array.from({ length: start + days }, (_, index) => index < start ? null : index - start + 1), [start, days]);
  const toggle = (symptom: string) => setSymptoms(symptoms.includes(symptom) ? symptoms.filter(item => item !== symptom) : [...symptoms, symptom]);
  return <><section className="detail-hero"><div><span className="mc-kicker">My cycle</span><h2 className="mc-display">Notice your rhythm, one check-in at a time.</h2><p>Logging can help you spot patterns. It does not have to be perfect—what matters is what feels useful to you.</p></div><img src={assets.learning} alt="Calendar and wellness learning illustration" /></section><div className="content-grid"><section className="surface padded"><div className="calendar-header"><strong>{now.toLocaleString("en-US", { month: "long", year: "numeric" })}</strong><span>Tap any date to look back</span></div><div className="calendar-grid">{["S", "M", "T", "W", "T", "F", "S"].map((day, index) => <span className="day-name" key={`${day}-${index}`}>{day}</span>)}{allDays.map((day, index) => { const kind = day && [12,13,14,15].includes(day) ? "period" : day && [27,28].includes(day) ? "predicted" : day === 21 ? "ovulation" : ""; return <button aria-label={day ? `${day}` : ""} key={index} className={`calendar-day ${day ? "" : "empty"} ${kind} ${day === today ? "today" : ""}`}>{day}</button>; })}</div><div className="cycle-key" style={{ marginTop: "1rem" }}><span><i />Period</span><span><i className="coral" />Predicted period</span><span><i className="purple" />Ovulation</span></div></section><aside className="surface padded"><h3 className="surface-title">Log today</h3><p className="surface-description">A simple note for your future self.</p><div className="log-form"><div><label className="field-label" htmlFor="log-date">Date</label><input id="log-date" className="date-input" type="date" defaultValue={now.toISOString().slice(0,10)} /></div><div><span className="field-label">Symptoms (choose any)</span><div className="pill-checks">{symptomOptions.map(symptom => <button key={symptom} className={symptoms.includes(symptom) ? "checked" : ""} onClick={() => toggle(symptom)}>{symptoms.includes(symptom) && <Check size={11} />} {symptom}</button>)}</div></div><div><span className="field-label">Today’s check-in</span><div className="pill-checks"><button className="checked">{mood || "Choose from Home"}</button></div></div><button className="mc-button pink" onClick={onLog}>Save today’s note <Check size={14} /></button></div></aside></div></>;
}

function LearnView() { return <><section className="detail-hero"><div><span className="mc-kicker">Learn at your pace</span><h2 className="mc-display">Real questions. Clear, kind answers.</h2><p>Explore a topic when it feels right. MenaCare is a judgment-free place to learn about your body and your wellbeing.</p></div><img src={assets.learning} alt="Book blooming with health education" /></section><div className="content-grid"><section className="learn-grid">{lessonTopics.map(([title, description, Icon]) => <button className="learn-card" key={title}><span className="learn-art"><Icon size={23} /></span><span><strong>{title}</strong><small>{description}</small></span><ChevronRight size={16} color="#64007D" /></button>)}</section><aside className="learn-focus"><span className="mc-kicker" style={{ color: "#FF99D8" }}>Today’s gentle reminder</span><h3>Your cycle does not have to look like anyone else’s.</h3><p>Period experiences can vary. Learning your usual patterns helps you know when to ask for support.</p><img src={assets.youngWoman} alt="Person offering themselves a comforting hug" /></aside></div></> }

function ChatView({ messages, sendMessage }: { messages: Message[]; sendMessage: (value: string) => void }) {
  const [draft, setDraft] = useState(""); const prompts = ["Why do I get cramps?", "Is my period normal?", "How do I use a pad?", "I started my period at school."];
  const submit = () => { if (draft.trim()) { sendMessage(draft.trim()); setDraft(""); } };
  return <><section className="detail-hero"><div><span className="mc-kicker">Ask Mena</span><h2 className="mc-display">A gentle answer can make a big difference.</h2><p>Mena is here with general, supportive information. For urgent or severe symptoms, reach a trusted adult or a local health professional.</p></div><img src={assets.bot} alt="MenaCare assistant" /></section><div className="chat-layout" style={{ marginTop: "1rem" }}><section className="chat-window"><header className="chat-top"><img src={assets.bot} alt="" /><div><strong>Mena, your AI guide</strong><small><span style={{ color: "#64007D" }}>●</span> Here to listen and help</small></div></header><div className="messages" aria-live="polite">{messages.map((message, index) => <div className={`bubble ${message.sender === "user" ? "user" : ""}`} key={`${message.sender}-${index}`}>{message.text}</div>)}</div><div className="chat-compose"><input aria-label="Message Mena" value={draft} onChange={e => setDraft(e.target.value)} onKeyDown={e => { if (e.key === "Enter") submit(); }} placeholder="Ask Mena anything..." /><button className="send-button" aria-label="Send message" onClick={submit}><Send size={17} /></button></div></section><aside className="chat-side"><section className="prompt-card"><h3>Try asking</h3><div className="prompt-list">{prompts.map(prompt => <button key={prompt} onClick={() => sendMessage(prompt)}>{prompt} <ChevronRight size={13} style={{ float: "right" }} /></button>)}</div></section><section className="safe-card"><HeartHandshake size={21} color="#64007D" /><h3 style={{ marginTop: ".55rem" }}>Need more support?</h3><p>If you feel unsafe, very unwell, or overwhelmed, please tell a trusted adult, guardian, teacher, or local health professional as soon as you can.</p><a href="#support" onClick={e => { e.preventDefault(); document.querySelector<HTMLButtonElement>("button[aria-label='support-nav']")?.click(); }}>Explore support options <ArrowRight size={13} /></a></section></aside></div></>;
}

function PadsView({ requestPad, requested }: { requestPad: () => void; requested: boolean }) {
  const [position, setPosition] = useState({ lat: 6.5244, lng: 3.3792 }); const [locating, setLocating] = useState(false); const [locationMessage, setLocationMessage] = useState("Use your device location to view nearby services.");
  const locate = () => { if (!navigator.geolocation) { setLocationMessage("Location is not available in this browser. You can still ask a trusted adult for local support."); return; } setLocating(true); navigator.geolocation.getCurrentPosition(result => { setPosition({ lat: result.coords.latitude, lng: result.coords.longitude }); setLocationMessage("Your approximate location is shown. Explore the map for nearby options."); setLocating(false); }, () => { setLocationMessage("We could not access your location. Check your browser permission and try again."); setLocating(false); }); };
  return <><section className="detail-hero"><div><span className="mc-kicker">Pad access</span><h2 className="mc-display">Pads should never be hard to find.</h2><p>Use the resource finder to explore nearby care points, request urgent help, or see whether your school can support you.</p></div><img src={assets.resource} alt="Map, pad, and backpack resource illustration" /></section><div className="content-grid"><section className="map-shell"><MapView key={`${position.lat}-${position.lng}`} initialCenter={position} initialZoom={13} onMapReady={map => { if (window.google?.maps?.marker) new window.google.maps.marker.AdvancedMarkerElement({ map, position, title: "Approximate location" }); }} /><div className="map-overlay"><strong>Resource finder</strong><span>{locationMessage}</span><button onClick={locate}><Navigation size={13} /> {locating ? "Locating…" : "Use my location"}</button></div></section><aside className="access-stack"><section className="access-card"><h3>Need a pad right now?</h3><p>Start an emergency request and we’ll help you plan the next practical step.</p><button className="mc-button small pink" onClick={requestPad}>{requested ? "Request recorded" : "Request an emergency pad"}</button>{requested && <div className="access-confirm"><Check size={14} /> Your request has been saved in this browser.</div>}<img src={assets.backpack} alt="" /></section><section className="access-card blue"><h3>Is your school part of the program?</h3><p>See a clear checklist of what to ask for and who could support you at school.</p><button className="mc-button small white" onClick={() => alert("School program checklist: 1) speak to a trusted teacher or school nurse; 2) ask where emergency supplies are kept; 3) bring a friend if you want support.")}>View school checklist <GraduationCap size={14} /></button></section></aside></div></>;
}

function SupportView({ onTalk, status }: { onTalk: () => void; status: string }) {
  const resources: [string, string, LucideIcon][] = [["Trusted adult", "Choose someone who listens: a guardian, teacher, or carer.", HeartHandshake], ["Health services near you", "Use the resource finder to begin exploring local support.", MapPin], ["Emotional support", "Write down what you are feeling before you reach out.", Heart], ["Report a concern", "If something feels wrong, tell a trusted adult as soon as you can.", ShieldCheck]];
  return <><section className="detail-hero"><div><span className="mc-kicker">Help & support</span><h2 className="mc-display">You do not have to go through this alone.</h2><p>Whether you need a conversation, practical help, or a safer next step, MenaCare can help you find the right kind of support.</p></div><img src={assets.youngWoman} alt="Person offering themselves care" /></section><div className="support-grid"><section className="talk-card"><img src={assets.youngWoman} alt="" /><div><span className="mc-kicker">Talk to someone</span><h2 className="mc-display">Support can start with one person.</h2><p>Make a small plan to talk with a trusted adult. You can choose what you want to share.</p><button className="mc-button pink small" onClick={onTalk}>Start a conversation <MessageCircle size={14} /></button>{status && <p className="support-confirmation">{status}</p>}</div></section><section className="surface padded"><h3 className="surface-title">Other support options</h3><p className="surface-description">Choose a route that feels safest and most useful to you.</p><div className="resource-list">{resources.map(([title, description, Icon]) => <button className="resource-row" key={title} onClick={onTalk}><span className="resource-icon"><Icon size={17} /></span><span><strong>{title}</strong><small>{description}</small></span><ChevronRight size={15} /></button>)}</div></section></div></>;
}

function ProfileView({ name, ageGroup, firstPeriod, reset }: { name: string; ageGroup: string; firstPeriod: string; reset: () => void }) {
  return <><section className="detail-hero"><div><span className="mc-kicker">My space</span><h2 className="mc-display">Your MenaCare, your way.</h2><p>Review the simple details you chose and keep your privacy preferences close at hand.</p></div><img src={assets.mark} alt="MenaCare butterfly mark" /></section><div className="profile-layout" style={{ marginTop: "1rem" }}><section className="profile-card"><span className="profile-avatar"><CircleUserRound size={38} /></span><h2 className="mc-display">{name}</h2><p>{ageGroup || "Age group not selected"} · {firstPeriod || "Getting started"}</p><span className="mc-eyebrow" style={{ background: "rgba(255,255,255,.1)", borderColor: "rgba(255,255,255,.25)", color: "#FFFFFF" }}><LockKeyhole size={13} /> Saved on this device</span></section><section className="surface padded"><h3 className="surface-title">Privacy & preferences</h3><p className="surface-description">This demo keeps your profile and logs in this browser so you can come back to your space.</p><div className="settings-list"><div className="setting-row"><span><LockKeyhole size={17} /></span><div><strong>Your data</strong><small>Cycle notes and onboarding choices are stored locally.</small></div><button onClick={() => alert("Your MenaCare data stays in this browser in this demo. Clearing browser storage will remove it.")}>Learn more</button></div><div className="setting-row"><span><Bell size={17} /></span><div><strong>Gentle reminders</strong><small>Coming soon: choose calm reminders that fit your routine.</small></div><button onClick={() => alert("Reminder preferences will be available when MenaCare is connected to a secure account.")}>Preview</button></div><div className="setting-row"><span><Moon size={17} /></span><div><strong>Start fresh</strong><small>Remove the local demo profile and return to the welcome page.</small></div><button onClick={reset}>Reset</button></div></div></section></div></>;
}

export default function Home() {
  const [screen, setScreen] = useState<Screen>("landing"); const [view, setView] = useState<View>("home"); const [hasOnboarded, setHasOnboarded] = useState(false); const [name, setName] = useState("friend"); const [ageGroup, setAgeGroup] = useState(""); const [firstPeriod, setFirstPeriod] = useState(""); const [mood, setMood] = useState(""); const [symptoms, setSymptoms] = useState<string[]>([]); const [logged, setLogged] = useState(false); const [requested, setRequested] = useState(false); const [supportStatus, setSupportStatus] = useState(""); const [messages, setMessages] = useState<Message[]>([{ sender: "bot", text: "Hi! I’m Mena. I’m here to listen and share general, judgment-free information about periods, symptoms, and feeling supported. What would you like to know?" }]);
  useEffect(() => { const saved = localStorage.getItem("menacare-profile"); const savedCheckins = localStorage.getItem("menacare-checkins"); if (saved) { try { const profile = JSON.parse(saved); setName(profile.name || "friend"); setAgeGroup(profile.ageGroup || ""); setFirstPeriod(profile.firstPeriod || ""); setHasOnboarded(true); } catch { localStorage.removeItem("menacare-profile"); } } if (savedCheckins) { try { const checks = JSON.parse(savedCheckins); setMood(checks.mood || ""); setSymptoms(checks.symptoms || []); setRequested(Boolean(checks.requested)); } catch { localStorage.removeItem("menacare-checkins"); } } }, []);
  useEffect(() => { if (hasOnboarded) localStorage.setItem("menacare-profile", JSON.stringify({ name, ageGroup, firstPeriod })); }, [hasOnboarded, name, ageGroup, firstPeriod]);
  useEffect(() => { localStorage.setItem("menacare-checkins", JSON.stringify({ mood, symptoms, requested })); }, [mood, symptoms, requested]);
  const enter = () => { if (hasOnboarded) { setScreen("app"); setView("home"); } else setScreen("onboarding"); };
  const complete = (newName: string, newAge: string, newFirstPeriod: string) => { setName(newName); setAgeGroup(newAge); setFirstPeriod(newFirstPeriod); setHasOnboarded(true); setScreen("app"); setView("home"); };
  const sendMessage = (value: string) => { setMessages(current => [...current, { sender: "user", text: value }]); const lowered = value.toLowerCase(); const response = lowered.includes("cramp") ? "Cramps are common because the uterus tightens during a period. Gentle warmth, rest, light movement, and talking to a trusted adult can help. If pain is severe, suddenly different, or stops you doing everyday things, a health professional can help." : lowered.includes("normal") ? "Periods can vary in timing, flow, and how they feel—especially in the first few years. Tracking your usual pattern can be helpful. If you are worried about a big change, very heavy bleeding, or severe pain, please tell a trusted adult or health professional." : lowered.includes("pad") ? "Pads come in different sizes and absorbencies. Change one whenever it feels full or uncomfortable, and always wash your hands before and after. Your Learn space has a gentle Period Products 101 guide too." : lowered.includes("school") ? "Starting your period at school can feel like a lot. If you can, speak to a teacher, school nurse, or another trusted adult. The Get Pads space can help you make a small plan for what to ask for." : "Thanks for sharing that. I can offer general, supportive information and help you think through your next step. If something feels urgent, severe, unsafe, or overwhelming, please reach a trusted adult or local health professional right away."; window.setTimeout(() => setMessages(current => [...current, { sender: "bot", text: response }]), 300); };
  const renderView = () => { if (view === "home") return <Dashboard name={name} mood={mood} setMood={setMood} setView={setView} />; if (view === "track") return <TrackView symptoms={symptoms} setSymptoms={setSymptoms} mood={mood} onLog={() => { setLogged(true); window.setTimeout(() => setLogged(false), 2600); }} />; if (view === "learn") return <LearnView />; if (view === "chat") return <ChatView messages={messages} sendMessage={sendMessage} />; if (view === "pads") return <PadsView requested={requested} requestPad={() => setRequested(true)} />; if (view === "support") return <SupportView status={supportStatus} onTalk={() => setSupportStatus("You have opened a gentle conversation plan. Choose one trusted adult, a calm time to talk, and one thing you would like them to know.")} />; return <ProfileView name={name} ageGroup={ageGroup} firstPeriod={firstPeriod} reset={() => { localStorage.removeItem("menacare-profile"); localStorage.removeItem("menacare-checkins"); setHasOnboarded(false); setScreen("landing"); setView("home"); setName("friend"); setAgeGroup(""); setFirstPeriod(""); setMood(""); setSymptoms([]); }} />; };
  if (screen === "landing") return <Landing onEnter={enter} hasOnboarded={hasOnboarded} />;
  if (screen === "onboarding") return <Onboarding onBack={() => setScreen("landing")} onComplete={complete} />;
  const currentLabel = navItems.find(item => item.id === view)?.label || "Home";
  return <div className="app-shell"><AppNavigation view={view} setView={setView} /><main className="app-main"><div className="mobile-appbar"><Brand /><button className="circle-button" onClick={() => setView("profile")}><CircleUserRound size={19} /></button></div><header className="app-topbar"><div><p className="topbar-label">MenaCare / {currentLabel}</p><h1 className="topbar-heading">{view === "home" ? "A little support, right here." : currentLabel}</h1></div><div className="topbar-actions"><button className="circle-button" aria-label="Notifications"><Bell size={18} /></button><button className="avatar-button" onClick={() => setView("profile")}><span><CircleUserRound size={18} /></span>{name}</button></div></header>{renderView()}{logged && <div role="status" style={{ position: "fixed", zIndex: 80, right: "1.5rem", bottom: "1.4rem", padding: ".8rem 1rem", borderRadius: "16px", background: "#64007D", color: "#FFFFFF", boxShadow: "0 12px 28px rgba(5,10,48,.2)", fontSize: ".72rem", fontWeight: 800 }}><Check size={15} style={{ display: "inline", marginRight: ".35rem" }} />Today’s note has been saved.</div>}</main></div>;
}
