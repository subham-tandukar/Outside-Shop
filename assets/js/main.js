stickyTop = () => {
  const stickyElement = document.getElementById("header");
  const stickyClass = "sticky";

  // To initialize sticky class
  sticky = () => {
    if (window.scrollY > 0) {
      stickyElement.classList.add(stickyClass);
    } else {
      stickyElement.classList.remove(stickyClass);
    }
  };
  sticky();

  // To toggle sticky class on scroll
  window.addEventListener("scroll", () => {
    sticky();
  });
};
stickyTop();

calculateHeight = () => {
  const stickyElement = document.getElementById("header");

  const placeholder = document.querySelector(".placeholder");
  const banner = document.querySelector(".banner-section");
  const headerHeight = stickyElement.offsetHeight;

  // To set dynamic height for placeholder and banner
  placeholder.style.height = `${headerHeight}px`;
  banner.style.height = `calc(100vh - ${headerHeight}px)`;
};
calculateHeight();

closeAnnouncementBar = () => {
  const announcementBar = document.querySelector(".announcement-bar");
  const close = document.querySelector("#close-annoucement");

  // To close the announcement bar on click
  close.addEventListener("click", () => {
    announcementBar.style.display = "none";
    calculateHeight();
  });
};
closeAnnouncementBar();

animateHeader = () => {
  const siteLogo = document.querySelector(".site-logo");
  const menuLinks = document.querySelectorAll(".menu-bar .menu-link");

  // To add class to site logo with delay of 2 milliseconds
  setTimeout(() => {
    siteLogo.classList.add("show");
  }, 200);

  // To add class to each menu link with delay of 2 milliseconds
  menuLinks.forEach(function (item, index) {
    setTimeout(() => {
      item.classList.add("show");
    }, index * 200);
  });
};
animateHeader();

animateTitle = () => {
  const titles = document.querySelectorAll(".section-title");

  titles.forEach((item) => {
    // To store the original content of the title
    const originalText = item.textContent;

    const words = originalText.split(" ");

    // To reset the title content with empty string
    item.innerHTML = "";

    // To wrap each word with a new element i.e. div
    words.forEach((word) => {
      const div = document.createElement("div");
      div.textContent = word;
      div.classList.add("word-wrap");
      item.appendChild(div);
    });

    // To show the words only after it has been shown on the page
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            item.classList.add("is-animating");
            const divs = entry.target.querySelectorAll("div");
            divs.forEach((div, index) => {
              setTimeout(() => {
                div.classList.add("show-word");
              }, index * 200);
            });

            const totalAnimationTime = divs.length * 200 + 500;
            setTimeout(() => {
              item.innerHTML = originalText;
              item.classList.remove("is-animating");
            }, totalAnimationTime);

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(item);
  });
};
animateTitle();

tab = () => {
  const tabItem = document.querySelectorAll(".tab-item");
  const tabContent = document.querySelectorAll(".tab-content");

  const switchTab = (index) => {
    tabItem.forEach((item) => item.classList.remove("active"));
    tabContent.forEach((item) => item.classList.remove("active"));

    tabItem[index].classList.add("active");
    tabContent[index].classList.add("active");
  };

  tabItem.forEach((item, index) => {
    item.addEventListener("click", () => {
      switchTab(index);
    });
  });
};
tab();

carousel = (carouselName, item) => {
  var swiper = new Swiper(`.${carouselName}-carousel`, {
    slidesPerView: item,
    spaceBetween: 14,
    autoHeight: true,
    navigation: {
      nextEl: `.${carouselName}-btn-next`,
      prevEl: `.${carouselName}-btn-prev`,
    },
    breakpoints: {
      0: {
        slidesPerView: 2.5,
      },
      640: {
        slidesPerView: 2.5,
      },
      960: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: item,
      },
    },
  });
};

changeCarouselOnResize = (name, item) => {
  let carouselName;
  checkWindowWidth = () => {
    if (window.innerWidth > 960) {
      carouselName = name;
    } else {
      carouselName = `mob-${name}`;
    }

    // To call the carousel function
    carousel(carouselName, item);
  };
  checkWindowWidth();

  // To call the carousel function on resize
  window.addEventListener("resize", checkWindowWidth);
};

mealTimeCarousel = () => {
  changeCarouselOnResize("mealtime", 4);
};
mealTimeCarousel();

playTimeCarousel = () => {
  changeCarouselOnResize("playtime", 4);
};
playTimeCarousel();

bathTimeCarousel = () => {
  changeCarouselOnResize("bathtime", 3);
};
bathTimeCarousel();

bestSellerCarousel = () => {
  changeCarouselOnResize("bestSeller", 2.5);
};
bestSellerCarousel();

offcanvasMenu = () => {
  const menuBar = document.querySelector(".mobile-menu-bar");
  const offcanvas = document.querySelector(".offcanvas");
  const closeBtn = document.querySelector(".offcanvas-close");
  const body = document.querySelector("body");

  const menuLinks = document.querySelectorAll(".offcanvas-menu-bar .menu-link");

  menuBar.addEventListener("click", () => {
    offcanvas.classList.add("open");
    body.style.overflow = "hidden";

    // To add class to each menu link with delay of 2 milliseconds
    menuLinks.forEach(function (item, index) {
      setTimeout(() => {
        item.classList.add("show");
      }, index * 200);
    });
  });
  closeBtn.addEventListener("click", () => {
    offcanvas.classList.remove("open");
    body.style.overflow = "auto";

    // To add class to each menu link with delay of 2 milliseconds
    menuLinks.forEach(function (item, index) {
      item.classList.remove("show");
    });
  });
};
offcanvasMenu();

offcanvasNavItems = () => {
  const menuItem = document.querySelectorAll(
    ".offcanvas-menu-bar .menu-item.has-mega-menu"
  );
  const goBackBtn = document.querySelectorAll(".mega-menu--goback");

  // To show sub menu items
  menuItem.forEach((item) => {
    item.addEventListener("click", () => {
      const megaMenu = item.lastElementChild;

      if (megaMenu) {
        megaMenu.classList.add("active");
      }
    });
  });

  // To hide sub menu items
  goBackBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const megaMenu = btn.closest(".mega-menu.active");

      if (megaMenu) {
        megaMenu.classList.remove("active");
      }
    });
  });
};
offcanvasNavItems();

slider = () => {
  const slides = document.querySelectorAll(".slide");
  const accordionItems = document.querySelectorAll(".accordion-item");
  const accordionTitles = document.querySelectorAll(".accordion-title");
  const accordionContent = document.querySelectorAll(".accordion-content");
  const progressBar = document.querySelectorAll(".progress-bar");

  let currentSlide = 0;
  const slideDuration = 5000;
  const slideInterval = 300;

  let interval;
  let timerInterval;

  // To load Vimeo Player API
  let vimeoPlayers = [];

  const loadVimeoPlayer = (index) => {
    const iframe = slides[index].querySelector("iframe");
    if (iframe && !vimeoPlayers[index]) {
      const player = new Vimeo.Player(iframe);
      vimeoPlayers[index] = player;
    }
  };

  // To set timer for changing slides
  const startTimer = (index) => {
    let step = 0;
    const totalIntervals = slideDuration / slideInterval;
    const stepIncrement = 100 / totalIntervals;

    progressBar.forEach((item) => (item.style.width = 0));

    const currentProgressBar = accordionItems[index].firstElementChild;

    if (timerInterval) {
      clearInterval(timerInterval);
    }

    timerInterval = setInterval(() => {
      step = Math.min(step + stepIncrement, 100);

      if (step >= 100) {
        progressBar.forEach((item) => (item.style.width = 0));
        clearInterval(timerInterval);
      }

      currentProgressBar.style.width = `${Math.floor(step)}%`;
      step++;
    }, slideInterval);
  };

  // To show the current slide and show it's corresponding accordion
  const showSlide = (index) => {
    // To reset all active classes from the slide and accordion
    slides.forEach((slide) => slide.classList.remove("active"));
    accordionItems.forEach((item) => item.classList.remove("active"));

    // To set active classes to current slide and accordion
    slides[index].classList.add("active");
    accordionItems[index].classList.add("active");

    // To set max-height to 0 for all accordion content to hide the content
    accordionContent.forEach((item) => (item.style.maxHeight = "0"));

    // To set dynamic max-height to current accordion content for smooth transition
    const content = accordionContent[index];
    content.style.maxHeight = `${content.scrollHeight}px`;

    loadVimeoPlayer(index);

    // To auto-play vimeo video if the current slide is a iframe
    const iframe = slides[index].querySelector("iframe");
    if (iframe) {
      const player = vimeoPlayers[index];
      if (player) {
        player.play();
      }
    }

    // To auto-play video if the current slide is a video
    const video = slides[index].querySelector("video");
    if (video) {
      video.play();
    }

    // To pause videos when it is not the current slide
    slides.forEach((slide, i) => {
      if (i !== index) {
        const otherVideo = slide.querySelector("video");
        if (otherVideo) {
          otherVideo.pause();
        }

        const otherIframe = slide.querySelector("iframe");
        if (otherIframe) {
          const otherPlayer = vimeoPlayers[i];
          if (otherPlayer) {
            otherPlayer.pause();
          }
        }
      }
    });

    startTimer(index);
  };

  // To show the first slide with it's corresponding accordion
  showSlide(0);

  // To Auto-play carousel
  const autoPlayCarousel = () => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  };

  interval = setInterval(autoPlayCarousel, slideDuration);

  // To show corresponding slide on clicking the accordion item
  accordionTitles.forEach((title, index) => {
    title.addEventListener("click", () => {
      clearInterval(interval);
      currentSlide = index;
      showSlide(index);
      interval = setInterval(autoPlayCarousel, slideDuration);
    });
  });
};
slider();

mouseMove = () => {
  const myCursor = document.querySelector(".my__cursor");

  if (myCursor && document.body) {
    let mouseX = 0,
      mouseY = 0;

    // To update cursor position on mouse move
    window.addEventListener("mousemove", (event) => {
      myCursor.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;

      mouseX = event.clientX;
      mouseY = event.clientY;
    });

    const selectors = [
      "a",
      ".mouse__hover",
      ".carousel-btn",
      ".accordion-title",
      ".mobile-menu-bar",
      ".offcanvas-close",
      ".mega-menu--goback",
      ".tab-item",
      ".year-grid .item",
    ];

    // To handle hover state on links and pointer elements
    document.body.addEventListener(
      "mouseenter",
      (event) => {
        if (selectors.some((selector) => event.target.matches(selector))) {
          myCursor.classList.add("my__cursor__hover");
        }
      },
      true
    );

    document.body.addEventListener(
      "mouseleave",
      (event) => {
        if (selectors.some((selector) => event.target.matches(selector))) {
          myCursor.classList.remove("my__cursor__hover");
        }
      },
      true
    );

    // To ensure cursor visibility
    myCursor.style.visibility = "visible";
  }
};

mouseMove();
