CREATE TABLE IF NOT EXISTS posts (
id BIGSERIAL PRIMARY KEY,
user_clerk_id TEXT NOT NULL,
content TEXT NOT NULL
);

INSERT INTO posts (title, content, likes, category_id) 
VALUES ('Exploring upcoming trends in technology.', 0),
('A guide to healthy eating habits.', 0),
('Basics of investing in the stock market.', 0),
('Simple DIY projects for your home.', 0);