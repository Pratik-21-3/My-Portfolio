class ImageSlider{
    constructor(selector){
        this.slider = document.querySelector(selector);
        this.track = this.slider.querySelector(".slider-track");
        this.slides = Array.from(this.track.children);
        this.prevButton = this.slider.querySelector(".prev");
        this.nextButton = this.slider.querySelector(".next");
        this.dotsContainer = this.slider.querySelector(".slider-dots");
        this.dots = [];
        this.currentSlideIndex = 0;
        this.autoSlideInterval = null;
        this.init();

    }
    init(){
        this.createDots();
        this.bindEvents();
        this.startAutoSlide();
    }
       updateSliderPosition(){
        const offset =-this.currentSlideIndex*this.slider.offsetWidth;
        this.track.style.transform = `translateX(${offset}px)`;
        this.updateDots();
       }
       nextSlide(){
        this.currentSlideIndex=(this.currentSlideIndex+1)%this.slides.length;
        this.updateSliderPosition();
        this.updateDots();
       }
       prevSlide(){
        if(this.currentSlideIndex>0){
            this.currentSlideIndex=(this.currentSlideIndex-1)%this.slides.length;
            
        }
        else{
            this.currentSlideIndex=this.slides.length-1;
        }
        this.updateSliderPosition();
       }
       bindEvents(){
        this.nextButton.addEventListener("click", () => this.nextSlide());
        this.prevButton.addEventListener("click", () => this.prevSlide());
        this.slider.addEventListener("mouseenter", () => this.stopAutoSlide());
        this.slider.addEventListener("mouseleave", () => this.startAutoSlide());

       }

       startAutoSlide(){
      
        this.autoSlideInterval = window.setInterval(() => this.nextSlide(), 5000);
       }

       stopAutoSlide(){
        if(this.autoSlideInterval === null){
            return;
        }
        window.clearInterval(this.autoSlideInterval);
        this.autoSlideInterval = null;

       }

       createDots(){
        this.dotsContainer.innerHTML="";
        this.slides.forEach((_,index)=>{
            const dot=document.createElement("div");
            dot.classList.add("dot");
            dot.addEventListener("click",()=>{
                this.currentSlideIndex=index;
                this.updateSliderPosition();
        
        });
        this.dotsContainer.appendChild(dot);
        this.dots.push(dot);
        });
        this.updateDots();
       }

       updateDots(){
        this.dots.forEach((dot,index)=>{
            dot.classList.toggle("active",index===this.currentSlideIndex);

        });

    }





}
document.addEventListener("DOMContentLoaded", () =>new ImageSlider(".slider"));