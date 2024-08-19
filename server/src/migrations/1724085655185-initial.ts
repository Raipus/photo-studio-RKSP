import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1724085655185 implements MigrationInterface {
    name = 'Initial1724085655185'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "photo" ("id" SERIAL NOT NULL, "category" character varying NOT NULL, "path" character varying NOT NULL, "studioId" integer, CONSTRAINT "PK_723fa50bf70dcfd06fb5a44d4ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "bookings" ("id" SERIAL NOT NULL, "date" character varying NOT NULL, "people_number" integer NOT NULL, "userId" integer, "studioId" integer, "photographerId" integer, CONSTRAINT "PK_bee6805982cc1e248e94ce94957" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "studios" ADD "cost" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "photographers" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "photographers" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "photographers" ADD "role" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "photographers" ADD "cost" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "photographers" ADD "photoId" integer`);
        await queryRunner.query(`ALTER TABLE "photographers" ADD CONSTRAINT "UQ_c9d55c8502fb0367688a4fa2428" UNIQUE ("photoId")`);
        await queryRunner.query(`ALTER TABLE "users" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "role" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "photoId" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_f856a4818b32c69dbc8811f3d2c" UNIQUE ("photoId")`);
        await queryRunner.query(`ALTER TABLE "photo" ADD CONSTRAINT "FK_2e0fac3d793dd97f5ab68c8c119" FOREIGN KEY ("studioId") REFERENCES "studios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "photographers" ADD CONSTRAINT "FK_c9d55c8502fb0367688a4fa2428" FOREIGN KEY ("photoId") REFERENCES "photo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD CONSTRAINT "FK_38a69a58a323647f2e75eb994de" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD CONSTRAINT "FK_2db15edb1ccb8891a9367a9e251" FOREIGN KEY ("studioId") REFERENCES "studios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD CONSTRAINT "FK_d12e5e188c93539e60cc82f7064" FOREIGN KEY ("photographerId") REFERENCES "photographers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_f856a4818b32c69dbc8811f3d2c" FOREIGN KEY ("photoId") REFERENCES "photo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_f856a4818b32c69dbc8811f3d2c"`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP CONSTRAINT "FK_d12e5e188c93539e60cc82f7064"`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP CONSTRAINT "FK_2db15edb1ccb8891a9367a9e251"`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP CONSTRAINT "FK_38a69a58a323647f2e75eb994de"`);
        await queryRunner.query(`ALTER TABLE "photographers" DROP CONSTRAINT "FK_c9d55c8502fb0367688a4fa2428"`);
        await queryRunner.query(`ALTER TABLE "photo" DROP CONSTRAINT "FK_2e0fac3d793dd97f5ab68c8c119"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_f856a4818b32c69dbc8811f3d2c"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "photoId"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "photographers" DROP CONSTRAINT "UQ_c9d55c8502fb0367688a4fa2428"`);
        await queryRunner.query(`ALTER TABLE "photographers" DROP COLUMN "photoId"`);
        await queryRunner.query(`ALTER TABLE "photographers" DROP COLUMN "cost"`);
        await queryRunner.query(`ALTER TABLE "photographers" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "photographers" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "photographers" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "studios" DROP COLUMN "cost"`);
        await queryRunner.query(`DROP TABLE "bookings"`);
        await queryRunner.query(`DROP TABLE "photo"`);
    }

}
