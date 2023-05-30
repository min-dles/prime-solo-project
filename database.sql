-- DB name is chore_cycle
-- Initial Set-up below: 

-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "chore_categories" (
	"id" SERIAL PRIMARY KEY,
	"category" VARCHAR (120));
	
INSERT INTO "chore_categories" ("category")
VALUES ('Household'), 
('Cleaning'), 
('Social'), 
('Documents'), 
('Health'), 
('Shopping');

-- (NEED TO UPDATE THIS TABLE TO INCLUDE API_INDEX) 
CREATE TABLE "moon_phasesAPI" (
	"id" SERIAL PRIMARY KEY,
	"phase_name" VARCHAR (100));
	
-- INSERT INTO MOON PHASES: 
INSERT INTO "moon_phasesAPI" ("phase_name")
VALUES ('new moon'),
('waxing crescent'),
('first quarter'),
('waxing gibbous'),
('full moon'),
('waning gibbous'),
('last quarter'),
('waning crescent');

-- THIS IS THE MAIN TABLE THAT USERS WILL ACCESS THRU THE APP:
CREATE TABLE "user_todo" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT,
	"todo_description" VARCHAR (250) DEFAULT NULL,
	"category_id" INT,
	"moon_id" INT,
	CONSTRAINT fk_user 
		FOREIGN KEY(user_id)
			REFERENCES "user"(id)
			ON DELETE CASCADE,
	CONSTRAINT fk_category
		FOREIGN KEY(category_id)
			REFERENCES chore_categories(id)
			ON DELETE SET NULL
			ON UPDATE CASCADE,
	CONSTRAINT fk_phase
		FOREIGN KEY(moon_id)
			REFERENCES "moon_phasesAPI"(id)
			ON DELETE SET NULL
			ON UPDATE CASCADE);

-- INSERT INTO MAIN TABLE SOME SAMPLE DATA: 
INSERT INTO "user_todo" ("user_id", "todo_description", "category_id", "moon_id")
VALUES ('2', 'clean microwave (wipe down with sponge and warm soapy water)', '2', '4'),
('2', 'book club meeting', '3', '5'),
('2', 'clean & decrumb toaster', '2', '1'),
('2', 'family game night', '1', '8');