"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { isClosedPosition } from "@/lib/positions";

const APPLY_HREF = "/apply";

const JOB_LISTINGS = [
  {
    title: "Sous Chef",
    department: "Back of House",
    reportsTo: "Executive Chef",
    type: "Full-Time",
    flsa: "Exempt",
    description:
      "La Victoria is seeking a skilled, disciplined Sous Chef to help lead our opening culinary team. Working alongside our accomplished Executive Chef, you'll play a key role in bringing an authentic Mexican menu to life through modern technique, thoughtful execution, and an uncompromising commitment to quality.",
    sections: [
      {
        heading: "Essential Duties and Responsibilities",
        items: [
          "Assist the Executive Chef in planning, directing, and coordinating all food preparation and cooking activities.",
          "Prepare and cook menu items according to standardized recipes, portion sizes, and presentation standards.",
          "Ensure timely execution of orders during service periods and coordinate ticket flow with the line.",
          "Assist in menu development, including specials, seasonal items, and catering menus, as directed.",
          "Supervise line cooks, prep cooks, dishwashers, and other back-of-house staff during assigned shifts.",
          "Train kitchen personnel on recipes, techniques, equipment use, safety, and sanitation procedures.",
          "Assign daily stations and tasks; monitor productivity, quality, and adherence to standards.",
          "Provide input on hiring, discipline, and performance evaluations to the Executive Chef and management.",
          "Enforce proper food handling, storage, labeling, and rotation (FIFO) in compliance with applicable health codes.",
          "Maintain highest standards of cleanliness and organization in all kitchen and storage areas.",
          "Monitor cooking and holding temperatures and ensure compliance with local health department regulations.",
          "Report and help correct any safety hazards, equipment malfunctions, or sanitation issues.",
          "Assist with inventory counts and monitoring par levels of food, supplies, and kitchen equipment.",
          "Help track and reduce food waste; participate in cost-control efforts and portion control.",
          "Collaborate with the Executive Chef and/or purchasing staff on ordering and receiving product, verifying quality and quantity.",
          "Communicate effectively with the Executive Chef, front-of-house management, and service team regarding menu changes, special requests, allergies, and dietary needs.",
          "Participate in pre-shift meetings and contribute to continuous improvement of kitchen operations.",
          "Support catering, banquets, private events, and off-site functions as needed.",
          "Perform other related duties as assigned by the Executive Chef or management, consistent with the general nature of the position.",
        ],
      },
      {
        heading: "Required Qualifications",
        items: [
          "6+ years of professional kitchen experience, including 3+ years in a supervisory or lead cook role (e.g., line lead, junior sous chef, kitchen supervisor).",
          "Strong culinary skills and knowledge of cooking techniques, kitchen equipment, and food safety practices.",
          "Ability to lead, motivate, and train a diverse kitchen team in a fast-paced environment.",
          "Food safety certification (e.g., ServSafe Manager or state/local equivalent), or ability to obtain before opening.",
          "Ability to read and follow standardized recipes and production sheets.",
        ],
      },
      {
        heading: "Preferred Qualifications",
        items: [
          "Formal culinary education (culinary school, vocational program, or equivalent experience).",
          "Experience with fine dining, high-volume, hotel, catering, Mexican cuisine.",
          "Experience working with inventory management and food-cost control.",
          "Bilingual skills (English/Spanish) preferred, depending on workforce.",
        ],
      },
      {
        heading: "Physical Requirements",
        items: [
          "Ability to stand and walk for extended periods, including the entire shift.",
          "Frequent reaching, bending, stooping, pushing, and pulling.",
          "Frequent lifting and carrying of items up to 25–50 pounds (e.g., cases of product, containers of ice).",
          "Exposure to hot equipment and surfaces; moving mechanical parts; noise typical of a commercial kitchen; and cleaning chemicals and food allergens.",
          "Must be able to work in a high-heat environment and near other staff.",
        ],
      },
      {
        heading: "Reasonable Accommodations",
        items: [
          "The company will provide reasonable accommodations to qualified individuals with disabilities to perform the essential functions of this position, in accordance with applicable federal, state, and local laws.",
        ],
      },
      {
        heading: "Work Schedule",
        items: [
          "Full-time; typical shifts include early mornings, days, evenings, weekends, and holidays.",
          "Must be able to work with a flexible schedule. Schedule will vary based on business needs.",
        ],
      },
      {
        heading: "Compensation",
        items: [
          "Salaried, exempt position, starting range from $65,000 to $75,000 annually.",
        ],
      },
    ],
  },
  {
    title: "Pastry Chef",
    department: "Back of House",
    reportsTo: "Executive Chef",
    type: "Full-Time",
    flsa: "Exempt",
    description:
      "La Victoria is seeking a skilled, creative Pastry Chef to lead our pastry program and help complete the dining experience through exceptional desserts and baked goods. Working alongside our accomplished Executive Chef, you'll develop and execute a pastry menu that complements our authentic Mexican cuisine with modern technique, seasonal inspiration, and meticulous attention to detail.",
    sections: [
      {
        heading: "Essential Duties and Responsibilities",
        items: [
          "Prepare, bake, and finish a variety of pastries, breads, desserts, and confections according to standardized recipes and presentation specifications.",
          "Develop and test new recipes and seasonal offerings, subject to approval by the Executive Chef or management.",
          "Ensure consistent portion sizes, taste, texture, and appearance of all pastry items.",
          "Adjust recipes and methods for batch size, dietary needs (e.g., gluten-free, nut-free, dairy-free), and customer demand.",
          "Participate in dessert and pastry menu planning, including specials and event menus.",
          "Estimate pastry and dessert needs based on forecasts, reservations, and events.",
          "Work with management and/or Executive Chef on food cost control, portioning, and waste reduction.",
          "Assist in pricing recommendations by considering ingredient costs, labor time, and target margins.",
          "Monitor inventory levels of pastry ingredients, supplies, and smallwares.",
          "Prepare or assist with daily, weekly, or monthly inventory counts.",
          "Communicate needs and place orders with approved vendors per company procedures.",
          "Rotate stock according to 'first in, first out' (FIFO) and dispose of expired or compromised items in accordance with food safety guidelines.",
          "Operate and maintain pastry equipment such as mixers, ovens, proofers, sheeters, and other specialized tools.",
          "Ensure equipment is cleaned, maintained, and serviced according to schedules and manufacturer guidelines.",
          "Report equipment malfunctions or safety hazards to management promptly.",
          "Follow all applicable federal, state, and local food safety and sanitation requirements (for example, the FDA Food Code as adopted by your local jurisdiction; state health codes; local health department rules).",
          "Maintain a clean and organized pastry kitchen, including workstations, storage areas, coolers, and ovens.",
          "Comply with personal hygiene standards, including appropriate uniforms, hair restraints, handwashing, and glove use.",
          "Properly label, date, and store products; understand and follow procedures for allergen control and cross-contamination prevention.",
          "Comply with all company policies on health and safety, including OSHA-related procedures applicable to kitchen operations.",
          "Supervise pastry cooks, assistants, bakers, or apprentices, including assigning tasks, providing direction, and monitoring performance.",
          "Train staff on recipes, techniques, food safety, and presentation standards.",
          "Provide feedback to management regarding staffing needs and performance issues.",
          "Coordinate with front-of-house staff to accommodate special dessert requests, dietary restrictions, and event needs.",
          "Collaborate with culinary team members on plated dessert design and timing for service.",
          "For retail environments, assist with product display, packaging, and occasionally direct customer interaction (e.g., describing products, answering ingredient questions).",
          "Complete required logs and records (temperature logs, production logs, waste logs) as required by company policy and local health regulations.",
          "Follow company policies and procedures regarding attendance, timekeeping, anti-harassment, non-discrimination, and workplace conduct.",
          "Participate in required training (food handler/manager certifications, safety training, etc.) as mandated by law or company policy.",
        ],
      },
      {
        heading: "Required Qualifications",
        items: [
          "6+ years of pastry experience, including 3+ years in a supervisory or lead pastry cook role (e.g., pastry chef, junior sous chef, kitchen supervisor).",
          "Strong culinary skills and knowledge of cooking techniques, kitchen equipment, and food safety practices.",
          "Ability to lead, motivate, and train a diverse kitchen team in a fast-paced environment.",
          "Food safety certification (e.g., ServSafe Manager or state/local equivalent), or ability to obtain before opening.",
          "Ability to read and follow standardized recipes and production sheets.",
        ],
      },
      {
        heading: "Preferred Qualifications",
        items: [
          "Formal culinary education (culinary school, vocational program, or equivalent experience).",
          "Experience with fine dining, high-volume, hotel, catering, Mexican cuisine.",
          "Experience working with inventory management and food-cost control.",
          "Bilingual skills (English/Spanish) preferred, depending on workforce.",
        ],
      },
      {
        heading: "Physical Requirements",
        items: [
          "Ability to stand and walk for extended periods, including the entire shift.",
          "Frequent reaching, bending, stooping, pushing, and pulling.",
          "Frequent lifting and carrying of items up to 25–50 pounds (e.g., cases of product, containers of ice).",
          "Exposure to hot equipment and surfaces; moving mechanical parts; noise typical of a commercial kitchen; and cleaning chemicals and food allergens.",
          "Must be able to work in a high-heat environment and near other staff.",
        ],
      },
      {
        heading: "Reasonable Accommodations",
        items: [
          "The company will provide reasonable accommodations to qualified individuals with disabilities to perform the essential functions of this position, in accordance with applicable federal, state, and local laws.",
        ],
      },
      {
        heading: "Work Schedule",
        items: [
          "Full-time; typical shifts include early mornings, days, evenings, weekends, and holidays.",
          "Must be able to work with a flexible schedule. Schedule will vary based on business needs.",
        ],
      },
      {
        heading: "Compensation",
        items: [
          "Salaried, exempt position, starting range from $55,000 to $65,000 annually.",
        ],
      },
    ],
  },
  {
    title: "Server",
    department: "Front of House / Dining Room",
    reportsTo: "Supervisor / Assistant General Manager",
    type: "Full-Time / Part-Time",
    flsa: "NonExempt (Hourly)",
    description:
      "The Server is responsible for providing guests with a positive dining experience through prompt, courteous, and professional service. Primary duties include greeting guests, explaining menu items, taking orders, serving food and beverages, monitoring guest satisfaction, handling payments, providing proper mise en place to guests, pre-bussing tables, completing sidework, and maintaining a clean and safe work environment in compliance with company policies and applicable laws and regulations.",
    sections: [
      {
        heading: "Essential Duties and Responsibilities",
        items: [
          "Greet guests promptly and courteously; present menus and provide basic menu orientation.",
          "Accurately take and enter food and beverage orders into the point-of-sale (POS) system.",
          "Answer questions about menu items, ingredients, and preparation methods, including common allergens when known, and escalate to management or kitchen as needed.",
          "Serve food and beverages promptly and in the correct sequence; check back with guests to ensure satisfaction.",
          "Respond to guest concerns and complaints professionally and promptly; notify a supervisor when necessary.",
          "Present checks, process payments (cash, credit/debit cards, and other forms as applicable), and return change or receipts accurately.",
          "Follow cash-handling and tip-reporting procedures in accordance with company policies and applicable wage and hour laws.",
          "Maintain knowledge of current menu items, daily specials, promotions, basic ingredients, source of ingredients and facility materials.",
          "Understand basic pairings and recommendations if alcohol is served, and, where applicable, comply with state/local alcohol service regulations (e.g., age verification, responsible service laws).",
          "Comply with company policies and training regarding responsible alcohol service (e.g., checking identification for age; refusing service to visibly intoxicated guests in accordance with state dram shop laws).",
          "Maintain a clean and organized workstation, including tables, service areas, and side stations.",
          "Clear tables and reset them for the next guests as directed by company standards.",
          "Follow all food safety, sanitation, and hygiene standards under applicable health codes (e.g., local health department regulations and FDA Food Code, based on Florida's standards).",
          "Handle glassware, utensils, and equipment safely to prevent accidents and injuries.",
          "Promptly report any unsafe conditions, accidents, or injuries to management.",
          "Coordinate with hosts/hostesses, bussers, bartenders, and kitchen staff to ensure efficient service.",
          "Communicate clearly and courteously with team members and supervisors.",
          "Attend and participate in pre-shift meetings, training sessions, and required company meetings.",
          "Assist other team members as needed to maintain smooth operations, consistent with any applicable union agreements if the workforce is unionized.",
        ],
      },
      {
        heading: "Qualifications",
        items: [
          "Minimum age of 18 years to serve alcoholic beverages.",
          "High school diploma or equivalent preferred.",
          "Two or more years prior serving or hospitality experience required.",
          "Ability to obtain and maintain required state food handler certification within 60 days of hire.",
          "Language: Ability to read, speak, and understand English sufficiently to understand menus, POS system instructions, safety rules, and to communicate with guests and staff.",
        ],
      },
      {
        heading: "Knowledge and Skills",
        items: [
          "Strong customer service and interpersonal skills.",
          "Ability to multi-task and work in a fast-paced environment.",
          "Ability to work as part of a team and to maintain a professional demeanor under pressure.",
        ],
      },
      {
        heading: "Physical Requirements",
        items: [
          "Ability to stand and walk for extended periods, including the entire shift.",
          "Ability to lift, carry, push, or pull up to 15–30 pounds (e.g., cases of product, containers of ice).",
          "Frequent reaching, bending, stooping, and repetitive hand and arm motions.",
          "Ability to work in a noisy, fast-paced environment with exposure to sharp objects, broken glass, cleaning chemicals, and varying temperatures.",
        ],
      },
      {
        heading: "Reasonable Accommodations",
        items: [
          "The company will provide reasonable accommodations to qualified individuals with disabilities to perform the essential functions of this position, in accordance with applicable federal, state, and local laws.",
        ],
      },
      {
        heading: "Work Schedule",
        items: [
          "Part-time or full-time; typical shifts include days, evenings, weekends, and holidays.",
          "Schedule may vary based on business needs.",
        ],
      },
      {
        heading: "Compensation",
        items: [
          "Hourly, non-exempt position; eligible for overtime in accordance with applicable law.",
          "This is a tipped position; compensation includes base hourly wage plus tips, in accordance with applicable federal, state, and local wage and hour laws.",
        ],
      },
    ],
  },
  {
    title: "Bartender",
    department: "Front of House / Bar",
    reportsTo: "Supervisor / Assistant General Manager",
    type: "Full-Time / Part-Time",
    flsa: "NonExempt (Hourly)",
    description:
      "The Bartender is responsible for preparing and serving alcoholic and nonalcoholic beverages to guests in a courteous, efficient, and professional manner, while complying with all applicable liquor laws, health and safety regulations, and company policies. The Bartender creates a positive guest experience by providing attentive, friendly, and knowledgeable service, as well as providing proper mise en place to guests, pre-bussing the bartop, and completing sidework.",
    sections: [
      {
        heading: "Essential Duties and Responsibilities",
        items: [
          "Greet guests promptly and courteously; present menus and provide basic menu orientation.",
          "Perform opening, shift change, and closing sidework as assigned.",
          "Prepare and serve alcoholic and nonalcoholic beverages consistent with company recipes and presentation standards.",
          "Maintain cleanliness and organization of the bar area, including counters, equipment, utensils, and glassware, in compliance with health and sanitation standards.",
          "Stock, rotate, and replenish bar inventory (spirits, beer, wine, mixers, garnishes, glassware, ice, and supplies) as needed, and communicate low-stock or out-of-stock items to management.",
          "Work collaboratively with servers, hosts, and kitchen staff to ensure timely service and a positive guest experience.",
          "Follow all responsible alcohol service policies and participate in required alcohol server training. Verify guest age by checking identification to ensure compliance with applicable state and local laws. Monitor guest consumption and behavior; refuse service to underage guests or guests who appear intoxicated, in accordance with law and company policy.",
          "Operate point-of-sale (POS) system; accurately enter orders, process payments, and handle cash and credit card transactions in accordance with company cash-handling procedures.",
          "Follow all safety procedures and guidelines, including proper handling of glassware, cleaning chemicals, and equipment.",
          "Adhere to all company policies regarding attendance, appearance, conduct, and harassment-free workplace standards.",
          "Perform other job-related duties as assigned.",
        ],
      },
      {
        heading: "Qualifications",
        items: [
          "Minimum age of 21 years to pour alcoholic beverages.",
          "High school diploma or equivalent preferred.",
          "Three or more years prior bartending or hospitality experience required.",
          "Ability to obtain and maintain required state food handler certification within 60 days of hire.",
          "Language: Ability to read, speak, and understand English sufficiently to understand menus, POS system instructions, safety rules, and to communicate with guests and staff.",
        ],
      },
      {
        heading: "Knowledge and Skills",
        items: [
          "Strong customer service and interpersonal skills.",
          "Ability to multi-task and work in a fast-paced environment.",
          "Ability to work as part of a team and to maintain a professional demeanor under pressure.",
        ],
      },
      {
        heading: "Physical Requirements",
        items: [
          "Ability to stand and walk for extended periods, including the entire shift.",
          "Ability to lift, carry, push, or pull up to 15–30 pounds (e.g., cases of product, kegs, containers of ice).",
          "Frequent reaching, bending, stooping, and repetitive hand and arm motions.",
          "Ability to work in a noisy, fast-paced environment with exposure to sharp objects, broken glass, cleaning chemicals, and varying temperatures.",
        ],
      },
      {
        heading: "Reasonable Accommodations",
        items: [
          "The company will provide reasonable accommodations to qualified individuals with disabilities to perform the essential functions of this position, in accordance with applicable federal, state, and local laws.",
        ],
      },
      {
        heading: "Work Schedule",
        items: [
          "Part-time or full-time; typical shifts include days, evenings, weekends, and holidays.",
          "Schedule may vary based on business needs.",
        ],
      },
      {
        heading: "Compensation",
        items: [
          "Hourly, non-exempt position; eligible for overtime in accordance with applicable law.",
          "This is a tipped position; compensation includes base hourly wage plus tips, in accordance with applicable federal, state, and local wage and hour laws.",
        ],
      },
    ],
  },
  {
    title: "Line Cook",
    department: "Back of House / Kitchen",
    reportsTo: "Supervisor / Sous Chef",
    type: "Full-Time / Part-Time",
    flsa: "NonExempt (Hourly)",
    description:
      "The Line Cook is responsible for preparing, cooking, and plating menu items according to restaurant recipes, portion standards, food safety requirements, and service timelines. This role works closely with kitchen staff and front-of-house personnel to ensure consistent quality, cleanliness, and adherence to all health, safety, and sanitation regulations.",
    sections: [
      {
        heading: "Essential Duties and Responsibilities",
        items: [
          "Prepare and cook menu items according to standardized recipes, portion controls, and presentation specifications.",
          "Operate kitchen equipment such as grills, fryers, ovens, ranges, steamers, mixers, slicers, and other tools in a safe manner.",
          "Set up, stock, and maintain assigned stations with all required supplies, ingredients, and equipment.",
          "Ensure all dishes are prepared in a timely manner, coordinating with other line cooks and kitchen staff during service.",
          "Follow all food safety and sanitation procedures in compliance with the Federal Food Code as adopted by the Florida Department of Health.",
          "Maintain cleanliness and organization of work area, equipment, and utensils throughout shift.",
          "Label, date, and store food products according to FIFO (First In, First Out) and company procedures.",
          "Monitor and log food temperatures and maintain proper holding temperatures as required by law and company policy.",
          "Comply with OSHA general industry standards, including hazard communication, personal protective equipment (PPE), and injury reporting, as implemented in the restaurant.",
          "Safely handle hot equipment, sharp objects, and cleaning chemicals.",
          "Immediately report any safety hazards, equipment issues, or workplace injuries to management.",
          "Ensure all food leaves the kitchen meeting restaurant standards for taste, temperature, appearance, and portion size.",
          "Follow menu specifications, recipes, and plating guides accurately.",
          "Alert management to product shortages or quality issues.",
          "Communicate effectively with kitchen staff, servers, and management to ensure efficient operations.",
          "Assist other team members during peak times, including prep, dish area, and expo line as needed.",
          "Participate in pre-shift meetings and required training.",
          "Perform additional duties and responsibilities as assigned by the Chef, Kitchen Manager, or General Manager, consistent with applicable wage-and-hour laws.",
        ],
      },
      {
        heading: "Qualifications",
        items: [
          "Minimum age of 16 years to work in restaurant.",
          "High school diploma or equivalent preferred but not legally required unless justified by business need.",
          "Two or more years of fine dining and Michelin-level experience is preferred but not required. Familiarity with basic advanced cooking techniques, knife skills, and food safety practices.",
          "Ability to obtain and maintain required state food handler certification within 60 days of hire.",
        ],
      },
      {
        heading: "Knowledge and Skills",
        items: [
          "Ability to read and follow recipes, prep lists, and verbal instructions.",
          "Ability to work in a fast-paced environment while maintaining quality and safety.",
          "Strong attention to detail, organization, and time management.",
          "Ability to work effectively as part of a team and communicate professionally.",
        ],
      },
      {
        heading: "Physical Requirements",
        items: [
          "Ability to stand and walk for extended periods, including the entire shift.",
          "Frequent reaching, bending, stooping, pushing, and pulling.",
          "Frequent lifting and carrying of items up to 25–50 pounds (e.g., cases of product, containers of ice).",
          "Exposure to hot equipment and surfaces; moving mechanical parts; noise typical of a commercial kitchen; and cleaning chemicals and food allergens.",
          "Must be able to work in a high-heat environment and near other staff.",
        ],
      },
      {
        heading: "Reasonable Accommodations",
        items: [
          "The company will provide reasonable accommodations to qualified individuals with disabilities to perform the essential functions of this position, in accordance with applicable federal, state, and local laws.",
        ],
      },
      {
        heading: "Work Schedule",
        items: [
          "Part-time or full-time; typical shifts include days, evenings, weekends, and holidays.",
          "Schedule may vary based on business needs.",
        ],
      },
      {
        heading: "Compensation",
        items: [
          "Hourly, non-exempt position, ranges from $17-$23/hour; eligible for overtime in accordance with applicable law.",
        ],
      },
    ],
  },
  {
    title: "Prep Cook",
    department: "Back of House / Kitchen",
    reportsTo: "Supervisor / Sous Chef",
    type: "Full-Time / Part-Time",
    flsa: "NonExempt (Hourly)",
    description:
      "The Prep Cook is responsible for preparing ingredients and basic menu components in accordance with standardized recipes, food safety requirements, and company quality standards. The role supports line cooks, general utility, and the broader kitchen team to ensure timely and consistent service.",
    sections: [
      {
        heading: "Essential Duties and Responsibilities",
        items: [
          "Wash, peel, cut, and prepare fruits, vegetables, and other ingredients according to standardized recipes and instructions.",
          "Measure and assemble ingredients and components for menu items (e.g., sauces, dressings, stocks, marinades, garnishes).",
          "Label, date, store, and rotate food items in accordance with FIFO (first in, first out) and company policies.",
          "Maintain workstations, utensils, and equipment in a clean and sanitary condition throughout the shift.",
          "Follow all food safety and hygiene procedures, including proper handwashing, temperature control, and cross contamination prevention.",
          "Assist with receiving, checking, and properly storing deliveries, including verifying quantities and condition of goods.",
          "Operate basic kitchen equipment (e.g., knives, slicers, mixers, ovens, ranges, steamers) safely and according to manufacturer instructions and company policies.",
          "Communicate low inventory levels or quality concerns to supervisors promptly.",
          "Assist line cooks and other kitchen staff as directed during service periods.",
          "Properly handle and dispose of waste, including composting and recycling where applicable.",
          "Follow all company policies, procedures, safety standards, and instructions from supervisors.",
          "Perform other related duties as assigned, consistent with the role.",
        ],
      },
      {
        heading: "Qualifications",
        items: [
          "Minimum age of 16 years to work in restaurant.",
          "High school diploma or equivalent preferred but not legally required unless justified by business need.",
          "Two or more years of experience is preferred but not required.",
          "Familiarity with basic advanced cooking techniques, knife skills, and food safety practices.",
          "Ability to obtain and maintain required state food handler certification within 60 days of hire.",
        ],
      },
      {
        heading: "Knowledge and Skills",
        items: [
          "Ability to read and follow recipes, prep lists, and verbal instructions.",
          "Ability to work in a fast-paced environment while maintaining quality and safety.",
          "Strong attention to detail, organization, and time management.",
          "Ability to work effectively as part of a team and communicate professionally.",
        ],
      },
      {
        heading: "Physical Requirements",
        items: [
          "Ability to stand and walk for extended periods, including the entire shift.",
          "Frequent reaching, bending, stooping, pushing, and pulling.",
          "Frequent lifting and carrying of items up to 25–50 pounds (e.g., cases of product, containers of ice).",
          "Exposure to hot equipment and surfaces; moving mechanical parts; noise typical of a commercial kitchen; and cleaning chemicals and food allergens.",
          "Must be able to work in a high-heat environment and near other staff.",
        ],
      },
      {
        heading: "Reasonable Accommodations",
        items: [
          "The company will provide reasonable accommodations to qualified individuals with disabilities to perform the essential functions of this position, in accordance with applicable federal, state, and local laws.",
        ],
      },
      {
        heading: "Work Schedule",
        items: [
          "Part-time or full-time; typical shifts include early mornings, days, evenings, weekends, and holidays.",
          "Schedule may vary based on business needs.",
        ],
      },
      {
        heading: "Compensation",
        items: [
          "Hourly, non-exempt position, ranges from $17-$21/hour; eligible for overtime in accordance with applicable law.",
        ],
      },
    ],
  },
  {
    title: "Guest Services",
    department: "Front of House / Dining Room",
    reportsTo: "Supervisor / Assistant General Manager",
    type: "Full-Time / Part-Time",
    flsa: "NonExempt (Hourly)",
    description:
      "Guest Services is responsible for providing a welcoming, professional first impression to guests, managing reservations and seating, coordinating with the service team to ensure a smooth flow of guests through the dining room, answering phones, and facilitating take-out orders. This role requires strong customer service skills, attention to detail, and the ability to work in a fast-paced environment.",
    sections: [
      {
        heading: "Essential Duties and Responsibilities",
        items: [
          "Greet arriving guests in a friendly, courteous, and professional manner.",
          "Manage reservations and walk-in guests using the restaurant's reservation/seating system.",
          "Estimate wait times accurately and communicate them clearly to guests.",
          "Maintain and manage an accurate waitlist and ensure timely seating of guests in accordance with table rotation policies and server sections.",
          "Escort guests to assigned tables and provide menus; communicate any special seating needs (e.g., high chairs, accessibility needs) to servers.",
          "Answer incoming phone calls promptly and courteously, including handling reservations, inquiries about hours or menu items, and take-out orders if applicable.",
          "Coordinate with servers, server assistants, and management to maintain efficient table turnover and guest flow.",
          "Monitor dining room appearance and cleanliness; notify server assistants when tables need to be cleared and reset.",
          "Follow all food safety, sanitation, and health department regulations as trained by the restaurant.",
          "Handle guest complaints or concerns promptly and courteously, escalating to management when appropriate.",
          "Communicate guest special occasions or VIP arrivals to management and service staff as directed by restaurant policy.",
          "Perform opening, shift change, and closing sidework as assigned.",
          "Maintain cleanliness and organization of restrooms to meet all food safety, sanitation, and health department regulations as trained by the restaurant.",
          "Assist with light cleaning and organization of host stand, menus, and front entry area.",
          "Support other front-of-house functions as directed.",
        ],
      },
      {
        heading: "Qualifications",
        items: [
          "Minimum age of 16 years to work in the restaurant.",
          "High school diploma or equivalent preferred.",
          "One or more years prior hospitality experience preferred.",
          "Ability to obtain and maintain required state food handler certification within 60 days of hire.",
          "Language: Ability to read, speak, and understand English sufficiently to understand menus, POS system instructions, safety rules, and to communicate with guests and staff.",
        ],
      },
      {
        heading: "Knowledge and Skills",
        items: [
          "Strong customer service and interpersonal skills.",
          "Ability to multi-task and work in a fast-paced environment.",
          "Ability to work as part of a team and to maintain a professional demeanor under pressure.",
        ],
      },
      {
        heading: "Physical Requirements",
        items: [
          "Ability to stand and walk for extended periods, including the entire shift.",
          "Ability to lift, carry, push, or pull up to 15–30 pounds (e.g., cases of menus).",
          "Frequent reaching, bending, stooping, and repetitive hand and arm motions.",
          "Ability to work in a noisy, fast-paced environment with exposure to sharp objects, broken glass, cleaning chemicals, and varying temperatures.",
        ],
      },
      {
        heading: "Reasonable Accommodations",
        items: [
          "The company will provide reasonable accommodations to qualified individuals with disabilities to perform the essential functions of this position, in accordance with applicable federal, state, and local laws.",
        ],
      },
      {
        heading: "Work Schedule",
        items: [
          "Part-time or full-time; typical shifts include days, evenings, weekends, and holidays.",
          "Schedule may vary based on business needs.",
        ],
      },
      {
        heading: "Compensation",
        items: [
          "Non-exempt, hourly position, ranges from $15-$17/hour; eligible for overtime in accordance with applicable law.",
        ],
      },
    ],
  },
  {
    title: "Server Assistant",
    department: "Front of House / Bar and Dining Room",
    reportsTo: "Supervisor / Assistant General Manager",
    type: "Full-Time / Part-Time",
    flsa: "NonExempt (Hourly)",
    description:
      "The Server Assistant supports servers, bartenders, and the broader front-of-house team to ensure timely, efficient, and high-quality service to guests. This position is responsible for clearing and resetting tables, running food, refilling beverages, maintaining cleanliness in the dining areas and bar, and assisting with guest needs in coordination with servers, bartenders, and management.",
    sections: [
      {
        heading: "Essential Duties and Responsibilities",
        items: [
          "Greet guests promptly and courteously.",
          "Assist servers in delivering food and beverages to guests in a timely and accurate manner.",
          "Refill water, coffee, and non-alcoholic beverages as needed.",
          "Respond to guest requests within the scope of authority and promptly relay other requests to servers or management.",
          "Clear, clean, and reset tables and bartop between courses and after guest departure, following restaurant standards.",
          "Ensure proper setup of flatware, glassware, napkins, condiments, and table decorations.",
          "Assist with opening procedures, including stocking service stations, polishing silverware and glassware, and preparing dining areas.",
          "Assist with closing procedures, including breaking down service stations, restocking supplies, completing sidework, and general cleaning tasks. Maintain cleanliness and organization of the bar area, dining room, kitchen, equipment, utensils, and glassware, in compliance with health and sanitation standards.",
          "Stock, rotate, and replenish bar inventory (spirits, beer, wine, mixers, garnishes, glassware, ice, and supplies) as needed, and communicate low-stock or out-of-stock items to management.",
          "Work collaboratively with servers, hosts, and kitchen staff to ensure timely service and a positive guest experience.",
          "Follow all safety procedures and guidelines, including proper handling of glassware, cleaning chemicals, and equipment to prevent breakage and injury.",
          "Adhere to all company policies regarding attendance, appearance, conduct, and harassment-free workplace standards.",
          "Perform other job-related duties as assigned.",
        ],
      },
      {
        heading: "Qualifications",
        items: [
          "Minimum age of 16 years to work in restaurant.",
          "High school diploma or equivalent preferred.",
          "One or more years prior hospitality experience required.",
          "Ability to obtain and maintain required state food handler certification within 60 days of hire.",
          "Language: Ability to read, speak, and understand English sufficiently to understand menus, POS system instructions, safety rules, and to communicate with guests and staff.",
        ],
      },
      {
        heading: "Knowledge and Skills",
        items: [
          "Strong customer service and interpersonal skills.",
          "Ability to multi-task and work in a fast-paced environment.",
          "Ability to work as part of a team and to maintain a professional demeanor under pressure.",
        ],
      },
      {
        heading: "Physical Requirements",
        items: [
          "Ability to stand and walk for extended periods, including the entire shift.",
          "Ability to lift, carry, push, or pull up to 15–30 pounds (e.g., trays, bus tubs, glass racks).",
          "Frequent reaching, bending, stooping, and repetitive hand and arm motions.",
          "Ability to work in a noisy, fast-paced environment with exposure to sharp objects, broken glass, cleaning chemicals, and varying temperatures.",
        ],
      },
      {
        heading: "Reasonable Accommodations",
        items: [
          "The company will provide reasonable accommodations to qualified individuals with disabilities to perform the essential functions of this position, in accordance with applicable federal, state, and local laws.",
        ],
      },
      {
        heading: "Work Schedule",
        items: [
          "Part-time or full-time; typical shifts include days, evenings, weekends, and holidays.",
          "Schedule may vary based on business needs.",
        ],
      },
      {
        heading: "Compensation",
        items: [
          "Hourly, non-exempt position; eligible for overtime in accordance with applicable law.",
          "This is a tipped position; compensation includes base hourly wage plus tips, in accordance with applicable federal, state, and local wage and hour laws.",
        ],
      },
    ],
  },
  {
    title: "General Utility",
    department: "Back of House / Kitchen",
    reportsTo: "Supervisor / Sous Chef",
    type: "Full-Time / Part-Time",
    flsa: "NonExempt (Hourly)",
    description:
      "General Utility is responsible for maintaining the cleanliness and sanitation of all dishware, glassware, utensils, pots, pans, and kitchen equipment in accordance with company standards and applicable health and safety regulations. General Utility supports kitchen and dining operations by ensuring a steady supply of clean items, maintaining a clean and safe work environment, and assisting with preparing ingredients and basic menu components in accordance with standardized recipes, food safety requirements, and company quality standards.",
    sections: [
      {
        heading: "Essential Duties and Responsibilities",
        items: [
          "Operate commercial dishwashing machines to wash and sanitize dishes, glassware, flatware, pots, pans, and other kitchen items in accordance with health code and manufacturer instructions.",
          "Pre-rinse and scrape dishes and cookware before loading into the dishwashing machine.",
          "Hand-wash items that are not suitable for machine washing, as directed.",
          "Properly sort, stack, store, and transport clean dishware and kitchen equipment to appropriate stations.",
          "Maintain cleanliness and organization of the dishwashing area, including sinks, machines, floors, drains, racks, and trash/recycling receptacles.",
          "Handle and store cleaning chemicals safely in accordance with OSHA Hazard Communication Standard and company procedures.",
          "Follow all food safety and sanitation procedures, including proper use of personal protective equipment (PPE), handwashing, and avoiding cross-contamination, consistent with applicable state/local health codes and FDA Food Code (as adopted by your jurisdiction).",
          "Remove trash and recycling from the kitchen and dish area; replace liners and keep waste areas clean.",
          "Assist with basic kitchen cleaning tasks such as mopping, wiping surfaces, cleaning equipment exteriors, and cleaning walk-ins or storage areas, as directed.",
          "Assist with receiving, checking, and properly storing deliveries, including verifying quantities and condition of goods.",
          "Report any broken equipment, safety hazards, or maintenance needs to the supervisor promptly.",
          "Comply with all company policies and procedures, including safety, attendance, conduct, and harassment policies.",
          "Support kitchen staff as needed (for example, restocking, basic prep tasks within your training and food safety rules) at the direction of management.",
        ],
      },
      {
        heading: "Qualifications",
        items: [
          "Minimum age of 16 years to work in restaurant.",
          "High school diploma or equivalent preferred, but not legally required unless justified by business need.",
          "Previous dishwashing or kitchen experience preferred but not required.",
          "Ability to obtain and maintain required state food handler certification within 60 days of hire.",
        ],
      },
      {
        heading: "Knowledge and Skills",
        items: [
          "Ability to work in a fast-paced environment while maintaining quality and safety.",
          "Strong attention to detail, organization, and time management.",
          "Ability to read and follow recipes, prep lists, and verbal instructions.",
          "Ability to work effectively as part of a team and communicate professionally.",
        ],
      },
      {
        heading: "Physical Requirements",
        items: [
          "Ability to stand and walk for extended periods, including the entire shift.",
          "Frequent reaching, bending, stooping, pushing, and pulling.",
          "Ability to frequently lift, carry, push, or pull items up to 25–50 pounds; occasional heavier lifting may be required with assistance.",
          "Exposure to hot equipment and surfaces; moving mechanical parts; noise typical of a commercial kitchen; and cleaning chemicals and food allergens.",
          "Must be able to work in a high-heat environment and near other staff.",
        ],
      },
      {
        heading: "Reasonable Accommodations",
        items: [
          "The company will provide reasonable accommodations to qualified individuals with disabilities to perform the essential functions of this position, in accordance with applicable federal, state, and local laws.",
        ],
      },
      {
        heading: "Work Schedule",
        items: [
          "Part-time or full-time; typical shifts include early mornings, days, evenings, weekends, and holidays.",
          "Schedule may vary based on business needs.",
        ],
      },
      {
        heading: "Compensation",
        items: [
          "Hourly, non-exempt position, ranges from $17-$19/hour; eligible for overtime in accordance with applicable law.",
        ],
      },
    ],
  },
  {
    title: "Barista",
    department: "Front of House / Bar",
    reportsTo: "Supervisor / Assistant General Manager",
    type: "Full-Time / Part-Time",
    flsa: "NonExempt (Hourly)",
    description:
      "The Barista prepares and serves coffee, espresso-based drinks, teas, aguas frescas, and light food items while providing prompt, friendly, and professional customer service, pre-bussing tables, and completing sidework. The role includes operating point-of-sale systems, handling cash and electronic payments, maintaining a clean and safe work environment, and complying with all company policies and applicable health, safety, and labor regulations.",
    sections: [
      {
        heading: "Essential Duties and Responsibilities",
        items: [
          "Greet guests promptly and courteously; direct guests to menus and provide basic menu orientation.",
          "Perform opening, shift change, and closing sidework as assigned.",
          "Prepare and serve coffee and nonalcoholic beverages consistent with company recipes and presentation standards.",
          "Maintain cleanliness and organization of the bar area, including counters, equipment, utensils, and glassware, in compliance with health and sanitation standards.",
          "Stock, rotate, and replenish bar inventory (coffees, teas, aguas frescas, glassware, ice, and supplies) as needed, and communicate low-stock or out-of-stock items to management.",
          "Work collaboratively with servers, hosts, and kitchen staff to ensure timely service and a positive guest experience.",
          "Operate point-of-sale (POS) system; accurately enter orders, process payments, and handle cash and credit card transactions in accordance with company cash-handling procedures.",
          "Follow all safety procedures and guidelines, including proper handling of glassware, cleaning chemicals, and equipment.",
          "Adhere to all company policies regarding attendance, appearance, conduct, and harassment-free workplace standards.",
          "Perform other job-related duties as assigned.",
        ],
      },
      {
        heading: "Qualifications",
        items: [
          "Minimum age of 16 years to work in restaurant.",
          "High school diploma or equivalent preferred.",
          "One or more years prior barista or hospitality experience required.",
          "Ability to obtain and maintain required state food handler certification within 60 days of hire.",
          "Language: Ability to read, speak, and understand English sufficiently to understand menus, POS system instructions, safety rules, and to communicate with guests and staff.",
        ],
      },
      {
        heading: "Knowledge and Skills",
        items: [
          "Strong customer service and interpersonal skills.",
          "Ability to multi-task and work in a fast-paced environment.",
          "Ability to work as part of a team and to maintain a professional demeanor under pressure.",
        ],
      },
      {
        heading: "Physical Requirements",
        items: [
          "Ability to stand and walk for extended periods, including the entire shift.",
          "Ability to lift, carry, push, or pull up to 15–30 pounds (e.g., cases of product, containers of ice).",
          "Frequent reaching, bending, stooping, and repetitive hand and arm motions.",
          "Ability to work in a noisy, fast-paced environment with exposure to sharp objects, broken glass, cleaning chemicals, and varying temperatures.",
        ],
      },
      {
        heading: "Reasonable Accommodations",
        items: [
          "The company will provide reasonable accommodations to qualified individuals with disabilities to perform the essential functions of this position, in accordance with applicable federal, state, and local laws.",
        ],
      },
      {
        heading: "Work Schedule",
        items: [
          "Part-time or full-time; typical shifts include early mornings, days, weekends, and holidays.",
          "Schedule may vary based on business needs.",
        ],
      },
      {
        heading: "Compensation",
        items: [
          "Non-exempt, hourly position, ranges from $15-$17/hour; eligible for overtime in accordance with applicable law.",
        ],
      },
    ],
  },
] as const;

const THRIVE_HERE = [
  "You believe hospitality is more than just a job",
  "You enjoy serving others",
  "You value discipline and accountability",
  "You want to be part of building something from the ground up",
  "You are growth-minded and coachable",
  "You believe attitude and effort are a choice",
  "You take pride in your work",
];

const THRIVE_ELSEWHERE = [
  "You are uncomfortable with change",
  "You are uncomfortable with feedback",
  "You are uncomfortable in a fast-paced environment",
  "You make excuses",
  "You work best on your own",
];

const TIMELINE = [
  { label: "Applications Open", date: "Monday, June 29th @ 10am" },
  { label: "Orientation Date", date: "Wednesday, October 7th" },
];

export default function CareersPage() {
  const revealRefs = useRef<HTMLElement[]>([]);
  const [openJob, setOpenJob] = useState<string | null>(null);

  const addRevealRef = useCallback((el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  }, []);

  /* ScrollReveal via IntersectionObserver */
  useEffect(() => {
    const elements = revealRefs.current;
    if (!elements.length) return;

    const reveal = (el: Element) => el.classList.add("careers-visible");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal(entry.target);
            observer.unobserve(entry.target);
          }
        }
      },
      // threshold 0 so tall sections reveal as soon as any edge enters the
      // viewport. threshold 0.15 could never be met when a section is taller
      // than ~6.6x the viewport (common for the job list on small phones),
      // leaving the cards stuck at opacity 0.
      { threshold: 0, rootMargin: "0px 0px -10% 0px" }
    );

    for (const el of elements) observer.observe(el);

    // Safety net: if the observer never fires (JS quirks, unsupported
    // browsers), reveal everything after a short delay so content can never
    // get permanently stuck hidden.
    const fallback = setTimeout(() => {
      for (const el of elements) reveal(el);
    }, 3000);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  return (
    <main id="main-content">
        {/* ── Hero (dark) ── */}
        <div style={{ background: "#221A0E" }}>
          <section className="careers-hero relative flex items-center justify-center overflow-hidden" style={{ height: "40vh", paddingTop: "56px" }}>
            {/* Atmospheric gradient */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_30%_50%,_rgba(77,24,7,0.18)_0%,_transparent_70%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_70%_30%,_rgba(124,101,51,0.12)_0%,_transparent_70%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_50%_80%,_rgba(244,212,124,0.08)_0%,_transparent_70%)]" />
            </div>

            <div className="relative z-10 flex flex-col items-center text-center px-6">
              <p
                className="font-mono text-[11px] tracking-[4px] uppercase mb-5"
                style={{ color: "#F4D47C" }}
              >
                Careers
              </p>
              <h1
                className="font-body text-[clamp(32px,5vw,48px)] font-light italic leading-[1.3]"
                style={{ color: "#FCE9C7" }}
              >
                Grow With Us
              </h1>
            </div>
          </section>
        </div>

        {/* ── Content (white) ── */}
        <div style={{ background: "#FFFFFF" }}>
          {/* ── Culture Section ── */}
          <section ref={addRevealRef} className="careers-reveal px-6 py-20">
            <div className="mx-auto max-w-[900px]">
              <p className="font-body text-[16px] font-normal leading-[1.8]" style={{ color: "#2A2418" }}>
                La Victoria is an elevated Mexican restaurant where authenticity and modern technique meet in perfect balance. At La Victoria, you&apos;ll find heritage lives on the plate, innovation drives the kitchen, and precision defines every interaction on the floor. Our goal is simple: to be your favorite restaurant. Yours, your neighbor&apos;s, your grandma&apos;s, and your high school math teacher&apos;s. As our name suggests, we intend to be victorious in this pursuit.
              </p>

              <p className="font-body text-[16px] font-normal leading-[1.8] mt-8" style={{ color: "#2A2418" }}>
                However, the journey is just as important to us as the destination. La Victoria doesn&apos;t want, but requires individuals who:
              </p>

              <ul className="mt-6 space-y-3 pl-0">
                {[
                  "Live their lives in a constant spirit of hospitality, because true hospitality begins from within",
                  "Believe every guest deserves our best and appreciate the value of selfless service",
                  "Understand discipline is the first rung on the ladder of success, and that the second rung is standards",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 font-body text-[16px] font-normal leading-[1.8]" style={{ color: "#2A2418" }}>
                    <span className="mt-[10px] block h-[6px] w-[6px] shrink-0 rounded-full" style={{ background: "#4D1807" }} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>

              <p className="font-body text-[16px] font-normal leading-[1.8] mt-8" style={{ color: "#2A2418" }}>
                Culture is at the core of everything we do. We believe it&apos;s crucial to our success in better serving others so they can better change the world. We want to be upfront about the kind of team we&apos;re building at La Victoria, so here&apos;s a bit of what we expect from you as an applicant, and what you can expect from us to hold you accountable as an associate:
              </p>
            </div>
          </section>

          {/* ── Two Column Section ── */}
          <section ref={addRevealRef} className="careers-reveal px-6 pt-4 pb-10">
            <div className="mx-auto max-w-[900px] grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Left: Thrive here */}
              <div>
                <h2 className="font-body text-[18px] font-medium mb-5" style={{ color: "#4D1807" }}>
                  You will thrive here if:
                </h2>
                {THRIVE_HERE.map((item) => (
                  <p key={item} className="font-body text-[15px] font-normal py-2" style={{ color: "#2A2418" }}>
                    {item}
                  </p>
                ))}
              </div>

              {/* Right: Thrive elsewhere */}
              <div>
                <h2 className="font-body text-[18px] font-medium mb-5" style={{ color: "rgba(42, 36, 24, 0.45)" }}>
                  You might thrive better elsewhere if:
                </h2>
                {THRIVE_ELSEWHERE.map((item) => (
                  <p key={item} className="font-body text-[15px] font-normal py-2" style={{ color: "rgba(42, 36, 24, 0.45)" }}>
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </section>

          {/* ── Job Listings ── */}
          <section ref={addRevealRef} className="careers-reveal px-6 py-20">
            <div className="mx-auto max-w-[900px] flex flex-col gap-4">
              {JOB_LISTINGS.map((job) => {
                const isOpen = openJob === job.title;
                const isClosed = isClosedPosition(job.title);
                const panelId = `job-panel-${job.title.replace(/\s+/g, "-").toLowerCase()}`;
                return (
                <article
                  key={job.title}
                  className="rounded-[4px] p-8"
                  style={{
                    background: isClosed ? "#F4F1EB" : "#F9F6F0",
                    border: "1px solid rgba(124, 101, 51, 0.12)",
                  }}
                >
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    {isClosed ? (
                      <h2
                        className="font-body text-[20px] font-medium"
                        style={{ color: "rgba(77, 24, 7, 0.55)" }}
                      >
                        {job.title}
                      </h2>
                    ) : (
                      <a
                        href={`${APPLY_HREF}?position=${encodeURIComponent(job.title)}`}
                        className="group/title relative inline-block font-body text-[20px] font-medium transition-colors duration-300"
                        style={{ color: "#4D1807" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "#6B2410")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "#4D1807")}
                      >
                        {job.title}
                        <span
                          className="absolute left-0 bottom-0 h-px w-full origin-left scale-x-0 transition-transform duration-300 group-hover/title:scale-x-100"
                          style={{ background: "#4D1807" }}
                          aria-hidden="true"
                        />
                      </a>
                    )}

                    {isClosed && (
                      <span
                        className="font-mono text-[10px] uppercase tracking-[1.5px]"
                        style={{
                          color: "#7C6533",
                          border: "1px solid rgba(124, 101, 51, 0.35)",
                          borderRadius: "2px",
                          padding: "5px 10px",
                        }}
                      >
                        Applications Closed
                      </span>
                    )}
                  </div>

                  <div className="mt-3 flex flex-col gap-1.5">
                    {[
                      { label: "Department", value: job.department },
                      { label: "Reports To", value: job.reportsTo },
                      { label: "Employment", value: job.type },
                      { label: "FLSA", value: job.flsa },
                    ].map((tag) => (
                      <p
                        key={tag.label}
                        className="font-body text-[12px] font-normal"
                        style={{ color: "#7C6533" }}
                      >
                        <span className="font-medium" style={{ color: "#504328" }}>{tag.label}:</span>{" "}
                        {tag.value}
                      </p>
                    ))}
                  </div>

                  <p
                    className="font-body text-[14px] font-normal leading-[1.6] mt-4"
                    style={{ color: "#504328" }}
                  >
                    {job.description}
                  </p>

                  <button
                    type="button"
                    onClick={() => setOpenJob(isOpen ? null : job.title)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="group mt-5 flex items-center gap-2 font-mono text-[11px] tracking-[2px] uppercase transition-colors duration-300 hover:text-[#6B2410]"
                    style={{ color: "#4D1807" }}
                  >
                    {isOpen ? "Hide Details" : "View Details"}
                    <ChevronDown
                      size={14}
                      strokeWidth={2}
                      className="transition-transform duration-300"
                      style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                      aria-hidden="true"
                    />
                  </button>

                  {/* Expandable full description panel */}
                  <div
                    id={panelId}
                    className="grid transition-[grid-template-rows] duration-300 ease-out"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <div className="mt-6">
                        {job.sections.map((section, si) => (
                          <div key={section.heading}>
                            <p
                              className="font-mono text-[10px] uppercase tracking-[1.5px]"
                              style={{
                                color: "#7C6533",
                                marginTop: si === 0 ? 0 : "24px",
                                marginBottom: "12px",
                              }}
                            >
                              {section.heading}
                            </p>
                            <ul className="flex flex-col gap-2 pl-0">
                              {section.items.map((item) => (
                                <li
                                  key={item}
                                  className="flex items-start gap-3 font-body text-[14px] font-normal leading-[1.6]"
                                  style={{ color: "#504328" }}
                                >
                                  <span
                                    className="mt-[9px] block h-[5px] w-[5px] shrink-0 rounded-full"
                                    style={{ background: "#4D1807" }}
                                    aria-hidden="true"
                                  />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}

                        {isClosed ? (
                          <p
                            className="font-body text-[13px] font-normal leading-[1.6] mt-8"
                            style={{ color: "#7C6533" }}
                          >
                            This position is no longer accepting applications.
                            Thank you to everyone who applied.
                          </p>
                        ) : (
                          <a
                            href={`${APPLY_HREF}?position=${encodeURIComponent(job.title)}`}
                            className="inline-block font-mono text-[11px] uppercase tracking-[2px] mt-8 transition-[filter] duration-300 hover:brightness-110"
                            style={{
                              background: "#4D1807",
                              color: "#FCE9C7",
                              padding: "12px 32px",
                              borderRadius: "2px",
                            }}
                          >
                            Apply Now
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
                );
              })}
            </div>
          </section>

          {/* ── Hiring Timeline ── */}
          <section ref={addRevealRef} className="careers-reveal px-6 py-15">
            <div className="mx-auto max-w-[900px]">
              <h2 className="font-body text-[24px] font-medium mb-8" style={{ color: "#1E1A12" }}>
                Hiring Timeline
              </h2>
              {TIMELINE.map((item, i) => (
                <div
                  key={item.label}
                  className="flex items-start justify-between gap-6 py-3"
                  style={{
                    borderBottom:
                      i < TIMELINE.length - 1
                        ? "1px solid rgba(124, 101, 51, 0.12)"
                        : "none",
                  }}
                >
                  <span className="min-w-0 flex-[2] font-body text-[15px] font-normal" style={{ color: "#7C6533" }}>
                    {item.label}
                  </span>
                  <span className="min-w-0 flex-[3] text-right font-body text-[15px] font-medium" style={{ color: "#1E1A12" }}>
                    {item.date}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* ── Next Steps ── */}
          <section ref={addRevealRef} className="careers-reveal px-6 pt-10 pb-20">
            <div className="mx-auto max-w-[900px]">
              <h2 className="font-body text-[24px] font-medium mb-4" style={{ color: "#1E1A12" }}>
                Next Steps
              </h2>
              <p className="font-body text-[15px] font-normal leading-[1.6]" style={{ color: "#504328" }}>
                If your application is selected, we will email you to set up a date and time for an interview.
              </p>
            </div>
          </section>
        </div>

        {/* ── Footer (dark) ── */}
        <footer className="flex flex-col items-center text-center px-6 pt-15 pb-10" style={{ background: "#221A0E" }}>
          {/* Separator */}
          <div
            className="w-full max-w-[200px] mb-20"
            style={{ height: "1px", background: "rgba(124, 101, 51, 0.15)" }}
            aria-hidden="true"
          />

          {/* Icon */}
          <Image
            src="/assets/La-Victoria-icon-beige.webp"
            alt="La Victoria icon"
            width={40}
            height={40}
            className="mb-6"
          />

          {/* Social links */}
          <a
            href="https://www.instagram.com/lavictoriatampa/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] tracking-[2px] uppercase transition-opacity duration-300 hover:opacity-70"
            style={{ color: "#F4D47C" }}
            aria-label="Follow La Victoria on Instagram"
          >
            Instagram
          </a>

          {/* Address */}
          <p
            className="font-body text-[13px] font-normal mt-4"
            style={{ color: "rgba(252, 233, 199, 0.6)" }}
          >
            105 W Tyler Street, Tampa, FL 33602
          </p>

          {/* Email */}
          <a
            href="mailto:operations@lavictoriatampa.com"
            className="font-body text-[13px] font-normal mt-1 transition-opacity duration-300 hover:opacity-80"
            style={{ color: "rgba(252, 233, 199, 0.6)" }}
          >
            operations@lavictoriatampa.com
          </a>

          {/* Copyright */}
          <p
            className="font-body text-[13px] font-normal mt-6"
            style={{ color: "rgba(252, 233, 199, 0.4)" }}
          >
            &copy; 2026 La Victoria
          </p>

          {/* Credit */}
          <p
            className="font-body text-[10px] font-normal mt-5"
            style={{ color: "rgba(252, 233, 199, 0.3)" }}
          >
            Site by{" "}
            <a
              href="https://thedigitalwash.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-300 hover:text-[rgba(252,233,199,0.6)]"
              style={{ color: "inherit" }}
            >
              The Digital Wash
            </a>
          </p>
        </footer>

        <style jsx>{`
          /* ── ScrollReveal ── */
          .careers-reveal {
            opacity: 0;
            transform: translateY(40px);
            transition: opacity 800ms cubic-bezier(0, 0, 0.25, 1),
                        transform 800ms cubic-bezier(0, 0, 0.25, 1);
          }

          .careers-visible {
            opacity: 1;
            transform: translateY(0);
          }
        `}</style>
    </main>
  );
}
