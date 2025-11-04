
document.addEventListener("DOMContentLoaded",()=>{
  const langBtns=document.querySelectorAll(".lang-btn");
  const year=document.getElementById("year");
  let lang=localStorage.getItem("lang")||"en";
  function setLang(l){
    document.querySelectorAll("[data-lang]").forEach(e=>e.style.display=e.dataset.lang===l?"":"none");
    langBtns.forEach(b=>b.classList.toggle("active",b.dataset.lang===l));
    localStorage.setItem("lang",l);lang=l;
  }
  langBtns.forEach(b=>b.addEventListener("click",()=>setLang(b.dataset.lang)));
  if(year)year.textContent=new Date().getFullYear();
  setLang(lang);
});
