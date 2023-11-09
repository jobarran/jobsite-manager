import bcrypt from 'bcryptjs'

interface SeedProject {
    name: string;
    idProject: string;
    status: string
}

interface SeedUser {
    name     : string;
    lastName : string;
    idUser   : string;
    email    : string;
    password : string;
    role     : 'admin'|'user';
    possition: string;
    project? : string[];
}

interface SeedEmployee {
    name       : string; 
    lastName   : string;
    idNumber   : string;
    state      : string; 
    project    : string; 
    phone?     : string; 
    address?    : string; 
    birth?     : string; 
    entry      : string;
    tags       : string[];
    description: string
}


interface SeedData {
    users: SeedUser[],
    projects: SeedProject[],
    employees: SeedEmployee[],
}

export const initialData: SeedData = {
    users: [
        {
            name: 'Joaquin',
            lastName: 'Barrandeguy',
            idUser: '001',
            email: 'jbarrandeguy@gmail.com',
            password: bcrypt.hashSync('123456'),
            role: 'admin',
            possition: 'owner',
            project: []
        },
        {
          name: "John",
          lastName: "Doe",
          idUser: "173",
          email: "johndoe@gmail.com",
          password: "hashed_password_for_123456",
          role: "user",
          possition: "Project Leader",
          project: ["PR01", "PR03", "PR04", "PR05", "PR06", "PR08"]
        },
        {
          name: "Alice",
          lastName: "Smith",
          idUser: "456",
          email: "alicesmith@gmail.com",
          password: "hashed_password_for_123456",
          role: "user",
          possition: "Project Leader",
          project: ["PR02", "PR04", "PR05", "PR07", "PR09", "PR12"]
        },
        {
          name: "Bob",
          lastName: "Johnson",
          idUser: "789",
          email: "bobjohnson@gmail.com",
          password: "hashed_password_for_123456",
          role: "user",
          possition: "Project Leader",
          project: ["PR01", "PR03", "PR06", "PR08", "PR11", "PR15"]
        },
        {
          name: "Emma",
          lastName: "Williams",
          idUser: "234",
          email: "emmawilliams@gmail.com",
          password: "hashed_password_for_123456",
          role: "user",
          possition: "Safety",
          project: ["PR02", "PR04", "PR05", "PR07", "PR09", "PR13"]
        },
        {
          name: "Michael",
          lastName: "Brown",
          idUser: "567",
          email: "michaelbrown@gmail.com",
          password: "hashed_password_for_123456",
          role: "user",
          possition: "Project Leader",
          project: ["PR01", "PR03", "PR04", "PR06", "PR08", "PR12"]
        },
        {
          name: "Sarah",
          lastName: "Wilson",
          idUser: "890",
          email: "sarahwilson@gmail.com",
          password: "hashed_password_for_123456",
          role: "user",
          possition: "Safety",
          project: ["PR02", "PR04", "PR05", "PR07", "PR09", "PR13"]
        },
        {
          name: "David",
          lastName: "Davis",
          idUser: "123",
          email: "daviddavis@gmail.com",
          password: "hashed_password_for_123456",
          role: "user",
          possition: "Project Leader",
          project: ["PR01", "PR03", "PR06", "PR08", "PR11", "PR15"]
        },
        {
          name: "Olivia",
          lastName: "Taylor",
          idUser: "406",
          email: "oliviataylor@gmail.com",
          password: "hashed_password_for_123456",
          role: "user",
          possition: "Safety",
          project: ["PR02", "PR04", "PR05", "PR07", "PR09", "PR13"]
        },
        {
          name: "James",
          lastName: "Jones",
          idUser: "709",
          email: "jamesjones@gmail.com",
          password: "hashed_password_for_123456",
          role: "user",
          possition: "Project Leader",
          project: ["PR01", "PR03", "PR06", "PR08", "PR11", "PR15"]
        },
        {
          name: "Sophia",
          lastName: "Moore",
          idUser: "294",
          email: "sophiamoore@gmail.com",
          password: "hashed_password_for_123456",
          role: "user",
          possition: "Safety",
          project: ["PR02", "PR04", "PR05", "PR07", "PR09", "PR13"]
        }
    ],
    projects: [
        {
            name: 'Project 01',
            idProject: 'PR01',
            status: "upcoming",
        },
        {
            name: 'Project 02',
            idProject: 'PR02',
            status: "upcoming",
        },
        {
            name: 'Project 03',
            idProject: 'PR03',
            status: "ongoing",
        },
        {
            name: 'Project 04',
            idProject: 'PR04',
            status: "ongoing",
        },
        {
            name: 'Project 05',
            idProject: 'PR05',
            status: "ongoing",
        },
        {
            name: 'Project 06',
            idProject: 'PR06',
            status: "ongoing",
        },
        {
            name: 'Project 07',
            idProject: 'PR07',
            status: "ongoing",
        },
        {
            name: 'Project 08',
            idProject: 'PR08',
            status: "ongoing",
        },
        {
            name: 'Project 09',
            idProject: 'PR09',
            status: "finished",
        },
        {
            name: 'Project 10',
            idProject: 'PR10',
            status: "finished",
        },
        {
            name: 'Project 11',
            idProject: 'PR11',
            status: "ongoing",
        },
        {
            name: 'Project 12',
            idProject: 'PR12',
            status: "ongoing",
        },
        {
            name: 'Project 13',
            idProject: 'PR13',
            status: "ongoing",
        },
        {
            name: 'Project 14',
            idProject: 'PR14',
            status: "ongoing",
        },
        {
            name: 'Project 15',
            idProject: 'PR15',
            status: "finished",
        },
        {
            name: 'Project 16',
            idProject: 'PR16',
            status: "finished",
        },
    ],
    employees: [
        {
            name: "John",
            lastName: "Doe",
            idNumber: "12345",
            state: "active",
            project: "PR01",
            phone: "555-123-4567",
            address: "123 Main St, Apt 101",
            birth: "1985-03-15",
            entry: "2020-05-10",
            tags: ["Carpenter", "Plumber", "Painter"],
            description: "Skilled in carpentry, plumbing, and painting"
          },
          {
            name: "Jane",
            lastName: "Smith",
            idNumber: "67890",
            state: "active",
            project: "PR02",
            phone: "555-987-6543",
            address: "456 Elm St, Suite 201",
            birth: "1990-07-20",
            entry: "2019-11-25",
            tags: ["Welder", "Electrician", "Construction Designer"],
            description: "Expert welder, electrician, and construction designer"
          },
          {
            name: "Michael",
            lastName: "Johnson",
            idNumber: "54321",
            state: "active",
            project: "PR03",
            phone: "555-555-5555",
            birth: "1978-09-02",
            entry: "2018-02-15",
            tags: ["Construction Manager", "Roofing Specialist", "Project Manager"],
            description: "Experienced construction manager and roofing specialist"
          },
          {
            name: "Emily",
            lastName: "Davis",
            idNumber: "98765",
            state: "active",
            project: "PR04",
            phone: "555-456-7890",
            address: "789 Oak Rd, Unit 301",
            birth: "1983-04-30",
            entry: "2022-07-05",
            tags: ["Plumber", "Electrician", "HVAC Technician"],
            description: "Skilled plumber, electrician, and HVAC technician"
          },
          {
            name: "William",
            lastName: "Brown",
            idNumber: "13579",
            state: "active",
            project: "PR05",
            phone: "555-987-1234",
            birth: "1995-01-12",
            entry: "2021-04-18",
            tags: ["Painter", "Tiler", "Construction Designer"],
            description: "Talented painter, tiler, and construction designer"
          },
          {
            name: "Linda",
            lastName: "Wilson",
            idNumber: "24680",
            state: "active",
            project: "PR06",
            phone: "555-333-4444",
            address: "567 Pine Ave, Suite 102",
            birth: "1992-12-05",
            entry: "2017-09-30",
            tags: ["Construction Supervisor", "Mason", "Carpenter"],
            description: "Experienced construction supervisor, mason, and carpenter"
          },
          {
            name: "Christopher",
            lastName: "Martinez",
            idNumber: "87654",
            state: "active",
            project: "PR07",
            phone: "555-888-1111",
            address: "321 Cedar Ln, Apt 401",
            birth: "1986-08-17",
            entry: "2019-03-12",
            tags: ["Welder", "Plumber", "Construction Technician"],
            description: "Skilled welder, plumber, and construction technician"
          },
          {
            name: "Susan",
            lastName: "Taylor",
            idNumber: "65432",
            state: "active",
            project: "PR08",
            phone: "555-222-3333",
            birth: "1991-05-22",
            entry: "2020-10-08",
            tags: ["Electrician", "Painter", "Construction Designer"],
            description: "Expert electrician, painter, and construction designer"
          },
          {
            name: "David",
            lastName: "Harris",
            idNumber: "23456",
            state: "active",
            project: "PR09",
            phone: "555-666-7777",
            address: "456 Birch St, Unit 501",
            birth: "1979-11-28",
            entry: "2018-06-20",
            tags: ["Plumber", "Carpenter", "Construction Planner"],
            description: "Skilled plumber, carpenter, and construction planner"
          },
          {
            name: "Karen",
            lastName: "Lewis",
            idNumber: "76543",
            state: "active",
            project: "PR10",
            phone: "555-555-1234",
            birth: "1980-02-14",
            entry: "2021-09-14",
            tags: ["Welder", "Painter", "Construction Estimator"],
            description: "Talented welder, painter, and construction estimator"
          },
          {
            name: "Thomas",
            lastName: "Anderson",
            idNumber: "98713",
            state: "active",
            project: "PR11",
            phone: "555-444-9999",
            address: "789 Oak St, Suite 501",
            birth: "1982-06-10",
            entry: "2019-08-07",
            tags: ["Roofing Specialist", "Carpenter", "Construction Manager"],
            description: "Experienced roofing specialist, carpenter, and construction manager"
          },
          {
            name: "Megan",
            lastName: "White",
            idNumber: "98714",
            state: "active",
            project: "PR12",
            phone: "555-333-7777",
            birth: "1993-03-25",
            entry: "2020-12-30",
            tags: ["Electrician", "Mason", "Construction Designer"],
            description: "Skilled electrician, mason, and construction designer"
          },
          {
            name: "Kevin",
            lastName: "Hill",
            idNumber: "98715",
            state: "active",
            project: "PR13",
            phone: "555-555-7777",
            address: "123 Elm Rd, Apt 301",
            birth: "1987-04-18",
            entry: "2018-03-20",
            tags: ["Welder", "Tiler", "Construction Planner"],
            description: "Skilled welder, tiler, and construction planner"
          },
          {
            name: "Jennifer",
            lastName: "Garcia",
            idNumber: "98716",
            state: "active",
            project: "PR14",
            phone: "555-222-1111",
            birth: "1994-11-05",
            entry: "2017-05-25",
            tags: ["Carpenter", "Painter", "HVAC Technician"],
            description: "Experienced carpenter, painter, and HVAC technician"
          },
          {
            name: "Daniel",
            lastName: "Turner",
            idNumber: "98717",
            state: "active",
            project: "PR15",
            phone: "555-888-1234",
            address: "456 Cedar St, Suite 401",
            birth: "1989-02-20",
            entry: "2016-10-15",
            tags: ["Construction Supervisor", "Plumber", "Construction Estimator"],
            description: "Experienced construction supervisor, plumber, and construction estimator"
          },
          {
            name: "Maria",
            lastName: "Mitchell",
            idNumber: "98718",
            state: "active",
            project: "PR16",
            phone: "555-777-5555",
            birth: "1984-07-12",
            entry: "2022-02-05",
            tags: ["Electrician", "Mason", "Roofing Specialist"],
            description: "Expert electrician, mason, and roofing specialist"
          },
          {
            name: "Sophia",
            lastName: "Morales",
            idNumber: "98726",
            state: "active",
            project: "PR01",
            phone: "555-333-8888",
            address: "789 Cedar Rd, Apt 301",
            birth: "1995-06-15",
            entry: "2022-11-30",
            tags: ["Tiler", "Electrician", "Construction Planner"],
            description: "Expert tiler, electrician, and construction planner"
          },
          {
            name: "James",
            lastName: "Parker",
            idNumber: "98727",
            state: "active",
            project: "PR02",
            phone: "555-666-8888",
            address: "456 Elm St, Apt 201",
            birth: "1983-09-20",
            entry: "2021-06-25",
            tags: ["Welder", "Carpenter", "Construction Manager"],
            description: "Skilled welder, carpenter, and construction manager"
          },
          {
            name: "Olivia",
            lastName: "Gomez",
            idNumber: "98728",
            state: "active",
            project: "PR03",
            phone: "555-555-9999",
            address: "123 Birch Rd, Suite 101",
            birth: "1980-12-10",
            entry: "2020-04-15",
            tags: ["Painter", "Mason", "Construction Supervisor"],
            description: "Experienced painter, mason, and construction supervisor"
          },
          {
            name: "Benjamin",
            lastName: "Torres",
            idNumber: "98729",
            state: "active",
            project: "PR04",
            phone: "555-444-9999",
            address: "567 Pine St, Unit 501",
            birth: "1986-08-12",
            entry: "2019-10-30",
            tags: ["Construction Designer", "HVAC Technician", "Roofing Specialist"],
            description: "Skilled construction designer, HVAC technician, and roofing specialist"
          },
          {
            name: "Amelia",
            lastName: "Flores",
            idNumber: "98730",
            state: "active",
            project: "PR05",
            phone: "555-333-5555",
            address: "321 Oak Rd, Suite 201",
            birth: "1982-03-15",
            entry: "2018-05-20",
            tags: ["Plumber", "Carpenter", "Construction Planner"],
            description: "Experienced plumber, carpenter, and construction planner"
          },
          {
            name: "William",
            lastName: "Hernandez",
            idNumber: "98731",
            state: "active",
            project: "PR06",
            phone: "555-222-7777",
            address: "456 Cedar St, Apt 101",
            birth: "1991-11-05",
            entry: "2017-09-25",
            tags: ["Electrician", "Mason", "Construction Estimator"],
            description: "Expert electrician, mason, and construction estimator"
          },
          {
            name: "Mia",
            lastName: "King",
            idNumber: "98732",
            state: "active",
            project: "PR07",
            phone: "555-111-8888",
            address: "789 Pine Rd, Suite 301",
            birth: "1989-05-30",
            entry: "2016-07-10",
            tags: ["Carpenter", "Painter", "HVAC Technician"],
            description: "Skilled carpenter, painter, and HVAC technician"
          },
          {
            name: "Ethan",
            lastName: "Lopez",
            idNumber: "98733",
            state: "active",
            project: "PR08",
            phone: "555-555-3333",
            address: "456 Elm Ave, Apt 501",
            birth: "1987-02-25",
            entry: "2015-12-30",
            tags: ["Construction Manager", "Roofing Specialist", "Project Manager"],
            description: "Experienced construction manager, roofing specialist, and project manager"
          },
          {
            name: "Liam",
            lastName: "Perez",
            idNumber: "98734",
            state: "active",
            project: "PR09",
            phone: "555-444-7777",
            address: "123 Oak St, Suite 401",
            birth: "1984-06-20",
            entry: "2014-08-10",
            tags: ["Plumber", "Construction Supervisor", "Construction Designer"],
            description: "Skilled plumber, construction supervisor, and construction designer"
          },
      ]   
}