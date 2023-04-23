import sport from '../../images/sport2.jpg'
import code from '../../images/code2.jpg'
import money from '../../images/money2.jpg'
import User1 from '../../images/User1.jpg'
import User2 from '../../images/User2.jpg'
import User3 from '../../images/User3.jpg'

const cardsData = [
{ 
  title:"Sports",
  description:"Skillify teaches any sport with precision and ease",
  image:sport
},
{
  title:"Coding",
  description:"Learn how to code using our plans with daily tasks.",
  image:code
},
{
  title:"Money-making",
  description:"Any money-making method you can name taught here",
  image:money
},
]


const reviewsData = [
{
  name: "Lucaci Vlad",
  image: User1,
  text: "I recently tried out an app called Skillify and was thoroughly impressed with its ability to teach new skills. The app offers a wide variety of subjects, ranging from how to work out to coding and everything in between, even high-income skills.",
  rating:4.5,
},
{
  name: "William Johnson",
  image: User2,
  text: "One thing that stood out to me about Skillify was its user-friendly interface. It was easy to navigate and find the skill I wanted to learn. Once I selected my desired subject, the app provided me with a structured curriculum to follow,  daily tasks, complete with everything I needed to ensure I was truly understanding the material.",
  rating:5,
},
{
  name: "Christopher Wilson",
  image: User3,
  text: "I would highly recommend Skillify to anyone looking to expand their skill set. The app's combination of clear instructions and plans with daily tasks make it an excellent resource for anyone looking to learn something new.",
  rating:5, 
},
]

const freePlan = {
  title: "Starter plan",
  description: "Feel free to try our app",
  price: "0",
  benefits:[
    "Access to all basic Tools",
    "1 basic plan",
    "Plan saver",
    "Calendar to track you progress",
  ],
  notAvaible:[
    "Upgraded and more detailed plans with daily tasks",
    "Objectives,action steps,contingency plan and more for each day",
    "Acces to professional tools(such as more personalized plans)",
    "Weekly expert support sessions",
    "Priority customer support",
    "0 alternative Monthly Plans",
    "Add notes to your plan"
  ]
}
// price_1N00bOHFEnZBGAyL0ZOoYHXT

const proPlan = {
  title:"Skillify Pro",
  description: "Simple to use, hard to replace",
  price:10,
  priceCode: "price_1Mz1UWHFEnZBGAyLuBjuVBLj",
  priceCodeYearly: "price_1N04JkHFEnZBGAyLV5pvE0vU",
  benefits:[
    "Upgraded and more detailed plans with daily tasks",
    "Objectives,action steps,contingency plan and more for each day",
    "Acces to professional tools(such as more personalized plans)",
    "Calendar to track you progress",
    "Plan saver",
    "Weekly expert support sessions",
    "Priority customer support",
    "Add notes to your plan"
  ],
  specialBenefit: [
    "1 alternative Monthly Plans",
    "5 pro plans",
  ]
}

const premiumPlan = {
  title:"Skillify Premium",
  description: "Exacly how to learn any thing",
  price:20,
  priceCode: "price_1N00bIHFEnZBGAyLbXHHBUiw",
  priceCodeYearly: "price_1N04QWHFEnZBGAyLz6LXydTj",
  benefits:[
    "Upgraded and more detailed plans with daily tasks",
    "Objectives,action steps,contingency plan and more for each day",
    "Acces to professional tools(such as more personalized plans)",
    "Calendar to track you progress",
    "Plan saver",
    "Weekly expert support sessions",
    "Priority customer support", 
    "Add notes to your plan"
  ],
  specialBenefit: [
    "4 alternative Monthly Plans",
    "20 pro plans",
  ]
} 

const enterprisePlan = {
  title:"Skillify Enterprise",
  description: "Exacly how to master any skill",
  price:50,
  priceCode: "price_1N04REHFEnZBGAyLEBMYo0Dw",
  priceCodeYearly:"price_1N04REHFEnZBGAyLEBMYo0Dw",
  benefits:[
    "Ultimate plans plans with daily tasks",
    "Objectives,action steps,contingency plan and more for each day",
    "Acces to professional tools(such as more personalized plans)",
    "Calendar to track you progress",
    "Plan saver",
    "Daily expert support sessions",
    "Priority customer support",
    "Add notes to your plan",
  ],
  specialBenefit: [
    "Unlimited alternative Monthly Plans",
    "Unlimited pro plans",
  ]
}

const smallPricingData = [{
  title: "Pro Plan",
  nrPlans: 5,
  price: 10,
  priceCode:"price_1Mz1SkHFEnZBGAyLX9z3Ixfl",
  priceCodeYearly:"price_1N04JkHFEnZBGAyLV5pvE0vU"
},
{
  title: "Premium Plan",
  nrPlans: 20,
  price: 20,
  priceCode: "price_1Mz1UWHFEnZBGAyLuBjuVBLj",
  priceCodeYearly:"price_1N04QWHFEnZBGAyLz6LXydTj"
},
{
  title:"Enterprise Plan",
  nrPlans: "unlimited",
  price: 50,
  priceCode: "price_1Mz1VKHFEnZBGAyLRBeg7mwS",
  priceCodeYearly:"price_1N04REHFEnZBGAyLEBMYo0Dw"
}
]

const questions = [
  {
    question:"What kind of skills does the app teach?",
    answear:"The app provides a wide range of topics, including high-income skills and everything in between, from how to exercise to coding."
  },
  {
    question:"Is the app suitable for beginners or more advanced learners?",
    answear:"The plans provided by the app can take you from a beginner to an expert, thus the app can be used by everyone."
  },
  {
    question:"Are the lessons taught through video or text-based instruction?",
    answear:"The lessons are taught through text-based instructions with daily tasks, if you have the pro plan the lessons are more detailed and better explained."
  },
  {
    question:"What kind of customer support is available if I encounter any issues or have questions about the app?",
    answear:"You can email us at skillify.ai7@gmail.com or write on our Discord server."
  },
  {
    question:"How often are new courses or lessons added to the app?",
    answear:"The app updates it's plan every week."
  },
  {
    question:"Are there any free courses or is everything paid?",
    answear:"We offer a free trial, but with the pro plan you get ()."
  },
  {
    question:"Is there a trial period before I have to pay for the app?",
    answear:""
  },
  {
    question:"Is the app suitable for children or is it intended for adults only?",
    answear:"The app can be used by children too."
  },
  {
    question:"Can I use the app on multiple devices, or do I need to purchase a separate subscription for each one?",
    answear:"You can use our app on any device with the same account."
  },
]

const leaderboardData = [
  {
    name: "Luna Rayne",
    image: User1,
    nrPlans: 10
  },
  {
    name: "Jasper Stone",
    image: User2,
    nrPlans: 5
  },
  {
    name: "Maya Harper",
    image: User3,
    nrPlans: 5
  },
  {
    name: "Ellis Parker",
    image: User1,
    nrPlans: 4
  },
  {
    name: "Sawyer Reed",
    image: User2,
    nrPlans: 2
  },
]
export {
  cardsData,
  reviewsData,
  freePlan,
  proPlan,
  premiumPlan,
  enterprisePlan,
  questions,
  smallPricingData,
  leaderboardData
};