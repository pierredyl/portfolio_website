export const posts = [
  {
    slug: 'Introduction',
    title: 'Introduction',
    date: '08/03/2026',
    excerpt:
      'Introduction to who I am and what I\'m doing',
    tags: ['Non-tech'],
    author: {
      name: 'Dylan Pierre',
      avatar: '/finn_graphic.png',
    },
    content: [
      { type: 'paragraph', text: 'I\'m Dylan, a computer science graduate from Sonoma State University, a college located in the town of Rohnert Park. ' },
      // Example embed block — paste an iframe `src` URL (maps, video, etc.) to embed it inline:
      { type: 'embed', src: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4144.011817909236!2d-122.6741739!3d38.3396918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80844a55643f3503%3A0x15a4e3cec873f094!2sSonoma%20State%20University!5e1!3m2!1sen!2sus!4v1785803697686!5m2!1sen!2sus', title: 'Sonoma State University', height: 300 },
      { type: 'paragraph', text: 'I have experience writing many different kinds of software, including backend, systems, scripting, and some frontend. I\'m currently seeking a full time role where I can dive deep into engineering. In the meantime, I\'ve been working on other software projects that span these areas. You can find more information on these in my projects section, or contained in my resume. This website is a great example of my frontend work.'},
      { type: 'paragraph', text: 'Aside from my technical background, I\'m a lover of music, health, and animals. This is my dog Finn, which you\'ve seen already.'},
      // Example image block — src can be a public/ asset path or a full URL.
      { type: 'image', src: '/finn_graphic.png', alt: 'Finn', width: 400 },
      { type: 'paragraph', text: 'When I\'m not working, you can find me in the gym or in nature exercising, listening or producing music, and spending time with my friends and family.'},{ type: 'paragraph', text: 'Thanks for checking out my page! I plan to post blogs as I learn and create new things. Stay tuned.'},
      { type: 'paragraph', text: '-Dylan'}
     ],
    
  },
]
