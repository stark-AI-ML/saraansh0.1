
import UserConfig from "../core/userConfig";

// Real one to apply 

// chrome.runtime.onInstalled.addListener(
//    () => {
//   chrome.storage.local.get(["userSettings"], async (result) => {
//     if (!result.userSettings) {
//       const defaultConfig = new UserConfig({
//         tokenKey: null,
//         model: "gpt-oss-20b:free",
//         theme: "Dark",
//         tokenLeft: 100
//       });

//       defaultConfig.save({
//         tokenKey: defaultConfig.tokenKey,
//         model: defaultConfig.model,
//         theme: defaultConfig.theme,
//         tokenLeft: defaultConfig.tokenLeft
//       });

//       const load = await UserConfig.loadConfig();

//       console.log("Default config initialized", load);
//     } else {
//       console.log("Config already exists");
//     }
//   });

//   chrome.alarms.create("resetTokenLeft", { periodInMinutes: 24 * 60 });
// });



chrome.runtime.onInstalled.addListener(async () => {
  const defaultConfig = new UserConfig({
    tokenKey: null,
    model: "gpt-oss-20b:free",
    theme: "Dark",
    tokenLeft: 100,
  });

  defaultConfig.save({
    tokenKey:defaultConfig.tokenKey, 
    model : defaultConfig.model, 
    theme : defaultConfig.theme, 
    tokenLeft : defaultConfig.tokenLeft
  });

  const load = await UserConfig.loadConfig();
 
  
  chrome.alarms.create("resetTokenLeft", { periodInMinutes: 24 * 60 });
});



chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "resetTokenLeft") {
    UserConfig.loadConfig((config) => {
      if (config) {
        config.setTokenLeft(100);
        console.log("Token left refreshed for the day");
      }
    });
  }
});

async function getAI() {
  let tokenKey =  await UserConfig.getTokenKey();
  if (!tokenKey) {
    tokenKey = import.meta.env.VITE_SARAANSH_ALL_API_KEY
    // console.log(tokenKey); 
  }

  const model = await UserConfig.getModel();

  return { tokenKey, model };
}


async function resetTokenKey(){
  // we just have to set thing to null so don't need to this as i want it to be in .env enviornment anyway
 
  // const token = (await getAI()).tokenKey ; 
  const config = new  UserConfig({tokenKey: null}); 
  config.save({tokenKey : config.tokenKey}); 
  console.log("tokenKey Updated", console.log(config.tokenKey));



}


async function main(messageArr) {

  const AI = await getAI();
  console.log(AI.tokenKey); 
  const token = AI.tokenKey; 
  const model = AI.model; 
  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        model: model,
        messages: messageArr,
      }),
    }
  );
  const data = await response.json();
  const output = data.choices?.[0]?.message?.content;
  return { data, output };
}

// Open Preview of html......
function openPreviewTab(html) {
  console.log("called once"); 
  chrome.tabs.create(
    { url: chrome.runtime.getURL("src/core/preview.html") },
    (tab) => {
      chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
        if (tabId === tab.id && info.status === "complete") {
          chrome.tabs.onUpdated.removeListener(listener);
          chrome.tabs.sendMessage(tabId, {
            type: "render-html",
            html,
          });
        }
      });
    }
  );
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (!message || !message.type) return false;

  switch (message.type) {

    case "REQUEST_AI":
      main(message.data)
        .then((response) =>
          sendResponse({ html: response.output, data: response.data })
        ).catch((err) => sendResponse({ error: err?.message || String(err) }));
      return true;

    case "GOOGLE_SIGN_IN":
      signInWithPopup(auth, provider)
        .then((result) => {
          const user = result.user;
          const userProfile = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          };
          // Store user in Firestore
          const userRef = doc(db, "users", user.uid);
          setDoc(userRef, userProfile, { merge: true }).then(() => {
            sendResponse({ ok: true, user: userProfile });
          });
        })
        .catch((error) => {
          sendResponse({ success: false, error: error.message });
        });
      return true;

    case "SIGN_OUT":
      signOut(auth)
        .then(() => {
          sendResponse({ success: true });
        })
        .catch((error) => {
          sendResponse({ success: false, error: error.message });
        });
      return true;

    case "GET_DOC":
      const ref = doc(db, message.collection, message.id);
      getDoc(ref)
        .then((snap) =>
          sendResponse({ ok: true, data: snap.exists() ? snap.data() : null })
        )
        .catch((err) =>
          sendResponse({ ok: false, error: err?.message || String(err) })
        );
      return true;

    case "SET_DOC":
      const setRef = doc(db, message.collection, message.id);
      setDoc(setRef, message.data, { merge: true })
        .then(() => sendResponse({ ok: true }))
        .catch((err) =>
          sendResponse({ ok: false, error: err?.message || String(err) })
        );
      return true;
   
   
    case "open-preview":
      openPreviewTab(message.html);
      return true;
    
    case "RESET_TOKEN": 
        resetTokenKey(); 
        return true; 
    default:
      if (message.type === "REQUEST_AI") {
        console.log("I'm entering in the Request Background.js............");

        const tempHtml = `
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Black Holes — A Beautiful Minimal Guide</title>
  <meta name="description" content="A single-file, beautiful mini-site explaining black holes: what they are, how they form, and why they matter." />
  <style>
    :root{
      --bg: #0b0f17;
      --bg2:#0d1320;
      --fg: #e6eefc;
      --muted:#9fb3d1;
      --accent:#7aa2ff;
      --accent2:#84ffd2;
      --warn:#ffb86c;
      --danger:#ff6b6b;
      --card:#101725;
      --border:#1b2538;
      --shadow: 0 10px 30px rgba(0,0,0,0.40), inset 0 0 40px rgba(122,162,255,0.08);
      --radius: 16px;
    }
    *{box-sizing:border-box}
    html,body{height:100%}
    body{
      margin:0;
      font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji","Segoe UI Emoji";
      background:
        radial-gradient(1200px 600px at 80% -20%, rgba(122,162,255,0.08), transparent 60%),
        radial-gradient(1200px 600px at -10% 110%, rgba(132,255,210,0.06), transparent 60%),
        linear-gradient(180deg, var(--bg), var(--bg2));
      color: var(--fg);
      line-height: 1.6;
    }
    a{color:var(--accent); text-decoration:none}
    a:hover{color:#a9beff; text-decoration:underline}

    header{
      position:relative;
      padding: 64px 24px 24px;
      overflow:hidden;
    }
    .wrap{max-width:1080px; margin:0 auto}
    .nav{
      display:flex; align-items:center; justify-content:space-between;
      padding: 20px 24px; border-bottom:1px solid var(--border);
      backdrop-filter: blur(8px);
      position: sticky; top: 0; z-index: 50;
      background: linear-gradient(180deg, rgba(11,15,23,0.85), rgba(13,19,32,0.65));
    }
    .brand{
      display:flex; gap:12px; align-items:center;
      font-weight:700; letter-spacing:0.2px;
    }
    .brand .dot{
      width:12px; height:12px; border-radius:50%;
      background: radial-gradient(circle at 40% 40%, var(--accent), #4366b4);
      box-shadow: 0 0 16px rgba(122,162,255,0.8), 0 0 40px rgba(122,162,255,0.35);
    }
    .nav .links{display:flex; gap:16px; flex-wrap:wrap}
    .links a{padding:6px 10px; border-radius:8px; border:1px solid transparent}
    .links a:hover{border-color:var(--border); background:rgba(16,23,37,0.4)}

    .hero{
      display:grid; grid-template-columns: 1.1fr 0.9fr; gap:32px;
      align-items:center;
      padding:48px 24px 64px;
    }
    @media (max-width:900px){
      .hero{grid-template-columns: 1fr}
    }
    .hero h1{
      font-size: clamp(2rem, 4.8vw, 3.5rem);
      margin: 0 0 16px;
      letter-spacing: 0.2px;
    }
    .subtitle{color: var(--muted); font-size: 1.05rem; max-width: 62ch}
    .cta{
      margin-top:24px; display:flex; gap:12px; flex-wrap:wrap
    }
    .btn{
      padding:10px 14px; border-radius:12px; border:1px solid var(--border);
      background: linear-gradient(180deg, #111a2a, #0d1422);
      color: var(--fg); cursor: pointer; transition: transform .08s ease, box-shadow .2s ease;
      box-shadow: var(--shadow);
    }
    .btn.primary{
      border-color: rgba(122,162,255,0.5);
      background: linear-gradient(180deg, #16233b, #10203b);
    }
    .btn:hover{transform: translateY(-1px)}
    .btn:active{transform: translateY(0)}

    .card{
      background: linear-gradient(180deg, #0f1626, #0d1422);
      border:1px solid var(--border);
      border-radius: var(--radius);
      box-shadow: var(--shadow);
      padding: 20px;
    }
    .grid{
      display:grid; gap:20px;
      grid-template-columns: repeat(3, 1fr);
    }
    @media (max-width:1000px){
      .grid{grid-template-columns: repeat(2, 1fr)}
    }
    @media (max-width:640px){
      .grid{grid-template-columns: 1fr}
    }
    h2{
      font-size: clamp(1.4rem, 3vw, 2rem);
      margin: 8px 0 16px;
    }
    h3{margin-top: 8px}
    p{margin: 10px 0}
    ul{margin: 8px 0 0 0; padding: 0 0 0 18px}
    li{margin: 6px 0}
    .section{padding: 24px; margin: 0 auto; max-width: 1080px}
    .section .title{
      display:flex; align-items:center; gap:12px; margin-bottom: 8px;
    }
    .title .spark{
      width: 16px; height: 16px; border-radius:50%;
      background: radial-gradient(circle at 40% 40%, var(--accent2), #2bbd95);
      box-shadow: 0 0 24px rgba(132,255,210,0.7), 0 0 50px rgba(39,243,190,0.25);
    }
    .divider{
      height:1px; background: linear-gradient(90deg, transparent, var(--border), transparent);
      margin: 24px 0;
    }

    .factline{
      display:flex; gap:12px; flex-wrap:wrap;
    }
    .pill{
      border:1px solid var(--border);
      background: linear-gradient(180deg, #0f172a, #0d1422);
      border-radius: 999px;
      padding: 8px 12px;
      color: var(--muted);
    }

    .gallery{display:grid; gap:20px; grid-template-columns: 1fr 1fr}
    @media (max-width:800px){.gallery{grid-template-columns: 1fr}}

    .footer{
      padding: 40px 24px; text-align:center; color: var(--muted);
      border-top:1px solid var(--border);
      margin-top: 24px;
    }

    /* Simple interactive FAQ */
    details{
      border:1px solid var(--border);
      border-radius: 12px;
      background: linear-gradient(180deg, #101827, #0e1626);
      padding: 12px 14px;
    }
    details + details{margin-top:10px}
    summary{
      cursor:pointer; list-style:none; font-weight:600;
    }
    summary::-webkit-details-marker{display:none}
    summary:after{
      content: "＋";
      float: right; color: var(--muted);
    }
    details[open] summary:after{content:"–"}

    /* SVG Black Hole */
    .hole-wrap{
      position: relative; aspect-ratio: 1 / 1; width: 100%;
      border-radius: 16px; overflow: hidden;
      background: radial-gradient(circle at 50% 50%, #0c1322 0%, #0a0f1a 55%, #070a12 100%);
      border:1px solid var(--border);
      box-shadow: var(--shadow);
    }
    .caption{color: var(--muted); font-size: 0.95rem; margin-top: 10px}
    .tag{font-size: 0.8rem; color: var(--muted)}
    .kbd{
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
      font-size: .9rem; color: var(--muted);
      background: #0c1322; border:1px solid var(--border);
      padding: 4px 6px; border-radius: 8px;
    }

    /* Nice list markers */
    .checklist{
      list-style: none; padding-left:0;
    }
    .checklist li{
      margin: 8px 0; padding-left: 26px; position: relative;
    }
    .checklist li:before{
      content: "✓";
      color: var(--accent2);
      position: absolute; left: 0; top: 0;
      width: 20px; text-align:center;
    }

    /* Small subtle animation */
    .twinkle{
      position:absolute; inset:0;
      background:
        radial-gradient(2px 2px at 20% 30%, rgba(255,255,255,0.8), transparent),
        radial-gradient(2px 2px at 60% 20%, rgba(255,255,255,0.7), transparent),
        radial-gradient(2px 2px at 80% 70%, rgba(255,255,255,0.6), transparent),
        radial-gradient(2px 2px at 35% 85%, rgba(255,255,255,0.75), transparent);
      opacity:0.35;
      animation: drift 22s linear infinite;
    }
    @keyframes drift{
      0%{transform: translateY(0)}
      50%{transform: translateY(-6px)}
      100%{transform: translateY(0)}
    }
  </style>
</head>
<body>
  <nav class="nav">
    <div class="brand">
      <div class="dot" aria-hidden="true"></div>
      <span>Black Holes</span>
    </div>
    <div class="links">
      <a href="#overview">Overview</a>
      <a href="#anatomy">Anatomy</a>
      <a href="#types">Types</a>
      <a href="#physics">Physics</a>
      <a href="#faq">FAQ</a>
    </div>
  </nav>

  <header>
    <div class="wrap hero">
      <div>
        <h1>Black holes, simply explained</h1>
        <p class="subtitle">
          Regions of spacetime where gravity is so intense that nothing—not even light—can escape.
          Learn how they form, what they’re made of, and why they reshape our understanding of the universe.
        </p>
        <div class="cta">
          <a class="btn primary" href="#overview">Start reading</a>
          <a class="btn" href="#faq">Quick answers</a>
        </div>
        <div class="factline" style="margin-top:14px">
          <span class="pill">No external libraries</span>
          <span class="pill">Dark, minimal design</span>
          <span class="pill">Accessible & responsive</span>
        </div>
      </div>

      <div>
        <div class="hole-wrap">
          <div class="twinkle" aria-hidden="true"></div>
          <!-- Stylized black hole SVG -->
          <svg viewBox="0 0 400 400" width="100%" height="100%" aria-label="Stylized black hole visualization">
            <defs>
              <radialGradient id="disk" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="#1a2a4a"/>
                <stop offset="60%" stop-color="#1b335e"/>
                <stop offset="100%" stop-color="#0b1423"/>
              </radialGradient>
              <radialGradient id="glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="rgba(122,162,255,0.8)"/>
                <stop offset="100%" stop-color="rgba(122,162,255,0)"/>
              </radialGradient>
              <radialGradient id="event" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="#000000"/>
                <stop offset="100%" stop-color="#02040a"/>
              </radialGradient>
            </defs>

            <!-- Accretion disk -->
            <ellipse cx="200" cy="200" rx="170" ry="65" fill="url(#disk)" />
            <!-- Relativistic glow -->
            <ellipse cx="210" cy="195" rx="175" ry="70" fill="url(#glow)" />
            <!-- Event horizon -->
            <circle cx="200" cy="200" r="55" fill="url(#event)" />
            <!-- Photon ring hint -->
            <circle cx="200" cy="200" r="70" fill="none" stroke="#7aa2ff" stroke-opacity="0.5" stroke-width="1.6"/>

            <!-- Curved “infall” arcs -->
            <path d="M 40 160 Q 200 220 360 140" stroke="#84ffd2" stroke-opacity="0.25" stroke-width="1.2" fill="none"/>
            <path d="M 60 190 Q 200 270 340 200" stroke="#84ffd2" stroke-opacity="0.20" stroke-width="1.0" fill="none"/>
            <path d="M 70 220 Q 200 310 330 230" stroke="#84ffd2" stroke-opacity="0.16" stroke-width="0.9" fill="none"/>
          </svg>
        </div>
        <div class="caption">A stylized view: event horizon (black), photon ring (thin halo), and accretion disk (flattened glow).</div>
      </div>
    </div>
  </header>

  <main>
    <section id="overview" class="section">
      <div class="title"><div class="spark" aria-hidden="true"></div><h2>Overview</h2></div>
      <div class="grid">
        <article class="card">
          <h3>What is a black hole?</h3>
          <p>
            A black hole is a solution of Einstein’s general relativity: a region where gravity is so strong that
            the escape velocity exceeds the speed of light. The boundary is called the event horizon; crossing it
            means no information can return to the outside universe.
          </p>
        </article>

        <article class="card">
          <h3>How do they form?</h3>
          <p>
            Most black holes form when massive stars run out of nuclear fuel, collapse under their own gravity, and
            compress into extremely dense objects. Others can form via mergers of compact objects or possibly in the
            early universe through high-density fluctuations.
          </p>
        </article>

        <article class="card">
          <h3>Why do they matter?</h3>
          <p>
            Black holes probe extreme physics—curved spacetime, quantum effects, and high-energy astrophysics.
            They power quasars and active galactic nuclei and help us test gravity through gravitational waves.
          </p>
        </article>
      </div>
    </section>

    <div class="divider"></div>

    <section id="anatomy" class="section">
      <div class="title"><div class="spark" aria-hidden="true"></div><h2>Anatomy</h2></div>
      <div class="gallery">
        <article class="card">
          <h3>Event horizon</h3>
          <p>
            The horizon is the “point of no return” where light can no longer escape. It’s not a material surface,
            but a boundary in spacetime. For a non-rotating (Schwarzschild) black hole, its radius is proportional
            to the mass: larger mass, larger horizon.
          </p>
          <p class="tag">Think: the ultimate one-way door.</p>
        </article>
        <article class="card">
          <h3>Singularity</h3>
          <p>
            At the center lies a region where classical physics predicts infinite density and curvature. Quantum gravity
            is expected to resolve this, but we don’t yet have a complete theory. It’s hidden behind the horizon.
          </p>
          <p class="tag">Where our current theories break down.</p>
        </article>
        <article class="card">
          <h3>Accretion disk</h3>
          <p>
            Gas spirals in, heats up through friction and magnetic turbulence, and emits intense radiation—from radio
            to X-rays. The disk gives black holes their luminous “look” when actively feeding.
          </p>
          <p class="tag">A blazing whirlpool of matter.</p>
        </article>
        <article class="card">
          <h3>Photon ring</h3>
          <p>
            Strong gravity bends light into tight orbits near the horizon. This produces a bright ring-like structure
            that imaging arrays like the Event Horizon Telescope can resolve around nearby supermassive black holes.
          </p>
          <p class="tag">Gravity’s hall of mirrors.</p>
        </article>
      </div>
    </section>

    <div class="divider"></div>

    <section id="types" class="section">
      <div class="title"><div class="spark" aria-hidden="true"></div><h2>Types</h2></div>
      <div class="grid">
        <article class="card">
          <h3>Stellar-mass</h3>
          <p>
            Born from collapsing massive stars; typically a few to tens of solar masses. Often found in X-ray binaries,
            feeding on companion stars.
          </p>
        </article>
        <article class="card">
          <h3>Intermediate-mass</h3>
          <p>
            Hundreds to thousands of solar masses; candidates in dense star clusters. Their formation is an active area
            of research through mergers and runaway stellar processes.
          </p>
        </article>
        <article class="card">
          <h3>Supermassive</h3>
          <p>
            Millions to billions of solar masses, anchoring galactic centers (like Sagittarius A* in the Milky Way).
            They shape galaxy evolution and power quasars.
          </p>
        </article>
      </div>
    </section>

    <div class="divider"></div>

    <section id="physics" class="section">
      <div class="title"><div class="spark" aria-hidden="true"></div><h2>Core physics</h2></div>
      <div class="grid">
        <article class="card">
          <h3>General relativity</h3>
          <p>
            Mass and energy curve spacetime; objects move along that curvature. Black holes represent extreme geometry
            where curvature becomes dominant over any other forces near the horizon.
          </p>
        </article>
        <article class="card">
          <h3>Time dilation</h3>
          <p>
            Clocks near a black hole tick slower relative to distant observers. To an outside viewer, infalling matter
            appears to asymptotically freeze near the horizon, while locally it crosses in finite time.
          </p>
        </article>
        <article class="card">
          <h3>Hawking radiation</h3>
          <p>
            Quantum fields in curved spacetime predict a faint thermal radiation from horizons. For stellar or larger
            black holes, it’s vanishingly weak, but in principle allows black holes to evaporate over immense timescales.
          </p>
        </article>
        <article class="card">
          <h3>Gravitational waves</h3>
          <p>
            Merging black holes radiate ripples in spacetime detected by observatories like LIGO/Virgo/KAGRA. These
            signals let us weigh black holes and test gravity’s predictions in the strong-field regime.
          </p>
        </article>
      </div>
    </section>

    <div class="divider"></div>

    <section class="section">
      <div class="title"><div class="spark" aria-hidden="true"></div><h2>Famous examples</h2></div>
      <div class="grid">
        <article class="card">
          <h3>Sagittarius A*</h3>
          <p>The supermassive black hole at the center of our Milky Way galaxy, about 26,000 light-years away.</p>
        </article>
        <article class="card">
          <h3>M87*</h3>
          <p>Imaged by the Event Horizon Telescope in 2019, revealing the shadow and surrounding emission.</p>
        </article>
        <article class="card">
          <h3>Cygnus X-1</h3>
          <p>One of the first strong black hole candidates, an X-ray binary discovered in the 1960s.</p>
        </article>
      </div>
    </section>

    <div class="divider"></div>

    <section class="section">
      <div class="title"><div class="spark" aria-hidden="true"></div><h2>Quick facts</h2></div>
      <div class="card">
        <ul class="checklist">
          <li><span class="kbd">Event horizon</span> is a boundary, not a surface.</li>
          <li>Black holes don’t “vacuum” everything; far away they act like ordinary massive objects.</li>
          <li>Spin (Kerr black holes) drags spacetime, affecting orbits and jets.</li>
          <li>Accretion can outshine entire galaxies (quasars).</li>
          <li>Information paradox: Do black holes destroy information? Still an open question at the frontier of physics.</li>
        </ul>
      </div>
    </section>

    <div class="divider"></div>

    <section id="faq" class="section">
      <div class="title"><div class="spark" aria-hidden="true"></div><h2>FAQ</h2></div>
      <div class="card">
        <details>
          <summary>Can black holes move?</summary>
          <p>Yes. They orbit, drift through galaxies, and can be ejected by gravitational interactions or recoil after mergers.</p>
        </details>
        <details>
          <summary>Will a black hole swallow the Earth?</summary>
          <p>No known black hole is close enough. Even if the Sun were replaced by a black hole of equal mass, Earth’s orbit would remain the same; only the light would be gone.</p>
        </details>
        <details>
          <summary>How do we “see” black holes?</summary>
          <p>We observe their effects: hot accretion disks, jets, stellar motions, and gravitational waves. Direct images show the shadow against surrounding emission.</p>
        </details>
        <details>
          <summary>Do they all have the same size?</summary>
          <p>No. Size scales with mass. Stellar black holes are tens of kilometers across; supermassive ones can be larger than our solar system.</p>
        </details>
      </div>
    </section>

    <div class="divider"></div>

    <section class="section">
      <div class="title"><div class="spark" aria-hidden="true"></div><h2>Explore further</h2></div>
      <div class="grid">
        <article class="card">
          <h3>Think experiment</h3>
          <p>
            Imagine dropping a clock toward the horizon. What do you read on the clock locally vs. from far away?
            This sharpens the idea of time dilation and redshift.
          </p>
        </article>
        <article class="card">
          <h3>Build intuition</h3>
          <p>
            Replace “gravity pulls” with “spacetime curves.” Objects follow geodesics—the straightest possible paths
            in curved geometry. Near a black hole, those paths wrap tightly inward.
          </p>
        </article>
        <article class="card">
          <h3>Small calculation</h3>
          <p>
            The Schwarzschild radius is approximately 2GM/c². For Earth’s mass, it’s about 9 mm; for the Sun, ~3 km.
            That contrast shows how extreme density is required to form black holes.
          </p>
        </article>
      </div>
    </section>
  </main>

  <footer class="footer">
    <p>Made with starlight and curiosity. Single-file, no frameworks.</p>
  </footer>

  <script>
    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(a=>{
      a.addEventListener('click', (e)=>{
        const id = a.getAttribute('href').slice(1);
        const el = document.getElementById(id);
        if(el){
          e.preventDefault();
          el.scrollIntoView({behavior:'smooth', block:'start'});
          // brief highlight
          el.style.boxShadow = '0 0 0 9999px rgba(122,162,255,0.03) inset';
          setTimeout(()=>{ el.style.boxShadow = 'none' }, 500);
        }
      });
    });
  </script>
</body>
</html>
    
    `;
        sendResponse({ html: tempHtml, data: "data is not available" });
      }
  }
});
