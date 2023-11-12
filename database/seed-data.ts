import bcrypt from 'bcryptjs'

interface SeedCompanySettings {
  employeeFields: string[],
  employeeRoles : string[];
  userPossitions: string[];
}

interface SeedCompany {
  idCompany : string;
  name      : string;
  createdBy : string;
  settings  : SeedCompanySettings;
}

interface SeedProject {
    idCompany: string;
    name     : string;
    idProject: string;
    status   : string
}

interface SeedUser {
    idCompany: string;
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
    idCompany  : string;
    name       : string; 
    lastName   : string;
    idNumber   : string;
    status     : string; 
    project    : string; 
    phone?     : string; 
    address?   : string; 
    birth?     : string; 
    entry      : string;
    field      : string[];
    role       : string;
    description: string
}


interface SeedData {
    users: SeedUser[],
    projects: SeedProject[],
    employees: SeedEmployee[],
    company: SeedCompany[],
}

export const initialData: SeedData = {
    company: [
      {
        idCompany: 'jbarrandeguy@gmail.com-company-name-inc',
        name: 'company-name-inc',
        createdBy: 'jbarrandeguy@gmail.com',
        settings: {
          employeeFields: ['carpenter', 'welder', 'electrician', 'painter', 'plumber', 'supervisor', 'mason', 'tiler'  ],
          employeeRoles: ['foreman', 'craftsman', 'journeyman', 'laborer' ],
          userPossitions: ['Project Leader', 'Project Manager', 'Safety']
        }
      }
    ],

    users: [
        {
            idCompany: 'jbarrandeguy@gmail.com-company-name-inc',
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
          idCompany: 'jbarrandeguy@gmail.com-company-name-inc',
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
          idCompany: 'jbarrandeguy@gmail.com-company-name-inc',
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
          idCompany: 'jbarrandeguy@gmail.com-company-name-inc',
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
          idCompany: 'jbarrandeguy@gmail.com-company-name-inc',
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
          idCompany: 'jbarrandeguy@gmail.com-company-name-inc',
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
          idCompany: 'jbarrandeguy@gmail.com-company-name-inc',
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
          idCompany: 'jbarrandeguy@gmail.com-company-name-inc',
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
          idCompany: 'jbarrandeguy@gmail.com-company-name-inc',
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
          idCompany: 'jbarrandeguy@gmail.com-company-name-inc',
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
          idCompany: 'jbarrandeguy@gmail.com-company-name-inc',
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
            idCompany: 'jbarrandeguy@gmail.com-company-name-inc',
            name: 'Project 01',
            idProject: 'PR01',
            status: "upcoming",
        },
        {
            idCompany: 'jbarrandeguy@gmail.com-company-name-inc',
            name: 'Project 02',
            idProject: 'PR02',
            status: "upcoming",
        },
        {
            idCompany: 'jbarrandeguy@gmail.com-company-name-inc',
            name: 'Project 03',
            idProject: 'PR03',
            status: "ongoing",
        },
        {
            idCompany: 'jbarrandeguy@gmail.com-company-name-inc',
            name: 'Project 04',
            idProject: 'PR04',
            status: "ongoing",
        },
        {
            idCompany: 'jbarrandeguy@gmail.com-company-name-inc',
            name: 'Project 05',
            idProject: 'PR05',
            status: "ongoing",
        },
        {
            idCompany: 'jbarrandeguy@gmail.com-company-name-inc',
            name: 'Project 06',
            idProject: 'PR06',
            status: "ongoing",
        },
        {
            idCompany: 'jbarrandeguy@gmail.com-company-name-inc',
            name: 'Project 07',
            idProject: 'PR07',
            status: "ongoing",
        },
        {
            idCompany: 'jbarrandeguy@gmail.com-company-name-inc',
            name: 'Project 08',
            idProject: 'PR08',
            status: "ongoing",
        },
        {
            idCompany: 'jbarrandeguy@gmail.com-company-name-inc',
            name: 'Project 09',
            idProject: 'PR09',
            status: "finished",
        },
        {
            idCompany: 'jbarrandeguy@gmail.com-company-name-inc',
            name: 'Project 10',
            idProject: 'PR10',
            status: "finished",
        },
        {
            idCompany: 'jbarrandeguy@gmail.com-company-name-inc',
            name: 'Project 11',
            idProject: 'PR11',
            status: "ongoing",
        },
        {
            idCompany: 'jbarrandeguy@gmail.com-company-name-inc',
            name: 'Project 12',
            idProject: 'PR12',
            status: "ongoing",
        },
        {
            idCompany: 'jbarrandeguy@gmail.com-company-name-inc',
            name: 'Project 13',
            idProject: 'PR13',
            status: "ongoing",
        },
        {
            idCompany: 'jbarrandeguy@gmail.com-company-name-inc',
            name: 'Project 14',
            idProject: 'PR14',
            status: "ongoing",
        },
        {
            idCompany: 'jbarrandeguy@gmail.com-company-name-inc',
            name: 'Project 15',
            idProject: 'PR15',
            status: "finished",
        },
        {
            idCompany: 'jbarrandeguy@gmail.com-company-name-inc',
            name: 'Project 16',
            idProject: 'PR16',
            status: "finished",
        },
    ],
    employees: [
        {
          idCompany: 'jbarrandeguy@gmail.com-company-name-inc',
            name: "John",
            lastName: "Doe",
            idNumber: "12345",
            status: "active",
            project: "PR01",
            phone: "555-123-4567",
            address: "123 Main St, Apt 101",
            birth: "1985-03-15",
            entry: "2020-05-10",
            field: ["Carpenter"],
            role: "craftsman",
            description: "Skilled in carpentry"
          },
          {
            idCompany: 'jbarrandeguy@gmail.com-company-name-inc',
            name: "Jane",
            lastName: "Smith",
            idNumber: "67890",
            status: "active",
            project: "PR02",
            phone: "555-987-6543",
            address: "456 Elm St, Suite 201",
            birth: "1990-07-20",
            entry: "2019-11-25",
            field: ["Welder", "Electrician"],
            role: "craftsman",
            description: "Expert welder, electrician"
          },
          {
            idCompany: 'jbarrandeguy@gmail.com-company-name-inc',
            name: "Michael",
            lastName: "Johnson",
            idNumber: "54321",
            status: "active",
            project: "PR03",
            phone: "555-555-5555",
            birth: "1978-09-02",
            entry: "2018-02-15",
            field: ["Roofing Specialist"],
            role: "journeyman",
            description: "Eroofing specialist"
          },
          {
            idCompany: 'jbarrandeguy@gmail.com-company-name-inc',
            name: "Emily",
            lastName: "Davis",
            idNumber: "98765",
            status: "active",
            project: "PR04",
            phone: "555-456-7890",
            address: "789 Oak Rd, Unit 301",
            birth: "1983-04-30",
            entry: "2022-07-05",
            field: ["Electrician"],
            role: "journeyman",
            description: "Skilled electrician"
          },
          {
            idCompany: 'jbarrandeguy@gmail.com-company-name-inc',
            name: "William",
            lastName: "Brown",
            idNumber: "13579",
            status: "active",
            project: "PR05",
            phone: "555-987-1234",
            birth: "1995-01-12",
            entry: "2021-04-18",
            field: ["Painter"],
            role: "craftsman",
            description: "Talented painter, tiler, and construction designer"
          },
          {
            idCompany: 'jbarrandeguy@gmail.com-company-name-inc',
            name: "Linda",
            lastName: "Wilson",
            idNumber: "24680",
            status: "active",
            project: "PR06",
            phone: "555-333-4444",
            address: "567 Pine Ave, Suite 102",
            birth: "1992-12-05",
            entry: "2017-09-30",
            field: ["Construction Supervisor"],
            role: "foreman",
            description: "Experienced construction supervisor"
          },
          {
            idCompany: 'jbarrandeguy@gmail.com-company-name-inc',
            name: "Christopher",
            lastName: "Martinez",
            idNumber: "87654",
            status: "active",
            project: "PR07",
            phone: "555-888-1111",
            address: "321 Cedar Ln, Apt 401",
            birth: "1986-08-17",
            entry: "2019-03-12",
            field: ["Plumber"],
            role: "laborer",
            description: "Skilled plumber"
          },
          {
            idCompany: 'jbarrandeguy@gmail.com-company-name-inc',
            name: "Susan",
            lastName: "Taylor",
            idNumber: "65432",
            status: "active",
            project: "PR08",
            phone: "555-222-3333",
            birth: "1991-05-22",
            entry: "2020-10-08",
            field: ["Painter"],
            role: "laborer",
            description: "Junior painter"
          },
          {
            idCompany: 'jbarrandeguy@gmail.com-company-name-inc',
            name: "David",
            lastName: "Harris",
            idNumber: "23456",
            status: "active",
            project: "PR09",
            phone: "555-666-7777",
            address: "456 Birch St, Unit 501",
            birth: "1979-11-28",
            entry: "2018-06-20",
            field: ["Plumber"],
            role: "journeyman",
            description: "Skilled plumber"
          },
          {
            idCompany: 'jbarrandeguy@gmail.com-company-name-inc',
            name: "Karen",
            lastName: "Lewis",
            idNumber: "76543",
            status: "active",
            project: "PR10",
            phone: "555-555-1234",
            birth: "1980-02-14",
            entry: "2021-09-14",
            field: ["Welder"],
            role: "journeyman",
            description: "Talented welder"
          },
          {
            idCompany: 'jbarrandeguy@gmail.com-company-name-inc',
            name: "Thomas",
            lastName: "Anderson",
            idNumber: "98713",
            status: "active",
            project: "PR11",
            phone: "555-444-9999",
            address: "789 Oak St, Suite 501",
            birth: "1982-06-10",
            entry: "2019-08-07",
            field: ["Carpenter"],
            role: "laborer",
            description: "Junior carpenter"
          },
          {
            idCompany: 'jbarrandeguy@gmail.com-company-name-inc',
            name: "Megan",
            lastName: "White",
            idNumber: "98714",
            status: "active",
            project: "PR12",
            phone: "555-333-7777",
            birth: "1993-03-25",
            entry: "2020-12-30",
            field: ["Mason"],
            role: "laborer",
            description: "Junior mason"
          },
          {
            idCompany: 'jbarrandeguy@gmail.com-company-name-inc',
            name: "Kevin",
            lastName: "Hill",
            idNumber: "98715",
            status: "active",
            project: "PR13",
            phone: "555-555-7777",
            address: "123 Elm Rd, Apt 301",
            birth: "1987-04-18",
            entry: "2018-03-20",
            field: ["Tiler"],
            role: "journeyman",
            description: "Skilled tiler"
          },
          {
            idCompany: 'jbarrandeguy@gmail.com-company-name-inc',
            name: "Jennifer",
            lastName: "Garcia",
            idNumber: "98716",
            status: "active",
            project: "PR14",
            phone: "555-222-1111",
            birth: "1994-11-05",
            entry: "2017-05-25",
            field: ["Carpenter", "Painter"],
            role: "laborer",
            description: "Junior carpenter, painter"
          },
          {
            idCompany: 'jbarrandeguy@gmail.com-company-name-inc',
            name: "Daniel",
            lastName: "Turner",
            idNumber: "98717",
            status: "active",
            project: "PR15",
            phone: "555-888-1234",
            address: "456 Cedar St, Suite 401",
            birth: "1989-02-20",
            entry: "2016-10-15",
            field: ["Plumber"],
            role: "journeyman",
            description: "Expert Plumber"
          },
          {
            idCompany: 'jbarrandeguy@gmail.com-company-name-inc',
            name: "Maria",
            lastName: "Mitchell",
            idNumber: "98718",
            status: "active",
            project: "PR16",
            phone: "555-777-5555",
            birth: "1984-07-12",
            entry: "2022-02-05",
            field: ["Mason"],
            role: "laborer",
            description: "Junior mason"
          },
          {
            idCompany: 'jbarrandeguy@gmail.com-company-name-inc',
            name: "Sophia",
            lastName: "Morales",
            idNumber: "98726",
            status: "active",
            project: "PR01",
            phone: "555-333-8888",
            address: "789 Cedar Rd, Apt 301",
            birth: "1995-06-15",
            entry: "2022-11-30",
            field: ["Tiler"],
            role: "laborer",
            description: "Junior tiler"
          },
          {
            idCompany: 'jbarrandeguy@gmail.com-company-name-inc',
            name: "James",
            lastName: "Parker",
            idNumber: "98727",
            status: "active",
            project: "PR02",
            phone: "555-666-8888",
            address: "456 Elm St, Apt 201",
            birth: "1983-09-20",
            entry: "2021-06-25",
            field: ["Welder"],
            role: "journeyman",
            description: "Skilled welder"
          },
          {
            idCompany: 'jbarrandeguy@gmail.com-company-name-inc',
            name: "Olivia",
            lastName: "Gomez",
            idNumber: "98728",
            status: "active",
            project: "PR03",
            phone: "555-555-9999",
            address: "123 Birch Rd, Suite 101",
            birth: "1980-12-10",
            entry: "2020-04-15",
            field: ["Painter"],
            role: "journeyman",
            description: "Junior painter"
          },
          {
            idCompany: 'jbarrandeguy@gmail.com-company-name-inc',
            name: "Benjamin",
            lastName: "Torres",
            idNumber: "98729",
            status: "active",
            project: "PR04",
            phone: "555-444-9999",
            address: "567 Pine St, Unit 501",
            birth: "1986-08-12",
            entry: "2019-10-30",
            field: ["Roofing Specialist"],
            role: "craftman",
            description: "Skilled roofing specialist"
          },
          {
            idCompany: 'jbarrandeguy@gmail.com-company-name-inc',
            name: "Amelia",
            lastName: "Flores",
            idNumber: "98730",
            status: "active",
            project: "PR05",
            phone: "555-333-5555",
            address: "321 Oak Rd, Suite 201",
            birth: "1982-03-15",
            entry: "2018-05-20",
            field: ["Plumber"],
            role: "laborer",
            description: "Junior plumber"
          },
          {
            idCompany: 'jbarrandeguy@gmail.com-company-name-inc',
            name: "William",
            lastName: "Hernandez",
            idNumber: "98731",
            status: "active",
            project: "PR06",
            phone: "555-222-7777",
            address: "456 Cedar St, Apt 101",
            birth: "1991-11-05",
            entry: "2017-09-25",
            field: ["Electrician"],
            role: "journeyman",
            description: "Expert electrician"
          },
          {
            idCompany: 'jbarrandeguy@gmail.com-company-name-inc',
            name: "Mia",
            lastName: "King",
            idNumber: "98732",
            status: "active",
            project: "PR07",
            phone: "555-111-8888",
            address: "789 Pine Rd, Suite 301",
            birth: "1989-05-30",
            entry: "2016-07-10",
            field: ["Carpenter"],
            role: "laborer",
            description: "Junior carpenter"
          },
          {
            idCompany: 'jbarrandeguy@gmail.com-company-name-inc',
            name: "Ethan",
            lastName: "Lopez",
            idNumber: "98733",
            status: "active",
            project: "PR08",
            phone: "555-555-3333",
            address: "456 Elm Ave, Apt 501",
            birth: "1987-02-25",
            entry: "2015-12-30",
            field: ["Construction Manager"],
            role: "foreman",
            description: "Experienced construction manager"
          },
          {
            idCompany: 'jbarrandeguy@gmail.com-company-name-inc',
            name: "Liam",
            lastName: "Perez",
            idNumber: "98734",
            status: "active",
            project: "PR09",
            phone: "555-444-7777",
            address: "123 Oak St, Suite 401",
            birth: "1984-06-20",
            entry: "2014-08-10",
            field: ["Construction Supervisor"],
            role: "foreman",
            description: "Skilled Construction supervisor"
          },
      ]   
}