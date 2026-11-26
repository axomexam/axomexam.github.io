(function(){"use strict";const i=window.AXOLeaderboard;function m(e){return document.getElementById(e)}function a(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function r(e,t){try{const l=window.AXOApp,o=l&&l.tc||l&&l.t;if(typeof o=="function"){const n=o(e);if(n&&n!==e)return n}}catch{}return t||e}function w(){try{const e=window.AXOApp;return e&&typeof e.contentLang=="function"?e.contentLang()==="as"?"as":"en":e&&e.uiLang()==="as"?"as":"en"}catch{return"en"}}let y=!1;function E(e){let t=null,l=0;try{const n=window.AXOApp&&window.AXOApp.mock();if(n&&i&&i.resolveScope&&i.resolveScope(n.cat&&n.cat.id,n.subId)){t=i.resolveScope(n.cat.id,n.subId);let s=0;n.pool.forEach((b,p)=>{n.answers[p]===b.correct&&s++}),l=n.pool.length?Math.round(s/n.pool.length*100):0}}catch{t=null}if(!t||!i||!i.enabled()){e();return}try{i.recordAttempt(t,l)}catch{}const o=i.storedName();if(o){i.submitScore(t,l,o).catch(()=>{}),e();return}T(t,l,e)}function T(e,t,l){const o=document.createElement("div");o.className="lb-modal",o.id="lb-join-modal",o.innerHTML=`
      <div class="lb-modal-backdrop"></div>
      <div class="lb-modal-box" role="dialog" aria-modal="true" aria-labelledby="lb-join-title">
        <div class="lb-modal-ico">🏆</div>
        <h3 id="lb-join-title">${a(r("lb.join.title","Join the leaderboard?"))}</h3>
        <p>${a(r("lb.join.body","Your name will be shown on the leaderboard with your best score. If you skip, your name and score are not saved anywhere."))}</p>
        <div class="lb-modal-actions">
          <button class="btn btn-outline" id="lb-join-skip" type="button">${a(r("lb.join.skip","Skip"))}</button>
          <button class="btn btn-primary" id="lb-join-yes" type="button">${a(r("lb.join.yes","Yes, add me"))}</button>
        </div>
      </div>`,document.body.appendChild(o);let n=!1;const s=()=>o.remove(),b=()=>{n||(n=!0,s(),l())};m("lb-join-skip").addEventListener("click",()=>{n||b()}),m("lb-join-yes").addEventListener("click",()=>{n||(s(),C(e,t,l))})}function $(e){const t=e.mode,l=document.createElement("div");l.className="lb-modal",l.id="lb-name-modal",l.innerHTML=`
      <div class="lb-modal-backdrop"></div>
      <div class="lb-modal-box" role="dialog" aria-modal="true" aria-labelledby="lb-name-title">
        <div class="lb-modal-ico">${t==="profile"?"👤":"✍️"}</div>
        <h3 id="lb-name-title">${a(e.title)}</h3>
        <p>${a(e.body)}</p>
        ${e.current?`<p class="lb-profile-current">${a(r("lb.profile.current","Current name"))}: <b>${a(e.current)}</b></p>`:""}
        <input class="lb-name-input" id="lb-name-input" type="text" maxlength="20"
               autocomplete="off" spellcheck="false" placeholder="${a(r("lb.name.ph","Your name"))}">
        <p class="lb-name-err" id="lb-name-err" role="alert"></p>
        <div class="lb-modal-actions">
          <button class="btn btn-outline" id="lb-name-cancel" type="button">${a(e.cancelLabel)}</button>
          <button class="btn btn-primary" id="lb-name-save" type="button">${a(e.saveLabel)}</button>
        </div>
      </div>`,document.body.appendChild(l);const o=m("lb-name-input"),n=m("lb-name-err"),s=m("lb-name-save");setTimeout(()=>o.focus(),30);let b=!1;const p=()=>l.remove(),c=()=>{b||(b=!0,p(),e.done())};m("lb-name-cancel").addEventListener("click",()=>{b||(p(),c())});const u=(d,v)=>{n.textContent=r(d,v)},h=async()=>{if(y)return;const d=i.validateName(o.value);if(!d.ok){d.code==="short"?u("lb.name.short","Please enter at least 2 characters."):d.code==="long"?u("lb.name.long","Please keep the name within 20 characters."):d.code==="chars"?u("lb.name.chars","Only letters, numbers, spaces and underscore are allowed."):d.code==="junk"?u("lb.name.junk","Please enter your real name, not a random word."):d.code==="noname"?u("lb.name.noname","Please enter a name with at least one letter."):u("lb.name.bad","This name is not allowed. Please choose another."),o.focus();return}y=!0,s.disabled=!0,n.textContent="";try{if(!(await i.reserveName(d.name)).ok){u("lb.name.taken","Two people are already using this name. Please add a middle name or initial.");return}if(t==="join"){const S=await i.submitScore(e.scope,e.pct,d.name);if(!S.ok){if(S.code==="rate"){u("lb.name.rate","Daily leaderboard limit reached.");return}u("lb.name.err","Could not save right now. Please try again.");return}}i.storeName(d.name),c()}catch{u("lb.name.err","Could not save right now. Please try again.")}finally{y=!1,s.disabled=!1}};s.addEventListener("click",h),o.addEventListener("keydown",d=>{d.key==="Enter"&&h()})}function C(e,t,l){$({mode:"join",scope:e,pct:t,title:r("lb.name.title","Enter your name"),body:r("lb.name.body","This name will appear on the leaderboard."),saveLabel:r("lb.name.save","Save and submit"),cancelLabel:r("lb.name.cancel","Cancel"),done:l})}function B(e){$({mode:"profile",title:r("lb.profile.title","Your profile"),body:r("lb.profile.body","Set the name shown on the leaderboard. Scores you already submitted keep their old name; your next mock test uses this one."),current:i.storedName(),saveLabel:r("lb.profile.save","Save name"),cancelLabel:r("lb.name.cancel","Cancel"),done:e})}const f={subject:null,requestId:0};function I(){return i.SUBJECTS[0]&&i.SUBJECTS[0].id||"gk"}function M(e,t){const l=i.SUBJECTS.find(o=>o.id===e);return l?t==="as"?l.name.as:l.name.en:e}function g(e){return(i.SUBS[e]||[]).map(t=>({id:t[0],en:t[1],as:t[2]}))}function A(e,t){return t==="as"?e.as:e.en}function k(e){try{return new URLSearchParams(window.location.search).get(e)||""}catch{return""}}function P(){const e=k("subject");return i.SUBJECTS.some(t=>t.id===e)?e:null}function x(e,t){return`
      <div class="lb-subcard" id="lb-sub-${a(e.id)}">
        <div class="lb-subcard-head">
          <h2>${a(A(e,t))}</h2>
          <span class="lb-subcard-badge">${a(r("lb.top5","Top 5"))}</span>
        </div>
        <div class="lb-subcard-body" id="lb-board-${a(e.id)}">
          <div class="lb-skel">${a(r("lb.loading","Loading leaderboard…"))}</div>
        </div>
      </div>`}function N(){if(window.location.search)try{window.history.replaceState(null,null,window.location.pathname)}catch{}}function L(e){const t=w(),l=P();l&&(f.subject=l);const o=f.subject||I();f.subject=o,f.requestId++;const n=g(o);e.innerHTML=`
      <div class="page-head">
        <nav class="breadcrumb">
          <a href="/">${a(r("breadcrumb.home","Home"))}</a><span class="bc-sep">/</span><span>${a(r("lb.title","Leaderboard"))}</span>
        </nav>
        <div class="page-head-row">
          <h1>🏆 ${a(r("lb.title","Leaderboard"))}</h1>
          <button class="lb-profile-btn" id="lb-profile-btn" type="button"
                  aria-label="${a(r("lb.profile.title","Your profile"))}"
                  title="${a(r("lb.profile.title","Your profile"))}">
            <svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor"
                 stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
            <span class="lb-profile-name">${a(i.storedName()||r("lb.profile.setName","Set name"))}</span>
          </button>
        </div>
        <p class="page-desc">${a(r("lb.sub",""))}</p>
      </div>

      <section class="lb-wrap">
        <div class="lb-tabs" id="lb-tabs" role="tablist" aria-label="${a(r("lb.subject","Subject"))}">
          ${i.SUBJECTS.map(c=>`
            <button type="button" role="tab" class="lb-tab${c.id===o?" active":""}"
              data-subject="${a(c.id)}" aria-selected="${c.id===o?"true":"false"}">
              ${a(t==="as"?c.name.as:c.name.en)}
            </button>`).join("")}
        </div>

        <div class="lb-boards" id="lb-boards">
          ${n.length?n.map(c=>x(c,t)).join(""):`<div class="lb-empty">${a(r("lb.empty","No scores here yet. Be the first to join!"))}</div>`}
        </div>

        <div class="lb-card lb-graphcard">
          <div class="lb-card-head">
            <h2>${a(r("lb.graphTitle","Your accuracy by sub-category"))}</h2>
          </div>
          <div id="lb-graph" class="lb-graph"></div>
        </div>
      </section>`;const s=m("lb-profile-btn");s&&s.addEventListener("click",()=>{B(()=>{const c=s.querySelector(".lb-profile-name");c&&(c.textContent=i.storedName()||r("lb.profile.setName","Set name"))})});const b=m("lb-tabs");b&&Array.prototype.forEach.call(b.querySelectorAll(".lb-tab"),c=>{c.addEventListener("click",()=>{c.dataset.subject!==f.subject&&(N(),f.subject=c.dataset.subject,L(e))})}),n.forEach(c=>H(o,c,t)),J();const p=k("sub");if(p&&n.some(c=>c.id===p)){const c=m("lb-sub-"+p);if(c){c.classList.add("lb-subcard-target");const u=()=>{try{c.scrollIntoView({block:"center",behavior:"smooth"})}catch{}};typeof window.requestAnimationFrame=="function"?window.requestAnimationFrame(u):u()}}}async function H(e,t,l){const o=e+"/"+t.id,n=m("lb-board-"+t.id);if(!n)return;const s=f.requestId;try{const b=await i.fetchTop(o,5);if(s!==f.requestId)return;if(!b.ok){n.innerHTML=j();return}const p=i.deviceId(),c=b.rows.findIndex(d=>d.deviceId&&d.deviceId===p);let u="";if(c<0&&q(o)){const d=await i.fetchMyRank(o);if(s!==f.requestId)return;d&&d.ok&&d.rank>0&&(u=O(d.mine,d.rank,d.total,l))}const h=b.rows.length?b.rows.map((d,v)=>U(d,v+1,l,d.deviceId===p)).join(""):`<div class="lb-empty">${a(r("lb.empty","No scores here yet. Be the first to join!"))}</div>`;n.innerHTML=h+u}catch{if(s!==f.requestId)return;n.innerHTML=j()}}function q(e){try{const t=i.bestByScope();return!!t&&Object.prototype.hasOwnProperty.call(t,e)}catch{return!1}}function O(e,t,l,o){const n=t===1?"🥇":t===2?"🥈":t===3?"🥉":"";return`
      <div class="lb-myline">
        <span class="lb-myline-tag">${a(r("lb.you","Your rank"))}</span>
        <span class="lb-myline-rank">${n||"#"+t}</span>
        <span class="lb-myline-name">${a(e.name)}</span>
        <span class="lb-myline-score">${e.bestPct}%</span>
        ${l!=null?`<span class="lb-myline-of">${a(r("lb.of","of"))} ${l}</span>`:""}
      </div>`}function j(){return`<div class="lb-empty">${a(r("lb.error","Could not load the leaderboard right now."))}
      <button class="lb-retry" type="button" onclick="location.reload()">${a(r("lb.retry","Retry"))}</button></div>`}function U(e,t,l,o){return`
      <div class="lb-row${o?" lb-row-me":""}">
        <span class="lb-row-rank">${(t===1?"🥇":t===2?"🥈":t===3?"🥉":"")||"#"+t}</span>
        <span class="lb-row-name">${a(e.name)}</span>
        <span class="lb-row-score">${e.bestPct}%</span>
      </div>`}function J(){const e=m("lb-graph");if(!e)return;const t=w(),l=i.bestByScope(),o=[];if(i.SUBJECTS.forEach(s=>{g(s.id).forEach(b=>{const p=s.id+"/"+b.id;p in l&&o.push({scope:p,label:M(s.id,t)+" • "+(t==="as"?b.as:b.en),pct:l[p]})})}),!o.length){e.innerHTML=`<div class="lb-empty">${a(r("lb.graphEmpty","Attempt a few practice sets to see your accuracy graph."))}</div>`;return}o.sort((s,b)=>b.pct-s.pct);const n=o[o.length-1];e.innerHTML=`
      <div class="lb-bars">
        ${o.map(s=>`
          <div class="lb-bar-row">
            <span class="lb-bar-label" title="${a(s.label)}">${a(s.label)}</span>
            <span class="lb-bar-track">
              <span class="lb-bar-fill" style="width:${Math.max(2,s.pct)}%;--v:${s.pct}"></span>
            </span>
            <span class="lb-bar-val">${s.pct}%</span>
          </div>`).join("")}
      </div>
      <p class="lb-weak">${a(r("lb.graphWeak","Weakest"))}: <b>${a(n.label)}</b> — ${n.pct}%</p>`}window.AXOLeaderboardUI={beforeFinalSubmit:E,renderPage:L}})();
