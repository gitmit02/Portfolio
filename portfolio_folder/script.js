
$(document).ready(function() {
    // Loader animation
    function typeText() {
        const text = "WELCOME";
        const typedTextSpan = $(".typed-text");
        const cursorSpan = $(".cursor");
        
        let i = 0;
        let timer = setInterval(function() {
            typedTextSpan.text(typedTextSpan.text() + text[i]);
            i++;
            if (i === text.length) {
                clearInterval(timer);
                setTimeout(function() {
                    $(".loader").fadeOut(500);
                }, 1000);
            }
        }, 100);
    }
    
    typeText();
    
    // Theme toggle
    $("#theme-toggle").on("click", function() {
        if ($("body").attr("data-theme") === "light") {
            $("body").attr("data-theme", "dark");
            $(this).text("🌙");
            localStorage.setItem("theme", "dark");
        } else {
            $("body").attr("data-theme", "light");
            $(this).text("☀️");
            localStorage.setItem("theme", "light");
        }
    });
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
        $("body").attr("data-theme", "light");
        $("#theme-toggle").text("☀️");
    }
    
    // Mobile menu toggle
    $(".hamburger").on("click", function() {
        $(this).toggleClass("active");
        $(".nav-links").toggleClass("active");
    });
    
    // Close mobile menu on link click
    $(".nav-link").on("click", function() {
        $(".hamburger").removeClass("active");
        $(".nav-links").removeClass("active");
    });
    
    // Smooth scrolling
    $('a[href^="#"]').on("click", function(e) {
        e.preventDefault();
        
        const target = $(this.getAttribute("href"));
        if (target.length) {
            $("html, body").animate(
                {
                    scrollTop: target.offset().top - 70
                },
                800
            );
        }
    });
    
    // Header scroll effect
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $("header").addClass("header-scrolled");
        } else {
            $("header").removeClass("header-scrolled");
        }
        
        // Back to top button
        if ($(this).scrollTop() > 300) {
            $(".back-to-top").addClass("show");
        } else {
            $(".back-to-top").removeClass("show");
        }
        
        // Animate elements on scroll
        animateOnScroll();
    });
    
    // Back to top button click
    $(".back-to-top").on("click", function() {
        $("html, body").animate(
            {
                scrollTop: 0
            },
            800
        );
    });
    
    // Project filtering
    $(".filter-btn").on("click", function() {
        const filter = $(this).data("filter");
        
        $(".filter-btn").removeClass("active");
        $(this).addClass("active");
        
        if (filter === "all") {
            $(".project-card").show(300);
        } else {
            $(".project-card").hide(300);
            $(".project-card[data-category='" + filter + "']").show(300);
        }
    });
    
    // Contact form submission
    $("#contactForm").on("submit", function(e) {
        e.preventDefault();
        
        const $form = $(this);
        const $submitBtn = $form.find(".submit-btn");
        const $spinner = $submitBtn.find(".spinner");
        const $formMessage = $form.find(".form-message");
        
        // Show loading state
        $submitBtn.prop("disabled", true);
        $spinner.css("display", "block");
        
        // Simulate form submission
        setTimeout(function() {
            // Hide loading state
            $submitBtn.prop("disabled", false);
            $spinner.css("display", "none");
            
            // Show success message
            $formMessage.fadeIn(300);
            
            // Reset form
            $form[0].reset();
            
            // Hide message after 3 seconds
            setTimeout(function() {
                $formMessage.fadeOut(300);
            }, 3000);
        }, 2000);
    });
    
    // Initialize particles.js
    if (typeof particlesJS !== 'undefined') {
        particlesJS("particles-js", {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: "#00ff88"
                },
                shape: {
                    type: "circle",
                    stroke: {
                        width: 0,
                        color: "#000000"
                    }
                },
                opacity: {
                    value: 0.5,
                    random: true
                },
                size: {
                    value: 3,
                    random: true
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#00ff88",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "grab"
                    },
                    onclick: {
                        enable: true,
                        mode: "push"
                    },
                    resize: true
                }
            },
            retina_detect: true
        });
    }
    
    // Animate elements on scroll
    function animateOnScroll() {
        // About section animations
        const aboutImg = $(".about-img");
        const aboutText = $(".about-text");
        
        if (isInViewport(aboutImg) && !aboutImg.hasClass("animate")) {
            aboutImg.addClass("animate");
        }
        
        if (isInViewport(aboutText) && !aboutText.hasClass("animate")) {
            aboutText.addClass("animate");
        }
        
        // Project cards animations
        $(".project-card").each(function() {
            if (isInViewport($(this)) && !$(this).hasClass("animate")) {
                $(this).addClass("animate");
            }
        });
        
        // Skills animations
        $(".skill-item").each(function(index) {
            if (isInViewport($(this)) && !$(this).hasClass("animate")) {
                const delay = parseInt($(this).data("delay")) || 0;
                
                setTimeout(() => {
                    $(this).addClass("animate");
                    
                    // Animate skill progress
                    const skillValue = parseInt($(this).find(".skill-value").text());
                    const circle = $(this).find(".skill-bar");
                    const radius = circle.attr("r");
                    const circumference = 2 * Math.PI * radius;
                    
                    const offset = circumference - (skillValue / 100 * circumference);
                    
                    circle.css({
                        "stroke-dasharray": circumference,
                        "stroke-dashoffset": circumference
                    });
                    
                    setTimeout(() => {
                        circle.css("transition", "stroke-dashoffset 1.5s ease-in-out");
                        circle.css("stroke-dashoffset", offset);
                    }, 100);
                    
                }, delay);
            }
        });
        
        // Contact section animations
        const contactInfo = $(".contact-info");
        const contactForm = $(".contact-form");
        
        if (isInViewport(contactInfo) && !contactInfo.hasClass("animate")) {
            contactInfo.addClass("animate");
        }
        
        if (isInViewport(contactForm) && !contactForm.hasClass("animate")) {
            contactForm.addClass("animate");
        }
    }
    
    // Check if element is in viewport
    function isInViewport(element) {
        const windowHeight = $(window).height();
        const elementTop = element.offset().top;
        const elementVisible = 150;
        
        return elementTop < (windowHeight + $(window).scrollTop()) - elementVisible;
    }
    
    // Trigger animations on page load
    setTimeout(function() {
        animateOnScroll();
    }, 500);
});
