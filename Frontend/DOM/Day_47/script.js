const users = [
  {
    fullName: "Aarav Sharma",
    profession: "Software Engineer",
    description: "Aarav is a full-stack developer who enjoys building scalable applications and exploring clean UI design.",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36"  // male
  },
  {
    fullName: "Kiara Mehta",
    profession: "UX/UI Designer",
    description: "Kiara specializes in crafting smooth user experiences and intuitive design systems for mobile apps.",
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e"  // female
  },
  {
    fullName: "Rohit Verma",
    profession: "Data Scientist",
    description: "Rohit analyzes complex datasets to uncover patterns and build predictive machine learning models.",
    image: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6"  // male
  },
  {
    fullName: "Sara Fernandes",
    profession: "Digital Marketer",
    description: "Sara helps brands grow through SEO, targeted campaigns, and social media storytelling.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2"  // female
  },
  {
    fullName: "Vikram Nair",
    profession: "Cybersecurity Analyst",
    description: "Vikram focuses on securing networks, detecting vulnerabilities, and building safer online systems.",
    image: "https://images.unsplash.com/photo-1538690001361-57482feb29d1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDQ4fHx8ZW58MHx8fHx8"  // male
  }
];


const main = document.querySelector("main");


users.forEach((elem) => {
    let sum = `<div class="card">
      <img src="${elem.image}" alt="">
      <h3>${elem.fullName}</h3>
      <h4>${elem.profession}</h4>
      <p>${elem.description}</p>
    </div> `;
    main.innerHTML += sum;
});






