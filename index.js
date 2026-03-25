import{a as c,S as m}from"./assets/vendor-Gn7wCpW2.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}})();const y="55171799-755350edf6c0ed064d9a514af",g=c.defaults.baseURL="https://pixabay.com/api/";function h(r){return c.get(g,{params:{key:`${y}`,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0}})}const d=document.querySelector(".gallery-list");function L(r){const s=r==null?void 0:r.map(a=>{const{webformatURL:i,largeImageURL:e,tags:t,likes:o,views:f,comments:p,downloads:u}=a;return`<li class='gallery-item'>
        <a class='gallery-link' href='${e}'>
          <img class='gallery-image' src='${i}' alt='${t}'>
        </a>
        <div class='image-description-wrapper'>
          <p class='image-text-info'>Likes <span class='additional-text-info'>${o}</span></p>
          <p class='image-text-info'>Views <span class='additional-text-info'>${f}</span></p>
          <p class='image-text-info'>Comments <span class='additional-text-info'>${p}</span></p>
          <p class='image-text-info'>Downloads <span class='additional-text-info'>${u}</span></p>
        </div>
      </li>`}).join("");d.insertAdjacentHTML("afterbegin",s)}function x(){d.innerHTML=""}const n=document.querySelector(".form"),l=document.querySelector(".loader");n.addEventListener("submit",r=>{r.preventDefault(),x(),l.classList.add("is-hidden");const s=n.elements["search-text"].value.trim();if(s===""){alertNoEmptySearch();return}h(s).then(a=>{a.data.hits===0?alertNoImagesFound():(l.classList.remove("is-hidden"),L(a.data.hits),new m(".gallery-link",{overlayOpacity:.8,captionDelay:250,captionsData:"alt"}).refresh())}).catch(a=>console.log(a)).finally(n.reset())});
//# sourceMappingURL=index.js.map
