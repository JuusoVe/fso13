CREATE TABLE blogs (id SERIAL PRIMARY KEY, author text, url text NOT NULL, title text NOT NULL, likes integer DEFAULT 0);
insert into blogs (author, url, title, likes) values ('juuso', 'www.juuso.com', 'paras blogi', 231854);
insert into blogs (author, url, title, likes) values ('matti', 'www.matti.fi', 'ok blogi', 3);