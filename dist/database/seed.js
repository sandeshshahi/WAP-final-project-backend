"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
const user_service_1 = require("../services/user.service");
const db_1 = __importDefault(require("./db"));
const hash = (0, user_service_1.hashPassword)("password");
const seed = () => {
    const users = [
        { id: 1, name: "John Doe", email: "john@gmail.com", password: hash },
        { id: 2, name: "John Smith", email: "smith@gmail.com", password: hash },
        { id: 3, name: "John James", email: "james@gmail.com", password: hash },
        { id: 4, name: "Jane Doe", email: "jane@gmail.com", password: hash },
        { id: 5, name: "Emily Davis", email: "emily@gmail.com", password: hash },
        {
            id: 6,
            name: "Michael Brown",
            email: "michael@gmail.com",
            password: hash,
        },
        { id: 7, name: "Sarah Wilson", email: "sarah@gmail.com", password: hash },
        { id: 8, name: "David Johnson", email: "david@gmail.com", password: hash },
        { id: 9, name: "Emma Garcia", email: "emma@gmail.com", password: hash },
        { id: 10, name: "Chris Lee", email: "chris@gmail.com", password: hash },
    ];
    const policies = [
        {
            id: 1,
            title: "Guidelines for Accessing the Library Resources",
            description: "This policy provides comprehensive details on accessing and utilizing the library's digital and physical resources. It covers library operating hours, the procedure for borrowing books, and restrictions on reference materials. Additionally, guidelines on accessing e-books and academic journals are included. This aims to ensure fair and organized usage of the library facilities. Students are encouraged to provide feedback for continuous improvement of services.",
            date: new Date("2019-09-15"),
            category: "library",
            user_id: 3,
        },
        {
            id: 2,
            title: "General Rules for Student Visa Renewal Process",
            description: "This policy outlines the procedure for renewing student visas for international students. It details the required documents, submission timelines, and the processing duration. Additionally, it includes information about maintaining visa compliance, avoiding delays in application submission, and tips for meeting embassy requirements. Students are advised to seek assistance from the university's visa office for guidance during the process.",
            date: new Date("2020-02-01"),
            category: "visa",
            user_id: 7,
        },
        {
            id: 11,
            title: "Policy on Safe Food Handling in Campus Cafeterias",
            description: "This policy aims to ensure the highest standards of food safety in campus cafeterias. It includes measures for proper food storage, hygiene practices, and temperature control. The policy also outlines inspection schedules and steps for addressing violations. Regular audits and staff training sessions are mandated to minimize the risk of foodborne illnesses and promote a healthy campus environment.",
            date: new Date("2020-11-10"),
            category: "food",
            user_id: 2,
        },
        {
            id: 12,
            title: "Rules for Meditation Room Usage and Scheduling",
            description: "This policy establishes guidelines for the effective and fair usage of the campus meditation room. It provides a schedule for individual and group meditation sessions and sets rules for maintaining silence and cleanliness. Additionally, it outlines procedures for reserving the space and reporting any disturbances. Students are encouraged to use the meditation room to foster well-being and stress relief.",
            date: new Date("2021-01-20"),
            category: "meditation",
            user_id: 5,
        },
        {
            id: 21,
            title: "Travel Guidelines for Student Exchange Programs",
            description: "This policy provides essential travel guidelines for students participating in exchange programs. It includes information on insurance, documentation, and the importance of adhering to the host country's laws. The policy highlights pre-departure training and tips for maintaining safety during travel. Students are also advised to stay connected with the university's program coordinators for assistance.",
            date: new Date("2021-09-05"),
            category: "travel",
            user_id: 9,
        },
        {
            id: 22,
            title: "Operational Hours for the Student Lounge Area",
            description: "This policy defines the operational hours and usage rules for the student lounge. It encourages students to use the space responsibly for relaxation and informal meetings. The policy emphasizes maintaining cleanliness, respecting other users, and following the lounge's reservation system for group events. The goal is to provide a comfortable and organized environment for all.",
            date: new Date("2021-12-01"),
            category: "students lounge",
            user_id: 4,
        },
        {
            id: 31,
            title: "Rules for Booking General Campus Facilities",
            description: "This policy outlines the rules for reserving and utilizing general campus facilities such as conference halls, sports arenas, and study rooms. It includes booking procedures, usage time limits, and responsibilities of the users. Students and faculty are encouraged to follow these guidelines to ensure fair access and avoid scheduling conflicts. The policy also specifies steps to report facility damages or issues promptly.",
            date: new Date("2022-03-15"),
            category: "General",
            user_id: 6,
        },
        {
            id: 32,
            title: "Food Vendor Regulations for Campus Events",
            description: "This policy establishes guidelines for hiring food vendors during on-campus events. It includes requirements for health and safety compliance, permits, and waste disposal. The policy ensures that all vendors adhere to the university's sustainability goals by using biodegradable packaging. Event organizers are required to submit vendor details for prior approval to ensure quality and consistency.",
            date: new Date("2022-06-30"),
            category: "food",
            user_id: 8,
        },
        {
            id: 33,
            title: "Library Equipment Usage Policy",
            description: "This policy covers the rules for using equipment such as printers, scanners, and computers available in the library. It specifies usage time limits, prioritization for academic work, and troubleshooting procedures. Users are advised to report malfunctioning equipment to the library help desk promptly. Regular audits will be conducted to ensure the equipment remains operational and accessible to all students.",
            date: new Date("2022-09-25"),
            category: "library",
            user_id: 1,
        },
        {
            id: 41,
            title: "Updated Education Scholarship Eligibility Criteria",
            description: "This policy highlights the revised eligibility criteria for university scholarships aimed at supporting academic excellence. It includes new GPA thresholds, community involvement requirements, and application deadlines. The policy encourages students to consult with the financial aid office for personalized assistance in meeting these criteria. Notifications regarding upcoming scholarship opportunities will be sent regularly.",
            date: new Date("2023-02-15"),
            category: "education",
            user_id: 2,
        },
        {
            id: 42,
            title: "Meditation Workshop Participation Policy",
            description: "This policy provides guidelines for students wishing to participate in meditation workshops organized on campus. It includes details about registration procedures, attendance limits, and session timings. Additionally, it emphasizes creating a distraction-free environment by requesting participants to arrive on time and keep their phones on silent. The workshops aim to foster mindfulness and emotional well-being.",
            date: new Date("2023-05-10"),
            category: "meditation",
            user_id: 5,
        },
        {
            id: 43,
            title: "Travel Advisory for Academic Conferences",
            description: "This policy details travel advisories for students and staff attending academic conferences. It includes safety precautions, reimbursement procedures for expenses, and necessary documentation. Attendees are encouraged to use university-recommended travel agencies to ensure cost-effectiveness and reliability. The policy also provides guidelines for seeking emergency assistance during travel.",
            date: new Date("2023-08-05"),
            category: "travel",
            user_id: 10,
        },
        {
            id: 51,
            title: "New Guidelines for Visa Application Extensions",
            description: "This policy provides updated instructions for international students seeking visa extensions. It outlines the required documentation, deadlines for submission, and the university's role in facilitating the process. Students are encouraged to start the application process early to avoid delays. Support services are available to assist students in completing forms and navigating embassy requirements.",
            date: new Date("2024-01-18"),
            category: "visa",
            user_id: 3,
        },
        {
            id: 52,
            title: "Rules for Collaborative Projects in Students Lounge",
            description: "This policy sets guidelines for conducting collaborative group projects in the student lounge. It encourages proper booking of spaces, noise management, and equitable use of available resources. The policy also emphasizes maintaining the lounge's cleanliness and respecting other users' privacy. Groups are required to follow a strict code of conduct to ensure harmony.",
            date: new Date("2024-04-12"),
            category: "students lounge",
            user_id: 7,
        },
        {
            id: 53,
            title: "Library Late Fees and Fine Waiver Policy",
            description: "This policy outlines the late fee structure for overdue library materials and the process for applying for fine waivers. It includes exemptions for students facing financial hardships or emergencies. The policy encourages students to return borrowed items on time to avoid fines. Users can appeal for waivers through a formal process documented in this policy.",
            date: new Date("2024-07-01"),
            category: "library",
            user_id: 4,
        },
        {
            id: 54,
            title: "Sustainability Practices in Campus Food Services",
            description: "This policy encourages sustainable practices in campus food services by outlining the use of locally sourced ingredients, reducing single-use plastics, and promoting composting of organic waste. It highlights partnerships with environmentally friendly vendors and sets goals for reducing the university's carbon footprint. Students and staff are urged to participate in sustainability initiatives by adhering to these practices.",
            date: new Date("2024-08-15"),
            category: "food",
            user_id: 6,
        },
        {
            id: 55,
            title: "Guidelines for Emergency Travel Assistance",
            description: "This policy provides a framework for offering emergency travel assistance to students and staff during unexpected situations such as medical emergencies or family crises. It includes contact information for university support teams, procedures for requesting financial aid for travel expenses, and tips for emergency preparedness. Students are encouraged to register their travel plans with the university for better assistance.",
            date: new Date("2024-10-20"),
            category: "travel",
            user_id: 9,
        },
        {
            id: 56,
            title: "Policy for Quiet Study Zones in the Library",
            description: "This policy designates specific areas in the library as quiet zones for individual study. It outlines rules for maintaining silence, prohibiting mobile phone usage, and reporting disturbances. The policy aims to create a conducive environment for focused academic work. Library staff will regularly monitor these zones to ensure compliance with the rules.",
            date: new Date("2024-11-05"),
            category: "library",
            user_id: 2,
        },
        {
            id: 57,
            title: "Student Lounge Event Reservation Policy",
            description: "This policy details the procedures for reserving the student lounge for events such as club meetings, workshops, and social gatherings. It includes information about advance booking, approval timelines, and equipment availability. Event organizers are required to adhere to cleanup protocols and submit feedback after the event to improve the reservation process.",
            date: new Date("2025-01-15"),
            category: "students lounge",
            user_id: 10,
        },
        {
            id: 58,
            title: "Guidelines for Education Grant Applications",
            description: "This policy explains the process for applying for education grants offered by the university. It includes eligibility criteria, documentation requirements, and deadlines for submission. The policy emphasizes the importance of presenting a clear academic plan and how the grant will support the student's goals. The financial aid office is available for guidance and to answer queries related to the grant process.",
            date: new Date("2025-03-01"),
            category: "education",
            user_id: 5,
        },
        {
            id: 59,
            title: "Meditation Room Maintenance and Feedback Policy",
            description: "This policy focuses on maintaining the meditation room and ensuring user satisfaction. It provides details about regular cleaning schedules, the process for reporting damages or issues, and a feedback system for suggestions. The policy also highlights plans for periodic upgrades to the room's facilities based on student feedback to enhance the overall experience.",
            date: new Date("2025-05-10"),
            category: "meditation",
            user_id: 8,
        },
    ];
    const userStatement = db_1.default.prepare("INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)");
    for (const user of users) {
        userStatement.run(user.id, user.name, user.email, user.password, (err) => {
            if (err) {
                console.error("Error inserting seed data: ", err);
            }
        });
    }
    userStatement.finalize();
    const policyStatement = db_1.default.prepare("INSERT INTO policies (id, title, description, date, category, user_id) VALUES (?, ?, ?, ?, ?, ?)");
    for (const policy of policies) {
        policyStatement.run(policy.id, policy.title, policy.description, policy.date, policy.category, policy.user_id, (err) => {
            if (err) {
                console.error("Error inserting seeding data: ", err);
            }
        });
    }
    policyStatement.finalize();
    const votes = [
        { user_id: 1, policy_id: 51 },
        { user_id: 2, policy_id: 51 },
        { user_id: 3, policy_id: 51 },
        { user_id: 4, policy_id: 51 },
        { user_id: 5, policy_id: 51 },
        { user_id: 6, policy_id: 51 },
        { user_id: 7, policy_id: 51 },
        { user_id: 8, policy_id: 51 },
        { user_id: 9, policy_id: 51 },
        { user_id: 1, policy_id: 52 },
        { user_id: 2, policy_id: 52 },
        { user_id: 3, policy_id: 52 },
        { user_id: 4, policy_id: 52 },
        { user_id: 5, policy_id: 52 },
        { user_id: 2, policy_id: 53 },
        { user_id: 3, policy_id: 53 },
        { user_id: 4, policy_id: 53 },
        { user_id: 5, policy_id: 53 },
        { user_id: 6, policy_id: 53 },
        { user_id: 2, policy_id: 54 },
        { user_id: 1, policy_id: 54 },
        { user_id: 3, policy_id: 54 },
        { user_id: 3, policy_id: 55 },
        { user_id: 3, policy_id: 56 },
        { user_id: 4, policy_id: 57 },
        { user_id: 4, policy_id: 58 },
        { user_id: 5, policy_id: 59 },
        { user_id: 5, policy_id: 41 },
        { user_id: 6, policy_id: 42 },
        { user_id: 6, policy_id: 43 },
        { user_id: 7, policy_id: 31 },
        { user_id: 7, policy_id: 32 },
        { user_id: 8, policy_id: 33 },
        { user_id: 8, policy_id: 11 },
        { user_id: 9, policy_id: 12 },
        { user_id: 9, policy_id: 21 },
        { user_id: 10, policy_id: 22 },
        { user_id: 10, policy_id: 1 },
        { user_id: 1, policy_id: 2 },
        { user_id: 2, policy_id: 11 },
        { user_id: 3, policy_id: 12 },
        { user_id: 4, policy_id: 21 },
        { user_id: 5, policy_id: 22 },
        { user_id: 6, policy_id: 1 },
        { user_id: 7, policy_id: 2 },
        { user_id: 8, policy_id: 31 },
        { user_id: 9, policy_id: 41 },
        { user_id: 10, policy_id: 51 },
    ];
    const voteStatement = db_1.default.prepare("INSERT INTO votes (user_id, policy_id) VALUES (?, ?)");
    for (const vote of votes) {
        voteStatement.run(vote.user_id, vote.policy_id, (err) => {
            if (err) {
                console.error("Error inserting seeding data: ", err);
            }
        });
    }
    console.log("Database seeding completed.");
};
exports.seed = seed;
