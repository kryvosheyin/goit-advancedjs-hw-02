import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */const d=()=>`#${Math.floor(Math.random()*16777215).toString(16).padStart(6,0)}`;let e;const t=(r,a)=>{o.disabled=r,n.disabled=a},s=()=>{t(!0,!1),e=setInterval(()=>{document.body.style.backgroundColor=d()},1e3)},l=()=>{clearInterval(e),t(!1,!0)},o=document.querySelector("[data-start]"),n=document.querySelector("[data-stop]");document.addEventListener("DOMContentLoaded",()=>{t(!1,!0),o.addEventListener("click",s),n.addEventListener("click",l)});
//# sourceMappingURL=commonHelpers.js.map
