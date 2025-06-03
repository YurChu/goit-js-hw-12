import{a as w,S,i as n}from"./assets/vendor-DFCQGEf1.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))e(s);new MutationObserver(s=>{for(const t of s)if(t.type==="childList")for(const f of t.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&e(f)}).observe(document,{childList:!0,subtree:!0});function o(s){const t={};return s.integrity&&(t.integrity=s.integrity),s.referrerPolicy&&(t.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?t.credentials="include":s.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function e(s){if(s.ep)return;s.ep=!0;const t=o(s);fetch(s.href,t)}})();const b="50311976-cfb8a0f5325f69922ed901f36",C="https://pixabay.com/api/";async function g(r,a,o){try{const e=await w.get(C,{params:{key:b,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:a,per_page:o}});return{hits:e.data.hits,totalHits:e.data.totalHits}}catch(e){throw console.error("Request error:",e),e}}const u=document.querySelector(".gallery"),p=document.querySelector(".loader"),m=document.querySelector(".load-more"),q=new S(".gallery a",{captionsData:"alt",captionDelay:250});function h(r,a=!1){const o=r.map(e=>`
        <li class="gallery-item">
            <a class="gallery-link" href="${e.largeImageURL}">
                <img
                    class="gallery-image"
                    src="${e.webformatURL}" 
                    alt="${e.tags}" 
                    // width="360" 
                    // height="200" 
                />
            </a>
            <div class="image-info-wrapper">
                <div class="image-info">
                    <span class="image-info-type">Likes</span>
                    <span class="image-info-value">${e.likes}</span>                
                </div>

                <div class="image-info">
                    <span class="image-info-type">Views</span>
                    <span class="image-info-value">${e.views}</span>                
                </div>

                <div class="image-info">
                    <span class="image-info-type">Comments</span>
                    <span class="image-info-value">${e.comments}</span>                
                </div>

                <div class="image-info">
                    <span class="image-info-type">Downloads</span>
                    <span class="image-info-value">${e.downloads}</span>                
                </div>
            </div>
        </li>
    `).join("");u.insertAdjacentHTML("beforeend",o),q.refresh()}function y(){p.classList.remove("visually-hidden")}function v(){p.classList.add("visually-hidden")}function B(){u.innerHTML=""}function H(){m.classList.remove("visually-hidden")}function L(){m.classList.add("visually-hidden")}const x=document.querySelector("input[name='search-text']"),d=document.querySelector(".form"),R=document.querySelector(".load-more"),c=15;let l="",i=1;d.addEventListener("submit",async r=>{if(r.preventDefault(),l=x.value.trim(),l===""){n.show({message:"No data",messageColor:"#fff",messageSize:"16px",messageLineHeight:"1.5",backgroundColor:"#ffa000",progressBar:!1,position:"topRight"});return}i=1,B(),L(),y();try{const a=await g(l,i,c);if(a.hits.length===0){n.show({message:"There are no images matching your search query",messageColor:"#fff",messageSize:"16px",messageLineHeight:"1.5",backgroundColor:"#ffa000",progressBar:!1,position:"topRight"});return}h(a.hits),i*c<a.totalHits&&H()}catch{n.show({message:"Error: Please try again later.",messageColor:"#fff",messageSize:"16px",messageLineHeight:"1.5",backgroundColor:"#ffa000",progressBar:!1,position:"topRight"})}finally{v(),d.reset()}});R.addEventListener("click",async()=>{i+=1,y();const a=document.querySelector(".gallery li").getBoundingClientRect().height*2;try{const o=await g(l,i,c);h(o.hits,!0),scrollBy(0,a),i*c>=o.totalHits&&(L(),n.show({message:"We're sorry, but you've reached the end of search results.",messageColor:"#fff",messageSize:"16px",messageLineHeight:"1.5",backgroundColor:"#ffa000",progressBar:!1,position:"topRight"}))}catch{n.show({message:"Error: Please try again later.",messageColor:"#fff",messageSize:"16px",messageLineHeight:"1.5",backgroundColor:"#ffa000",progressBar:!1,position:"topRight"})}finally{v()}});
//# sourceMappingURL=index.js.map
