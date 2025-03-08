// Declare confetti, anime, barba, and gsap
const confetti = window.confetti
const anime = window.anime
const barba = window.barba
const gsap = window.gsap

const typewriterText = "Hi, I'm Pritam"
let index = 0

function typeWriter() {
  if (index < typewriterText.length) {
    document.getElementById("typewriter").innerHTML += typewriterText.charAt(index)
    index++
    setTimeout(typeWriter, 100)
  }
}

document.addEventListener("DOMContentLoaded", () => {
  createParticles()

  const prefersDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
  document.body.classList.add(prefersDarkMode ? "dark-mode" : "light-mode")
  document.body.classList.remove(prefersDarkMode ? "light-mode" : "dark-mode");
  document.getElementById("darkModeToggle").textContent = prefersDarkMode ? "☀️" : "🌙"

  const roleText = document.getElementById("roleText")
  const roles = ["A Software Developer", "A Python Developer", "A Tech Enthusiast"]
  let currentRoleIndex = 0

  function changeRole() {
    roleText.classList.add("fade-out")

    setTimeout(() => {
      currentRoleIndex = (currentRoleIndex + 1) % roles.length
      roleText.textContent = roles[currentRoleIndex]

      roleText.classList.remove("fade-out")
      roleText.classList.add("fade-in")

      setTimeout(() => {
        roleText.classList.remove("fade-in")
      }, 400)
    }, 400)
  }

  setInterval(changeRole, 3000)
})

// Create particles function
function createParticles() {
  const particlesContainer = document.createElement("div")
  particlesContainer.className = "particles"
  document.body.appendChild(particlesContainer)

  const particleCount = 50

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div")
    particle.className = "particle"

    // Random position
    const posX = Math.random() * window.innerWidth
    const posY = Math.random() * window.innerHeight

    // Random size
    const size = Math.random() * 3 + 1

    // Random animation duration
    const duration = Math.random() * 20 + 10

    // Random delay
    const delay = Math.random() * 10

    particle.style.left = `${posX}px`
    particle.style.top = `${posY}px`
    particle.style.width = `${size}px`
    particle.style.height = `${size}px`
    particle.style.animationDuration = `${duration}s`
    particle.style.animationDelay = `${delay}s`

    particlesContainer.appendChild(particle)
  }
}

// Dark Mode Toggle
const darkModeToggle = document.getElementById("darkModeToggle")
const body = document.body

// Toggle Dark Mode
darkModeToggle.addEventListener("click", () => {
  if (body.classList.contains("dark-mode")) {
    body.classList.remove("dark-mode")
    body.classList.add("light-mode")
    darkModeToggle.textContent = "🌙"
  } else {
    body.classList.remove("light-mode")
    body.classList.add("dark-mode")
    darkModeToggle.textContent = "☀️"
  }
})

typeWriter()
const toggleBar = document.getElementById("toggleBar")
const navLinks = document.getElementById("navLinks")

toggleBar.addEventListener("click", () => {
  navLinks.classList.toggle("active")
})

const projects = document.querySelectorAll(".project")

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add("visible")
      }, index * 200)
    }
  })
})

projects.forEach((project) => {
  observer.observe(project)
})

// Contact button confetti effect
document.querySelector('.btn[href="#contact"]').addEventListener("click", () => {
  if (typeof confetti === "function") {
    confetti({
      particleCount: 100,
      spread: 300,
      origin: { y: 0.6 },
    })
  }
})

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    })
  })
})

// Animate skills with anime.js if available
if (typeof anime === "function") {
  anime({
    targets: ".skill",
    translateY: [-1, 5],
    direction: "alternate",
    loop: true,
    easing: "easeInOutQuad",
    delay: anime.stagger(50),
  })

  anime({
    targets: ".project",
    scale: [0.98, 1],
    rotateX: [-1, 1],
    rotateY: [-1, 1],
    easing: "easeOutExpo",
    delay: anime.stagger(10),
    loop: true,
    direction: "alternate",
  })
}

// Initialize barba.js if available
if (typeof barba !== "undefined" && typeof barba.init === "function" && typeof gsap !== "undefined") {
  barba.init({
    transitions: [
      {
        leave() {
          gsap.to("body", { opacity: 0, duration: 1 })
        },
        enter() {
          gsap.from("body", { opacity: 0, duration: 1 })
        },
      },
    ],
  })
}

// Create submission popup
function createSubmissionPopup() {
  // Remove any existing popup
  const existingPopup = document.querySelector(".popup")
  if (existingPopup) {
    existingPopup.remove()
  }

  const popup = document.createElement("div")
  popup.className = "popup"
  popup.innerHTML = `
        <div class="popup-icon">✓</div>
        <h3>Submitted!</h3>
        <p>Your message has been sent successfully.</p>
        <button class="popup-close">Close</button>
    `
  document.body.appendChild(popup)

  const closeButton = popup.querySelector(".popup-close")
  closeButton.addEventListener("click", () => {
    popup.classList.remove("show")
    setTimeout(() => {
      popup.remove()
    }, 500)
  })

  return popup
}

// Form submission handler
function onFormSubmit() {
  const form = document.getElementById("contact-form")
  const iframe = document.getElementById("hidden-iframe")

  // Create and show popup regardless of iframe content
  const popup = createSubmissionPopup()
  setTimeout(() => {
    popup.classList.add("show")
  }, 100)

  // Reset form
  form.reset()

  // Auto close popup after 5 seconds
  setTimeout(() => {
    popup.classList.remove("show")
    setTimeout(() => {
      popup.remove()
    }, 500)
  }, 5000)

  // Trigger confetti if available
  if (typeof confetti === "function") {
    confetti({
      particleCount: 150,
      spread: 180,
      origin: { y: 0.6 },
    })
  }
}

// Add event listener to form
document.getElementById("contact-form").addEventListener("submit", function (e) {
  // This will be called before the form is submitted
  // We'll show the popup immediately for better user feedback
  const popup = createSubmissionPopup()
  setTimeout(() => {
    popup.classList.add("show")
  }, 100)

  // Reset form after a short delay
  setTimeout(() => {
    this.reset()
  }, 500)

  // Auto close popup after 5 seconds
  setTimeout(() => {
    popup.classList.remove("show")
    setTimeout(() => {
      popup.remove()
    }, 500)
  }, 5000)

  // Trigger confetti
  if (typeof confetti === "function") {
    confetti({
      particleCount: 150,
      spread: 180,
      origin: { y: 0.6 },
    })
  }
})

