/**
 * ─────────────────────────────────────────────────────────────
 *  ALL EDITABLE COPY LIVES HERE.
 *
 *  Everything below is draft text written from your resume. It's
 *  real and usable, but it's mine — rewrite any of it in your own
 *  voice. Each field has an EDIT note saying what it's for and
 *  roughly how long it should be.
 *
 *  You never need to touch the components to change wording.
 * ─────────────────────────────────────────────────────────────
 */

export const site = {
  hero: {
    // EDIT: the terminal "session" shown in the hero. On load it types the
    // command out, prints each boot line on its own beat, then types the
    // welcome paragraph. When it finishes, the page eases down to About.
    console: {
      // EDIT: shown in the terminal's title bar, e.g. "you@yoursite".
      user: 'dylan@portfolio',

      // EDIT: the command that "runs" the site. Typed character by character,
      // so keep it short.
      command: './dylans_portfolio',

      // EDIT: boot lines. Each one appears on its own line, one beat apart.
      boot: ['Asesembling componenets...', 'Optimizing compute...', 'Launching the mainframe...'],

      // EDIT: the welcome paragraph, typed out character by character after
      // the boot lines land. Each string is its own line.
      welcome: [
        "Welcome to Dylan's Portfolio. We hope you enjoy your stay.",
        'Feel free to navigate around, grab a cup of coffee, and relax.',
        'Thanks for visiting.',
      ],

      // EDIT: the hidden page heading. Not drawn on screen — it is what
      // search engines and screen readers read as the page's <h1>.
      heading: 'Dylan Pierre\'s Portfolio',
    },
  },

  about: {
    // EDIT: section heading.
    title: 'About Me',

    // EDIT: first paragraph — what you're drawn to and why. 2-3 sentences.
    paragraphOne:
      'I\'m a Software Engineer with an interest in understanding how systems work at a lower level. I believe it\'s important to get the small details right, especially when creating services that people rely on.',

    // EDIT: second paragraph — your background and how you work. 2-3 sentences.
    paragraphTwo:
      'I have experience writing software across backend, frontend, machine learning, and systems. I\'m currently working on improving the capabilities of modern AI coding tools on top of my engineering work.',
  },

  projects: {
    // EDIT: section heading.
    title: 'Projects',

    // EDIT: one line introducing the work. Optional — set to '' to hide.
    intro: 'I\'m intrigued by how things work beneath the surface. This interest is what drives my projects.',
  },

  blog: {
    // EDIT: section heading.
    title: 'Blog',

    // EDIT: one line about why you write. Optional — set to '' to hide.
    intro: 'A space for me to write about things I find particularly interesting.',
  },

  contact: {
    // EDIT: small mono label above the closing statement. One word is best.
    title: 'Contact',

    // EDIT: the closing statement. This is the largest text in the section and
    // the last full sentence on the page — it carries more weight than the
    // rest of the copy, so make it sound like you. 1-2 sentences.
    headline:
      'I\'m currently seeking Software Engineering opportunities.',

    // EDIT: pre-filled subject line for the email the button opens. Keep it
    // short; it only exists so nobody has to think of one.
    subject: '',
  },

  // EDIT: the line at the very bottom of the page.
  colophon: 'Built by Dylan Pierre and MrFinnegan',

  // EDIT: contact details and links used across the nav, contact section, and footer.
  email: 'dylanpierre004@gmail.com',
  github: 'https://github.com/pierredyl',
  linkedin: 'https://www.linkedin.com/in/pierredylan/',
  resume: '/DylanPierre_Resume.pdf',
}

// EDIT: your education and certifications, shown in the About section.
export const credentials = [
  { label: 'Education', value: 'B.S. Computer Science · Sonoma State University · 2025' },
  { label: 'Certifications', value: 'CompTIA Security+ · Google Cybersecurity Professional' },
]

// EDIT: skills, grouped. Add or remove groups freely — the layout adapts.
export const skills = [
  { label: 'Languages', items: ['Go', 'Python', 'C++', 'Java', 'JavaScript', 'Bash', 'PowerShell'] },
  { label: 'Backend & Infra', items: ['PostgreSQL', 'Redis', 'Nginx', 'Docker', 'AWS', 'APIs', 'Azure'] },
  { label: 'Machine Learning', items: ['PyTorch', 'Computer Vision', 'Object Detection', 'Data Pipelines' ] },
  { label: 'Frontend', items: ['React', 'HTML / CSS'] },
  { label: 'IT Security', items: ['Networking', 'Cryptography', 'IAM'] },
]
