// Navigation Module
const Navigation = (() => {
    // DOM Elements
    const dom = {
        hamburger: document.querySelector('.hamburger'),
        navLinks: document.querySelector('.nav-links'),
        dropdowns: document.querySelectorAll('.dropdown'),
        navItems: document.querySelectorAll('.nav-item'),
        body: document.body
    };

    // Constants
    const MOBILE_BREAKPOINT = 768;
    const RESIZE_THROTTLE = 100;

    // State
    let resizeTimeout;

    // Methods
    const toggleMenu = () => {
        const isActive = dom.hamburger.classList.toggle('active');
        dom.navLinks.classList.toggle('active');
        dom.hamburger.setAttribute('aria-expanded', isActive);
    };

    const handleDropdown = (dropdown) => {
        if (isMobile()) {
            dropdown.classList.toggle('active');
        } else {
            dropdown.classList.add('active');
        }
    };

    const closeAllDropdowns = () => {
        dom.dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
    };

    const closeMenu = () => {
        dom.hamburger.classList.remove('active');
        dom.navLinks.classList.remove('active');
        dom.hamburger.setAttribute('aria-expanded', 'false');
    };

    const setActiveItem = (clickedItem) => {
        dom.navItems.forEach(item => item.classList.remove('active'));
        clickedItem.classList.add('active');
    };

    const isMobile = () => window.innerWidth <= MOBILE_BREAKPOINT;

    const handleClickOutside = (e) => {
        if (!e.target.closest('nav') && !e.target.closest('.hamburger')) {
            closeMenu();
            closeAllDropdowns();
        }
    };

    const handleResize = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (!isMobile()) {
                closeMenu();
                closeAllDropdowns();
            }
        }, RESIZE_THROTTLE);
    };

    const handleKeyboard = (e) => {
        if (e.key === 'Escape') {
            closeMenu();
            closeAllDropdowns();
        }
    };

    // Event Listeners
    const initEventListeners = () => {
        // Hamburger menu
        dom.hamburger.addEventListener('click', toggleMenu);

        // Dropdowns
        dom.dropdowns.forEach(dropdown => {
            dropdown.addEventListener('mouseenter', () => {
                if (!isMobile()) handleDropdown(dropdown);
            });
            
            dropdown.addEventListener('mouseleave', () => {
                if (!isMobile()) dropdown.classList.remove('active');
            });

            dropdown.addEventListener('click', (e) => {
                if (isMobile()) {
                    e.preventDefault();
                    handleDropdown(dropdown);
                }
            });
        });

        // Navigation items
        dom.navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                setActiveItem(item);
                if (isMobile() && !item.classList.contains('dropdown')) {
                    closeMenu();
                }
            });
        });

        // Document events
        document.addEventListener('click', handleClickOutside);
        window.addEventListener('resize', handleResize);
        document.addEventListener('keydown', handleKeyboard);
    };

    // Public API
    return {
        init: () => {
            initEventListeners();
            dom.hamburger.setAttribute('aria-expanded', 'false');
        }
    };
})();

// Initialize navigation
Navigation.init();


// Schedule Button Module
const ScheduleButton = (() => {
	const button = document.querySelector('.floating-schedule-button');
	
	const handleClick = () => {
	  // Add your meeting scheduling logic here
	  console.log('Schedule meeting clicked!');
	  window.location.href = '#contact'; // Example action
	};
  
	const init = () => {
	  if(button) {
		button.addEventListener('click', handleClick);
	  }
	};
  
	return { init };
  })();
  
  // Initialize all modules
  Navigation.init();
  PageInteractions.init();
  ScheduleButton.init();


  // Form Interactions
const FormHandler = (() => {
    const forms = document.querySelectorAll('.contact-form');
    
    const handleSubmit = (e) => {
      e.preventDefault();
      // Add your form submission logic here
      console.log('Form submitted!');
    };
  
    const enhanceSelects = () => {
      document.querySelectorAll('select').forEach(select => {
        select.addEventListener('focus', () => {
          select.parentNode.style.borderBottomColor = '#007bff';
        });
        
        select.addEventListener('blur', () => {
          select.parentNode.style.borderBottomColor = 'rgba(255, 255, 255, 0.1)';
        });
      });
    };
  
    const init = () => {
      forms.forEach(form => {
        form.addEventListener('submit', handleSubmit);
      });
      enhanceSelects();
    };
  
    return { init };
  })();
  
  // Update initialization at bottom of file
  Navigation.init();
  ScheduleButton.init();
  ScrollProgress.init();
  FormHandler.init();
