
ALTER TABLE stats__generic_users
	ADD COLUMN "TYPINGS" INTEGER NOT NULL DEFAULT 0;

ALTER TABLE stats__generic_servers
	ADD COLUMN "TYPINGS" INTEGER NOT NULL DEFAULT 0;

ALTER TABLE stats__peruser_servers
	ADD COLUMN "TYPINGS" INTEGER NOT NULL DEFAULT 0;

ALTER TABLE stats__generic_channels
	ADD COLUMN "TYPINGS" INTEGER NOT NULL DEFAULT 0;

ALTER TABLE stats__peruser_channels
	ADD COLUMN "TYPINGS" INTEGER NOT NULL DEFAULT 0;