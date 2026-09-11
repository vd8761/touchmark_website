export interface ValueAddition {
    id: string;
    description: string;
}

export interface CaseStudyData {
    id: number;
    slug: string;
    title: string;
    heroSubtitle: string;
    heroImage: string;
    
    // Accordion specific fields
    accordionTitle: string;
    color: string;
    logo: string;
    accordionImage: string;
    accordionDescription: string;
    link: string;
    icon: string;
    cardTitle?: string;
    cardTags?: string[];

    // Client overview
    clientOverview?: {
        paragraphs: string[];
        websiteUrl?: string;
        image: string;
    };

    // Problem & Solution
    problemAndSolution?: {
        bgColor: string;
        problemIntro?: string;
        problemList: (string | { title: string; description: string })[];
        solutionIntro?: string;
        solutionList?: { title: string; description: string }[];
    };

    // Value Addition
    valueAdditions?: ValueAddition[];

    // Result & Conclusion
    resultAndConclusion?: {
        resultText: string;
        stats: { value: string; label: string }[];
        conclusionText: string;
    };

    mockupFullImage: string;
}

export const caseStudies: CaseStudyData[] = [
    {
        id: 1,
        slug: "rupinis",
        title: "Rupini’s",
        heroSubtitle: "Only a structured approach can help to build a system, placing proper system will increase the productivity, this energy will convert into proven results",
        heroImage: "https://touchmarkdes.com/src/assets/img/casestudy-rupinis/rupinis-hero-banner-img.png",
        
        accordionTitle: "RUPINIS",
        color: "#5C205F",
        logo: "/images/home/case-studies/rupinis-logo.webp",
        accordionImage: "/assets/front/home/tc_project_1722505852.webp",
        accordionDescription: "Our goal is to become the preeminent online forum that brings people together from all walks of life via thought-provoking conversations, creating a worldwide community centred around mutual respect, curiosity, and development.\n\nOur goal is to become the preeminent online forum that brings people together from all walks of life via thought-provoking conversations, creating a worldwide community centred around mutual respect, curiosity, and development.",
        link: "/case-study/rupinis",
        icon: "/images/home/case-studies/brush-icon.svg",
        cardTitle: "Revolutionizing Customer Relationship Management",
        cardTags: ["BEAUTY", "SALON"],

        clientOverview: {
            paragraphs: [
                "Established on October 2nd, 1994, Rupini’s began as a sole proprietorship and later evolved into a private limited company in 1997. With a rich history spanning over 25 years, Rupini’s has been dedicated to offering an extensive array of bridal and beauty services.",
                "At the heart of Rupini’s ethos lies holistic beauty care, a philosophy that encompasses the comprehensive grooming of individuals, addressing both their physical and mental well-being. As a pioneer and trendsetter among Indian beauty salons in Singapore, Rupini’s sets itself apart by prioritizing the use of herbal and fruit-based products in a serene and rejuvenating environment",
                "Our commitment to holistic beauty ensures that every client experiences a transformative journey towards inner and outer radiance."
            ],
            websiteUrl: "#",
            image: "https://touchmarkdes.com/src/assets/img/casestudy-rupinis/client-overview-image.png"
        },

        problemAndSolution: {
            bgColor: "#FEF5FF",
            problemList: [
                "Chain of Saloon launched in 1994 in Singapore.",
                "Having 30,000 customers across the island, the only Indian brand which upholds customer loyalty with the presence of more than 28 years in the beauty and wellness industry.",
                "Faced a lot of issues in handling customer relationships, Accounts, Bookings, packages etc.",
                "End to end business operations were handled manually."
            ],
            solutionIntro: "We build solutions merging their CRM, POS, Inventory, Staff management system, Appointment booking system, Purchase, Supplier management in a single window application."
        },

        valueAdditions: [
            { id: "01", description: "POS, Inventory, Resource management, Appointments, Stock movement, Membership, CRM, Ecommerce – All these applications were deployed in a different environment and developed using different technologies." },
            { id: "02", description: "We did a complete study of their USB and business process, based on which we had developed an extensive plan to merge all the solutions into a single window system using API’s, Data migration." },
            { id: "03", description: "We were working on the entire solution for 2 years, out of which 12 months of dedication in developing the solution." },
            { id: "04", description: "Around 30,000 customers data with their behaviours were monitored now, based on the available data, social media campaigns and ads campaign were launched." },
            { id: "05", description: "Increase in sales, 12% Pilferage loss was controlled, Increase in customer appointment bookings." },
            { id: "06", description: "Orders were on track; Supplier payments were tracked properly." }
        ],

        mockupFullImage: "https://touchmarkdes.com/src/assets/img/casestudy-rupinis/rupinis-mockup-full-content.png"
    },
    {
        id: 2,
        slug: "olympiad",
        title: "Olympiad",
        heroSubtitle: "This school management system designed to streamline administrative tasks by maintaining student details, grades, fees, and teacher information.",
        heroImage: "https://touchmarkdes.com/assets/front/home/Olympiad case study banner.png",
        
        accordionTitle: "OLYMPIAD",
        color: "#4E878C",
        logo: "/images/home/case-studies/olympiad-logo.webp",
        accordionImage: "/assets/front/home/tc_project_1722505950.webp",
        accordionDescription: "A Comprehensive School Management System that brings people together from all walks of life via thought-provoking conversations, creating a worldwide community centred around mutual respect, curiosity, and development.",
        link: "/case-study/olympiad",
        icon: "/images/home/case-studies/graduation-icon.svg",
        cardTitle: "A Comprehensive School Management System",
        cardTags: ["SCHOOL", "ACADEMIC"],

        clientOverview: {
            paragraphs: [
                "School Management System integrates all the needs related to school management into one platform: student records, fee management, and academic performance. The integration ensures ease of administration, minimizes errors, and presents no room for losing any critical information.",
                "The system embeds tools for effective communication among teachers, students, and parents. By increasing interaction and making timely updates possible, School Management System lifts levels of engagement and collaboration within the school environment."
            ],
            image: "https://touchmarkdes.com/assets/front/home/School management software inner image for casestudy (1) (1) (1).png"
        },
        problemAndSolution: {
            bgColor: "#F0F9FF",
            problemIntro: "The School Management System was finding it very cumbersome to manage the school efficiently and hence were failing to maintain proper records or to run administrative procedures smoothly and thereby establish proper channels of communication with the members of the school community. Problems underlying the system were:",
            problemList: [
                { title: "Unable to manage the data of students properly", description: "There was an inability to maintain properly updated, correct records about students' personal information, academic performance, and attendance" },
                { title: "Lack of Fee Management System", description: "It was difficult to track records of payments of tuition fees, billing thereof, and sending notices, as the prerequisite recordkeeping was inefficient, which used to cause losses in the form of missed payments and financial misappropriation." },
                { title: "Difficulty in Monitoring Academic Performance", description: "Incapability of proper and periodic monitoring of the progress of students; hence, delays in feedback and loss of opportunities to intervene on time." },
                { title: "Poor Communication Between Stakeholders", description: "Lack of proper communication techniques among teachers, students, and parents results in misunderstandings and disengagement." }
            ],
            solutionIntro: "To address these challenges, School management system was developed as a comprehensive school management system that offers the following solutions:",
            solutionList: [
                { title: "Centralized Student Data Management", description: "Implemented a digital platform that centralizes all student information, ensuring accurate and up-to-date records." },
                { title: "Automated Fee Management", description: "Automated the processes of fee tracking, invoicing, and reminders to ensure timely payments and reduce discrepancies." },
                { title: "Real-Time Academic Monitoring", description: "Introduced a system for real-time tracking of student performance, enabling timely feedback and intervention." },
                { title: "Enhanced Communication Tools", description: "Integrated a communication platform to improve interaction between teachers, students, and parents, enhancing engagement and reducing misunderstandings." }
            ]
        },
        valueAdditions: [
            { id: "01", description: "Centralized Data Management: By consolidating student and teacher information into a single platform, School management system reduces the time spent on manual record-keeping and minimizes errors, enhancing administrative efficiency." },
            { id: "02", description: "Intuitive Interface: A user-friendly design ensures that administrators, teachers, students, and parents can easily navigate the system, improving accessibility and satisfaction." },
            { id: "03", description: "Efficient Billing and Reminders: Automation of fee tracking, invoicing, and payment reminders ensures timely fee collection and reduces the administrative burden on school staff." },
            { id: "04", description: "Immediate Feedback: Teachers can input and track student performance in real-time, allowing for timely interventions and support, which enhances academic outcomes." },
            { id: "05", description: "Integrated Communication Tools: A built-in platform facilitates effective communication between teachers, students, and parents, leading to better engagement and collaboration." },
            { id: "06", description: "Secure Information Handling: The system ensures the protection of sensitive data and adheres to regulatory standards, safeguarding against unauthorized access and ensuring legal compliance." }
        ],
        mockupFullImage: "https://touchmarkdes.com/assets/front/home/Olympiad case study mockup (1) (1).png"
    },
    {
        id: 3,
        slug: "sidbi",
        title: "Small Industries Development Bank of India (SIDBI)",
        heroSubtitle: "Only a structured approach can help to build a system, placing proper system will increase the productivity, this energy will convert into proven results",
        heroImage: "https://touchmarkdes.com/src/assets/img/casestudy-sidbi/sidbi-hero-banner-img.png",
        
        accordionTitle: "SIDBI",
        color: "#C4D347",
        logo: "/images/home/case-studies/sidbi-logo.webp",
        accordionImage: "/assets/front/home/tc_project_1722505935.webp",
        accordionDescription: "SIDBI's Digital Transformation: Boosting User Engagement, Operational Efficiency, and Customer Satisfaction via thought-provoking conversations, creating a worldwide community.",
        link: "/case-study/sidbi",
        icon: "/images/home/case-studies/bank-icon.svg",
        cardTitle: "SIDBI's Digital Transformation: Boosting User Engagement, Operational Efficiency, and Customer Satisfaction",
        cardTags: ["BANKING", "FINANCE"],

        clientOverview: {
            paragraphs: [
                "The Small Industries Development Bank of India (SIDBI) is a premier financial institution in India dedicated to supporting micro, small, and medium enterprises (MSMEs). SIDBI plays a crucial role in promoting economic growth and development by providing comprehensive financial and non-financial services to small businesses across the country.",
                "With a mission to promote, finance, and develop MSMEs, SIDBI's initiatives and programs are designed to facilitate the growth and sustainability of small enterprises, contributing significantly to the broader economy."
            ],
            websiteUrl: "#",
            image: "https://touchmarkdes.com/src/assets/img/casestudy-sidbi/client-overview-img.svg"
        },

        problemAndSolution: {
            bgColor: "#F3FCFF",
            problemIntro: "SIDBI faced several challenges in maintaining an efficient online presence, which impacted their ability to engage with stakeholders, disseminate information, and provide services effectively. The key issues included:",
            problemList: [
                "An outdated website with poor user experience.",
                "Difficulty in managing content and updates.",
                "Lack of integration with their internal systems and databases.",
                "Inefficient handling of online applications and service requests.",
                "Security concerns and compliance with government regulations.",
                "Ineffective grievance handling system, leading to delayed resolutions and dissatisfaction."
            ],
            solutionIntro: "We provided a comprehensive solution to overhaul SIDBI’s online platform, ensuring it meets modern standards of usability, functionality, and security. The key elements of the solution included:",
            solutionList: [
                { title: "Website Redesign and Development", description: "We redesigned the website with a user-centric approach, ensuring intuitive navigation, responsive design, and a modern aesthetic." },
                { title: "Content Management System (CMS)", description: "Implemented a robust CMS to enable easy content updates and management by SIDBI’s team." },
                { title: "Integration with Internal Systems", description: "Integrated the website with SIDBI’s internal systems, including their CRM, loan processing systems, and databases, ensuring seamless data flow and processing." },
                { title: "Online Application Processing", description: "Developed a secure online application system for various services, enabling users to apply for loans and other services directly through the website." },
                { title: "Grievance Handling System", description: "We redesigned the website with a user-centric approach, ensuring intuitive navigation, responsive design, and a modern aesthetic." }
            ]
        },

        valueAdditions: [
            { id: "01", description: "POS, Inventory, Resource management, Appointments, Stock movement, Membership, CRM, Ecommerce – All these applications were deployed in a different environment and developed using different technologies." },
            { id: "02", description: "We did a complete study of their USB and business process, based on which we had developed an extensive plan to merge all the solutions into a single window system using API’s, Data migration." },
            { id: "03", description: "We were working on the entire solution for 2 years, out of which 12 months of dedication in developing the solution." },
            { id: "04", description: "Around 30,000 customers data with their behaviours were monitored now, based on the available data, social media campaigns and ads campaign were launched." },
            { id: "05", description: "Increase in sales, 12% Pilferage loss was controlled, Increase in customer appointment bookings." },
            { id: "06", description: "Orders were on track; Supplier payments were tracked properly." }
        ],

        resultAndConclusion: {
            resultText: "The new website saw a significant increase in user engagement and positive feedback from stakeholders. Every month, 210,000 new users were attracted to the website, and 2.6 million events were recorded, indicating high user interaction. Integration with internal systems and the new CMS led to improved operational efficiency. There was also a notable increase in the number of online applications for various services. The implementation of an effective grievance handling system ensured timely resolution of complaints, significantly improving customer satisfaction. Additionally, the website adhered to all security standards and regulatory requirements, ensuring the safety of sensitive data.",
            stats: [
                { value: "2.6 million", label: "were recorded monthly, showing high user interaction" },
                { value: "210,000", label: "new users were attracted to the website every month." }
            ],
            conclusionText: "The transformation of SIDBI’s online presence was a crucial step in enhancing their service delivery and stakeholder engagement. By addressing the key challenges and implementing a comprehensive solution, including an effective grievance handling system, SIDBI is now better equipped to support the growth and development of MSMEs across India."
        },

        mockupFullImage: "https://touchmarkdes.com/src/assets/img/casestudy-sidbi/sidbi-mockup-full-screen-image.svg"
    },
    {
        id: 4,
        slug: "dvi-holidays",
        title: "DVI Holidays",
        heroSubtitle: "Only a structured approach can help to build a system, placing proper system will increase the productivity, this energy will convert into proven results",
        heroImage: "https://touchmarkdes.com/src/assets/img/casestudy-dvi/dvi-hero-banner-img.png",
        
        accordionTitle: "DVI HOLIDAYS",
        color: "#EE3E42",
        logo: "/images/home/case-studies/dvi-logo.webp",
        accordionImage: "/assets/front/home/tc_project_1722505900.webp",
        accordionDescription: "An exceptional holiday experience that brings people together from all walks of life via thought-provoking conversations, creating a worldwide community centred around mutual respect, curiosity, and development.",
        link: "/case-study/dvi-holidays",
        icon: "/images/home/case-studies/globe-icon.svg",
        cardTitle: "An exceptional holiday experience",
        cardTags: ["TRAVEL", "TOURISM", "B2B"],

        clientOverview: {
            paragraphs: [
                "DVI Holidays is a premier travel and tourism agency specializing in PAN India tourist destinations. They offer extensive travel packages covering diverse landscapes across the country, from majestic mountains to serene coastal regions.",
                "With a strong focus on their B2B operations, DVI Holidays partners with numerous travel agents to provide exceptional holiday experiences through tailored itineraries and comprehensive wholesale travel services, ensuring every trip is seamlessly managed."
            ],
            websiteUrl: "https://www.b2b.dvi.co.in/",
            image: "https://touchmarkdes.com/src/assets/img/casestudy-dvi/client-overview-image.svg"
        },

        problemAndSolution: {
            bgColor: "#F0F8FF",
            problemIntro: "DVI Holidays needed a robust, highly scalable B2B portal to empower their network of travel agents and manage wholesale bookings efficiently. They faced challenges in:",
            problemList: [
                "Managing complex, multi-destination tour itineraries and dynamic, agent-specific package pricing.",
                "Processing bulk bookings, agent commissions, and virtual wallet balances efficiently.",
                "Integrating a seamless booking experience for B2B agents that allows for white-labeled voucher generation.",
                "Streamlining agent onboarding, verification, and dedicated support for high-volume inquiries."
            ],
            solutionIntro: "We developed a specialized B2B web application specifically tailored to streamline agent operations and accelerate wholesale growth.",
            solutionList: [
                { title: "B2B Agent Portal", description: "Created a customized, secure dashboard for partner travel agents to browse wholesale rates, manage bookings, and generate invoices." },
                { title: "Automated Itinerary Management", description: "Built a robust CMS allowing DVI to dynamically update destinations, seasonal wholesale prices, and complex package structures." },
                { title: "Seamless Booking & Wallet System", description: "Integrated a virtual wallet and credit system alongside secure payment gateways with automated B2B invoice generation." },
                { title: "Agent Performance Tracking", description: "Developed an analytics dashboard for DVI to track agent performance, booking volumes, and custom commission structures." }
            ]
        },

        valueAdditions: [
            { id: "01", description: "B2B Wallet & Credit Limit Management: Developed a sophisticated financial module allowing agents to pre-load wallets or operate on approved credit limits, significantly accelerating the booking process and reducing payment bottlenecks." },
            { id: "02", description: "White-labeled Itineraries and Vouchers: Implemented a feature allowing B2B agents to generate beautifully formatted itineraries and booking vouchers branded with their own agency logos, directly from the DVI portal." },
            { id: "03", description: "Real-time Dynamic Pricing Engine: Engineered a pricing calculator that instantly adjusts package costs based on seasonality, group size discounts, and agent-tier commission rates, eliminating manual quote generation." },
            { id: "04", description: "Automated Markup Management: Provided agents with the ability to set and manage their own markup percentages on DVI's net rates, instantly reflecting the final selling price to their retail customers." }
        ],

        resultAndConclusion: {
            resultText: "The new B2B digital infrastructure revolutionized DVI Holidays' operations, significantly boosting their agent network efficiency and overall booking volume.",
            stats: [
                { value: "500+", label: "B2B Agents Onboarded" },
                { value: "65%", label: "Increase in Wholesale Bookings" },
                { value: "3x", label: "Faster Quote Generation" }
            ],
            conclusionText: "By delivering a scalable, agent-centric platform, DVI Holidays can now effortlessly manage their growing B2B network while providing their partners with the advanced tools needed to sell PAN India travel packages seamlessly."
        },

        mockupFullImage: "https://touchmarkdes.com/src/assets/img/casestudy-dvi/dvi-full-image.svg"
    }
];
