'use strict';

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

// Navigation remains useful without any server or account connection.
const menuButton = $('.menu-toggle');
const mobileNav = $('#mobile-nav');
function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
  mobileNav.hidden = true;
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  mobileNav.hidden = !open;
});
$$('a', mobileNav).forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
window.matchMedia('(min-width: 601px)').addEventListener('change', event => { if(event.matches) closeMenu(); });

function updateClock() {
  $('#regina-clock').textContent = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Regina', hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date()) + ' CST';
}
updateClock();
setInterval(updateClock, 30000);
$('#year').textContent = new Date().getFullYear();

$$('.filter').forEach(button => button.addEventListener('click', () => {
  const filter = button.dataset.filter;
  $('.project-grid').dataset.filter = filter;
  $$('.filter').forEach(item => {
    const selected = item === button;
    item.classList.toggle('active', selected);
    item.setAttribute('aria-pressed', String(selected));
  });
  let visibleCount = 0;
  $$('.project').forEach(project => {
    const visible = filter === 'all' || project.dataset.category === filter;
    project.hidden = !visible;
    if (visible) visibleCount++;
  });
  $('#filter-status').textContent = `${visibleCount} ${visibleCount === 1 ? 'project' : 'projects'} shown.`;
}));

const cases = {
  "stockwise": {
    "type": "09 / OPERATIONS & DATA ANALYSIS",
    "title": "StockWise — Inventory & Reordering Analysis",
    "period": "Independent portfolio case study · Simulated retail data",
    "subtitle": "A purchasing dashboard for spotting stockout risk, checking supplier arrivals, and building a budget-constrained reorder plan.",
    "tags": [
      "SQL / SQLite",
      "Python",
      "Excel",
      "Scenario modeling"
    ],
    "fact": [
      "4,320",
      "Daily inventory observations across 48 simulated products."
    ],
    "sections": [
      [
        "The purchasing decision",
        "Which products need attention, when could demand go unmet, and how much can the buyer order within budget? The dashboard combines availability, supplier delivery history, and a purchase plan with pack rounding."
      ],
      [
        "Arrival scenarios",
        "Open any product to compare promised receipts with a three-day delay. The 14-day projection shows the first day demand could go unmet and identifies overdue orders that need confirmation."
      ],
      [
        "Policy comparison",
        "Over 30 simulated test days, the lead-based rule reduced product-days with unmet demand from 215 to 166 and lowered average daily inventory by CAD 2,184.52. The value of purchase orders placed increased by CAD 3,842.16. Both policies ran without a shared budget cap."
      ],
      [
        "Reproducibility",
        "The repository includes SQL, Python, the editable Excel purchasing model, the simulation ledger, and 14 analysis tests. The model and dashboard make the planning assumptions visible."
      ]
    ],
    "resources": [
      [
        "Launch StockWise dashboard",
        "/projects/stockwise/dashboard.html"
      ],
      [
        "Projection and backtest methodology",
        "https://github.com/Himu1221/stockwise-inventory-analysis/blob/main/docs/policy-evaluation.md"
      ],
      [
        "Excel purchasing model",
        "https://github.com/Himu1221/stockwise-inventory-analysis/blob/main/StockWise-Purchasing-Model.xlsx"
      ]
    ],
    "repo": "https://github.com/Himu1221/stockwise-inventory-analysis",
    "note": "This independent case study uses simulated retail data. The policy results apply to the modeled test period."
  },
  "booking": {
  "type": "08 / BUSINESS PROCESS & DATA ANALYSIS",
  "title": "Booking Desk — Lead-to-Booking Improvement",
  "period": "November 2026 · Independent case study · Simulated data",
  "subtitle": "A lead journey investigation combining relational SQL, cohort reporting, process design, and an interactive review workspace.",
  "tags": [
    "Python / SQLite",
    "Business analysis",
    "Cohort reporting",
    "GitHub Actions"
  ],
  "fact": [
    "11",
    "Automated tests covering analytical grain, missing responses, exact 30-day boundaries, and invalid booking/quote links."
  ],
  "sections": [
    [
      "The business question",
      "How could a fictional cleaning business manage inquiry ownership, response review, quotes, and first bookings more consistently? The project uses 360 generated leads across four related tables, with no real customer or client data."
    ],
    [
      "What is implemented",
      "Built reproducible SQL/Python analysis and a browser workspace with shared cohort filters, monthly conversion trends, unanswered/late categories, search, pagination, individual lead journeys, and filtered CSV exports. Event tables are rolled up before joining to prevent double-counting leads."
    ],
    [
      "Business analysis and handoff",
      "Documented current and proposed processes, nine pending discovery questions, an assumption and decision log, eight prioritized user stories, acceptance criteria, a data-model diagram, and a SQL walkthrough. Proposed CRM features are distinguished from implemented reporting."
    ],
    [
      "Validation and recommendation",
      "Added source-key and sequence checks, eleven automated tests, and a GitHub Actions workflow. Recommend discovery and a shared inquiry-queue pilot before selecting a CRM. The 30-day conversion window and response threshold are explicit demonstration assumptions; no causal uplift or client improvement is claimed."
    ]
  ],
  "resources": [
    [
      "Launch Booking Desk",
      "/projects/booking-desk/dashboard.html"
    ],
    [
      "Discovery and decision log",
      "https://github.com/Himu1221/lead-to-booking-analysis/blob/main/docs/discovery-and-decisions.md"
    ],
    [
      "Prioritized backlog",
      "https://github.com/Himu1221/lead-to-booking-analysis/blob/main/docs/implementation-backlog.md"
    ],
    [
      "Data model and SQL walkthrough",
      "https://github.com/Himu1221/lead-to-booking-analysis/blob/main/docs/sql-walkthrough.md"
    ],
    [
      "Automated checks",
      "https://github.com/Himu1221/lead-to-booking-analysis/actions/workflows/analysis-checks.yml"
    ]
  ],
  "repo": "https://github.com/Himu1221/lead-to-booking-analysis",
  "note": "Independent demonstration for a fictional business. All data is simulated with seed 1221. Interviews, stakeholder approvals, CRM operations, and measured improvements have not occurred. Source-level figures describe the simulation, not industry performance."
},
  "margin": {
  "type": "07 / DATA & BUSINESS ANALYSIS",
  "title": "Sales & Margin Investigation",
  "period": "November 2026 · Independent case study · Historical sample data",
  "subtitle": "A reproducible investigation of margin pressure, from financial validation to a defensible business recommendation.",
  "tags": [
    "SQL / SQLite",
    "Python",
    "Interactive dashboard",
    "Data quality",
    "Business analysis"
  ],
  "fact": [
    "13 / 16",
    "Enterprise was net loss-making in 13 of 16 observed calendar months. This is a sample-data finding, not a measured client outcome."
  ],
  "sections": [
    [
      "The business question",
      "Where should a commercial manager investigate margin pressure before changing prices or discount policy? The independent brief uses 700 records from Microsoft’s historical Financial Sample."
    ],
    [
      "Analysis and engineering",
      "Validated financial identities, missing values, duplicate rows, date attributes, and period coverage. Used CTEs, window functions, a calendar join, and weighted measures to analyze loss concentration, monthly persistence, and comparable September–December periods."
    ],
    [
      "The evidence",
      "Enterprise reported approximately $614.5K in net losses. Its top three product/country combinations accounted for 26.2% of gross negative-observation losses; High-discount observations contained 80.1%. These associations prioritize investigation and do not prove a cause."
    ],
    [
      "Recommendation and validation",
      "Prioritize a finance and sales review of costs and contractual constraints before a limited policy test. Documented options, proposed ownership, missing evidence, and a measurement plan. Four automated tests cover missing inputs, duplicate retention, loss-ranking logic, and calendar gaps."
    ]
  ],
  "resources": [
    [
      "Launch interactive dashboard",
      "/projects/sales-margin/dashboard.html"
    ],
    [
      "Explore investigation and quality checks",
      "/projects/sales-margin/investigation.html"
    ],
    [
      "Executive recommendation",
      "https://github.com/Himu1221/sales-margin-business-analysis/blob/main/reports/enterprise-investigation.md"
    ],
    [
      "SQL walkthrough",
      "https://github.com/Himu1221/sales-margin-business-analysis/blob/main/docs/sql-walkthrough.md"
    ]
  ],
  "repo": "https://github.com/Himu1221/sales-margin-business-analysis",
  "note": "Independent demonstration using Microsoft’s 2013–2014 sample data. No stakeholder interviews, implemented intervention, causal effect, or realized savings are claimed. Reported profit excludes unavailable operating expenses. Source attribution and limitations are documented in the repository."
},
  "senior": {
    "type": "01 / FULL STACK DEVELOPMENT & BUSINESS ANALYSIS",
    "title": "Senior Support Client Management System",
    "period": "Jun 2026 – Jul 2026 · Independent portfolio application",
    "subtitle": "A complete business-analysis and application-development project for a fictional non-medical senior-support business.",
    "tags": [
      "Python / Flask",
      "SQLAlchemy / SQLite",
      "Jinja / HTML / CSS",
      "pytest",
      "GitHub Actions"
    ],
    "fact": [
      "136",
      "Automated pytest tests, with continuous integration configured in GitHub Actions."
    ],
    "sections": [
      [
        "The business problem",
        "The demonstration business relied on separate notes and manual scheduling. The application brings fictional client records, a fixed service catalogue, one-time appointments, operational metrics, and filtered reports into one place."
      ],
      [
        "What I built",
        "Developed a server-rendered Flask application with SQLAlchemy, SQLite, and Jinja. Implemented client and service management, appointment scheduling, duplicate warnings, approved status transitions, rescheduling, cancellation, dashboards, and operational reporting."
      ],
      [
        "Business analysis",
        "Created business, functional, and non-functional requirements; user stories; acceptance criteria; current and future process documentation; a data dictionary; and a requirements traceability matrix connecting needs to implementation and validation."
      ],
      [
        "Quality and safeguards",
        "Implemented server-side validation, CSRF protection, accessibility improvements, privacy safeguards, history-preserving workflows, and America/Regina time handling. Added an isolated pytest suite and a GitHub Actions workflow."
      ]
    ],
    "resources": [
      [
        "Business requirements",
        "https://github.com/Himu1221/senior-support-management-system/blob/main/docs/business-requirements.md"
      ],
      [
        "User stories",
        "https://github.com/Himu1221/senior-support-management-system/blob/main/docs/user-stories.md"
      ],
      [
        "Traceability matrix",
        "https://github.com/Himu1221/senior-support-management-system/blob/main/docs/requirements-traceability-matrix.md"
      ]
    ],
    "gallery": [
      {
        "src": "/assets/senior-support/dashboard.png",
        "label": "Dashboard",
        "alt": "Actual operations dashboard with fictional client and appointment summaries"
      },
      {
        "src": "/assets/senior-support/appointments.png",
        "label": "Appointments",
        "alt": "Actual appointment management screen with fictional demonstration records"
      },
      {
        "src": "/assets/senior-support/reports.png",
        "label": "Reports",
        "alt": "Actual operational reporting screen from the fictional demonstration application"
      }
    ],
    "repo": "https://github.com/Himu1221/senior-support-management-system",
    "note": "Portfolio demonstration for a fictional business. All records and contact details are fictional; the application is not intended for production use. Screenshots are taken from the project repository."
  },
  "wildlife": {
    "type": "02 / AI & MACHINE LEARNING · ACADEMIC CAPSTONE",
    "title": "Wildlife Species Detection System",
    "period": "Jan 2024 – Apr 2024 · Saskatchewan Polytechnic",
    "subtitle": "Exploring how computer vision can support a better understanding of wildlife.",
    "tags": [
      "Python",
      "TensorFlow / Keras",
      "Flask",
      "Image classification"
    ],
    "fact": [
      "≈82.6%",
      "Best recorded validation accuracy in project experiments."
    ],
    "sections": [
      [
        "The idea",
        "Build a machine learning model that can classify endangered wildlife species from images, then make predictions accessible through a web interface."
      ],
      [
        "The build",
        "Trained a convolutional neural network using TensorFlow and Keras, with image preprocessing, augmentation, and iterative training. Evaluated the model using validation results, a confusion matrix, and a classification report."
      ],
      [
        "The application",
        "Developed a Flask web application for image-based predictions, bringing dataset preparation, model evaluation, and application integration together in an academic capstone."
      ]
    ],
    "note": "Academic capstone with a locally hosted Flask interface. Portfolio cover is illustrative. Wildlife photograph: Hemant Kasar / Unsplash.",
    "credit": [
      "https://unsplash.com/photos/GghM6kz6EGY",
      "Photo source"
    ]
  },
  "cars": {
    "type": "03 / DATA & BUSINESS INTELLIGENCE",
    "title": "Used Car Price Analysis",
    "subtitle": "A practical look at vehicle pricing through SQL and Power BI.",
    "tags": [
      "Power BI",
      "MySQL",
      "Power Query",
      "Data visualization"
    ],
    "sections": [
      [
        "The question",
        "How can vehicle data help someone explore asking prices and find patterns across makes, models, vehicle age, and mileage?"
      ],
      [
        "The build",
        "Prepared and analyzed used-car data using SQL and Power Query, corrected data types, and created price classifications and year and mileage bands. Built Power BI views for pricing categories, average price over time, make and model comparisons, and potentially undervalued vehicles."
      ],
      [
        "The takeaway",
        "The dashboard connects data preparation with visual exploration, giving asking prices context through filters and comparisons."
      ]
    ],
    "note": "Portfolio analytics project. Dashboard artwork is an illustrative concept. Pricing categories are exploratory indicators from the project."
  },
  "crime": {
    "type": "04 / SOFTWARE DEVELOPMENT · UNIVERSITY PROJECT",
    "title": "Crime Reporting System",
    "period": "Ganpat University",
    "subtitle": "A role-based web application for reporting and tracking crimes securely.",
    "tags": [
      "C# / ASP.NET",
      "MySQL",
      "Google Charts",
      "Role-based access"
    ],
    "fact": [
      "25%",
      "Reduction in manual reporting inefficiencies reported for the project."
    ],
    "sections": [
      [
        "The idea",
        "Improve the process of reporting and tracking crimes through a structured web application with role-based access."
      ],
      [
        "The build",
        "Created the application using C# and MySQL and integrated the Google Charts API to visualize crime trends. Focused on access control, data security, and making records easier to report and track."
      ],
      [
        "The outcome",
        "The project reduced manual reporting inefficiencies by 25% and strengthened the application’s access control and handling of reporting data."
      ]
    ],
    "repo": "https://github.com/Himu1221/E-Police",
    "note": "University project associated with Ganpat University. The portfolio cover is illustrative artwork; source code is available in the E-Police repository."
  },
  "helping": {
    "type": "05 / COMMUNITY & WEB DEVELOPMENT · UNIVERSITY PROJECT",
    "title": "Helping Hands",
    "period": "Ganpat University",
    "subtitle": "A support platform for international students finding their way in a new place.",
    "tags": [
      "JavaScript",
      "CSS",
      "Firebase",
      "Responsive design"
    ],
    "fact": [
      "100+",
      "International students supported by the platform."
    ],
    "sections": [
      [
        "The idea",
        "Help international students find housing, jobs, and essential services through a shared support platform."
      ],
      [
        "The build",
        "Used JavaScript and CSS to create an interactive interface and deployed a Firebase backend for data storage. Developed a responsive experience for students using different devices."
      ],
      [
        "The outcome",
        "Built a platform supporting more than 100 international students and improved the user experience through responsive design and behavioral data analysis."
      ]
    ],
    "note": "University project associated with Ganpat University. The cover is original portfolio artwork representing the project concept."
  },
  "sales": {
    "type": "06 / DATA & BUSINESS INTELLIGENCE",
    "title": "Sales & KPI Dashboard",
    "subtitle": "Interactive Power BI reporting for revenue, performance metrics, and business trends.",
    "tags": [
      "Power BI",
      "SQL",
      "Excel",
      "Dashboard development",
      "KPI reporting"
    ],
    "sections": [
      [
        "The goal",
        "Make revenue and performance metrics easier to monitor through interactive dashboards."
      ],
      [
        "The build",
        "Designed Power BI dashboards and integrated SQL and Excel data sources to create dynamic reporting views. Organized key performance indicators and visual comparisons to reveal trends and performance gaps."
      ],
      [
        "The value",
        "Turned business data into a clearer visual view of performance to support informed decisions and reporting conversations."
      ]
    ],
    "note": "Portfolio analytics project. The artwork on this website is an illustrative dashboard concept."
  }
};
const dialog = $('#project-dialog');
let lastProjectTrigger;
function escapeHTML(value) {
  return value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
}
function openCase(key, trigger) {
  const project = cases[key];
  if (!project) return;
  lastProjectTrigger = trigger;
  const icon = '<svg class="icon"><use href="#arrow-up-right"/></svg>';
  const email = 'mailto:himanshugidhvani79@gmail.com?subject=' + encodeURIComponent('Let’s talk about ' + project.title);
  const gallery = project.gallery ? `<section class="case-gallery" aria-label="Application screenshots"><h3>Inside the application</h3><div class="gallery-controls" aria-label="Choose an application screenshot">${project.gallery.map((shot,index)=>`<button data-shot="${index}" aria-pressed="${index===0}">${escapeHTML(shot.label)}</button>`).join('')}</div><img class="case-gallery-image" src="${project.gallery[0].src}" alt="${escapeHTML(project.gallery[0].alt)}" loading="lazy"><div class="gallery-caption"><span class="case-gallery-caption">${escapeHTML(project.gallery[0].label)} · fictional demonstration data</span><a class="case-image-link" href="${project.gallery[0].src}" target="_self">Open full-size ${icon}</a></div></section>` : '';
  const resources = project.resources ? `<div class="case-resources">${project.resources.map(([label,url])=>`<a href="${url}" target="_self" rel="noopener noreferrer">${escapeHTML(label)} ${icon}</a>`).join('')}</div>` : '';
  const primary = project.repo ? `<a class="button button-green" href="${project.repo}" target="_self" rel="noopener noreferrer">View source on GitHub ${icon}</a><a class="text-link" href="${email}">Discuss this project ${icon}</a>` : `<a class="text-link" href="${email}">Talk about this project ${icon}</a>`;
  $('#dialog-content').innerHTML = `<div class="dialog-hero"><p class="eyebrow">${escapeHTML(project.type)}</p><h2 id="dialog-title">${escapeHTML(project.title)}</h2>${project.period ? `<p class="dialog-period">${escapeHTML(project.period)}</p>` : ''}<p class="dialog-subtitle">${escapeHTML(project.subtitle)}</p><div class="tags">${project.tags.map(tag => `<span>${escapeHTML(tag)}</span>`).join('')}</div></div><div class="dialog-body">${project.fact ? `<div class="case-fact"><strong>${escapeHTML(project.fact[0])}</strong><span>${escapeHTML(project.fact[1])}</span></div>` : ''}${project.sections.map(([title, text]) => `<section class="case-section"><h3>${escapeHTML(title)}</h3><p>${escapeHTML(text)}</p></section>`).join('')}${resources}${gallery}<p class="case-note">${escapeHTML(project.note)}${project.credit ? ` <a href="${project.credit[0]}" target="_self" rel="noopener noreferrer" style="text-decoration:underline">${project.credit[1]} ↗</a>` : ''}</p><div class="dialog-footer"><div class="dialog-main-actions">${primary}</div><button data-close-case>Back to work</button></div></div>`;
  $('[data-close-case]', dialog).addEventListener('click', () => dialog.close());
  $$('[data-shot]',dialog).forEach(button=>button.addEventListener('click',()=>{
    const shot=project.gallery[Number(button.dataset.shot)];
    const img=$('.case-gallery-image',dialog);
    img.src=shot.src;img.alt=shot.alt;
    $('.case-gallery-caption',dialog).textContent=shot.label+' · fictional demonstration data';
    $('.case-image-link',dialog).href=shot.src;
    $$('[data-shot]',dialog).forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
  }));
  dialog.showModal();
  document.body.classList.add('dialog-open');
  dialog.scrollTop = 0;
  $('.dialog-close', dialog).focus();
}
$$('[data-project]').forEach(button => button.addEventListener('click', () => openCase(button.dataset.project, button)));
$('.dialog-close', dialog).addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  const box = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom)) dialog.close();
});
dialog.addEventListener('close', () => {
  document.body.classList.remove('dialog-open');
  if (lastProjectTrigger) lastProjectTrigger.focus({ preventScroll: true });
});

let toastTimer;
function showToast(text) {
  const toast = $('#toast');
  toast.textContent = text;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3500);
}
$('#copy-email').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText('himanshugidhvani79@gmail.com');
    showToast('Email address copied. Let’s connect!');
  } catch {
    showToast('Email: himanshugidhvani79@gmail.com');
  }
});

// A code-drawn torus knot: one continuous surface, three interwoven paths.
// It has no external graphics dependency, and respects reduced motion.
(() => {
  const canvas = $('#orbital');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const motionButton = $('#motion-toggle');
  let paused = motionQuery.matches;
  let visible = true;
  let width = 500, height = 490, dpr = 1;
  let angle = .35, tilt = -.23, pointerAngle = 0, pointerTilt = 0;
  let dragging = false, previousX = 0, previousY = 0, frameId = 0;
  let previousTime = 0;
  const count = 210;
  const sides = 20;
  const points = [];
  const centers = [];
  const normalize = ([x,y,z]) => { const length = Math.hypot(x,y,z) || 1; return [x/length,y/length,z/length]; };
  const cross = (a,b) => [a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
  function center(t) { return [(1.82+.65*Math.cos(3*t))*Math.cos(2*t),(1.82+.65*Math.cos(3*t))*Math.sin(2*t),.8*Math.sin(3*t)]; }
  for (let i=0;i<count;i++) {
    const t = i/count*Math.PI*2;
    const c = center(t);
    const next = center(t+.001);
    const tangent = normalize(next.map((n,j) => n-c[j]));
    const normal = normalize(cross(tangent,[0,0,1]));
    const binormal = normalize(cross(tangent,normal));
    centers.push(c);
    for(let j=0;j<sides;j++) {
      const v = j/sides*Math.PI*2;
      const surfaceNormal = normal.map((n,k) => Math.cos(v)*n+Math.sin(v)*binormal[k]);
      points.push({p:c.map((n,k) => n+.28*surfaceNormal[k]),n:surfaceNormal,i,j});
    }
  }
  function rotate(p,a,b) {
    const x=p[0]*Math.cos(a)+p[2]*Math.sin(a);
    const z=-p[0]*Math.sin(a)+p[2]*Math.cos(a);
    return [x,p[1]*Math.cos(b)-z*Math.sin(b),p[1]*Math.sin(b)+z*Math.cos(b)];
  }
  function resize() {
    const box=canvas.getBoundingClientRect();
    width=box.width;height=box.height;dpr=Math.min(window.devicePixelRatio||1,2);
    canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);
    ctx.setTransform(dpr,0,0,dpr,0,0);
    if(paused) draw();
  }
  function draw() {
    ctx.clearRect(0,0,width,height);
    const scale = Math.min(width/6.9,height/6.5);
    const a=angle+pointerAngle;
    const b=tilt+pointerTilt;
    const projected=points.map(point=>{
      const p=rotate(point.p,a,b);
      const n=rotate(point.n,a,b);
      const depth=7.6/(7.6+p[2]);
      const light=Math.max(0,n[0]*-.55+n[1]*-.65+n[2]*-.48);
      return {x:width*.5+p[0]*scale*depth,y:height*.49+p[1]*scale*depth,z:p[2],light,n,depth,point};
    });
    // Sparse construction lines make the shape read as a woven metallic object.
    for(let i=0;i<count;i++) {
      for(let j=0;j<sides;j+=2) {
        const index=i*sides+j;
        const p=projected[index];
        const next=projected[((i+1)%count)*sides+j];
        const lum=p.light;
        const alpha=.07+lum*.38;
        const green=j>=6&&j<=10;
        ctx.strokeStyle=green?`rgba(188,233,111,${alpha})`:`rgba(216,225,204,${alpha*.9})`;
        ctx.lineWidth=.55+lum*.45;
        ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(next.x,next.y);ctx.stroke();
      }
    }
    const ordered=projected.slice().sort((a,b)=>b.z-a.z);
    for(const p of ordered) {
      const lum=p.light;
      const v=.13+lum*.82;
      const green=p.point.j>=6&&p.point.j<=10;
      const shade=Math.round(130+lum*115);
      ctx.fillStyle=green?`rgba(192,239,119,${v})`:`rgba(${shade},${Math.min(255,shade+7)},${Math.max(0,shade-7)},${v})`;
      ctx.beginPath();ctx.arc(p.x,p.y,(.5+lum*.55)*p.depth,0,Math.PI*2);ctx.fill();
    }
    // A quiet ground shadow gives the floating form a physical anchor.
    const shadow=ctx.createRadialGradient(width*.5,height*.93,0,width*.5,height*.93,width*.3);
    shadow.addColorStop(0,'rgba(133,165,77,.07)');shadow.addColorStop(1,'rgba(133,165,77,0)');
    ctx.fillStyle=shadow;ctx.fillRect(0,height*.84,width,height*.16);
  }
  function tick(time) {
    if(!paused && visible && !document.hidden) {
      const delta=previousTime ? Math.min(time-previousTime,40) : 16;
      if(!dragging) angle+=delta*.000105;
      draw();
    }
    previousTime=time;
    frameId=requestAnimationFrame(tick);
  }
  function updateMotionButton() {
    motionButton.setAttribute('aria-pressed',String(paused));
    motionButton.setAttribute('aria-label',paused?'Play sculpture animation':'Pause sculpture animation');
    $('.pause-icon',motionButton).textContent=paused?'▷':'Ⅱ';
  }
  motionButton.addEventListener('click',()=>{paused=!paused;updateMotionButton();draw();});
  motionQuery.addEventListener('change',event=>{paused=event.matches;updateMotionButton();draw();});
  canvas.addEventListener('pointerdown',event=>{dragging=true;previousX=event.clientX;previousY=event.clientY;canvas.setPointerCapture(event.pointerId);});
  canvas.addEventListener('pointermove',event=>{if(!dragging)return;pointerAngle+=(event.clientX-previousX)*.008;pointerTilt+=(event.clientY-previousY)*.006;previousX=event.clientX;previousY=event.clientY;draw();});
  canvas.addEventListener('pointerup',()=>{dragging=false;});
  canvas.addEventListener('pointercancel',()=>{dragging=false;});
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;}).observe(canvas);
  new ResizeObserver(resize).observe(canvas);
  updateMotionButton();resize();draw();frameId=requestAnimationFrame(tick);
  window.addEventListener('pagehide',()=>cancelAnimationFrame(frameId));
})();
